import * as React from 'react';
import {Button,Card,CardContent,CardMedia,Typography,CardActionArea,CardActions} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function ProductCards({ products }) {
  return (
    <Card sx={{ maxWidth: 260, margin: 2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={products.thumbnail}
          alt={products.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {products.title} 
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {products.description.slice(0, 60)}... 
          </Typography>
          <Typography variant="body1" sx={{ color: 'green', marginTop: 1 }}>
            ${products.price} 
          </Typography>
        </CardContent>
      </CardActionArea>
       <CardActions sx={{ justifyContent: 'center' }}>
        <Button
        startIcon={<ShoppingCartIcon/>}
          variant="contained"
          color="primary"
          onClick={() => alert(`You bought ${products.title}!`)}
        >
          Buy
        </Button>
      </CardActions>
    </Card>
  );
}






