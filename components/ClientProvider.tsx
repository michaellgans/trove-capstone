"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import BodyWithConditionalId from "@/components/BodyWithConditionalId";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <BodyWithConditionalId>
        {children}</BodyWithConditionalId>
    </SessionProvider>
  );
}
