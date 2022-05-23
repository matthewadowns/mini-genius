import { Box, SlideFade } from "@chakra-ui/react";
import React from "react";
import ResultItem from "./ResultItem";

const MAX_RESULTS = 10;

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
                data-testid="no-results-indicator"
                mt={4}
                p={4}
            >
                Nothing found for the current search. Try a different lyric,
                artist name, or song title.
            </Box>
        );
    }

    return (
        <SlideFade data-testid="results-wrapper" in={hasResults}>
            <Box mt={4} p={4}>
                <Box align="right">
                    {results.length} results{" "}
                    {results.length === MAX_RESULTS && "(max)"}
                </Box>
                {results.map(({ result }) => {
                    return <ResultItem key={result.id} result={result} />;
                })}
            </Box>
        </SlideFade>
    );
}

export default ResultsList;
