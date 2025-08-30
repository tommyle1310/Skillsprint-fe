"use client";

import * as React from "react";
import { useAuthStore } from "@/lib/authStore";
import { ForbiddenPage } from "@/app/ForbiddenPage";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  VisibilityState,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export type ManagedUser = {
  id: string;
  email: string;
  name?: string;
  role: "USER" | "ADMIN" | "LEAD" | "TEACHER";
  avatar?: string | null;
  lastLogin?: string | null;
};

const ALL_ROLES: ManagedUser["role"][] = ["USER", "LEAD", "TEACHER", "ADMIN"];

const columns: ColumnDef<ManagedUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div className="capitalize">{row.getValue("role")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "lastLogin",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Last Login
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-xs text-slate-600">
        {row.getValue("lastLogin") ? new Date(row.getValue("lastLogin") as string).toLocaleString() : "—"}
      </div>
    ),
  },
];

export default function UsersPage() {
  const { isAuthenticated, user } = useAuthStore();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [pageSize] = React.useState(10);
  const [rows, setRows] = React.useState<ManagedUser[]>([]);
  const [total, setTotal] = React.useState(0);
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/users?page=${page}&pageSize=${pageSize}`);
        const data = await res.json();
        if (!cancelled && data.success) {
          setRows(data.users as ManagedUser[]);
          setTotal(data.total as number);
        }
      } catch {
        if (!cancelled) {
          setRows([]);
          setTotal(0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [page, pageSize]);

  const handleChangeRole = async (userId: string, role: ManagedUser["role"]) => {
    try {
      setUpdatingId(userId);
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRows((prev) => prev.map((u) => (u.id === userId ? { ...u, role: data.user.role as ManagedUser["role"] } : u)));
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const table = useReactTable({
    data: rows,
    columns: [
      ...columns,
      {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
          const u = row.original as ManagedUser;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 px-2">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Adjust Role</DropdownMenuLabel>
                {ALL_ROLES.map((r) => (
                  <DropdownMenuItem key={r} disabled={updatingId === u.id || u.role === r} onClick={() => handleChangeRole(u.id, r)}>
                    {r}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(u.id)}>Copy user ID</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  if (!isAuthenticated || user?.role !== "ADMIN") return <ForbiddenPage />;

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(loading || updatingId !== null) && (
          <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
            <LoadingSpinner variant="spinner" size="lg" />
          </div>
        )}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-slate-600">Admin can adjust user roles and manage users.</p>
        </div>

        <div className="relative rounded-2xl overflow-hidden">
          <BorderBeam className="rounded-2xl" />
          <div className="bg-white rounded-2xl p-6 border">
            <div className="flex items-center py-4">
              <Input
                placeholder="Filter emails..."
                value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
                className="max-w-sm"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="overflow-hidden rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between py-4">
              <div className="text-muted-foreground text-sm">
                Page {page} of {totalPages} • {total} total
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1 || updatingId !== null}>
                  Previous
                </Button>
                <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages || updatingId !== null}>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
