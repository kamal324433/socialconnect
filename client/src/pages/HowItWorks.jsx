import React, { useState } from 'react';
import { Flag, Search, Users, Lightbulb, Rocket, TrendingUp, X, ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      id: 1,
      title: "RAISE A CHALLENGE",
      shortDesc: "Citizens and communities report real societal problems that need attention.",
      icon: Flag,
      who: "Citizens, local communities, NGOs",
      happens: "A problem is identified on the ground and submitted to the platform with details like location, category, and impact area.",
      outcome: "The challenge becomes visible on the platform for review."
    },
    {
      id: 2,
      title: "REVIEW & PRIORITIZE",
      shortDesc: "Challenges are reviewed, categorized and prioritized based on urgency, relevance and impact.",
      icon: Search,
      who: "Platform moderators, expert committees",
      happens: "Each submission is verified for authenticity, categorized, and assigned a priority score based on its potential social impact.",
      outcome: "A validated, structured problem statement is published."
    },
    {
      id: 3,
      title: "FIND THE RIGHT MINDS",
      shortDesc: "SocialConnect connects each challenge with relevant students, universities, experts and industry.",
      icon: Users,
      who: "Students, universities, researchers, industry experts",
      happens: "The platform matches challenges with people and organizations that have relevant skills, resources, and domain expertise.",
      outcome: "A collaborative team is formed to work on the challenge."
    },
    {
      id: 4,
      title: "BUILD THE SOLUTION",
      shortDesc: "Collaborative teams exchange ideas, research the problem and develop practical solutions.",
      icon: Lightbulb,
      who: "Innovation teams, academic mentors, industry sponsors",
      happens: "Teams collaborate in dedicated workspaces, exchanging research, prototyping designs, and developing viable solutions.",
      outcome: "A practical, testable prototype or strategy is created."
    },
    {
      id: 5,
      title: "TEST & DEPLOY",
      shortDesc: "Promising solutions are validated, refined and implemented with the right stakeholders.",
      icon: Rocket,
      who: "Implementation partners, government bodies, citizens",
      happens: "The solution is taken from the lab to the real world, tested in pilot programs, refined, and finally deployed at scale.",
      outcome: "The community problem is actively addressed with a tangible solution."
    },
    {
      id: 6,
      title: "MEASURE THE IMPACT",
      shortDesc: "Track implementation results, people benefited and measurable improvements in the community.",
      icon: TrendingUp,
      who: "Data analysts, monitoring agencies, community leaders",
      happens: "Post-deployment metrics are tracked to measure how many people benefited and how the community improved over time.",
      outcome: "Transparent impact reports are shared with all stakeholders."
    }
  ];

  return (
    <div className="w-full max-w-full overflow-x-hidden font-sans text-slate-800 bg-slate-50">
      
      {/* 1. Hero Section */}
      <section className="relative py-20 md:py-32 bg-slate-900 overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>

        <div className="container relative z-10 px-4 mx-auto max-w-7xl">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 mb-6 border rounded-full border-cyan-500/30 bg-cyan-500/10">
              <span className="text-sm font-semibold tracking-wide text-cyan-400 uppercase">The Process</span>
            </div>
            
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl break-words">
              How SocialConnect Turns Challenges into <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Impact</span>
            </h1>
            
            <p className="text-lg leading-relaxed text-slate-300 md:text-xl">
              A transparent journey connecting citizens, universities, experts and industry to solve real-world problems.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Interactive Timeline Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container px-4 mx-auto max-w-7xl relative z-10">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The Innovation Journey</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Click on any step to learn more about how we transform ideas into reality.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.id}
                  onClick={() => setActiveStep(step)}
                  className="group relative p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-cyan-200 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeInUp 0.6s ease-out forwards',
                    opacity: 0
                  }}
                >
                  {/* Hover effect background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Icon size={28} />
                    </div>
                    <span className="text-4xl font-black text-slate-100 group-hover:text-cyan-50 transition-colors duration-300 select-none">
                      0{step.id}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-700 transition-colors relative z-10">
                    {step.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed text-sm mb-6 flex-grow relative z-10">
                    {step.shortDesc}
                  </p>

                  <div className="flex items-center text-sm font-semibold text-cyan-600 mt-auto relative z-10">
                    View Details
                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Visual Flow */}
          <div className="mt-20 py-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
            <div className="min-w-max px-8 flex items-center justify-center space-x-4 md:space-x-8 text-sm md:text-base font-bold text-slate-400">
              <span className="text-slate-800 flex items-center">
                <Flag size={20} className="mr-2 text-cyan-600" />
                CHALLENGE
              </span>
              <ChevronRight size={20} />
              <span className="text-slate-800 flex items-center">
                <Users size={20} className="mr-2 text-cyan-600" />
                COLLABORATION
              </span>
              <ChevronRight size={20} />
              <span className="text-slate-800 flex items-center">
                <Lightbulb size={20} className="mr-2 text-cyan-600" />
                SOLUTION
              </span>
              <ChevronRight size={20} />
              <span className="text-slate-800 flex items-center">
                <TrendingUp size={20} className="mr-2 text-cyan-600" />
                IMPACT
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Why This Process Works */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why This Process Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Our methodology ensures that every effort is directed towards genuine, lasting impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-5xl font-black text-slate-200">01</span>
                <h3 className="text-xl font-bold text-slate-900">COLLABORATIVE</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Bring citizens, students, universities and industry together. By breaking down silos, we combine diverse perspectives and resources to tackle complex issues.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-5xl font-black text-slate-200">02</span>
                <h3 className="text-xl font-bold text-slate-900">PRACTICAL</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Focus on solutions that can actually be tested and implemented. We emphasize real-world viability over theoretical concepts to ensure genuine adoption.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-5xl font-black text-slate-200">03</span>
                <h3 className="text-xl font-bold text-slate-900">MEASURABLE</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Track outcomes and demonstrate real social impact. We rely on data-driven feedback loops to continuously monitor progress and refine our approach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-cyan-600/10 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="container px-4 mx-auto max-w-4xl relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 break-words">
            Have a problem worth solving?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Share a challenge with the SocialConnect community and help turn an idea into real-world impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/challenges">
              <button className="w-full sm:w-auto px-8 py-4 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-500 transition-all flex items-center justify-center shadow-lg shadow-cyan-600/30 transform hover:-translate-y-1">
                Submit a Challenge
              </button>
            </Link>
            <Link to="/challenges">
              <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-bold rounded-xl border border-slate-600 hover:bg-slate-800 hover:border-slate-500 transition-all flex items-center justify-center transform hover:-translate-y-1">
                Explore Challenges
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Modal Overlay */}
      {activeStep && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          onClick={() => setActiveStep(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-fade-in-up border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 p-4 md:p-6 flex items-center justify-between z-10">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-50 text-cyan-600">
                  <activeStep.icon size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  <span className="text-slate-400 mr-2">0{activeStep.id}.</span>
                  {activeStep.title}
                </h3>
              </div>
              <button 
                onClick={() => setActiveStep(null)} 
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Body */}
            <div className="p-6 md:p-8 space-y-8">
              {/* Who is involved */}
              <div>
                <h4 className="text-sm font-bold tracking-wider text-slate-400 uppercase mb-3 flex items-center">
                  <Users size={16} className="mr-2" /> Who is involved
                </h4>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-slate-700 font-medium">{activeStep.who}</p>
                </div>
              </div>

              {/* What happens */}
              <div>
                <h4 className="text-sm font-bold tracking-wider text-slate-400 uppercase mb-3 flex items-center">
                  <Search size={16} className="mr-2" /> What happens
                </h4>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {activeStep.happens}
                </p>
              </div>

              {/* Outcome */}
              <div>
                <h4 className="text-sm font-bold tracking-wider text-slate-400 uppercase mb-3 flex items-center">
                  <CheckCircle2 size={16} className="mr-2 text-green-500" /> Outcome
                </h4>
                <div className="p-5 bg-cyan-50 rounded-xl border border-cyan-100 flex items-start space-x-3">
                  <ArrowRight size={20} className="text-cyan-600 flex-shrink-0 mt-0.5" />
                  <p className="text-cyan-900 font-semibold leading-relaxed">
                    {activeStep.outcome}
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}
