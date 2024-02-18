import { Row, Col, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import FeedRow from "./FeedRow";

const HomeViewSet = () => {

    const [newsRows, setNewsRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const userSettings = useSelector(state => state.user.data);
    const [currentSettings,setCurrentSettings] = useState(userSettings);
    const { homepage: homePageSettings } = currentSettings.preferences;

    useEffect(() => {
        setNewsRows(() => {
            const tempArray = [];
            for (const item of homePageSettings) {
                if (!item.row || tempArray.includes(item.row)) continue;
                tempArray.push(item.row)
            }
            return tempArray;
        })
    }, [homePageSettings])

    const addFeedRow = () => {
        setNewsRows(newsRows => {
            newsRows.push(newsRows.length + 1);
            return newsRows;
        })
    }

    const toggleRowSelect = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows => selectedRows.filter(item => item !== id))
        } else {
            setSelectedRows(selectedRows => {
                selectedRows.push(id);
                return selectedRows;
            })
        }
    }

    const deleteSelectedRows = () => {
        setNewsRows(newsRows => newsRows.filter((item, idx) => !selectedRows.includes(idx)));
        setSelectedRows([])
    }

    const deleteRow = (id) => {
        setNewsRows(newsRows => newsRows.filter((item, idx) => id !== idx));
    }

    return (
        <>
            <Row>
                <Col style={{ padding: '8px', textAlign: 'start' }}>
                    <Button style={styles.buttonStyle} onClick={addFeedRow}>+ Add Row</Button>
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
                            deleteFunc={() => deleteRow(idx)}
                            params={{
                                rowNum: newsRows[idx],
                                idx,
                                pages: homePageSettings.filter(item => item.row === newsRows[idx])
                            }}
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