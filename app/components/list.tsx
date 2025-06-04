import Link from "next/link"

export default function ListCard({depts,types,semesters,subjects,links,titles}:{
  depts:string,types:string,semesters:string,subjects:string,links:string,titles:string
}) {
    return(
      <Link href={links} target="_blank">
        <div className="card m-[5vh]">
  <div className="img"></div>
  <div className="textBox">
    <div className="textContent">
      <p className="h1">{titles}</p>
      <span className="span">{depts}</span>
      <span className="span">sem : {semesters}</span>
      <span className="span">type: {types}</span>
      
    </div>
    <p className="p">{subjects}</p>

  <div>
</div></div></div></Link>
    )
}