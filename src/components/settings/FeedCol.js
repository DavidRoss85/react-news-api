import { Row, Col } from "reactstrap";
import SelectBox from "../misc/SelectBox";
import DeleteButton from "../misc/DeleteButton";

const FeedCol = (props) => {
    const {
        isSelected,
        toggleSelect = () => { },
        deleteFunc = () => { },
        params
    } = props

    const { title, tileType, row, sizing, innerSizing, componentAttribute, search } = params
    return (
        <Col
            style={
                isSelected
                    ? { ...styles.basicStyle, ...styles.newsSelected }
                    : { ...styles.basicStyle, ...styles.newsStyle }
            }
            {...sizing}

        >
            <Row style={styles.topMenu}>
                <Col>
                    <h4>Title: {title}</h4>
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
                    Sizing: {JSON.stringify(sizing)}
                    <br/>
                    Inner Sizing: {JSON.stringify(innerSizing)}
                    <br/>
                    componentAttribute: {JSON.stringify(componentAttribute)}
                    <br/>
                    Search criteria: {JSON.stringify(search)}
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