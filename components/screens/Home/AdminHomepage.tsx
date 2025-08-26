"use client";

import { useState, useEffect } from "react";
import { BarChart3, Users, TrendingUp, DollarSign, Eye, Mail, ShoppingCart, Activity, Home, BookOpen, ChevronDown } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Dock } from "@/components/magicui/dock";
import { useAuthStore } from "@/lib/authStore";
import { ForbiddenPage } from "@/app/ForbiddenPage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { TableBody, Table, TableCell, TableHead, TableRow, TableHeader } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";

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

function AdminInquiriesWidget() {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [rows, setRows] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch(
        `/api/inquiries?page=${page}&pageSize=${pageSize}`
      );
      const data = await res.json();
      if (!cancelled && data.success) {
        setRows(data.inquiries);
        setTotal(data.total);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [page]);

  const setStatus = async (id: string, status: string) => {
    try {
      setUpdatingId(id);
      const res = await fetch("/api/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRows((prev) =>
          prev.map((r) =>
            r.id === id ? { ...r, status: data.inquiry.status } : r
          )
        );
      }
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden">
      <div className="bg-white rounded-2xl p-6 border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Inquiries</h2>
          <div className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </div>
        </div>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>From</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((q) => (
                <TableRow key={q.id}>
                  <TableCell className="font-medium">{q.subject}</TableCell>
                  <TableCell>
                    {q.name} • {q.email}
                  </TableCell>
                  <TableCell>{q.status}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={updatingId === q.id}
                        >
                          Set status <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Choose</DropdownMenuLabel>
                        {["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"].map(
                          (s) => (
                            <DropdownMenuItem
                              key={s}
                              onClick={() => setStatus(q.id, s)}
                              disabled={q.status === s || updatingId === q.id}
                            >
                              {s}
                            </DropdownMenuItem>
                          )
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-24 text-center text-slate-500"
                  >
                    No inquiries yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-slate-500">Total {total}</div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1 || updatingId !== null}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages || updatingId !== null}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminHomepage() {
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
    <div className="min-h-screen py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between mb-6">
         <div className="flex flex-col">
           <h1 className="text-4xl font-bold text-slate-900 mb-4">
             Admin Dashboard
           </h1>
           <p className="text-lg text-slate-600">
             Monitor your e-learning platform performance and growth
             metrics
           </p>
         </div>
         <Link href="/users">
           <ShimmerButton>Manage Users</ShimmerButton>
         </Link>
       </div>
    <div className="min-h-screen py-4 ">
      <div className="max-w-7xl mx-auto ">
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
      </div>
    </div>
      <div className="mt-4">           
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="relative rounded-2xl overflow-hidden">
            <BorderBeam className="rounded-2xl" />
            <div className="bg-white rounded-2xl p-6 border">
              <h2 className="font-semibold mb-4">Quick Links</h2>
              <div className="flex gap-3">
                <Link href="/courses/new">
                  <ShimmerButton>Create Course</ShimmerButton>
                </Link>
                <Link href="/courses">
                  <ShimmerButton>All Courses</ShimmerButton>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden">
            <BorderBeam className="rounded-2xl" />
            <div className="bg-white rounded-2xl p-6 border">
              <h2 className="font-semibold mb-2">Today</h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">--</div>
                  <div className="text-xs text-slate-500">Leads</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">--</div>
                  <div className="text-xs text-slate-500">Orders</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">--</div>
                  <div className="text-xs text-slate-500">Revenue</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Inquiries Table */}
        <div className="lg:col-span-2">
          <AdminInquiriesWidget />
        </div>
      </div>
    </div>
    </div>

  );
}
