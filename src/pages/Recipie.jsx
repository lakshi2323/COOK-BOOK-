import React, { useEffect } from 'react'
import YouTube from 'react-youtube'
import '../styles/Recipe.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Recipe = () => {

  const {id} = useParams();

  const [recipe, setRecipe] = React.useState();


  useEffect(() => {
    fetchRecipe()
  }, [])
 
  const fetchRecipe = async () => {
    await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(response => {
        setRecipe(response.data.meals[0])
        console.log(response.data.meals[0])
      })
      .catch(error => console.error(error)); 
  }


  return (

    <>
    
      
        <div className='Recipe-page'>

      {recipe ?
          <>
          
              <div className="recipe-img">
                <img src={recipe.strMealThumb} alt="food-item" />
              </div>


              <div className="recipe-data-container">

                <div className="recipe-data">
                    <div className="recipe-header">
                      
                      <h4>{recipe.strMeal}</h4>
                      <div className="recipe-specials">
                          <p>{recipe.strArea && recipe.strArea}</p>
                          <p>{recipe.strCategory && recipe.strCategory}</p>
                      </div>
                    </div>

                    <div className="procedure">
                      <h5>Procedure</h5>
                      <p>{recipe.strInstructions}</p>
                    </div>

                    {
                      recipe.strYoutube !== "" &&

                        <div className="youtube-video-container">
                          <h5>Video Tutorial</h5>
                          <YouTube className='youtube-video'
                            videoId={recipe.strYoutube.slice(32)}
                            opts={{
                              height: '315',
                              width: '560',
                            }}
                          />
                        </div>
                    }
                    

                </div>

                <div className="ingredients-container">

                    <h3>Ingredients</h3>

                      <ul className="ingredients">

                      {Object.entries(recipe).map(([key, value]) => {
                          if (key.startsWith("strIngredient") && value) {
                            const ingredientNumber = key.slice("strIngredient".length);
                            const measure = recipe[`strMeasure${ingredientNumber}`] || "";

                            return (
                              <li key={key} className="ingredient">
                                <h5>{ingredientNumber} - {value}</h5>
                                <p>{measure}</p>
                              </li>
                            );
                          }
                          return null;
                      })}

                      </ul>

                </div>

              </div>


              
          </>

:"Loading..."}

      </div>
    </>
  )
}

export default Recipe
