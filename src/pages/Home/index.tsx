import { Link } from 'react-router-dom'

export function Home() {
  return (
    <main className="px-4">
      <h1 className="mb-6 text-center font-bold text-3xl">
        Bem-vindo à <b className="text-orange-600">Solab</b>
      </h1>
      <p className="mb-6 text-center text-gray-700">
        Use o Solab Sizer para estimar o sistema fotovoltaico ideal para o seu
        consumo.
      </p>
      <div className="text-center">
        <Link
          to="/"
          className="inline-block rounded-lg bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600"
        >
          Acessar o Solab Sizer
        </Link>
      </div>
    </main>
  )
}
