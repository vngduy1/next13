"use client";

import { useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";

const Facebook = () => {
  const router = useRouter();

  const handleBtn = () => {
    router.push("/");
  };

  return (
    <>
      <Button variant="primary" onClick={() => handleBtn()}>
        Back home
      </Button>
      <h4>Facebook</h4>
    </>
  );
};

export default Facebook;
