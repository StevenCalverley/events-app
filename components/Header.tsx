import NextLink from "next/link";

import { Box, Heading, Link } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box as="header" p="4" bg="blue.700">
      <Box
        mx="auto"
        maxW="7xl"
        display="flex"
        color="white"
        alignItems="baseline"
      >
        <NextLink href="/" passHref>
          <Link>
            <Heading as="h1">Events App</Heading>
          </Link>
        </NextLink>
        <Box as="nav" ml="8" display="flex">
          <NextLink href="/events">Events</NextLink>
          <NextLink href="/test">Test</NextLink>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
