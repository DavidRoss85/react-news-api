const apiKey = process.env.REACT_APP_NEWS_API_KEY


const URL_BASE = "https://newsapi.org/v2/"
const URL_API_PRE = "&apiKey="

// const sampleURL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`

export const buildNewsRequest = (searchCriteria) => {

    //console.log('Search Criteria: ', searchCriteria);
    const { endpoint = 'top-headlines', country, category, pageSize, page, keyword } = searchCriteria;
    const { searchIn, dateFrom, dateTo, language, sortBy } = searchCriteria;

    // //top-headlines
    // const searchRequest = {
    //     // sources: 'bbc-news,the-verge',
    //     q: 'bitcoin',
    //     category: 'business',
    //     language: 'en',
    //     country: 'us'
    //   }


    if (endpoint === 'top-headlines') {
        const immCountry = country ? country === 'all' || country ==='default' ? '' : country : '';
        const immKeyword = immCountry ? (keyword ? keyword : '') : (keyword ? keyword : 'news');
        const immCategory = category || '';
        const immPageSize = pageSize || null;
        const immPage = page || null;

        const searchRequest ={
            q: immKeyword,
            category: immCategory,
            country: immCountry,
            page: immPage,
            pageSize: immPageSize
        }
        return searchRequest;
    } else if (endpoint === 'everything') {
        //everything? q= &searchIn=(title/description/content) &from=(2024-01-20) &to=(2024-01-20)
        //&language=(ar/de/en/es/fr/he/it/nl/no/pt/ru/sv/ud/zh)
        //&sortBy=(relevancy/popularity/publishedAt)
        //&pageSize= &page=

        //everything
        const searchRequest = {
            q: 'bitcoin',
            // sources: 'bbc-news,the-verge',
            domains: 'bbc.co.uk, techcrunch.com',
            from: '2017-12-01',
            to: '2017-12-12',
            language: 'en',
            sortBy: 'relevancy',
            page: 2
        }
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

        // console.log('The built url: ' + newsURL)

        return newsURL;

    }

}