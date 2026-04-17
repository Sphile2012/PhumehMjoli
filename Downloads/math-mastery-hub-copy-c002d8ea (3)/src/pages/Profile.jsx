import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { User, Building2, Save, CheckCircle, Shield } from 'lucide-react';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const banks = [
  'FNB',
  'Standard Bank',
  'ABSA',
  'Nedbank',
  'Capitec',
  'African Bank',
  'Discovery Bank',
  'TymeBank',
  'Investec',
];

const grades = ['Grade 10', 'Grade 11', 'Grade 12'];

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const bankingRef = useRef(null);

  const [formData, setFormData] = useState({
    phone_number: '',
    grade: '',
    bank_name: '',
    account_holder: '',
    account_number: '',
    account_type: '',
  });

  useEffect(() => {
    if (window.location.hash === '#banking') {
      setTimeout(() => bankingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 400);
    }

    base44.auth.me().then(currentUser => {
      setUser(currentUser);
      setFormData({
        phone_number: currentUser.phone_number || '',
        grade: currentUser.grade || '',
        bank_name: currentUser.bank_name || '',
        account_holder: currentUser.account_holder || '',
        account_number: currentUser.account_number || '',
        account_type: currentUser.account_type || '',
      });
    }).catch(() => {
      base44.auth.redirectToLogin(window.location.href);
    });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      await base44.auth.updateMe(formData);
      const updatedUser = await base44.auth.me();
      setUser(updatedUser);
      setSaved(true);
      toast.success('Profile updated successfully!');
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      toast.error('Failed to update profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
      </div>
    );
  }

  const initials = user.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl md:text-3xl font-bold">
              {initials}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{user.full_name}</h1>
            <p className="text-white/70 text-sm mb-3">{user.email}</p>
            {user.subscription_tier && (
              <Badge className="bg-white/20 text-white border-white/30 text-xs">
                {user.subscription_tier} Plan
              </Badge>
            )}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6 md:py-8">
        <form onSubmit={handleSave} className="space-y-5">

          {/* Personal Information */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <User className="w-5 h-5 text-violet-600 flex-shrink-0" />
                Personal Information
              </CardTitle>
              <CardDescription className="text-sm">Your basic account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm">Full Name</Label>
                  <Input id="name" value={user.full_name} disabled className="bg-slate-50 mt-1.5 text-sm" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm">Email Address</Label>
                  <Input id="email" type="email" value={user.email} disabled className="bg-slate-50 mt-1.5 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-sm">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone_number}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone_number: e.target.value }))}
                    placeholder="e.g., 0812345678"
                    className="mt-1.5 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="grade" className="text-sm">Grade Level</Label>
                  <Select
                    value={formData.grade}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}
                  >
                    <SelectTrigger className="mt-1.5 text-sm">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map(g => (
                        <SelectItem key={g} value={g}>{g}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Banking Details */}
          <Card ref={bankingRef}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Building2 className="w-5 h-5 text-violet-600 flex-shrink-0" />
                Banking Details
              </CardTitle>
              <CardDescription className="text-sm">Used for refunds or payment purposes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bank" className="text-sm">Bank Name</Label>
                <Select
                  value={formData.bank_name}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, bank_name: value }))}
                >
                  <SelectTrigger className="mt-1.5 text-sm">
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {banks.map(bank => (
                      <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="accountHolder" className="text-sm">Account Holder Name</Label>
                <Input
                  id="accountHolder"
                  value={formData.account_holder}
                  onChange={(e) => setFormData(prev => ({ ...prev, account_holder: e.target.value }))}
                  placeholder="Full name as per bank account"
                  className="mt-1.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="accountNumber" className="text-sm">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={formData.account_number}
                    onChange={(e) => setFormData(prev => ({ ...prev, account_number: e.target.value }))}
                    placeholder="Enter account number"
                    className="mt-1.5 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="accountType" className="text-sm">Account Type</Label>
                  <Select
                    value={formData.account_type}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, account_type: value }))}
                  >
                    <SelectTrigger className="mt-1.5 text-sm">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cheque">Cheque Account</SelectItem>
                      <SelectItem value="Savings">Savings Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
                <Shield className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-800">
                  Your banking details are securely stored and only used for refunds. We never share your information.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Info */}
          {user.subscription_tier && (
            <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-violet-100">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <CheckCircle className="w-5 h-5 text-violet-600 flex-shrink-0" />
                  Subscription Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500 mb-1 text-xs">Current Plan</p>
                    <p className="font-semibold text-slate-800">{user.subscription_tier}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1 text-xs">Status</p>
                    <p className={`font-semibold ${user.subscription_active ? 'text-green-600' : 'text-red-500'}`}>
                      {user.subscription_active ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                  {user.subscription_end_date && (
                    <div className="col-span-2 sm:col-span-1">
                      <p className="text-slate-500 mb-1 text-xs">Valid Until</p>
                      <p className="font-semibold text-slate-800">
                        {new Date(user.subscription_end_date).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Save Button */}
          <div className="flex justify-end pb-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 h-11 px-8"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </span>
              ) : saved ? (
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Saved!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}