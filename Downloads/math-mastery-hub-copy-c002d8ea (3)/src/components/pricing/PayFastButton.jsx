import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function PayFastButton({ grade, tier, price, highlighted, color }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Check if user is logged in
      const user = await base44.auth.me().catch(() => null);
      if (!user) {
        base44.auth.redirectToLogin(window.location.href);
        return;
      }

      // Get payment URL and data
      const response = await base44.functions.invoke('createPayFastPayment', {
        grade,
        tier,
        amount: parseInt(price.replace('R', '')),
      });

      // Handle both { data: { paymentUrl, paymentData } } and { paymentUrl, paymentData }
      const { paymentUrl, paymentData } = response.data || response;

      // Create form and submit to PayFast
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = paymentUrl;

      Object.keys(paymentData).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = paymentData[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      toast.error('Payment failed: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className={`w-full h-11 md:h-12 ${
        highlighted
          ? 'bg-white text-slate-800 hover:bg-white/90 font-semibold'
          : `bg-gradient-to-r ${color} text-white hover:opacity-90`
      }`}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          <span className="text-sm md:text-base">Processing...</span>
        </>
      ) : (
        <>
          <span className="text-sm md:text-base">Pay with Your Bank</span>
          <ArrowRight className="w-4 h-4 ml-1 md:ml-2" />
        </>
      )}
    </Button>
  );
}