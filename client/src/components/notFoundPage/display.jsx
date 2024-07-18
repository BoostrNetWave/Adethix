import "./display.scss";
import Button from "./button";
// import image from "../../assets/Scarecrow.png"
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Display() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  }
  return (
    <div className="display">
      {/* <div className="display__img">
        <img src={image} alt="404-Scarecrow" />
      </div> */}
      <div className="display__content">
        <h2 className="display__content--info">I have bad news for you</h2>
        <p className="display__content--text">
          The page you are looking for might be removed or is temporarily
          unavailable
        </p>
        {/* <RouterLink to="/"> */}
          <Button className="btn">Back to previous page</Button>
        {/* </RouterLink> */}
      </div>
    </div>
  );
}

export default Display;
