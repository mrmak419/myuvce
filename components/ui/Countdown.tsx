"use client";

import React, { useState, useEffect } from 'react';
import { MetricCard } from './MetricCard';

interface CountdownProps {
  targetDate: string; // e.g., "2026-06-30T00:00:00"
}

export const Countdown = ({ targetDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="Days" value="--" description="Calculating..." />
        <MetricCard title="Hours" value="--" description="Calculating..." />
        <MetricCard title="Minutes" value="--" description="Calculating..." />
        <MetricCard title="Seconds" value="--" description="Calculating..." />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in">
      <MetricCard title="Days" value={timeLeft.days.toString()} description="Until Launch" />
      <MetricCard title="Hours" value={timeLeft.hours.toString()} description="Remaining" />
      <MetricCard title="Minutes" value={timeLeft.minutes.toString()} description="To go" />
      <MetricCard 
        title="Seconds" 
        value={timeLeft.seconds.toString()} 
        description="Ticking" 
        trend="Live" 
      />
    </div>
  );
};