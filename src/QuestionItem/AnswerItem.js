import { useEffect, useState } from "react";

const AnswerItem = (props) => {
  const [newStyle, setNewStyle] = useState({});

  useEffect(() => {
    console.log("Update");

    setNewStyle({
      width: "10rem",
    });
  }, []);

  return (
    <input
      className="qAnswer"
      placeholder={"Enter Answer Text"}
      value={props.value}
      onChange={props.change}
      style={newStyle}
    />
  );
};

export default AnswerItem;
