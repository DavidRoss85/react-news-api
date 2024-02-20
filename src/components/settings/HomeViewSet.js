import { Row, Col, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import FeedRow from "./FeedRow";

const HomeViewSet = () => {

    const [newsRows, setNewsRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const userSettings = useSelector(state => state.user.data);
    const [currentSettings, setCurrentSettings] = useState(userSettings);
    const { homepage: homePageSettings } = currentSettings.preferences;

    
    useEffect(() => {
        setCurrentSettings(userSettings);
    },[userSettings])

    useEffect(() => {
        setNewsRows(() => {
            /*tempArr = [
                [{id: 0,row: 1},{id: 1,row: 1}],
                [{id: 2,row: 2},{id: 3,row: 2}],
                [{id: 4,row: 3}],
            ]*/
            const tempArr = [];
            const maxRows = Math.max(...homePageSettings.map((item) => item.row ? item.row : 1));
            for (let i = 1; i <= maxRows; i++) {
                tempArr.push([]);
            }
            for (const item of homePageSettings) {
                if (item.row) {
                    const rIndex = item.row - 1;
                    tempArr[rIndex].push(item)
                }
            }
            return tempArr;
        })
    }, [homePageSettings])

    const updateFeedRow = (id, value) => {
        setNewsRows(newsRows => {
            newsRows[id] = value;
            return newsRows;
        })
    }

    const addFeedRow = () => {
        setNewsRows(newsRows => {
            newsRows.push([]);
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
        setNewsRows(newsRows => newsRows.filter((item, idx) => {
            console.log('id:idx', id, idx, id !== idx)

            return id !== idx
        }));
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
                {newsRows.map((components, idx) => {
                    return (
                        <FeedRow
                            key={idx}
                            toggleRowSelect={() => toggleRowSelect(idx)}
                            rowSelected={selectedRows.includes(idx) ? true : false}
                            deleteFunc={() => deleteRow(idx)}
                            updateFunc={updateFeedRow}
                            params={{
                                rowNum: idx + 1,
                                idx,
                                components: components
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