import { useState } from "react";
import copyImg from "../../assets/images/copy.svg";
import "./styles.scss";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  const [copied, setCopied] = useState(false);
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
    setCopied(true);
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copiar código"></img>
        {copied && <div className="copied">copiado</div>}
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}
