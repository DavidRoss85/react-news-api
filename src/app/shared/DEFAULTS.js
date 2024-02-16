export const emptyNewsArray = [
    { loaded: false, src: "", caption: "author", title: "title", url: "", altText: "title" }
]

// export const newsParams = {
//     numArticles: 10,
//     country: "us",
//     criteria: "top-headlines"
// }

export const CACHE_TTE = 3600000 //milliseconds

export const LOCATIONLIST = ["all", "us", "ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in", "it", "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th", "tr", "tw", "ua", "ve", "za"]

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
                numArticles: 10,
            },
            title: "Top-Stories",
            tileType: "slide",
            row: 1,
            sizing: {
                md: "6",
                lg: "5",
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
            numArticles: 6,
            title: "Entertainment",
            tileType: "pallette",
            row: 1,
            sizing: {
                md: "6",
                lg: "4",
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
                md: "d-none",
                lg: "3",
                className: "d-none d-lg-inline-block"
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
                lg: "4",
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
                lg: "8",
                className: ""
            },
            innerSizing: {
                className: ""
            },
            componentAttribute: {
                md: "3"
            }
        },{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
    ]
}


