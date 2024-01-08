import ArticleHeadline from "../../components/ArticleHeadline";
import { Col, Row } from "reactstrap";
import { emptyNewsArray } from "../../app/shared/DEFAULTS";
import { useEffect, useState } from "react";
import { Loading, Failed } from "../../components/ComponentStatuses";

import { getBreakingNews } from "../../app/selectors/newsSlice";
// import { getBreakingNews } from "../selectors/newsAPI";

const ArticlesList = ({ newsParams }) => {

    const [newsArray, setNewsArray] = useState(emptyNewsArray)
    const [isLoading, setLoading] = useState(true);
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
            console.log("ERROR loading news in Articles List component.", e)
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