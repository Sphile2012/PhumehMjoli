import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Grid3X3, 
  Heart, 
  Upload, 
  Menu, 
  X, 
  User,
  LogOut,
  GraduationCap,
  Info,
  CreditCard,
  MessageCircle,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import NotificationBell from './components/notifications/NotificationBell';

const navItems = [
  { name: 'Home', icon: Home, page: 'Home' },
  { name: 'Lessons', icon: Grid3X3, page: 'Categories' },
  { name: 'Pricing', icon: CreditCard, page: 'Pricing' },
  { name: 'About', icon: Info, page: 'About' },
  { name: 'Favourites', icon: Heart, page: 'Favorites', requiresAuth: true },
  { name: 'Messages', icon: MessageCircle, page: 'Messages', requiresAuth: true },
  { name: 'Dashboard', icon: GraduationCap, page: 'StudentDashboard', requiresAuth: true },
];

export default function Layout({ children, currentPageName }) {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  const initials = user?.full_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || '?';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-800 hidden sm:block">
                MathTutor
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                if (item.requiresAuth && !user) return null;
                const isActive = currentPageName === item.page;
                return (
                  <Link key={item.name} to={createPageUrl(item.page)}>
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-violet-100 text-violet-700' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}>
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </button>
                  </Link>
                );
              })}
              
              {user?.role === 'admin' && (
                <Link to={createPageUrl('AdminUpload')}>
                  <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPageName === 'AdminUpload' 
                      ? 'bg-violet-100 text-violet-700' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}>
                    <Upload className="w-4 h-4" />
                    Upload
                  </button>
                </Link>
              )}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {user && <NotificationBell user={user} />}
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xs">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-3 py-2">
                      <p className="font-medium text-slate-800">{user.full_name}</p>
                      <p className="text-sm text-slate-500">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl('Profile')} className="cursor-pointer">
                        <User className="w-4 h-4 mr-2" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl('Profile') + '#banking'} className="cursor-pointer">
                        <Building2 className="w-4 h-4 mr-2" />
                        Banking Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl('Favorites')} className="cursor-pointer">
                        <Heart className="w-4 h-4 mr-2" />
                        My Favorites
                      </Link>
                    </DropdownMenuItem>
                    {user.role === 'admin' && (
                      <DropdownMenuItem asChild>
                        <Link to={createPageUrl('AdminUpload')} className="cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Videos
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => base44.auth.logout()}
                      className="text-red-600 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link to={createPageUrl('Register')}>
                    <Button
                      className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                      size="sm"
                    >
                      Start Free Trial
                    </Button>
                  </Link>
                  <Button
                    onClick={() => base44.auth.redirectToLogin(window.location.href)}
                    variant="outline"
                    size="sm"
                  >
                    Sign In
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-100 bg-white"
            >
              <div className="px-4 py-4 space-y-1">
                {navItems.map((item) => {
                  if (item.requiresAuth && !user) return null;
                  const isActive = currentPageName === item.page;
                  return (
                    <Link 
                      key={item.name} 
                      to={createPageUrl(item.page)}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive 
                          ? 'bg-violet-100 text-violet-700' 
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}>
                        <item.icon className="w-5 h-5" />
                        {item.name}
                      </button>
                    </Link>
                  );
                })}
                
                {user?.role === 'admin' && (
                  <Link 
                    to={createPageUrl('AdminUpload')}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      currentPageName === 'AdminUpload' 
                        ? 'bg-violet-100 text-violet-700' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}>
                      <Upload className="w-5 h-5" />
                      Upload Videos
                    </button>
                  </Link>
                )}

                {!user && (
                  <div className="space-y-2 mt-2">
                    <Link to={createPageUrl('Register')} className="block">
                    <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
                      Start Free Trial
                    </Button>
                  </Link>
                    <Button
                      onClick={() => base44.auth.redirectToLogin(window.location.href)}
                      variant="outline"
                      className="w-full"
                    >
                      Sign In
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-slate-800">MathTutor</span>
            </div>
            <p className="text-sm text-slate-500">
              Grade 10-12 Mathematics by Prince Mabandla
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}