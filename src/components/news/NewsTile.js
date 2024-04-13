import { Row, Col } from "reactstrap";
import BreakingNewsSlide from "../../features/news/BreakingNewsSlide";
import ArticlesPallette from "../../features/news/ArticlesPallette";
import ArticlesList from "../../features/news/ArticlesList";
import TopicSection from "../../features/news/TopicSection";
import CardBlock from "../../features/news/CardBlock";

//Place this inside of a <Row> component 
const NewsTile = ({ newsParams }) => {
    const { sizing, style, innerSizing, title, tileType, componentAttribute } = newsParams

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
        case 'card':
            componentToRender = <CardBlock newsParams={newsParams} {...componentAttribute} />
            break;
        default:

    }

    return (
        <Col {...sizing} style={{ ...style }}>
            <Row style={{ padding: '10px' }}>
                <Col className="text-center">
                    <h2>{title}</h2>
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
