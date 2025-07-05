import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Ícone 404 */}
        <div className="text-pink-600 mb-6">
          <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
          </svg>
        </div>

        {/* Título */}
        <h1 className="text-6xl font-bold text-pink-800 mb-4">
          404
        </h1>

        {/* Subtítulo */}
        <h2 className="text-2xl font-semibold text-pink-700 mb-4">
          Página não encontrada
        </h2>

        {/* Descrição */}
        <p className="text-pink-600 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>

        {/* Botão para voltar */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
} 