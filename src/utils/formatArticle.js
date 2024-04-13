import newsImage1 from '../app/img/genericNewsLogo16x9.jpg';
import newsImage2 from '../app/img/genericNewsLogo2.jpg';
import newsImage3 from '../app/img/genericNewsLogo3.jpg';
import newsImage4 from '../app/img/genericNewsLogo4.jpg';
import newsImage5 from '../app/img/genericNewsLogo5.jpg';
import newsImage6 from '../app/img/genericNewsLogo6.jpg';

const imageArray = [newsImage1, newsImage2, newsImage3, newsImage4, newsImage5, newsImage6];

export const formatArticle = (article, imageNum) => {

    const rIndex = imageNum
        ? imageNum > imageArray.length ? 1 : imageNum - 1
        : Math.floor(Math.random() * imageArray.length)
    const immArticle = { ...article, urlToImage: (!article.urlToImage) ? imageArray[rIndex] : article.urlToImage }
    return immArticle;
}