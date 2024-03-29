import { useNavigate } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { useState } from "react";
import { fetchSearchResults, reloadNews } from "../../app/selectors/newsSlice";
import { useSelector, useDispatch } from "react-redux";

const SearchBar = ({duplicate}) => {
    const [searchCriteria, setSearchCriteria] = useState('');
    const searchCache = useSelector((state) => state.cache)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSubmit = () => {
        if (searchCriteria) {
            dispatch(reloadNews({ id: 0, feed: 'searchResults' }));
            dispatch(fetchSearchResults({ endpoint: 'everything', keyword: searchCriteria, searchCache }))
            navigate(`/search/${searchCriteria}`);
            setSearchCriteria('')
        }
    }
    return (
        <Row>
            <Col md="10">
                <input
                    id={duplicate ?"searchBoxAgain": 'searchBox'}
                    className="form-control"
                    type="text"
                    placeholder="This is DNN"
                    value={searchCriteria}
                    onChange={(e) => setSearchCriteria(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' ? handleSubmit() : e}
                />
            </Col>
            <Col>
                <button onClick={handleSubmit} id="searchBtn" className="btn btn-danger form-control" type="button">
                    <i className="fa fa-search"></i> Search
                </button>
            </Col>
        </Row>
    )
}

export default SearchBar;