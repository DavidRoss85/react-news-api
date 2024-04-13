import { Row, Col, Button } from "reactstrap";

const PageNumbers = (props) => {
    const {
        currentPage = 1,
        numPages,
        click,
        color = 'secondary',
        highlight = 'danger'
    } = props;
    const pageArray = []

    const handleClick = (page) => {
        click(page)
    }
    const numToShow = 2
    const minPage = Math.min(numPages, currentPage + numToShow) === numPages ? Math.max(0, numPages - ((numToShow * 2) + 1)) : Math.max(0, (currentPage - numToShow) - 1)
    const maxPage = Math.max(0, currentPage - numToShow) === 0 ? Math.min(numPages, (numToShow * 2) + 1) : Math.min(numPages, currentPage + numToShow)

    for (let i = minPage; i < maxPage; i++) {
        pageArray[i] = (() => {
            return (
                <Col xs='1' md='auto' className='' key={i}>
                    <Button href={'#search-page-top'} style={{}} color={currentPage === i + 1 ? highlight : color} onClick={() => handleClick(i + 1)} >{i + 1}</Button>
                </Col>
            )
        })()//function is invoked
    }
    return (
        <Row>
            <Col xs='1' md='auto' className=''>
                <Button href={'#search-page-top'} color={color} onClick={() => handleClick(currentPage - 1)}>{'<'}</Button>
            </Col>
            {pageArray}
            <Col xs='1' md='auto' className=''>
                <Button href={'#search-page-top'} color={color} onClick={() => handleClick(currentPage + 1)}>{'>'}</Button>
            </Col>

        </Row>
    )
}

export default PageNumbers;