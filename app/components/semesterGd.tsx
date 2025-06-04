import Link from "next/link"

export const SemesterGd=({link}:{
    link:string
})=> {
    return(
        <div className="w-full h-auto flex flex-col items-center">
           <div className="m-[10vh] top-0">
            <h1 className="font-bold text-3xl">Select the Semester</h1>
           </div>
            <div className="cards1">
    <Link href={`${link}/1`}>
        <div className="card red">
        <p className="tip">1</p>
        <p className="second-text"></p>
    </div>
    </Link>
    <Link href={`${link}/2`}>
    <div className="card blue">
        <p className="tip">2</p>
        <p className="second-text"></p>
    </div>
    </Link>
</div>
</div>
     
    )
}