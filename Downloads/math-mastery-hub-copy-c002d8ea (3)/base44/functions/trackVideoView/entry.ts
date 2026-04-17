import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { video_id } = await req.json();

    if (!video_id) {
      return Response.json({ error: 'video_id is required' }, { status: 400 });
    }

    // Get the video using service role to update views
    const videos = await base44.asServiceRole.entities.Video.filter({ id: video_id });
    if (videos.length === 0) {
      return Response.json({ error: 'Video not found' }, { status: 404 });
    }

    const video = videos[0];
    const newViews = (video.views || 0) + 1;
    await base44.asServiceRole.entities.Video.update(video_id, { views: newViews });

    return Response.json({ success: true, views: newViews });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});