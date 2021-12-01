import { useEffect } from "react";
import { Box, Heading, SimpleGrid, Spinner, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { fetchEvents, deleteEvent } from "../../features/events/eventsSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

import EventDetail from "../../features/events/EventDetail";
import AddEvent from "../../features/events/AddEvent";

const Event = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const eventId = router.query.id as string;
  const eventStatus = useAppSelector((state) => state.events.status);

  const onDelete = () => {
    dispatch(deleteEvent(eventId));
    router.push("/events");
  };

  useEffect(() => {
    if (eventStatus === "idle") {
      dispatch(fetchEvents());
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
      <SimpleGrid mt={8} columns={2}>
        <Box>
          <EventDetail eventId={eventId} />
          <Button onClick={onDelete} mt={4}>
            Delete
          </Button>
        </Box>
        <Box>
          <Heading>Update Event</Heading>
          <AddEvent eventId={eventId} />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Event;
