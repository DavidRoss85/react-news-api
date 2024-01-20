import { Container, Row, Col } from "reactstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAppSettings } from "../app/selectors/settingsSlice";
import NewsTile from "../components/NewsTile";

const TestHomePage = () => {
    //Make this pure later
    const appSettings = useSelector(getAppSettings)
    const newsParams = appSettings.data.current.homepage;

    //figure out how many rows to generate:
    const maxRows = Math.max(...newsParams.map((param) => param.row));
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
    useEffect(() => {

    },);
    return (
        <Container fluid>
            {renderRows}
        </Container>
    )

}

export default TestHomePage;