import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight } from 'lucide-react';

const gradeConfig = {
  'Grade 10': {
    gradient: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    description: 'Foundation Mathematics — build strong basics',
  },
  'Grade 11': {
    gradient: 'from-blue-500 to-indigo-500',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    description: 'Intermediate Mathematics — deepen your skills',
  },
  'Grade 12': {
    gradient: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    description: 'Matric Mathematics — prepare for exams',
  },
};

export default function GradeCard({ grade, videoCount, index = 0 }) {
  const config = gradeConfig[grade] || {
    gradient: 'from-slate-400 to-slate-500',
    bg: 'bg-slate-50',
    border: 'border-slate-100',
    description: 'Mathematics lessons',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link to={createPageUrl('Categories') + `?grade=${encodeURIComponent(grade)}`}>
        <div className={`group relative overflow-hidden rounded-2xl p-8 ${config.bg} border ${config.border} hover:shadow-xl transition-all duration-300`}>
          <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br ${config.gradient} opacity-15 group-hover:opacity-25 transition-opacity`} />
          
          <div className={`inline-flex p-3.5 rounded-2xl bg-gradient-to-br ${config.gradient} text-white mb-5`}>
            <GraduationCap className="w-7 h-7" />
          </div>
          
          <h3 className="font-bold text-2xl text-slate-800 mb-2">{grade}</h3>
          <p className="text-sm text-slate-500 mb-4">{config.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600 bg-white px-3 py-1 rounded-full border">
              {videoCount} {videoCount === 1 ? 'lesson' : 'lessons'}
            </span>
            <div className={`flex items-center gap-1 text-sm font-semibold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent group-hover:gap-2 transition-all`}>
              Browse <ArrowRight className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}