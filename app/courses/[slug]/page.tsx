"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Play,
  Star,
  Clock,
  Users,
  CheckCircle,
  Lock,
  ArrowLeft,
  Plus,
} from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useAuthStore } from "@/lib/authStore";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface Lesson {
  id: string;
  title: string;
  order: number;
  avatar?: string;
  videoUrl?: string;
}

interface Course {
  id: string;
  title: string;
  slug: string;
  avatar?: string;
  description: string;
  price: number;
  lessons: Lesson[];
  createdAt: string;
}

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  const { isAuthenticated, isAdmin } = useAuthStore();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${slug}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // Transform backend data
            const transformedCourse = {
              ...data.course,
              price: data.course.price / 100, // Convert from cents
            };
            setCourse(transformedCourse);
          } else {
            setError("Course not found");
          }
        } else {
          setError("Failed to fetch course");
        }
      } catch (error) {
        console.error("Failed to fetch course:", error);
        setError("An error occurred while fetching the course");
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchCourse();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">Course Not Found</h1>
          <p className="text-slate-600">{error || "The course you're looking for doesn't exist."}</p>
          <Link href="/courses">
            <ShimmerButton>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </ShimmerButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/courses">
            <InteractiveHoverButton className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </InteractiveHoverButton>
          </Link>
        </div>

        {/* Course Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Course Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <BorderBeam className="rounded-2xl" />
              <img
                src={course.avatar || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop"}
                alt={course.title}
                className="w-full h-80 object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Course Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">
                  {course.lessons.length}
                </div>
                <div className="text-sm text-slate-600">Lessons</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">
                  {Math.ceil(course.lessons.length * 0.4)}
                </div>
                <div className="text-sm text-slate-600">Hours</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">
                  {Math.floor(Math.random() * 2000) + 100}
                </div>
                <div className="text-sm text-slate-600">Students</div>
              </div>
            </div>

            {/* Price and CTA */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-blue-600">
                  ${course.price}
                </span>
                {course.price > 79 && (
                  <span className="text-xl text-slate-400 line-through">
                    ${Math.round(course.price * 1.2)}
                  </span>
                )}
              </div>
              
              <div className="flex space-x-4">
                <ShimmerButton className="flex-1 h-12">
                  <Play className="w-5 h-5 mr-2" />
                  Enroll Now
                </ShimmerButton>
                
                {isAdmin && (
                  <Link href={`/admin/courses/${course.slug}/edit`}>
                    <InteractiveHoverButton className="h-12">
                      <Plus className="w-5 h-5 mr-2" />
                      Edit Course
                    </InteractiveHoverButton>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Course Content</h2>
          
          <div className="space-y-4">
            {course.lessons.map((lesson, index) => (
              <div key={lesson.id} className="relative">
                <BorderBeam />
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold text-blue-600">
                          {lesson.order}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {lesson.title}
                        </h3>
                        <p className="text-slate-600">
                          Lesson {lesson.order} of {course.lessons.length}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {isAuthenticated ? (
                        <InteractiveHoverButton>
                          <Play className="w-4 h-4 mr-2" />
                          Start Lesson
                        </InteractiveHoverButton>
                      ) : (
                        <div className="flex items-center text-slate-400">
                          <Lock className="w-4 h-4 mr-2" />
                          <span className="text-sm">Login to access</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">What You'll Learn</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-slate-600">
                  Master fundamental concepts and build a strong foundation
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-slate-600">
                  Work on real-world projects and practical exercises
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-slate-600">
                  Get hands-on experience with industry-standard tools
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-slate-600">
                  Learn at your own pace with lifetime access
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-slate-600">
                  Receive a certificate upon completion
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-slate-600">
                  Join our community of learners and experts
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Join thousands of students who have already transformed their careers with this course.
            </p>
            <ShimmerButton className="h-14 text-lg px-8">
              <Play className="w-6 h-6 mr-2" />
              Enroll Now - ${course.price}
            </ShimmerButton>
          </div>
        </div>
      </div>
    </div>
  );
}
