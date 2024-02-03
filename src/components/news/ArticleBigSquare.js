import { Card, CardImg, CardTitle, CardBody } from "reactstrap"
// import { Link } from 'react-router-dom';

const ArticleBigSquare = ({ article, className }) => {
    const { title, url, urlToImage } = article;
    return (
        <Card className={className}>
            <a href={url} >
                <div className="img-overlay">
                    <div className="overlay-text">Visit</div>
                    <CardImg width="100%" src={urlToImage} alt={title} />
                </div>
            </a>
            <CardBody>
                <a href={url} >
                    <CardTitle><span style={{ fontWeight: 'bold' }}>{title}</span></CardTitle>
                </a>
            </CardBody>
        </Card>
    )
}
export default ArticleBigSquare;