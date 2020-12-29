import React, { useCallback, useReducer } from 'react'
import axios from '../../config/config'
// import axios from 'axios'
// import {Col,Form, FormGroup, Button, Input, Toast, ToastBody, ToastHeader} from 'reactstrap'

import Input from '../ui/Input'
import Button from '../ui/Button'

import '../css/Auth.css'
import '../css/Button.css'

import {VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MIN} from '../../util/validators'

const loginReducer = (state, action) => {
    switch(action.type){
        case 'INPUT_CHANGE':
            let formIsValid = true
            for(const inputId in state.inputs){
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
        default: 
            return state;
    }
}

const Login = props => {

    const [formState, dispactchLoginForm] = useReducer(loginReducer, {
        inputs: {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        formIsValid: false
    })

    const inputHandler = useCallback((id, value, isValid) => {
        dispactchLoginForm({
            type: 'INPUT_CHANGE',
            value, isValid, inputId: id
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
        }

        axios({
            url: '/users/login',
            method: 'POST',
            data: formData
        })
        .then(user => {
            if(user.data.errors){
                console.log("user logged errors", user)
            }else{
                localStorage.setItem('userAuthToken', user.data.token)
                props.history.push('/account')
            }
        })
        .catch(error => {
            console.log("logged in error is ", error)
        })

    }

    return (
        <form onSubmit = {handleSubmit} className = "login-form">
            <Input 
                type = "text"
                id = "email"
                placeholder = "Enter email"
                element = "input"
                label = "Email"
                onInput = {inputHandler}
                errorText = "Please enter valid email."
                validators = {[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            />

            <Input 
                type = "password"
                id = "password"
                placeholder = "Enter password"
                element = "input"
                label = "Password"
                onInput = {inputHandler}
                errorText = "Please enter valid password."
                validators = {[VALIDATOR_REQUIRE(), VALIDATOR_MIN(6)]}
            />

                <Button type="submit" size = "small" disabled={!formState.formIsValid}>
                    Login
                </Button>
        </form>
    )
}

export default Login;

/*

class Login extends React.Component {
    constructor(){
        super()
        this.state = {
            user: {},
            token: "",
            email: "",
            password: ""
        }
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password: this.state.password
        }

        axios({
            url: '/users/login',
            method: 'POST',
            data: formData
        })
        .then(user => {
            if(user.data.errors){
                console.log("user logged errors", user)
            }else{
                localStorage.setItem('userAuthToken', user.data.token)
                // this.props.handleIsAuthenticated(true)
                this.props.history.push('/account')
            }
        })
        .catch(error => {
            console.log("logged in error is ", error)
        })

    }

    render(){
        return(
            <Toast>
                <ToastHeader>
                    <h4>Login Form</h4>
                </ToastHeader>
                <ToastBody>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Col size="3">
                                <Input type="email" name="email" onChange={this.handleChange} placeholder="Enter your email"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col size="3">
                                <Input type="password" name="password" onChange={this.handleChange} placeholder="Enter your password"/>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col sm={{size: 3, offset: 0}}>
                                <Button size ="sm" outline color="primary">Login</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </ToastBody>
            </Toast>
        )
    }
}
*/