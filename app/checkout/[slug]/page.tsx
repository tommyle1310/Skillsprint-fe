"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import Link from "next/link";
import { CheckCircle, Clock, BookOpen, CreditCard } from "lucide-react";
import { useAuthStore } from "@/lib/authStore";

type Provider = "stripe" | "paypal" | "napas" | "momo";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number; // in cents from API, converted to dollars in UI
  image?: string;
  lessons?: number;
  duration?: string;
  slug: string;
}

function PaymentWidget({ provider, selected, onSelect }:{ provider: Provider; selected: boolean; onSelect: (p: Provider)=>void }){
  const label = provider.toUpperCase();
  return (
    <button
      type="button"
      onClick={() => onSelect(provider)}
      className={`w-full border rounded-lg px-4 py-3 text-left transition ${selected ? 'border-blue-600 ring-2 ring-blue-200' : 'border-slate-200 hover:border-slate-300'}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-slate-800">{label}</span>
        <span className={`text-xs ${selected ? 'text-blue-600' : 'text-slate-500'}`}>{selected ? 'Selected' : 'Click to use'}</span>
      </div>
      <div className="mt-1 text-xs text-slate-500">Simulated {label} payment</div>
    </button>
  );
}

export default function CheckoutBySlugPage(){
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const { user } = useAuthStore();

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [provider, setProvider] = useState<Provider>("stripe");
  const [purchased, setPurchased] = useState<boolean>(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/courses/${slug}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setCourse({
            id: data.course.id,
            title: data.course.title,
            description: data.course.description,
            price: data.course.price, // already in cents
            image: data.course.avatar,
            lessons: data.course.lessons?.length || 0,
            duration: `${Math.ceil((data.course.lessons?.length || 0) * 0.4)} hours`,
            slug: data.course.slug,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (slug) fetchCourse();
  }, [slug]);

  useEffect(() => {
    const checkPurchased = async () => {
      if (!user?.id || !course?.id) return;
      const res = await fetch(`/api/orders?userId=${encodeURIComponent(user.id)}&courseId=${encodeURIComponent(course.id)}`);
      const data = await res.json();
      if (res.ok && data.success) setPurchased(!!data.purchased);
    };
    checkPurchased();
  }, [user?.id, course?.id]);

  const displayPrice = useMemo(() => {
    if (!course) return "0";
    return (course.price / 100).toFixed(2);
  }, [course]);

  const handlePurchase = async () => {
    if (!course) return;
    setIsProcessing(true);
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          provider,
          userId: user?.id,
        }),
      });
      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => router.push(`/courses/${slug}`), 2500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Course not found</h2>
          <Link href="/courses"><ShimmerButton>Browse Courses</ShimmerButton></Link>
        </div>
      </div>
    );
  }

  if (user?.id && purchased) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <AuroraText className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">You already own this course</AuroraText>
          <p className="text-lg text-slate-600 mb-6">Go to the course to start learning.</p>
          <Link href={`/courses/${slug}`}>
            <ShimmerButton className="w-full h-12 text-base">Go to Course</ShimmerButton>
          </Link>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <AuroraText className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">Payment Successful!</AuroraText>
          <p className="text-lg text-slate-600 mb-6">Welcome to {course.title}! Redirecting…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <AuroraText className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">Complete Your Purchase</AuroraText>
          <p className="text-lg text-slate-600">Choose a payment provider and confirm</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Course Summary</h2>
            <div className="relative">
              <BorderBeam />
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={course.image || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"} alt={course.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
                  <p className="text-slate-600 mb-4">{course.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-sm text-slate-500"><BookOpen className="w-4 h-4 mr-2" />{course.lessons} lessons</div>
                    <div className="flex items-center text-sm text-slate-500"><Clock className="w-4 h-4 mr-2" />{course.duration}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-blue-600">${displayPrice}</div>
                    <div className="text-sm text-slate-500 line-through">${(Number(displayPrice) * 1.2).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Payment Methods</h2>
            <div className="grid grid-cols-2 gap-4">
              {(["stripe","paypal","napas","momo"] as Provider[]).map((p) => (
                <PaymentWidget key={p} provider={p} selected={provider === p} onSelect={setProvider} />
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <CreditCard className="w-5 h-5 text-slate-500 mr-2" />
                <span className="text-slate-700 text-sm">This is a simulated {provider.toUpperCase()} payment.</span>
              </div>
              <ShimmerButton onClick={handlePurchase} disabled={isProcessing} className="w-full h-12 text-base">
                {isProcessing ? 'Processing…' : `Purchase for $${displayPrice}`}
              </ShimmerButton>
              <p className="mt-2 text-xs text-slate-500 text-center">No real payment will be processed.</p>
            </div>

            <div className="text-center">
              <Link href={`/courses/${slug}`}>
                <InteractiveHoverButton className="mx-auto">Back to Course</InteractiveHoverButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


