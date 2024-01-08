import { Container, Row, Col } from "reactstrap";
import FooterSearch from "../features/search/FooterSearch";
import SiteLogo from "./SiteLogo";
import SocialIcons from "./SocialIcons";
import BottomText from "./BottomText";

const Footer = () => {

    return (
        <Container fluid className="container-fluid no-gutters footer-container">
            <Row className="justify-content-center text-center align-items-center">
                <Col>

                    <Row className="justify-content-center text-center align-items-center">
                        <Col>
                            <FooterSearch />
                        </Col>
                    </Row>
                    <hr />

                    <Row >
                        <Col> <SiteLogo /> </Col>
                        <Col> Follow DNN </Col>
                        <Col> <SocialIcons /> </Col>
                    </Row>
                    <hr />

                    <BottomText />

                </Col>
            </Row>
        </Container>
    )
}

export default Footer;