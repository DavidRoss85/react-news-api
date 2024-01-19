import SlideShow from "../../components/SlideShow";
import { emptyNewsArray } from "../../app/shared/DEFAULTS";
import { useEffect, useState } from "react";
import { convertToSlideFormat } from "../../utils/convertToSlideFormat";
import { Failed, Loading } from "../../components/ComponentStatuses";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { fetchBreakingNews } from "../../app/selectors/newsSlice";

import { getEmptyNewsArray, reloadNews } from "../../app/selectors/newsSlice";
import { getBreakingNews } from "../../app/selectors/newsSlice";

const BreakingNewsSlide = (props) => {

    const { newsParams } = props;
    const { id = 0, numArticles } = newsParams;
    const { xs = "12", sm = xs, md = sm, lg = md, xl = lg } = props;

    const [slideArray, setSlideArray] = useState(useSelector(getEmptyNewsArray));
    const [success, setSuccess] = useState(false);

    const isLoading = useSelector((state) => state.news.breakingNews[id].isLoading)
    const newsFeed = useSelector(getBreakingNews(id));
    const { status } = newsFeed;

    const dispatch = useDispatch();

    const displayNews = () => {
        if (status === 'ok') {
            setSuccess(true);
        } else if (status === 'error') {
            console.log("ERROR loading news in Breaking News Slide component.")
            setSuccess(false);
        }
    }

    const triggerReload = () => {
        dispatch(reloadNews({ id: 0, feed: 'breakingNews' }));
        dispatch(fetchBreakingNews({ id: 0 }))
    }

    useEffect(() => {
        setSlideArray(
            convertToSlideFormat(newsFeed.articles)
                .filter(
                    (article, idx) => idx < numArticles
                )
        );
        displayNews();
    }, [newsFeed]);

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