import Link from "next/link";

export default function HomePage() {
    return(
        <div className="w-full h-[100vh] flex flex-col items-center">
           <div className="m-[10vh] top-0">
            <h1 className="font-bold text-3xl">Hello there !!!</h1>
           </div>
            <div className="cards">
    <Link href="/gd">
        <div className="card red">
        <p className="tip">General dept</p>
        <p className="second-text"></p>
    </div>
    </Link>
    <Link href="/cse">
        <div className="card red">
        <p className="tip">CSE</p>
        <p className="second-text"></p>
    </div>
    </Link>
    <Link href="/ece">
    <div className="card blue">
        <p className="tip">ECE</p>
        <p className="second-text"></p>
    </div>
    </Link>
    <Link href="/it">
    <div className="card green">
        <p className="tip">IT</p>
        <p className="second-text"></p>
    </div>
    </Link>
</div>
     </div>
    )
}
