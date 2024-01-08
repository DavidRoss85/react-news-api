import ArticleHeadline from "../../components/ArticleHeadline";
import ArticleBigSquare from "../../components/ArticleBigSquare";
import { Col, Row } from "reactstrap";
import { emptyNewsArray } from "../../app/shared/DEFAULTS";
import { useEffect, useState } from "react";
import { Failed, Loading } from "../../components/ComponentStatuses";


import { getBreakingNews } from "../../app/selectors/newsSlice";
// import { getBreakingNews } from "../selectors/newsAPI";

const TopicSection = ({ newsParams }) => {

    const [newsArray, setNewsArray] = useState(emptyNewsArray)
    const [isLoading, setLoading] = useState(true)
    const [reload, setReload] = useState(false);
    const [success, setSuccess] = useState(false);

    async function fetchNews() {
        try {
            // if (isLoading) {
            const breakingNews = await getBreakingNews(newsParams);
            setNewsArray(breakingNews.articles.filter((article, idx) => idx < newsParams.numArticles));
            setLoading(false);
            setSuccess(true);
            // }
        } catch (e) {
            console.log("ERROR loading news in Topic Seciton component.", e)
            setLoading(false);
            setSuccess(false);
        }
    }

    function triggerReload(){
        setReload(!reload);
    }
    useEffect(()=>{
        setLoading(true);
        fetchNews();
    },[newsParams, reload]);


    if (isLoading) { return (<Loading />) }
    if (!success) { return (<Failed reset={triggerReload} />) }

    return (
        <div>
            <Row className="mx-auto">
                <Col md="12" className="">
                    <ArticleBigSquare article={newsArray[0]} className={"text-truncate border-light"} />
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