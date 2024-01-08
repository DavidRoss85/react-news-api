import { Row, Col } from "reactstrap";

const SearchBar = () => {
    return (
        <Row>
            <Col md="10">
                <input id="searchBox" className="form-control" type="text" placeholder="This is DNN" />
            </Col>
            <Col>
                <button id="searchBtn" className="btn form-control" type="button"><i className="fa fa-search"></i> Search</button>
            </Col>
        </Row>
    )
}

export default SearchBar;