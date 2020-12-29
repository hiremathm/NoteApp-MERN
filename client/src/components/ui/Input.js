import React, { useReducer, useEffect } from 'react'
import '../css/Input.css'
import { validate } from '../../util/validators'

const inputReducer = (state, action) => {
	switch(action.type) {
		case 'CHANGE': 
			return {
				...state,
				value: action.value,
				isValid: validate(action.value, action.validators)
			}
		case 'TOUCH': 
			return {
				...state,
				isTouched: true
			}
		default: 
			return state
	}
}

const Input = (props) => {
		
	const initialState = {value: '', isValid: false, isTouched: false}

	const [inputState, dispatch] = useReducer(inputReducer, initialState)
	
	const inputChangeHandler = event => {
		dispatch({
			type: 'CHANGE',
			value: event.target.value,
			validators: props.validators
		})
	}

	const touchHandler = () => {
		dispatch({
			type: 'TOUCH'
		})
	}

	const {id, onInput} = props
	const {value, isValid} = inputState

	useEffect(() => {
		onInput(id, value, isValid)
		
	}, [id, value, isValid, onInput])

	const element = props.element === 'input' ? (<input 
			type = {props.type} 
			id = {props.id}
			placeholder = {props.placeHolder}
			className={`form-control`}
			onChange = {inputChangeHandler}
			value = {inputState.value}
			onBlur = {touchHandler}
		/>) : (<textarea 
			id = {props.id}
			rows = {props.rows}
			className={`form-control`}
			onChange = {inputChangeHandler}
			value = {inputState.value}
			onBlur = {touchHandler}
		/>)

  return (
		<div className ={!inputState.isValid && inputState.isTouched && 'form-control--invalid'}>
  		<label htmlFor={props.id}>{props.label}</label>
  		{element}
  		{!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
		</div>
  );
}

export default Input;