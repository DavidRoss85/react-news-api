import LinksGroup from "../../components/LinksGroup";
import { SEARCH_OPTIONS } from "../../app/shared/SEARCH_OPTIONS";
import SearchBar from "../../components/SearchBar";
import { Row, Col } from "reactstrap";

const FooterSearch = () => {
    return (
        <>
            <Row>
                <Col>
                    <h3>Search News</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <SearchBar />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Row id="searchOptRow">
                        {SEARCH_OPTIONS.map((option, idx) => {
                            return (
                                <Col key={idx}>
                                    <LinksGroup searchLinks={option} />
                                </Col>
                            )
                        })}
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default FooterSearch;