'use client';

import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { Input } from '@/components/atoms/Input';
import React, { useState } from 'react';

export interface BookingFormData {
  date: string;
  time: string;
  location: string;
  guests: number;
  menuPreferences?: string;
  dietaryRestrictions?: string;
  specialRequests?: string;
}

export interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void;
  loading?: boolean;
  initialData?: Partial<BookingFormData>;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  onSubmit,
  loading = false,
  initialData,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    date: initialData?.date || '',
    time: initialData?.time || '',
    location: initialData?.location || '',
    guests: initialData?.guests || 2,
    menuPreferences: initialData?.menuPreferences || '',
    dietaryRestrictions: initialData?.dietaryRestrictions || '',
    specialRequests: initialData?.specialRequests || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (formData.guests < 1) newErrors.guests = 'At least 1 guest is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof BookingFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Book a Chef</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            error={errors.date}
            required
          />
          <Input
            label="Time"
            type="time"
            value={formData.time}
            onChange={(e) => handleChange('time', e.target.value)}
            error={errors.time}
            required
          />
        </div>

        <Input
          label="Location"
          placeholder="Enter your address"
          value={formData.location}
          onChange={(e) => handleChange('location', e.target.value)}
          error={errors.location}
          required
        />

        <Input
          label="Number of Guests"
          type="number"
          min="1"
          value={formData.guests}
          onChange={(e) => handleChange('guests', parseInt(e.target.value))}
          error={errors.guests}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Menu Preferences</label>
          <textarea
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Describe your preferred cuisine or dishes..."
            value={formData.menuPreferences}
            onChange={(e) => handleChange('menuPreferences', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dietary Restrictions
          </label>
          <textarea
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            placeholder="Allergies, vegetarian, vegan, etc..."
            value={formData.dietaryRestrictions}
            onChange={(e) => handleChange('dietaryRestrictions', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
          <textarea
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            placeholder="Any additional requests or notes..."
            value={formData.specialRequests}
            onChange={(e) => handleChange('specialRequests', e.target.value)}
          />
        </div>

        <Button type="submit" fullWidth isLoading={loading}>
          Request Booking
        </Button>
      </form>
    </Card>
  );
};
