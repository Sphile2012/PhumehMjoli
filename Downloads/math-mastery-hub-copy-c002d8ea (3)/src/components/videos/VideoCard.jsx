import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Play, Clock, Eye, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function VideoCard({ video, isFavorited, onToggleFavorite, showFavorite = true }) {
  const gradeColors = {
    'Grade 10': 'from-emerald-500 to-teal-500',
    'Grade 11': 'from-blue-500 to-indigo-500',
    'Grade 12': 'from-violet-500 to-purple-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
    >
      <Link to={createPageUrl('VideoPlayer') + `?id=${video.id}`}>
        <div className="relative aspect-video overflow-hidden">
          {video.thumbnail_url ? (
            <img
              src={video.thumbnail_url}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className={cn(
              "w-full h-full bg-gradient-to-br flex items-center justify-center",
              gradeColors[video.grade] || 'from-slate-400 to-slate-500'
            )}>
              <Play className="w-12 h-12 text-white/80" />
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-md">
            {video.duration || '10:00'}
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg">
              <Play className="w-6 h-6 text-slate-800 ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-2 flex-wrap">
              <span className={cn(
                "inline-block text-xs font-semibold px-2.5 py-1 rounded-full text-white bg-gradient-to-r",
                gradeColors[video.grade] || 'from-slate-400 to-slate-500'
              )}>
                {video.grade}
              </span>
              {video.tier === 'Premium' && (
                <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
                  Premium
                </span>
              )}
              {video.topic && (
                <span className="inline-block text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                  {video.topic}
                </span>
              )}
            </div>
            <Link to={createPageUrl('VideoPlayer') + `?id=${video.id}`}>
              <h3 className="font-semibold text-slate-800 line-clamp-2 hover:text-violet-600 transition-colors">
                {video.title}
              </h3>
            </Link>
          </div>
          
          {showFavorite && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onToggleFavorite?.(video.id);
              }}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <Heart
                className={cn(
                  "w-5 h-5 transition-colors",
                  isFavorited ? "fill-rose-500 text-rose-500" : "text-slate-400"
                )}
              />
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            {video.views || 0} views
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {video.duration || '10:00'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}