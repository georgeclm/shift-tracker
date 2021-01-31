// import the component and link from the dom to link the item
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// create the name class for the route
import axios from 'axios';
export default class CreateUsers extends Component {
    constructor(props){
        super(props);
        /* use the bind method to make sure this function is from this.state inside this CreateExercises Class to refer to this class */
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username : '',
        }
    }
    onSubmit(e){
        /*as usual prevent the default submit behavior */
        e.preventDefault();
        const user = {
            username: this.state.username,

        }
        console.log(user);
        /*use this axios by using post data and the link, and then the user data inside to the backend  */
        /*take 2 parameter first axios.(themethod) then inside pass the parameter and if post then pass the data to the backend to read */
        axios.post('http://localhost:5000/users/add', user)
            .then(res =>console.log(res.data));
        /*redirect system using this window location to the '/' or homepage */
        this.setState({
            username: ""
        })
    }
    onChangeUsername(e){
        this.setState({
            /* to set the username value to the value inside the input using target and this only update inside the state */
            username:e.target.value
        })
    }

    render(){
        return(
            <div>
                <h3>
                    <Link to="/">Shifts</Link>
                    <span class="breadcrumb-sep ml-1 mr-1">/</span>
                    Create New Shift
                    </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Username</label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-outline-dark" />
                    </div>
                </form>
            </div>
        )
    }
}