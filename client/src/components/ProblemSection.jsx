import { Users, Lightbulb, Zap } from 'lucide-react'

export default function ProblemSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Real Problems. Real People. Real Impact.</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Citizens often identify local problems, but there is no structured mechanism connecting these challenges with universities, researchers, students and industry.
          </p>
        </div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Citizens */}
          <div className="hover-lift p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
            <div className="flex items-center justify-center h-16 w-16 bg-blue-100 rounded-full mb-6">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Citizens</h3>
            <p className="text-gray-700 leading-relaxed">
              Identify and report local challenges they face in their daily lives and communities.
            </p>
          </div>

          {/* Universities */}
          <div className="hover-lift p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
            <div className="flex items-center justify-center h-16 w-16 bg-purple-100 rounded-full mb-6">
              <Lightbulb className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Universities</h3>
            <p className="text-gray-700 leading-relaxed">
              Provide knowledge, research expertise and student talent to develop innovative solutions.
            </p>
          </div>

          {/* Industry */}
          <div className="hover-lift p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-100">
            <div className="flex items-center justify-center h-16 w-16 bg-orange-100 rounded-full mb-6">
              <Zap className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Industry</h3>
            <p className="text-gray-700 leading-relaxed">
              Provide technology, mentorship, funding and implementation support to scale solutions.
            </p>
          </div>
        </div>

        {/* Connection Banner */}
        <div className="bg-gradient-primary text-white rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            SocialConnect connects them all.
          </h3>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Creating a seamless ecosystem where problems find solutions and communities thrive.
          </p>
        </div>
      </div>
    </section>
  )
}
