import ArticleHeadline from "../../components/ArticleHeadline";
import ArticleBigSquare from "../../components/ArticleBigSquare";
import newsImage from "../../app/img/genericNewsLogo16x9.png";
import { Col, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { Failed, Loading } from "../../components/ComponentStatuses";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";

import { fetchBreakingNews, getLoadingStatus } from "../../app/selectors/newsSlice";
import { getEmptyNewsArray, reloadNews } from "../../app/selectors/newsSlice";
import { getBreakingNews } from "../../app/selectors/newsSlice";

const TopicSection = (props) => {
    const { newsParams } = props;
    const { id = 0, numArticles } = newsParams;

    const [newsArray, setNewsArray] = useState(useSelector(getEmptyNewsArray));
    const [success, setSuccess] = useState(false);

    const isLoading = useSelector(getLoadingStatus(id))
    const newsFeed = useSelector(getBreakingNews(id));
    const { status } = newsFeed;

    const dispatch = useDispatch();

    const displayNews = () => {
        if (status === 'ok') {
            setSuccess(true);
        } else if (status === 'error') {
            console.log("ERROR loading news in News Slide component.")
            setSuccess(false);
        }
    }

    const triggerReload = () => {
        dispatch(reloadNews({ id: id, feed: 'breakingNews' }));
        dispatch(fetchBreakingNews({ id: id }))
    }


    useEffect(() => {
        setNewsArray(newsFeed.articles.filter((article, idx) => idx < numArticles));
        displayNews();
    }, [newsFeed]);



    if (isLoading) { return (<Loading />) }
    if (!success) { return (<Failed reset={triggerReload} />) }

    const immArticle = { ...newsArray[0], urlToImage: (!newsArray[0].urlToImage) ? newsImage : newsArray[0].urlToImage }
    return (
        <div>
            <Row className="mx-auto">
                <Col md="12" className="">
                    <ArticleBigSquare article={immArticle} className={"text-truncate border-light"} />
                </Col>
            </Row>
            {newsArray.map((article, idx) => {
                return (
                    <Row className="mx-auto" key={idx}>
                        <Col md="12" className="">
                            <ArticleHeadline article={article} className={"text-truncate border-light"} />
                        </Col>
                    </Row>
                );
            }).filter((article, idx) => idx > 0)}
        </div>
    );
};

export default TopicSection;