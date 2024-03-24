import "@/styles/app.css";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/facebook">
            <div className="red">Facebook</div>
          </Link>
        </li>
        <li>
          <Link href="/google">google</Link>
        </li>
        <li>
          <Link href="/youtube">Youtube</Link>
        </li>
      </ul>
    </div>
  );
}
