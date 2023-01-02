import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component
{
    render()
    {
        return(
            <div>
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to="/" className="navbar-brand">Order Tracker</Link>
                    <div className="navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/listuser" className="nav-link">Users List</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/create_order" className="nav-link">Create Order</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/create" className="nav-link">Create Exercise</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/user" className="nav-link">Create User</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/edit/:id" className="nav-link">Edit Exercise</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;