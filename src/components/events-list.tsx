import { EventoEvent } from "@prisma/client";
import EventCard from "./event-card";
import PaginationControls from "./pagination-controls";

type EventsListProps = {
  events: EventoEvent[];
  previousPath: string;
  nextPath: string;
};

export default async function EventsList({
  events,
  previousPath,
  nextPath,
}: EventsListProps) {
  return (
    <section className="flex max-w-[1100px] flex-wrap justify-center gap-10 px-[20px]">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
      <PaginationControls previousPath={previousPath} nextPath={nextPath} />
    </section>
  );
}
