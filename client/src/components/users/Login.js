import React, { useState, useContext} from 'react'
import { useForm } from '../../hooks/form-hook'
import axios from '../../config/config'
// import axios from 'axios'
// import {Col,Form, FormGroup, Button, Input, Toast, ToastBody, ToastHeader} from 'reactstrap'

import Input from '../ui/Input'
import Button from '../ui/Button'
import Card from '../ui/Card'

import '../css/Auth.css'
import '../css/Button.css'
import {VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MIN} from '../../util/validators'


import {AuthContext} from '../../context/AuthContext'

/*const loginReducer = (state, action) => {
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
*/
const Login = props => {
    const [isLogin, setIsLogin] = useState(true)
    const [isInvalidInput, setInvalidInput] = useState(false)
    const [invalidInputError, setInvalidInputError] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const [formState, inputHandler, setFormData] = useForm({
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        }, false)

    const auth = useContext(AuthContext)

/*    const [formState, dispactchLoginForm] = useReducer(loginReducer, {
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
*/
    const handleSubmit = (e) => {
        e.preventDefault()

        let formData = {}

        if(isLogin){
            formData = {
                email: formState.inputs.email.value,
                password: formState.inputs.password.value
            }
        }else{        
            formData = {
                email: formState.inputs.email.value,
                password: formState.inputs.password.value,
                name: formState.inputs.name.value,
                mobile: "0123456789"
            }
        }


        let url = ""
        if (isLogin){
            url = "/users/login"
        }else{
            url = "/users"
        }

        setIsLoading(true)

        axios({
            url: url,
            method: 'POST',
            data: formData
        })
        .then(user => {
            if(user.data.errors){
                setInvalidInput(true)
                setInvalidInputError(user.data.errors)
                console.log("user logged errors", user.data.errors)
                setIsLoading(false)
            }else{
         
                if (isLogin){
                    localStorage.setItem('userAuthToken', user.data.token)
                    auth.login()
                    props.history.push('/notes')
                }else{
                    console.log("SIGNUP RESPONSE", user)
                    setIsLogin(true)
                }
            }
        })
        .catch(error => {
            console.log("logged in error is ", error)
            setIsLoading(false)
        })
    }


    const changeAuthHandler = () => {
        if(!isLogin){
            setFormData({
                ...formState.inputs,
                name: {
                    value: 'Guest',
                    isValid: false
                }
            },formState.inputs.email.isValid && formState.inputs.password.isValid)
        }else{
            setFormData({
                ...formState.inputs,
                name: {
                    value: 'Guest',
                    isValid: false
                }
            },false)
        }
        setIsLogin(!isLogin)
    }

    return (
        <>
            <Card className = "authentication">
            {isInvalidInput ? <p>{invalidInputError}</p> : null}
            <form onSubmit = {handleSubmit}>
                <h4>{`${isLogin ? 'LOGIN' : 'SIGNUP'}`}</h4>
                <hr/>
                {!isLogin && (
                    <Input 
                        type = "text"
                        id = "name"
                        placeholder = "Enter Username"
                        element = "input"
                        label = "Username"
                        onInput = {inputHandler}
                        errorText = "Please enter valid username of minimum length 5."
                        validators = {[VALIDATOR_REQUIRE(),VALIDATOR_MIN(5)]}
                    />
                )}

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
                    {`${isLogin ? 'LOGIN' : 'SIGNUP'}`}
                </Button>
            </form>
            <Button size ="small" onClick = {changeAuthHandler}>SWITCH TO {`${isLogin ? 'SIGNUP' : 'LOGIN'}`}</Button>
            </Card>
        </>
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