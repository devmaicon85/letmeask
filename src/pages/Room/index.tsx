import { FormEvent, useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";

import "./styles.scss";

import { RoomCode } from "../../components/RoomCode";
import { Button } from "../../components/Button";
import { Question } from "../../components/Question";
import { Loading } from "../../components/Loading";

import { database } from "../../services/firebase";

import { useAuth } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";

type RoomParams = {
  id: string;
  isAdmin: string;
};

// A sala ROOM deixei mesmo componente para ADMIN e USUARIOS para evitar duplicação de código
// Like deixei também no ADMIN para o mesmo visualizar os likes e porque não também dar um LIKE?
// SVG para mudar de cor no hover apenas coloquei cor direto no SVG e retirei o brilho/contraste via css

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
                    <Button onClick={handleLoginGoogle}>faça seu login</Button>
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
            <h3>Aguardando Questões...</h3>
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
        </main>
      )}
    </div>
  );
}
