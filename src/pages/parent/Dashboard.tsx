import { AuthStore } from "@/store/AuthStore";

export default function Dashboard() {
  const { logout } = AuthStore();

  return (
    <>
      <div>Dashboard</div>
      <button onClick={logout}>logout</button>
    </>
  );
}
