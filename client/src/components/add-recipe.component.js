import React from 'react';
import axios from 'axios';

export default class AddRecipe extends React.Component
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

        this.handleChange = this.handleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event)
    {
        const {name, value} = event.target;

        this.setState
        ({
            [name]: value
        });
    }

    handleImageChange(event)
    {
        this.setState
        ({
            image: event.target.files[0]
        });
    }

    handleSubmit(event)
    {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", this.state.recipename);
        formData.append("ingredients", this.state.ingredients);
        formData.append("recipe", this.state.recipe);
        formData.append("image", this.state.image);

        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        };

        axios.post('http://localhost:8080/recipes/add', formData, config)
            .then(res => alert(res.data))
            .catch(err => alert('Error adding recipe. Error: ' + err));

        window.location = '/';
    }

    render()
    {
        return (
        <div className="d-flex justify-content-center">
            <div>
                <h3>Add new recipe</h3>
                <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="img">Image: </label>
                        <input 
                            type="file" 
                            id="img"
                            filename="image"
                            accept="image/*"
                            className="form-control"
                            onChange={this.handleImageChange}
                            required />
                    </div>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input 
                            type="text" 
                            name="recipename"
                            size="50"
                            className="form-control"
                            value={this.state.recipename}
                            onChange={this.handleChange}
                            required />
                    </div>
                    <div className="form-group">
                        <label>Ingredients: </label>
                        <textarea 
                            type="text" 
                            name="ingredients"
                            className="form-control"
                            value={this.state.ingredients}
                            onChange={this.handleChange}
                            required />
                    </div>
                    <div className="form-group">
                        <label>Recipe: </label>
                        <textarea 
                            type="text" 
                            name="recipe"
                            className="form-control"
                            value={this.state.recipe}
                            onChange={this.handleChange}
                            required />
                    </div>
                    <div className="form-group" style={{textAlign: "center"}}>
                        <input type="submit" value="Add" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>
        );
    }
}