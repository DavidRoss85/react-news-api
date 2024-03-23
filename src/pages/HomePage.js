import { Container, Row } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import NewsTile from "../components/news/NewsTile";
import { loadLocalCache } from "../app/selectors/cacheSlice";
import { getUserSession } from "../app/selectors/userSlice";

const HomePage = () => {
    const appSettings = useSelector((state) => state.settings)
    const newsParams = appSettings.data.current.homepage;

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getUserSession());
        dispatch(loadLocalCache());
    },[])
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