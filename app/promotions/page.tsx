"use client";

import * as React from "react";
import { useAuthStore } from "@/lib/authStore";
import { ForbiddenPage } from "@/app/ForbiddenPage";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoadingSpinner } from "@/components/LoadingSpinner";

type Promotion = {
  id: string;
  code: string;
  discountPercentage: number;
  expiresAt: string;
};

const columns: ColumnDef<Promotion>[] = [
  { accessorKey: "code", header: "Code" },
  { accessorKey: "discountPercentage", header: "Discount %" },
  { accessorKey: "expiresAt", header: "Expires" },
];

export default function PromotionsPage() {
  const { isAuthenticated, user } = useAuthStore();
  const [rows, setRows] = React.useState<Promotion[]>([]);
  const [page, setPage] = React.useState(1);
  const pageSize = 10;
  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const [saving, setSaving] = React.useState(false);
  const [form, setForm] = React.useState<Partial<Promotion>>({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/promotions');
        const data = await res.json();
        if (data.success) setRows(data.promotions as Promotion[]);
      } catch {}
      finally { setLoading(false); }
    })();
  }, []);

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (!isAuthenticated || user?.role !== "ADMIN") return <ForbiddenPage />;

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(loading || saving) && (
          <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
            <LoadingSpinner variant="spinner" size="lg" />
          </div>
        )}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Promotions</h1>
          <p className="text-slate-600">Manage promotion codes and discounts.</p>
        </div>

        <div className="relative rounded-2xl overflow-hidden">
          <BorderBeam className="rounded-2xl" />
          <div className="bg-white rounded-2xl p-6 border">
            <div className="flex items-end gap-3 mb-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Code</label>
                <input value={form.code || ''} onChange={(e)=>setForm((f)=>({...f, code:e.target.value}))} className="border rounded px-2 py-1" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Discount %</label>
                <input type="number" value={form.discountPercentage ?? ''} onChange={(e)=>setForm((f)=>({...f, discountPercentage: Number(e.target.value)}))} className="border rounded px-2 py-1 w-24" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Expires At</label>
                <input type="datetime-local" value={form.expiresAt ? new Date(form.expiresAt).toISOString().slice(0,16) : ''} onChange={(e)=>setForm((f)=>({...f, expiresAt: new Date(e.target.value).toISOString()}))} className="border rounded px-2 py-1" />
              </div>
              <Button disabled={saving} onClick={async ()=>{
                try{
                  setSaving(true);
                  const res = await fetch('/api/promotions', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ code: form.code, discountPercentage: form.discountPercentage, expiresAt: form.expiresAt }) });
                  const data = await res.json();
                  if (data.success && data.promotion){ setRows((r)=>[data.promotion, ...r]); setForm({}); }
                } finally { setSaving(false); }
              }}>Create</Button>
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
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                        ))}
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={async ()=>{
                            setSaving(true);
                            const p = row.original as Promotion;
                            const code = prompt('Code', p.code) ?? p.code;
                            const discount = Number(prompt('Discount %', String(p.discountPercentage)) ?? p.discountPercentage);
                            const expiresAt = prompt('Expires ISO', p.expiresAt) ?? p.expiresAt;
                            try {
                              const res = await fetch('/api/promotions', { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id: p.id, code, discountPercentage: discount, expiresAt }) });
                              const data = await res.json();
                              if (data.success){ setRows((r)=> r.map((it)=> it.id===p.id ? data.promotion : it)); }
                            } finally { setSaving(false); }
                          }}>Edit</Button>
                          <Button className="ml-2" variant="destructive" size="sm" onClick={async ()=>{
                            const p = row.original as Promotion;
                            if (!confirm('Delete promotion '+p.code+'?')) return;
                            setSaving(true);
                            try {
                              const res = await fetch('/api/promotions?id='+p.id, { method:'DELETE' });
                              const data = await res.json();
                              if (data.success){ setRows((r)=> r.filter((it)=> it.id!==p.id)); }
                            } finally { setSaving(false); }
                          }}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
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
                <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>
                  Previous
                </Button>
                <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>
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


