import Link from "next/link"

export const Semester=({link}:{
    link:string
})=> {
    return(
        <div className="w-full h-auto flex flex-col items-center">
           <div className="m-[10vh] top-0">
            <h1 className="font-bold text-3xl">Select the Semester</h1>
           </div>
            <div className="cards1">
    <Link href={`${link}/3`}>
    <div className="card green">
        <p className="tip">3</p>
        <p className="second-text"></p>
    </div>
    </Link>
        <Link href={`${link}/4`}>
        <div className="card red">
        <p className="tip">4</p>
        <p className="second-text"></p>
    </div>
    </Link>
    
    <Link href={`${link}/5`}>
    <div className="card blue">
        <p className="tip">5</p>
        <p className="second-text"></p>
    </div>
    </Link>
    <Link href={`${link}/6`}>
    <div className="card green">
        <p className="tip">6</p>
        <p className="second-text"></p>
    </div>
    </Link>
    <Link href={`${link}/7`}>
        <div className="card red">
        <p className="tip">7</p>
        <p className="second-text"></p>
    </div>
    </Link>
    <Link href={`${link}/8`}>
    <div className="card blue mb-[10vh]">
        <p className="tip">8</p>
        <p className="second-text"></p>
    </div>
    </Link>
</div>
</div>
     
    )
}
