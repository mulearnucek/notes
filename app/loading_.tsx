"use client"
import { Logo } from '@/components/logo';

export default function Loading({msg}:{msg: string}) {
    return (
        <div className={`flex gap-3 text-white h-[100dvh] w-screen flex-col z-50`}>
            <div className="flex justify-center items-center h-full w-full animate-pulse transition-all drop-shadow-xl">
                <Logo className={"text-6xl"}/>
            </div> 
            <div className="flex justify-center flex-col items-center mb-10 gap-2 text-muted-foreground text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mb-4"></div>
                <small>Made with 💖 by μLearn UCEK</small>
            </div>
        </div>
    )
  }

  