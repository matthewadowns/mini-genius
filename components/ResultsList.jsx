import { Box, SlideFade } from "@chakra-ui/react";

function ResultsList({ results }) {
    return (
        <SlideFade in={results.length > 0}>
            <Box
                bg="purple.100"
                borderRadius="base"
                boxShadow="sm"
                mt={4}
                p={4}
            >
                {results.map(({ result }) => {
                    console.log("each result", result);
                    return <div key={result.id}>{result.full_title}</div>;
                })}
            </Box>
        </SlideFade>
    );
}

export default ResultsList;
