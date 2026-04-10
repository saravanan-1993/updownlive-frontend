"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

export default function UnsubscribePage() {
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState<"loading" | "success" | "already" | "error">("loading");

  useEffect(() => {
    if (!id) return;
    axiosInstance
      .put(`/newsletter/unsubscribe/${id}`)
      .then((res) => {
        if (res.data?.alreadyUnsubscribed) {
          setStatus("already");
        } else {
          setStatus("success");
        }
      })
      .catch(() => setStatus("error"));
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4 font-outfit">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-200 dark:border-white/10 p-8 text-center">
        {status === "loading" && (
          <>
            <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 font-medium">Processing your request...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-brand-black dark:text-white mb-2">Unsubscribed Successfully</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You have been removed from the UpDownLive newsletter. You will no longer receive emails from us.
            </p>
          </>
        )}

        {status === "already" && (
          <>
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-brand-black dark:text-white mb-2">Already Unsubscribed</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This email has already been unsubscribed from the UpDownLive newsletter.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-brand-black dark:text-white mb-2">Something Went Wrong</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We couldn't process your unsubscribe request. Please try again later or contact support.
            </p>
          </>
        )}

        {status !== "loading" && (
          <Link
            href="/"
            className="inline-block bg-brand-blue text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-600 transition-all"
          >
            Go to Homepage
          </Link>
        )}
      </div>
    </div>
  );
}
