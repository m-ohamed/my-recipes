import React from 'react';
import axios from 'axios';

export default class EditRecipe extends React.Component
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    componentDidMount()
    {
        axios.get('/recipes/getRecipe/' + this.props.match.params.id)
            .then(res =>
                {
                    this.setState
                    ({
                        recipename: res.data.name,
                        ingredients: res.data.ingredients,
                        recipe: res.data.recipe,
                        image: res.data.image,
                        hasImageChanged: false
                    });
                })
            .catch(err =>
                {
                    alert('Error while getting the recipe to edit. Error: ' + err);
                });
    }

    handleImageChange(event)
    {
        if(event.target.files[0])
        {
            this.setState
            ({
                image: event.target.files[0],
                hasImageChanged: true
            });
        }
    }

    handleChange(event)
    {
        const {name, value} = event.target;

        this.setState
        ({
            [name]: value
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
        formData.append("hasImageChanged", this.state.hasImageChanged);

        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        };

        axios.post('/recipes/update/' + this.props.match.params.id, formData, config)
            .then(res => alert(res.data))
            .catch(err => alert('Error editing recipe. Error: ' + err));

        window.location = '/';
    }

    render()
    {
        return (
            <div className="d-flex justify-content-center">
            <div>
                <h3>Update recipe</h3>
                <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <div style={{textAlign: "center"}}>
                        <img src={this.state.image} width="300" alt='Recipe' hidden={this.state.hasImageChanged}></img>
                    </div>
                    <div className="form-group" style={{textAlign: "center"}}>
                        <input 
                            type="file" 
                            id="image"
                            filename="image"
                            accept="image/*"
                            className="form-control"
                            onChange={this.handleImageChange}
                            />
                    </div>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input 
                            size="50"
                            type="text" 
                            name="recipename"
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
                        <input type="submit" value="Update" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>
        );
    }
}