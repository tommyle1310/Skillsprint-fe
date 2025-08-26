"use client";
import { AnimatedList } from "@/components/magicui/animated-list";
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import { BorderBeam } from "@/components/magicui/border-beam";
import { GridBeams } from "@/components/magicui/grid-beams";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Marquee } from "@/components/magicui/marquee";
import ProgressiveBlur from "@/components/magicui/progressive-blur";
import { Safari } from "@/components/magicui/safari";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useAuthStore } from "@/lib/authStore";
import {
  Award,
  BookOpen,
  CheckCircle,
  CheckIcon,
  ChevronRight,
  ChevronRightIcon,
  Clock,
  Minus,
  Plus,
  Star,
  TrendingUp,
  Users,
  Zap,
  DollarSign,
  Gift,
  Share2,
  Timer,
  Target,
  Shield,
  Globe,
  Heart,
  ArrowRight,
  Mail,
  Download,
  Users2,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const LandingPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { isAuthenticated, isAdmin, user } = useAuthStore();
  const [stats, setStats] = useState({
    students: 0,
    completion: 0,
    success: 0,
    instructors: 0,
  });

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 18,
    minutes: 45,
    seconds: 30,
  });

  // Countdown effect
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

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
      description:
        "Master AI fundamentals, neural networks, and real-world applications in just 30 days",
      price: 199,
      originalPrice: 299,
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      lessons: 45,
      duration: "30 hours",
      rating: 4.9,
      students: 2847,
      tags: ["Bestseller", "AI", "Hot"],
    },
    {
      id: 2,
      title: "Full-Stack Web Development",
      description:
        "Build modern web apps with React, Node.js, and cloud deployment",
      price: 149,
      originalPrice: 249,
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      lessons: 38,
      duration: "25 hours",
      rating: 4.8,
      students: 2156,
      tags: ["Popular", "Web Dev", "Trending"],
    },
    {
      id: 3,
      title: "Data Science & Analytics",
      description:
        "Transform data into insights with Python, SQL, and visualization tools",
      price: 179,
      originalPrice: 279,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      lessons: 42,
      duration: "28 hours",
      rating: 4.9,
      students: 1987,
      tags: ["New", "Data", "Premium"],
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Senior AI Engineer at Google",
      content:
        "SkillSprint's AI course helped me land my dream job. The sequential learning approach is revolutionary - I actually retained everything!",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      company: "Google",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Product Manager at Microsoft",
      content:
        "From zero to hero in 30 days! The structured approach and real-world projects made all the difference.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      company: "Microsoft",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Lead Developer at Netflix",
      content:
        "Finally, a platform that doesn't let you skip ahead. The sequential learning ensures you actually master every concept!",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      company: "Netflix",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "How does sequential learning work?",
      answer:
        "Our platform locks each lesson until you've mastered the previous one through interactive quizzes and hands-on projects. This ensures you build a solid foundation before advancing.",
    },
    {
      question: "What if I get stuck on a concept?",
      answer:
        "We provide unlimited access to our expert instructors, peer study groups, and AI-powered tutoring. You'll never be stuck for long!",
    },
    {
      question: "Can I learn at my own pace?",
      answer:
        "Absolutely! While lessons are sequential, you can take as much time as you need on each concept. Our adaptive system adjusts to your learning speed.",
    },
    {
      question: "What's included in the free trial?",
      answer:
        "Get access to our first 3 lessons, interactive quizzes, and community features. No credit card required - start learning immediately!",
    },
  ];

  // Additional data for new sections
  const pricingPlans = [
    {
      name: "Free",
      price: 0,
      features: [
        "3 free lessons",
        "Basic quizzes",
        "Community access",
        "Email support",
      ],
      popular: false,
      cta: "Start Free",
    },
    {
      name: "Pro",
      price: 29,
      originalPrice: 49,
      features: [
        "All courses",
        "Advanced quizzes",
        "1-on-1 mentoring",
        "Certificate",
        "Priority support",
      ],
      popular: true,
      cta: "Get Pro",
    },
    {
      name: "Premium",
      price: 99,
      originalPrice: 149,
      features: [
        "Everything in Pro",
        "Live workshops",
        "Career coaching",
        "Job placement",
        "24/7 support",
      ],
      popular: false,
      cta: "Get Premium",
    },
  ];

  const bestDealCourses = [
    {
      id: 1,
      title: "AI & Machine Learning Mastery",
      originalPrice: 299,
      salePrice: 179,
      discount: 40,
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      students: 2847,
      rating: 4.9,
      slotsLeft: 23,
    },
    {
      id: 2,
      title: "Full-Stack Web Development",
      originalPrice: 249,
      salePrice: 149,
      discount: 40,
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      students: 2156,
      rating: 4.8,
      slotsLeft: 15,
    },
    {
      id: 3,
      title: "Data Science & Analytics",
      originalPrice: 279,
      salePrice: 167,
      discount: 40,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      students: 1987,
      rating: 4.9,
      slotsLeft: 8,
    },
  ];

  const companyLogos = [
    "Google",
    "Microsoft",
    "Netflix",
    "Amazon",
    "Meta",
    "Apple",
    "Tesla",
    "Uber",
  ];

  const caseStudies = [
    {
      name: "Sarah Johnson",
      role: "Senior AI Engineer",
      company: "Google",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      story: "From $65k to $180k in 8 months",
      quote:
        "SkillSprint's sequential learning helped me master AI concepts I struggled with for years. Now I'm leading AI projects at Google.",
    },
    {
      name: "Mike Chen",
      role: "Product Manager",
      company: "Microsoft",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      story: "Career switch from Marketing to Tech",
      quote:
        "The structured approach and real-world projects gave me the confidence to switch careers. I'm now managing tech products at Microsoft.",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 lg:py-32">
        <GridBeams className="absolute inset-0">
          <div></div>
        </GridBeams>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative mx-auto w-2xl ">
                <Safari
                  url="https://www.skillsprint.com"
                  videoSrc="https://res.cloudinary.com/dlavqnrlx/video/upload/v1724035988/work_iu9npi.mp4"
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
            </div>
            <div className="order-1  flex lg:order-2 relative justify-end">
              <div className="relative max-w-lg mx-auto bg-gray-50 lg:mx-0 p-8  backdrop-blur-sm rounded-3xl  overflow-hidden shadow-2xl border border-white/20">
                <BorderBeam />
                <ProgressiveBlur position="bottom" className="rounded-3xl" />
                <div className="relative z-10">
                  <Badge
                    variant="secondary"
                    className="mb-4 bg-blue-100 text-blue-700 border-blue-200"
                  >
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
                    {isAuthenticated ? (
                      <>
                        Ready to continue your learning journey? Pick up where
                        you left off or explore new courses to expand your
                        skills.
                        <span className="font-semibold text-slate-800">
                          {" "}
                          You&apos;re part of 12,000+ professionals who&apos;ve
                          accelerated their careers.
                        </span>
                      </>
                    ) : (
                      <>
                        Stop wasting time on scattered tutorials. Our sequential
                        learning platform ensures you master every concept
                        before moving forward.
                        <span className="font-semibold text-slate-800">
                          {" "}
                          Join 12,000+ professionals who&apos;ve accelerated
                          their careers.
                        </span>
                      </>
                    )}
                  </p>

                  {/* Lead Capture Form or Welcome Back */}
                  {isAuthenticated ? (
                    <div className="space-y-4">
                      <div className="text-center py-4">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">
                          Welcome back!
                        </h3>
                        <p className="text-slate-600 mb-6">
                          Ready to continue your learning journey?
                        </p>
                        <div className="flex space-x-4">
                          <Link href="/courses">
                            <ShimmerButton className="flex-1 py-4 text-lg font-semibold">
                              Browse Courses
                            </ShimmerButton>
                          </Link>
                          <Link href="/admin">
                            {isAdmin && (
                              <InteractiveHoverButton className="py-4 text-lg font-semibold">
                                Admin Panel
                              </InteractiveHoverButton>
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
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
                            {isSubmitting
                              ? "Starting..."
                              : "Start Free – No Credit Card Required"}
                          </ShimmerButton>
                          <p className="text-sm text-slate-500 text-center">
                            ✨ Get instant access to 3 free lessons + AI cheat
                            sheet
                          </p>
                        </form>
                      ) : (
                        <div className="text-center py-4">
                          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                          <h3 className="text-2xl font-bold text-slate-800 mb-2">
                            Welcome aboard!
                          </h3>
                          <p className="text-slate-600">
                            Check your email for exclusive learning resources
                            and your AI cheat sheet.
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Clear Value Proposition / Why Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 bg-green-50 text-green-700 border-green-200"
            >
              <Target className="w-3 h-3 mr-1" />
              Why Choose SkillSprint?
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Why Choose SkillSprint?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We don&apos;t just teach you knowledge, but ensure you truly
              understand and apply it
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Top-notch instructors
              </h3>
              <p className="text-slate-600">
                50+ experts from Google, Microsoft, Netflix
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Affordable pricing
              </h3>
              <p className="text-slate-600">Only $29/month for all courses</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Learn anytime
              </h3>
              <p className="text-slate-600">24/7 access, learn on any device</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Money-back guarantee
              </h3>
              <p className="text-slate-600">100% satisfaction or money-back</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Limited-Time Offer / Countdown */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <Badge
              variant="secondary"
              className="mb-4 bg-white/20 text-white border-white/30"
            >
              <Timer className="w-3 h-3 mr-1" />
              Flash Sale
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Save 40% in 3 days!</h2>
            <p className="text-xl mb-8 opacity-90">
              Only 46 slots with special discount
            </p>

            {/* Countdown Timer */}
            <div className="flex justify-center space-x-4 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                <div className="text-3xl font-bold">{timeLeft.days}</div>
                <div className="text-sm opacity-80">Days</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                <div className="text-3xl font-bold">
                  {timeLeft.hours.toString().padStart(2, "0")}
                </div>
                <div className="text-sm opacity-80">Hours</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                <div className="text-3xl font-bold">
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </div>
                <div className="text-sm opacity-80">Minutes</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                <div className="text-3xl font-bold">
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </div>
                <div className="text-sm opacity-80">Seconds</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span>Slots remaining: 46</span>
                <span>Total: 100</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div
                  className="bg-white h-3 rounded-full"
                  style={{ width: "46%" }}
                ></div>
              </div>
            </div>

            <ShimmerButton className="bg-white mx-auto text-white hover:bg-slate-100 px-8 py-4 text-lg font-semibold">
              Claim Your Discount Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </ShimmerButton>
          </div>
        </div>
      </section>

      {/* 3. Best Deal Courses (Alternative to Pricing) */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 bg-red-50 text-red-700 border-red-200"
            >
              <Gift className="w-3 h-3 mr-1" />
              Best Deals
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Top 3 Best Deals
            </h2>
            <p className="text-xl text-slate-600">
              Save up to 40% on the most popular courses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {bestDealCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 bg-slate-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-red-500 text-white">
                      -{course.discount}%
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-slate-700">
                      {course.rating}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {course.title}
                  </h3>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-red-600">
                        ${course.salePrice}
                      </span>
                      <span className="text-lg text-slate-400 line-through">
                        ${course.originalPrice}
                      </span>
                    </div>
                    <span className="text-sm text-slate-500">
                      {course.students.toLocaleString()} students
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-slate-600 mb-1">
                      <span>Slots left: {course.slotsLeft}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${(course.slotsLeft / 30) * 100}%` }}
                      />
                    </div>
                  </div>

                  <ShimmerButton className="w-full bg-red-500 text-white hover:bg-red-600">
                    Enroll Now - Save ${course.originalPrice - course.salePrice}
                  </ShimmerButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA Block 1 */}
      {/* <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to start learning?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Hơn 20.000 người đã tham gia – Bạn thì sao?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ShimmerButton className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-4 text-lg">
            Browse Courses
            <ChevronRight className="w-5 h-5 ml-2" />
          </ShimmerButton>
          <InteractiveHoverButton className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
            Start Free Trial
          </InteractiveHoverButton>
        </div>
      </div>
    </section> */}

      {/* Featured Courses */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 bg-blue-50 text-blue-700 border-blue-200"
            >
              <Award className="w-3 h-3 mr-1" />
              Most Popular Courses
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Join thousands of professionals mastering in-demand skills with
              our proven sequential learning approach
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
                              variant={
                                tag === "Bestseller" ? "default" : "secondary"
                              }
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-semibold text-slate-700">
                            {course.rating}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-slate-600 mb-4 line-clamp-2">
                          {course.description}
                        </p>
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
                            <span className="text-3xl font-bold text-blue-600">
                              ${course.price}
                            </span>
                            <span className="text-lg text-slate-400 line-through">
                              ${course.originalPrice}
                            </span>
                          </div>
                          <span className="text-sm text-green-600 font-semibold">
                            {Math.round(
                              ((course.originalPrice - course.price) /
                                course.originalPrice) *
                                100
                            )}
                            % OFF
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500">
                            {course.students.toLocaleString()} students enrolled
                          </span>
                          <InteractiveHoverButton className="bg-violet-500 text-white hover:bg-violet-500">
                            Enroll Now
                          </InteractiveHoverButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900">
                      {course.title}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {course.description}
                    </p>
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
                      <Link
                        href={`/courses/${course.id}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View full course details →
                      </Link>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>

          <div className="text-center mt-12 flex justify-center">
            <Link href="/courses">
              <AnimatedSubscribeButton className="">
                <span className="group inline-flex items-center">
                  View All Courses
                  <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="group inline-flex items-center">
                  <CheckIcon className="mr-2 size-4" />
                  Navigating...
                </span>
              </AnimatedSubscribeButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats & Community Section */}
      <section className="pt-12 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center ">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Trusted by 12,000+ Professionals
            </h2>
            <p className="text-xl text-slate-600">
              Join a community of successful learners and industry experts
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">
                {stats.students.toLocaleString()}+
              </div>
              <div className="text-slate-600">Active Students</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">
                {stats.completion}%
              </div>
              <div className="text-slate-600">Course Completion</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <TrendingUp className="w-10 h-10 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">
                {stats.success}%
              </div>
              <div className="text-slate-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Star className="w-10 h-10 text-yellow-600" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">
                {stats.instructors}+
              </div>
              <div className="text-slate-600">Expert Instructors</div>
            </div>
          </div>

          {/* Stats & Community Bento Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-16">
            {/* Left: Landing Page Stats & Social Proof */}
            <div className="space-y-6">
              {/* Key Landing Page Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">
                    50+
                  </div>
                  <div className="text-sm text-slate-600">
                    Expert Instructors
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">
                    200+
                  </div>
                  <div className="text-sm text-slate-600">Premium Courses</div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Why Choose SkillSprint?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">
                        Sequential Learning
                      </div>
                      <div className="text-sm text-slate-600">
                        Master concepts step-by-step
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">
                        4.9/5 Rating
                      </div>
                      <div className="text-sm text-slate-600">
                        From 10,000+ students
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">
                        30-Day Guarantee
                      </div>
                      <div className="text-sm text-slate-600">
                        Money-back if not satisfied
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Trusted by Industry Leaders
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-slate-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      95%
                    </div>
                    <div className="text-xs text-slate-600">
                      Course Completion Rate
                    </div>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      89%
                    </div>
                    <div className="text-xs text-slate-600">
                      Career Advancement
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-slate-600">
                    Join professionals from
                  </p>
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
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Explore Learning Paths
              </h3>
              <div className="relative max-h-[600px] overflow-hidden">
                <AnimatedList delay={1200}>
                  {[
                    {
                      name: "Artificial Intelligence",
                      description: "Machine Learning, Deep Learning, NLP",
                      icon: "🤖",
                      color: "#00C9A7",
                      courses: 25,
                    },
                    {
                      name: "Web Development",
                      description: "Frontend, Backend, Full-Stack",
                      icon: "💻",
                      color: "#FFB800",
                      courses: 32,
                    },
                    {
                      name: "Data Science",
                      description: "Analytics, Visualization, Big Data",
                      icon: "📊",
                      color: "#FF3D71",
                      courses: 18,
                    },
                    {
                      name: "Mobile Development",
                      description: "iOS, Android, React Native",
                      icon: "📱",
                      color: "#1E86FF",
                      courses: 15,
                    },
                    {
                      name: "Cloud & DevOps",
                      description: "AWS, Docker, Kubernetes",
                      icon: "☁️",
                      color: "#8B5CF6",
                      courses: 22,
                    },
                    {
                      name: "Cybersecurity",
                      description: "Ethical Hacking, Network Security",
                      icon: "🔒",
                      color: "#EC4899",
                      courses: 12,
                    },
                    {
                      name: "Digital Marketing",
                      description: "SEO, Social Media, Analytics",
                      icon: "📈",
                      color: "#10B981",
                      courses: 28,
                    },
                    {
                      name: "Business & Finance",
                      description: "Entrepreneurship, Investment",
                      icon: "💼",
                      color: "#F59E0B",
                      courses: 20,
                    },
                    {
                      name: "IELTS",
                      description: "English Language Test",
                      icon: "🛒",
                      color: "#FFB800",
                      courses: 20,
                    },
                    {
                      name: "TOEFL",
                      description: "English Language Test",
                      icon: "🚚",
                      color: "#FF3D71",
                      courses: 20,
                    },
                    {
                      name: "GRE",
                      description: "English Language Test",
                      icon: "⭐",
                      color: "#1E86FF",
                      courses: 20,
                    },
                    {
                      name: "MOS",
                      description: "Microsoft Office Suite",
                      icon: "💼",
                      color: "#8B5CF6",
                      courses: 20,
                    },
                    {
                      name: "SAT",
                      description: "English Language Test",
                      icon: "🚋",
                      color: "#EC4899",
                      courses: 20,
                    },
                    {
                      name: "ACT",
                      description: "English Language Test",
                      icon: "🎑",
                      color: "#10B981",
                      courses: 20,
                    },
                    {
                      name: "GMAT",
                      description: "English Language Test",
                      icon: "👔",
                      color: "#F59E0B",
                      courses: 20,
                    },
                    {
                      name: "LSAT",
                      description: "English Language Test",
                      icon: "🎊",
                      color: "#F59E0B",
                      courses: 20,
                    },
                    {
                      name: "MCAT",
                      description: "English Language Test",
                      icon: "🇬🇧",
                      color: "#1E86FF",
                      courses: 20,
                    },
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
                          <span className="text-sm font-semibold text-slate-900 truncate">
                            {category.name}
                          </span>
                          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                            {category.courses} courses
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 truncate">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </AnimatedList>
                <ScrollProgress className="top-[65px]" />
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
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-slate-600">
              Join thousands of successful learners who&apos;ve transformed
              their careers
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left: Testimonial Marquee */}
            <div className="relative col-span-4 ">
              <Marquee vertical className="py-8 h-[30rem] " pauseOnHover>
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className=" w-80 h-full rounded-2xl overflow-hidden flex-grow relative"
                  >
                    <BorderBeam className="rounded-2xl" />
                    <div className="p-6 bg-slate-50 h-full flex-grow rounded-2xl border border-slate-200">
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={
                              i < testimonial.rating
                                ? "w-4 h-4 text-yellow-500 fill-current"
                                : "w-4 h-4 text-slate-300"
                            }
                          />
                        ))}
                      </div>
                      <div className="flex items-center justify-center mb-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white"
                        />
                      </div>
                      <p className="text-lg text-slate-700 mb-4">
                        &quot;{testimonial.content}&quot;
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                ))}
              </Marquee>
            </div>

            {/* Right: Testimonial Details */}
            <div className="col-span-8 ">
              <div className=" mx-auto">
                <div className="text-center mb-16">
                  <Badge
                    variant="outline"
                    className="mb-4 bg-purple-50 text-purple-700 border-purple-200"
                  >
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Success Stories
                  </Badge>
                  <h2 className="text-4xl font-bold text-slate-900 mb-4">
                    Real Results from Real Students
                  </h2>
                  <p className="text-xl text-slate-600">
                    See how our students transformed their careers
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {caseStudies.map((study, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200"
                    >
                      <div className="flex items-start space-x-4 mb-6">
                        <img
                          src={study.avatar}
                          alt={study.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
                        />
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">
                            {study.name}
                          </h3>
                          <p className="text-slate-600">
                            {study.role} at {study.company}
                          </p>
                          <Badge className="bg-green-100 text-green-700 border-green-200 mt-2">
                            {study.story}
                          </Badge>
                        </div>
                      </div>
                      <blockquote className="text-lg text-slate-700 italic mb-6">
                        &ldquo;{study.quote}&rdquo;
                      </blockquote>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          <span className="text-sm text-slate-600 ml-2">
                            5.0
                          </span>
                        </div>
                        <ShimmerButton className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-sm">
                          Read Full Story
                        </ShimmerButton>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Enhanced Social Proof - Logo Wall */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Trusted by 10,000+ learners from
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {companyLogos.map((logo, index) => (
                <div
                  key={index}
                  className="text-2xl font-bold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA Block 2 */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join the Success Stories</h2>
          <p className="text-xl mb-8 opacity-90">
            Start your journey today and transform your career
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ShimmerButton
              background="black"
              className=" text-white hover:bg-slate-100 px-8 py-4 text-lg"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </ShimmerButton>
            <AnimatedSubscribeButton className="p-8 bg-[#113cc3]">
              <span className="group inline-flex items-center">
                Explore All Courses
                <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="group inline-flex items-center">
                <CheckIcon className="mr-2 size-4" />
                Navigating...
              </span>
            </AnimatedSubscribeButton>
          </div>
        </div>
      </section>

      {/* 8. Newsletter / Free Resource Giveaway */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-12 text-center border border-purple-200">
            <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gift className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Get Your Free AI Cheat Sheet
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Join 50,000+ professionals and get instant access to our exclusive
              AI cheat sheet, plus weekly tips to accelerate your learning
              journey.
            </p>

            <form className="max-w-md mx-auto space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="w-full px-6 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  required
                />
                <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
              <ShimmerButton className="w-full py-4 text-lg font-semibold bg-purple-600 text-white hover:bg-purple-700">
                <Download className="w-5 h-5 mr-2" />
                Get Free Cheat Sheet
              </ShimmerButton>
              <p className="text-sm text-slate-500">
                ✨ No spam, unsubscribe anytime • 100% free
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* 9. Affiliate / Referral Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-slate-200">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Share2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Invite Friends, Get Rewards
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Share SkillSprint with your network and both of you get $5 voucher
              for each successful referral
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <Users2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Invite Friends
                </h3>
                <p className="text-slate-600">
                  Share your unique referral link
                </p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  They Join
                </h3>
                <p className="text-slate-600">
                  Your friends sign up and start learning
                </p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <DollarSign className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Both Get $5
                </h3>
                <p className="text-slate-600">
                  You and your friend get vouchers
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ShimmerButton className="bg-green-600 text-white hover:bg-green-700 px-8 py-4 text-lg">
                <Share2 className="w-5 h-5 mr-2" />
                Share Your Link
              </ShimmerButton>
              <InteractiveHoverButton className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 text-lg">
                View Referral History
              </InteractiveHoverButton>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about our learning platform
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full cursor-pointer px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 text-lg">
                    {faq.question}
                  </span>
                  {expandedFaq === index ? (
                    <Minus className="w-5 h-5 text-slate-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-slate-600" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600  bottom-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Skills?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 12,000+ professionals who&apos;ve already accelerated their
            careers with SkillSprint
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <ShimmerButton className="bg-white text-violet-200 hover:bg-slate-100 px-8 py-4 text-lg">
                Explore Courses
                <ChevronRight className="w-5 h-5 ml-2" />
              </ShimmerButton>
            </Link>
            <Link href="/auth/register">
              <InteractiveHoverButton className="border-white text-primary hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
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
};

export default LandingPage;
