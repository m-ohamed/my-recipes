import React from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component
{
    render()
    {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">My Recipes</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Recipes List</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/add" className="nav-link">Add Recipe</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}