import { Row,Col } from "reactstrap";

const Loading = () =>{
    return(
        <Row style={{ height: '100%' }} className="text-center align-items-center">
            <Col>
                Loading News...
                <div className="loading-wheel rotate-clockwise"></div>
            </Col>
        </Row>

    )
}

const Failed = ( {reset}) => {
    return(
            <Row style={{ height: '100%' }} className="text-center align-items-center">
                <Col>
                    Failed to load News...
                    <br/>
                    <button onClick={()=>{reset()}} className="btn btn-warning">Reload</button>
                </Col>
            </Row>
    )
}

export {Loading, Failed};