"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Play, Star, Users, TrendingUp, CheckCircle } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Marquee } from "@/components/magicui/marquee";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { AvatarCircles } from "@/components/magicui/avatar-circles";
import { TextAnimate } from "@/components/magicui/text-animate";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      title: "Web Development Masterclass",
      description: "Learn modern web development from scratch to advanced concepts",
      price: 99,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      lessons: 25,
      duration: "15 hours"
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      description: "Master the basics of data science and machine learning",
      price: 79,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      lessons: 20,
      duration: "12 hours"
    },
    {
      id: 3,
      title: "Digital Marketing Strategy",
      description: "Build effective digital marketing campaigns that convert",
      price: 89,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      lessons: 18,
      duration: "10 hours"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Frontend Developer",
      content: "SkillSprint helped me transition from design to development. The sequential learning approach is brilliant!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Mike Chen",
      role: "Product Manager",
      content: "The quiz-based courses are perfect for busy professionals. I learned more in 2 weeks than in months of self-study.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Specialist",
      content: "Finally, a platform that doesn&apos;t let you skip ahead. The structured approach ensures you actually learn!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const stats = [
    { label: "Active Students", value: "10,000+", icon: Users },
    { label: "Course Completion", value: "95%", icon: CheckCircle },
    { label: "Success Rate", value: "89%", icon: TrendingUp },
    { label: "Expert Instructors", value: "50+", icon: Star }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AuroraText className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Master New Skills
          </AuroraText>
          <TextAnimate className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto" animation="fadeIn">
            Transform your career with our interactive e-learning platform. 
            Sequential learning ensures you master every concept before moving forward.
          </TextAnimate>
          
          {/* Orbiting Circles */}
          <div className="relative mb-8">
            <OrbitingCircles className="mx-auto" radius={120} duration={30}>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </OrbitingCircles>
          </div>
          
          {/* Lead Capture Form */}
          <div className="relative max-w-md mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
            <BorderBeam />
            {!isSubmitted ? (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email to get started"
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <ShimmerButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Submitting..." : "Start Learning Free"}
                </ShimmerButton>
              </form>
            ) : (
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Welcome aboard!</h3>
                <p className="text-slate-600">Check your email for exclusive learning resources.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Courses</h2>
            <p className="text-xl text-slate-600">Start your learning journey with our most popular courses</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <div key={course.id} className="group relative">
                <BorderBeam />
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
                    <p className="text-slate-600 mb-4">{course.description}</p>
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <span className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {course.lessons} lessons
                      </span>
                      <span className="flex items-center">
                        <Play className="w-4 h-4 mr-1" />
                        {course.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                      <Link href={`/courses/${course.id}`}>
                        <InteractiveHoverButton>View Course</InteractiveHoverButton>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/courses">
              <ShimmerButton>View All Courses</ShimmerButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                  <div className="text-slate-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
          
          {/* Avatar Circles */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Join Our Community</h3>
            <AvatarCircles
              className="justify-center"
              avatarUrls={[
                { imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face", profileUrl: "#" },
                { imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", profileUrl: "#" },
                { imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", profileUrl: "#" },
                { imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", profileUrl: "#" },
                { imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", profileUrl: "#" }
              ]}
              numPeople={1247}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">What Our Students Say</h2>
            <p className="text-xl text-slate-600">Join thousands of successful learners</p>
          </div>
          
          <Marquee className="py-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="mx-4 w-80 relative">
                <BorderBeam />
                <div className="p-6 bg-slate-50 rounded-2xl">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold text-slate-900">{testimonial.name}</div>
                      <div className="text-sm text-slate-600">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-slate-700 italic">&quot;{testimonial.content}&quot;</p>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Skills?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of learners who have already accelerated their careers with SkillSprint
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <ShimmerButton className="bg-white text-blue-600 hover:bg-slate-100">
                Explore Courses
              </ShimmerButton>
            </Link>
            <Link href="/auth/register">
              <InteractiveHoverButton className="border-white text-white hover:bg-white hover:text-blue-600">
                Start Learning
              </InteractiveHoverButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
