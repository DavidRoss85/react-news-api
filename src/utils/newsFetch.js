import { SERVER_URL, ERROR_NEWS } from "../app/shared/DEFAULTS";

const LOCAL_URL = 'http://localhost:3001/'

export const fetchFromServer = async (searchRequest) => {

    // const searchURL = LOCAL_URL + 'worldNews'
    const searchURL= `${SERVER_URL}/news`
    try {
        const res = await fetch(
            searchURL,
            {
                method: 'POST',
                body: JSON.stringify(searchRequest),
                headers: {
                    'Content-Type':'application/json',
                },
            }
        );
        if (!res.ok) return ERROR_NEWS;
        const data = await res.json();
        return data;

    } catch (e) {
        console.log(`Error fetching top news.\n ${e}`)
        return ERROR_NEWS;
    }
}
