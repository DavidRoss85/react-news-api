const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
//const fullPasswordRegEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
const upperCaseRegEx = /^(?=.*?[A-Z]).{1,}$/;
const lowerCaseRegEx = /^(?=.*?[a-z]).{1,}$/;
const minEightRegEx = /^.{8,}$/;
const numberRegEx = /^(?=.*?[0-9]).{1,}$/;
const specCharRegEx = /^(?=.*?[#?!@$ %^&*-]).{1,}$/;

export const validateUserLoginForm = (values) => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Username is required';
    } else if (values.username.length < 3 || values.username.length > 40) {
        errors.username = 'Username must be between 3 and 40 characters long';
    }

    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    }

    return errors;
};

export const validateUserAccountForm = (values) => {
    const errors = {};
    //username
    if (!values.username) {
        errors.username = 'Username is required'
    } else if (values.username.length < 3 || values.username.length > 40) {
        errors.username = 'Username must be between 3 and 40 characters long';
    };
    //display name
    if (values.displayname.length < 2 || values.displayname.length > 25) {
        errors.displayname = 'Display name must be between 2 and 25 characters long';
    };
    //email
    if (!values.email) {
        errors.email = 'Email is required'
    }
    else if (!emailRegEx.test(values.email)) {
        errors.email = 'Invalid email address';
    };
    //password
    if (!values.password) {
        errors.password = 'Password is required: Must have a minimum eight characters, at least one upper case English letter, at least one lower case English letter, one number, and one of these special characters: #?!@$ %^&*-';
    } else {// password checking
        let errArray = [];
        //Used ternary operators with an empty function instead of if statements because I'm lazy
        minEightRegEx.test(values.password)===false ?
            errArray.push('a minimum eight characters') : (() => { })();

        upperCaseRegEx.test(values.password)===false ?
            errArray.push('at least one upper case English letter') : (() => { })();
    
        lowerCaseRegEx.test(values.password)===false ?
            errArray.push('at least one lower case English letter') : (() => { })();

        numberRegEx.test(values.password)===false ?
            errArray.push('one number') : (() => { })();

        specCharRegEx.test(values.password)===false ?
            errArray.push('one of these special characters: #?!@$ %^&*-') : (() => { })();

        if (errArray.length > 0) {
            //Add the word 'and' if there's more than one condition present:
            const i = errArray.length - 1
            i > 2 ? errArray[i] = 'and ' + errArray[i] : errArray[i] = errArray[i];
            //set the error message:
            errors.password = 'Password must have ' + errArray.join(', ')
        }
    };
    //confirm password
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm your new password';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords must match';
    };
    return errors;
}