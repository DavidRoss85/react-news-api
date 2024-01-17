import ArticleHeadline from "../../components/ArticleHeadline";
import { Col, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { Failed, Loading } from "../../components/ComponentStatuses";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";

import { getEmptyNewsArray, reloadNews } from "../../app/selectors/newsSlice";
import { getCustomNews } from "../../app/selectors/newsSlice";

const ArticlesList = (props) => {
    const { newsParams } = props;
    const { id =0, numArticles} = newsParams;
    const { xs = "12", sm = xs, md = sm, lg = md, xl = lg } = props;

    const [newsArray, setNewsArray] = useState(useSelector(getEmptyNewsArray))
    const [isLoading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    const newsFeed = useSelector(getCustomNews(id));
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
        setNewsArray(newsFeed.articles.filter((article, idx) => idx < numArticles));
        displayNews();
    },[newsFeed]);

    //Show loading wheel
    if (isLoading) { return (<Loading />) };
    if (!success) { return (<Failed reset={triggerReload} />) };

    return (
        <div>
            {newsArray.map((article, idx) => {
                return (
                    <Row className="mx-auto" key={idx}>
                        <Col md="12" className="">
                            <ArticleHeadline article={article} className={"text-truncate border-light"} />
                        </Col>
                    </Row>
                );
            })}
        </div>
    );
};

export default ArticlesList;