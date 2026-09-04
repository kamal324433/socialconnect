import { MapPin } from 'lucide-react'

export default function JharkhandSection() {
  const districts = [
    { name: 'Ranchi', challenges: 127, x: '50%', y: '45%' },
    { name: 'Dhanbad', challenges: 98, x: '65%', y: '35%' },
    { name: 'Bokaro', challenges: 112, x: '70%', y: '55%' },
    { name: 'Jamshedpur', challenges: 135, x: '75%', y: '60%' },
    { name: 'Hazaribagh', challenges: 89, x: '55%', y: '25%' },
    { name: 'Gumla', challenges: 76, x: '45%', y: '60%' },
    { name: 'Deoghar', challenges: 94, x: '60%', y: '15%' },
    { name: 'Dumka', challenges: 82, x: '45%', y: '20%' },
    { name: 'Giridih', challenges: 105, x: '50%', y: '30%' },
    { name: 'Palamu', challenges: 91, x: '35%', y: '50%' },
    { name: 'Khunti', challenges: 68, x: '55%', y: '65%' },
    { name: 'Simdega', challenges: 75, x: '50%', y: '72%' },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Building Innovation Across Jharkhand</h2>
          <p className="text-xl text-gray-600">Connecting communities across all districts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map Visualization */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border-2 border-blue-200 relative overflow-hidden">
              {/* Stylized map background */}
              <div className="absolute inset-0 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M 10,20 Q 30,15 50,25 T 90,40 L 85,60 Q 60,70 40,65 T 15,75 Z" fill="currentColor" />
                </svg>
              </div>

              <div className="relative h-80">
                {/* District Markers */}
                {districts.map((district, index) => (
                  <div
                    key={index}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{ left: district.x, top: district.y }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full border-3 border-white shadow-lg group-hover:scale-125 transition-transform"></div>
                      <div className="mt-2 bg-white px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs font-bold">
                        <p className="text-gray-900">{district.name}</p>
                        <p className="text-primary text-xs">{district.challenges} challenges</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">Hover over districts to see details</p>
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">24 Districts</h3>
                  <p className="text-gray-600 mt-1">Comprehensive coverage across Jharkhand</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border border-red-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="text-2xl">📊</div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">850+ Challenges</h3>
                  <p className="text-gray-600 mt-1">Real problems identified and reported</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="text-2xl">🚀</div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">120+ Projects</h3>
                  <p className="text-gray-600 mt-1">Active solutions in implementation</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="text-2xl">👥</div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">2.4M People Impacted</h3>
                  <p className="text-gray-600 mt-1">Lives changed through innovation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
