import React from 'react'

import { useSelector } from 'react-redux'

import '../css/Auth.css'

const Account = () => {
    
    const user = useSelector(state => state.user)

    return(
        <div className="account_info">
            <h2>Account Information</h2>
            
            {
                user.image && <img src={require(`../../${user.image.replace("client/src/","")}`)} alt="Logo" width="200px" height="200px"/>
            }
            <h4>Name : {user && user.name}</h4>
            <h6>Email : {user && user.email}</h6>
            <h6>Phone : {user && user.mobile}</h6>
        </div>
    )
}

export default Account;


/*class Account extends React.Component {

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
                const data = response.data 
                console.log("DATA", data.image)
                 this.props.dispatch(setUser(response.data))
            })
            .catch(error => {
                console.log("error", error)
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
        return(
            <div className="account_info">
                <h2>Account Information</h2>
                
                {
                    this.props.user.image && <img src={require(`../../${this.props.user.image.replace("client/src/","")}`)} alt="Logo" width="200px" height="200px"/>
                }
                <h4>Name : {this.props.user && this.props.user.name}</h4>
                <h6>Email : {this.props.user && this.props.user.email}</h6>
                <h6>Phone : {this.props.user && this.props.user.mobile}</h6>
{                    <div className="col-sm-4">
                        <form onSubmit={this.handleSubsmit} >
                            <h3>Change Profile</h3>
                            <label>
                            <input type="file" name="image" onChange={this.handleUpload} multiple/>

                            </label>
                            <label>
                                <input type="submit" className="btn btn-primary btn-sm" value="Upload" />
                            </label>
                        </form>
                    </div>}
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {user: state.user}
}

export default connect(mapStateToProps)(Account);*/