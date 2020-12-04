const router = require('express').Router();
const multer = require('multer');
// const upload = multer({ destination: './uploads/' });

const storage = multer.diskStorage(
{
    destination: (req, file, cb) =>
    {
        cb(null, './public/uploads/');
    },
    filename: (req, file, cb) =>
    {
        if(req.body)
            cb(null, req.body.name + file.originalname);
        else
            cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

let Recipe = require('../models/recipe.model');

router.route('/').get((req, res) =>
{
    console.log('Up and running');
});

router.route('/getAll').get((req, res) =>
{
    Recipe.find()
        .then(recipes => res.status(200).json(recipes))
        .catch(err => res.status(400).json('Error getting all recipes. Error: ' + err));
});

router.route('/getRecipe/:id').get((req, res) =>
{
    Recipe.findById(req.params.id)
        .then(recipe => res.status(200).json(recipe))
        .catch(err => res.status(400).json('Error getting recipe by id. Error: ' + err));
});

router.post('/add', upload.single("image"), (req, res) =>
{
    const recipeMod = new Recipe
    ({
        name: req.body.name,
        ingredients: req.body.ingredients,
        recipe: req.body.recipe,
        image: '/uploads/' + req.body.name + req.file.originalname
    });

    recipeMod.save()
        .then(() => res.status(200).json('Recipe added successfully.'))
        .catch((err) => res.status(500).json('Error adding the recipe (backend). Error: ' + err));
});

router.route('/remove/:id').delete((req, res) => 
{
    Recipe.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json('Recipe removed successfully.'))
        .catch((err) => res.status(500).json('Error removing the recipe. Error: ' + err));
});

router.post('/update/:id', upload.single("image"), (req, res) =>
{
    if(req.body.hasImageChanged == 'true')
    {
        Recipe.findByIdAndUpdate(req.params.id, 
            {
                name: req.body.name,
                ingredients: req.body.ingredients,
                recipe: req.body.recipe,
                image: '/uploads/' + req.body.name + req.file.originalname
            })
            .then(() => res.status(200).json('Recipe edited successfully.'))
            .catch((err) => res.status(500).json('Error editing the recipe. Error: ' + err));
    }
    else
    {
        Recipe.findByIdAndUpdate(req.params.id, 
            {
                name: req.body.name,
                ingredients: req.body.ingredients,
                recipe: req.body.recipe
            })
            .then(() => res.json('Recipe edited successfully.'))
            .catch((err) => res.status(500).json('Error editing the recipe. Error: ' + err));
    }
});

module.exports = router;