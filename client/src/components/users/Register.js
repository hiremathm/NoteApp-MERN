import React from 'react'
import Axios from 'axios'

import {Col,Form, FormGroup, Button, Input, Toast, ToastBody, ToastHeader} from 'reactstrap'

class Register extends React.Component {
    constructor(){
        super()
        this.state = {
            email: '',
            mobile: '',
            name: '',
            password: ''
        }
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    submitHandle = (e) => {
        e.preventDefault()

        let url = "http://localhost:3002/users"
        const formData = {
            name: this.state.name,
            mobile: this.state.mobile,
            email: this.state.email,
            password: this.state.password
        }
        
        Axios({
            method: 'post',
            url: url,
            data: formData
        })
        .then(response => {
            if(response.data.errors){
                console.log("errors", response)
            }else{
                this.props.history.push('/login')
            }
        })
        .catch(error => {
            console.log("error", error)
        })

    }

    render(){
        return (
            <div>
                <Toast>
                    <ToastHeader>
                        Register New User
                    </ToastHeader>
                    <ToastBody>
                        <Form onSubmit={this.submitHandle}>
                            <FormGroup row>
                                <Col sm={{size: 12, offset: 0}}>
                                    <Input type="text" name="name" placeholder="Enter your name " bsSize="sm" onChange={this.handleChange}/>
                                </Col>
                            </FormGroup >
                            <FormGroup row>
                                <Col sm={{size: 12, offset: 0}}>
                                    <Input type="email" name="email" placeholder="Enter your email " bsSize="sm" onChange={this.handleChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={{size: 12, offset: 0}}>
                                    <Input type="mobile" name="mobile" placeholder="Enter your mobile " bsSize="sm" onChange={this.handleChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={{size: 12, offset: 0}}>
                                    <Input type="password" name="password" placeholder="Enter your password " bsSize="sm" onChange={this.handleChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={{size: 12, offset: 0}}>
                                    <Button size ="sm" outline color="primary">Register</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ToastBody>
                </Toast>
                
            </div>
        )
    }
}

export default Register;