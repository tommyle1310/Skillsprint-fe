"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Play,
  Star,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  Award,
  Zap,
  ChevronRight,
  Plus,
  Minus,
  ChevronRightIcon,
  CheckIcon,
} from "lucide-react";
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Safari } from "@/components/magicui/safari";
import Iphone15Pro from "@/components/magicui/iphone-15-pro";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import { useAuthStore } from "@/lib/authStore";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
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
