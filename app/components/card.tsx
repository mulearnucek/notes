import Link from "next/link"

export const Section=({sub1,sem,branch,sub2,sub3,sub4,sub5,sub6}:{
   branch:string,sem:number,sub1:string,sub2:string,sub3:string,sub4:string,sub5:string,sub6:string
})=> {
    return(
        <div className="w-full flex flex-col items-center">
           <div className="m-[10vh] top-0">
            <h1 className="font-bold text-3xl">Select the Subject</h1>
           </div>
            <div className="cards1">
    <Link href={`/${branch}/${sem}/${sub1}`}>
        <div className="card red">
        <p className="tip">{sub1}</p>
        <p className="second-text"></p>
    </div>
    </Link>
    <Link href={`/${branch}/${sem}/${sub2}`}>
    <div className="card blue">
        <p className="tip">{sub2}</p>
        <p className="second-text"></p>
    </div>
    </Link>
    <Link href={`/${branch}/${sem}/${sub3}`}>
    <div className="card blue">
        <p className="tip">{sub3}</p>
        <p className="second-text"></p>
    </div>
    </Link>
    <Link href={`/${branch}/${sem}/${sub4}`}>
    <div className="card green">
        <p className="tip">{sub4}</p>
        <p className="second-text"></p>
    </div>
    </Link>
        <Link href={`/${branch}/${sem}/${sub5}`}>
        <div className="card red">
        <p className="tip">{sub5}</p>
        <p className="second-text"></p>
    </div>
    </Link>
    <Link href={`/${branch}/${sem}/${sub6}`}>
    <div className="card blue">
        <p className="tip">{sub6}</p>
        <p className="second-text"></p>
    </div>
    </Link>
</div>
     </div>
    )
}