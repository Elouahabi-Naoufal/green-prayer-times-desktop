
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface NextPrayerCountdownProps {
  nextPrayerName: string;
  nextPrayerTime: Date;
}

const NextPrayerCountdown = ({ nextPrayerName, nextPrayerTime }: NextPrayerCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState('');
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      let diff = nextPrayerTime.getTime() - now.getTime();
      
      // If the prayer time is already past for today, assume it's for tomorrow
      if (diff < 0) {
        const tomorrow = new Date(nextPrayerTime);
        tomorrow.setDate(tomorrow.getDate() + 1);
        diff = tomorrow.getTime() - now.getTime();
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    
    setTimeLeft(calculateTimeLeft());
    
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(interval);
  }, [nextPrayerTime]);

  return (
    <motion.div 
      className="bg-gradient-to-r from-mosque-500 to-mosque-600 p-6 rounded-xl text-white shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-medium mb-2">Next Prayer</h2>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="text-4xl font-bold tracking-tight mb-2 md:mb-0">
          {timeLeft}
        </div>
        <div className="text-mosque-100 text-lg">
          Until <span className="font-semibold">{nextPrayerName}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default NextPrayerCountdown;
