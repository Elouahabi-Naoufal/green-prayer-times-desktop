
import { useState, useEffect } from "react";

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return currentTime;
};

export const determineNextPrayer = (prayerTimes: Record<string, string>) => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;
  
  const prayers = Object.entries(prayerTimes).map(([name, time]) => {
    const [hours, minutes] = time.split(':').map(Number);
    const timeInMinutes = hours * 60 + minutes;
    
    const prayerDate = new Date();
    prayerDate.setHours(hours, minutes, 0, 0);
    
    return {
      name,
      time,
      timeInMinutes,
      date: prayerDate,
    };
  });
  
  // Sort prayers by time
  prayers.sort((a, b) => a.timeInMinutes - b.timeInMinutes);
  
  // Find the next prayer
  const nextPrayer = prayers.find(prayer => prayer.timeInMinutes > currentTimeInMinutes);
  
  // If no next prayer today, the next prayer is the first one tomorrow
  if (!nextPrayer) {
    const firstPrayer = prayers[0];
    const tomorrowDate = new Date(firstPrayer.date);
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    
    return {
      name: firstPrayer.name,
      time: firstPrayer.time,
      date: tomorrowDate
    };
  }
  
  return {
    name: nextPrayer.name,
    time: nextPrayer.time,
    date: nextPrayer.date
  };
};

export const isCurrentPrayer = (prayerTime: string): boolean => {
  const now = new Date();
  const [hours, minutes] = prayerTime.split(':').map(Number);
  const prayerDate = new Date();
  prayerDate.setHours(hours, minutes, 0, 0);
  
  // A prayer is considered "current" if it's within 15 minutes after the prayer time
  const fifteenMinutesLater = new Date(prayerDate);
  fifteenMinutesLater.setMinutes(fifteenMinutesLater.getMinutes() + 15);
  
  return now >= prayerDate && now <= fifteenMinutesLater;
};
