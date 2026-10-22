type BaloonProps = {
  id?: string
  firstPhrase: string
  secondPhrase?: string
}

export function InputInfoBaloon({
  id,
  firstPhrase,
  secondPhrase
}: BaloonProps) {
  return (
    <div
      id={id}
      role="tooltip"
      className="animate-fadeIn w-[175px] text-left absolute left-[30px] top-[-30px] shadow-lg z-10 px-3 py-3 flex flex-col gap-2 hover:inline-flex bg-slate-100 rounded-md sm:w-[300px]"
    >
      <p className="text-xs font-semibold text-gray-800 max-w-xs">
        {firstPhrase}
      </p>
      {secondPhrase && (
        <p className="text-xs font-semibold text-gray-800 max-w-xs">
          {secondPhrase}
        </p>
      )}
    </div>
  )
}
