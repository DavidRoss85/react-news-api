import { Row, Col, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { defaultPageColumn } from "../../app/shared/DEFAULTS";
import SelectBox from "../misc/SelectBox";
import FeedCol from "./FeedCol";
import DeleteButton from "../misc/DeleteButton";

const tempArray = [
    { title: 'News', width: 30 },
    { title: 'More', width: 30 },
    { title: 'Yeah', width: 30 }
]
const FeedRow = (props) => {

    const {
        rowNum,
        rowSelected,
        toggleRowSelect = () => { },
        deleteFunc = () => { },
        updateFunc = () => { },
        params
    } = props;

    const [newsColumns, setNewsColumns] = useState(params.components);
    const [selectedColumns, setSelectedColumns] = useState([]);

    useEffect(() => {
        updateFunc(params.idx, newsColumns);
    }, [newsColumns])

    useEffect(()=>{
        setNewsColumns(params.components)
    },[params.components])

    const addNewsComponent = () => {
        setNewsColumns(newsColumns => {
            newsColumns.length < 5
                ? newsColumns.push(defaultPageColumn)
                : console.log();
            return newsColumns;
        })
    };

    const toggleColumnSelect = (id) => {
        if (selectedColumns.includes(id)) {
            setSelectedColumns(selectedColumns => selectedColumns.filter(item => item !== id))
        } else {
            setSelectedColumns(selectedColumns => {
                selectedColumns.push(id);
                return selectedColumns;
            })
        }
    }

    const deleteSelected = () => {
        setNewsColumns(newsColumns => newsColumns.filter((item, idx) => {
            return !selectedColumns.includes(idx);
        }));
        setSelectedColumns([])
    }

    const deleteColumn = (id) => {
        setNewsColumns(newsColumns => newsColumns.filter((item, idx) => id !== idx));
    }
    return (
        <>
            <Row style={
                rowSelected
                    ? { ...styles.basicStyle, ...styles.rowSelected }
                    : { ...styles.basicStyle, ...styles.rowStyle }
            }
            >
                <Col>
                    <Row style={styles.menuRow}>
                        <Col style={{ textAlign: 'start' }}>
                            Row: {params.rowNum} : idx : {params.idx}
                        </Col>
                        <Col style={{ textAlign: 'end', }}>
                            <SelectBox isSelected={rowSelected} onClick={toggleRowSelect} />
                            <DeleteButton onClick={deleteFunc} style={styles.deleteButton} btnText={'Delete Row'} />
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'start' }}>
                        <Col>
                            <Button style={styles.buttonStyle} onClick={addNewsComponent}>+ Add Column</Button>
                            {/* <Button style={styles.buttonStyle} onClick={deleteSelected}><FontAwesomeIcon icon="fa-solid fa-trash" /> Delete Selected</Button> */}
                        </Col>
                    </Row>
                    <Row>
                        {newsColumns.map((item, idx) => {
                            return (
                                <FeedCol
                                    key={idx}
                                    deleteFunc={() => deleteColumn(idx)}
                                    isSelected={selectedColumns.includes(idx)}
                                    toggleSelect={() => toggleColumnSelect(idx)}
                                    params={newsColumns[idx]}
                                />
                            )
                        })}
                    </Row>
                </Col>
            </Row>
        </>
    )
}

const myColors = {
    lightRed: 'rgb(255,80,80)',
    selectedGreen: 'rgb(80,255,80)'
};

const styles = {
    basicStyle: {
        padding: '5px',
        border: '3px solid black',
        borderRadius: '14px',
        marginTop: '8px',
    },
    buttonStyle: {
        backgroundColor: 'rgba(80,80,255,.8)',
        marginLeft: '3px',
        marginRight: '3px'
    },
    deleteButton: {
        border: '1px solid black',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'black',
        fontWeight: 'bold'
    },
    menuRow: {
        borderRadius: '10px',
        padding: '5px',
    },
    rowStyle: {
        background: myColors.lightRed
    },
    rowSelected: {
        background: 'blue'
    },
};

export default FeedRow;