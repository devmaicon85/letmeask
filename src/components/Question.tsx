import { ButtonHTMLAttributes } from 'react';

import "../styles/question.scss"
import likeImg from "../assets/images/like.svg";

type props = {

  content:string,
  author:string,
  avatar:string
}

export function Question(props: props) {
  return (
    <div className="question-item">
      <div className="content">{props.content}</div>

      <div className="footer">
        <div className="author">
          <img src={props.avatar} alt={props.author} />
          {props.author}
        </div>

        <div className="options">
          16 <img src={likeImg} alt="Like" />
        </div>
      </div>
    </div>
  );
}
