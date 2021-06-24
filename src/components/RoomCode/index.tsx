import { useState } from "react";
import copyImg from "../../assets/images/copy.svg";
import checkImg from "../../assets/images/check.svg";
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
        {!copied ? <img src={copyImg} alt="Copiar Código"></img> : <img src={checkImg} alt="Código Copiado"></img>}
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}
