type BaloonProps = {
  firstPhrase: string;
  secondPhrase?: string;
  isVisible: boolean;
}

export function InputInfoBaloon({ firstPhrase, secondPhrase, isVisible }:BaloonProps) {
  return (
    <div className={`animate-fadeIn w-[200px] text-left absolute left-[30px] top-[-30px] shadow-lg z-10 px-3 py-3 ${isVisible ? 'visible' : 'hidden'} bg-slate-100 rounded-md
    sm:w-[300px]
    `}>
      <p className="text-xs font-semibold text-gray-800 max-w-xs">{firstPhrase}</p>
      <p className="text-xs font-semibold text-gray-800 max-w-xs">{secondPhrase}</p>
    </div>
  );
}