import { Flag, Zap, CheckCircle, Users, Lightbulb, Handshake, Rocket, TrendingUp } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    { number: '01', title: 'Report', description: 'Citizens submit real-world problems they identify', icon: Flag, color: 'bg-blue-100 text-blue-600' },
    { number: '02', title: 'Analyze', description: 'AI categorizes and prioritizes challenges', icon: Zap, color: 'bg-purple-100 text-purple-600' },
    { number: '03', title: 'Verify', description: 'Challenges are reviewed and validated', icon: CheckCircle, color: 'bg-green-100 text-green-600' },
    { number: '04', title: 'Match', description: 'Suitable universities and experts are recommended', icon: Users, color: 'bg-indigo-100 text-indigo-600' },
    { number: '05', title: 'Innovate', description: 'Students and faculty develop solutions', icon: Lightbulb, color: 'bg-orange-100 text-orange-600' },
    { number: '06', title: 'Collaborate', description: 'Industry partners provide mentorship, funding and tech', icon: Handshake, color: 'bg-pink-100 text-pink-600' },
    { number: '07', title: 'Deploy', description: 'Solutions are tested and implemented', icon: Rocket, color: 'bg-red-100 text-red-600' },
    { number: '08', title: 'Impact', description: 'Social impact is measured and communicated', icon: TrendingUp, color: 'bg-green-100 text-green-600' },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">From Problem to Solution</h2>
          <p className="text-xl text-gray-600">Our proven 8-step process</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="relative"
                style={{
                  animationDelay: `${index * 0.08}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                }}
              >
                <div className="p-6 bg-white rounded-2xl border border-gray-200 h-full hover-lift">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold gradient-text">{step.number}</span>
                    <div className={`flex items-center justify-center h-12 w-12 rounded-full ${step.color}`}>
                      <Icon size={24} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden mt-12">
          <div className="relative space-y-8">
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary"></div>
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="ml-16 pb-4">
                  <div className={`flex items-center justify-center h-10 w-10 rounded-full ${step.color} absolute -left-5`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
