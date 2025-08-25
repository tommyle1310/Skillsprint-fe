"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Play, Star, Users, TrendingUp, CheckCircle, Clock, Award, Zap, ChevronRight, Plus, Minus } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Marquee } from "@/components/magicui/marquee";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { AvatarCircles } from "@/components/magicui/avatar-circles";
import { TextAnimate } from "@/components/magicui/text-animate";
import { GridBeams } from "@/components/magicui/grid-beams";
import { ProgressiveBlur } from "@/components/magicui/progressive-blur";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";
import { AnimatedList } from "@/components/magicui/animated-list";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import {Safari} from "@/components/magicui/safari";
import Iphone15Pro from "@/components/magicui/iphone-15-pro";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [stats, setStats] = useState({ students: 0, completion: 0, success: 0, instructors: 0 });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Animated counters
  useEffect(() => {
    const targetStats = { students: 12470, completion: 95, success: 89, instructors: 52 };
    const duration = 2000;
    const steps = 60;
    const stepValue = Object.keys(targetStats).reduce((acc, key) => {
      acc[key as keyof typeof targetStats] = targetStats[key as keyof typeof targetStats] / steps;
      return acc;
    }, {} as Record<keyof typeof targetStats, number>);

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setStats({
        students: Math.min(Math.round(currentStep * stepValue.students), targetStats.students),
        completion: Math.min(Math.round(currentStep * stepValue.completion), targetStats.completion),
        success: Math.min(Math.round(currentStep * stepValue.success), targetStats.success),
        instructors: Math.min(Math.round(currentStep * stepValue.instructors), targetStats.instructors)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setEmail("");
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const featuredCourses = [
    {
      id: 1,
      title: "AI & Machine Learning Mastery",
      description: "Master AI fundamentals, neural networks, and real-world applications in just 30 days",
      price: 199,
      originalPrice: 299,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      lessons: 45,
      duration: "30 hours",
      rating: 4.9,
      students: 2847,
      tags: ["Bestseller", "AI", "Hot"]
    },
    {
      id: 2,
      title: "Full-Stack Web Development",
      description: "Build modern web apps with React, Node.js, and cloud deployment",
      price: 149,
      originalPrice: 249,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      lessons: 38,
      duration: "25 hours",
      rating: 4.8,
      students: 2156,
      tags: ["Popular", "Web Dev", "Trending"]
    },
    {
      id: 3,
      title: "Data Science & Analytics",
      description: "Transform data into insights with Python, SQL, and visualization tools",
      price: 179,
      originalPrice: 279,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      lessons: 42,
      duration: "28 hours",
      rating: 4.9,
      students: 1987,
      tags: ["New", "Data", "Premium"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Senior AI Engineer at Google",
      content: "SkillSprint's AI course helped me land my dream job. The sequential learning approach is revolutionary - I actually retained everything!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      company: "Google",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Product Manager at Microsoft",
      content: "From zero to hero in 30 days! The structured approach and real-world projects made all the difference.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      company: "Microsoft",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Lead Developer at Netflix",
      content: "Finally, a platform that doesn't let you skip ahead. The sequential learning ensures you actually master every concept!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      company: "Netflix",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "How does sequential learning work?",
      answer: "Our platform locks each lesson until you've mastered the previous one through interactive quizzes and hands-on projects. This ensures you build a solid foundation before advancing."
    },
    {
      question: "What if I get stuck on a concept?",
      answer: "We provide unlimited access to our expert instructors, peer study groups, and AI-powered tutoring. You'll never be stuck for long!"
    },
    {
      question: "Can I learn at my own pace?",
      answer: "Absolutely! While lessons are sequential, you can take as much time as you need on each concept. Our adaptive system adjusts to your learning speed."
    },
    {
      question: "What's included in the free trial?",
      answer: "Get access to our first 3 lessons, interactive quizzes, and community features. No credit card required - start learning immediately!"
    }
  ];



  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 lg:py-32">
        <GridBeams className="absolute inset-0">
          <div></div>
        </GridBeams>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: App Mockup */}
            <div className="relative order-2 lg:order-1">
              <div className="relative mx-auto max-w-4xl">
                <Safari
                  videoSrc="/demo-video.mp4"
                  className="w-full h-auto drop-shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
            </div>

            {/* Right: Floating Card */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative max-w-lg mx-auto lg:mx-0 p-8 bg-white/90 backdrop-blur-sm rounded-3xl  overflow-hidden shadow-2xl border border-white/20">
                <BorderBeam />
                <ProgressiveBlur position="bottom" className="rounded-3xl" />
                
                <div className="relative z-10">
                  <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
                    <Zap className="w-3 h-3 mr-1" />
                    New Learning Method
                  </Badge>
                  
                  <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 overflow-hidden leading-tight">
                    Master AI Skills in{" "}
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      30 Minutes a Day
                    </span>
                  </h1>
                  
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    Stop wasting time on scattered tutorials. Our sequential learning platform ensures you master every concept before moving forward. 
                    <span className="font-semibold text-slate-800"> Join 12,000+ professionals who've accelerated their careers.</span>
                  </p>
                  
                  {/* Lead Capture Form */}
                  {!isSubmitted ? (
                    <form onSubmit={handleLeadSubmit} className="space-y-4">
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your work email"
                          className="w-full px-6 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                          required
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                      </div>
                      <ShimmerButton
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 text-lg font-semibold"
                      >
                        {isSubmitting ? "Starting..." : "Start Free – No Credit Card Required"}
                      </ShimmerButton>
                      <p className="text-sm text-slate-500 text-center">
                        ✨ Get instant access to 3 free lessons + AI cheat sheet
                      </p>
                    </form>
                  ) : (
                    <div className="text-center py-4">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">Welcome aboard!</h3>
                      <p className="text-slate-600">Check your email for exclusive learning resources and your AI cheat sheet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
              <Award className="w-3 h-3 mr-1" />
              Most Popular Courses
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Courses</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Join thousands of professionals mastering in-demand skills with our proven sequential learning approach
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <HoverCard key={course.id} openDelay={200}>
                <HoverCardTrigger asChild>
                  <div className="group cursor-pointer">
                    <BorderBeam />
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl border border-slate-100">
                      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          {course.tags.map((tag, tagIndex) => (
                            <Badge 
                              key={tagIndex} 
                              variant={tag === "Bestseller" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-semibold text-slate-700">{course.rating}</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{course.title}</h3>
                        <p className="text-slate-600 mb-4 line-clamp-2">{course.description}</p>
                        <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                          <span className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-1" />
                            {course.lessons} lessons
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {course.duration}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-3xl font-bold text-blue-600">${course.price}</span>
                            <span className="text-lg text-slate-400 line-through">${course.originalPrice}</span>
                          </div>
                          <span className="text-sm text-green-600 font-semibold">
                            {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500">{course.students.toLocaleString()} students enrolled</span>
                          <InteractiveHoverButton className="bg-blue-600 text-white hover:bg-blue-700">
                            Enroll Now
                          </InteractiveHoverButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900">{course.title}</h4>
                    <p className="text-sm text-slate-600">{course.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center text-slate-500">
                        <Users className="w-4 h-4 mr-1" />
                        {course.students.toLocaleString()} students
                      </span>
                      <span className="flex items-center text-slate-500">
                        <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                        {course.rating} rating
                      </span>
                    </div>
                    <div className="pt-2">
                      <Link href={`/courses/${course.id}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View full course details →
                      </Link>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/courses">
              <ShimmerButton className="px-8 py-4 text-lg">
                View All Courses
                <ChevronRight className="w-5 h-5 ml-2" />
              </ShimmerButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats & Community Section */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Trusted by 12,000+ Professionals</h2>
            <p className="text-xl text-slate-600">Join a community of successful learners and industry experts</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">{stats.students.toLocaleString()}+</div>
              <div className="text-slate-600">Active Students</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">{stats.completion}%</div>
              <div className="text-slate-600">Course Completion</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <TrendingUp className="w-10 h-10 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">{stats.success}%</div>
              <div className="text-slate-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Star className="w-10 h-10 text-yellow-600" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">{stats.instructors}+</div>
              <div className="text-slate-600">Expert Instructors</div>
            </div>
          </div>
          
          {/* Stats & Community Bento Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Left: Landing Page Stats & Social Proof */}
            <div className="space-y-6">
              {/* Key Landing Page Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">50+</div>
                  <div className="text-sm text-slate-600">Expert Instructors</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">200+</div>
                  <div className="text-sm text-slate-600">Premium Courses</div>
                </div>
              </div>
              
              {/* Trust Indicators */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Why Choose SkillSprint?</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">Sequential Learning</div>
                      <div className="text-sm text-slate-600">Master concepts step-by-step</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">4.9/5 Rating</div>
                      <div className="text-sm text-slate-600">From 10,000+ students</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">30-Day Guarantee</div>
                      <div className="text-sm text-slate-600">Money-back if not satisfied</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Proof */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Trusted by Industry Leaders</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-slate-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 mb-1">95%</div>
                    <div className="text-xs text-slate-600">Course Completion Rate</div>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600 mb-1">89%</div>
                    <div className="text-xs text-slate-600">Career Advancement</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-slate-600">Join professionals from</p>
                  <div className="flex items-center justify-center gap-4 mt-2 text-xs text-slate-500">
                    <span>Google</span>
                    <span>•</span>
                    <span>Microsoft</span>
                    <span>•</span>
                    <span>Netflix</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right: Course Categories with AnimatedList */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Explore Learning Paths</h3>
              <div className="relative max-h-[600px] overflow-hidden">
                <AnimatedList delay={1200}>
                  {[
                    { name: "Artificial Intelligence", description: "Machine Learning, Deep Learning, NLP", icon: "🤖", color: "#00C9A7", courses: 25 },
                    { name: "Web Development", description: "Frontend, Backend, Full-Stack", icon: "💻", color: "#FFB800", courses: 32 },
                    { name: "Data Science", description: "Analytics, Visualization, Big Data", icon: "📊", color: "#FF3D71", courses: 18 },
                    { name: "Mobile Development", description: "iOS, Android, React Native", icon: "📱", color: "#1E86FF", courses: 15 },
                    { name: "Cloud & DevOps", description: "AWS, Docker, Kubernetes", icon: "☁️", color: "#8B5CF6", courses: 22 },
                    { name: "Cybersecurity", description: "Ethical Hacking, Network Security", icon: "🔒", color: "#EC4899", courses: 12 },
                    { name: "Digital Marketing", description: "SEO, Social Media, Analytics", icon: "📈", color: "#10B981", courses: 28 },
                    { name: "Business & Finance", description: "Entrepreneurship, Investment", icon: "💼", color: "#F59E0B", courses: 20 },
                    { name: "IELTS", description: "English Language Test", icon: "🛒", color: "#FFB800", courses: 20 },
                    { name: "TOEFL", description: "English Language Test", icon: "🚚", color: "#FF3D71", courses: 20 },
                    { name: "GRE", description: "English Language Test", icon: "⭐", color: "#1E86FF", courses: 20 },
                    { name: "MOS", description: "Microsoft Office Suite", icon: "💼", color: "#8B5CF6", courses: 20 },
                    { name: "SAT", description: "English Language Test", icon: "🚋", color: "#EC4899", courses: 20 },
                    { name: "ACT", description: "English Language Test", icon: "🎑", color: "#10B981", courses: 20 },
                    { name: "GMAT", description: "English Language Test", icon: "👔", color: "#F59E0B", courses: 20 },
                    { name: "LSAT", description: "English Language Test", icon: "🎊", color: "#F59E0B", courses: 20 },
                    { name: "MCAT", description: "English Language Test", icon: "🇬🇧", color: "#1E86FF", courses: 20 }
                  ].map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-slate-100"
                    >
                      <div
                        className="flex size-12 items-center justify-center rounded-xl text-white"
                        style={{ backgroundColor: category.color }}
                      >
                        <span className="text-xl">{category.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-slate-900 truncate">{category.name}</span>
                          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                            {category.courses} courses
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 truncate">{category.description}</p>
                      </div>
                    </div>
                  ))}
                </AnimatedList>
                <ScrollProgress  className="top-[65px]" />
                <div className=" absolute inset-x-0 bottom-0 bg-gradient-to-t from-white"></div>
              </div>
            </div>
          </div>
          

        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">What Our Students Say</h2>
            <p className="text-xl text-slate-600">Join thousands of successful learners who've transformed their careers</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Testimonial Marquee */}
            <div className="relative">
              <Marquee className="py-8 h-full" pauseOnHover>
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="mx-4 w-80 h-full rounded-2xl overflow-hidden flex-grow relative">
                    <BorderBeam className="rounded-2xl" />
                    <div className="p-6 bg-slate-50 h-full flex-grow rounded-2xl border border-slate-200">
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-500 fill-current' : 'text-slate-300'}`} 
                          />
                        ))}
                      </div>
                      <blockquote className="text-lg text-slate-700 italic mb-4 leading-relaxed">
                        "{testimonial.content}"
                      </blockquote>
                      <div className="flex items-center">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full mr-3"
                        />
                        <div>
                          <div className="font-semibold text-slate-900">{testimonial.name}</div>
                          <div className="text-sm text-slate-600">{testimonial.role}</div>
                          <div className="text-xs text-slate-500">{testimonial.company}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Marquee>
            </div>

            {/* Right: Phone Mockup with Video */}
            <div className="relative">
              <div className="mx-auto max-w-xs">
                <Iphone15Pro
                  videoSrc="/testimonial-video.mp4"
                  className="w-full h-auto drop-shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600">Everything you need to know about our learning platform</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 text-lg">{faq.question}</span>
                  {expandedFaq === index ? (
                    <Minus className="w-5 h-5 text-slate-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-slate-600" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600  bottom-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Skills?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 12,000+ professionals who've already accelerated their careers with SkillSprint
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <ShimmerButton className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-4 text-lg">
                Explore Courses
                <ChevronRight className="w-5 h-5 ml-2" />
              </ShimmerButton>
            </Link>
            <Link href="/auth/register">
              <InteractiveHoverButton className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
                Start Learning Free
              </InteractiveHoverButton>
            </Link>
          </div>
          <p className="text-blue-100 text-sm mt-4">
            ✨ No credit card required • Start learning in 2 minutes
          </p>
        </div>
      </section>
    </div>
  );
}
