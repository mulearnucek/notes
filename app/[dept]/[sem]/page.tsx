import { gd, cse, ece, it } from "@/app/components/details";
import { Section } from "@/app/components/card";

export default async function Sub({
  params,
}: {
  params: Promise<{ sem: number; dept: string }>;
}) {
  const { sem, dept } = await params;
  const normalizedDept = dept.toLowerCase();

  const departmentData = {
    gd,
    cse,
    ece,
    it,
  };

  const selectedDept = departmentData[normalizedDept as keyof typeof departmentData];

  if (!selectedDept) {
    return (
      <div className="w-full h-auto flex flex-col items-center">
        <p>Invalid department: {dept}</p>
      </div>
    );
  }

  const semNumber = Number(sem);
  const filteredSubjects = selectedDept.filter((entry) => entry.id === semNumber);

  if (filteredSubjects.length === 0) {
    return (
      <div className="w-full h-auto flex flex-col items-center">
        <p>No subjects found for semester {sem} in department {dept}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-auto flex flex-col items-center">
      <div className="grid align-center justify-center">
        {filteredSubjects.map((subject) => (
          <Section
            key={subject.id}
            sem={semNumber}
            branch={dept}
            sub1={subject.sub1}
            sub2={subject.sub2}
            sub3={subject.sub3}
            sub4={subject.sub4}
            sub5={subject.sub5}
            sub6={subject.sub6}
          />
        ))}
      </div>
    </div>
  );
}
