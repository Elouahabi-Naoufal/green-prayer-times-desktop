
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface PrayerCardProps {
  name: string;
  time: string;
  active?: boolean;
  next?: boolean;
  icon?: React.ReactNode;
}

const PrayerCard = ({ name, time, active, next, icon }: PrayerCardProps) => {
  const [prayerTime] = useState(() => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0);
    return date;
  });

  const [timeFormatted, setTimeFormatted] = useState('');
  
  useEffect(() => {
    setTimeFormatted(format(prayerTime, 'hh:mm a'));
  }, [prayerTime]);

  return (
    <motion.div
      className={`prayer-card ${active ? 'prayer-active' : ''}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {next && (
        <span className="absolute -top-2 -right-2 bg-mosque-500 text-white text-xs px-2 py-0.5 rounded-full">
          Next
        </span>
      )}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-mosque-100 rounded-lg text-mosque-600">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{name}</h3>
          <p className="text-lg font-semibold text-mosque-600">{timeFormatted}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PrayerCard;
