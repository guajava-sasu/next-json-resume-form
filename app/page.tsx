import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <main className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              ✨ SaaS de Création de CV
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Créez votre CV au format{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              JSON Resume
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            La plateforme moderne pour créer et gérer votre CV professionnel selon le standard JSON Resume.
            Bientôt, un agent IA vous permettra de convertir automatiquement vos CV Word et PDF.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/basics"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Commencer maintenant
            </Link>
            <Link
              href="/preview"
              className="bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-200"
            >
              Voir un aperçu
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Format Standard</h3>
            <p className="text-gray-600">
              Utilisez le format JSON Resume, un standard ouvert reconnu par de nombreux outils et plateformes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Interface Intuitive</h3>
            <p className="text-gray-600">
              Créez et modifiez votre CV facilement grâce à notre interface moderne et conviviale.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">IA à venir</h3>
            <p className="text-gray-600">
              Bientôt, convertissez automatiquement vos CV Word et PDF grâce à notre agent IA intelligent.
            </p>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">🚀 Prochainement : Agent IA</h2>
          <p className="text-lg mb-6 text-blue-100">
            Importez vos CV existants au format Word (.docx) ou PDF et laissez notre agent IA les convertir automatiquement au format JSON Resume.
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-full">
              📄 Support Word
            </div>
            <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-full">
              📑 Support PDF
            </div>
            <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-full">
              🤖 Conversion IA
            </div>
            <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-full">
              ⚡ Instantané
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <section className="max-w-6xl mx-auto mt-16 grid md:grid-cols-2 gap-8 px-4">
          <article className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Qu&apos;est-ce que JSON Resume ?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              JSON Resume est un <strong>standard ouvert</strong> pour créer des CV au format JSON. 
              Ce format structuré permet de stocker toutes vos informations professionnelles de manière 
              universelle et réutilisable. Notre générateur JSON Resume vous permet de créer facilement 
              votre CV au format JSON Resume schema officiel.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Compatible avec tous les outils de l&apos;écosystème JSON Resume, notre <em>JSON Resume builder</em> 
              facilite la création, l&apos;édition et l&apos;export de votre CV professionnel.
            </p>
          </article>

          <article className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pourquoi utiliser JSON Resume ?</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span><strong>Standard universel :</strong> Format reconnu par la communauté tech mondiale</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span><strong>Réutilisable :</strong> Un seul CV JSON pour générer plusieurs designs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span><strong>Versionnable :</strong> Suivez l&lsquo;évolution de votre carrière avec Git</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span><strong>Automatisable :</strong> Intégrez votre CV dans vos applications</span>
              </li>
            </ul>
          </article>
        </section>
      </main>
    </div>
  );
}

