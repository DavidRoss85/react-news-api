import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { convertToSlideFormat } from "../../utils/convertToSlideFormat";
import { Failed, Loading } from "../../components/misc/ComponentStatuses";
import SlideShow from "../../components/news/SlideShow";

import { fetchBreakingNews, getLoadingStatus } from "../../app/selectors/newsSlice";
import { getEmptyNewsArray, reloadNews } from "../../app/selectors/newsSlice";
import { getBreakingNews, testFetch } from "../../app/selectors/newsSlice";

const BreakingNewsSlide = (props) => {

    const { newsParams } = props;
    const { id = 0, numArticles } = newsParams;

    const [newsArray, setNewsArray] = useState(useSelector(getEmptyNewsArray));
    const [success, setSuccess] = useState(false);

    const isLoading = useSelector(getLoadingStatus(id))
    const newsFeed = useSelector(getBreakingNews(id));
    const searchCache = useSelector((state) => state.news.cache)
    const tileSetting = useSelector((state) => state.settings.data.current.homepage[id].search);
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
        setNewsArray(
            convertToSlideFormat(
                newsFeed.articles)
                .filter(
                    (article, idx) => {
                        const immNumArticles = numArticles || 1
                        return idx < immNumArticles
                    }
                )
        );

        displayNews();
    }, [newsFeed]);

    if (isLoading) { return (<Loading />) }
    if (!success) { return (<Failed reset={triggerReload} />) }
    return (
        <SlideShow
            items={newsArray}
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