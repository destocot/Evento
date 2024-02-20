import EventsList from "@/components/events-list";
import { getEventsCached } from "@/lib/server-utils";

type EventsListFetcherProps = {
  city: string;
  page?: number;
};

export default async function EventsListFetcher({
  city,
  page = 1,
}: EventsListFetcherProps) {
  const { events, totalCount } = await getEventsCached(city, page);
  const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : "";
  const nextPath =
    totalCount > 6 * page ? `/events/${city}?page=${page + 1}` : "";

  return (
    <EventsList
      events={events}
      previousPath={previousPath}
      nextPath={nextPath}
    />
  );
}
