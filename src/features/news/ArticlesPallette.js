import ArticleSquare from "../../components/ArticleSquare";
import newsImage from "../../app/img/genericNewsLogo16x9.png";
import { Col, Row } from "reactstrap";
import { emptyNewsArray } from "../../app/shared/DEFAULTS";
import { useEffect, useState } from "react";
import { Loading, Failed } from "../../components/ComponentStatuses";

import { getBreakingNews } from "../../app/selectors/newsSlice";
// import { getBreakingNews } from "../selectors/newsAPI";

const ArticlesPallette = (props) => {
    const {newsParams } = props;
    const { xs = "12", sm = xs, md = sm, lg = md, xl = lg } = props;

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

    //Show articles
    return (
        <Row className='mx-auto'>
            {newsArray.map((article, idx) => {
                article.urlToImage = (!article.urlToImage) ? newsImage : article.urlToImage;
                return (
                    <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl} className="py-1" key={idx}>
                        <ArticleSquare article={article} className={"text-truncate"} />
                    </Col>
                );
            })}
        </Row>
    );
};

export default ArticlesPallette;