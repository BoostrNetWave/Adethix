import "./button.scss";
import { useNavigate } from "react-router-dom";

function Button() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  
  return (
    <button className="btn" onClick={handleClick}>
      Back to previous page
    </button>
  );
}

export default Button;
