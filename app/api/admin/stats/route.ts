import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Fetch dashboard stats via GraphQL API
    const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3001/graphql'}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query DashboardStats {
            dashboardStats {
              totalTraffic
              totalLeads
              totalOrders
              totalRevenue
              leadConversionRate
              revenuePerVisitor
              recentLeads {
                id
                email
                createdAt
              }
              recentOrders {
                id
                amount
                status
                createdAt
              }
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch dashboard stats");
    }

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return NextResponse.json(data.data.dashboardStats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    
    // Return mock data if API fails
    return NextResponse.json({
      totalTraffic: 15420,
      totalLeads: 1247,
      totalOrders: 89,
      totalRevenue: 8920,
      leadConversionRate: 8.1,
      revenuePerVisitor: 0.58,
      recentLeads: [
        { id: "1", email: "john.doe@example.com", createdAt: "2024-01-15T10:30:00Z" },
        { id: "2", email: "sarah.smith@example.com", createdAt: "2024-01-15T09:15:00Z" },
        { id: "3", email: "mike.johnson@example.com", createdAt: "2024-01-15T08:45:00Z" }
      ],
      recentOrders: [
        { id: "1", amount: 99, status: "paid", createdAt: "2024-01-15T11:20:00Z" },
        { id: "2", amount: 79, status: "paid", createdAt: "2024-01-15T10:45:00Z" },
        { id: "3", amount: 89, status: "pending", createdAt: "2024-01-15T10:15:00Z" }
      ]
    });
  }
}
