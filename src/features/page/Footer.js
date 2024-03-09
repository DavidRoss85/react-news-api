import { Container, Row, Col } from "reactstrap";
import FooterSearch from "../search/FooterSearch";
import SiteLogo from "../../components/page/SiteLogo";
import SocialIcons from "../../components/page/SocialIcons";
import BottomText from "../../components/page/BottomText";

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