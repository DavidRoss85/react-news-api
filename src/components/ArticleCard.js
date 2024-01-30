import { Row, Col, Card, CardImg, CardTitle, CardBody, CardHeader, CardText } from "reactstrap";

const ArticleCard = ({ article }) => {
    const { author, title, url, urlToImage, description } = article;
    return (
        <a href={url}>
            <Card>
                <Row className='align-items-center'>
                    <Col className='text-center'>
                        <CardImg width='100%' src={urlToImage} alt={title} />
                    </Col>
                    <Col className='text-center'>
                        <CardBody>
                            <CardTitle>
                                {title}
                            </CardTitle>
                        </CardBody>
                        <CardHeader>
                            {author}
                        </CardHeader>
                        <CardText>
                            {description}
                        </CardText>
                    </Col>
                </Row>
            </Card>
        </a>
    )
}

export default ArticleCard;