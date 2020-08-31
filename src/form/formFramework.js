export const createControl = (config, validation) => {
    return {
        ...config, // label + errorMessage
        validation,// required
        valid: !validation,
        touched: false,
        value: ''
    }
}

export const validateControl = (value, validation) => {
    if (!validation) return true;

    let isValid = true;

    if (validation.required) {
        isValid = value.trim() !== '' && isValid;
    }

    return isValid;
}

export const validateForm = formControls => {
    let isFormValid = true;

    Object.keys(formControls).forEach(control => {
        isFormValid = formControls[control].valid && isFormValid;
    })

    return isFormValid;
}