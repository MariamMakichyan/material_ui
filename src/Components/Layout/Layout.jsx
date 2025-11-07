import React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'

const Layout = ({cartLenght}) => {
  return (
    <div>
      <Header cartLenght={cartLenght} />
      <Container maxWidth={1600}>
        <Outlet />
        </Container>

    </div>
  )
}

export default Layout