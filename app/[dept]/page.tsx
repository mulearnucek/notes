import { notFound } from "next/navigation";
import {Semester} from "../components/semester";
import { SemesterGd } from "../components/semesterGd";
export async function generateStaticParams(){
    return[
        {dept:'gd'},
        {dept:'cse'},
        {dept:'ece'},
        {dept:'it'}
    ];
}


export default async function Dept({params}:{
    params:Promise<{dept:string}>
}) 
{
    const title =(await params).dept;
    if(title === 'gd'){
        return(
           <>
           <SemesterGd link={title} />
           </>
             )
            }
        if(title === 'cse'|| title=== 'it'||title==='ece'){
            return(
        <div>
           <Semester link={title} />
        </div>
            )
        }
            return(
                notFound()
    )
}
