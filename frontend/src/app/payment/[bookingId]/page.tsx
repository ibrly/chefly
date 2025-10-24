'use client';

import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { Input } from '@/components/atoms/Input';
import { Spinner } from '@/components/atoms/Spinner';
import { useToast } from '@/hooks/useToast';
import { getBookingById } from '@/services/bookings';
import { processPayment } from '@/services/payment';
import { format } from 'date-fns';
import { Calendar, Check, CreditCard, Lock, MapPin, User } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const { success, error: showError } = useToast();
  const bookingId = params.bookingId as string;

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  useEffect(() => {
    loadBooking();
  }, [bookingId]);

  const loadBooking = async () => {
    try {
      const data = await getBookingById(bookingId);
      setBooking(data);
    } catch (err) {
      showError('Failed to load booking details');
      router.push('/my-bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      showError('Please fill in all payment details');
      return;
    }

    setProcessing(true);

    try {
      await processPayment({
        bookingId,
        amount: booking.totalPrice,
        currency: 'EGP',
        paymentMethod: {
          type: 'card',
          cardNumber: cardNumber.replace(/\s/g, ''),
          expiryDate,
          cvv,
          cardholderName,
        },
      });

      success('Payment successful!');
      router.push(`/my-bookings`);
    } catch (err: any) {
      showError(err.message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const groups = numbers.match(/.{1,4}/g);
    return groups ? groups.join(' ') : numbers;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setExpiryDate(value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!booking) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Complete Payment</h1>
        <p className="text-gray-600">Secure payment for your booking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Secure payment powered by Paymob</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  label="Card Number"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  leftIcon={<CreditCard className="w-5 h-5" />}
                  required
                />
              </div>

              <div>
                <Input
                  label="Cardholder Name"
                  type="text"
                  placeholder="John Doe"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={handleExpiryChange}
                  required
                />
                <Input
                  label="CVV"
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={handleCvvChange}
                  required
                />
              </div>

              <div className="pt-4 border-t">
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  disabled={processing}
                  isLoading={processing}
                >
                  {processing ? 'Processing...' : `Pay EGP ${booking.totalPrice}`}
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </form>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-4">
            <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{booking.chef?.name}</p>
                  <p className="text-sm text-gray-600">{booking.chef?.specialty}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(booking.date), 'PPP')}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{booking.location}</span>
              </div>

              <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Number of guests</span>
                  <span className="font-medium">{booking.numberOfGuests}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price per guest</span>
                  <span className="font-medium">EGP {booking.chef?.pricePerPerson || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service fee</span>
                  <span className="font-medium">EGP 0</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-2xl text-blue-600">
                    EGP {booking.totalPrice}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <Badge variant="success" className="w-full justify-center py-2">
                  <Check className="w-4 h-4 mr-2" />
                  Free cancellation until 24h before
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

