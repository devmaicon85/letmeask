import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

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
    likes: Record<string, {
      authorId: string
    }>
  }
>;

export function useRoom(roomId: string) {

  const { user } = useAuth();
  const history = useHistory();

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState("");

  const [checkIsAdmin, setCheckIsAdmin] = useState(false)

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    // on fica escutando - once uma vez

    roomRef.get().then(room => {
      if (room.val().closedAt) {
        alert('Essa sala já foi encerrada!!')
        history.push("/");
      }
    })

    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestion = databaseRoom.questions ?? {};


      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]

        };
      });

      // ordernar pode atrapalha os usuarios por ser real time
      // const questionSorted = parsedQuestions.sort((a, b) => b.likeCount - a.likeCount);


      setCheckIsAdmin(databaseRoom.authorId === user?.id ? true : false)
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });

    history.push(`/rooms/${roomId}`);

    return () => {
      roomRef.off("value");
    }

  }, [roomId, checkIsAdmin, user?.id, history]);

  return { questions, title, checkIsAdmin }

}
