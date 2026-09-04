import { Lightbulb, Zap, BookOpen, Users, Building2, Rocket } from 'lucide-react'

export default function Collaboration() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Universities + Industry Collaboration</h2>
          <p className="text-xl text-gray-600">A powerful ecosystem where knowledge meets industry</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Universities */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Universities</h3>
              <div className="mt-2 h-1 w-12 bg-gradient-to-r from-primary to-purple-600 mx-auto rounded"></div>
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 hover-lift">
              <BookOpen className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Research Excellence</h4>
              <p className="text-sm text-gray-600">Cutting-edge research on real-world problems</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200 hover-lift">
              <Users className="h-8 w-8 text-purple-600 mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Faculty Expertise</h4>
              <p className="text-sm text-gray-600">Domain specialists from multiple disciplines</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-200 hover-lift">
              <Lightbulb className="h-8 w-8 text-indigo-600 mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Student Teams</h4>
              <p className="text-sm text-gray-600">Talented students seeking real-world impact</p>
            </div>
          </div>

          {/* Center - Collaborate Badge */}
          <div className="flex justify-center items-center">
            <div className="bg-blue-50 border border-blue-100 rounded-full p-8 w-40 h-40 flex flex-col items-center justify-center shadow-sm">
              <Rocket className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="text-sm font-bold text-blue-900 tracking-widest uppercase">Collaborate</h3>
            </div>
          </div>

          {/* Industry */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Industry</h3>
              <div className="mt-2 h-1 w-12 bg-gradient-to-r from-orange-500 to-secondary mx-auto rounded"></div>
            </div>

            <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-200 hover-lift">
              <Zap className="h-8 w-8 text-orange-600 mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Technology & Tools</h4>
              <p className="text-sm text-gray-600">Latest tech and platforms for implementation</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-amber-200 hover-lift">
              <Building2 className="h-8 w-8 text-amber-600 mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Mentorship & Funding</h4>
              <p className="text-sm text-gray-600">Expert guidance and financial support</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200 hover-lift">
              <Rocket className="h-8 w-8 text-yellow-600 mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Deployment & Scale</h4>
              <p className="text-sm text-gray-600">Bring solutions to market and scale impact</p>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <p className="text-4xl font-bold gradient-text mb-2">42</p>
            <p className="text-gray-600 font-medium">Universities Active</p>
          </div>
          <div className="text-center p-6">
            <p className="text-4xl font-bold gradient-text mb-2">86</p>
            <p className="text-gray-600 font-medium">Industry Partners</p>
          </div>
          <div className="text-center p-6">
            <p className="text-4xl font-bold gradient-text mb-2">120+</p>
            <p className="text-gray-600 font-medium">Active Solutions</p>
          </div>
        </div>
      </div>
    </section>
  )
}
