import GoogleSheetData from "@/app/components/Sheet";

export default async function List({ params }: { params: Promise<{ sem: number, dept: string, subject: string }> }) {
    // Await the params object and destructure it
    const { sem, dept: branch, subject: sub } = await params;
  
    // Create an array of strings representing the keywords
    const keywords = [String(sem), branch, sub]; // Ensure everything is a string
  
    return (
        <div>
            <GoogleSheetData keywords={keywords} />
        </div>
    );
};
