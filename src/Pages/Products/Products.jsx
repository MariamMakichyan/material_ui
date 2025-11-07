
import ProductCards from '../../Components/ProductCard/ProductCards'
import {Box} from '@mui/material';

const Products = ({products, addToCart}) => {

  return (
    <Box style={{display: 'flex',flexWrap: 'wrap', alignItems: 'stretch',
      justifyContent: 'flex-start',gap: '10px',padding: '10px',
      
    }}>
      {Array.isArray(products) && products.map((product) => (
        <ProductCards key={product.id}addToCart={addToCart} products={product} />
      ))}
    </Box>
  )
}

export default Products
