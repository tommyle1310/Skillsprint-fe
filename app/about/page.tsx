"use client";

import { BookOpen, Users, Award, Globe, Target, Heart, Combine, ChartNoAxesCombined, PlaneTakeoff, PlaneLanding, Captions, Presentation } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ArcTimeline } from "@/components/magicui/arc-timeline";
import { TextAnimate } from "@/components/magicui/text-animate";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

export default function AboutPage() {
  const timelineData = [
    {
      time: "25/08/2025",
      steps: [
        {
          icon: <BookOpen className="w-6 h-6" />,
          content: "Gather requirements & create timeline"
        },
        {
          icon: <Presentation className="w-6 h-6" />,
          content: "Create a landing page & Core APIs"
        },
        {
          icon: <Combine className="w-6 h-6" />,
          content: "Integrate FE & BE, OAuth, Stripe (Sandbox), etc."
        },
        {
          icon: <ChartNoAxesCombined className="w-6 h-6" />,
          content: "Integrate Analytics, SEO, etc."
        },
      ]
    },
    {
      time: "26/08/2025",
      steps: [
        {
          icon: <Award className="w-6 h-6" />,
          content: "Enhance UI/UX, integrate should-have features"
        },
        {
          icon: <Globe className="w-6 h-6" />,
          content: "Attempt to launch (Vercel)"
        }
      ]
    },
    {
      time: "27/08/2025",
      steps: [
        {
          icon: <PlaneTakeoff className="w-6 h-6" />,
          content: "First day field trip (compulsory) to Malaysia"
        },
        {
          icon: <Heart className="w-6 h-6" />,
          content: "Improve UI/UX, add more features"
        },
        {
          icon: <Captions className="w-6 h-6" />,
          content: "Submit project's reports daily"
        },
      ]
    },
    {
      time: "30/08/2025",
      steps: [
        {
          icon: <PlaneLanding className="w-6 h-6" />,
          content: "Landed Vietnam, fix visible bugs"
        }
      ]
    }
  ];

  const values = [
    {
      title: "Innovation",
      description: "Constantly pushing boundaries in educational technology",
      icon: <BookOpen className="w-8 h-8" />
    },
    {
      title: "Excellence",
      description: "Committed to delivering the highest quality learning experience",
      icon: <Award className="w-8 h-8" />
    },
    {
      title: "Accessibility",
      description: "Making quality education available to everyone, everywhere",
      icon: <Globe className="w-8 h-8" />
    },
    {
      title: "Community",
      description: "Building a supportive network of learners and educators",
      icon: <Users className="w-8 h-8" />
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <TextAnimate className="text-5xl md:text-6xl font-bold text-slate-900 mb-6" animation="fadeIn">
            Our Story
          </TextAnimate>
          <TextAnimate className="text-xl text-slate-600 max-w-3xl mx-auto" animation="fadeIn" delay={0.2}>
            From a simple idea to a global learning platform, discover how SkillSprint is transforming education 
            and empowering millions of learners worldwide.
          </TextAnimate>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="relative">
            <BorderBeam />
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-lg text-slate-600">
                To democratize education by providing high-quality, accessible learning experiences that empower 
                individuals to achieve their full potential, regardless of their background or location.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <BorderBeam />
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Vision</h2>
              <p className="text-lg text-slate-600">
                A world where everyone has access to world-class education, enabling them to learn, grow, 
                and contribute meaningfully to society through continuous skill development.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Journey</h2>
            <p className="text-xl text-slate-600">Key milestones that shaped SkillSprint into what it is today</p>
          </div>
          
          <div className="relative">
            <BorderBeam />
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <ArcTimeline 
                data={timelineData}
                arcConfig={{
                  circleWidth: 4000,
                  angleBetweenMinorSteps: 0.4,
                  lineCountFillBetweenSteps: 8,
                  boundaryPlaceholderLinesCount: 40
                }}
              />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Values</h2>
            <p className="text-xl text-slate-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="relative">
                <BorderBeam />
                <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-blue-600">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-20">
          <div className="relative">
            <BorderBeam />
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-8">Impact in Numbers</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-4xl font-bold mb-2">50+</div>
                  <div className="text-blue-100">Countries Reached</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">10K+</div>
                  <div className="text-blue-100">Active Learners</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">500+</div>
                  <div className="text-blue-100">Courses Available</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">95%</div>
                  <div className="text-blue-100">Completion Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Join Our Mission
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Be part of the educational revolution. Start your learning journey today.
            </p>
            <ShimmerButton className="text-lg px-8 py-4 mx-auto">
              Get Started Now
            </ShimmerButton>
          </div>
        </div>
      </div>
    </div>
  );
}
