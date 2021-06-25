import { FormEvent, useState } from "react";
import { useHistory } from "react-router";

import logoImg from "../../assets/images/logo.svg";
import googleIconImg from "../../assets/images/google-icon.svg";

import { Button } from "../../components/Button";
import { Aside } from "../../components/Aside";

import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

import "./styles.scss";

export function Home() {
  const history = useHistory();

  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    // roomCode sem URL (quando enviado a url completa pega somente o codigo)
    let roomCodeClean = roomCode.replace(window.location.href + "rooms/", "");
    setRoomCode(roomCodeClean);

    const roomRef = await database.ref(`rooms/${roomCodeClean}`).get();

    if (!roomRef.exists()) {
      alert("A sala não existe");
      return;
    }

    if (roomRef.val().closedAt) {
      return alert("Essa sala já foi encerrada");
    }

    history.push(`/rooms/${roomCodeClean}`);
  }

  return (
    <div id="page-auth">
      <Aside></Aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeask" />
          <Button onClick={handleCreateRoom} className="button create-room">
            <img src={googleIconImg} alt="logo do Google" />
            Crie sua sala com o Google
          </Button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código ou link da sala"
              onChange={(e) => setRoomCode(e.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
