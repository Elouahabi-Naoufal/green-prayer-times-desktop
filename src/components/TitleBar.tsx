
import { Minus, X, Square } from "lucide-react";

// Extend the existing PrayerTimesResponse interface from usePrayerTimes.ts
interface PrayerTimesResponse {
  success: boolean;
  date?: string;
  prayerTimes?: Record<string, string>;
  error?: string;
}

// Create a unified interface for the electron API
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

const TitleBar = () => {
  const handleMinimize = () => {
    window.electron?.windowControls.minimize();
  };

  const handleMaximize = () => {
    window.electron?.windowControls.maximize();
  };

  const handleClose = () => {
    window.electron?.windowControls.close();
  };

  return (
    <div className="bg-white h-8 flex justify-between items-center border-b select-none">
      <div className="pl-2 flex items-center gap-2">
        <div className="w-4 h-4">
          <img src="/mosque-icon.png" alt="Prayer Times" className="w-full h-full" />
        </div>
        <span className="text-sm font-medium text-mosque-700">Prayer Times</span>
      </div>
      <div className="flex">
        <button
          onClick={handleMinimize}
          className="w-10 h-8 flex items-center justify-center hover:bg-gray-100"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleMaximize}
          className="w-10 h-8 flex items-center justify-center hover:bg-gray-100"
        >
          <Square className="w-3 h-3" />
        </button>
        <button
          onClick={handleClose}
          className="w-10 h-8 flex items-center justify-center hover:bg-red-500 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
