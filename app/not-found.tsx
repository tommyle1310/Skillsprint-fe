"use client";

import Link from "next/link";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="relative rounded-2xl overflow-hidden max-w-xl w-full">
        <BorderBeam className="rounded-2xl" />
        <div className="bg-white rounded-2xl p-8 border text-center">
          <div className="text-7xl font-extrabold text-slate-900">404</div>
          <p className="mt-2 text-slate-600">The page you are looking for does not exist.</p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link href="/">
              <ShimmerButton className="flex items-center">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </ShimmerButton>
            </Link>
            <button onClick={() => history.back()} className="inline-flex items-center px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
