import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SocialIcons = () => {
    return (
        <Row>
            <Col>
                <a href="https://www.facebook.com/"><FontAwesomeIcon icon={["fab", "facebook"]} /></a>
                <a href="https://www.instagram.com/"><FontAwesomeIcon icon={["fab", "instagram"]} /></a>
                <a href="https://www.twitter.com/"><FontAwesomeIcon icon={["fab", "x-twitter"]} /></a>
                <a href="https://www.tiktok.com/"><FontAwesomeIcon icon={["fab", "tiktok"]} /></a>
            </Col>
        </Row>
    )
}

export default SocialIcons;