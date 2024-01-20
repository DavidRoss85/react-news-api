export const emptyNewsArray = [
    { src: "", caption: "author", title: "title", url: "", altText: "title" }
]

export const newsParams = {
    numArticles: 10,
    country: "us",
    criteria: "top-headlines"
}

export const LOCATIONLIST = ["all", "us", "ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in", "it", "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th", "tr", "tw", "ua", "ve", "za"]

export const userPref = {
    region: 'all',
    homepage: [
        {
            id: 0,
            endpoint: 'top-headlines',
            country: 'us',
            category: '',
            errorMode: false,
            keyword: '',
            numArticles: 10,
            tileType: 'slide'
        },
        {
            id: 1,
            endpoint: 'top-headlines',
            country: 'us',
            category: '',
            errorMode: false,
            keyword: '',
            numArticles: 6,
            tileType: 'pallette'
        },
        {
            id: 2,
            endpoint: 'top-headlines',
            country: 'us',
            category: '',
            errorMode: false,
            keyword: '',
            numArticles: 8,
            tileType: 'list'
        },
        {
            id: 3,
            endpoint: 'top-headlines',
            country: 'us',
            category: '',
            errorMode: false,
            keyword: '',
            numArticles: 6,
            tileType: 'topic'
        },
        {
            id: 4,
            endpoint: 'top-headlines',
            country: 'us',
            category: '',
            errorMode: false,
            keyword: '',
            numArticles: 12,
            tileType: 'pallette'
        },
    ]
}