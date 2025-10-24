import React from 'react';
import { Button } from '@/components/atoms/Button';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface HeroProps {
  title: string;
  subtitle: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  showSecondaryButton?: boolean;
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  primaryButtonText = 'Explore Chefs',
  primaryButtonLink = '/explore',
  secondaryButtonText = 'Get Started',
  secondaryButtonLink = '/register',
  showSecondaryButton = true,
  className,
}) => {
  return (
    <section
      className={cn('bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20', className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">{subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={primaryButtonLink}>
              <Button size="lg" variant="secondary">
                <Search className="mr-2" size={20} />
                {primaryButtonText}
              </Button>
            </Link>
            {showSecondaryButton && (
              <Link href={secondaryButtonLink}>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                >
                  {secondaryButtonText}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

