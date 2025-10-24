'use client';

import { Avatar } from '@/components/atoms/Avatar';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { Input } from '@/components/atoms/Input';
import { Spinner } from '@/components/atoms/Spinner';
import { Textarea } from '@/components/atoms/Textarea';
import { ToastContainer } from '@/components/atoms/Toast';
import { Navbar } from '@/components/organisms/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/useToast';
import { Camera, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const { user, updateUser, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toasts, success, error } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    specialties: '',
    hourlyRate: '',
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.role === 'CHEF' ? (user as any).bio || '' : '',
        location: user.role === 'CHEF' ? (user as any).location || '' : '',
        specialties:
          user.role === 'CHEF' ? ((user as any).specialties || []).join(', ') : '',
        hourlyRate: user.role === 'CHEF' ? (user as any).hourlyRate?.toString() || '' : '',
      });
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateData: any = {
        name: formData.name,
        phone: formData.phone,
      };

      if (user?.role === 'CHEF') {
        updateData.bio = formData.bio;
        updateData.location = formData.location;
        updateData.specialties = formData.specialties.split(',').map((s) => s.trim());
        updateData.hourlyRate = parseFloat(formData.hourlyRate);
      }

      await updateUser(updateData);
      success('Profile updated successfully!');
    } catch (err: any) {
      error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      error('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement password change API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      success('Password changed successfully!');
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
    } catch (err: any) {
      error('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

        {/* Profile Picture */}
        <Card className="mb-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar src={user.profileImage} alt={user.name} size="xl" />
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                <Camera size={18} />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500 capitalize">{user.role.toLowerCase()}</p>
            </div>
          </div>
        </Card>

        {/* Profile Information */}
        <Card className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              disabled
              helperText="Email cannot be changed"
            />

            <Input
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            {user.role === 'CHEF' && (
              <>
                <Textarea
                  label="Bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  placeholder="Tell clients about yourself..."
                />

                <Input
                  label="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, State"
                />

                <Input
                  label="Specialties"
                  value={formData.specialties}
                  onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                  placeholder="Italian, French, Asian (comma separated)"
                  helperText="Separate specialties with commas"
                />

                <Input
                  label="Hourly Rate ($)"
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                  placeholder="85"
                />
              </>
            )}

            <div className="flex gap-3">
              <Button type="submit" isLoading={loading}>
                Save Changes
              </Button>
              <Button type="button" variant="ghost" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>

        {/* Password Change */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Password & Security</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
            >
              <Lock size={16} className="mr-2" />
              {showPasswordForm ? 'Cancel' : 'Change Password'}
            </Button>
          </div>

          {showPasswordForm && (
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, oldPassword: e.target.value })
                }
                required
              />

              <Input
                label="New Password"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, newPassword: e.target.value })
                }
                helperText="Must be at least 8 characters"
                required
              />

              <Input
                label="Confirm New Password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                }
                required
              />

              <Button type="submit" isLoading={loading}>
                Update Password
              </Button>
            </form>
          )}
        </Card>
      </div>

      <ToastContainer toasts={toasts} position="top-right" />
    </div>
  );
}

