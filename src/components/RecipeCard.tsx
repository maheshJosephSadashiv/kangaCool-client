import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Recipe} from "../models/recipe";
import {baseUri} from "../constant";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ListItemIcon from '@mui/material/ListItemIcon';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeCard(props: {recipe: Recipe, onFavoriteToggle: (recipe: Recipe)=> void}) {
    const [expanded, setExpanded] = React.useState(false);
    const [presentrecipe, setPresentRecipe] = React.useState<Recipe>(props.recipe)



    const favoriteToggle = async (presentRecipe: Recipe) => {
        const endpoint = `${baseUri}/recipes/favorite/${presentRecipe.id}/`;
        const response = await fetch(endpoint, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ is_favorite: !presentRecipe.is_favorite })
        });
        const data = await response.json();

        setPresentRecipe((prevState) => ({
            ...prevState,
            is_favorite: !prevState.is_favorite
        }));
        props.onFavoriteToggle(presentRecipe);

        console.log(data);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardHeader
                title={presentrecipe.title}
                subheader={presentrecipe.cuisine}
                style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}/>
            <CardMedia
                component="img"
                height="350"
                image={presentrecipe.image_url}
                alt="Paella dish"
            />
            <CardContent>
                {/*add elipses*/}
                <Typography variant="body2" color="text.secondary" style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>
                    {presentrecipe.ingredients.join(", ")}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={() => favoriteToggle(presentrecipe)}>
                    <FavoriteIcon color={ presentrecipe.is_favorite ? "secondary" : "action"} />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography variant="h6" gutterBottom>
                    Instructions
                </Typography>
                <List>
                    {presentrecipe.instructions.map((instruction, index) => (
                        <ListItem key={index} sx={{ alignItems: 'flex-start' }}>
                            <ListItemIcon>
                                <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <Typography variant="body1" color="textPrimary">
                                {instruction}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </Card>
    );
}

const styles = {
    multiLineEllipsis: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical"
    }
};