"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function BodyWithConditionalId({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const bodyId =
  pathname === "/home"
    ? "gradial"
    : pathname === "/"
    ? ""
    : pathname.startsWith("/lessons/") && pathname.split("/").length > 2
    ? "gradial-blobs"
    : "gradial-page";

  return (
    <body id={bodyId} className="min-h-screen flex flex-col">
      {children}
    </body>
  );
}
