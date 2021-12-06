import type { NextPage } from "next";
import { Box, UnorderedList, ListItem, Text } from "@chakra-ui/react";
import { where } from "firebase/firestore";
import { IEvent } from "../types/firestore/Event";

import { useEvents } from "../hooks/useEvent";

function renderEvent(event: IEvent) {
  return (
    <Box key={event.id}>
      <Text fontSize="lg" fontWeight="semibold">
        {event?.title}
      </Text>
      <Text fontWeight="medium" fontSize="sm">
        {event?.description}
      </Text>
      <Text color="gray.500" fontSize="xs">
        {event?.date}
      </Text>
    </Box>
  );
}
const Test: NextPage = () => {
  const { isLoading, ...events } = useEvents(
    ["events", "active"],
    [where("isDeleted", "!=", true)]
  );
  if (isLoading) {
    return (
      <Box mx="auto" maxW="7xl" mt="8">
        Loading
      </Box>
    );
  }
  return (
    <Box mx="auto" maxW="7xl" mt="8">
      Events
      {events.data && events.data.map((event) => renderEvent(event))}
    </Box>
  );
};

export default Test;
