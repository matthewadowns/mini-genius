import {
    Flex,
    Image,
    Link,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
} from "@chakra-ui/react";

function ResultItem({ result }) {
    return (
        <Flex color="black" mt={4} wrap="wrap">
            <Stat>
                <StatLabel>
                    <Link href={result.primary_artist.url}>
                        {result.artist_names}
                    </Link>
                </StatLabel>
                <StatNumber>
                    <Link color="teal.500" href={result.url} isExternal={true}>
                        {result.title}
                    </Link>
                    {result.stats.hot && "🔥"}
                </StatNumber>
                <StatHelpText>
                    {result.release_date_for_display && (
                        <span>
                            Released on: {result.release_date_for_display}
                        </span>
                    )}
                </StatHelpText>
            </Stat>
            <Image
                alt={result.full_title}
                boxSize="100px"
                objectFit="cover"
                src={result.header_image_thumbnail_url}
            />
        </Flex>
    );
}

export default ResultItem;
