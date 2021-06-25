import { ReactNode } from "react";
import { useRoom } from "../../hooks/useRoom";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

import "./styles.scss";
import likeImg from "../../assets/images/like.svg";
import deleteImg from "../../assets/images/delete.svg";
import check from "../../assets/images/check.svg";
import answer from "../../assets/images/answer.svg";

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
};

type QuestionProps = {
  question: QuestionType;
  checkIsAdmin: boolean;
  roomId: string;
};

export function Question({ question, checkIsAdmin, roomId }: QuestionProps) {
  const { user } = useAuth();

  async function handleCheckQuestion(questionId: string) {
    if (user?.id === undefined) {
      return alert("Você precisa estar logado!");
    }
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    if (user?.id === undefined) {
      return alert("Você precisa estar logado!");
    }
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    });
  }

  async function handleDeleteQuestion(questionId: string) {
    if (user?.id === undefined) {
      return alert("Você precisa estar logado!");
    }

    if (window.confirm("Deseja mesmo excluir essa pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }
  async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
    if (user?.id === undefined) {
      return alert("Você precisa estar logado!");
    }

    if (likeId) {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id
      });
    }
  }

  return (
    <div
      className={`question-item ${
        question.isHighlighted && !question.isAnswered ? "highlighted" : ""
      } ${question.isAnswered ? "answered" : ""}`}
    >
      <p>{question.content}</p>

      <footer>
        <div className="user-info">
          <img src={question.author.avatar} alt={question.author.name} />
          <span>{question.author.name}</span>
        </div>

        <div className="options">
          {checkIsAdmin && !question.isHighlighted && (
            <img
              src={answer}
              alt="Dar destaque à pergunta"
              title="Dar destaque à pergunta"
              onClick={() => handleHighlightQuestion(question.id)}
            />
          )}

          {checkIsAdmin && !question.isAnswered && question.isHighlighted && (
            <img
              src={check}
              alt="Marcar como respondida"
              title="Marcar como respondida"
              onClick={() => handleCheckQuestion(question.id)}
              className={`${question.isAnswered ? "answered" : ""}`}
            />
          )}

          {checkIsAdmin && (
            <img src={deleteImg} alt="deletar" onClick={() => handleDeleteQuestion(question.id)} />
          )}
          <img
            src={likeImg}
            alt="Like"
            onClick={() => handleLikeQuestion(question.id, question.likeId)}
            className={`${question.likeId ? "liked" : ""}`}
          />

          <div className="likeCount">
            {question.likeCount > 0 &&
              (question.likeCount > 1000 ? (1100 / 1000).toFixed(1) + "k" : question.likeCount)}
          </div>
        </div>
      </footer>
    </div>
  );
}
