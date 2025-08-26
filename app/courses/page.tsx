"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  BookOpen,
  Play,
  Star,
  Search,
  Filter,
  Clock,
  Users,
  Plus,
} from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { AnimatedList } from "@/components/magicui/animated-list";
import { useAuthStore } from "@/lib/authStore";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  lessons: number;
  purchaseCount: number;
  duration: string;
  rating: number;
  students: number;
  slug: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  
  const { isAdmin, user } = useAuthStore();

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // Transform backend data to match frontend interface
            const transformedCourses = data.courses.map((course: any) => ({
              id: course.id,
              title: course.title,
              purchaseCount: course.purchaseCount,
              description: course.description,
              price: (course.price / 100).toFixed(2), // Convert from cents
              image: course.avatar || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
              lessons: course.lessons?.length || 0,
              duration: `${Math.ceil((course.lessons?.length || 0) * 0.4)} hours`, // Estimate duration
              rating: (4.5 + Math.random() * 0.5).toFixed(1), // Mock rating
              students: Math.floor(Math.random() * 2000) + 100, // Mock student count
              slug: course.slug,
            }));
            setCourses(transformedCourses);
            setFilteredCourses(transformedCourses);
          }
        } else {
          // Fallback to mock data if API fails
          setMockCourses();
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        // Fallback to mock data
        setMockCourses();
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const setMockCourses = () => {
    const mockCourses: Course[] = [
      {
        id: "1",
        title: "Web Development Masterclass",
        description:
          "Learn modern web development from scratch to advanced concepts including HTML, CSS, JavaScript, React, and Node.js",
        price: 99,
        image:
          "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
        lessons: 25,
        purchaseCount: 1247,
        duration: "15 hours",
        rating: 4.8,
        students: 1247,
        slug: "web-development-masterclass",
      },
      {
        id: "2",
        title: "Data Science Fundamentals",
        description:
          "Master the basics of data science and machine learning with Python, pandas, and scikit-learn",
        price: 79,
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
        lessons: 20,
        purchaseCount: 892,
        duration: "12 hours",
        rating: 4.9,
        students: 892,
        slug: "data-science-fundamentals",
      },
      {
        id: "3",
        title: "Digital Marketing Strategy",
        description:
          "Build effective digital marketing campaigns that convert using SEO, social media, and content marketing",
        price: 89,
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
        lessons: 18,
        purchaseCount: 1563,
        duration: "10 hours",
        rating: 4.7,
        students: 1563,
        slug: "digital-marketing-strategy",
      },
      {
        id: "4",
        title: "UI/UX Design Principles",
        description:
          "Learn user interface and user experience design principles with Figma and design thinking",
        price: 69,
        image: "https://images.unsplash.com/500&h=300&fit=crop",
        lessons: 22,
        purchaseCount: 734,
        duration: "14 hours",
        rating: 4.6,
        students: 734,
        slug: "ui-ux-design-principles",
      },
      {
        id: "5",
        title: "Python for Beginners",
        description:
          "Start your programming journey with Python basics, data structures, and simple projects",
        price: 49,
        image:
          "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
        lessons: 15,
        purchaseCount: 2103,
        duration: "8 hours",
        rating: 4.5,
        students: 2103,
        slug: "python-for-beginners",
      },
      {
        id: "6",
        title: "Business Analytics",
        description:
          "Learn to analyze business data and make data-driven decisions with Excel and Tableau",
        price: 119,
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
        lessons: 30,
        purchaseCount: 567,
        duration: "18 hours",
        rating: 4.8,
        students: 567,
        slug: "business-analytics",
      },
    ];

    setCourses(mockCourses);
    setFilteredCourses(mockCourses);
    setIsLoading(false);
  };

  const filterCourses = useCallback(() => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      // Filter by category instead of type
      filtered = filtered.filter((course) => {
        if (selectedCategory === "development") {
          return (
            course.title.toLowerCase().includes("web") ||
            course.title.toLowerCase().includes("python")
          );
        } else if (selectedCategory === "design") {
          return (
            course.title.toLowerCase().includes("ui") ||
            course.title.toLowerCase().includes("design")
          );
        } else if (selectedCategory === "business") {
          return (
            course.title.toLowerCase().includes("marketing") ||
            course.title.toLowerCase().includes("business")
          );
        }
        return true;
      });
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedCategory]);

  useEffect(() => {
    filterCourses();
  }, [filterCourses]);

  const courseCategories = ["all", "development", "design", "business"];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  console.log('cehck course', courses?.[0])

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Explore Our Courses
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choose from our carefully curated selection of courses designed to
            help you master new skills and advance your career through
            sequential learning.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-slate-400" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {courseCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Admin/Teacher Add Course Button */}
            {(isAdmin || user?.role === "TEACHER") && (
              <Link href="/courses/new">
                <ShimmerButton className="flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Course
                </ShimmerButton>
              </Link>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-slate-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Courses Grid */}
        <AnimatedList className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <div key={course.id} className="group relative">
              <BorderBeam />
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                {/* Course Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-sm text-white flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    {course.rating}
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {course.description}
                  </p>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {course.lessons} lessons
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.purchaseCount}
                    </span>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">
                        ${course.price}
                      </span>
                      {course.price > 79 && (
                        <span className="text-sm text-slate-400 line-through ml-2">
                          ${Math.round(course.price * 1.2)}
                        </span>
                      )}
                    </div>
                    <Link href={`/courses/${course.slug}`}>
                      <InteractiveHoverButton>
                        View Course
                      </InteractiveHoverButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </AnimatedList>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              No courses found
            </h3>
            <p className="text-slate-500 mb-6">
              Try adjusting your search terms or filters to find what
              you&apos;re looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Let us know what skills you want to learn, and we&apos;ll create a
              course just for you.
            </p>
            <div className="w-full flex justify-center">
              <Link href="/contact" className="mx-auto">
                <ShimmerButton >Request a Course</ShimmerButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
