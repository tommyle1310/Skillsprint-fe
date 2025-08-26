'use client'
import { BorderBeam } from '@/components/magicui/border-beam'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { 
  Plus, 
  Bell, 
  DollarSign, 
  Users, 
  TrendingUp, 
  BookOpen, 
  Star, 
  Eye, 
  Edit, 
  BarChart3,
  Filter,
  MoreHorizontal,
  Play,
  Clock,
  CheckCircle,
  Award,
  Calendar,
  Target,
  Activity
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const TeacherHomepage = () => {
  const [courseFilter, setCourseFilter] = useState('all')
  const [timeRange, setTimeRange] = useState('month')

  // Mock data
  const teacherData = {
    name: "Dr. Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    totalEarnings: 15420,
    monthlyEarnings: 3240,
    totalStudents: 847,
    activeStudents: 234,
    totalCourses: 12,
    publishedCourses: 8
  }

  const students = [
    { id: 1, name: "Alex Chen", email: "alex@email.com", progress: 87, lastActive: "2 hours ago", status: "online" },
    { id: 2, name: "Maria Garcia", email: "maria@email.com", progress: 92, lastActive: "1 day ago", status: "active" },
    { id: 3, name: "David Kim", email: "david@email.com", progress: 78, lastActive: "3 days ago", status: "active" },
    { id: 4, name: "Emma Wilson", email: "emma@email.com", progress: 95, lastActive: "5 hours ago", status: "online" },
    { id: 5, name: "James Brown", email: "james@email.com", progress: 65, lastActive: "1 week ago", status: "inactive" }
  ]

  const courses = [
    { id: 1, title: "AI Fundamentals", thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop", status: "published", students: 156, rating: 4.8, price: 199 },
    { id: 2, title: "Machine Learning Basics", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop", status: "published", students: 89, rating: 4.6, price: 149 },
    { id: 3, title: "Deep Learning Advanced", thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop", status: "draft", students: 0, rating: 0, price: 299 },
    { id: 4, title: "Data Science Essentials", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop", status: "published", students: 203, rating: 4.9, price: 179 }
  ]

  const earningsData = [
    { month: 'Jan', earnings: 2800 },
    { month: 'Feb', earnings: 3200 },
    { month: 'Mar', earnings: 4100 },
    { month: 'Apr', earnings: 3800 },
    { month: 'May', earnings: 5200 },
    { month: 'Jun', earnings: 4800 }
  ]

  const topCourses = [
    { title: "AI Fundamentals", enrollments: 156, revenue: 31044, completion: 87 },
    { title: "Data Science Essentials", enrollments: 203, revenue: 36337, completion: 92 },
    { title: "Machine Learning Basics", enrollments: 89, revenue: 13261, completion: 78 }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header / Quick Actions */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={teacherData.avatar} 
                alt={teacherData.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-slate-200"
              />
              <div>
                <h1 className="text-xl font-bold text-slate-900">Welcome back, {teacherData.name}</h1>
                <p className="text-sm text-slate-600">Teacher Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Earnings Summary Badge */}
              <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">${teacherData.monthlyEarnings}</p>
                    <p className="text-xs text-green-600">This month</p>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
              </Button>

              {/* Create Course CTA */}
        <Link href="/courses/new">
          <ShimmerButton className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Create Course
          </ShimmerButton>
        </Link>
      </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Students</p>
                <p className="text-2xl font-bold text-slate-900">{teacherData.totalStudents}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">+12% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Students</p>
                <p className="text-2xl font-bold text-slate-900">{teacherData.activeStudents}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Clock className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-blue-600">This week</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Courses</p>
                <p className="text-2xl font-bold text-slate-900">{teacherData.totalCourses}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <CheckCircle className="w-4 h-4 text-purple-500 mr-1" />
              <span className="text-purple-600">{teacherData.publishedCourses} published</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Earnings</p>
                <p className="text-2xl font-bold text-slate-900">${teacherData.totalEarnings.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">+8% from last month</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* My Students */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">My Students</h2>
                  <Badge variant="secondary">{teacherData.totalStudents} total</Badge>
                </div>
                <p className="text-sm text-slate-600 mt-1">{teacherData.activeStudents} active this week</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {students.slice(0, 5).map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-slate-600">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{student.name}</p>
                          <p className="text-xs text-slate-500">{student.lastActive}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          student.status === 'online' ? 'bg-green-500' : 
                          student.status === 'active' ? 'bg-blue-500' : 'bg-slate-300'
                        }`} />
                        <span className="text-xs text-slate-500">{student.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Top performer</span>
                    <div className="flex items-center space-x-1">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-slate-900">Emma Wilson (95%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
      <div className="grid md:grid-cols-2 gap-6">
                  {courses.map((course) => (
                    <div key={course.id} className="border border-slate-200 rounded-lg overflow-hidden">
                      <div className="relative h-32 bg-slate-100">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                            {course.status}
                          </Badge>
                        </div>
                        <div className="absolute top-2 right-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <BarChart3 className="w-4 h-4 mr-2" />
                                Stats
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-semibold text-slate-900 mb-2">{course.title}</h3>
                        <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {course.students} students
                          </span>
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                            {course.rating || 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-slate-900">${course.price}</span>
                          <div className="flex space-x-1">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <BarChart3 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Earnings Dashboard */}
        <div className="mt-8">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Earnings Dashboard</h2>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600 mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold text-blue-900">${teacherData.totalEarnings.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600 mb-1">This Month</p>
                  <p className="text-2xl font-bold text-green-900">${teacherData.monthlyEarnings.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-600 mb-1">Net Earnings</p>
                  <p className="text-2xl font-bold text-purple-900">${(teacherData.totalEarnings * 0.85).toLocaleString()}</p>
                </div>
              </div>

              {/* Simple Chart Representation */}
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-slate-700 mb-4">Revenue Trend</h3>
                <div className="flex items-end space-x-2 h-32">
                  {earningsData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="bg-blue-500 rounded-t w-full"
                        style={{ height: `${(data.earnings / 6000) * 100}%` }}
                      />
                      <span className="text-xs text-slate-600 mt-2">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Selling Courses */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-slate-700 mb-4">Top Selling Courses</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Enrollments</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Completion</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topCourses.map((course, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>{course.enrollments}</TableCell>
                        <TableCell>${course.revenue.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-slate-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${course.completion}%` }}
                              />
                            </div>
                            <span className="text-sm text-slate-600">{course.completion}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>

        {/* Course Performance Analytics */}
        <div className="mt-8">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Course Performance Analytics</h2>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">1,247</p>
                  <p className="text-sm text-slate-600">Total Enrollments</p>
                </div>
                
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">87%</p>
                  <p className="text-sm text-slate-600">Completion Rate</p>
                </div>
                
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">4.8</p>
                  <p className="text-sm text-slate-600">Average Rating</p>
                </div>
                
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">92%</p>
                  <p className="text-sm text-slate-600">Satisfaction</p>
                </div>
              </div>

              {/* Feedback Highlights */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-slate-700 mb-4">Recent Feedback</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-900">"Excellent course structure!"</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">The sequential learning approach really helped me understand complex concepts step by step.</p>
                    <p className="text-xs text-slate-500 mt-2">- Alex Chen, 2 days ago</p>
                  </div>
                  
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-900">"Great practical examples"</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">Loved the real-world projects and hands-on exercises. Highly recommended!</p>
                    <p className="text-xs text-slate-500 mt-2">- Maria Garcia, 1 week ago</p>
          </div>
        </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default TeacherHomepage
