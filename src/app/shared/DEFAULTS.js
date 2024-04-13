export const emptyNewsArray = [
    { loaded: false, src: "", caption: "author", title: "title", url: "", altText: "title" }
]

export const ERROR_NEWS = {
    "status": "error",
    "totalResults": 0,
    "articles": [
        {
            "source": {
                "id": "",
                "name": ""
            },
            "author": "",
            "title": "",
            "description": "",
            "url": "",
            "urlToImage": "",
            "publishedAt": "",
            "content": ""
        }
    ]
};

export const EMPTY_NEWS = {
    "status": "loading",
    "totalResults": 0,
    "articles": [
        {
            "source": {
                "id": "",
                "name": ""
            },
            "author": "",
            "title": "",
            "description": "",
            "url": "",
            "urlToImage": "",
            "publishedAt": "",
            "content": ""
        }
    ]
};

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
    style: {
        border: '2px solid black'
    },
    innerSizing: {
        className: "slideHolder"
    },
    componentAttribute: {},
    search: {
        endpoint: "top-headlines",
        country: "all",
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
                country: "all",
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
                country: "all",
                endpoint: "top-headlines",
                errorMode: false,
                keyword: ""
            },
            numArticles: 6,
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
                country: "all",
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
                country: "all",
                endpoint: "top-headlines",
                errorMode: false,
                keyword: "Artificial Intelligence"
            },
            numArticles: 6,
            title: "AI News",
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
                country: "all",
                endpoint: "top-headlines",
                errorMode: false,
                keyword: ""
            },
            numArticles: 3,
            title: "Business",
            tileType: "card",
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


export const INITIAL_PREF = {
    session: {
        accessToken: null,
    },
    data: {
        username: '',
        displayname: '',
        avatar: '',
        preferences: {
            region: userPref.region,
            homepage: userPref.homepage
        }
    },
    userState: {
        loggedIn: false,
        userLoading: false,
        success: false
    },
    dataState: {
        isLoading: false,
        success: false,
        errMsg: ''
    },
    saveState: {
        isSaved: true,
        isSaving: false,
        success: false,
        status: ''
    },
}
