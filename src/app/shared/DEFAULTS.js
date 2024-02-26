export const emptyNewsArray = [
    { loaded: false, src: "", caption: "author", title: "title", url: "", altText: "title" }
]

export const EMPTY_CACHE = {
    history: ['ReservedSpot'],
    data: [
        {
            criteria: 'Empty',
            results: {},
            timeStamp: '',
        }
    ],
    isLoading: true,
    errMsg: ''
}

export const defaultPageColumn = {
    id: 0,
    title: "News Window",
    tileType: "slide",
    row: 1,
    numArticles: 6,
    sizing: {
        md: "1",
        className: ""
    },
    style:{
        border:'2px solid black'
    },
    innerSizing: {
        className: "slideHolder"
    },
    componentAttribute: {},
    search: {
        endpoint: "top-headlines",
        country: "default",
        category: "",
        keyword: "",
        fromDate: "",
        toDate: "",
        language: "",
        sortBy: "",
        sources: "",
        errorMode: false
},
}
// export const newsParams = {
//     numArticles: 10,
//     country: "us",
//     criteria: "top-headlines"
// }

const ONE_YEAR = 31536000000 //milliseconds
const ONE_MONTH = 2592000000 //milliseconds
const ONE_DAY = 86400000 //millisecond
const ONE_HOUR = 3600000 //milliseconds

export const CACHE_TTL = ONE_YEAR * 5 //5 days

export const LOCATIONLIST = ["all", "us", "ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in", "it", "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th", "tr", "tw", "ua", "ve", "za"];
export const COMPONENT_TYPES = ["slide", "pallette", "list", "topic"];
export const ENDPOINTS = ["top-headlines", "everything"];
export const CATEGORIES = ["", "business", "entertainment", "general", "health", "science", "sports", "technology",];
export const LANGUAGES = ["", "ar", "de", "en", "es", "fr", "he", "it", "nl", "no", "pt", "ru", "sv", "ud", "zh",];
export const SORT_BY = ["", "relevancy", "popularity", "publishedAt",];
export const userPref = {
    region: 'all',
    homepage: [
        {
            id: 0,
            search: {
                category: "",
                country: "default",
                endpoint: "top-headlines",
                errorMode: false,
                keyword: "",
            },
            numArticles: 10,
            title: "Top-Stories",
            tileType: "slide",
            row: 1,
            sizing: {
                md: "5",
                className: ""
            },
            innerSizing: {
                className: "slideHolder"
            },
            componentAttribute: {}
        },
        {
            id: 1,
            search: {
                category: "entertainment",
                country: "default",
                endpoint: "top-headlines",
                errorMode: false,
                keyword: ""
            },
            numArticles: 10,
            title: "Entertainment",
            tileType: "pallette",
            row: 1,
            sizing: {
                md: "4",
                className: ""
            },
            innerSizing: {
                className: ""
            },
            componentAttribute: {
                md: "6"
            }
        },
        {
            id: 2,
            search: {
                category: "",
                country: "default",
                endpoint: "top-headlines",
                errorMode: false,
                keyword: ""
            },
            numArticles: 8,
            title: "News",
            tileType: "list",
            row: 1,
            sizing: {
                md: "3",
                className: ""
            },
            innerSizing: {
                className: ""
            },
            componentAttribute: {}
        },
        {
            id: 3,
            search: {
                category: "",
                country: "default",
                endpoint: "top-headlines",
                errorMode: false,
                keyword: "music"
            },
            numArticles: 6,
            title: "Music News",
            tileType: "topic",
            row: 2,
            sizing: {
                md: "6",
                className: ""
            },
            innerSizing: {
                className: ""
            },
            componentAttribute: {}
        },
        {
            id: 4,
            search: {
                category: "business",
                country: "default",
                endpoint: "top-headlines",
                errorMode: false,
                keyword: ""
            },
            numArticles: 12,
            title: "Business",
            tileType: "pallette",
            row: 2,
            sizing: {
                md: "6",
                className: ""
            },
            innerSizing: {
                className: ""
            },
            componentAttribute: {
                md: "3"
            }
        }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
    ]
}


