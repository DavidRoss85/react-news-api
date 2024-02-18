import { Row, Col, Button } from "reactstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const tempArray = [
    { title: 'News', width: 30 },
    { title: 'More', width: 30 },
    { title: 'Yeah', width: 30 }
]
const FeedRow = ({ rowSelected, toggleRowSelect = () => { } }) => {

    const [newsColumns, setNewsColumns] = useState(tempArray);
    const [selectedColumns, setSelectedColumns] = useState([]);

    const addNewsComponent = () => {
        setNewsColumns(newsColumns => {
            newsColumns.length < 5
                ? newsColumns.push({ title: 'News', width: 30 })
                : console.log();
            return newsColumns;
        })
    };

    const toggleColumnSelect = (index) => {
        if (selectedColumns.includes(index)) {
            setSelectedColumns(selectedColumns => selectedColumns.filter(item => item !== index))
        } else {
            setSelectedColumns(selectedColumns => {
                selectedColumns.push(index);
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

    return (
        <>
            <Row style={rowSelected ? styles.rowSelected : styles.rowStyle}>
                <Col>
                    <Row style={styles.menuRow}>
                        <Col>
                            <Button style={styles.buttonStyle} onClick={toggleRowSelect}>{rowSelected ? 'Deselect Row' : 'Select Row'}</Button>
                        </Col>
                        <Col>
                            <Button style={styles.buttonStyle} onClick={addNewsComponent}>+ Add Column</Button>
                            <Button style={styles.buttonStyle} onClick={deleteSelected}><FontAwesomeIcon icon="fa-solid fa-trash" /> Delete Selected</Button>
                        </Col>
                    </Row>
                    <Row>
                        {newsColumns.map((item, idx) => {

                            return (
                                <Col
                                    key={idx}
                                    style={selectedColumns.includes(idx) ? styles.newsSelected : styles.newsStyle}

                                >
                                    Title: {item.title}
                                    <Button
                                        onClick={() => toggleColumnSelect(idx)}
                                        style={selectedColumns.includes(idx) ? styles.checkboxSelected : styles.checkboxUnselected}
                                    >
                                        {selectedColumns.includes(idx)
                                            ? <>Select <FontAwesomeIcon icon="fa-regular fa-square-check" /></>
                                            : <>Select <FontAwesomeIcon icon="fa-regular fa-square" /></>
                                        }
                                    </Button>
                                </Col>
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
    buttonStyle: {
        backgroundColor: 'rgba(80,80,255,.8)',
        marginLeft: '3px',
        marginRight: '3px'
    },
    checkboxSelected: {
        border: 'none',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'black',
        fontWeight: 'bold'
    },
    checkboxUnselected: {
        border: 'none',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'black',
        fontWeight: 'bold'
    },
    menuRow: {
        borderRadius: '10px',
        textAlign: 'left',
        padding: '5px',
    },
    newsStyle: {
        background: 'white',
        border: '2px solid black',
        borderRadius: '20px',
        margin: '5px',
        height: '20vh'
    },
    newsSelected: {
        background: myColors.selectedGreen,
        border: '2px solid black',
        borderRadius: '20px',
        margin: '5px',
        height: '20vh'
    },
    rowStyle: {
        border: '3px solid black',
        borderRadius: '14px',
        height: '30vh',
        marginTop: '8px',
        background: myColors.lightRed
    },
    rowSelected: {
        border: '3px solid black',
        borderRadius: '14px',
        height: '30vh',
        marginTop: '8px',
        background: 'blue'
    },
};

export default FeedRow;