// import the component and link from the dom to link the item
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// create the name class for the route
export default class Navbar extends Component {
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-white">
                <div className="container-fluid">                
                    <h3><Link to="/" className="navbar-brand">Shift Tracker</Link></h3>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <h6><Link to="/user" className="nav-link">Create Worker</Link></h6>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
        )
    }
}