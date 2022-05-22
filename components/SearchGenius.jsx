import {
    Flex,
    FormControl,
    FormErrorMessage,
    Input,
    Progress,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import { useEffect, useState } from "react";

import queryGenius from "../services/queryGenius";
import ResultsList from "./ResultsList";

const DEBOUNCE_INTERVAL = 800;

function SearchGenius() {
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        queryGenius(query)
            .then((response) => {
                if (response) {
                    setIsLoading(false);
                    setResults(response);
                }
            })
            .catch((error) => setError(error));
    }, [query]);

    const debounceSetQuery = debounce(
        (query) => setQuery(query),
        DEBOUNCE_INTERVAL
    );

    const handleChange = (event) => {
        // if (event.target.value === "") return;

        handleSearch(event.target.value);
    };

    const handleSearch = (query) => {
        if (query === "") {
            setQuery(query);
            return;
        }

        setIsLoading(true);

        debounceSetQuery(query);
    };

    return (
        <Flex
            bg="blackAlpha.50"
            borderRadius="base"
            color="purple.700"
            flexDirection="column"
            p={4}
            w="60%"
        >
            <FormControl isReadOnly={false}>
                <Input
                    boxShadow="sm"
                    placeholder="Enter lyrics, song, or artist to search..."
                    onChange={handleChange}
                />
                {isLoading && <Progress size="xs" isIndeterminate />}
                <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
            <ResultsList results={results} />
        </Flex>
    );
}

export default SearchGenius;
