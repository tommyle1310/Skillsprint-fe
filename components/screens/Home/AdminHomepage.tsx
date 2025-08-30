"use client";

import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { TrendingUp, DollarSign, Eye, Mail, ShoppingCart, ChevronDown, MousePointer, Scroll, Users, Globe, Monitor, BarChart3, Clock } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
//
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
  churnRateToday?: number;
  churnRateCompare?: number;
  gaActiveUsers?: number;
  gaSessions?: number;
  gaBounceRate?: number;
  todayUsers?: number;
  todayPaidUsers?: number;
  funnel?: {
    leads: number;
    users: number;
    paidUsers: number;
    leadToUserRate: number;
    userToPaidRate: number;
    overallRate: number;
  }
}

const ADMIN_OVERVIEW_QUERY = gql`
  query AdminOverview($period: AdminOverviewPeriodType!) {
    adminOverview(period: $period) {
      period
      recentOrders { id amount status createdAt }
      recentUsers { id email name image role createdAt }
      today { orders revenue leads users paidUsers }
      compare { orders revenue leads users paidUsers }
      funnel { leads users paidUsers leadToUserRate userToPaidRate overallRate }
      churnRateToday
      churnRateCompare
      totalTraffic
      gaActiveUsers
      gaSessions
      gaBounceRate
    }
  }
`;

const COMPREHENSIVE_ANALYTICS_QUERY = gql`
  query ComprehensiveAnalytics($days: Int!) {
    comprehensiveAnalytics(days: $days) {
      summary {
        pageViews
        sessions
        activeUsers
        avgSessionDurationSec
        engagementDurationSec
        bounceRate
      }
      ctaClicks {
        register
        login
        courses
        pricing
      }
      scrollBuckets {
        s25
        s50
        s75
        s90
        s100
      }
      newReturning {
        newUsers
        returningUsers
      }
      topPages {
        path
        title
        pageViews
        avgSessionDurationSec
        bounceRate
      }
      acquisition {
        source
        medium
        channelGroup
        sessions
        activeUsers
        engagedSessions
        bounceRate
      }
      devices {
        device
        sessions
      }
      countries {
        country
        sessions
      }
      averageScrollPercentage
      overallCtr
      formSubmissions
      hoverEvents
    }
  }
`;

type InquiryRow = { id: string; subject: string; name: string; email: string; status: string; createdAt: string };

function AdminInquiriesWidget() {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [rows, setRows] = useState<InquiryRow[]>([]);
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
  
  const { isAuthenticated, isAdmin, loading: authLoading, initialized } = useAuthStore();

  const labelToEnum: Record<string, string> = {
    "7d": "SEVEN_DAYS",
    "30d": "THIRTY_DAYS",
    "90d": "NINETY_DAYS",
    "1y": "ONE_YEAR",
  };

  const { data, loading: queryLoading, refetch } = useQuery(ADMIN_OVERVIEW_QUERY, {
    variables: { period: labelToEnum[selectedPeriod] },
  });

  const { data: analyticsData, loading: analyticsLoading } = useQuery(COMPREHENSIVE_ANALYTICS_QUERY, {
    variables: { days: 7 },
  });

  // Load from GraphQL
  useEffect(() => {
    if (queryLoading) return;
    if (!data?.adminOverview) return;
    const ao = data.adminOverview;
    const derived: DashboardStats = {
      totalTraffic: ao.totalTraffic ?? 0,
      totalLeads: ao.today.leads,
      totalOrders: ao.today.orders,
      totalRevenue: ao.today.revenue,
      leadConversionRate: ao.funnel?.leadToUserRate ?? 0,
      revenuePerVisitor: 0,
      recentLeads: ao.recentUsers.map((u: { id: string; email: string; createdAt: string }) => ({ id: u.id, email: u.email, createdAt: u.createdAt })),
      recentOrders: ao.recentOrders,
      churnRateToday: ao.churnRateToday,
      churnRateCompare: ao.churnRateCompare,
      gaActiveUsers: ao.gaActiveUsers ?? undefined,
      gaSessions: ao.gaSessions ?? undefined,
      gaBounceRate: ao.gaBounceRate ?? undefined,
      todayUsers: ao.today.users,
      todayPaidUsers: ao.today.paidUsers,
      funnel: ao.funnel,
    };
    setStats(derived);
    setIsLoading(false);
  }, [queryLoading, data]);

  // Check if user is admin (after hooks to keep hooks order stable)
  if (!initialized || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return <ForbiddenPage />;
  }

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
                onClick={() => { setSelectedPeriod(period); refetch({ period: labelToEnum[period] }); }}
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
              value: `$${(stats.totalRevenue / 100).toFixed(2).toLocaleString()}`,
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

        {/* Google Analytics Metrics */}
        {analyticsData?.comprehensiveAnalytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: "Active Users",
                value: analyticsData.comprehensiveAnalytics.summary.activeUsers.toLocaleString(),
                icon: Users,
                iconBg: "bg-indigo-100",
                iconColor: "text-indigo-600",
                subtitle: "Last 7 days"
              },
              {
                title: "Sessions",
                value: analyticsData.comprehensiveAnalytics.summary.sessions.toLocaleString(),
                icon: BarChart3,
                iconBg: "bg-emerald-100",
                iconColor: "text-emerald-600",
                subtitle: "Last 7 days"
              },
              {
                title: "Page Views",
                value: analyticsData.comprehensiveAnalytics.summary.pageViews.toLocaleString(),
                icon: Eye,
                iconBg: "bg-cyan-100",
                iconColor: "text-cyan-600",
                subtitle: "Last 7 days"
              },
              {
                title: "Avg Session Duration",
                value: `${Math.round(analyticsData.comprehensiveAnalytics.summary.avgSessionDurationSec / 60)}m ${analyticsData.comprehensiveAnalytics.summary.avgSessionDurationSec % 60}s`,
                icon: MousePointer,
                iconBg: "bg-orange-100",
                iconColor: "text-orange-600",
                subtitle: "Last 7 days"
              }
            ].map((stat, index) => (
              <div key={index} className="relative rounded-2xl overflow-hidden">
                <BorderBeam className="rounded-2xl"/>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.iconBg} rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                    <span className="text-sm text-slate-500">{stat.subtitle}</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-600">{stat.title}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Performance */}
        {analyticsData?.comprehensiveAnalytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: "Register Clicks",
                value: analyticsData.comprehensiveAnalytics.ctaClicks.register.toLocaleString(),
                icon: MousePointer,
                iconBg: "bg-green-100",
                iconColor: "text-green-600",
                ctr: analyticsData.comprehensiveAnalytics.overallCtr.toFixed(1) + "%"
              },
              {
                title: "Login Clicks",
                value: analyticsData.comprehensiveAnalytics.ctaClicks.login.toLocaleString(),
                icon: MousePointer,
                iconBg: "bg-blue-100",
                iconColor: "text-blue-600",
                ctr: analyticsData.comprehensiveAnalytics.overallCtr.toFixed(1) + "%"
              },
              {
                title: "Courses Clicks",
                value: analyticsData.comprehensiveAnalytics.ctaClicks.courses.toLocaleString(),
                icon: MousePointer,
                iconBg: "bg-purple-100",
                iconColor: "text-purple-600",
                ctr: analyticsData.comprehensiveAnalytics.overallCtr.toFixed(1) + "%"
              },
              {
                title: "Pricing Clicks",
                value: analyticsData.comprehensiveAnalytics.ctaClicks.pricing.toLocaleString(),
                icon: MousePointer,
                iconBg: "bg-red-100",
                iconColor: "text-red-600",
                ctr: analyticsData.comprehensiveAnalytics.overallCtr.toFixed(1) + "%"
              }
            ].map((stat, index) => (
              <div key={index} className="relative rounded-2xl overflow-hidden">
                <BorderBeam className="rounded-2xl"/>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.iconBg} rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                    <span className="text-sm text-slate-500">CTR: {stat.ctr}</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-600">{stat.title}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Conversion Metrics */}
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-6 mb-12">
          {/* Lead Conversion Rate */}
          <div className="relative rounded-2xl overflow-hidden">
            <BorderBeam className="rounded-2xl"/>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Lead Conversion Rate</h3>
              <div className="flex items-center justify-center mb-6">
                <AnimatedCircularProgressBar
                  value={stats.funnel?.leadToUserRate ?? stats.leadConversionRate}
                  gaugePrimaryColor="#3b82f6"
                  gaugeSecondaryColor="#e5e7eb"
                />
             
              </div>
              <div className="text-center">
                <p className="text-slate-600 mb-2">Leads converted to customers</p>
                <p className="text-sm text-slate-500">
                  {stats.funnel?.leads ?? stats.totalLeads} leads → {stats.funnel?.users ?? Math.round(stats.totalLeads * (stats.leadConversionRate/100))} users
                </p>
              </div>
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="relative rounded-2xl overflow-hidden">
            <BorderBeam className="rounded-2xl"/>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Conversion Stages</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1 text-sm text-slate-600">
                    <span>Leads</span>
                    <span className="font-medium text-slate-900">{stats.funnel?.leads ?? stats.totalLeads}</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded">
                    <div
                      className="h-3 bg-blue-500 rounded"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1 text-sm text-slate-600">
                    <span>Users</span>
                    <span className="font-medium text-slate-900">{stats.funnel?.users ?? 0}</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded">
                    <div
                      className="h-3 bg-green-500 rounded"
                      style={{ width: `${Math.max(0, Math.min(100, (stats.funnel && stats.funnel.leads > 0 ? (stats.funnel.users / stats.funnel.leads) * 100 : 0)))}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1 text-sm text-slate-600">
                    <span>Paid</span>
                    <span className="font-medium text-slate-900">{stats.funnel?.paidUsers ?? 0}</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded">
                    <div
                      className="h-3 bg-amber-500 rounded"
                      style={{ width: `${Math.max(0, Math.min(100, (stats.funnel && stats.funnel.users > 0 ? (stats.funnel.paidUsers / stats.funnel.users) * 100 : 0)))}%` }}
                    />
                  </div>
                </div>
              </div>

              {stats.funnel && (
                <div className="grid grid-cols-2 gap-3 mt-6 text-center">
                  <div className="rounded-lg bg-blue-50 py-2">
                    <div className="text-xs text-slate-500">Lead → User</div>
                    <div className="text-lg font-semibold text-blue-700">{stats.funnel.leadToUserRate.toFixed(1)}%</div>
                  </div>
                  <div className="rounded-lg bg-green-50 py-2">
                    <div className="text-xs text-slate-500">User → Paid</div>
                    <div className="text-lg font-semibold text-green-700">{stats.funnel.userToPaidRate.toFixed(1)}%</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Churn Rate */}
          <div className="relative rounded-2xl overflow-hidden">
            <BorderBeam className="rounded-2xl"/>
            <div className="bg-white rounded-2xl h-full p-8 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Churn Rate</h3>
              <AnimatedCircularProgressBar
              className="mx-auto"
                  value={stats.churnRateToday ?? stats.churnRateCompare ?? 0}
                  gaugePrimaryColor="#f59e0b"
                  gaugeSecondaryColor="#e5e7eb"
                />
                <p className="text-slate-600 text-center mt-4 mb-2">Amount of users who stopped using the platform</p>
                            </div>
          </div>
        </div>

        {/* Scroll Depth & Engagement */}
        {analyticsData?.comprehensiveAnalytics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Scroll Depth */}
            <div className="relative rounded-2xl overflow-hidden">
              <BorderBeam className="rounded-2xl"/>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Scroll Depth Analysis</h3>
                <div className="space-y-4">
                  {[
                    { label: "25%", value: analyticsData.comprehensiveAnalytics.scrollBuckets.s25, color: "bg-red-500" },
                    { label: "50%", value: analyticsData.comprehensiveAnalytics.scrollBuckets.s50, color: "bg-orange-500" },
                    { label: "75%", value: analyticsData.comprehensiveAnalytics.scrollBuckets.s75, color: "bg-yellow-500" },
                    { label: "90%", value: analyticsData.comprehensiveAnalytics.scrollBuckets.s90, color: "bg-green-500" },
                    { label: "100%", value: analyticsData.comprehensiveAnalytics.scrollBuckets.s100, color: "bg-blue-500" }
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1 text-sm text-slate-600">
                        <span>{item.label} Scroll</span>
                        <span className="font-medium text-slate-900">{item.value.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded">
                        <div
                          className={`h-2 ${item.color} rounded`}
                          style={{ width: `${Math.min(100, (item.value / Math.max(1, analyticsData.comprehensiveAnalytics.scrollBuckets.s25)) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-slate-500">Average Scroll: {analyticsData.comprehensiveAnalytics.averageScrollPercentage.toFixed(1)}%</p>
                </div>
              </div>
            </div>

            {/* User Engagement */}
            <div className="relative rounded-2xl overflow-hidden">
              <BorderBeam className="rounded-2xl"/>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-6">User Engagement</h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900 mb-2">
                      {analyticsData.comprehensiveAnalytics.newReturning.newUsers.toLocaleString()}
                    </div>
                    <div className="text-slate-600">New Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900 mb-2">
                      {analyticsData.comprehensiveAnalytics.newReturning.returningUsers.toLocaleString()}
                    </div>
                    <div className="text-slate-600">Returning Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900 mb-2">
                      {analyticsData.comprehensiveAnalytics.formSubmissions.toLocaleString()}
                    </div>
                    <div className="text-slate-600">Form Submissions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900 mb-2">
                      {analyticsData.comprehensiveAnalytics.hoverEvents.toLocaleString()}
                    </div>
                    <div className="text-slate-600">Hover Events</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="relative rounded-2xl overflow-hidden">
            <BorderBeam className="rounded-2xl"/>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Recent Users</h3>
                <ShimmerButton>View All</ShimmerButton>
              </div>
              <div className="space-y-4">
                {stats.recentLeads.slice(0, 5).map((lead) => (
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
          <div className="relative rounded-2xl flex-grow flex-1 h-full overflow-hidden">
            <BorderBeam className="rounded-2xl"/>
            <div className="bg-white h-full rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Recent Orders</h3>
                <ShimmerButton>View All</ShimmerButton>
              </div>
              <div className="space-y-4">
                {stats.recentOrders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <ShoppingCart className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">${(order.amount / 100).toFixed(2).toLocaleString()}</div>
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
                  <div className="text-2xl font-bold">{stats.totalLeads}</div>
                  <div className="text-xs text-slate-500">Leads</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.totalOrders}</div>
                  <div className="text-xs text-slate-500">Orders</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">${(stats.totalRevenue / 100).toFixed(2).toLocaleString()}</div>
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
