export default function Home() {
  return (
    <div className="flex items-start gap-6">
      {/* Left section: heading + subtext */}
      <div>
        <h1 className="text-3xl font-bold">Welcome</h1>
        <p className="max-w-sm text-gray-700">
          This is some text directly under the heading.
        </p>
      </div>

      {/* Right section: paragraph */}
      <p className="max-w-5xl text-gray-600">
        ..................................................................
        ..................................................................
        ..................................................................
        ..................................................................
        ..................................................................
        ..................................................................
      </p>
    </div>
  );
}