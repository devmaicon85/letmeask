
import "./styles.scss"
import likeImg from "../../assets/images/like.svg";

type QuestionProps = {

  content:string,
  author:{
    name:string,
    avatar:string,
  }
}

export function Question({content,author}: QuestionProps) {
  return (
    <div className="question-item">
      <p>{content}</p>

      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          {author.name}
        </div>

        <div className="options">
          16 <img src={likeImg} alt="Like" />
        </div>
      </footer>
    </div>
  );
}
