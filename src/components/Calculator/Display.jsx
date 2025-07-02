export default function Display({ input, result }) {
  return (
    <div className="bg-black text-right text-2xl px-4 py-2 rounded mb-2 min-h-[56px] break-words">
      {result !== null ? result : input || "0"}
    </div>
  );
}
