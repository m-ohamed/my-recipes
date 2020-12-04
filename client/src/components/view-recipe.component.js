import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class ViewRecipe extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = 
        {
            recipename: '',
            ingredients: '',
            recipe: '',
            image: ''
        };

        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount()
    {
        axios.get('http://localhost:8080/recipes/getRecipe/' + this.props.match.params.id)
            .then(res =>
                {
                    this.setState
                    ({
                        recipeId: res.data._id,
                        recipename: res.data.name,
                        ingredients: res.data.ingredients,
                        recipe: res.data.recipe,
                        image: res.data.image
                    });
                })
            .catch(err =>
                {
                    alert('Error while getting the recipe to edit. Error: ' + err);
                });
    }
    
    handleRemove()
    {
        axios.delete('http://localhost:8080/recipes/remove/' + this.state.recipeId)
            .then(res => 
            {
                alert(res.data);
                window.location('/');
            })
            .catch((err) => 
            {
                alert("Error while removing the recipe. Error: " + err);
            });
    }

    render()
    {
        return (
        <div className="d-flex justify-content-center">
            <div>
                <h3>View recipe</h3>
                <form>
                    <div className="form-group" style={{textAlign: "center"}}>
                        <img src={this.state.image} width="300" alt='Recipe'></img>
                    </div>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input size="50"
                            type="text" 
                            name="recipename"
                            className="form-control"
                            value={this.state.recipename}
                            disabled />
                    </div>
                    <div className="form-group">
                        <label>Ingredients: </label>
                        <textarea 
                            type="text" 
                            name="ingredients"
                            className="form-control"
                            value={this.state.ingredients}
                            disabled />
                    </div>
                    <div className="form-group">
                        <label>Recipe: </label>
                        <textarea 
                            type="text" 
                            name="recipe"
                            className="form-control"
                            value={this.state.recipe}
                            disabled />
                    </div>
                    <div className="form-group" style={{textAlign: "center"}}>
                        <Link type="button" className="btn btn-primary" to={'/edit/' + this.state.recipeId}>EDIT</Link>
                        <button type="button" style={{margin: "15px"}} className="btn btn-danger" onClick={() => this.handleRemove()}>DELETE</button>
                    </div>
                </form>
            </div>
        </div>
        );
    }
}