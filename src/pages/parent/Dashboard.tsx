import { AuthStore } from "@/store/AuthStore";
import { ParentStore } from "@/store/ParentStore";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { logout } = AuthStore();
  const [targetStudentEmail, setTargetStudentEmail] = useState<string>("");
  const { getStudents, addStudent } = ParentStore();

  const add = (e) => {
    e.preventDefault();
    addStudent(targetStudentEmail);
  };

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  return (
    <>
      <div>Dashboard</div>
      <button onClick={logout}>logout</button>
      <form onSubmit={add}>
        <input
          value={targetStudentEmail}
          onChange={(e) => setTargetStudentEmail(e.target.value)}
          placeholder="enter email"
        ></input>

        <button>add</button>
      </form>
    </>
  );
}
