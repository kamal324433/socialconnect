import { Brain, Tag, Award, Target } from 'lucide-react'

export default function AISection() {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Smart Challenges Powered by AI</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            SocialConnect uses artificial intelligence to intelligently categorize problems, detect duplicates, prioritize urgent issues, and match challenges with the right expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left - Features */}
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-gray-200 hover-lift">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                    <Brain size={24} className="text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Auto-Categorization</h3>
                  <p className="text-gray-600">Automatically categorize problems by domain and complexity level</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-200 hover-lift">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100">
                    <Tag size={24} className="text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Duplicate Detection</h3>
                  <p className="text-gray-600">Detect similar challenges to avoid redundant work</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-200 hover-lift">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                    <Award size={24} className="text-red-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Smart Prioritization</h3>
                  <p className="text-gray-600">Identify urgent problems affecting the most people</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-200 hover-lift">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <Target size={24} className="text-secondary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Skill Matching</h3>
                  <p className="text-gray-600">Recommend required skills and suitable universities</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Mock AI Card */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-20"></div>
            <div className="relative bg-white rounded-3xl p-8 border-2 border-gray-200">
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">AI Analysis</h3>
                <h2 className="text-2xl font-bold text-gray-900">Crop Disease Detection System</h2>
              </div>

              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <p className="text-sm text-gray-500 font-semibold mb-2">Challenge Category</p>
                  <p className="text-lg font-semibold text-gray-900">Agriculture</p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <p className="text-sm text-gray-500 font-semibold mb-2">AI Priority Score</p>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full w-11/12"></div>
                    </div>
                    <span className="text-lg font-bold text-primary">94%</span>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <p className="text-sm text-gray-500 font-semibold mb-3">Required Skills</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">AI/ML</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">IoT</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Agriculture</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-semibold mb-2">University Match Score</p>
                  <p className="text-2xl font-bold gradient-text">92%</p>
                </div>
              </div>

              <button className="w-full mt-8 px-6 py-3 bg-gradient-primary text-white font-semibold rounded-lg hover:shadow-lg-custom transition-all">
                Start Solving →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-blue-50 border-2 border-blue-200 rounded-2xl">
          <p className="text-gray-700 text-center">
            <strong>Note:</strong> This is a frontend demonstration. The AI features showcase how intelligent matching can work. In production, these would connect with backend ML services.
          </p>
        </div>
      </div>
    </section>
  )
}
