import { useState, useEffect } from 'react';

interface Progress {
  completedModules: string[]; // IDs of sensors/boards
  unlockedBadges: string[];
  totalScore: number;
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(() => {
    const saved = localStorage.getItem('sensor-lab-progress');
    return saved ? JSON.parse(saved) : { completedModules: [], unlockedBadges: [], totalScore: 0 };
  });

  useEffect(() => {
    localStorage.setItem('sensor-lab-progress', JSON.stringify(progress));
  }, [progress]);

  const completeModule = (id: string, score: number) => {
    setProgress(prev => ({
      ...prev,
      completedModules: prev.completedModules.includes(id) ? prev.completedModules : [...prev.completedModules, id],
      totalScore: prev.totalScore + score
    }));
  };

  const addBadge = (badge: string) => {
    setProgress(prev => ({
      ...prev,
      unlockedBadges: prev.unlockedBadges.includes(badge) ? prev.unlockedBadges : [...prev.unlockedBadges, badge]
    }));
  };

  return { progress, completeModule, addBadge };
}
