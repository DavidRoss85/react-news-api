export const validateSearchCriteria = (values) => {
    const errors = {}

    if (!values.username) {
        errors.username = 'Username is required.';
    } else if (values.username.length < 3 || values.username.length > 40) {
        errors.username = 'Username must be between 3 and 40 characters long.';
    }

    if (!values.password) {
        errors.password = 'Password is required.';
    } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long.';
    }

    return errors;
}