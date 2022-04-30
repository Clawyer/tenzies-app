import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import "./style.css";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rolls, setRolls] = React.useState(0);
  const [wins, setWins] = React.useState(
    parseInt(localStorage.getItem("wins")) || 0
  );

  const [records, setRecords] = React.useState(
    localStorage.getItem("records")
      ? JSON.parse(localStorage.getItem("records"))
      : []
  );
  const localS = () => {
    setWins((prev) => (prev += 1));
    return setRecords((x) => [...x, { roll: rolls, win: wins }]);
  };
  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      console.log("ok");
      localS();
      setTenzies(true);
    }
  }, [dice, rolls]);

  React.useEffect(() => {
    if (tenzies) {
      localStorage.setItem("wins", wins);
      localStorage.setItem("records", JSON.stringify(records));
    }
  }, [tenzies]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setRolls((prev) => (prev += 1));
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setRolls(0);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <div className="parameters">
        <span className="wins">{`Wins : ` + wins}</span>
        <span className="wins">{`Rolls : ` + rolls}</span>
      </div>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      {tenzies && <h2>You won !</h2>}
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
