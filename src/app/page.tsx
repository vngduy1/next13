import "@/styles/app.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HomePage",
  description: "Description",
};

export default function Home() {
  return (
    <div style={{ minHeight: "90vh", backgroundColor: "#ccc" }}>Home Page</div>
  );
}
