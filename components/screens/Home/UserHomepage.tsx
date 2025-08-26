'use client'
import { BorderBeam } from '@/components/magicui/border-beam'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { 
  Play, 
  BookOpen, 
  Star, 
  Clock, 
  CheckCircle, 
  Award, 
  Heart, 
  TrendingUp,
  Users,
  Target,
  Zap,
  ChevronRight,
  Filter,
  MoreHorizontal,
  Eye,
  ShoppingCart,
  Percent,
  Calendar
} from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const UserHomepage = () => {
  const [courseFilter, setCourseFilter] = useState('active')

  // Mock data
  const userData = {
    name: "Alex Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    completionRate: 78,
    hoursLearned: 156,
    certificatesEarned: 8
  }

  const continueLearning = {
    course: {
      id: 1,
      title: "AI Fundamentals",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      progress: 65,
      currentLesson: "Neural Networks Basics",
      totalLessons: 45,
      lastWatched: "2 hours ago"
    }
  }

  const myCourses = [
    { 
      id: 1, 
      title: "AI Fundamentals", 
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop", 
      status: "active", 
      progress: 65, 
      lessons: 45,
      lastAccessed: "2 hours ago"
    },
    { 
      id: 2, 
      title: "Machine Learning Basics", 
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop", 
      status: "active", 
      progress: 32, 
      lessons: 38,
      lastAccessed: "1 day ago"
    },
    { 
      id: 3, 
      title: "Web Development", 
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop", 
      status: "completed", 
      progress: 100, 
      lessons: 42,
      lastAccessed: "1 week ago"
    },
    { 
      id: 4, 
      title: "Data Science Essentials", 
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop", 
      status: "active", 
      progress: 18, 
      lessons: 35,
      lastAccessed: "3 days ago"
    }
  ]

  const wishlist = [
    { 
      id: 1, 
      title: "Advanced Deep Learning", 
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop", 
      price: 299, 
      originalPrice: 399,
      rating: 4.9,
      students: 1247
    },
    { 
      id: 2, 
      title: "Cloud Architecture", 
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop", 
      price: 249, 
      originalPrice: 349,
      rating: 4.7,
      students: 892
    }
  ]

  const recommendedCourses = [
    { 
      id: 1, 
      title: "Python for Data Science", 
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop", 
      price: 179, 
      originalPrice: 279,
      rating: 4.8,
      students: 2156,
      tag: "Popular"
    },
    { 
      id: 2, 
      title: "React Mastery", 
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop", 
      price: 199, 
      originalPrice: 299,
      rating: 4.9,
      students: 1847,
      tag: "Bestseller"
    },
    { 
      id: 3, 
      title: "DevOps Fundamentals", 
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop", 
      price: 159, 
      originalPrice: 259,
      rating: 4.6,
      students: 1234,
      tag: "New"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={userData.avatar} 
                alt={userData.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-slate-200"
              />
              <div>
                <h1 className="text-xl font-bold text-slate-900">Welcome back, {userData.name}</h1>
                <p className="text-sm text-slate-600">Continue your learning journey</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Heart className="w-5 h-5" />
              </Button>
              <Link href="/courses">
                <ShimmerButton className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Courses
                </ShimmerButton>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Continue Learning */}
        <div className="mb-8">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Continue Learning</h2>
              <p className="text-sm text-slate-600">Pick up where you left off</p>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3">
                  <div className="relative h-48 bg-slate-100 rounded-lg overflow-hidden">
                    <img 
                      src={continueLearning.course.thumbnail} 
                      alt={continueLearning.course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                        <Play className="w-5 h-5 mr-2" />
                        Resume
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-2/3">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{continueLearning.course.title}</h3>
                  <p className="text-slate-600 mb-4">Current lesson: {continueLearning.course.currentLesson}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                        <span>Progress</span>
                        <span>{continueLearning.course.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div 
                          className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${continueLearning.course.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-slate-600">
                        <BookOpen className="w-4 h-4 mr-2" />
                        {continueLearning.course.totalLessons} lessons
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {continueLearning.course.lastWatched}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* My Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">My Courses</h2>
                  <div className="flex items-center space-x-2">
                    <Select value={courseFilter} onValueChange={setCourseFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="all">All</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {myCourses.map((course) => (
                    <div key={course.id} className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-32 bg-slate-100">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge variant={course.status === 'completed' ? 'default' : 'secondary'}>
                            {course.status === 'completed' ? 'Completed' : 'In Progress'}
                          </Badge>
                        </div>
                        {course.status === 'completed' && (
                          <div className="absolute top-2 right-2">
                            <Award className="w-5 h-5 text-yellow-500" />
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-semibold text-slate-900 mb-2">{course.title}</h3>
                        
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
                          <span className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-1" />
                            {course.lessons} lessons
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {course.lastAccessed}
                          </span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Play className="w-4 h-4 mr-2" />
                            Continue
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Progress */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Your Progress</h2>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-900">{userData.completionRate}%</p>
                  <p className="text-sm text-blue-600">Completion Rate</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-900">{userData.hoursLearned}h</p>
                  <p className="text-sm text-green-600">Hours Learned</p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-purple-900">{userData.certificatesEarned}</p>
                  <p className="text-sm text-purple-600">Certificates Earned</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wishlist */}
        <div className="mt-8">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">My Wishlist</h2>
              <p className="text-sm text-slate-600">Courses you've saved for later</p>
            </div>
            
            <div className="p-6">
      <div className="grid md:grid-cols-2 gap-6">
                {wishlist.map((course) => (
                  <div key={course.id} className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-32 bg-slate-100">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/90">
                          <Heart className="w-4 h-4 text-red-500 fill-current" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-slate-900 mb-2">{course.title}</h3>
                      
                      <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                          {course.rating}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {course.students.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-slate-900">${course.price}</span>
                          <span className="text-sm text-slate-400 line-through">${course.originalPrice}</span>
                        </div>
                        <Button size="sm">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Enroll
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Limited Time Offers */}
        <div className="mt-8">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-5 h-5" />
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Limited Time
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold mb-2">Get 40% Off Your First 3 Courses!</h2>
                <p className="text-orange-100 mb-4">Perfect for beginners. Offer ends in 2 days.</p>
                <Button className="bg-white text-orange-600 hover:bg-orange-50">
                  Claim Offer
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="hidden md:block">
                <div className="text-center">
                  <div className="text-4xl font-bold">40%</div>
                  <div className="text-sm text-orange-100">OFF</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="mt-8">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Recommended for You</h2>
              <p className="text-sm text-slate-600">Based on your learning history</p>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {recommendedCourses.map((course) => (
                  <div key={course.id} className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-32 bg-slate-100">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge variant="default">
                          {course.tag}
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/90">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-slate-900 mb-2">{course.title}</h3>
                      
                      <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                          {course.rating}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {course.students.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-slate-900">${course.price}</span>
                          <span className="text-sm text-slate-400 line-through">${course.originalPrice}</span>
                        </div>
                        <Button size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
            </div>
          </div>
        </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UserHomepage
