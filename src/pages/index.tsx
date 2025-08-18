export default function Home() {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center gap-6 my-8">
        <h1 className="text-3xl font-bold text-[#e8e5e2]">
          Custom Printing &amp; Design
        </h1>
        <span className="mx-6">  </span>
        <ul className="flex flex-wrap items-center gap-x-9 gap-y-3 text-xl text-[#e8e5e2] list-disc list-inside  mt-[0.5rem] p-0">
          <li className="whitespace-nowrap">xxxx</li>
          <li className="whitespace-nowrap">xxxx</li>
          {/* examples with multi-word terms */}
          <li className="whitespace-nowrap">xxxx</li>
          <li className="whitespace-nowrap">xxxx &amp; xxxx</li>
        </ul>
      </div>
      <div className="h-px w-full bg-[#e8e5e2] my-4" />
      <div className="flex flex-col gap-6">


        <div className="flex flex-col md:flex-row items-start pt-[1rem] gap-6">
          <div>
            <p className="max-w-sm text-[#e8e5e2]">
              This is some text directly under the heading.
            </p>
          </div>

          <p className="max-w-5xl text-[#e8e5e2]">
            Replace this placeholder with real homepage content.
          </p>
        </div>
      </div>
    </div>
  );
}