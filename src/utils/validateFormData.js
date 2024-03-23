const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

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

export const validateUserAccountForm = (values)=>{
    const errors ={};
    //username
    if(!values.username) {
        errors.username = 'Username is required'
    } else if (values.username.length < 3 || values.username.length > 40) {
        errors.username = 'Username must be between 3 and 40 characters long';
    };
    //display name
    if (values.displayname.length < 2 || values.displayname.length > 25) {
        errors.displayname = 'Display name must be between 2 and 25 characters long';
    };
    //email
    if(!values.email) {
        errors.email = 'Email is required'
    } 
    else if (!emailRegEx.test(values.email)) {
        errors.email = 'Invalid email address';
    };
    //password
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    };
    //confirm password
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm your new password';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords must match';
    };
    return errors;
}