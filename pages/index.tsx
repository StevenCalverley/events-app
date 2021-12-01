import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { unsubscribe } from "../features/events/eventsSlice";
const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(unsubscribe());
  });
  return (
    <Box mx="auto" maxW="7xl" mt="8">
      Home Page
    </Box>
  );
};

export default Home;
