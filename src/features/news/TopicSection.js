import ArticleHeadline from "../../components/news/ArticleHeadline";
import ArticleBigSquare from "../../components/news/ArticleBigSquare";
import newsImage from "../../app/img/genericNewsLogo16x9.png";
import { Col, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { Failed, Loading } from "../../components/misc/ComponentStatuses";
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

    const emptyNewsArray = useSelector(getEmptyNewsArray);
    const isLoading = useSelector(getLoadingStatus(id))
    const newsFeed = useSelector(getBreakingNews(id));
    const tileSetting = useSelector((state)=>state.settings.data.current.homepage[id].search)
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
        dispatch(fetchBreakingNews({...tileSetting, id: id }))
    }

    useEffect(() => {
        triggerReload();
    }, [tileSetting])

    useEffect(() => {
        if (newsFeed) {
            setNewsArray(newsFeed.articles.filter((article, idx) => {
                const immNumArticles = numArticles || 1
                return idx < immNumArticles
            }));
            displayNews();
        }
    }, [newsFeed]);



    if (isLoading) { return (<Loading />) }
    if (!success) { return (<Failed reset={triggerReload} />) }

    const immArticle = newsArray[0] ?
        { ...newsArray[0], urlToImage: (!newsArray[0].urlToImage) ? newsImage : newsArray[0].urlToImage }
        : emptyNewsArray;
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