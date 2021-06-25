import illustration from "../../assets/images/illustration.svg";
import "./styles.scss";
export function Aside() {
  return (
    <aside>
      <img src={illustration} alt="Ilustração simbolizando perguntas e respostas" />
      <strong>Crie salas de Q&amp;A ao vivo</strong>
      <p>Tire as dúvidas da sua audiência em tempo-real</p>
    </aside>
  );
}
