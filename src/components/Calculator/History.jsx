export default function History({ history }) {
  return (
    <div className="mt-6 text-left">
      <h2 className="text-lg font-bold mb-2">History:</h2>
      {history.length === 0 ? (
        <p className="text-gray-400">No calculations</p>
      ) : (
        <ul className="text-sm max-h-40 overflow-y-auto pr-2">
          {history.map((entry, idx) => (
            <li key={idx} className="border-b border-gray-700 py-1">
              {entry}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
