"use client"

import { cn } from '@/lib/utils'
import { Pixelify_Sans } from 'next/font/google'
import Image from 'next/image'
import logo from '@/public/logo-full.png'

const font = Pixelify_Sans({ subsets: ['latin'], weight: ['400']})
export function Logo({className} : {className:string}){
    return <div><Image src={logo} alt={'Notes UCEK'} className={cn(font.className, className)}/></div>
}
