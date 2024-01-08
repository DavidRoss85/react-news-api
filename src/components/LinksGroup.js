import { Row, Col } from "reactstrap";


const LinksGroup = ({ searchLinks }) => {
    const {
        headLink = { "title": "United States", "query": "?q=United States" },
        subLinks = [{ "title": "Search", "query": "?q=United States" }]
    } = searchLinks;
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
                            <span className="search-link">{subLink.title}</span>
                        </Col>
                    </Row>

                )
            })}
        </>
    )
}

export default LinksGroup;
