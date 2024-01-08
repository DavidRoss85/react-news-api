//import NEWS_API_KEY from "../../.env"
//copied over from old app

const apiKey = process.env.REACT_APP_NEWS_API_KEY

const sampleURL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`

const URL_BASE = "https://newsapi.org/v2/"
const URL_COUNTRY_PRE = "?country="
const URL_TOP_HEADLINES = "top-headlines"
const URL_EVERYTHING = "everything"
const URL_API_PRE = "&apiKey="


async function getNews(searchCriteria = "?q=News") {
    const newsURL = `${URL_BASE}${URL_EVERYTHING}${searchCriteria}${URL_API_PRE}${apiKey}`
    try {
        const response = await fetch(newsURL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was an error!', error);
    }
}

async function getBreakingNews({ region = "us" }) {
    const newsURL = `${URL_BASE}${URL_TOP_HEADLINES}${URL_COUNTRY_PRE}${region}${URL_API_PRE}${apiKey}`
    try {
        const res = await fetch(newsURL);
        const data = await res.json();
        if(data.status==="error") throw `Error: ${data.code}. ${data.message}` 
        return data;
    } catch (e) {
        console.log(`Error fetching top news for ${region}.\n ${e}`)
    }
}

export { getBreakingNews }