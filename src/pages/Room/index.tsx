import { FormEvent, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";
import imgEmptyQuestions from "../../assets/images/empty-questions.svg";

import { RoomCode } from "../../components/RoomCode";
import { Button } from "../../components/Button";
import { Question } from "../../components/Question";
import { Loading } from "../../components/Loading";

import { database } from "../../services/firebase";

import { useAuth } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";

import "./styles.scss";

type RoomParams = {
  id: string;
  isAdmin: string;
};

export function Room() {
  const { user, signInWithGoogle } = useAuth();

  // const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState("");

  const [loading, setLoading] = useState(true);

  const limitCaracterNewQuestion = 1000;
  const minCaracterNewQuestion = 20;

  const { title, avatar, name, questions, checkIsAdmin } = useRoom(roomId);

  async function handleLoginGoogle() {
    if (!user) {
      await signInWithGoogle();
    }
  }

  async function handleDeleteQuestion() {
    if (window.confirm("Deseja mesmo encerrar essa sala?")) {
      await database.ref(`rooms/${roomId}`).update({
        closedAt: new Date()
      });
    }
  }

  function handleSetQuestion(value: string) {
    if (value.length > limitCaracterNewQuestion) {
      alert("Máximo 1000 caracteres");
    } else {
      setNewQuestion(value);
    }
  }

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      alert("Você deve estar logado para enviar perguntas");
      return;
    }

    if (newQuestion.trim().length < minCaracterNewQuestion) {
      alert("Por favor enviar apenas perguntas. Mínimo 20 caracteres");
      return;
    }

    const question = {
      content: newQuestion,
      author: {
        id: user?.id,
        name: user?.name,
        avatar: user?.avatar
      },
      isHighlighted: false,
      isAnswered: false
    };

    try {
      setNewQuestion(""); // evita enviar mais de uma vez ao pressionar botão 2x
      await database.ref(`rooms/${roomId}/questions`).push(question);
      // alert("Pergunta enviada com sucesso!");
    } catch (error) {
      alert("Ocorreu algum erro ao enviar sua pergunta. Tente novamente.");
      setNewQuestion(question.content);
    }
  }

  function copyRoomCodeToClipboard() {
    // navigator.clipboard.writeText(`${props.code}`);
    navigator.clipboard.writeText(window.location.href);

    const shareData = {
      title: "LetmeAsk ",
      text: "Sala " + title,
      url: window.location.href
    };

    navigator.share(shareData);
    // alert("Link copiado");
  }

  useEffect(() => {
    if (title !== "") {
      // se carregou
      setLoading(false);
    }
  }, [title]);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <Link to="/">
            <img src={logoImg} alt="Letmeask" />
          </Link>
          <div>
            {!loading && (
              <>
                <RoomCode code={roomId} />
                {checkIsAdmin && (
                  <Button isOutlined onClick={handleDeleteQuestion}>
                    Encerrar Sala
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </header>
      {loading ? (
        <Loading />
      ) : (
        <main>
          <div className="content">
            <div className="room-title">
              <div className="avatar">
                <img src={avatar} alt={name} />
                <p>{name}</p>
              </div>
              <h1>{title}</h1>
              {questions && <span>{questions.length} pergunta(s)</span>}
            </div>

            {!checkIsAdmin && (
              <form onSubmit={handleSendQuestion}>
                <textarea
                  placeholder="O que você quer perguntar?"
                  onChange={(e) => handleSetQuestion(e.target.value)}
                  value={newQuestion}
                />

                <div className="form-footer">
                  {!user ? (
                    <span>
                      Para enviar uma pergunta,{" "}
                      <Button className="link" onClick={handleLoginGoogle}>
                        faça seu login
                      </Button>
                    </span>
                  ) : (
                    <>
                      <span className="user-info">
                        <img src={user.avatar} alt={user.name}></img>
                        <span>{user.name}</span>
                      </span>
                      <span className="limit">{`${newQuestion.length} | ${limitCaracterNewQuestion}`}</span>
                    </>
                  )}
                  <Button type="submit" disabled={!user}>
                    Enviar Pergunta
                  </Button>
                </div>
              </form>
            )}

            {questions && questions.length === 0 ? (
              <div className="emptyQuestions">
                <img src={imgEmptyQuestions} alt="nenhuma questão" />
                <h3>Nenhum pergunta no momento</h3>
                <hr />
                <h4>Compartilhe o link da sala com o público interessado: </h4>
                <button className="link" onClick={copyRoomCodeToClipboard}>
                  {window.location.href}
                </button>
              </div>
            ) : (
              questions.map((question) => (
                <Question
                  key={question.id}
                  checkIsAdmin={checkIsAdmin}
                  question={question}
                  roomId={roomId}
                />
              ))
            )}
          </div>
        </main>
      )}
    </div>
  );
}
