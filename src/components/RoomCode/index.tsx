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
    // navigator.clipboard.writeText(`${props.code}`);

    navigator.clipboard.writeText(window.location.href);

    setCopied(true);
  }

  return (
    <button
      className="room-code"
      aria-label="Copiar link da sala"
      title="Copiar link da sala"
      onClick={copyRoomCodeToClipboard}
    >
      <div>
        {!copied ? (
          <img src={copyImg} alt="Copiar Código"></img>
        ) : (
          <img src={checkImg} alt="Código Copiado"></img>
        )}
      </div>
      <span className={copied === true ? "copied" : ""}>Sala #{props.code}</span>
    </button>
  );
}
