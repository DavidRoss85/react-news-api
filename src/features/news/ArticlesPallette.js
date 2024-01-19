import ArticleSquare from "../../components/ArticleSquare";
import newsImage from "../../app/img/genericNewsLogo16x9.png";
import { Col, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { Failed, Loading } from "../../components/ComponentStatuses";
import { useSelector, useDispatch } from 'react-redux';

import { fetchBreakingNews, getLoadingStatus } from "../../app/selectors/newsSlice";
import { getEmptyNewsArray, reloadNews } from "../../app/selectors/newsSlice";
import { getBreakingNews } from "../../app/selectors/newsSlice";

const ArticlesPallette = (props) => {
    const { newsParams } = props;
    const { id = 0, numArticles } = newsParams;
    const { xs = "12", sm = xs, md = sm, lg = md, xl = lg } = props;

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
        dispatch(reloadNews({ id: 0, feed: 'breakingNews' }));
        dispatch(fetchBreakingNews({ id: 0 }))
    }


    useEffect(() => {
        setNewsArray(newsFeed.articles.filter((article, idx) => idx < numArticles));
        displayNews();
    }, [newsFeed]);

    //Show loading wheel
    if (isLoading) { return (<Loading />) };
    if (!success) { return (<Failed reset={triggerReload} />) };

    //Show articles
    return (
        <Row className='mx-auto'>
            {newsArray.map((article, idx) => {
                const immArticle = { ...article, urlToImage: (!article.urlToImage) ? newsImage : article.urlToImage }
                return (
                    <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl} className="py-1" key={idx}>
                        <ArticleSquare article={immArticle} className={"text-truncate"} />
                    </Col>
                );
            })}
        </Row>
    );
};

export default ArticlesPallette;