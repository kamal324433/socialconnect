import { AlertCircle, Clock, Users } from 'lucide-react'

export default function FeaturedChallenges() {
  const challenges = [
    {
      title: 'Smart Irrigation for Small Farmers',
      category: 'Agriculture',
      district: 'Ranchi',
      priority: 'High',
      priorityColor: 'bg-red-100 text-red-700',
      affected: '1,250',
      status: 'In Progress',
      description: 'Developing IoT-based irrigation systems for water conservation'
    },
    {
      title: 'Rural Healthcare Accessibility',
      category: 'Healthcare',
      district: 'Gumla',
      priority: 'Critical',
      priorityColor: 'bg-red-200 text-red-800',
      affected: '4,500',
      status: 'Verified',
      description: 'Creating telemedicine solutions for remote villages'
    },
    {
      title: 'Village Waste Management',
      category: 'Environment',
      district: 'Bokaro',
      priority: 'Medium',
      priorityColor: 'bg-yellow-100 text-yellow-700',
      affected: '2,100',
      status: 'Assigned',
      description: 'Implementing sustainable waste disposal systems'
    },
    {
      title: 'Vocational Skills Training Hub',
      category: 'Rural Livelihood',
      district: 'Dhanbad',
      priority: 'High',
      priorityColor: 'bg-red-100 text-red-700',
      affected: '3,800',
      status: 'In Progress',
      description: 'Building skill development programs for rural youth'
    },
    {
      title: 'Clean Drinking Water Solution',
      category: 'Water Management',
      district: 'Hazaribagh',
      priority: 'Critical',
      priorityColor: 'bg-red-200 text-red-800',
      affected: '5,200',
      status: 'Verified',
      description: 'Deploying water purification technology in schools'
    },
    {
      title: 'Women Education Outreach',
      category: 'Education',
      district: 'Jamshedpur',
      priority: 'High',
      priorityColor: 'bg-red-100 text-red-700',
      affected: '1,600',
      status: 'Assigned',
      description: 'Digital literacy programs for underprivileged girls'
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Challenges That Need Your Ideas</h2>
          <p className="text-xl text-gray-600">Browse real problems from communities across Jharkhand</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {challenges.map((challenge, index) => (
            <div
              key={index}
              className="hover-lift bg-white rounded-2xl border border-gray-200 p-6 h-full flex flex-col"
              style={{
                animationDelay: `${index * 0.08}s`,
                animation: 'fadeInUp 0.6s ease-out forwards',
              }}
            >
              <div className="mb-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{challenge.category} • {challenge.district}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${challenge.priorityColor}`}>
                    {challenge.priority}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{challenge.title}</h3>
              </div>

              <p className="text-gray-600 text-sm mb-6 flex-grow">{challenge.description}</p>

              <div className="space-y-3 mb-6 pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <Users size={18} className="text-gray-500" />
                  <span className="text-sm text-gray-600"><strong>{challenge.affected} people</strong> affected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={18} className="text-gray-500" />
                  <span className="text-sm text-gray-600">Status: <strong>{challenge.status}</strong></span>
                </div>
              </div>

              <button className="w-full px-4 py-2 bg-gradient-primary text-white font-medium rounded-lg hover:shadow-lg-custom transition-all">
                View Challenge
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="px-8 py-3 bg-white text-primary font-semibold rounded-lg border-2 border-primary hover:bg-primary hover:text-white transition-all inline-flex items-center">
            View All Challenges
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
