
import { UserButton } from '@clerk/nextjs'
import React, { useState } from 'react'
import {MainNav} from '@/components/main-nav'
import StoreSwitcher from '@/components/store-switcher'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import db from '@/lib/db'
import {MobileNav} from '@/components/mobile-nav'
import { Button } from './ui/button'
import { TornadoIcon } from 'lucide-react'

const Navbar = async () => {
    const {userId} =auth();

    if(!userId){
        redirect('/sign-in')
    }

    const stores = await db.store.findMany({
        where: {
            userId,
        }
    });
  return (
    <div className='border-b'>
        <div className='flex h-16 items-center px-4'>
            <StoreSwitcher items={stores} />
            <MainNav className='mx-6' />
            <div className='md:hidden'>
                <MobileNav />
            </div>
            <div className='max-md:hidden ml-auto flex items-center space-x-4'>
                <UserButton />
            </div>
        </div>
    </div>
  )
}

export default Navbar