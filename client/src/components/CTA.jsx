import { ArrowRight, Zap } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary via-indigo-600 to-purple-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 break-words">Have a Problem Worth Solving?</h2>
          <p className="text-xl text-blue-100 mb-12">
            Your community may have the next problem that inspires the next big innovation. Join thousands of citizens, students and organizations already making a difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:scale-105">
              <Zap size={20} className="mr-2" />
              Submit a Challenge
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-bold rounded-lg border-2 border-white hover:bg-white hover:text-primary transition-all flex items-center justify-center">
              Explore Challenges
              <ArrowRight size={20} className="ml-2" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold text-white">850+</p>
              <p className="text-blue-100 text-sm mt-2">Challenges Active</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">42</p>
              <p className="text-blue-100 text-sm mt-2">Universities</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">2.4M</p>
              <p className="text-blue-100 text-sm mt-2">People Impacted</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
