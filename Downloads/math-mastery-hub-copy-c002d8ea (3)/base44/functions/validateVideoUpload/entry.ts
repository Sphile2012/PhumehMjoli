import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    // Only Prince (admin) can upload videos
    if (!user || user.role !== 'admin') {
      return Response.json({ 
        error: 'Access denied. Only Prince (admin) can upload videos.' 
      }, { status: 403 });
    }

    const { title, grade, tier } = await req.json();

    if (!title || !grade || !tier) {
      return Response.json({ 
        error: 'Missing required fields: title, grade, and tier are required' 
      }, { status: 400 });
    }

    const validGrades = ['Grade 10', 'Grade 11', 'Grade 12'];
    if (!validGrades.includes(grade)) {
      return Response.json({ error: 'Invalid grade. Must be Grade 10, 11, or 12' }, { status: 400 });
    }

    const validTiers = ['Standard', 'Premium'];
    if (!validTiers.includes(tier)) {
      return Response.json({ error: 'Invalid tier. Must be Standard or Premium' }, { status: 400 });
    }

    return Response.json({ 
      success: true,
      message: 'Upload validation passed',
      uploader: user.full_name
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});