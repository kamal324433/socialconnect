import { Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">SocialConnect</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Connect Problems. Create Solutions. Build Impact.
            </p>
            <p className="text-gray-500 text-sm">
              Jharkhand's collaborative platform for solving societal challenges through innovation.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Platform</h4>
            <ul className="space-y-3">
              <li><a href="#challenges" className="text-gray-400 hover:text-white transition-colors">Challenges</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#impact" className="text-gray-400 hover:text-white transition-colors">Impact</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
            </ul>
          </div>

          {/* Categories Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Categories</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Education</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Healthcare</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Agriculture</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Environment</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Water & Sanitation</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Connect</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary" />
                <a href="mailto:hello@socialconnect.in" className="text-gray-400 hover:text-white transition-colors">hello@socialconnect.in</a>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin size={18} className="text-primary" />
                <span className="text-gray-400">Ranchi, Jharkhand</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary" />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-white transition-colors">+91 9876 543 210</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2026 SocialConnect. Built for societal innovation. | All rights reserved.
          </p>
          <div className="flex space-x-6 mt-6 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Community Guidelines</a>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm font-medium">Twitter</a>
          <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm font-medium">LinkedIn</a>
          <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm font-medium">Facebook</a>
          <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm font-medium">Instagram</a>
        </div>
      </div>
    </footer>
  )
}
