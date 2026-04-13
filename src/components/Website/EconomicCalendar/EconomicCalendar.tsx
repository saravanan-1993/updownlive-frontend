"use client";

import React, { useEffect, useRef, memo } from "react";
import { Info, Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const EconomicCalendarWidget = memo(() => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    // Clear previous widget
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.async = true;
    script.type = "text/javascript";
    script.setAttribute("data-type", "calendar-widget");
    script.src = "https://www.tradays.com/c/js/widgets/calendar/widget.js?v=15";

    // Configuration with expanded settings
    const config = {
      width: "100%",
      height: "800",
      mode: "1",
      fw: "html",
      countries: "us,eu,gb,jp,au,ca,nz,ch,se,no",
      importance: "1,2,3",
      eventTypes: "1,2,3,4,5,6",
      showall: "1"
    };

    script.textContent = JSON.stringify(config);
    container.current.appendChild(script);

    return () => {
      if (container.current) {
        container.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div id="economicCalendarWidget" ref={container} className="w-full h-full" />
      <div className="ecw-copyright mt-3 text-center py-3 border-t border-gray-200 dark:border-zinc-800">
        <a
          href="https://www.mql5.com/?utm_source=calendar.widget&utm_medium=link&utm_term=economic.calendar&utm_content=visit.mql5.calendar&utm_campaign=202.calendar.widget"
          rel="noopener nofollow"
          target="_blank"
          className="text-brand-blue hover:underline text-xs"
        >
          MQL5 Algo Trading Community
        </a>
      </div>
    </div>
  );
});

export default function EconomicCalendar() {
  return (
    <div className="w-full max-w-[1420px] mx-auto font-outfit pb-20 pt-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-medium mb-4">
            <Calendar size={14} />
            <span>Market Events Tracker</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-black dark:text-white mb-4 tracking-tight">
            Economic Calendar
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Stay ahead of the markets with real-time updates on global macroeconomic events, data reports, and central bank announcements.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 shadow-sm px-5 py-3 rounded-2xl">
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-20 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-brand-black dark:text-white leading-tight">Live Market Data</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Powered by MQL5</span>
            </div>
          </div>
          
          <Link 
            href="/brokers" 
            className="group flex items-center gap-2 bg-brand-black dark:bg-white text-white dark:text-brand-black px-5 py-3 rounded-2xl font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-md hover:shadow-lg"
          >
            Compare Brokers
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Widget Container */}
      <div className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 px-1">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-brand-black dark:text-white">
            <Clock size={18} className="text-brand-blue" />
            Global Economic Schedule
          </h2>
          <div className="flex items-center gap-2">
            <Info size={14} className="text-gray-400" />
            <span className="text-xs text-gray-500">Times are shown in your local timezone</span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm overflow-hidden min-h-[800px]">
          <EconomicCalendarWidget />
        </div>
      </div>
    </div>
  );
}
