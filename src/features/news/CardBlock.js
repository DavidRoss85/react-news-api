import ArticleCard from "../../components/news/ArticleCard";
import { Col, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { Failed, Loading } from "../../components/misc/ComponentStatuses";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";

import { formatArticle } from "../../utils/formatArticle";
import { fetchBreakingNews, getLoadingStatus } from "../../app/selectors/newsSlice";
import { getEmptyNewsArray, reloadNews } from "../../app/selectors/newsSlice";
import { getBreakingNews } from "../../app/selectors/newsSlice";

const CardBlock = (props) => {
    const { newsParams } = props;
    const { id = 0, numArticles } = newsParams;

    const [newsArray, setNewsArray] = useState(useSelector(getEmptyNewsArray));
    const [success, setSuccess] = useState(false);

    const isLoading = useSelector(getLoadingStatus(id));
    const newsFeed = useSelector(getBreakingNews(id));
    const searchCache = useSelector((state) => state.cache)
    const tileSetting = useSelector((state) => state.settings.data.current.homepage[id].search)
    const { status } = newsFeed;

    const dispatch = useDispatch();

    function displayNews() {
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
        if(searchCache.didInitialize){
            triggerReload();
        }
    }, [tileSetting,searchCache.didInitialize]);

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

    return (
        <div>
            {newsArray.map((article, idx) => {
                const immArticle = formatArticle(article, (idx % 5 + 1));
                return (
                    <Row key={idx} className={'mx-auto'}>
                        <Col>
                            <ArticleCard article={immArticle} />
                        </Col>
                    </Row>
                );
            })}
        </div>
    );
};

export default CardBlock;