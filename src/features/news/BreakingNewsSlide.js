import SlideShow from "../../components/SlideShow";
import { emptyNewsArray } from "../../app/shared/DEFAULTS";
import { useEffect, useState } from "react";
import { convertToSlideFormat } from "../../utils/convertToSlideFormat";
import { Failed, Loading } from "../../components/ComponentStatuses";

// import { getBreakingNews } from "../../app/selectors/newsSlice";
import { getBreakingNews } from "../../app/selectors/newsAPI"

const BreakingNewsSlide = ({ newsParams }) => {

    const [slideArray, setSlideArray] = useState(emptyNewsArray);
    const [isLoading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [success, setSuccess] = useState(false);

    async function fetchNews() {
        try {
            // if (isLoading) {
            const breakingNews = await getBreakingNews(newsParams);
            setSlideArray(convertToSlideFormat(breakingNews.articles).filter((article, idx) => idx < newsParams.numArticles));
            setLoading(false);
            setSuccess(true);
                
            // }
        } catch (e) {
            console.log("ERROR loading news in Breaking News Slide component.", e)
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
        <SlideShow
            items={slideArray}
            interval={2000}
            fade={true}
            slide={true}
            pause={"hover"}
            dark={false}
            showControls={true}
            ShowIndicator={true}
            showCaption={true}
            className={"carousel-ratio"}
        />
    )
}

export default BreakingNewsSlide;