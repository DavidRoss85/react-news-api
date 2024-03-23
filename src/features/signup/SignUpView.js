import { Row, Col, Button } from "reactstrap";
import SignUpButtonRow from "../../components/signup/SignUpButtonRow";
import SignUpForm from "../../components/signup/SignUpForm";
import { useDispatch, useSelector } from "react-redux";
import { postSignup, resetSignUpVariables } from "../../app/selectors/userSlice";
import { useEffect,useState } from "react";


const SignUpView = ({ backFunc }) => {

    const signUpState = useSelector(state=>state.user.signUp);
    // const { isLoading,success,errMsg} = signUpState;
    const [isLoading,setIsLoading] = useState(false);
    const [success,setSuccess] = useState(false);
    const [errMsg,setErrMsg] = useState('');
    
    const dispatch = useDispatch()
    const handleSubmit = (values) => {
        const { username, displayname, email, password } = values;
        const newUser = {
            username,
            displayname,
            email,
            password,
        };
        dispatch(postSignup(newUser));
    }

    useEffect(()=>{
        setIsLoading(signUpState.isLoading);
        setSuccess(signUpState.success);
        setErrMsg(signUpState.errMsg);
    },[signUpState]);


    return (
        <>
            <SignUpButtonRow
                backFunc={backFunc}
                submitFunc={() => { }}
                message={errMsg}
            />
            <Row className='justify-content-center'>
                <Col lg='6' xl='4'>
                    <SignUpForm
                        clickCancel={backFunc}
                        handleSubmit={handleSubmit}
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