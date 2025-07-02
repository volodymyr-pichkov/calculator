const buttons = [
  "7", "8", "9", "/",
  "4", "5", "6", "*",
  "1", "2", "3", "-",
  "0", ".", "=", "+",
  "C"
];

export default function Keypad({ onClick }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {buttons.map((btn) => (
        <button
          key={btn}
          onClick={() => onClick(btn)}
          className={`p-4 rounded-xl text-xl font-semibold 
            ${btn === "="
              ? "bg-green-500 hover:bg-green-600"
              : btn === "C"
              ? "col-span-4 bg-red-600 hover:bg-red-700"
              : btn === "+" || btn === "-" || btn === "*" || btn === "/"
              ? "bg-orange-400 hover:bg-orange-500"
              : "bg-gray-600 hover:bg-gray-500"}
          `}
        >
          {btn}
        </button>
      ))}
    </div>
  );
}