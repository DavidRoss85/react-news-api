import ArticleSquare from "../../components/ArticleSquare";
import newsImage from "../../app/img/genericNewsLogo16x9.png";
import { Col, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { Failed, Loading } from "../../components/ComponentStatuses";
import { useSelector, useDispatch } from 'react-redux';

import { getEmptyNewsArray, reloadNews } from "../../app/selectors/newsSlice";
import { getCustomNews } from "../../app/selectors/newsSlice";

const ArticlesPallette = (props) => {
    const {newsParams } = props;
    const { xs = "12", sm = xs, md = sm, lg = md, xl = lg } = props;

    const [newsArray, setNewsArray] = useState(useSelector(getEmptyNewsArray))
    const [isLoading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    const newsFeed = useSelector(getCustomNews(10));
    const { status } = newsFeed; 
    const dispatch = useDispatch();

    const displayNews = () => {
        if(status === 'ok'){
            setLoading(false);
            setSuccess(true);
        } else if (status ==='loading'){
            setLoading(true);
            setSuccess(false);
        } else if (status === 'error'){
            console.log("ERROR loading news in Breaking News Slide component.")
            setLoading(false);
            setSuccess(false);
        }
    }

    const triggerReload = ()=>{
        dispatch(reloadNews("Breaking News"));
    }

    useEffect(()=>{
        setLoading(true);
        setNewsArray(newsFeed.articles.filter((article, idx) => idx < newsParams.numArticles));
        displayNews();
    },[newsFeed]);

    //Show loading wheel
    if (isLoading) { return (<Loading />) };
    if (!success) { return (<Failed reset={triggerReload} />) };

    //Show articles
    return (
        <Row className='mx-auto'>
            {newsArray.map((article, idx) => {
                const immArticle = {...article, urlToImage: (!article.urlToImage) ? newsImage : article.urlToImage}
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