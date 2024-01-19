import { ERROR_NEWS } from "../shared/TEST_NEWS"


const apiKey = process.env.REACT_APP_NEWS_API_KEY

const sampleURL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`

const URL_BASE = "https://newsapi.org/v2/"
const URL_COUNTRY_PRE = "?country="
const URL_TOP_HEADLINES = "top-headlines"
const URL_EVERYTHING = "everything"
const URL_API_PRE = "&apiKey="

const LOCAL_URL = 'http://localhost:3001/'
const testMode = true;


async function fetchFromServer(searchCriteria) {
    // const newsURL = `${URL_BASE}${URL_TOP_HEADLINES}${URL_COUNTRY_PRE}${region}${URL_API_PRE}${apiKey}`
    let newsURL = buildNewsURL(searchCriteria);
    
    if (testMode) newsURL = LOCAL_URL + (searchCriteria.errorMode ? 'errorNews' : 'breakingNews')
    console.log('The built url: ' + newsURL)
    

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

const buildNewsURL = (searchCriteria) =>{
    const { endpoint='top-headlines', country, category, pageSize = '100', page ='1', keyword } = searchCriteria;
    //top-headlines? country= & category= & pageSize= & page= & q=
    const immCountry = country ? `country=${country}` : '';
    const immCategory = category ? (immCountry ?  '&' : '') + `category=${category}` : '' ;
    const immPageSize = pageSize ? ((immCountry || immCategory) ?  '&' : '') + `pageSize=${pageSize}` : `pageSize=100`; 
    const immPage = page ? `&page=${page}` : `&page=1`; 
    const immKeyword = keyword ? `&keyword=${keyword}` : '';

    const newsURL =
        `${URL_BASE}${endpoint}?`
        + `${immCountry}${immCategory}${immPageSize}`
        + `${immPage}${immKeyword}`
        + `${URL_API_PRE}${apiKey}`
    return newsURL;
}

// async function getNews(searchCriteria = "?q=News") {
//     const newsURL = `${URL_BASE}${URL_EVERYTHING}${searchCriteria}${URL_API_PRE}${apiKey}`
//     try {
//         const response = await fetch(newsURL);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('There was an error!', error);
//     }
// }



 export { fetchFromServer }