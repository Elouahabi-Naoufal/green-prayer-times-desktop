
import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface PrayerTimesResponse {
  success: boolean;
  date?: string;
  prayerTimes?: Record<string, string>;
  error?: string;
}

declare global {
  interface Window {
    electron: {
      fetchPrayerTimes: () => Promise<PrayerTimesResponse>;
      windowControls: {
        minimize: () => void;
        maximize: () => void;
        close: () => void;
      }
    }
  }
}

export const usePrayerTimes = () => {
  const [loading, setLoading] = useState(true);
  const [prayerTimes, setPrayerTimes] = useState<Record<string, string> | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPrayerTimes = async () => {
    setLoading(true);
    try {
      // Check if we're in Electron environment
      if (window.electron) {
        const response = await window.electron.fetchPrayerTimes();
        
        if (response.success && response.prayerTimes) {
          setPrayerTimes(response.prayerTimes);
          setDate(response.date);
          setError(null);
        } else {
          setError(response.error || "Failed to fetch prayer times");
          toast.error(response.error || "Failed to fetch prayer times");
        }
      } else {
        // Fallback for development in browser
        console.log("Electron API not available, using mock data");
        // Mock data for development
        setPrayerTimes({
          "Fajr": "05:30",
          "Dhuhr": "13:15",
          "Asr": "16:45",
          "Maghrib": "19:30",
          "Isha": "21:00"
        });
        setDate("04/05");
      }
    } catch (err) {
      console.error("Error fetching prayer times:", err);
      setError("Failed to fetch prayer times");
      toast.error("Failed to fetch prayer times");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrayerTimes();
    
    // Refresh prayer times at midnight
    const checkDate = () => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        fetchPrayerTimes();
      }
    };
    
    const interval = setInterval(checkDate, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  const refreshPrayerTimes = () => {
    fetchPrayerTimes();
    toast.success("Prayer times refreshed");
  };

  return {
    loading,
    prayerTimes,
    date,
    error,
    refreshPrayerTimes
  };
};
