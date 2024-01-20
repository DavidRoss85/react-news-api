import { Container, Row, Col } from "reactstrap";
import bannerVideo from "../app/img/worldLoop.mov"
import adVideo1 from "../app/img/newsAd3.mp4"
// import adVideo1 from "../app/img/worldLoop.mov"

const Header = () => {
    return (

        <Container fluid>
            <Row className="top-banner d-none d-md-flex">
                <Col className="col-3 thisIsDnn sm">
                    <video className="img-fluid" autoPlay muted playsInline loop src={adVideo1}>News</video>
                </Col>

                <Col className="banner-pic p-0" id="banner-mid" />
                
                <Col className="col-3 banner-pic p-0">
                    <video className="img-fluid" autoPlay muted playsInline loop src={bannerVideo}>The world</video>
                </Col>
            </Row>

            <Row className="sm-banner d-flex d-md-none">
                <Col className="col-5 p-0 thisIsDnn sm">
                    <video className="img-fluid" autoPlay muted playsInline loop src={adVideo1}>News</video>
                </Col>
                <Col className="thisIsDnn sm">
                </Col>
                <Col className="col-6 banner-pic p-0">
                    <video className="img-fluid" autoPlay muted playsInline loop src={bannerVideo}>The world</video>
                </Col>
            </Row>
        </Container>

    )
}
export default Header;