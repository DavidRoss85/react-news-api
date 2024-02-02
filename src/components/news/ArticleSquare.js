import { Card, CardImg, CardTitle } from "reactstrap"
// import { Link } from 'react-router-dom';

const ArticleSquare = ({ article, className }) => {
    const { author, title, url, urlToImage } = article;
    return (
        <a href={url} >
            <Card className={className}>
                <div className="img-overlay">
                    <div className="overlay-text">Visit</div>
                    <CardTitle className="card-caption">{title}</CardTitle>
                    <CardTitle className="card-caption author">{author}</CardTitle>
                    <CardImg width="100%" src={urlToImage} alt={title} />

                </div>
            </Card>
        </a>
    )
}
export default ArticleSquare;