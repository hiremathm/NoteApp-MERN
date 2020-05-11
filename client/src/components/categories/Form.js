import React from 'react'

class Form extends React.Component {
    constructor(){
        super()
        this.state = {
            title: ''
        }
    }

    handleChange = (e) => {
        const title = e.target.value
        this.setState({title})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title: this.state.title
        }
        this.props.handleSubmit(formData)
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            title: nextProps.category.title
        })
    }

    render(){
        return(
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <label>
                        Title : <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
                    </label>
                    <br/><br/>
                    <label>
                        <input type="submit" value={this.props.submitValue ? this.props.submitValue : "Create Category"} readOnly/>
                    </label>
                </form>
            </div>
        )
    }
}

export default Form;