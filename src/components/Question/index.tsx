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
  roomId: string;
};

export function Question({ question, roomId }: QuestionProps) {
  const { user } = useAuth();

  async function handleDeleteQuestion(questionId: string) {
    if (user?.id === undefined) {
      return alert("Você precisa estar logado para dar like");
    }

    if (window.confirm("Deseja mesmo excluir essa pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }
  async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
    if (!user) {
      return alert("Você precisa estar logado para dar like");
    }

    if (likeId) {
      // remover o like
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove();
    } else {
      // da o like
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id
      });
    }
  }

  return (
    <div className="question-item">
      <p>{question.content}</p>

      <footer>
        <div className="user-info">
          <img src={question.author.avatar} alt={question.author.name} />
          <span>{question.author.name}</span>
        </div>

        <div className="options">
          {question.likeCount > 0 && question.likeCount}
          <img
            src={likeImg}
            alt="Like"
            onClick={() => handleLikeQuestion(question.id, question.likeId)}
            className={`${question.likeId ? "liked" : ""}`}
          />
          <img src={deleteImg} alt="deletar" onClick={() => handleDeleteQuestion(question.id)} />

          <img src={check} alt="chekar" onClick={() => handleDeleteQuestion(question.id)} />
        </div>
      </footer>
    </div>
  );
}
