import { Users, Brain, Handshake, BarChart3, Eye, Target, Lightbulb, Rocket } from 'lucide-react'
import PageHero from '../components/PageHero'
import Collaboration from '../components/Collaboration'
import WhySocialConnect from '../components/WhySocialConnect'
import CTA from '../components/CTA'

export default function About() {
  const aboutPreview = (
    <div className="space-y-4">
      <div className="p-4 bg-white bg-opacity-20 backdrop-blur rounded-lg border border-white border-opacity-30">
        <div className="flex items-center space-x-3 mb-3">
          <Lightbulb className="h-6 w-6 text-white" />
          <h3 className="font-bold text-white">Our Mission</h3>
        </div>
        <p className="text-sm text-blue-100">Transform societal challenges into opportunities through collaborative innovation.</p>
      </div>
      <div className="p-4 bg-white bg-opacity-20 backdrop-blur rounded-lg border border-white border-opacity-30">
        <div className="flex items-center space-x-3 mb-3">
          <Rocket className="h-6 w-6 text-white" />
          <h3 className="font-bold text-white">Our Vision</h3>
        </div>
        <p className="text-sm text-blue-100">A Jharkhand where every problem has a solution and every citizen can contribute to change.</p>
      </div>
      <div className="p-4 bg-white bg-opacity-20 backdrop-blur rounded-lg border border-white border-opacity-30">
        <div className="flex items-center space-x-3">
          <Users className="h-6 w-6 text-white" />
          <div>
            <p className="font-bold text-white">Global Impact Network</p>
            <p className="text-xs text-blue-100">1000+ partners worldwide</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <PageHero
        title="About SocialConnect"
        subtitle="Building Innovation Across Jharkhand"
        description="SocialConnect is a transformative platform that connects citizens, universities, students, government, and industry to solve real-world societal problems. We believe that every challenge is an opportunity for innovation."
        image={aboutPreview}
        buttons={[
          { label: 'Join Our Community', primary: true, icon: true },
          { label: 'Learn More', icon: true }
        ]}
        backgroundGradient="from-blue-900 via-blue-800 to-purple-700"
      />

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Story</h2>
            
            <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
              <p>
                SocialConnect was born from a simple observation: communities in Jharkhand face countless challenges, yet the solutions often exist within reach. The problem was not the lack of ideas or resources, but the absence of a platform to connect the problem-solvers with the problem-finders.
              </p>

              <p>
                We recognized that citizens know their problems best, universities have the research capabilities, students bring fresh perspectives and energy, government provides structure and scale, and industry offers technology and resources. But they rarely worked together effectively.
              </p>

              <p>
                That's why we created SocialConnect — a bridge that brings all these stakeholders together in a structured, systematic way to turn challenges into opportunities and opportunities into impact.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Values</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                {[
                  {
                    title: 'Community-Driven',
                    description: 'We believe problems are best solved by those who face them daily.'
                  },
                  {
                    title: 'Innovation First',
                    description: 'We embrace creative, practical solutions over traditional approaches.'
                  },
                  {
                    title: 'Transparency',
                    description: 'Every project is tracked and impact is measured publicly.'
                  },
                  {
                    title: 'Collaboration',
                    description: 'No single entity can solve complex problems alone.'
                  },
                  {
                    title: 'Scalability',
                    description: 'Solutions must be sustainable and expandable across regions.'
                  },
                  {
                    title: 'Measurable Impact',
                    description: 'We focus on outcomes that improve lives and communities.'
                  },
                ].map((value, idx) => (
                  <div key={idx} className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <h4 className="font-bold text-primary mb-2">{value.title}</h4>
                    <p className="text-gray-700 text-sm">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">By The Numbers</h2>
            <p className="text-xl text-gray-600">SocialConnect's growth and impact</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '24', label: 'Districts Covered', icon: MapPin },
              { number: '42', label: 'Universities Active', icon: Lightbulb },
              { number: '86', label: 'Industry Partners', icon: Building2 },
              { number: '2.4M', label: 'People Impacted', icon: Users },
            ].map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div key={idx} className="text-center">
                  <div className="text-5xl font-bold gradient-text mb-3">{stat.number}</div>
                  <p className="text-gray-700 font-semibold">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Collaboration />
      <WhySocialConnect />
      <CTA />
    </div>
  )
}

function MapPin() {
  return <div className="text-4xl">📍</div>
}

function Building2() {
  return <div className="text-4xl">🏢</div>
}
