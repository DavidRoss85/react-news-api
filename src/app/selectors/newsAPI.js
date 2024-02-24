import { ERROR_NEWS } from "../shared/TEST_NEWS"

const apiKey = process.env.REACT_APP_NEWS_API_KEY
const URL_API_PRE = "&apiKey="
const LOCAL_URL = 'http://localhost:3001/'
const testMode = false;

export const fetchFromServer = async (newsURL) => {

    const testURL = LOCAL_URL + 'worldNews'

    try {
        const res = testMode ? await fetch(testURL) : await fetch(newsURL + `${URL_API_PRE}${apiKey}`);
        if (!res.ok) return ERROR_NEWS;
        const data = await res.json();
        return data;

    } catch (e) {
        console.log(`Error fetching top news.\n ${e}`)
        return ERROR_NEWS;
    }
}

