import { useState } from 'react'
import { ArrowRight, Users, Lightbulb, Zap, Flag, TrendingUp, X, MapPin, Tag, Calendar, ThumbsUp, MessageSquare, Briefcase } from 'lucide-react'

export default function Hero() {
  const [activeStep, setActiveStep] = useState(null)

  const CitizenPanel = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-blue-100 rounded-lg text-blue-600"><Users size={24} /></div>
        <h2 className="text-2xl font-bold text-gray-900">Citizen: Submit a Challenge</h2>
      </div>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Challenge Title</label>
          <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="E.g., Potholes on Main Street" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Infrastructure</option>
              <option>Environment</option>
              <option>Education</option>
              <option>Health</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-2.5 text-gray-400" />
              <input type="text" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="City or Zip" />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Describe the problem</label>
          <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24" placeholder="Provide details..."></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
          <input type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer" />
        </div>
        <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-2">
          Submit Challenge
        </button>
      </form>
    </div>
  )

  const ProblemPanel = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-red-100 rounded-lg text-red-600"><Flag size={24} /></div>
          <h2 className="text-2xl font-bold text-gray-900">Problem Details</h2>
        </div>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full border border-yellow-200">In Review</span>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Severe Flooding in Downtown Area</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          During the recent monsoon season, the downtown area has experienced severe flooding causing damage to local businesses and residential properties. The current drainage system is inadequate to handle the heavy rainfall.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <p className="text-xs text-gray-500 mb-1 flex items-center"><Tag size={12} className="mr-1"/> Category</p>
            <p className="font-semibold text-gray-800 text-sm">Infrastructure</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1 flex items-center"><MapPin size={12} className="mr-1"/> Location</p>
            <p className="font-semibold text-gray-800 text-sm">Ranchi, JH</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1 flex items-center"><Calendar size={12} className="mr-1"/> Submitted</p>
            <p className="font-semibold text-gray-800 text-sm">Oct 12, 2026</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1 flex items-center"><Users size={12} className="mr-1"/> Supporters</p>
            <p className="font-semibold text-gray-800 text-sm">342 Citizens</p>
          </div>
        </div>
        
        <button className="flex items-center justify-center w-full py-2.5 bg-white border-2 border-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors">
          <ThumbsUp size={18} className="mr-2" /> Support this Challenge
        </button>
      </div>
    </div>
  )

  const SolutionPanel = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-3 bg-green-100 rounded-lg text-green-600"><Lightbulb size={24} /></div>
        <h2 className="text-2xl font-bold text-gray-900">Collaborative Solutions</h2>
      </div>
      
      <div className="space-y-4">
        <div className="p-5 border border-gray-200 rounded-xl hover:border-green-300 transition-colors bg-white shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-bold text-lg text-gray-900">Smart Drainage Network Redesign</h4>
              <p className="text-sm text-gray-500 flex items-center mt-1">
                <Briefcase size={14} className="mr-1" /> NIT Jamshedpur • Civil Eng. Dept
              </p>
            </div>
            <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Top Rated</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            A proposed redesign of the existing drainage topography utilizing IoT sensors to monitor flow and dynamically redirect runoff to temporary catchment areas.
          </p>
          <div className="flex items-center space-x-4 border-t pt-3">
            <button className="flex items-center text-sm font-medium text-gray-500 hover:text-green-600 transition-colors">
              <ThumbsUp size={16} className="mr-1.5" /> 128 Upvotes
            </button>
            <button className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
              <MessageSquare size={16} className="mr-1.5" /> 24 Comments
            </button>
            <button className="flex items-center text-sm font-medium text-green-600 hover:text-green-700 transition-colors ml-auto">
              <Users size={16} className="mr-1.5" /> Join Team
            </button>
          </div>
        </div>
        
        <button className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl font-semibold hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all flex items-center justify-center">
          <Lightbulb size={18} className="mr-2" /> Submit a New Solution
        </button>
      </div>
    </div>
  )

  const ImpactPanel = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-purple-100 rounded-lg text-purple-600"><TrendingUp size={24} /></div>
        <h2 className="text-2xl font-bold text-gray-900">Real-World Impact</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-100 text-center">
          <p className="text-3xl font-bold text-purple-700 mb-1">1,240</p>
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Challenges Solved</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100 text-center">
          <p className="text-3xl font-bold text-blue-700 mb-1">8.5M</p>
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">People Benefited</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100 text-center">
          <p className="text-3xl font-bold text-green-700 mb-1">342</p>
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Projects Completed</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-100 text-center">
          <p className="text-3xl font-bold text-orange-700 mb-1">86</p>
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Partner Orgs</p>
        </div>
      </div>
      
      <div>
        <h3 className="font-bold text-gray-900 mb-3">Recent Success Story</h3>
        <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/3 bg-gray-200 h-32 sm:h-auto relative flex items-center justify-center">
            <span className="text-gray-400 text-sm font-medium">Before / After</span>
          </div>
          <div className="p-4 w-full sm:w-2/3">
            <h4 className="font-bold text-sm text-gray-900 mb-1">Clean Water Access in East District</h4>
            <p className="text-xs text-gray-600 mb-2">Implemented low-cost filtration systems developed by local university students, providing clean drinking water to 5,000+ residents.</p>
            <a href="#" className="text-xs font-semibold text-purple-600 hover:text-purple-800">Read full story &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <section id="home" className="relative pt-16 md:pt-20 pb-20 md:pb-32 bg-gradient-to-br from-white via-blue-50 to-indigo-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up lg:-ml-24">
            <div className="mb-6 inline-flex items-center px-4 py-2 bg-blue-100 text-primary rounded-full">
              <Zap className="mr-2 text-blue-600" size={16} />
              <span className="text-sm font-semibold text-blue-800">Jharkhand's Collaborative Innovation Platform</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight break-words">
              Turn Community Problems into Real-World Solutions
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              SocialConnect brings citizens, universities, students, government and industry together to transform societal challenges into innovative and practical solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="w-full sm:w-auto px-8 py-3 bg-gradient-primary text-white font-semibold rounded-lg hover:shadow-lg-custom transition-all flex items-center justify-center">
                Submit a Challenge
                <ArrowRight size={20} className="ml-2" />
              </button>
              <button className="w-full sm:w-auto px-8 py-3 bg-white text-primary font-semibold rounded-lg border-2 border-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center">
                Explore Challenges
                <ArrowRight size={20} className="ml-2" />
              </button>
            </div>
          </div>

          {/* Right Visualization */}
          <div className="animate-slide-in-right lg:ml-12 mt-12 lg:mt-0">
            <div className="relative">
              {/* Flow Diagram */}
              <div className="flex flex-col space-y-0">
                
                {/* Citizen */}
                <div 
                  onClick={() => setActiveStep('citizen')}
                  className={`group relative flex items-center space-x-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${activeStep === 'citizen' ? 'bg-white shadow-lg scale-105 border border-blue-100 z-10' : 'hover:bg-white/50 hover:scale-105 z-10'}`}
                >
                  <div className="flex-shrink-0">
                    <div className={`flex items-center justify-center h-14 w-14 rounded-full transition-colors duration-300 ${activeStep === 'citizen' ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'}`}>
                      <Users className="h-7 w-7" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold transition-colors ${activeStep === 'citizen' ? 'text-blue-700' : 'text-gray-900 group-hover:text-blue-600'}`}>Citizen</h3>
                    <p className="text-sm text-gray-500">Report a problem</p>
                  </div>
                  <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${activeStep === 'citizen' ? 'opacity-100 text-blue-500' : 'text-gray-400'}`}>
                     <ArrowRight size={20} />
                  </div>
                </div>

                {/* Connecting Line */}
                <div className="h-8 pl-11 flex items-center -my-2 relative z-0">
                  <div className="w-0.5 h-full bg-gradient-to-b from-blue-400 to-red-400 opacity-50"></div>
                </div>
                
                {/* Problem */}
                <div 
                  onClick={() => setActiveStep('problem')}
                  className={`group relative flex items-center space-x-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${activeStep === 'problem' ? 'bg-white shadow-lg scale-105 border border-red-100 z-10' : 'hover:bg-white/50 hover:scale-105 z-10'}`}
                >
                  <div className="flex-shrink-0">
                    <div className={`flex items-center justify-center h-14 w-14 rounded-full transition-colors duration-300 ${activeStep === 'problem' ? 'bg-red-600 text-white shadow-md' : 'bg-red-100 text-red-600 group-hover:bg-red-200'}`}>
                      <Flag className="h-7 w-7" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold transition-colors ${activeStep === 'problem' ? 'text-red-700' : 'text-gray-900 group-hover:text-red-600'}`}>Problem</h3>
                    <p className="text-sm text-gray-500">Review & Support</p>
                  </div>
                  <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${activeStep === 'problem' ? 'opacity-100 text-red-500' : 'text-gray-400'}`}>
                     <ArrowRight size={20} />
                  </div>
                </div>

                {/* Connecting Line */}
                <div className="h-8 pl-11 flex items-center -my-2 relative z-0">
                  <div className="w-0.5 h-full bg-gradient-to-b from-red-400 to-green-400 opacity-50"></div>
                </div>
                
                {/* Solution */}
                <div 
                  onClick={() => setActiveStep('solution')}
                  className={`group relative flex items-center space-x-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${activeStep === 'solution' ? 'bg-white shadow-lg scale-105 border border-green-100 z-10' : 'hover:bg-white/50 hover:scale-105 z-10'}`}
                >
                  <div className="flex-shrink-0">
                    <div className={`flex items-center justify-center h-14 w-14 rounded-full transition-colors duration-300 ${activeStep === 'solution' ? 'bg-green-600 text-white shadow-md' : 'bg-green-100 text-green-600 group-hover:bg-green-200'}`}>
                      <Lightbulb className="h-7 w-7" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold transition-colors ${activeStep === 'solution' ? 'text-green-700' : 'text-gray-900 group-hover:text-green-600'}`}>Solution</h3>
                    <p className="text-sm text-gray-500">Collaborate & Innovate</p>
                  </div>
                  <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${activeStep === 'solution' ? 'opacity-100 text-green-500' : 'text-gray-400'}`}>
                     <ArrowRight size={20} />
                  </div>
                </div>

                {/* Connecting Line */}
                <div className="h-8 pl-11 flex items-center -my-2 relative z-0">
                  <div className="w-0.5 h-full bg-gradient-to-b from-green-400 to-purple-400 opacity-50"></div>
                </div>
                
                {/* Impact */}
                <div 
                  onClick={() => setActiveStep('impact')}
                  className={`group relative flex items-center space-x-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${activeStep === 'impact' ? 'bg-white shadow-lg scale-105 border border-purple-100 z-10' : 'hover:bg-white/50 hover:scale-105 z-10'}`}
                >
                  <div className="flex-shrink-0">
                    <div className={`flex items-center justify-center h-14 w-14 rounded-full transition-colors duration-300 ${activeStep === 'impact' ? 'bg-purple-600 text-white shadow-md' : 'bg-purple-100 text-purple-600 group-hover:bg-purple-200'}`}>
                      <TrendingUp className="h-7 w-7" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold transition-colors ${activeStep === 'impact' ? 'text-purple-700' : 'text-gray-900 group-hover:text-purple-600'}`}>Impact</h3>
                    <p className="text-sm text-gray-500">Measure & Scale</p>
                  </div>
                  <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${activeStep === 'impact' ? 'opacity-100 text-purple-500' : 'text-gray-400'}`}>
                     <ArrowRight size={20} />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {activeStep && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setActiveStep(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveStep(null)} 
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X size={24} />
            </button>
            
            <div className="p-6 md:p-8">
              {activeStep === 'citizen' && <CitizenPanel />}
              {activeStep === 'problem' && <ProblemPanel />}
              {activeStep === 'solution' && <SolutionPanel />}
              {activeStep === 'impact' && <ImpactPanel />}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
