import {
    Flex,
    Image,
    Link,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
} from "@chakra-ui/react";
import React from "react";

function ResultItem({ result }) {
    return (
        <Flex
            bg="purple.100"
            borderRadius="base"
            color="black"
            data-testid="result-item-wrapper"
            mt={4}
            p={4}
            wrap="wrap"
        >
            <Stat>
                <StatLabel>
                    <Link
                        href={result.primary_artist.url}
                        title="View artist page on Genius"
                    >
                        {result.artist_names}
                    </Link>
                </StatLabel>
                <StatNumber>
                    <Link
                        color="teal.500"
                        href={result.url}
                        isExternal={true}
                        title="Full lyrics on Genius"
                    >
                        {result.title}
                    </Link>
                    {result.stats.hot && "🔥"}
                </StatNumber>
                <StatHelpText>
                    {result.release_date_for_display && (
                        <em>Released on: {result.release_date_for_display}</em>
                    )}
                </StatHelpText>
            </Stat>
            <Image
                alt={result.full_title}
                boxSize="100px"
                objectFit="cover"
                src={result.header_image_thumbnail_url}
                title={`Album thumbnail for ${result.full_title}`}
            />
        </Flex>
    );
}

export default ResultItem;
