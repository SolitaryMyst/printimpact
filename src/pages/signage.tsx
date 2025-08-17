export default function Signage() {
  return (
    <div className="flex flex-wrap gap-4">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="text-white w-50 h-50 bg-gray-900 rounded-lg flex items-center justify-center"
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}