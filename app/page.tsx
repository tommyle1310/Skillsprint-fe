"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/authStore";
import AdminHomepage from "@/components/screens/Home/AdminHomepage";
import TeacherHomepage from "@/components/screens/Home/TeacherHomepage";
import UserHomepage from "@/components/screens/Home/UserHomepage";
import LandingPage from "@/components/screens/Home/LandingPage";



export default function HomePage() {

  const { isAuthenticated, isAdmin, user } = useAuthStore();

  const [stats, setStats] = useState({
    students: 0,
    completion: 0,
    success: 0,
    instructors: 0,
  });

  // Animated counters
  useEffect(() => {
    const targetStats = {
      students: 12470,
      completion: 95,
      success: 89,
      instructors: 52,
    };
    const duration = 2000;
    const steps = 60;
    const stepValue = Object.keys(targetStats).reduce((acc, key) => {
      acc[key as keyof typeof targetStats] =
        targetStats[key as keyof typeof targetStats] / steps;
      return acc;
    }, {} as Record<keyof typeof targetStats, number>);

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setStats({
        students: Math.min(
          Math.round(currentStep * stepValue.students),
          targetStats.students
        ),
        completion: Math.min(
          Math.round(currentStep * stepValue.completion),
          targetStats.completion
        ),
        success: Math.min(
          Math.round(currentStep * stepValue.success),
          targetStats.success
        ),
        instructors: Math.min(
          Math.round(currentStep * stepValue.instructors),
          targetStats.instructors
        ),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);



  // Role-based home switch
  const role = user?.role;
  if (isAuthenticated) {
    if (role === "ADMIN") {
      return (
          <AdminHomepage />        
      );
    }
    if (role === "TEACHER") {
      return (
       <TeacherHomepage />
      );
    }
    // Lead User
    return (
   <UserHomepage />
    );
  }

  return (
    <LandingPage />
  );
}
