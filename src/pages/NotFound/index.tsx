import "./styles.scss";
import img404 from "../../assets/images/notFound/404.svg";
import imgRocket from "../../assets/images/notFound/rocket.svg";
import imgEarth from "../../assets/images/notFound/earth.svg";
import imgAstronaut from "../../assets/images/notFound/astronaut.svg";
import imgMoon from "../../assets/images/notFound/moon.svg";


export function NotFound() {
  return (
    <div className="notFound">
      <div className="bg-purple">
        <div className="stars">
          <div className="central-body">
            <img className="image-404" src={img404} alt="" />
            <a href="/">Voltar para o site</a>
          </div>
          <div className="objects">
            <img
              className="object_rocket"
              src={imgRocket}
              width="40px"
              alt=""
            />
            <div className="earth-moon">
              <img
                className="object_earth"
                src={imgEarth}
                width="100px"
                alt=""
              />
              <img
                className="object_moon"
                src={imgMoon}
                width="80px"
                alt=""
              />
            </div>
            <div className="box_astronaut">
              <img
                className="object_astronaut"
                src={imgAstronaut}
                width="140px"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
