import NavAppBar from "../components/Navbar";
import React, {useEffect, useState} from 'react';
import {Recipe} from "../models/recipe";
import {baseUri} from "../constant";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import RecipeCard from "../components/RecipeCard";

export default function Favorites() {
    const [favRecipes, setFavRecipes] = useState<Array<Recipe>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    const favToggle = (recipe: Recipe) =>  {
        setFavRecipes((prevRecipes) => prevRecipes.filter((rec) => rec.id !== recipe.id));
    }

    useEffect(() => {
        // Replace this URL with the actual API endpoint you want to fetch data from
        const fetchRecipes = async () => {
            try {
                const endpoint = `${baseUri}/recipes/favorites/`;
                const response = await fetch(endpoint, {mode:'cors'});

                const data = await response.json();

                setFavRecipes(data["recipes"]);

            } catch (error: any) {
                setError(`An error occurred while fetching recipes: ${error.message}`);  // Set error message
                console.error(error);
            } finally {
                setLoading(false);  // Set loading to false after the data is fetched
            }
        };

        fetchRecipes();
    }, []);


    return (
        <div>
            <NavAppBar activeItem="Favorites"/>
            {loading ? (
                <div style={styles.loadingContainer}>
                    <CircularProgress color="secondary" thickness={3} size={80} />
                </div>
            ) : error ? (
                <div style={styles.errorContainer}>
                    <Alert severity="error">{error}</Alert>
                </div>
            ) : favRecipes.length === 0 ? (
                <div style={styles.emptyContainer}>
                    <Typography variant="h6">No Favorites Found, Please Add</Typography>
                </div>
            ) :(
                <div style={styles.gridContainer}>
                    {

                        favRecipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} onFavoriteToggle={favToggle} />
                        ))

                    }
                </div>
            )}

        </div>
    )


}

const styles = {
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '40px',
        padding: '40px',
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',  // Make the spinner vertically centered
    },
    errorContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',  // Center the error message as well
    },
    emptyContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',  // Center the empty message
    }
}

