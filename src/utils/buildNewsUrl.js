const apiKey = process.env.REACT_APP_NEWS_API_KEY


const URL_BASE = "https://newsapi.org/v2/"
const URL_API_PRE = "&apiKey="

// const sampleURL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
// const URL_COUNTRY_PRE = "?country="
// const URL_TOP_HEADLINES = "top-headlines"
// const URL_EVERYTHING = "everything"

export const buildNewsURL = (searchCriteria) => {
    const { endpoint = 'top-headlines', country, category, pageSize, page, keyword } = searchCriteria;
    const { searchIn, dateFrom, dateTo, language, sortBy } = searchCriteria;

    if (endpoint === 'top-headlines') {
        //top-headlines? country= & category= & pageSize= & page= & q=
        const immCountry = country ? country === 'all' || country ==='default' ? '' : `country=${country}` : '';
        const immKeyword = immCountry ? (keyword ? `&q=${keyword}` : '') : (keyword ? `q=${keyword}` : 'q=news');
        const immCategory = category ? `&category=${category}` : '';
        const immPageSize = pageSize ? `&pageSize=${pageSize}` : '';
        const immPage = page ? `&page=${page}` : '';

        const newsURL =
            `${URL_BASE}${endpoint}?`
            + `${immCountry}${immKeyword}${immCategory}${immPageSize}`
            + `${immPage}`;
            //+ `${URL_API_PRE}${apiKey}`;
        return newsURL;
    } else if (endpoint === 'everything') {
        //everything? q= &searchIn=(title/description/content) &from=(2024-01-20) &to=(2024-01-20)
        //&language=(ar/de/en/es/fr/he/it/nl/no/pt/ru/sv/ud/zh)
        //&sortBy=(relevancy/popularity/publishedAt)
        //&pageSize= &page=
        const immKeyword = keyword ? `q=${keyword}` : '&q=news';
        const immSearchIn = searchIn ? `&searchIn=${searchIn}` : '';
        const immFrom = dateFrom ? `&from=${dateFrom}` : '';
        const immTo = dateTo ? `&to=${dateTo}` : '';
        const immLang = language ? `&language=${language}` : '';
        const immSort = sortBy ? `&sortBy${sortBy}` : '';
        const immPageSize = pageSize ? `&pageSize=${pageSize}` : '';
        const immPage = page ? `&page=${page}` : '';

        const newsURL =
            `${URL_BASE}${endpoint}?`
            + `${immKeyword}${immSearchIn}${immFrom}`
            + `${immTo}${immLang}${immSort}`
            + `${immPageSize}${immPage}`;
            //+ `${URL_API_PRE}${apiKey}`;
        return newsURL;

    }

}