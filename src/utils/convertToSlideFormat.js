import newsImage from "../app/img/genericNewsLogo16x9.jpg";

export const convertToSlideFormat = (articles = []) => {
    return articles.map((article) => {
        let { author, title, url, urlToImage } = article;
        urlToImage = (!urlToImage) ? newsImage : urlToImage;
        return { src: urlToImage, caption: author, title: title, url: url, altText: title }
    })
}