import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '../services/api'
import {
  Search,
  Filter,
  MapPin,
  DollarSign,
  Users,
  TrendingUp,
  Star,
  Heart
} from 'lucide-react'

interface Startup {
  _id: string
  name: string
  description: string
  industry: string
  stage: string
  fundingStage: string
  fundingAmount: number
  location: {
    city: string
    country: string
  }
  logo?: string
  tags: string[]
  teamSize: string
  views: number
  likes: number
  owner: {
    name: string
  }
}

const Startups: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [industryFilter, setIndustryFilter] = useState('')
  const [stageFilter, setStageFilter] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [favorites, setFavorites] = useState<string[]>([])

  const { data: startups, isLoading, error } = useQuery({
    queryKey: ['startups', searchTerm, industryFilter, stageFilter, sortBy],
    queryFn: async () => {
      const params: any = {}
      if (searchTerm) params.search = searchTerm
      if (industryFilter) params.industry = industryFilter
      if (stageFilter) params.stage = stageFilter
      if (sortBy) params.sort = sortBy

      const response = await api.get('/startups', { params })
      return response.data.data
    }
  })

  const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'E-commerce', 'Energy', 'Transportation']
  const stages = ['Idea', 'Prototype', 'Seed', 'Growth', 'Scale']

  const toggleFavorite = (startupId: string) => {
    setFavorites(prev => 
      prev.includes(startupId) 
        ? prev.filter(id => id !== startupId)
        : [...prev, startupId]
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Startups</h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Startups</h1>
        <p className="text-gray-600">Find innovative startups and connect with founders</p>
      </div>

      {/* Search and Filters */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search startups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="input-field"
          >
            <option value="">All Industries</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="input-field"
          >
            <option value="">All Stages</option>
            {stages.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>{startups?.length || 0} startups found</span>
            <span>•</span>
            <span>{favorites.length} favorited</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field"
          >
            <option value="name">Sort by Name</option>
            <option value="fundingAmount">Sort by Funding</option>
            <option value="views">Sort by Views</option>
            <option value="likes">Sort by Likes</option>
          </select>
        </div>
      </div>

      {/* Startup Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups?.map((startup: Startup) => (
          <div key={startup._id} className="card group hover:shadow-lg transition-all duration-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {startup.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{startup.industry} • {startup.stage}</p>
              </div>
              <button
                onClick={() => toggleFavorite(startup._id)}
                className={`p-2 rounded-full transition-colors ${
                  favorites.includes(startup._id) 
                    ? 'text-red-500 bg-red-50' 
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart className="h-5 w-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {startup.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {startup.tags.slice(0, 3).map(tag => (
                <span key={tag} className="badge">{tag}</span>
              ))}
              {startup.tags.length > 3 && (
                <span className="badge">+{startup.tags.length - 3} more</span>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{startup.location.city}, {startup.location.country}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>{startup.teamSize} team</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>${startup.fundingAmount.toLocaleString()} {startup.fundingStage}</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>{startup.views} views</span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{startup.likes} likes</span>
              </div>
              <button className="btn-primary text-sm px-4 py-2">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {startups?.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No startups found</div>
          <p className="text-gray-400 mt-2">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  )
}

export default Startups