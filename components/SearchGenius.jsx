import {
    Flex,
    FormControl,
    FormErrorMessage,
    Input,
    Progress,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import React, { useState } from "react";

import useGenius from "../hooks/useGenius";
import ResultsList from "./ResultsList";

const DEBOUNCE_INTERVAL = 2000;
const QUERY_THRESHOLD = 3;

function SearchGenius() {
    const [query, setQuery] = useState("");
    const { error, isLoading, results } = useGenius(query);

    const debounceSetQuery = debounce(
        (query) => setQuery(query),
        DEBOUNCE_INTERVAL
    );

    const handleChange = (event) => {
        handleSearch(event.target.value);
    };

    const handleSearch = (query) => {
        if (query === "") {
            setQuery(query);
            return;
        }

        if (query.length < QUERY_THRESHOLD) {
            return;
        }

        debounceSetQuery(query);
    };

    return (
        <Flex
            bg="blackAlpha.50"
            borderRadius="base"
            color="purple.700"
            data-testid="search-form-wrapper"
            flexDirection="column"
            p={4}
            w={["100%", "80%", "60%", "60%"]}
        >
            <FormControl
                data-testid="search-form"
                isInvalid={error !== null}
                isReadOnly={false}
            >
                <Input
                    boxShadow="sm"
                    data-testid="search-input"
                    placeholder="Enter lyrics, song, or artist to search..."
                    onChange={handleChange}
                />
                {isLoading && (
                    <Progress
                        data-testid="loading-indicator"
                        mt={4}
                        size="xs"
                        isIndeterminate
                    />
                )}
                <FormErrorMessage data-testid="error-indicator">
                    {error}
                </FormErrorMessage>
            </FormControl>
            {!isLoading && (
                <ResultsList
                    data-testid="results-list"
                    query={query}
                    results={results}
                />
            )}
        </Flex>
    );
}

export default SearchGenius;
