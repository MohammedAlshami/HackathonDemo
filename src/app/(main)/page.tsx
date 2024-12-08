'use client';
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard"); // Replace "/new-page" with the path you want to redirect to
  }, [router]);

  return <div></div>;
};

export default Page;
