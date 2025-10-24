import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import React from 'react';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search...',
  className,
}) => {
  const handleClear = () => {
    onChange('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  return (
    <div className={cn('flex gap-2', className)}>
      <div className="flex-1">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          leftIcon={<Search size={20} />}
          rightIcon={
            value && (
              <button onClick={handleClear} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            )
          }
        />
      </div>
      {onSearch && (
        <Button onClick={onSearch} variant="primary">
          Search
        </Button>
      )}
    </div>
  );
};
