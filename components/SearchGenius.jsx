import {
    Flex,
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    Progress,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import useGenius from "../hooks/useGenius";

// only query every 1s
const DEBOUNCE_INTERVAL = 1000;

function SearchGenius() {
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const { results, error, isLoading } = useGenius(query);

        if (response) {
            console.log("results", results);
            setResponse(results);
        }
    }, [query, useGenius]);

    const debounceSetQuery = debounce(
        (query) => setQuery(query),
        DEBOUNCE_INTERVAL
    );

    const handleKeyUp = (event) => {
        if (event.code == "Enter") {
            console.log("handleKeyUp Enter");
            console.log(event, query);
            setQuery(event.target.value);
            handleSearch(query);
        }
    };

    const handleClick = (event) => {
        console.log("handleSearch", event, query);
        setQuery(query);
    };

    const handleChange = (event) => {
        if (event.target.value === "") return;

        handleSearch(event.target.value);
    };

    const handleSearch = (query) => {
        if (query === "") return;
        debounceSetQuery(query);
        // setQuery(query);
        console.log("handleSearch", query);
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
                    onKeyUp={handleKeyUp}
                />
                <Button
                    boxShadow="sm"
                    colorScheme="purple"
                    mt={4}
                    onClick={handleClick}
                    type="submit"
                >
                    Search
                </Button>
                {/* {isLoading && <Progress size="xs" isIndeterminate />} */}
                <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
            {/* {response.length > 0 &&
                response.map((result) => {
                    return <div>{result.result.full_title}</div>;
                })} */}
        </Flex>
    );
}

export default SearchGenius;
