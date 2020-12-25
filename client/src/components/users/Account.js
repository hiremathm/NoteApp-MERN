import React from 'react'
// import axios from '../../config/config'
import axios from 'axios'
import {connect} from 'react-redux'

import {setUser} from '../../actions/user'
import {setNotes} from '../../actions/note'

class Account extends React.Component {

    constructor(){
        super()
        this.state ={
            // user: {}
            images: [],
            image: {}
        }
    }

    componentDidMount = () => {
        const token = localStorage.getItem("userAuthToken")
        const url = "/users/account"
        if(token){
            axios({
                method: 'post',
                url: url,
                data: {},
                headers: {"x-auth": localStorage.getItem('userAuthToken')}
            })
            .then(response => {
                // this.setState({user: response.data})
                const data = response.data 
                data['image']  = '../../images/8c55fc47bc85ff21e09980d1c96d5565'
                 this.props.dispatch(setUser(response.data))
                // this.props.history.push('/notes')
            })
            .catch(error => {
                console.log("error", error)
            })

            axios.get('/notes',{"headers": {"x-auth": localStorage.getItem('userAuthToken')}})
            .then(response => {
                // this.setState({notes: response.data})
                console.log("account notes", response.data)
                this.props.dispatch(setNotes(response.data))
            })
            .catch(error => {
                console.log("error", error)
                // this.setState({notes: []})
            })
        }
    }

    handleUpload = (event) => {
        let images = []
        for (var i = 0; i < event.target.files.length; i++) {
            images[i] = event.target.files.item(i);
        }
        images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
        this.setState({images: images})
    }

    handleSubsmit = (e) => {
        e.persist()
        e.preventDefault()
        const imagesss = this.state.images
        const data = new FormData();
        data.append("image", imagesss[0], imagesss[0].name);

        axios.post('/upload/image', data)
            .then(response => {
                const image = response.data
                this.setState({image})
            })
            .catch(error => {
                console.log('error', error)
            })
    }

    render(){     
        // console.log('images',this.state.image.path)
        return(
            <div>
                <div className="row">
                    <div className="col-sm-5">
                        <h2>Account Information</h2>
                        
                        {
                           <img src={require(`../../images/03221f0fc7631f5585a88ffef1fc096d`)} alt="Logo" width="350px" height="200px"/>
                            // this.props.user.image && (<img src={require(`${this.props.user.image}`)} alt="Logo" width="350px" height="200px"/>)
                        }
                        <h4>Name : {this.props.user && this.props.user.name}</h4>
                        <h6>Email : {this.props.user && this.props.user.email}</h6>
                        <h6>Phone : {this.props.user && this.props.user.mobile}</h6>
                    </div>
                    <div className="col-sm-4">
                        <form onSubmit={this.handleSubsmit} >
                            <h3>Change Profile</h3>
                            <label>
                            <input type="file" name="image" onChange={this.handleUpload} multiple/>

                            </label>
                            <label>
                                <input type="submit" className="btn btn-primary btn-sm" value="Upload" />
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {user: state.user}
}

export default connect(mapStateToProps)(Account);