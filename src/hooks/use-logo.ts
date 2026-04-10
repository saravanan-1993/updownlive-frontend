"use client";
import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios';

let cachedLogoUrl: string | null = null;
let fetchPromise: Promise<string | null> | null = null;

function fetchLogo(): Promise<string | null> {
  if (!fetchPromise) {
    fetchPromise = axiosInstance.get('/settings/general-info')
      .then(res => {
        cachedLogoUrl = res.data?.info?.logoUrl || null;
        return cachedLogoUrl;
      })
      .catch(() => null);
  }
  return fetchPromise;
}

export function useLogo() {
  const [logoUrl, setLogoUrl] = useState<string | null>(cachedLogoUrl);

  useEffect(() => {
    if (cachedLogoUrl) {
      setLogoUrl(cachedLogoUrl);
      return;
    }
    fetchLogo().then(url => setLogoUrl(url));
  }, []);

  return logoUrl;
}
