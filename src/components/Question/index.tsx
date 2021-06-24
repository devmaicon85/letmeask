
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
      <div className="content">{content}</div>

      <div className="footer">
        <div className="author">
          <img src={author.avatar} alt={author.name} />
          {author.name}
        </div>

        <div className="options">
          16 <img src={likeImg} alt="Like" />
        </div>
      </div>
    </div>
  );
}
