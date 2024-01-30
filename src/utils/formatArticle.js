import newsImage1 from '../app/img/genericNewsLogo16x9.png'
import newsImage2 from '../app/img/genericNewsLogo2.png'
import newsImage3 from '../app/img/genericNewsLogo3.png'
import newsImage4 from '../app/img/genericNewsLogo4.png'
import newsImage5 from '../app/img/genericNewsLogo5.png'

const imageArray = [newsImage1, newsImage2, newsImage3, newsImage4, newsImage5]

export const formatArticle = (article) => {

    const rIndex = Math.floor(Math.random() * imageArray.length)
    const immArticle = { ...article, urlToImage: (!article.urlToImage) ? imageArray[rIndex] : article.urlToImage }
    return immArticle
}