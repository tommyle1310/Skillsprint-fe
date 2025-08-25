"use client";

import { useState, useEffect } from "react";
import { BarChart3, Users, TrendingUp, DollarSign, Eye, Mail, ShoppingCart, Activity, Home, BookOpen } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Dock } from "@/components/magicui/dock";
import { useAuthStore } from "@/lib/authStore";
import { ForbiddenPage } from "@/app/ForbiddenPage";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface DashboardStats {
  totalTraffic: number;
  totalLeads: number;
  totalOrders: number;
  totalRevenue: number;
  leadConversionRate: number;
  revenuePerVisitor: number;
  recentLeads: Array<{ id: string; email: string; createdAt: string }>;
  recentOrders: Array<{ id: string; amount: number; status: string; createdAt: string }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  
  const { isAuthenticated, isAdmin, loading, initialized } = useAuthStore();

  // Check if user is admin
  if (!initialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return <ForbiddenPage />;
  }

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockStats: DashboardStats = {
      totalTraffic: 15420,
      totalLeads: 1247,
      totalOrders: 89,
      totalRevenue: 8920,
      leadConversionRate: 8.1,
      revenuePerVisitor: 0.58,
      recentLeads: [
        { id: "1", email: "john.doe@example.com", createdAt: "2024-01-15T10:30:00Z" },
        { id: "2", email: "sarah.smith@example.com", createdAt: "2024-01-15T09:15:00Z" },
        { id: "3", email: "mike.johnson@example.com", createdAt: "2024-01-15T08:45:00Z" },
        { id: "4", email: "emily.brown@example.com", createdAt: "2024-01-15T08:20:00Z" },
        { id: "5", email: "david.wilson@example.com", createdAt: "2024-01-15T07:55:00Z" }
      ],
      recentOrders: [
        { id: "1", amount: 99, status: "paid", createdAt: "2024-01-15T11:20:00Z" },
        { id: "2", amount: 79, status: "paid", createdAt: "2024-01-15T10:45:00Z" },
        { id: "3", amount: 89, status: "pending", createdAt: "2024-01-15T10:15:00Z" },
        { id: "4", amount: 119, status: "paid", createdAt: "2024-01-15T09:30:00Z" },
        { id: "5", amount: 69, status: "failed", createdAt: "2024-01-15T09:00:00Z" }
      ]
    };

    setStats(mockStats);
    setIsLoading(false);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "text-green-600 bg-green-100";
      case "pending": return "text-yellow-600 bg-yellow-100";
      case "failed": return "text-red-600 bg-red-100";
      default: return "text-slate-600 bg-slate-100";
    }
  };

  if (isLoading || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Admin Dashboard</h1>
          <p className="text-lg text-slate-600">Monitor your e-learning platform performance and growth metrics</p>
        </div>

        {/* Period Selector */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-sm">
            {["7d", "30d", "90d", "1y"].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: "Total Traffic",
              value: stats.totalTraffic.toLocaleString(),
              icon: Eye,
              iconBg: "bg-blue-100",
              iconColor: "text-blue-600",
              growth: "+12.5%",
              growthColor: "text-green-600"
            },
            {
              title: "Total Leads",
              value: stats.totalLeads.toLocaleString(),
              icon: Mail,
              iconBg: "bg-green-100",
              iconColor: "text-green-600",
              growth: "+8.2%",
              growthColor: "text-green-600"
            },
            {
              title: "Total Orders",
              value: stats.totalOrders.toLocaleString(),
              icon: ShoppingCart,
              iconBg: "bg-purple-100",
              iconColor: "text-purple-600",
              growth: "+15.3%",
              growthColor: "text-green-600"
            },
            {
              title: "Total Revenue",
              value: `$${stats.totalRevenue.toLocaleString()}`,
              icon: DollarSign,
              iconBg: "bg-yellow-100",
              iconColor: "text-yellow-600",
              growth: "+22.1%",
              growthColor: "text-green-600"
            }
          ].map((stat, index) => (
            <div key={index} className="relative rounded-2xl overflow-hidden">
              <BorderBeam className="rounded-2xl"/>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.iconBg} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <span className="text-sm text-slate-500">Last {selectedPeriod}</span>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600">{stat.title}</div>
                <div className={`flex items-center mt-2 ${stat.growthColor} text-sm`}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stat.growth}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Conversion Metrics */}
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-6 mb-12">
          {/* Lead Conversion Rate */}
          <div className="relative rounded-2xl overflow-hidden">
            <BorderBeam className="rounded-2xl"/>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Lead Conversion Rate</h3>
              <div className="flex items-center justify-center mb-6">
                <AnimatedCircularProgressBar
                  value={stats.leadConversionRate}
                  gaugePrimaryColor="#3b82f6"
                  gaugeSecondaryColor="#e5e7eb"
                />
                <div className="absolute text-center">
                  <div className="text-3xl font-bold text-slate-900">{stats.leadConversionRate}%</div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-slate-600 mb-2">Leads converted to customers</p>
                <p className="text-sm text-slate-500">
                  {stats.totalLeads} leads → {Math.round(stats.totalLeads * stats.leadConversionRate / 100)} customers
                </p>
              </div>
            </div>
          </div>

          {/* Revenue Per Visitor */}
          <div className="relative rounded-2xl overflow-hidden">
            <BorderBeam className="rounded-2xl"/>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Revenue Per Visitor</h3>
              <div className="flex items-center justify-center mb-6">
                <AnimatedCircularProgressBar
                  value={Math.round(stats.revenuePerVisitor * 100)}
                  gaugePrimaryColor="#10b981"
                  gaugeSecondaryColor="#e5e7eb"
                />
                <div className="absolute text-center">
                  <div className="text-3xl font-bold text-slate-900">${stats.revenuePerVisitor}</div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-slate-600 mb-2">Average revenue per visitor</p>
                <p className="text-sm text-slate-500">
                  ${stats.totalRevenue.toLocaleString()} ÷ {stats.totalTraffic.toLocaleString()} visitors
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Leads */}
          <div className="relative rounded-2xl overflow-hidden">
            <BorderBeam className="rounded-2xl"/>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Recent Leads</h3>
                <ShimmerButton>View All</ShimmerButton>
              </div>
              <div className="space-y-4">
                {stats.recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Mail className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{lead.email}</div>
                        <div className="text-sm text-slate-500">{formatDate(lead.createdAt)}</div>
                      </div>
                    </div>
                    <InteractiveHoverButton>Contact</InteractiveHoverButton>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="relative rounded-2xl overflow-hidden">
            <BorderBeam className="rounded-2xl"/>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Recent Orders</h3>
                <ShimmerButton>View All</ShimmerButton>
              </div>
              <div className="space-y-4">
                {stats.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <ShoppingCart className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">${order.amount}</div>
                        <div className="text-sm text-slate-500">{formatDate(order.createdAt)}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <InteractiveHoverButton>View</InteractiveHoverButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ShimmerButton className="h-12">
                <Activity className="w-5 h-5 mr-2" />
                Generate Report
              </ShimmerButton>
              <InteractiveHoverButton className="h-12 flex ">
               <div className="flex items-center justify-center">
                <Users className="w-5 h-5 mr-2" />
                Manage Users
               </div>
              </InteractiveHoverButton>
              <ShimmerButton className="h-12" background="#29cc34">
                <BarChart3 className="w-5 h-5 mr-2" />
                Export Data
              </ShimmerButton>
            </div>
          </div>
        </div>

        {/* Dock Navigation */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Navigation</h3>
            <Dock className="mx-auto">
              <div className="bg-blue-500 text-white rounded-full p-3">
                <Home className="w-6 h-6" />
              </div>
              <div className="bg-green-500 text-white rounded-full p-3">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="bg-purple-500 text-white rounded-full p-3">
                <Users className="w-6 h-6" />
              </div>
              <div className="bg-yellow-500 text-white rounded-full p-3">
                <BarChart3 className="w-6 h-6" />
              </div>
            </Dock>
          </div>
        </div>
      </div>
    </div>
  );
}
