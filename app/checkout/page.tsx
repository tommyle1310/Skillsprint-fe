"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CreditCard, Lock, CheckCircle, ArrowLeft, Shield, Clock, BookOpen } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  lessons: number;
  duration: string;
  type: string;
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = searchParams.get("courseId");
  
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    email: ""
  });

  // Mock course data - replace with actual API call
  useEffect(() => {
    if (courseId) {
      const mockCourse: Course = {
        id: courseId,
        title: "Web Development Masterclass",
        description: "Learn modern web development from scratch to advanced concepts including HTML, CSS, JavaScript, React, and Node.js",
        price: 99,
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
        lessons: 25,
        duration: "15 hours",
        type: "Video Course"
      };
      setCourse(mockCourse);
      setIsLoading(false);
    }
  }, [courseId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
    }

    // Format expiry date
    if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
    }

    setFormData({
      ...formData,
      [name]: formattedValue
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create order via API
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course?.id,
          amount: course?.price,
          status: "paid"
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        // Redirect after 3 seconds
        setTimeout(() => {
          router.push("/courses");
        }, 3000);
      }
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Course not found</h2>
          <p className="text-slate-600 mb-6">The course you're looking for doesn't exist.</p>
          <Link href="/courses">
            <ShimmerButton>Browse Courses</ShimmerButton>
          </Link>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <AuroraText className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Payment Successful!
          </AuroraText>
          <p className="text-lg text-slate-600 mb-6">
            Welcome to {course.title}! You&apos;ll be redirected to start learning shortly.
          </p>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="animate-pulse">
              <div className="h-2 bg-slate-200 rounded mb-2"></div>
              <div className="h-2 bg-slate-200 rounded mb-2"></div>
              <div className="h-2 bg-slate-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <AuroraText className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Complete Your Purchase
          </AuroraText>
          <p className="text-lg text-slate-600">Secure checkout for your learning journey</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Course Summary */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Course Summary</h2>
            
            <div className="relative">
              <BorderBeam />
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-slate-700">
                    {course.type}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{course.title}</h3>
                  <p className="text-slate-600 mb-4">{course.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-sm text-slate-500">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {course.lessons} lessons
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <Clock className="w-4 h-4 mr-2" />
                      {course.duration}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-blue-600">${course.price}</div>
                    <div className="text-sm text-slate-500 line-through">${Math.round(course.price * 1.2)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">What you&apos;ll get:</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                  Lifetime access to course content
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                  Sequential learning modules
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                  Progress tracking & certificates
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                  Community support access
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                  Mobile-friendly learning
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Payment Information</h2>
            
            <div className="relative">
              <BorderBeam />
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Card Number */}
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-slate-700 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        maxLength={19}
                        required
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                  </div>

                  {/* Card Details Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-slate-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        id="expiryDate"
                        name="expiryDate"
                        type="text"
                        maxLength={5}
                        required
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-slate-700 mb-2">
                        CVV
                      </label>
                      <input
                        id="cvv"
                        name="cvv"
                        type="text"
                        maxLength={4}
                        required
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <label htmlFor="cardholderName" className="block text-sm font-medium text-slate-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      id="cardholderName"
                      name="cardholderName"
                      type="text"
                      required
                      value={formData.cardholderName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Security Notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Secure Payment</p>
                        <p>Your payment information is encrypted and secure. We never store your card details.</p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <ShimmerButton
                    type="submit"
                    disabled={isProcessing}
                    className="w-full h-12 text-base"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing Payment...
                      </div>
                    ) : (
                      `Pay $${course.price} & Start Learning`
                    )}
                  </ShimmerButton>

                  {/* Demo Notice */}
                  <div className="text-center">
                    <p className="text-xs text-slate-500">
                      This is a demo checkout. No real payment will be processed.
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Back to Courses */}
            <div className="text-center">
              <Link href="/courses">
                <InteractiveHoverButton className="flex items-center mx-auto">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Courses
                </InteractiveHoverButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
