import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";
import "./styles.scss";

import { RoomCode } from "../../components/RoomCode";
import { Button } from "../../components/Button";
import { Question } from "../../components/Question";

import { database } from "../../services/firebase";

import { useAuth } from "../../hooks/useAuth";


type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};
type RoomParams = {
  id: string;
};

type FirebaseQuestion = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
  }
>;

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    // on fica escutando - once uma vez
    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestion = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered
        };
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

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
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
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
                Para enviar uma pergunta, <button>faça seu login</button>
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

        {/* {JSON.stringify(questions)} */}

        {questions &&
          questions.map((key, value) => (
            <Question key={key.id} content={key.content} author={key.author} />
          ))}
      </main>
    </div>
  );
}
