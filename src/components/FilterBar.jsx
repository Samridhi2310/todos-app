export default function FilterBar({ value, onChange }) {
  const btn = "px-3 py-1 rounded border";
  const active = "bg-black text-white border-black";
  const idle = "bg-white text-black";

  return (
    <div className="flex gap-2 justify-center flex-wrap">
      {["all","completed","incomplete"].map(f => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`${btn} ${value === f ? active : idle}`}
        >
          {f[0].toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
