import { ERROR_NEWS } from "../shared/TEST_NEWS"
import { buildNewsURL } from "../../utils/buildNewsUrl"

//Move this into a component...
import { checkCache } from "./cacheSlice";
const cacheResults = (searchCriteria, searchResults) =>{
    if(checkCache(searchCriteria)){}
}
//--------------------------------

const LOCAL_URL = 'http://localhost:3001/'
const testMode = true;

export const fetchFromServer = async (searchCriteria) => {

    let newsURL = buildNewsURL(searchCriteria);
    // console.log('The built url: ' + newsURL)

    if (testMode) newsURL = LOCAL_URL + (searchCriteria.errorMode ? 'errorNews' : 'worldNews')

    try {
        const res = await fetch(newsURL);
        if (!res.ok) return ERROR_NEWS;
        const data = await res.json();
        return data;

    } catch (e) {
        console.log(`Error fetching top news.\n ${e}`)
        return ERROR_NEWS;
    }
}

