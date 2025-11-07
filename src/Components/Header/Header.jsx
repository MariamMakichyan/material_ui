import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import { NavLink } from 'react-router-dom';import { styled } from '@mui/material/styles';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';

const pages = [
  { title: "Home", path: "/" },
  { title:"Products", path: "/products"}

];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar sx={{ backgroundColor: "rgb(86 87 87 / 70%)" }} position="sticky">
      <Container maxWidth="1500">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to={"/"}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              textShadow:"#f4f4f4 -1px 0px 7px",
              padding:"6px"
              
            }}
          >
            SHOP PAGE
          </Typography>

          <Box sx={{ flexGrow: 1, justifyContent: 'space-evenly', display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
              component={NavLink}
              to={page.path}
                key={page.title}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' , fontSize:'15px'}}
              >
                {page.title}
              </Button>
            ))}
          </Box>
<Box
component={NavLink}
to="/cart"
>
            
<IconButton>
      <ShoppingCartIcon fontSize="10px" />
      <CartBadge badgeContent={7} color="primary" overlap="circular" />
    </IconButton>
</Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
