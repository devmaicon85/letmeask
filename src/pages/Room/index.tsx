import { FormEvent, useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";

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

  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState("");

  const [loading, setLoading] = useState(true);

  const { title, questions, checkIsAdmin } = useRoom(roomId);

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

      history.push("/");
    }
  }

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("Você deve estar logado");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    };

    try {
      setNewQuestion("");
      await database.ref(`rooms/${roomId}/questions`).push(question);
      // alert("Pergunta enviada com sucesso!");
    } catch (error) {
      alert("Ocorreu algum erro ao enviar sua pergunta. Tente novamente.");
      setNewQuestion(question.content);
    }
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
              <h1>{title}</h1>
              {questions && <span>{questions.length} pergunta(s)</span>}
            </div>

            {!checkIsAdmin && (
              <form onSubmit={handleSendQuestion}>
                <textarea
                  placeholder="O que você quer perguntar?"
                  onChange={(e) => setNewQuestion(e.target.value)}
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
                    <span className="user-info">
                      <img src={user.avatar} alt={user.name}></img>
                      <span>{user.name}</span>
                    </span>
                  )}

                  <Button type="submit" disabled={!user}>
                    Enviar Pergunta
                  </Button>
                </div>
              </form>
            )}

            {questions && questions.length === 0 ? (
              <>
                <h3>Aguardando perguntas...</h3>
                <hr />
                <h4>Compartilhe o link da sala com o público interessado: </h4>
                <a href={window.location.href}>{window.location.href}</a>
              </>
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
