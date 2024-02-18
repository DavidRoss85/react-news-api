import { Row, Col, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FeedRow from "./FeedRow";

const HomeViewSet =()=>{

    const [newsRows, setNewsRows] = useState([{ title: 'Row' }]);
    const [selectedRows, setSelectedRows] = useState([]);

    const addFeedRow = () => {
        setNewsRows(newsRows => {
            newsRows.push({ title: 'Row' });
            return newsRows;
        })
    }

    const toggleRowSelect = (index) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows => selectedRows.filter(item => item !== index))
        } else {
            setSelectedRows(selectedRows => {
                selectedRows.push(index);
                return selectedRows;
            })
        }
    }

    const deleteSelectedRows = () => {
        setNewsRows(newsRows => newsRows.filter((item, idx) => !selectedRows.includes(idx)));
        setSelectedRows([])
    }

    return (
        <>
            <Row>
                <Col style={{padding: '8px'}}>
                    <Button style={styles.buttonStyle} onClick={addFeedRow}>Add Row</Button>
                    <Button style={styles.buttonStyle} onClick={deleteSelectedRows}><FontAwesomeIcon icon="fa-solid fa-trash" /> Delete Selected Rows</Button>
                </Col>
            </Row>
            <Row>
                {newsRows.map((item, idx) => {
                    return (
                        <FeedRow
                            key={idx}
                            toggleRowSelect={() => toggleRowSelect(idx)}
                            rowSelected={selectedRows.includes(idx) ? true : false}
                        />
                    )
                })}
            </Row>
        </>
    )
}
const styles = {
    buttonStyle: {
        backgroundColor: '#850d0d',
        marginLeft: '3px',
        marginRight: '3px'
    },
}
export default HomeViewSet;