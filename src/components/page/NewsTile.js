import { Row, Col } from "reactstrap";
import BreakingNewsSlide from "../../features/news/BreakingNewsSlide";
import ArticlesPallette from "../../features/news/ArticlesPallette";
import ArticlesList from "../../features/news/ArticlesList";
import TopicSection from "../../features/news/TopicSection";

//Place this inside of a <Row> component 
const NewsTile = ({ newsParams }) => {
    const { sizing, innerSizing, title, tileType, componentAttribute } = newsParams

    let componentToRender = <></>

    switch (tileType) {
        case 'slide':
            componentToRender = <BreakingNewsSlide newsParams={newsParams} {...componentAttribute} />
            break;
        case 'pallette':
            componentToRender = <ArticlesPallette newsParams={newsParams} {...componentAttribute} />
            break;
        case 'list':
            componentToRender = <ArticlesList newsParams={newsParams} {...componentAttribute} />
            break;
        case 'topic':
            componentToRender = <TopicSection newsParams={newsParams} {...componentAttribute} />
            break;
        default:

    }

    return (
        <Col {...sizing}>
            <Row>
                <Col className="text-center">
                    <h3>{title}</h3>
                </Col>
            </Row>
            <Row>
                <Col {...innerSizing}>
                    {componentToRender}
                </Col>
            </Row>
        </Col>

    )
}

export default NewsTile;
