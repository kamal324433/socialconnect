import { Flag, Zap, CheckCircle, Users, Lightbulb, Handshake, Rocket, TrendingUp } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    { number: '01', title: 'Report', description: 'Citizens submit real-world problems they identify in their communities', icon: Flag, color: 'bg-blue-900/50 text-blue-400 border-blue-500/30', dot: 'bg-blue-400', hoverBg: 'bg-blue-500/10' },
    { number: '02', title: 'Analyze', description: 'AI automatically categorizes, filters and prioritizes the challenges', icon: Zap, color: 'bg-indigo-900/50 text-indigo-400 border-indigo-500/30', dot: 'bg-indigo-400', hoverBg: 'bg-indigo-500/10' },
    { number: '03', title: 'Verify', description: 'Challenges are reviewed and validated by our expert committee', icon: CheckCircle, color: 'bg-emerald-900/50 text-emerald-400 border-emerald-500/30', dot: 'bg-emerald-400', hoverBg: 'bg-emerald-500/10' },
    { number: '04', title: 'Match', description: 'Suitable universities, students and experts are recommended via AI', icon: Users, color: 'bg-cyan-900/50 text-cyan-400 border-cyan-500/30', dot: 'bg-cyan-400', hoverBg: 'bg-cyan-500/10' },
    { number: '05', title: 'Innovate', description: 'Students and faculty develop cutting-edge solutions to the problems', icon: Lightbulb, color: 'bg-purple-900/50 text-purple-400 border-purple-500/30', dot: 'bg-purple-400', hoverBg: 'bg-purple-500/10' },
    { number: '06', title: 'Collaborate', description: 'Industry partners provide mentorship, funding and technological support', icon: Handshake, color: 'bg-pink-900/50 text-pink-400 border-pink-500/30', dot: 'bg-pink-400', hoverBg: 'bg-pink-500/10' },
    { number: '07', title: 'Deploy', description: 'Working solutions are tested and implemented in the real world', icon: Rocket, color: 'bg-orange-900/50 text-orange-400 border-orange-500/30', dot: 'bg-orange-400', hoverBg: 'bg-orange-500/10' },
    { number: '08', title: 'Impact', description: 'Social impact is continuously measured, monitored and communicated', icon: TrendingUp, color: 'bg-teal-900/50 text-teal-400 border-teal-500/30', dot: 'bg-teal-400', hoverBg: 'bg-teal-500/10' },
  ]

  return (
    <section id="how-it-works" className="py-24 bg-[#0B1120] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px]"></div>
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-cyan-900/10 blur-[100px]"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <span className="inline-block py-1.5 px-4 rounded-full bg-slate-800/80 text-blue-400 font-semibold text-sm mb-4 border border-slate-700 shadow-sm backdrop-blur-md">
            Our Process
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            From Problem to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Solution</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            A comprehensive, step-by-step methodology to transform local challenges into impactful, real-world innovations through collaboration.
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Central Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/20 via-indigo-500/20 to-teal-500/20 -translate-x-1/2 rounded-full"></div>
          
          {/* Line for Mobile */}
          <div className="md:hidden absolute left-[39px] top-4 bottom-4 w-1 bg-gradient-to-b from-blue-500/20 via-indigo-500/20 to-teal-500/20 rounded-full"></div>

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0
              
              return (
                <div 
                  key={index} 
                  className={`relative flex items-center md:mb-16 ${isEven ? 'md:flex-row-reverse' : ''}`}
                  style={{
                    animationDelay: `${index * 0.15}s`,
                    animation: 'fadeInUp 0.8s ease-out forwards',
                    opacity: 0
                  }}
                >
                  {/* Timeline Dot (Desktop) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-16 h-16 rounded-full border-4 border-[#0B1120] bg-slate-900 shadow-xl z-20 hover:scale-110 transition-transform duration-300 group">
                    <div className={`flex items-center justify-center w-full h-full rounded-full ${step.color} border shadow-inner transition-colors`}>
                      <Icon size={24} strokeWidth={2} />
                    </div>
                  </div>

                  {/* Timeline Dot (Mobile) */}
                  <div className="md:hidden absolute left-[39px] -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#0B1120] bg-slate-900 shadow-md z-20">
                    <div className={`flex items-center justify-center w-full h-full rounded-full ${step.color} border`}>
                      <Icon size={18} strokeWidth={2} />
                    </div>
                  </div>

                  {/* Spacer for Desktop */}
                  <div className="hidden md:block w-1/2"></div>

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-16 lg:pr-24' : 'md:pl-16 lg:pl-24'}`}>
                    <div className="p-8 bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-slate-700/50 shadow-lg-custom hover-lift relative group overflow-hidden transition-all duration-300 hover:border-slate-600 hover:bg-slate-800/60">
                      {/* Hover effect background */}
                      <div className={`absolute -right-12 -top-12 w-40 h-40 ${step.hoverBg} rounded-full blur-3xl -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xs py-1.5 px-3 rounded-full ${step.color} border font-bold tracking-wider uppercase shadow-sm`}>
                            Step {step.number}
                          </span>
                          <div className={`h-2.5 w-2.5 rounded-full ${step.dot} shadow-sm animate-pulse`}></div>
                        </div>
                        
                        <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-slate-200 transition-colors duration-300">{step.title}</h4>
                        <p className="text-slate-400 leading-relaxed text-lg">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
