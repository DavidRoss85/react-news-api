import { Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import { fetchSearchResults } from "../app/selectors/newsSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ArticleCard from "../components/ArticleCard";
import { formatArticle } from "../utils/formatArticle";
import { Loading } from "../components/ComponentStatuses";

const SearchPage = () => {
    const { searchCriteria } = useParams();
    const searchResults = useSelector((state) => state.news.searchResults.news)
    const isLoading = useSelector((state) => state.news.searchResults.isLoading)
    // useEffect(()=>{
    //     fetchSearchResults({keyword: searchCriteria})
    // },[])
    useEffect(() => {
        console.log('Results change')
        console.log('Results:', searchResults)
    }, [searchResults])

    if (isLoading) { return (<Loading />) };

    return (
        <>
            <Row>
                <Col className='text-center'>
                    <h3>Search Results for {searchCriteria}</h3>
                    <hr />
                </Col>
            </Row>
            {searchResults.articles.map((article, idx) => {
                if (idx > 10) return;//limit to 10 articles for now
                const immArticle = formatArticle(article)
                return (
                    <Row key={idx}>
                        <Col>
                            <ArticleCard article={immArticle} />
                        </Col>
                    </Row>

                )
            })}
        </>
    )
}

export default SearchPage;