import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import Display from "./Calculator/Display";
import Keypad from "./Calculator/Keypad";
import History from "./Calculator/History";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const operators = ["+", "-", "*", "/"];

  useEffect(() => {
    const stored = localStorage.getItem("calc_history");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("calc_history", JSON.stringify(history));
  }, [history]);

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
      setResult(null);
    } else if (value === "=") {
      if (input === "" || operators.includes(input.slice(-1))) {
        setResult("Error");
        return;
      }
      try {
        const res = evaluate(input);
        setResult(res);
        setInput(String(res));
        setHistory([`${input} = ${res}`, ...history]);
      } catch {
        setResult("Error");
      }
    } else {
      if (result !== null && !operators.includes(value)) {
        if (/\d|\./.test(value)) {
          setInput(value);
          setResult(null);
          return;
        }
      }

      if (result !== null && operators.includes(value)) {
        setInput(String(result) + value);
        setResult(null);
        return;
      }

      setInput((prev) => {
        if (operators.includes(value)) {
          if (prev === "" && value !== "-") return prev;
          if (prev.length > 0 && operators.includes(prev.slice(-1))) {
            return prev.slice(0, -1) + value;
          }
        }
        if (value === ".") {
          const parts = prev.split(/[+\-*/]/);
          const lastNumber = parts[parts.length - 1];
          if (lastNumber.includes(".")) return prev;
          if (lastNumber === "") return prev + "0.";
        }
        return prev + value;
      });
    }
  };

  return (
    <div className="max-w-xs mx-auto my-8 p-4 bg-gray-800 rounded-2xl shadow-2xl text-white">
      <h1 className="text-xl font-bold mb-4 text-center">Calculator</h1>
      <Display input={input} result={result} />
      <Keypad onClick={handleClick} />
      <History history={history} />
    </div>
  );
}
