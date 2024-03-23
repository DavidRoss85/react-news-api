import { Row, Col, Button } from "reactstrap";
import SignUpButtonRow from "../../components/signup/SignUpButtonRow";
import SignUpForm from "../../components/signup/SignUpForm";


const SignUpView = ({ backFunc }) => {

    return (
        <>
            <SignUpButtonRow
                backFunc={backFunc}
                submitFunc={() => { }}
            />
            <Row className='justify-content-center'>
                <Col lg='6'>
                    <SignUpForm 
                        clickCancel={()=>{}}
                        handleSubmit={()=>{}}
                    />
                </Col>
            </Row>
            <SignUpButtonRow
                backFunc={backFunc}
                submitFunc={() => { }}
            />
        </>
    )
}
export default SignUpView;