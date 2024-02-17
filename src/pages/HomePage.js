import { Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import NewsTile from "../components/page/NewsTile";

const HomePage = () => {
    const appSettings = useSelector((state)=>state.settings)
    const newsParams = appSettings.data.current.homepage;

    //figure out how many rows to generate:
    const maxRows = Math.max(...newsParams.map((param) => param.row ? param.row : 1));
    let renderRows = []
    for (let i = 1; i <= maxRows; i++) {
        renderRows.push(
            <Row key={i}>
                {
                    newsParams.filter((param) => param.row === i)
                        .map((param, idx) => {
                            return <NewsTile newsParams={param} key={idx} />
                        })
                }
            </Row>
        )
    }

    return (
        <Container fluid>
            {renderRows}
        </Container>
    )

}

export default HomePage;