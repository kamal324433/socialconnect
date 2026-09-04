import { TrendingUp, Users, MapPin, Rocket, BookOpen, Building2 } from 'lucide-react'

export default function Impact() {
  const impactStats = [
    { icon: Users, number: '2.4M+', label: 'People Benefited' },
    { icon: Rocket, number: '850+', label: 'Problems Solved' },
    { icon: MapPin, number: '24', label: 'Districts Covered' },
    { icon: BookOpen, number: '120+', label: 'Solutions Deployed' },
    { icon: Users, number: '5,600+', label: 'Students Engaged' },
    { icon: Building2, number: '86', label: 'Industry Partners' },
  ]

  return (
    <section id="impact" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Measure the Impact You Create</h2>
          <p className="text-xl text-gray-600">Real solutions creating measurable change</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {impactStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="hover-lift p-8 bg-white rounded-2xl shadow-md border border-gray-100 text-center"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                }}
              >
                <div className="flex justify-center mb-6">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                <p className="text-gray-700 font-semibold">{stat.label}</p>
              </div>
            )
          })}
        </div>

        {/* Impact Visualization */}
        <div className="mt-16 p-8 bg-white rounded-3xl border-2 border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Impact Growth Over Time</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Chart Placeholder */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-gray-600">Impact metrics show consistent growth</p>
              </div>
            </div>

            {/* Impact Stories */}
            <div className="space-y-6">
              <div className="p-4 border-l-4 border-primary bg-blue-50 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Education Initiatives</h4>
                <p className="text-gray-600 text-sm">2,350+ students benefited from digital literacy programs</p>
              </div>
              <div className="p-4 border-l-4 border-secondary bg-green-50 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Healthcare Solutions</h4>
                <p className="text-gray-600 text-sm">450+ villages now have access to telemedicine services</p>
              </div>
              <div className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Agricultural Innovation</h4>
                <p className="text-gray-600 text-sm">1,200+ farmers increased yield by 35% using smart systems</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
