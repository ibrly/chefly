import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export interface FooterProps {
  companyName?: string;
  year?: number;
  showSocialLinks?: boolean;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  companyName = 'Chefly',
  year = new Date().getFullYear(),
  showSocialLinks = true,
  className,
}) => {
  return (
    <footer className={cn('bg-gray-900 text-white py-12', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">{companyName}</h3>
            <p className="text-gray-400 text-sm">
              Connecting talented chefs with food lovers for unforgettable culinary experiences.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">For Clients</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/explore" className="text-gray-400 hover:text-white transition-colors">
                  Find a Chef
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="text-gray-400 hover:text-white transition-colors">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-gray-400 hover:text-white transition-colors">
                  Favorites
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">For Chefs</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/register" className="text-gray-400 hover:text-white transition-colors">
                  Become a Chef
                </Link>
              </li>
              <li>
                <Link href="/chef/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {showSocialLinks && (
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        )}

        <div className="text-center text-gray-400 text-sm">
          <p>© {year} {companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

