import { Users, Lightbulb, Zap } from 'lucide-react'
import PageHero from '../components/PageHero'
import Stats from '../components/Stats'
import ProblemSection from '../components/ProblemSection'
import CTA from '../components/CTA'

export default function Home() {
  const heroImage = (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-100">
            <Users className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-white">Citizen</h3>
        </div>
      </div>

      <div className="h-8 pl-7 flex items-center">
        <div className="w-0.5 h-full bg-gradient-to-b from-white to-white opacity-70"></div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-14 w-14 rounded-full bg-red-100">
            <Lightbulb className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-white">Problem</h3>
        </div>
      </div>

      <div className="h-8 pl-7 flex items-center">
        <div className="w-0.5 h-full bg-gradient-to-b from-white to-white opacity-70"></div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-14 w-14 rounded-full bg-purple-100">
            <Users className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-white">Solution</h3>
        </div>
      </div>

      <div className="h-8 pl-7 flex items-center">
        <div className="w-0.5 h-full bg-gradient-to-b from-white to-white opacity-70"></div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-100">
            <Zap className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-white">Impact</h3>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <PageHero
        title="Turn Community Problems into Real-World Solutions"
        subtitle="Jharkhand's Collaborative Innovation Platform"
        description="SocialConnect brings citizens, universities, students, government and industry together to transform societal challenges into innovative and practical solutions."
        image={heroImage}
        buttons={[
          { label: 'Submit a Challenge', primary: true, icon: true },
          { label: 'Explore Challenges', icon: true }
        ]}
        backgroundGradient="from-blue-900 via-blue-800 to-cyan-700"
      />
      <Stats />
      <ProblemSection />
      <CTA />
    </div>
  )
}
