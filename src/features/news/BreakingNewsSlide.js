import SlideShow from "../../components/SlideShow";
import { emptyNewsArray } from "../../app/shared/DEFAULTS";
import { useEffect, useState } from "react";
import { convertToSlideFormat } from "../../utils/convertToSlideFormat";
import { Failed, Loading } from "../../components/ComponentStatuses";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";

import { getEmptyNewsArray, reloadNews } from "../../app/selectors/newsSlice";
import { getBreakingNews } from "../../app/selectors/newsSlice";

const BreakingNewsSlide = ({ newsParams }) => {

    const [slideArray, setSlideArray] = useState(useSelector(getEmptyNewsArray));
    const [isLoading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const newsFeed = useSelector(getBreakingNews(10));
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
        setSlideArray(
            convertToSlideFormat(newsFeed.articles)
            .filter(
                (article, idx) => idx < newsParams.numArticles
            )
        );
        displayNews();
    },[newsFeed]);

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