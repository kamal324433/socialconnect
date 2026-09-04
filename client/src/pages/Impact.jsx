import { TrendingUp, Users, MapPin, Rocket, BookOpen, Building2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import Impact from '../components/Impact'
import JharkhandSection from '../components/JharkhandSection'
import CTA from '../components/CTA'

export default function ImpactPage() {
  const impactMetrics = (
    <div className="space-y-3">
      {[
        { icon: Users, number: '2.4M+', label: 'People Benefited' },
        { icon: Rocket, number: '850+', label: 'Problems Solved' },
        { icon: MapPin, number: '24', label: 'Districts Covered' },
        { icon: BookOpen, number: '120+', label: 'Solutions Deployed' },
      ].map((metric, idx) => {
        const Icon = metric.icon
        return (
          <div key={idx} className="flex items-center space-x-3 p-3 bg-white bg-opacity-20 backdrop-blur rounded-lg border border-white border-opacity-30">
            <div className="flex-shrink-0">
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{metric.number}</p>
              <p className="text-xs text-blue-100">{metric.label}</p>
            </div>
          </div>
        )
      })}
    </div>
  )

  return (
    <div>
      <PageHero
        title="Measure the Impact You Create"
        subtitle="Real Solutions Creating Real Change"
        description="SocialConnect has transformed challenges into measurable social impact across Jharkhand. Thousands of people have benefited from innovative solutions developed through our platform."
        image={impactMetrics}
        buttons={[
          { label: 'View Impact Stories', primary: true, icon: true },
          { label: 'Explore Data', icon: true }
        ]}
        backgroundGradient="from-teal-900 via-teal-800 to-cyan-700"
      />

      <Impact />
      <JharkhandSection />

      {/* Impact Stories Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Stories of Change</h2>
            <p className="text-xl text-gray-600">Real people, real solutions, real impact</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Smart Irrigation System',
                location: 'Ranchi District',
                category: 'Agriculture',
                impact: '1,250 farmers',
                result: '35% increase in crop yield',
                story: 'Local farmers developed an IoT-based irrigation system that reduces water usage by 40% while improving yields.'
              },
              {
                title: 'Telemedicine Network',
                location: 'Gumla District',
                category: 'Healthcare',
                impact: '450 villages',
                result: '10,000+ lives saved',
                story: 'University students created a network connecting remote villages with specialist doctors through a mobile app.'
              },
              {
                title: 'Digital Literacy Program',
                location: 'Across 12 Districts',
                category: 'Education',
                impact: '2,350 students',
                result: '95% employment rate',
                story: 'Comprehensive online and offline training program empowering underprivileged youth with in-demand skills.'
              },
              {
                title: 'Waste Management System',
                location: 'Bokaro District',
                category: 'Environment',
                impact: '2,100 residents',
                result: 'Zero-waste village',
                story: 'Innovative recycling and composting system turned a polluted area into a model for sustainable waste management.'
              },
              {
                title: 'Water Purification Units',
                location: 'Hazaribagh District',
                category: 'Water',
                impact: '5,200 people',
                result: '100% safe drinking water',
                story: 'Cost-effective water purification technology deployed in schools providing clean water to entire villages.'
              },
              {
                title: 'Women Entrepreneurship Hub',
                location: 'Jamshedpur',
                category: 'Livelihood',
                impact: '850 women',
                result: '$2.5M business generated',
                story: 'Platform connecting women entrepreneurs with mentors, funding, and markets for sustainable income.'
              },
            ].map((story, idx) => (
              <div key={idx} className="hover-lift p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                <div className="mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">{story.category}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{story.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{story.location}</p>
                <p className="text-gray-700 mb-4 leading-relaxed">{story.story}</p>
                <div className="pt-4 border-t border-blue-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600">Impact</p>
                      <p className="font-bold text-primary">{story.impact}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Result</p>
                      <p className="font-bold text-secondary">{story.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  )
}
