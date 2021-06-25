import { FormEvent, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";

import "./styles.scss";

import { RoomCode } from "../../components/RoomCode";
import { Button } from "../../components/Button";
import { Question } from "../../components/Question";

import { database } from "../../services/firebase";

import { useAuth } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";

type RoomParams = {
  id: string;
};

export function Room() {
  const { user } = useAuth();
  const history  = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState("");

  const { title, questions } = useRoom(roomId);

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

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion("");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <Link to="/">
            <img src={logoImg} alt="Letmeask" />
          </Link>
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleDeleteQuestion}>
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>{title}</h1>
          {questions && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={(e) => setNewQuestion(e.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {!user ? (
              <span>
                Para enviar uma pergunta, <Link to="/">faça seu login</Link>
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

        {questions &&
          questions.map((question) => (
            <Question key={question.id} question={question} roomId={roomId} />
          ))}
      </main>
    </div>
  );
}
