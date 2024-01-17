import { Container, Row, Col } from "reactstrap";
import BreakingNewsSlide from "../features/news/BreakingNewsSlide";
import ArticlesPallette from "../features/news/ArticlesPallette";
import ArticlesList from "../features/news/ArticlesList";
import TopicSection from "../features/news/TopicSection";
import { newsParams } from "../app/shared/DEFAULTS";
import { useState, useEffect } from "react";

const HomePage = ({region}) => {

    
    const [newsParams, setNewsParams] = useState([
        {
            id: 0,
            region: 'all',
            criteria: 'top-headlines',
            numArticles: 6,
            tileType: 'slide'
        },
        {
            id: 1,
            region: 'all',
            criteria: 'top-headlines',
            numArticles: 6,
            tileType: 'pallette'
        }
    ]);

    useEffect(()=>{
        // setNewsParams({...newsParams, region: region});
        // console.log("Home page params: ", newsParams)
    },[region]);

    return (
        <Container fluid>
            <Row>
                <Col md="6" lg="5">
                    <Row>
                        <Col className="text-center">
                            <h3>Breaking News</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="slideHolder">
                            <BreakingNewsSlide newsParams={newsParams[0]} />
                        </Col>
                    </Row>
                </Col>
                <Col md="6" lg="4">
                    <Row>
                        <Col className="text-center">
                            <h3>Trending</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ArticlesPallette newsParams={newsParams[1]} numArticles={6} md="6" />
                        </Col>
                    </Row>
                </Col>
                <Col md="d-none" lg="3" className="d-none d-lg-inline-block">
                    <Row>
                        <Col className="text-center">
                            <h3>News</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ArticlesList newsParams={newsParams[1]} numArticles={9} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col md="6" lg="4">
                    <Row>
                        <Col className="text-center">
                            <h3>More News</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TopicSection newsParams={newsParams[1]} numArticles={10} />
                        </Col>
                    </Row>
                </Col>
                <Col md="6" lg="8">
                    <Row>
                        <Col className="text-center">
                            <h3>Even MORE</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ArticlesPallette newsParams={newsParams[1]} numArticles={36} md="3" />
                        </Col>
                    </Row>
                </Col>

            </Row>
        </Container>
    )
}

export default HomePage;