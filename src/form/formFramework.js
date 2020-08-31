export const createControl = (config, validation) => {
    return {
        ...config, // label + errorMessage
        validation,// required
        valid: !validation,
        touched: false,
        value: ''
    }
}