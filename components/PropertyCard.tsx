import Link from 'next/link';
import Image from 'next/image';
import { Wifi, Wind } from 'lucide-react';
import { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  return (
    <Link
      href={`/property/${property.id}`}
      className="group block bg-white dark:bg-[#0F0F11] rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all border border-black/5 dark:border-white/5 animate-enter-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
        <Image
          src={property.image_url}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold dark:text-white">
          {property.badge_text ?? 'Verified'}
        </div>
      </div>

      {/* Info */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg dark:text-white leading-tight">{property.title}</h3>
          <p className="text-sm text-zinc-500">{property.location}</p>
        </div>
        <div className="text-right flex-shrink-0 ml-2">
          <p className="font-bold dark:text-white">{property.price_text}</p>
          <p className="text-xs text-zinc-500">/ mo</p>
        </div>
      </div>

      {/* Soft Data Chips */}
      <div className="flex items-center gap-3 pt-3 border-t border-black/5 dark:border-white/5 text-xs text-zinc-500">
        <span className="flex items-center gap-1">
          <Wifi className="w-3 h-3" /> {property.wifi_speed}
        </span>
        <span className="flex items-center gap-1">
          <Wind className="w-3 h-3" /> {property.air_quality.split(' ')[0]}
        </span>
      </div>
    </Link>
  );
}
