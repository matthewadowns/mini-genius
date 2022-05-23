import { useEffect, useState } from "react";
import queryGenius from "../services/queryGenius";

function useGenius(query) {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);

        queryGenius(query)
            .then((response) => {
                if (response) {
                    setIsLoading(false);
                    setResults(response);
                }
            })
            .catch((error) => setError(error));
    }, [query]);

    return { error, isLoading, results };
}

export default useGenius;
