import { type Event } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const isCanceled = event.isCanceled;
  const formattedStartDate = format(event.startDate, 'dd.M.yyyy');
  const formattedEndDate = format(event.endDate, 'dd.M.yyyy');
  const dateDisplay = event.startDate === event.endDate 
    ? formattedStartDate
    : `${formattedStartDate} – ${formattedEndDate}`;

  return (
    <div className="relative group overflow-hidden rounded-lg">
      <div 
        className="aspect-[4/3] relative bg-cover bg-center"
        style={{ 
          backgroundImage: event.imageUrl 
            ? `url(${event.imageUrl})` 
            : 'linear-gradient(to bottom right, #1f2937, #111827)'
        }}
      >
        <div className="absolute inset-0 bg-black/40">
          <div className="p-6 flex flex-col h-full">
            <div className="flex-1">
              <div className="flex gap-2 mb-2">
                <Badge variant="secondary">{event.type}</Badge>
                {event.eventCategory && (
                  <Badge variant="outline" className="text-white">{event.eventCategory}</Badge>
                )}
              </div>
              <div className="text-white/80 text-sm mb-2">{dateDisplay}</div>
              <h2 className="text-2xl font-bold text-white mb-2">{event.name}</h2>
              <div className="flex items-center text-white/80 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{event.city}</span>
              </div>
            </div>
            
            <div className="mt-auto">
              {isCanceled ? (
                <div className="text-xl font-bold text-red-500">ZRUŠENÉ</div>
              ) : (
                <Link href={`/events/${event.id}`}>
                  <Button className="w-full">
                    Zobraziť detaily
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 