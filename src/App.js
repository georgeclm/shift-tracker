// the route is this app is being loaded inside the index.js app that load inside index.html
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// this for all the component that is going inside the app that have been created
import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercises from "./components/edit-exercises.component";
import CreateExercises from "./components/create-exercises.component";
import CreateUsers from "./components/create-users.component";
// use exact to make that is the homepage and current active component
function App() {
  return (
    <Router>
        <Navbar />

      <div className="container">
        <br/>
        <Route path="/" exact component={ExercisesList}/>
        <Route path="/edit/:id" component={EditExercises}/>
        <Route path="/create" component={CreateExercises}/>
        <Route path="/user" component={CreateUsers}/>
      </div>
    </Router>
  );
}

export default App;
