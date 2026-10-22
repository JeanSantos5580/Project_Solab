import logoSolab from '../assets/logoSolab.png'

export function Header() {
  return (
    <header className="flex justify-between items-center h-16 shadow-md py-4 mb-10 sm:rounded-md">
      <div className="flex flex-1 justify-center items-center">
        <img src={logoSolab} alt="Logo Solab" className="w-full max-w-28" />
      </div>
    </header>
  )
}
