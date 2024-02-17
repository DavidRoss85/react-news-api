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
                ? newsColumns.push({ title: 'News #' + Date.now(), width: 30 })
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
            <Row style={{ border: '3px solid black', borderRadius: '14px', height: '30vh', background: rowSelected ? 'blue' : 'white' }}>
                <Col>
                    <Row style={{ border: '3px solid black', borderRadius: '10px', textAlign: 'left' }}>
                        <Col style={{ padding: '5px' }}>
                            <Button onClick={addNewsComponent}>+</Button>
                            <Button onClick={deleteSelected}><FontAwesomeIcon icon="fa-solid fa-trash" /></Button>
                            <Button onClick={toggleRowSelect}>{rowSelected ? 'Deselect Row' : 'Select Row'}</Button>
                        </Col>
                    </Row>
                    <Row>
                        {newsColumns.map((item, idx) => {
                            const itemColor = selectedColumns.includes(idx) ? 'red' : 'white';
                            return (
                                <Col
                                    key={idx}
                                    style={{ background: itemColor, border: '2px solid black', borderRadius: '20px', margin: '5px', height: '20vh' }}

                                >
                                    #{idx}
                                    <br />
                                    Title: {item.title}
                                    <Button onClick={() => toggleColumnSelect(idx)}>{selectedColumns.includes(idx) ? 'Deselect' : 'Select'}</Button>
                                </Col>
                            )
                        })}
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default FeedRow;