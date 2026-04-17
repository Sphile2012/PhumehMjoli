import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    // APK download URL — set APK_DOWNLOAD_URL env variable to your hosted APK URL
    // e.g. a Google Drive direct download link or GitHub release URL
    const apkUrl = Deno.env.get('APK_DOWNLOAD_URL') || null;

    const appInfo = {
      appName: 'MathTutor - Grade 10-12 Mathematics',
      version: '1.0.0',
      downloadUrl: apkUrl,
      available: !!apkUrl,
      releaseDate: new Date().toISOString(),
      features: [
        'Video Lessons for Grade 10-12',
        'Interactive Q&A',
        'Save Favourites',
        'Track Progress',
        '3-Day Free Trial'
      ],
      size: '25 MB',
      minAndroidVersion: '5.0'
    };

    return Response.json({ success: true, appInfo });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});