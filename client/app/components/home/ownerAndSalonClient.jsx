"use client";
import { useRouter } from "next/navigation";

export default function OwnerActions({ type }) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 mt-4">
      {type == "gallery" && (
        <button
          onClick={() => router.push("/gallery")}
          className="p-2 px-5 w-full bg-slate-600 text-white hover:text-black hover:bg-slate-300 rounded-md transition"
        >
          مشاهده گالری
        </button>
      )}
      {type == "salon" && (
        <button
          onClick={() => router.push("/salon")}
          className="p-2 px-5 w-full bg-slate-600 text-white hover:text-black hover:bg-slate-300 rounded-md transition"
        >
          مشاهده عکس‌های سالن
        </button>
      )}
    </div>
  );
}
