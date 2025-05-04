
import { useEffect } from "react";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useCurrentTime, determineNextPrayer, isCurrentPrayer } from "@/hooks/useCurrentTime";
import { Button } from "@/components/ui/button";
import PrayerCard from "@/components/PrayerCard";
import NextPrayerCountdown from "@/components/NextPrayerCountdown";
import DateDisplay from "@/components/DateDisplay";
import { Settings, RefreshCcw, Sun, Clock, Calendar, Moon, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const getPrayerIcon = (prayerName: string) => {
  switch (prayerName.toLowerCase()) {
    case "fajr":
      return <Sun className="w-5 h-5" />;
    case "dhuhr":
      return <Sun className="w-5 h-5" />;
    case "asr":
      return <Clock className="w-5 h-5" />;
    case "maghrib":
      return <Moon className="w-5 h-5" />;
    case "isha":
      return <Moon className="w-5 h-5" />;
    default:
      return <Clock className="w-5 h-5" />;
  }
};

const Index = () => {
  const { loading, prayerTimes, refreshPrayerTimes } = usePrayerTimes();
  const currentTime = useCurrentTime();
  
  let nextPrayer = { name: "", time: "", date: new Date() };
  if (prayerTimes) {
    nextPrayer = determineNextPrayer(prayerTimes);
  }

  useEffect(() => {
    // Set document title with next prayer
    if (nextPrayer.name) {
      document.title = `Next: ${nextPrayer.name} - ${nextPrayer.time}`;
    } else {
      document.title = "Prayer Times";
    }
  }, [nextPrayer]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-4 pb-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-mosque-700">
            Prayer Times <span className="text-mosque-500">for Tangier</span>
          </h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={refreshPrayerTimes}
            >
              <RefreshCcw className="w-4 h-4" />
            </Button>
            <Link to="/settings">
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
        
        <DateDisplay />
        
        <div className="my-6">
          {!loading && prayerTimes && nextPrayer.name ? (
            <NextPrayerCountdown 
              nextPrayerName={nextPrayer.name} 
              nextPrayerTime={nextPrayer.date} 
            />
          ) : (
            <div className="bg-gradient-to-r from-mosque-500 to-mosque-600 p-6 rounded-xl text-white shadow-lg animate-pulse">
              <h2 className="text-xl font-medium mb-2">Next Prayer</h2>
              <div className="flex justify-between items-center">
                <div className="h-8 w-24 bg-white/30 rounded animate-pulse"></div>
                <div className="h-6 w-32 bg-white/30 rounded animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="prayer-card animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : prayerTimes ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Object.entries(prayerTimes).map(([name, time]) => (
              <motion.div key={name} variants={itemVariants}>
                <PrayerCard
                  name={name}
                  time={time}
                  active={isCurrentPrayer(time)}
                  next={nextPrayer.name === name}
                  icon={getPrayerIcon(name)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-mosque-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700">No Prayer Times Available</h3>
            <p className="text-gray-500 mt-1">Try refreshing or check your connection.</p>
            <Button 
              variant="default" 
              className="mt-6 bg-mosque-600 hover:bg-mosque-700"
              onClick={refreshPrayerTimes}
            >
              Refresh Prayer Times
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
