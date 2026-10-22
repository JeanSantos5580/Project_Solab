import { Link } from 'react-router-dom'

export function Report() {
  return (
    <main className="px-4">
      <h1 className="mb-8 text-center font-bold text-3xl">
        Relatório de <b className="text-orange-600">dimensionamento.</b>
      </h1>
      <p className="mb-6 text-center text-gray-700">
        O relatório é gerado na própria página do Solab Sizer, após o
        preenchimento do formulário.
      </p>
      <div className="text-center">
        <Link
          to="/"
          className="inline-block rounded-lg bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600"
        >
          Voltar ao Solab Sizer
        </Link>
      </div>
    </main>
  )
}
