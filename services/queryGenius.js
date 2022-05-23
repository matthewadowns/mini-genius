import axios from "axios";

const GENIUS_SEARCH_URL = "https://genius.p.rapidapi.com/search";
const RAPID_API_KEY = "aeba5ecb0cmsh63bd8d2cab240d8p11745bjsn7d438afe4288";
const RAPID_API_HOST = "genius.p.rapidapi.com";

async function queryGenius(query) {
    if (query === "") return [];

    const options = {
        method: "GET",
        url: GENIUS_SEARCH_URL,
        params: { q: query },
        headers: {
            "X-RapidAPI-Host": RAPID_API_HOST,
            "X-RapidAPI-Key": RAPID_API_KEY,
        },
    };

    const results = await axios
        .request(options)
        .then((res) => res.data.response.hits);

    return results;
}

export default queryGenius;
