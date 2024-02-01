import { Row, Col } from 'reactstrap';

const Loading = ({ message = 'Loading News...' }) => {
    return (
        <Row style={{ height: '100%' }} className='text-center align-items-center'>
            <Col>
                {message}
                <div className='loading-wheel rotate-clockwise'></div>
            </Col>
        </Row>

    )
}

const Failed = (props) => {
    const { reset, message = 'Failed to load News...', buttonText = 'Reload' } = props
    return (
        <Row style={{ height: '100%' }} className='text-center align-items-center'>
            <Col>
                {message}
                <br />
                <button onClick={() => { reset() }} className='btn btn-warning'>{buttonText}</button>
            </Col>
        </Row>
    )
}

export { Loading, Failed };