import { useCallback, useReducer } from 'react'

const formReducer = (state, action) => {
    switch(action.type){
        case 'INPUT_CHANGE':
            let formIsValid = true
            for(const inputId in state.inputs){
                if(!state.inputs[inputId]){
                    continue
                }
                if(inputId === action.inputId){
                    formIsValid = formIsValid && action.isValid
                }else{
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                }
            }

            let updatedState = {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                formIsValid
            }
            return updatedState;
        case 'SET_DATA':
            return {
                ...state,
                inputs: action.inputs,
                formIsValid: action.formIsValid
            }
        default: 
            return state;
    }
}


export const useForm = (initialInputs, initialFormValidity) => {

    const [formState, dispactchLoginForm] = useReducer(formReducer, {
        inputs: initialInputs,
        formIsValid: initialFormValidity
    })

    const inputHandler = useCallback((id, value, isValid) => {
        dispactchLoginForm({
            type: 'INPUT_CHANGE',
            value, isValid, inputId: id
        })
    }, [])

    const setFormData = useCallback((inputData, formIsValid) => {
        dispactchLoginForm({
            type: 'SET_DATA',
            inputs: inputData,
            formIsValid
        })
    }, [])

    return [formState, inputHandler, setFormData]
}