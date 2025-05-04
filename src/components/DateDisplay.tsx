
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

const DateDisplay = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      className="flex items-center justify-between bg-white rounded-xl p-4 border shadow-sm"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-mosque-100 rounded-lg text-mosque-600">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Today</p>
          <p className="font-medium">{format(currentDate, "EEEE, MMMM d, yyyy")}</p>
        </div>
      </div>
      <div className="text-xl font-semibold text-mosque-600">
        {format(currentDate, "hh:mm a")}
      </div>
    </motion.div>
  );
};

export default DateDisplay;
