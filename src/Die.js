import React from "react";

export default function Die(props) {
  // const holdDice = () => console.log(props.key);
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  const die = (number) => {
    let classname;
    let children = [];
    let span = React.createElement("span", {});
    if (number < 4) {
      if (number === 1) classname = "one";
      if (number === 2) classname = "two";
      if (number === 3) classname = "three";
      for (let i = 0; i < number; i++) {
        children.push(span);
      }
    }

    if (number === 4) {
      classname = "four";
      children.push(
        React.createElement("div", { className: "row" }, [span, span])
      );
      children.push(
        React.createElement("div", { className: "row" }, [span, span])
      );
    }
    if (number === 5) {
      classname = "five";
      children.push(
        React.createElement("div", { className: "row" }, [span, span])
      );
      children.push(React.createElement("div", {}, span));
      children.push(
        React.createElement("div", { className: "row" }, [span, span])
      );
    }
    if (number === 6) {
      classname = "six";
      children.push(
        React.createElement("div", { className: "row" }, [span, span, span])
      );
      children.push(
        React.createElement("div", { className: "row" }, [span, span, span])
      );
    }
    return React.createElement(
      "div",
      { className: `die ` + classname },
      children
    );
  };
  return (
    <div className="die-face" style={styles} onClick={props.holdDice}>
      {die(props.value)}
    </div>
  );
}
