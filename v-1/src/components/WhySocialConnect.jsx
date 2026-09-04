import { Users, Brain, Handshake, BarChart3, Eye, Target } from 'lucide-react'

export default function WhySocialConnect() {
  const features = [
    {
      title: 'Community Driven',
      description: 'Problems come directly from citizens who understand their communities best',
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'AI Powered',
      description: 'Smart categorization and matching ensures the right expertise finds each problem',
      icon: Brain,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'University Innovation',
      description: 'Students and researchers solve real problems with real impact potential',
      icon: Handshake,
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      title: 'Industry Collaboration',
      description: 'Companies provide expertise, resources and pathways to scale solutions',
      icon: Target,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Transparent Tracking',
      description: 'Track every project from problem identification through to deployment',
      icon: Eye,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Measurable Impact',
      description: 'Quantify real-world social outcomes and celebrate shared achievements',
      icon: BarChart3,
      color: 'bg-red-100 text-red-600'
    },
  ]

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why SocialConnect?</h2>
          <p className="text-xl text-gray-600">A platform designed for real impact</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative p-8 bg-white rounded-2xl border border-gray-200/80 hover:border-gray-300 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden cursor-default outline-none"
                style={{
                  animationDelay: `${index * 0.08}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                }}
              >
                
                <div className={`flex items-center justify-center h-12 w-12 rounded-lg ${feature.color} mb-6 transition-transform duration-300 group-hover:-translate-y-1`}>
                  <Icon size={24} />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-tight group-hover:text-blue-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-full">
            <p className="text-gray-700 font-semibold">
              ✓ Trusted by 42+ Universities, 86 Industry Partners & 24 Districts
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
