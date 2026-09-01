import { Flag, Zap, CheckCircle, Users, Lightbulb, Handshake, Rocket, TrendingUp } from 'lucide-react'
import PageHero from '../components/PageHero'
import CTA from '../components/CTA'

export default function HowItWorks() {
  const processVisual = (
    <div className="space-y-3">
      {[
        { num: '01', title: 'Report', icon: Flag },
        { num: '02', title: 'Analyze', icon: Zap },
        { num: '03', title: 'Verify', icon: CheckCircle },
        { num: '04', title: 'Match', icon: Users },
        { num: '05', title: 'Innovate', icon: Lightbulb },
        { num: '06', title: 'Collaborate', icon: Handshake },
        { num: '07', title: 'Deploy', icon: Rocket },
        { num: '08', title: 'Impact', icon: TrendingUp },
      ].map((step, idx) => {
        const Icon = step.icon
        return (
          <div key={idx} className="p-3 bg-white bg-opacity-20 backdrop-blur rounded-lg border border-white border-opacity-30 flex items-center space-x-3">
            <Icon className="h-5 w-5 text-white flex-shrink-0" />
            <div>
              <p className="font-bold text-white text-sm">{step.num} {step.title}</p>
            </div>
          </div>
        )
      })}
    </div>
  )

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
    <div>
      <PageHero
        title="From Problem to Solution"
        subtitle="Our 8-Step Innovation Process"
        description="SocialConnect uses a structured, proven methodology to transform societal challenges into scalable solutions. Every problem goes through rigorous analysis, expert matching, and impact measurement."
        image={processVisual}
        buttons={[
          { label: 'Get Started', primary: true, icon: true },
          { label: 'Learn More', icon: true }
        ]}
        backgroundGradient="from-red-900 via-red-800 to-orange-700"
      />

      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Proven Process</h2>
            <p className="text-xl text-gray-600">8 steps to transform problems into solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={index}
                  className="relative p-6 bg-white rounded-2xl border border-gray-200 h-full hover-lift"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold gradient-text">{step.number}</span>
                    <div className={`flex items-center justify-center h-12 w-12 rounded-full ${step.color}`}>
                      <Icon size={24} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why This Process Works</h2>
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-2xl border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Structured Validation</h3>
                  <p className="text-gray-600">Every challenge goes through rigorous verification to ensure quality and legitimacy</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Expert Matching</h3>
                  <p className="text-gray-600">AI-powered matching connects problems with the right expertise and resources</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Measurable Outcomes</h3>
                  <p className="text-gray-600">Every solution's impact is tracked and measured to ensure real-world change</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-primary text-white rounded-3xl p-8">
              <h3 className="text-3xl font-bold mb-8">By The Numbers</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-5xl font-bold mb-2">850+</p>
                  <p className="text-blue-100">Challenges Processed</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">120+</p>
                  <p className="text-blue-100">Active Solutions</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">2.4M</p>
                  <p className="text-blue-100">People Impacted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  )
}
