import { BookOpen, Heart, Sprout, Droplets, Leaf, Trash2, Zap, Users, Accessibility, Building2, Shield, Navigation } from 'lucide-react'

export default function Categories() {
  const categories = [
    { name: 'Education', icon: BookOpen, description: 'Learning and skill development', count: '184 challenges', color: 'bg-blue-100 text-blue-600' },
    { name: 'Healthcare', icon: Heart, description: 'Medical and wellness solutions', count: '156 challenges', color: 'bg-red-100 text-red-600' },
    { name: 'Agriculture', icon: Sprout, description: 'Farming and food production', count: '142 challenges', color: 'bg-green-100 text-green-600' },
    { name: 'Water Management', icon: Droplets, description: 'Clean water and sanitation', count: '128 challenges', color: 'bg-cyan-100 text-cyan-600' },
    { name: 'Environment', icon: Leaf, description: 'Climate and conservation', count: '135 challenges', color: 'bg-emerald-100 text-emerald-600' },
    { name: 'Sanitation', icon: Trash2, description: 'Waste management solutions', count: '98 challenges', color: 'bg-amber-100 text-amber-600' },
    { name: 'Energy', icon: Zap, description: 'Renewable and clean energy', count: '112 challenges', color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Rural Livelihood', icon: Users, description: 'Income and employment', count: '167 challenges', color: 'bg-indigo-100 text-indigo-600' },
    { name: 'Accessibility', icon: Accessibility, description: 'Inclusive services and spaces', count: '89 challenges', color: 'bg-purple-100 text-purple-600' },
    { name: 'Urban Infrastructure', icon: Building2, description: 'City development', count: '145 challenges', color: 'bg-slate-100 text-slate-600' },
    { name: 'Public Services', icon: Shield, description: 'Government services', count: '121 challenges', color: 'bg-teal-100 text-teal-600' },
    { name: 'Transportation', icon: Navigation, description: 'Mobility solutions', count: '103 challenges', color: 'bg-fuchsia-100 text-fuchsia-600' },
  ]

  return (
    <section id="challenges" className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Societal Challenges</h2>
          <p className="text-xl text-gray-600">Browse categories and find problems you can help solve</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <div
                key={index}
                className="hover-lift p-6 bg-white rounded-2xl border border-gray-200 cursor-pointer transition-all"
                style={{
                  animationDelay: `${index * 0.05}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                }}
              >
                <div className={`flex items-center justify-center h-14 w-14 rounded-full ${category.color} mb-4`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-sm font-semibold text-primary">{category.count}</span>
                  <span className="text-lg">→</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
