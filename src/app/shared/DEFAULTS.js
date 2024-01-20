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
            tileType: 'slide',
            title: 'Top-Stories',
            row: 1,
            sizing: {
                md:'6', lg:'5', className:''
            },
            innerSizing:{
                className: 'slideHolder'
            },
            componentAttribute: {}
        },
        {
            id: 1,
            endpoint: 'top-headlines',
            country: 'us',
            category: '',
            errorMode: false,
            keyword: '',
            numArticles: 6,
            tileType: 'pallette',
            title: 'Trending',
            row: 1,
            sizing: {
                md:'6', lg:'4', className:''
            },
            innerSizing:{
                className: ''
            },
            componentAttribute: { md:'6'}
        },
        {
            id: 2,
            endpoint: 'top-headlines',
            country: 'us',
            category: '',
            errorMode: false,
            keyword: '',
            numArticles: 8,
            tileType: 'list',
            title: 'News',
            row: 1,
            sizing: {
                md:'d-none', lg:'3', className:'d-none d-lg-inline-block'
            },
            innerSizing:{
                className: ''
            },
            componentAttribute: {}
        },
        {
            id: 3,
            endpoint: 'top-headlines',
            country: 'us',
            category: '',
            errorMode: false,
            keyword: '',
            numArticles: 6,
            tileType: 'topic',
            title: 'More News',
            row: 2,
            sizing: {
                md:'6', lg:'4', className:''
            },
            innerSizing:{
                className: ''
            },
            componentAttribute: {}
        },
        {
            id: 4,
            endpoint: 'top-headlines',
            country: 'us',
            category: '',
            errorMode: false,
            keyword: '',
            numArticles: 12,
            tileType: 'pallette',
            title: 'Even MORE',
            row: 2,
            sizing: {
                md:'6', lg:'8', className:''
            },
            innerSizing:{
                className: ''
            },
            componentAttribute: { md:'3'}
        },
    ]
}