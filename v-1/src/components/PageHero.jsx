import { ArrowRight } from 'lucide-react'

export default function PageHero({ title, subtitle, description, image, buttons, backgroundGradient = 'from-primary via-indigo-600 to-purple-600' }) {
  return (
    <section className={`relative py-16 md:py-32 bg-gradient-to-r ${backgroundGradient} overflow-hidden`}>
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight break-words">
              {title}
            </h1>

            {subtitle && (
              <p className="text-xl text-blue-100 mb-4 font-semibold">
                {subtitle}
              </p>
            )}

            <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-xl">
              {description}
            </p>

            {buttons && (
              <div className="flex flex-col sm:flex-row gap-4">
                {buttons.map((btn, idx) => (
                  <button
                    key={idx}
                    className={`w-full sm:w-auto px-8 py-3 font-semibold rounded-lg transition-all flex items-center justify-center ${
                      btn.primary
                        ? 'bg-white text-primary hover:bg-gray-100 shadow-lg hover:shadow-2xl'
                        : 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary'
                    }`}
                  >
                    {btn.label}
                    {btn.icon && <ArrowRight size={20} className="ml-2" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Image/Visual */}
          {image && (
            <div className="animate-slide-in-right">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-8 border border-white border-opacity-20">
                {image}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
