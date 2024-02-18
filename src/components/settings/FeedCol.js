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
    return (
        <Col
            style={
                isSelected
                    ? { ...styles.basicStyle, ...styles.newsSelected }
                    : { ...styles.basicStyle, ...styles.newsStyle }
            }

        >
            <Row style={styles.topMenu}>
                <Col>
                    Title: {params.title}
                </Col>
                <Col>
                    {/* <SelectBox isSelected={isSelected} onClick={toggleSelect} /> */}
                    <DeleteButton onClick={deleteFunc} style={styles.deleteButton} btnText={'Delete'} />
                </Col>
            </Row>
            <Row >
                <Col>
                    This is the main body
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
        margin: '5px',
        border: '2px solid black',
        borderRadius: '20px',
        margin: '5px',

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