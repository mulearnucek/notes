import GoogleSheetData from "@/app/components/Sheet";

export default async function List({ params }: { params: Promise<{ sem: number, dept: string, subject: string }> }) {
    const { sem, dept: branch, subject: sub } = await params;
  
    const keywords = [String(sem), branch, sub];
  
    return (
        <div>
            <GoogleSheetData keywords={keywords} />
        </div>
    );
};
