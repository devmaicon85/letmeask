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
  // const [questionSorted, setQuestionSorted] = useState<QuestionType[]>([]);s

  const [title, setTitle] = useState("");

  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");

  const [checkIsAdmin, setCheckIsAdmin] = useState(false)



  // useEffect(() => {

  //   // tem questões mas nunca ordenou 
  //   // ordenas no carregamento da pagina para o usuario atual
  //   console.log("nenhuma questao")

  //   if (questionSorted.length === 0 && questions.length > 0) {
  //     console.log("ordenou")

  //     let order = (questions.sort((a, b) => b.likeCount - a.likeCount));
  //     setQuestions(order); // ordena
  //   }

  // }, [questionSorted, questions])

  useEffect(() => {


    const roomRef = database.ref(`rooms/${roomId}`);
    // on fica escutando - once uma vez

    roomRef.get().then(room => {

      if (!room.exists()) {
        alert('Essa sala já não existe mais!!')
        history.push("/");
        return;
      }


    })

    roomRef.on("value", (room) => {

      const databaseRoom = room.val();

      if (databaseRoom?.closedAt) {
        alert('Essa sala foi encerrada!!')
        history.push("/");
        return;
      }

      const firebaseQuestions: FirebaseQuestion = databaseRoom?.questions ?? {};

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


      setCheckIsAdmin(databaseRoom?.authorId === user?.id ? true : false)
      setTitle(databaseRoom?.title);
      setAvatar(databaseRoom?.avatar);
      setName(databaseRoom?.name);
      setQuestions(parsedQuestions);



    });




    history.push(`/rooms/${roomId}`);

    return () => {
      roomRef.off("value");
    }

  }, [roomId, checkIsAdmin, user?.id, history]);


  return { questions, title, name, avatar, checkIsAdmin }

}
