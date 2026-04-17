import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';
import { createHash } from 'node:crypto';

// PayFast valid IPs for ITN
const PAYFAST_VALID_IPS = [
  '41.74.179.194',
  '41.74.179.195',
  '41.74.179.196',
  '41.74.179.197',
  '41.74.179.198',
  '41.74.179.199',
  '41.74.179.200',
  '41.74.179.201',
  '41.74.179.202',
  '41.74.179.203',
  '127.0.0.1', // localhost for testing
];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Validate PayFast IP (skip in sandbox/testing)
    const isSandbox = Deno.env.get('PAYFAST_SANDBOX') === 'true';
    if (!isSandbox) {
      const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                       req.headers.get('cf-connecting-ip') ||
                       '0.0.0.0';
      if (!PAYFAST_VALID_IPS.includes(clientIp)) {
        console.warn(`Rejected ITN from invalid IP: ${clientIp}`);
        return new Response('Forbidden', { status: 403 });
      }
    }

    // Get POST data
    const formData = await req.formData();
    const data = Object.fromEntries(formData);

    // Verify signature
    const passphrase = Deno.env.get('PAYFAST_PASSPHRASE') || '';
    const receivedSignature = data.signature;
    const dataForSig = { ...data };
    delete dataForSig.signature;

    // PayFast ITN verification — alphabetical sort, spaces as '+' (URLSearchParams)
    const params = new URLSearchParams();
    for (const key of Object.keys(dataForSig).sort()) {
      params.append(key, String(dataForSig[key]).trim());
    }
    if (passphrase) params.append('passphrase', passphrase.trim());
    const signatureString = params.toString();

    const expectedSignature = createHash('md5').update(signatureString).digest('hex');

    if (receivedSignature !== expectedSignature) {
      console.error('PayFast ITN: Invalid signature');
      console.error('Expected:', expectedSignature);
      console.error('Received:', receivedSignature);
      return new Response('Invalid signature', { status: 400 });
    }

    // Verify payment status
    if (data.payment_status === 'COMPLETE') {
      const userId = data.custom_str1;
      const grade = data.custom_str2;
      const tier = data.custom_str3;

      if (!userId) {
        console.error('PayFast ITN: Missing user ID in custom_str1');
        return new Response('OK', { status: 200 });
      }

      // Calculate subscription end date (1 month)
      const subscriptionEndDate = new Date();
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);

      // Update user subscription
      await base44.asServiceRole.entities.User.update(userId, {
        subscription_tier: tier,
        grade: grade,
        subscription_end_date: subscriptionEndDate.toISOString(),
        subscription_active: true,
      });

      // Create a notification for the user
      await base44.asServiceRole.entities.Notification.create({
        user_email: data.email_address || '',
        message: `✅ Your ${grade} ${tier} subscription is now active!`,
        is_read: false,
      });

      console.log(`✅ Subscription activated for user ${userId}: ${grade} ${tier}`);
    } else if (data.payment_status === 'CANCELLED') {
      console.log(`Payment cancelled for ${data.custom_str1}`);
    } else if (data.payment_status === 'FAILED') {
      console.error(`Payment FAILED for ${data.custom_str1}`);
    }

    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});