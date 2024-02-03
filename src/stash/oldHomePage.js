import { Container, Row, Col } from "reactstrap";
import BreakingNewsSlide from "../features/news/BreakingNewsSlide";
import ArticlesPallette from "../features/news/ArticlesPallette";
import ArticlesList from "../features/news/ArticlesList";
import TopicSection from "../features/news/TopicSection";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserPreferences } from "../app/selectors/userSlice";
import { getAppSettings } from "../app/selectors/settingsSlice";

const HomePage = () => {
    //Make this pure later
    const appSettings = useSelector(getAppSettings)
    const newsParams = appSettings.data.current.homepage;
    console.log ('These are the App settings: ', appSettings)
    useEffect(()=>{

    },[]);

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
                            <ArticlesPallette newsParams={newsParams[1]} md="6" />
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
                            <ArticlesList newsParams={newsParams[2]} />
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
                            <TopicSection newsParams={newsParams[3]} />
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
                            <ArticlesPallette newsParams={newsParams[4]} md="3" />
                        </Col>
                    </Row>
                </Col>

            </Row>
        </Container>
    );

    return (
        <Container fluid>
            {newsParams.map((newsTile)=>{
                return (
                    <Col {...newsTile.sizing}></Col>
                )
            })}
        </Container>
    )
}

export default HomePage;