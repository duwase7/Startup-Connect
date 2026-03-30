import React from 'react'
import { Link } from 'react-router-dom'
import {
  Building2,
  Users,
  Handshake,
  Rocket,
  Search,
  MapPin,
  Star
} from 'lucide-react'

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Connect.{' '}
                  <span className="text-gradient">Collaborate.</span>{' '}
                  <span className="text-primary-600">Grow.</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  StartupConnect is the premier platform where startups meet mentors, 
                  investors, and collaborators. Build meaningful connections that drive 
                  innovation and accelerate growth.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/startups"
                  className="btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2"
                >
                  <Search className="h-5 w-5" />
                  <span>Explore Startups</span>
                </Link>
                <Link
                  to="/register"
                  className="btn-secondary text-lg px-8 py-3 flex items-center justify-center space-x-2"
                >
                  <Rocket className="h-5 w-5" />
                  <span>Get Started</span>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">1000+</div>
                  <div className="text-sm text-gray-600">Startups</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Investors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">2000+</div>
                  <div className="text-sm text-gray-600">Connections</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-50 rounded-lg p-4">
                    <Building2 className="h-8 w-8 text-primary-600 mb-2" />
                    <h3 className="font-semibold">Startup Discovery</h3>
                    <p className="text-sm text-gray-600 mt-1">Find innovative startups in your industry</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <Users className="h-8 w-8 text-blue-600 mb-2" />
                    <h3 className="font-semibold">Network Building</h3>
                    <p className="text-sm text-gray-600 mt-1">Connect with industry leaders</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <Handshake className="h-8 w-8 text-green-600 mb-2" />
                    <h3 className="font-semibold">Partnerships</h3>
                    <p className="text-sm text-gray-600 mt-1">Form strategic alliances</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <Star className="h-8 w-8 text-purple-600 mb-2" />
                    <h3 className="font-semibold">Mentorship</h3>
                    <p className="text-sm text-gray-600 mt-1">Learn from experienced mentors</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-100 rounded-full opacity-50"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-100 rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive tools and features designed for startup success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card group hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                  <Search className="h-6 w-6 text-primary-600 group-hover:text-white" />
                </div>
                <h3 className="ml-4 text-xl font-semibold">Advanced Search</h3>
              </div>
              <p className="text-gray-600">
                Find the right startups, investors, and mentors with powerful search filters 
                and intelligent recommendations.
              </p>
            </div>

            <div className="card group hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <MapPin className="h-6 w-6 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="ml-4 text-xl font-semibold">Location Mapping</h3>
              </div>
              <p className="text-gray-600">
                Visualize startup ecosystems on interactive maps and discover opportunities 
                in your area.
              </p>
            </div>

            <div className="card group hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                  <Star className="h-6 w-6 text-green-600 group-hover:text-white" />
                </div>
                <h3 className="ml-4 text-xl font-semibold">Analytics Dashboard</h3>
              </div>
              <p className="text-gray-600">
                Track your network growth, engagement metrics, and discover insights 
                to optimize your strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Startup Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of startups, investors, and mentors who are building 
            the future together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              to="/startups"
              className="border-2 border-white hover:bg-white hover:text-primary-600 font-bold py-3 px-8 rounded-lg text-lg transition-colors"
            >
              Explore Startups
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home