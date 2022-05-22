import useSWR from "swr";

const GENIUS_SEARCH_URL = "https://genius.p.rapidapi.com/search";
const RAPID_API_KEY = "aeba5ecb0cmsh63bd8d2cab240d8p11745bjsn7d438afe4288";
const RAPID_API_HOST = "genius.p.rapidapi.com";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useGenius(query) {
    const options = {
        method: "GET",
        params: { q: "Kendrick Lamar" },
        headers: {
            "X-RapidAPI-Host": RAPID_API_HOST,
            "X-RapidAPI-Key": RAPID_API_KEY,
        },
    };

    const { data, error } = useSWR(GENIUS_SEARCH_URL, options);

    return {
        results: data,
        isLoading: !error && !data,
        isError: error,
    };
}

export default useGenius;
