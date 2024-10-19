type BaloonProps = {
  firstPhrase: string;
  secondPhrase?: string;
}

export function InputInfoBaloon({ firstPhrase, secondPhrase }:BaloonProps) {
  return (
    <div className={`animate-fadeIn w-[175px] text-left absolute left-[30px] top-[-30px] shadow-lg z-10 px-3 py-3 flex flex-col gap-2 hover:inline-flex bg-slate-100 rounded-md
    sm:w-[300px]
    `}>
      <p className="text-xs font-semibold text-gray-800 max-w-xs">{firstPhrase}</p>
      <p className="text-xs font-semibold text-gray-800 max-w-xs">{secondPhrase}</p>
    </div>
  );
}