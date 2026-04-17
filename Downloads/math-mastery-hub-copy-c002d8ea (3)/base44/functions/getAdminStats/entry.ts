import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const [videos, users] = await Promise.all([
      base44.asServiceRole.entities.Video.list(),
      base44.asServiceRole.entities.User.list()
    ]);

    const totalVideos = videos.length;
    const totalStudents = users.filter(u => u.role !== 'admin').length;
    const totalViews = videos.reduce((sum, v) => sum + (v.views || 0), 0);
    const avgViewsPerVideo = totalVideos > 0 ? Math.round(totalViews / totalVideos) : 0;

    const activeSubscriptions = users.filter(u => {
      if (u.role === 'admin') return false;
      const now = new Date();
      const hasTrial = u.trial_end_date && new Date(u.trial_end_date) > now;
      const hasSub = u.subscription_active && u.subscription_end_date && new Date(u.subscription_end_date) > now;
      return hasTrial || hasSub;
    }).length;

    const gradeDistribution = videos.reduce((acc, v) => {
      acc[v.grade] = (acc[v.grade] || 0) + 1;
      return acc;
    }, {});

    const tierDistribution = videos.reduce((acc, v) => {
      acc[v.tier] = (acc[v.tier] || 0) + 1;
      return acc;
    }, {});

    const topVideos = [...videos]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5)
      .map(v => ({ id: v.id, title: v.title, views: v.views || 0, grade: v.grade }));

    return Response.json({
      success: true,
      stats: {
        totalVideos,
        totalStudents,
        totalViews,
        avgViewsPerVideo,
        activeSubscriptions,
        gradeDistribution,
        tierDistribution,
        topVideos
      }
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});