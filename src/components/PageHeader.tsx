// src/components/PageHeader.tsx
type PageHeaderProps = {
  title?: string;
  items?: string[];
};

export default function PageHeader({ title = "", items = [] }: PageHeaderProps) {
  return (
    <div className= "bg-[#f8f8f8]">
      <div className="flex flex-col md:flex-row items-center gap-6 px-16 py-8">
        {title && <h1 className="text-3xl font-bold text-[#333333]">{title}</h1>}
        <span className="mx-6" />
        {items.length > 0 && (
          <ul className="flex flex-wrap items-center gap-x-9 gap-y-3 text-xl text-[#333333] list-disc list-inside mt-[0.5rem] p-0">
            {items.map((text, i) => (
              <li key={i} className="whitespace-nowrap">
                {text}
              </li>
            ))}
          </ul>
        )}
      </div>
      {(title || items.length > 0) && (
        <div className="h-px w-full bg-[#333333]" />
      )}
      <div className = "mt-[2rem]"></div>
    </div>
    
  );
}
