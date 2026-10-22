import { Info } from '@phosphor-icons/react'
import { ReactNode, useId, useState } from 'react'
import { InputInfoBaloon } from './InputInfoBaloon'

type SectionInfo = {
  first: string
  second?: string
}

type Props = {
  title: string
  info?: SectionInfo
  children: ReactNode
}

export function Section({ title, info, children }: Props) {
  const [showInfo, setShowInfo] = useState(false)
  const infoId = useId()

  return (
    <section className="w-full flex-col sm:overflow-hidden sm:rounded-md">
      <header className="flex flex-1 p-4 items-center gap-2 bg-orange-500 text-white font-bold tracking-wide">
        <h2 className="text-base">{title}</h2>
        {info && (
          <div className="relative">
            <button
              type="button"
              className="rounded focus:outline-none focus:ring focus:ring-white/70"
              aria-label={`Informações sobre ${title}`}
              aria-expanded={showInfo}
              aria-describedby={showInfo ? infoId : undefined}
              onClick={() => setShowInfo(visible => !visible)}
              onBlur={() => setShowInfo(false)}
              onKeyDown={event => {
                if (event.key === 'Escape') {
                  setShowInfo(false)
                }
              }}
            >
              <Info size={18} weight="bold" />
            </button>
            {showInfo && (
              <InputInfoBaloon
                id={infoId}
                firstPhrase={info.first}
                secondPhrase={info.second}
              />
            )}
          </div>
        )}
      </header>
      <div className="flex-1 flex-col p-6 bg-gray-100 space-y-8">
        {children}
      </div>
    </section>
  )
}
