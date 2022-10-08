import { useEffect, useState } from "react";

const Answer = (props) => {
  const [buttonStyle, setButtonStyle] = useState({});
  const [animateButton, setAnimateButton] = useState("");
  const selectedButton = () => {
    localStorage.setItem(props.qID, props.value);
    setAnimateButton("green");
    props.selected();
    setTimeout(() => {
      setAnimateButton("rgb(127, 113, 255)");
    }, 500);
  };

  useEffect(() => {
    return function printUnmount() {
      setButtonStyle({ transition: "0.5s ease-in-out", width: "0px" });
    };
  }, []);

  return (
    <button className="qAnswerPlay" onClick={selectedButton}>
      <span className="qAnswerPlayAnimate2" style={props.style2}></span>
      <span>{props.value}</span>
      <span
        className="qAnswerPlayAnimate"
        style={{ ...props.style1, backgroundColor: animateButton }}
      ></span>
    </button>
  );
};

export default Answer;
