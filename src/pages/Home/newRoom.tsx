import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";

import { Aside } from "../../components/Aside";
import { Button } from "../../components/Button";

import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

import "./styles.scss";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
      name: user?.name,
      avatar: user?.avatar
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <Aside />
      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeask" />
          <img src={user?.avatar} alt={user?.name} className="avatar" />
          <h3>{user?.name}</h3>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
            />
            <Button type="submit">Criar sala</Button>
            <p>Entrar em uma sala existente? </p>
            <Link to="/">Clique aqui</Link>
          </form>
        </div>
      </main>
    </div>
  );
}
