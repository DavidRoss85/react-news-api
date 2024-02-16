import ArticleSquare from "../../components/news/ArticleSquare";
import { Col, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { Failed, Loading } from "../../components/misc/ComponentStatuses";
import { useSelector, useDispatch } from 'react-redux';

import { fetchBreakingNews, getLoadingStatus } from "../../app/selectors/newsSlice";
import { getEmptyNewsArray, reloadNews } from "../../app/selectors/newsSlice";
import { getBreakingNews } from "../../app/selectors/newsSlice";
import { formatArticle } from "../../utils/formatArticle";

const ArticlesPallette = (props) => {
    const { newsParams } = props;
    const { id = 0, numArticles } = newsParams;
    const { xs = "12", sm = xs, md = sm, lg = md, xl = lg } = props;

    const [newsArray, setNewsArray] = useState(useSelector(getEmptyNewsArray));
    const [success, setSuccess] = useState(false);

    const isLoading = useSelector(getLoadingStatus(id));
    const newsFeed = useSelector(getBreakingNews(id));
    const searchCache = useSelector((state) => state.news.cache)
    const tileSetting = useSelector((state) => state.settings.data.current.homepage[id].search)
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
        dispatch(fetchBreakingNews({ ...tileSetting, id: id, searchCache }))
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

    //Show loading wheel
    if (isLoading) { return (<Loading />) };
    if (!success) { return (<Failed reset={triggerReload} />) };

    //Show articles
    return (
        <Row className='mx-auto'>
            {newsArray.map((article, idx) => {
                //replace empty image with generic news icon
                const immArticle = formatArticle(article, (idx % 5 + 1))
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