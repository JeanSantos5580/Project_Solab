import { Info } from '@phosphor-icons/react'
import { ReactNode } from 'react'
import { InputInfoBaloon } from './InputInfoBaloon';

type ShowBalloonCallback = (show: boolean) => void;
type Props = {
  title: string
  setShowBaloon: ShowBalloonCallback
  showBaloon: boolean
  firstPhrase: string
  secondPhrase?: string
  children: ReactNode
}

export function Section({ title, setShowBaloon, showBaloon, firstPhrase, secondPhrase,  children }: Props) {
  return (
    <section className="w-full flex-col sm:overflow-hidden sm:rounded-md">
      <header className=" flex flex-1 p-4 items-center gap-2 bg-orange-500 text-white font-bold tracking-wide">
        <h5>{title}</h5>
        <button 
        className='relative'
        onMouseOver={() => setShowBaloon(showBaloon)}
        onMouseOut={() => setShowBaloon(showBaloon)}
        >
          <Info size={18} weight="bold"/>
          {showBaloon && 
            <InputInfoBaloon 
              firstPhrase={firstPhrase} 
              secondPhrase={secondPhrase}
              />
          }
        </button>
      </header>
      <div className="flex-1 flex-col p-6 bg-gray-100 space-y-8">
        {children}
      </div>
    </section>
  )
}
