import axios from "axios";

async function queryGenius(query) {
    if (query === "") return [];

    const options = {
        method: "GET",
        url: process.env.NEXT_PUBLIC_GENIUS_SEARCH_URL,
        params: { q: query },
        headers: {
            "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
        },
    };

    const results = await axios
        .request(options)
        .then((res) => res.data.response.hits);

    return results;
}

export default queryGenius;
