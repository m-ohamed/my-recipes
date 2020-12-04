import React from 'react';
import { Link } from 'react-router-dom';

const Recipe = props =>
(
    <tr>
        <td><img src={props.recipe.image} width="50" alt='Recipe'></img></td>
        <td><Link type="text" to={'/view/' + props.recipe._id}>{props.recipe.name}</Link> </td>
        <td><Link type="button" className="btn btn-primary" to={'/edit/' + props.recipe._id}>EDIT</Link> 
        <button style={{marginLeft: "15px"}} type="button" className="btn btn-danger" onClick={() => props.deleteRecipe(props.recipe._id)}>DELETE</button></td>
    </tr>
);

export default Recipe;