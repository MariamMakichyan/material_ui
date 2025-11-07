import * as React from 'react';
import {Button,Card,CardContent,CardMedia,Typography,CardActionArea,CardActions,Box} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';

export default function ProductCards({ products }) {
  return (
    <Card  sx={{
    maxWidth: 260,margin: 2,display: 'flex',
    flexDirection: 'column',justifyContent: 'space-between', 
  }}
>
    <Box
    component={NavLink}
    to={`/products/${products.id}`}
    sx={{textDecoration:"none"}}
    >
        <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={products.thumbnail}
          alt={products.title}
        />
        <CardContent >
          <Typography gutterBottom variant="h6" component="div"
           sx={{ color: 'black' }}>
            {products.title.slice(0, 17)}...
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {products.description.slice(0, 60)}... 
          </Typography>
          <Typography variant="body1" sx={{ color: 'green', marginTop: 1 }}>
            ${products.price} 
          </Typography>
        </CardContent>
      </CardActionArea>
    </Box>
       <CardActions sx={{ justifyContent: 'center' }}>
        <Button
        startIcon={<ShoppingCartIcon/>}
          variant="contained"
          sx={{ background: 'green', }}
          
        >
          Buy
        </Button>
      </CardActions>
    </Card>
  );
}






