"use client"

import { cn } from '@/lib/utils'
import { Pixelify_Sans } from 'next/font/google'

const font = Pixelify_Sans({ subsets: ['latin'], weight: ['400']})
export function Logo({className} : {className:string}){
    return <div className={cn(font.className, className)}>Notes UCEK</div>
}
