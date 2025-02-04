'use client'
import React from 'react'
import Container from '../widgets/container'
import Logo from './logo'
import Search from './search'
import UserMenu from './user-menu'
import { User } from '@prisma/client'
import Categories from './categories'

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className='w-full fixed bg-white z-10 shadow-sm'>
      <div
        className='
          py-4
          border-b-[1px]
        '
      >
        <Container>
            <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
              <Logo />
              <Search />
              <UserMenu currentUser={currentUser} />
            </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}

export default Navbar