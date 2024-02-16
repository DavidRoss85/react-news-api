import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SocialIcons = () => {
    return (
        <Row>
            <Col>
                <a className="p-1" href="https://www.facebook.com/"><FontAwesomeIcon icon={["fab", "facebook"]} /></a>
                <a className="p-1" href="https://www.instagram.com/"><FontAwesomeIcon icon={["fab", "instagram"]} /></a>
                <a className="p-1" href="https://www.twitter.com/"><FontAwesomeIcon icon={["fab", "x-twitter"]} /></a>
                <a className="p-1" href="https://www.tiktok.com/"><FontAwesomeIcon icon={["fab", "tiktok"]} /></a>
            </Col>
        </Row>
    )
}


export default SocialIcons;