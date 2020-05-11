import React from 'react'
import {Col,Form, FormGroup, Button, Input, Toast, ToastBody, ToastHeader} from 'reactstrap'
import Axios from 'axios'

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

        Axios({
            url: 'http://localhost:3002/users/login',
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

export default Login;