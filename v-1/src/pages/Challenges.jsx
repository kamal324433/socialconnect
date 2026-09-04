import { BookOpen, Heart, Sprout, Droplets, Leaf, Trash2, Zap, Users, Accessibility, Building2, Shield, Navigation } from 'lucide-react'
import PageHero from '../components/PageHero'
import FeaturedChallenges from '../components/FeaturedChallenges'
import CTA from '../components/CTA'

export default function Challenges() {
  const categoryPreview = (
    <div className="space-y-4">
      <div className="p-4 bg-white bg-opacity-20 backdrop-blur rounded-lg border border-white border-opacity-30">
        <div className="flex items-center space-x-3">
          <BookOpen className="h-6 w-6 text-white" />
          <div>
            <p className="font-bold text-white">Education</p>
            <p className="text-xs text-blue-100">184+ challenges</p>
          </div>
        </div>
      </div>
      <div className="p-4 bg-white bg-opacity-20 backdrop-blur rounded-lg border border-white border-opacity-30">
        <div className="flex items-center space-x-3">
          <Heart className="h-6 w-6 text-white" />
          <div>
            <p className="font-bold text-white">Healthcare</p>
            <p className="text-xs text-blue-100">156+ challenges</p>
          </div>
        </div>
      </div>
      <div className="p-4 bg-white bg-opacity-20 backdrop-blur rounded-lg border border-white border-opacity-30">
        <div className="flex items-center space-x-3">
          <Sprout className="h-6 w-6 text-white" />
          <div>
            <p className="font-bold text-white">Agriculture</p>
            <p className="text-xs text-blue-100">142+ challenges</p>
          </div>
        </div>
      </div>
      <div className="p-4 bg-white bg-opacity-20 backdrop-blur rounded-lg border border-white border-opacity-30">
        <div className="flex items-center space-x-3">
          <Leaf className="h-6 w-6 text-white" />
          <div>
            <p className="font-bold text-white">Environment</p>
            <p className="text-xs text-blue-100">135+ challenges</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <PageHero
        title="Explore Societal Challenges"
        subtitle="Real Problems from Real Communities"
        description="Browse challenges across 12 categories affecting Jharkhand. Find problems in education, healthcare, agriculture, environment, and more. Each challenge represents an opportunity to make a real difference."
        image={categoryPreview}
        buttons={[
          { label: 'View All Challenges', primary: true, icon: true },
          { label: 'Submit a Challenge', icon: true }
        ]}
        backgroundGradient="from-blue-900 via-blue-800 to-cyan-700"
      />

      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Challenge Categories</h2>
            <p className="text-xl text-gray-600">12 domains covering all major societal areas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Education', icon: BookOpen, desc: 'Learning and skill development', color: 'bg-blue-100 text-blue-600' },
              { name: 'Healthcare', icon: Heart, desc: 'Medical and wellness solutions', color: 'bg-red-100 text-red-600' },
              { name: 'Agriculture', icon: Sprout, desc: 'Farming and food production', color: 'bg-green-100 text-green-600' },
              { name: 'Water Management', icon: Droplets, desc: 'Clean water and sanitation', color: 'bg-cyan-100 text-cyan-600' },
              { name: 'Environment', icon: Leaf, desc: 'Climate and conservation', color: 'bg-emerald-100 text-emerald-600' },
              { name: 'Sanitation', icon: Trash2, desc: 'Waste management solutions', color: 'bg-amber-100 text-amber-600' },
              { name: 'Energy', icon: Zap, desc: 'Renewable and clean energy', color: 'bg-yellow-100 text-yellow-600' },
              { name: 'Rural Livelihood', icon: Users, desc: 'Income and employment', color: 'bg-indigo-100 text-indigo-600' },
              { name: 'Accessibility', icon: Accessibility, desc: 'Inclusive services', color: 'bg-purple-100 text-purple-600' },
              { name: 'Urban Infrastructure', icon: Building2, desc: 'City development', color: 'bg-slate-100 text-slate-600' },
              { name: 'Public Services', icon: Shield, desc: 'Government services', color: 'bg-teal-100 text-teal-600' },
              { name: 'Transportation', icon: Navigation, desc: 'Mobility solutions', color: 'bg-fuchsia-100 text-fuchsia-600' },
            ].map((cat, idx) => {
              const Icon = cat.icon
              return (
                <div key={idx} className="hover-lift p-6 bg-white rounded-2xl border border-gray-200 cursor-pointer">
                  <div className={`flex items-center justify-center h-14 w-14 rounded-full ${cat.color} mb-4`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.name}</h3>
                  <p className="text-gray-600 text-sm">{cat.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <FeaturedChallenges />
      <CTA />
    </div>
  )
}
