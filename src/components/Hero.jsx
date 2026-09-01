import { ArrowRight, Users, Lightbulb, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" className="relative pt-20 pb-32 bg-gradient-to-br from-white via-blue-50 to-indigo-50">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-20"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center px-4 py-2 bg-blue-100 text-primary rounded-full">
              <Zap size={16} className="mr-2" />
              <span className="text-sm font-semibold">Jharkhand's Collaborative Innovation Platform</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Turn Community Problems into Real-World Solutions
            </h1>

            {/* Supporting Text */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              SocialConnect brings citizens, universities, students, government and industry together to transform societal challenges into innovative and practical solutions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="px-8 py-3 bg-gradient-primary text-white font-semibold rounded-lg hover:shadow-lg-custom transition-all flex items-center justify-center">
                Submit a Challenge
                <ArrowRight size={20} className="ml-2" />
              </button>
              <button className="px-8 py-3 bg-white text-primary font-semibold rounded-lg border-2 border-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center">
                Explore Challenges
                <ArrowRight size={20} className="ml-2" />
              </button>
            </div>
          </div>

          {/* Right Visualization */}
          <div className="animate-slide-in-right">
            <div className="relative">
              {/* Flow Diagram */}
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-100">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900">Citizen</h3>
                  </div>
                </div>

                <div className="h-8 pl-7 flex items-center">
                  <div className="w-0.5 h-full bg-gradient-to-b from-primary to-green-500"></div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-red-100">
                      <Lightbulb className="h-8 w-8 text-red-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900">Problem</h3>
                  </div>
                </div>

                <div className="h-8 pl-7 flex items-center">
                  <div className="w-0.5 h-full bg-gradient-to-b from-green-500 to-secondary"></div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-purple-100">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900">University</h3>
                  </div>
                </div>

                <div className="h-8 pl-7 flex items-center">
                  <div className="w-0.5 h-full bg-gradient-to-b from-secondary to-orange-500"></div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-orange-100">
                      <Zap className="h-8 w-8 text-orange-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900">Industry</h3>
                  </div>
                </div>

                <div className="h-8 pl-7 flex items-center">
                  <div className="w-0.5 h-full bg-gradient-to-b from-orange-500 to-green-500"></div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-green-100">
                      <Lightbulb className="h-8 w-8 text-secondary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900">Solution</h3>
                  </div>
                </div>

                <div className="h-8 pl-7 flex items-center">
                  <div className="w-0.5 h-full bg-gradient-to-b from-green-500 to-blue-500"></div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-100">
                      <Zap className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900">Impact</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
