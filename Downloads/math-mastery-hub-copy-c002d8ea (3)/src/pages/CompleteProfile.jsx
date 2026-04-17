import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { GraduationCap, CheckCircle, ArrowRight, Sparkles, Building2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const grades = ['Grade 10', 'Grade 11', 'Grade 12'];
const banks = ['FNB', 'Standard Bank', 'ABSA', 'Nedbank', 'Capitec', 'African Bank', 'Discovery Bank', 'TymeBank', 'Investec'];

export default function CompleteProfile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    phone_number: '',
    grade: '',
    bank_name: '',
    account_holder: '',
    account_number: '',
    account_type: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    base44.auth.me().then(u => {
      setUser(u);
      // If user already has an active trial or paid subscription, redirect to home
      if (u?.trial_end_date || (u?.subscription_active && u?.subscription_tier)) {
        navigate(createPageUrl('Home'));
      }
    }).catch(() => {
      // Not logged in, redirect to login
      base44.auth.redirectToLogin(window.location.href);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.phone_number || !formData.grade) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Calculate trial end date (3 days from now)
      const trialEndDate = new Date();
      trialEndDate.setDate(trialEndDate.getDate() + 3);

      // Update user with trial details
      await base44.auth.updateMe({
        phone_number: formData.phone_number,
        grade: formData.grade,
        subscription_tier: 'Trial',
        trial_end_date: trialEndDate.toISOString(),
        ...(formData.bank_name && { bank_name: formData.bank_name }),
        ...(formData.account_holder && { account_holder: formData.account_holder }),
        ...(formData.account_number && { account_number: formData.account_number }),
        ...(formData.account_type && { account_type: formData.account_type }),
      });

      toast.success('Welcome! Your 3-day trial has started!');
      navigate(createPageUrl('Home'));
    } catch (error) {
      toast.error('Failed to set up trial: ' + error.message);
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 py-16">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            Start Your Free Trial
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Complete Your Profile
          </h1>
          <p className="text-white/80 text-lg">
            Get <span className="text-amber-300 font-semibold">3 days free access</span> to all Grade 10-12 Mathematics lessons
          </p>
        </div>
      </div>

      {/* Signup Form */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Welcome, {user.full_name}!</h2>
              <p className="text-sm text-slate-500">Just a few details to get started</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                disabled
                className="mt-1.5 bg-slate-50"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone_number}
                onChange={(e) => setFormData(prev => ({ ...prev, phone_number: e.target.value }))}
                placeholder="e.g., 0812345678"
                className="mt-1.5"
                required
              />
            </div>

            <div>
              <Label htmlFor="grade">Your Grade Level *</Label>
              <Select
                value={formData.grade}
                onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select your grade" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map(g => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Banking Details */}
            <div className="border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="w-5 h-5 text-violet-600" />
                <h3 className="font-semibold text-slate-800">Banking Details <span className="text-slate-400 font-normal text-sm">(optional)</span></h3>
              </div>

              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
                <Shield className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-800">Securely stored — only used for refunds. You can also add this later in your profile.</p>
              </div>

              <div>
                <Label className="text-sm">Bank Name</Label>
                <Select value={formData.bank_name} onValueChange={(v) => setFormData(prev => ({ ...prev, bank_name: v }))}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {banks.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm">Account Holder Name</Label>
                <Input
                  value={formData.account_holder}
                  onChange={(e) => setFormData(prev => ({ ...prev, account_holder: e.target.value }))}
                  placeholder="Full name as per bank account"
                  className="mt-1.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Account Number</Label>
                  <Input
                    value={formData.account_number}
                    onChange={(e) => setFormData(prev => ({ ...prev, account_number: e.target.value }))}
                    placeholder="Account number"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label className="text-sm">Account Type</Label>
                  <Select value={formData.account_type} onValueChange={(v) => setFormData(prev => ({ ...prev, account_type: v }))}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cheque">Cheque</SelectItem>
                      <SelectItem value="Savings">Savings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 rounded-xl p-6">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-violet-600" />
                Your 3-Day Free Trial Includes:
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Full access to all Standard lessons for your grade</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Comment and ask questions on videos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Save your favorite lessons</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>No credit card required</span>
                </li>
              </ul>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 h-12 text-base font-semibold"
            >
              {loading ? 'Setting up your trial...' : 'Start My Free Trial'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <p className="text-xs text-center text-slate-500">
              After your trial ends, you can subscribe to continue learning.
            </p>
          </form>
        </motion.div>

        {/* Benefits Section */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            { title: 'Expert Teaching', desc: 'Learn from Prince Mabandla' },
            { title: 'At Your Pace', desc: 'Watch lessons anytime, anywhere' },
            { title: 'Interactive', desc: 'Ask questions and get support' },
          ].map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white rounded-xl border border-slate-100 p-4 text-center"
            >
              <h4 className="font-semibold text-slate-800 mb-1">{benefit.title}</h4>
              <p className="text-sm text-slate-500">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}