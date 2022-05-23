import { Box, SlideFade } from "@chakra-ui/react";
import ResultItem from "./ResultItem";

function ResultsList({ query, results }) {
    const hasResults = results.length > 0;
    if (!query) return null;

    if (!hasResults) {
        return (
            <Box
                bg="red.50"
                borderRadius="base"
                boxShadow="sm"
                color="gray.700"
                mt={4}
                p={4}
            >
                Nothing found for the current search. Try a different lyric,
                artist name, or song title.
            </Box>
        );
    }

    return (
        <SlideFade in={hasResults}>
            <Box bg="gray.50" borderRadius="base" boxShadow="sm" mt={4} p={4}>
                {results.map(({ result }) => {
                    return <ResultItem key={result.id} result={result} />;
                })}
            </Box>
        </SlideFade>
    );
}

export default ResultsList;
