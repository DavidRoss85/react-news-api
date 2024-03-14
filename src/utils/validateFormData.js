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
    if (values.displayName.length < 2 || values.displayName.length > 40) {
        errors.username = 'Display name must be between 2 and 40 characters long';
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