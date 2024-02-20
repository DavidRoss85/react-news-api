import { useState, useEffect } from "react";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectBox from "../misc/SelectBox";
import DeleteButton from "../misc/DeleteButton";

const FeedCol = (props) => {
    const {
        isSelected,
        toggleSelect = () => { },
        deleteFunc = () => { },
        params
    } = props

    const [localParams, setLocalParams] = useState(params)
    const { title='', tileType='', row=1, sizing={}, innerSizing={}, componentAttribute={}, search={}, numArticles=1 } = localParams;

    useEffect(()=>{
        setLocalParams(params);
    },[params]);

    return (
        <Col
            style={
                isSelected
                    ? { ...styles.basicStyle, ...styles.newsSelected }
                    : { ...styles.basicStyle, ...styles.newsStyle }
            }
            {...localParams.sizing}

        >
            <Row style={styles.topMenu}>
                <Col className='text-no-wrap text-truncate'>
                    <h5>Title: {localParams.title}</h5>
                </Col>
                <Col>
                    {/* <SelectBox isSelected={isSelected} onClick={toggleSelect} /> */}
                    <DeleteButton onClick={deleteFunc} style={styles.deleteButton} btnText={'Delete'} />
                </Col>
            </Row>
            <Row >
                <Col>
                    <strong>Current Settings:</strong>
                </Col>
            </Row>
            <Row>
                <Col>
                    Type: {tileType}
                    <br/>
                    Number of Articles to load:
                    <p>
                        {JSON.stringify(numArticles)}
                    </p>
                    Search criteria:
                    <p className='text-no-wrap text-truncate'>
                        {JSON.stringify(search)}
                    </p>
                    <Button> Edit search criteria <FontAwesomeIcon icon="fa-solid fa-pen" /></Button>
                </Col>
            </Row>
        </Col>

    )
}
const myColors = {
    lightRed: 'rgb(255,80,80)',
    selectedGreen: 'rgb(80,255,80)'
};

const styles = {
    basicStyle: {
        marginTop: '5px',
        border: '2px solid black',
        borderRadius: '20px',
        paddingBottom: '5px',
    },
    topMenu: {
        textAlign: 'right'
    },
    deleteButton: {
        border: '1px dashed black',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'black',
        fontWeight: 'bold'
    },
    newsStyle: {
        background: 'white',
    },
    newsSelected: {
        background: myColors.selectedGreen,
    },
}
export default FeedCol;