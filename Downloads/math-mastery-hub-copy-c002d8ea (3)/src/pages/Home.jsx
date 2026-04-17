import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Sparkles, GraduationCap, BookOpen, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoCard from '../components/videos/VideoCard';
import GradeCard from '@/components/videos/GradeCard';

const grades = ['Grade 10', 'Grade 11', 'Grade 12'];

export default function Home() {
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  const { data: videos = [], isLoading } = useQuery({
    queryKey: ['videos'],
    queryFn: () => base44.entities.Video.list('-created_date', 50),
  });

  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites', user?.email],
    queryFn: () => base44.entities.Favorite.filter({ user_email: user?.email }),
    enabled: !!user?.email,
  });

  const favoriteVideoIds = favorites.map(f => f.video_id);

  const toggleFavoriteMutation = useMutation({
    mutationFn: async (videoId) => {
      const existing = favorites.find(f => f.video_id === videoId);
      if (existing) {
        await base44.entities.Favorite.delete(existing.id);
      } else {
        await base44.entities.Favorite.create({ video_id: videoId, user_email: user.email });
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  });

  const featuredVideos = videos.slice(0, 4);
  const gradeVideoCounts = grades.reduce((acc, g) => {
    acc[g] = videos.filter(v => v.grade === g).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Grade 10, 11 & 12 Mathematics
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Master Mathematics
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">
                One Lesson at a Time
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Expertly crafted video lessons by <span className="text-amber-300 font-semibold">Prince Mabandla</span> for Grade 10, 11 & 12 Mathematics.
              Learn at your own pace with interactive discussions.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {user ? (
                <>
                  <Link to={createPageUrl('Categories')}>
                    <Button size="lg" className="bg-white text-violet-700 hover:bg-white/90 px-8 h-12 text-base font-semibold">
                      <Play className="w-5 h-5 mr-2" fill="currentColor" />
                      Browse Lessons
                    </Button>
                  </Link>
                  <Link to={createPageUrl('Pricing')}>
                    <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 h-12 text-base">
                      View Pricing
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to={createPageUrl('Register')}>
                    <Button
                      size="lg"
                      className="bg-white text-violet-700 hover:bg-white/90 px-8 h-12 text-base font-semibold"
                    >
                      Start Free 3-Day Trial
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    onClick={() => base44.auth.redirectToLogin(window.location.href)}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-8 h-12 text-base"
                  >
                    Sign In
                  </Button>
                </>
              )}
            </div>
            
            <div className="mt-6">
              <Link 
                to={createPageUrl('DownloadApp')}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                Download Android App (APK)
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto"
          >
            {[
              { icon: BookOpen, label: 'Video Lessons', value: videos.length },
              { icon: GraduationCap, label: 'Grades', value: grades.length },
              { icon: Play, label: 'Hours of Content', value: '50+' },
            ].map((stat, i) => (
              <div key={i} className="text-center text-white">
                <stat.icon className="w-6 h-6 mx-auto mb-2 opacity-80" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Grades Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Choose Your Grade</h2>
            <p className="text-slate-500 mt-1">Select your grade to browse Mathematics lessons</p>
          </div>
          <Link to={createPageUrl('Categories')} className="text-violet-600 hover:text-violet-700 font-medium text-sm flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {grades.map((grade, index) => (
            <GradeCard
              key={grade}
              grade={grade}
              videoCount={gradeVideoCounts[grade]}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Featured Videos Section */}
      {featuredVideos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50/50">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Latest Lessons</h2>
              <p className="text-slate-500 mt-1">Recently uploaded video lessons</p>
            </div>
            <Link to={createPageUrl('Categories')} className="text-violet-600 hover:text-violet-700 font-medium text-sm flex items-center gap-1">
              See all videos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isFavorited={favoriteVideoIds.includes(video.id)}
                onToggleFavorite={(id) => user && toggleFavoriteMutation.mutate(id)}
                showFavorite={!!user}
              />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full blur-3xl" />
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ready to Excel in Mathematics?
              </h3>
              <p className="text-slate-300 text-lg">
                Join our learning community and get access to all video lessons.
              </p>
            </div>
            
            {user ? (
              <Link to={createPageUrl('Pricing')}>
                <Button size="lg" className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 px-8 h-12 text-base font-semibold whitespace-nowrap">
                  Subscribe Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                onClick={() => base44.auth.redirectToLogin(window.location.href)}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 px-8 h-12 text-base font-semibold whitespace-nowrap"
              >
                Register / Sign In
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}