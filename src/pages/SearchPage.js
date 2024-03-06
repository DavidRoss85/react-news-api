import { Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import { fetchSearchResults, reloadNews } from "../app/selectors/newsSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArticleCard from "../components/news/ArticleCard";
import PageNumbers from "../components/misc/PageNumbers"
import { formatArticle } from "../utils/formatArticle";
import { Loading, Failed } from "../components/misc/ComponentStatuses";
import SearchBar from "../components/search/SearchBar";

const SearchPage = () => {
    const { searchCriteria } = useParams();

    const oldSearchCriteria = useSelector((state) => state.news.searchResults[0].criteria);
    const searchResults = useSelector((state) => state.news.searchResults[0].news);
    const isLoading = useSelector((state) => state.news.searchResults[0].isLoading);
    const searchCache = useSelector((state) => state.cache)
    const [success, setSuccess] = useState(false);
    const [numPages, setNumPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const { status } = searchResults;

    const dispatch = useDispatch();

    
    const triggerReload = () => {
        dispatch(reloadNews({ id: 0, feed: 'searchResults' }));
        dispatch(fetchSearchResults({ endpoint: 'everything', keyword: searchCriteria, searchCache }));
    }
    const changePage = (page) => {
        if (page < 1 || page > numPages) return
        setCurrentPage(page)
    }
    
    const displayNews = () => {
        if (status === 'ok') {
            setSuccess(true);
        } else if (status === 'error') {
            console.log("ERROR loading news Search.")
            setSuccess(false);
        }
    }
    useEffect(() => {
        setNumPages(Math.ceil(searchResults.articles.length / 10))
        displayNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchResults])

    useEffect(() => {
        if (searchCriteria !== oldSearchCriteria) {
            triggerReload();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchCriteria, oldSearchCriteria])

    if (isLoading) { return (<Loading />) };
    if (!success) { return (<Failed message='News Search Failed...' reset={triggerReload} />) }

    return (
        <>
            <Row className='footer-container p-3'>
                <Col>
                    <SearchBar duplicate={true} />
                </Col>
            </Row>
            <Row>
                <Col className='text-center'>
                    <h3>Search Results for {searchCriteria}</h3>
                    <hr />
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col xs='auto' className='text-center'>
                    <PageNumbers currentPage={currentPage} numPages={numPages} click={changePage} />
                </Col>
            </Row>
            {searchResults.articles.map((article, idx) => {
                const immArticle = formatArticle(article);
                return (
                    <Row key={idx}>
                        <Col>
                            <ArticleCard article={immArticle} />
                        </Col>
                    </Row>

                )
            }).filter((article, idx) => {
                return (idx < (currentPage * 10) && idx >= (currentPage * 10) - 10)
            })}

            <Row className='justify-content-center'>
                <Col xs='auto' className='text-center'>
                    <PageNumbers currentPage={currentPage} numPages={numPages} click={changePage} />
                </Col>
            </Row>
        </>
    )
}

export default SearchPage;