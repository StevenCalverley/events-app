import { useEffect } from "react";
import NextLink from "next/link";
import { Box, Heading, SimpleGrid, Spinner, Link } from "@chakra-ui/react";

import {
  fetchEvents,
  selectEventIds,
  subscribe,
  unsubscribe,
} from "../../features/events/eventsSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

import AddEvent from "../../features/events/AddEvent";
import EventDetail from "../../features/events/EventDetail";

const Events = () => {
  const dispatch = useAppDispatch();

  const orderedEventIds = useAppSelector(selectEventIds);
  const eventStatus = useAppSelector((state) => state.events.status);
  const error = useAppSelector((state) => state.events.error);

  useEffect(() => {
    dispatch(subscribe());
  }, [dispatch]);

  useEffect(() => {
    if (eventStatus === "idle") {
      // dispatch(fetchEvents());
    }
  }, [eventStatus, dispatch]);

  if (eventStatus === "loading") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
      >
        <Box position="absolute" minH="100vh" inset={0} bg="blackAlpha.700" />
        <Spinner color="white" />
      </Box>
    );
  }

  return (
    <Box mx="auto" maxW="7xl" mt="8">
      <Heading>Events Page</Heading>
      <SimpleGrid mt={8} columns={2} gap={4}>
        <Box fontSize="sm">
          <Heading>Events</Heading>
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
