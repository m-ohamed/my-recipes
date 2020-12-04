import React from 'react';
import axios from 'axios';
import Recipe from './recipe.component';

export default class RecipesList extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state =
        {
            recipes: []
        };

        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount()
    {
        axios.get('http://localhost:8080/recipes/getAll')
            .then(res => 
            {
                this.setState({recipes: res.data})
            })
            .catch((err) => 
            {
                console.log("Error while retrieving the list of recipes. Error: " + err);
            });
    }

    handleRemove(recipeId)
    {
        axios.delete('http://localhost:8080/recipes/remove/' + recipeId)
            .then(res => 
            {
                alert(res.data);
            })
            .catch((err) => 
            {
                alert("Error while removing the recipe. Error: " + err);
            });

        this.setState(prevState =>
        {
            return { recipes: prevState.recipes.filter(recipe => recipe._id !== recipeId) }
        });
    }

    recipeList()
    {
        return this.state.recipes.map(recipe =>
            {
                return <Recipe recipe={recipe} deleteRecipe={this.handleRemove} key = {recipe._id} />
            });
    }

    render()
    {
        return (
            <div>
                <h3>My Recipes</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Recipe Image</th>
                            <th>Recipe Name</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.recipeList() }
                    </tbody>
                </table>
            </div>
        );
    }
}