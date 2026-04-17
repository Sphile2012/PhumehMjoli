import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { video_id, video_title, grade } = await req.json();

    if (!video_id || !video_title || !grade) {
      return Response.json({ 
        error: 'Missing required fields: video_id, video_title, and grade are required' 
      }, { status: 400 });
    }

    // Get all users excluding the uploader
    const allUsers = await base44.asServiceRole.entities.User.list();
    const targetUsers = allUsers.filter(u => u.email !== user.email && u.email);

    // Create notifications in batches to avoid timeout
    let count = 0;
    for (const u of targetUsers) {
      try {
        await base44.asServiceRole.entities.Notification.create({
          user_email: u.email,
          video_id: video_id,
          message: `📚 New ${grade} lesson: "${video_title}"`,
          is_read: false,
        });
        count++;
      } catch (e) {
        console.error(`Failed to notify ${u.email}:`, e.message);
      }
    }

    return Response.json({ 
      success: true,
      notifications_sent: count,
      message: `Notifications sent to ${count} users`
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});