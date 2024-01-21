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

    let newsURL = buildNewsURL(searchCriteria);
    
    // console.log('The built url: ' + newsURL)
    if (testMode) newsURL = LOCAL_URL + (searchCriteria.errorMode ? 'errorNews' : 'breakingNews')
    // console.log('The sent URL: ', newsURL)
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

const buildNewsURL = (searchCriteria) => {
    const { endpoint = 'top-headlines', country, category, pageSize = '100', page = '1', keyword } = searchCriteria;
    const { searchIn, dateFrom, dateTo, language, sortBy } = searchCriteria;
    
    if (endpoint === 'top-headlines') {
        //top-headlines? country= & category= & pageSize= & page= & q=
        const immCountry = country ? country === 'all' ? '' : `country=${country}` : '';
        const immKeyword = immCountry? '&q=${keyword}' : (keyword ?  `q=${keyword}` : `q=all` );
        const immCategory = category ? `&category=${category}` : '';
        const immPageSize = pageSize ? `&pageSize=${pageSize}` : `&pageSize=100`;
        const immPage = page ? `&page=${page}` : `&page=1`;

        const newsURL =
            `${URL_BASE}${endpoint}?`
            + `${immCountry}${immKeyword}${immCategory}${immPageSize}`
            + `${immPage}`
            + `${URL_API_PRE}${apiKey}`;
        return newsURL;
    } else if (endpoint === 'everything') {
        //everything? q= &searchIn=(title/description/content) &from=(2024-01-20) &to=(2024-01-20)
        //&language=(ar/de/en/es/fr/he/it/nl/no/pt/ru/sv/ud/zh)
        //&sortBy=(relevancy/popularity/publishedAt)
        //&pageSize= &page=
        const immKeyword = keyword ? `q=${keyword}` : '';
        const immSearchIn = searchIn ? (immKeyword ? '&' : '') + `searchIn=${searchIn}` : '';
        const immFrom = dateFrom ? ((immKeyword || immSearchIn) ? '&' : '') + `from=${dateFrom}` : '';
        const immTo = dateTo ? ((immKeyword || immSearchIn || immFrom) ? '&' : '') + `to=${dateTo}` : '';
        const immLang = language ? ((immKeyword || immSearchIn || immFrom || immTo) ? '&' : '') + `language=${language}` : '';
        const immSort = sortBy ? ((immKeyword || immSearchIn || immFrom || immTo || immLang) ? '&' : '') + `sortBy${sortBy}` : '';
        const immPageSize = pageSize ? ((immKeyword || immSearchIn || immFrom || immTo || immLang || immSort) ? '&' : '') + `pageSize=${pageSize}` : `pageSize=100`;
        const immPage = page ? `&page=${page}` : `&page=1`;

        const newsURL =
            `${URL_BASE}${endpoint}?`
            + `${immKeyword}${immSearchIn}${immFrom}`
            + `${immTo}${immLang}${immSort}`
            + `${immPageSize}${immPage}`
            + `${URL_API_PRE}${apiKey}`;
        return newsURL;

    }

}


export { fetchFromServer }