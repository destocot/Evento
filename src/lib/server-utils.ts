import "server-only";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import prisma from "./db";

const getEvents = async (city: string, page = 1) => {
  const eventsQuery = prisma.eventoEvent.findMany({
    where: {
      city:
        city === "all"
          ? undefined
          : {
              equals: city,
              mode: "insensitive",
            },
    },
    orderBy: {
      date: "asc",
    },
    take: 6,
    skip: (page - 1) * 6,
  });

  const totalCountQuery = prisma.eventoEvent.count({
    where: {
      city:
        city === "all"
          ? undefined
          : {
              equals: city,
              mode: "insensitive",
            },
    },
  });

  const [events, totalCount] = await prisma.$transaction([
    eventsQuery,
    totalCountQuery,
  ]);

  return { events, totalCount };
};
export const getEventsCached = unstable_cache(getEvents);

const getEvent = async (slug: string) => {
  const event = await prisma.eventoEvent.findUnique({
    where: { slug },
  });

  if (!event) {
    return notFound();
  }

  return event;
};
export const getEventCached = unstable_cache(getEvent);
