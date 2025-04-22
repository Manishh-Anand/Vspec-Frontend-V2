import { Cpu } from 'lucide-react';

const Logo = ({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    default: 'h-8 w-8',
    large: 'h-10 w-10'
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-600 rounded-lg opacity-70 animate-pulse-slow"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Cpu className="text-white h-5 w-5" />
      </div>
    </div>
  );
};

export default Logo;