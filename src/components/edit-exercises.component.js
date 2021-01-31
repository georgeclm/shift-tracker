// import the component and link from the dom to link the item
import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


// create the name class for the route
// state to create variable inside react so when update state update the value on page
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
export default class EditExercises extends Component {

    constructor(props){
        super(props);
        /* use the bind method to make sure this function is from this.state inside this CreateExercises Class to refer to this class */
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            username : '',
            description : '',
            duration: 0,
            date: new Date(),
            /* users inside array because needed for drop down to store all the value inside the array */
            users:[]
        }
    }
    /*will be execute before the page load */
    componentDidMount(){
        /*this to take the exercises data to show the value inside that can be changed identical to the create exercise */
        axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                username: response.data.username,
                description: response.data.description,
                duration: response.data.duration,
                date: new Date(response.data.date)
                })   
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:5000/users/')
            .then(response =>{
                if(response.data.length> 0){
                    this.setState({
                        /*use the map to return value inside the 2d array from the database and take an array with some condition */
                        /* the condition is to take the username from the database column only, didnt need to take the other */
                        users:response.data.map(user=> user.username),
                    })
                }
            })
    }
    /*this is for everytime the input for username change execute this function */
    onChangeUsername(e){
        this.setState({
            /* to set the username value to the value inside the input using target and this only update inside the state */
            username:e.target.value
        })
    }
    onChangeDescription(e){
        this.setState({
            description:e.target.value
        })
    }
    onChangeDuration(e){
        this.setState({
            duration:e.target.value
        })
    }
    onChangeDate(date){
        this.setState({
            date:date
        })
    }
    onSubmit(e){
        /*as usual prevent the default submit behavior */
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise);
        /*to send the data to the backend link by using post method in axios */
        axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise)
            .then(res =>console.log(res.data));

        /*redirect system using this window location to the '/' or homepage */
        window.location ="/";
    }
    render(){
        return(
            <div>
                <h3>
                    <Link to="/">Shifts</Link>
                    <span class="breadcrumb-sep ml-1 mr-1">/</span>
                    Update Shift
                </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <select
                            className="form-control"
                            value={this.state.username}
                            required
                            onChange={this.onChangeUsername}
                        >
                        {   
                        /*use map to return value in array  */
                            this.state.users.map(function(user){
                                return<option
                                key={user}
                                value= {user}>{user}
                                </option>;
                            })
                        }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            required
                        />
                    </div>
                    <div className="form-group">
                    <label>Duration (in minutes)</label>
                    <input
                        type="text"
                        className="form-control"
                        value = {this.state.duration}
                        onChange = {this.onChangeDuration}
                        required
                    />
                    </div>
                    <div className="form-group">
                    <label>Date</label>
                    <div>
                        <DatePicker
                            selected={this.state.date}
                            onChange = {this.onChangeDate}
                        />
                    </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-outline-primary"/>
                    </div>

                </form>
            </div>
        )
    }
}