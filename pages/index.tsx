import type { NextPage } from "next";
import Dashboard from "../features/dashboard/Dashboard";

const Home: NextPage = () => {
  return (
    <div className="h-screen">
      <Dashboard />
    </div>
  );
};

export default Home;
