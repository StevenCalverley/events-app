import { Box, Text } from "@chakra-ui/layout";
import { selectEventById } from "./eventsSlice";

import { useAppSelector } from "../../store/hooks";

const EventDetail = ({ eventId }: { eventId: string }) => {
  const event = useAppSelector((state) => selectEventById(state, eventId));

  return (
    <Box>
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
};

export default EventDetail;
