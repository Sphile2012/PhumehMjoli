import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Search, Grid, List, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import VideoCard from '../components/videos/VideoCard';
import GradeCard from '@/components/videos/GradeCard';

const grades = ['Grade 10', 'Grade 11', 'Grade 12'];
const topics = ['Algebra', 'Functions', 'Geometry', 'Statistics', 'Trigonometry'];

export default function Categories() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const queryClient = useQueryClient();

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
    
    const urlParams = new URLSearchParams(window.location.search);
    const gradeParam = urlParams.get('grade');
    if (gradeParam && grades.includes(gradeParam)) {
      setSelectedGrade(gradeParam);
    }
  }, []);

  const { data: videos = [], isLoading } = useQuery({
    queryKey: ['videos'],
    queryFn: () => base44.entities.Video.list('-created_date', 100),
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

  const filteredVideos = videos.filter(video => {
    const matchesSearch = !searchQuery || 
      video.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = !selectedGrade || video.grade === selectedGrade;
    const matchesTopic = !selectedTopic || video.topic === selectedTopic;
    return matchesSearch && matchesGrade && matchesTopic;
  });

  const gradeVideoCounts = grades.reduce((acc, g) => {
    acc[g] = videos.filter(v => v.grade === g).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 border-slate-200"
                />
              </div>
            </div>
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}>
                <Grid className="w-4 h-4 text-slate-600" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}>
                <List className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
          
          {/* Grade Filters */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
            <button
              onClick={() => { setSelectedGrade(null); setSelectedTopic(null); }}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${!selectedGrade ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              All Grades
            </button>
            {grades.map((grade) => (
              <button
                key={grade}
                onClick={() => { setSelectedGrade(grade); setSelectedTopic(null); }}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedGrade === grade ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {grade}
                <span className="ml-1.5 text-xs opacity-70">({gradeVideoCounts[grade]})</span>
              </button>
            ))}
          </div>

          {/* Topic Filters (shown when a grade is selected) */}
          {selectedGrade && (
            <div className="flex items-center gap-2 mt-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedTopic(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${!selectedTopic ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                All Topics
              </button>
              {topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${selectedTopic === topic ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {topic}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Grade Cards (when no grade selected) */}
        {!selectedGrade && !searchQuery && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Browse by Grade</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {grades.map((grade, index) => (
                <GradeCard key={grade} grade={grade} videoCount={gradeVideoCounts[grade]} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Active Filters */}
        {(selectedGrade || selectedTopic || searchQuery) && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-sm text-slate-500">Filters:</span>
            {selectedGrade && (
              <Badge variant="secondary" className="bg-violet-100 text-violet-700 hover:bg-violet-200 cursor-pointer" onClick={() => { setSelectedGrade(null); setSelectedTopic(null); }}>
                {selectedGrade} <X className="w-3 h-3 ml-1" />
              </Badge>
            )}
            {selectedTopic && (
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 cursor-pointer" onClick={() => setSelectedTopic(null)}>
                {selectedTopic} <X className="w-3 h-3 ml-1" />
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer" onClick={() => setSearchQuery('')}>
                "{searchQuery}" <X className="w-3 h-3 ml-1" />
              </Badge>
            )}
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">
            {selectedGrade ? `${selectedGrade}${selectedTopic ? ` — ${selectedTopic}` : ''} Lessons` : searchQuery ? 'Search Results' : 'All Lessons'}
          </h2>
          <span className="text-sm text-slate-500">{filteredVideos.length} videos</span>
        </div>

        {/* Video Grid/List */}
        {isLoading ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100">
                <Skeleton className="aspect-video w-full" />
                <div className="p-4">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredVideos.length > 0 ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isFavorited={favoriteVideoIds.includes(video.id)}
                onToggleFavorite={(id) => user && toggleFavoriteMutation.mutate(id)}
                showFavorite={!!user}
              />
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">No videos found</h3>
            <p className="text-slate-500">
              {searchQuery ? `No results for "${searchQuery}".` : 'No videos uploaded yet. Check back soon!'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}