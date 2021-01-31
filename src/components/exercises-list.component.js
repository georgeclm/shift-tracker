// import the component and link from the dom to link the item
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
/*create exercise variable but store it as components  */
/*in this function to loop every props that is being passed and create the table for each props and button to edit and to delete by link it and take the id */
// this is the functional component only to accept props and return the table
// this is the model to loop inside the function
// use substiring to only take 10 value from top
// inside the link create onclick function to execute the deleteexercise inside it
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration} Minutes</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
        <Link to={"/edit/"+props.exercise._id}><button className="btn btn-outline-light">Edit</button></Link> <button className="btn btn-outline-danger float-right" onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</button>
        </td>
    </tr>
)
// create the name class for the route
// this is the class component
export default class ExercisesList extends Component {
    constructor(props){
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.state ={
            exercises:[]
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/exercises')
            .then(response =>{
                /*on this one take all the field */
                this.setState({exercises:response.data})
            })
            .catch((error)=>{
                console.log(error);
            })
    }
    /*to delete take the id inside the function */
    deleteExercise(id) {
        /*delete request and for the url take the id */
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(response => { console.log(response.data)});
        /*after delete the exercise then delete the element inside the table  */
        /*by using this setstate this will automaticly change the value inside after executing the code  */
        /*return a filtered system where in this element where the id is not the same as id that are being passed */
        /* this use _id because in mongoDB they store the id as _id and compare all the exercises id and only return where the id is different */
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }
    exerciseList() {
        /* this is the function that is called inside the table body */
        /* this return all exercises and use map to loop for each exercise return the Exercise component and take the current, delete and the key is the id */
        return this.state.exercises.map(currentexercise => {
          return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <h3 className="mb-4">Shifts</h3>
                    <div className="ml-auto">
                        <Link to={"/create"}><button className="btn btn-outline-dark">Add New Shift</button></Link>
                    </div>
                </div>
                <table className="table table-dark table-hover">
                    <thead className="thead-light">
                        <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody className="tbody-dark">
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}