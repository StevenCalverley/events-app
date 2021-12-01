import NextLink from "next/link";
import { Box, Heading, SimpleGrid, Link, Badge } from "@chakra-ui/react";

import {
  selectEventIds,
  selectEventTotals,
} from "../../features/events/eventsSlice";
import { useAppSelector } from "../../store/hooks";

import AddEvent from "../../features/events/AddEvent";
import EventDetail from "../../features/events/EventDetail";

const Events = () => {
  const totalEvents = useAppSelector(selectEventTotals);
  const orderedEventIds = useAppSelector(selectEventIds);

  return (
    <Box mx="auto" maxW="7xl" mt="8">
      <Heading>Events Page</Heading>
      <SimpleGrid mt={8} columns={2} gap={4}>
        <Box fontSize="sm">
          <Box display="flex" alignItems="flex-start">
            <Heading>Events</Heading>
            <Badge ml={3}>{totalEvents}</Badge>
          </Box>
          {orderedEventIds.map((eventId) => {
            return (
              <NextLink key={eventId} href={`/events/${eventId}`} passHref>
                <Link
                  _hover={{ textDecoration: "none" }}
                  _active={{ boxShadow: "none" }}
                >
                  <Box p={2} rounded="lg" _hover={{ bg: "gray.100" }}>
                    <EventDetail eventId={eventId as string} />
                  </Box>
                </Link>
              </NextLink>
            );
          })}
        </Box>
        <Box>
          <Heading>Add Event</Heading>
          <AddEvent />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Events;
