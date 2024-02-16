import { Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSearchResults, reloadNews } from "../../app/selectors/newsSlice";

const LinksGroup = ({ searchLinks }) => {
    const {
        headLink = { "title": "United States", "query": "?q=United States" },
        subLinks = [{ "title": "Search", "query": "?q=United States" }]
    } = searchLinks;

    const searchCache = useSelector((state) => state.news.cache)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleClick = (searchCriteria)=>{
        if (searchCriteria) {
            dispatch(reloadNews({ id: 0, feed: 'searchResults' }));
            dispatch(fetchSearchResults({ endpoint: 'everything', keyword: searchCriteria, searchCache }))
            navigate(`/search/${searchCriteria}`)
        }
    }
    return (
        <>
            <Row className="link-group pt-2">
                <Col className="text-sm-start">
                    <h4 className="search-link">{headLink.title}</h4>
                </Col>
            </Row>
            {subLinks.map((subLink, idx) => {
                return (
                    <Row key={idx}>
                        <Col className="text-sm-start">
                            <span className="search-link" onClick={()=>handleClick(subLink.title)}>{subLink.title}</span>
                        </Col>
                    </Row>

                )
            })}
        </>
    )
}

export default LinksGroup;
