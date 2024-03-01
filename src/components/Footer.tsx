import footerImg from '../assets/footerImg.png'
import secondaryLogo from '../assets/secondaryLogo.png'

export function Footer() {
  return (
    <footer className="flex-col bg-zinc-950 p-8 rounded-md overflow-y-auto">
      <div className="flex-col">
        <h1 className="font-bold text-base text-white mb-5">
          Buscamos contribuir para a construção de um{' '}
          <b className="text-orange-600">futuro sustentável.</b>
        </h1>
        <img src={footerImg} alt="" className="max-w-52 mb-3" />
      </div>
      <hr className="mb-5" />
      <div className="flex-col">
        <div className="flex flex-col my-6">
          <small className="font-bold text-sm text-orange-500">Home</small>
          <a href="" className="cursor-pointer">
            <small className="text-xs text-white">Ferramentas</small>
          </a>
          <a href="" className="cursor-pointer">
            <small className="text-xs text-white ">Sobre nós</small>
          </a>
          <a href="" className="cursor-pointer">
            <small className="text-xs text-white ">Perguntas frequêntes</small>
          </a>
        </div>
        <hr className="mb-5" />
        <div className="flex-col mt-16">
          <img src={secondaryLogo} alt="" className="max-w-32 mb-4" />
          <small className="text-white">
            Venha fazer parte da construção desse futuro sustentável com a{' '}
            <b className="text-orange-500">SOLAB</b>
          </small>
        </div>
      </div>
    </footer>
  )
}
