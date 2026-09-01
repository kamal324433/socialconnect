import { TrendingUp } from 'lucide-react'

export default function Stats() {
  const stats = [
    { number: '12,540+', label: 'Challenges Reported', icon: '📊' },
    { number: '3,280+', label: 'Solutions Developed', icon: '💡' },
    { number: '42', label: 'Universities Connected', icon: '🎓' },
    { number: '86', label: 'Industry Partners', icon: '🏢' },
    { number: '5,600+', label: 'Students Involved', icon: '👥' },
    { number: '2.4M+', label: 'People Impacted', icon: '🌍' },
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact by Numbers</h2>
          <p className="text-xl text-gray-600">Real progress in solving real problems</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="hover-lift p-8 bg-white rounded-2xl shadow-md"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.6s ease-out forwards',
              }}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
              <div className="mt-4 h-1 bg-gradient-to-r from-primary to-secondary w-12 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
