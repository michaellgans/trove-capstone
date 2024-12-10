'use client'
import ChildProfileCard from "@/components/ChildCard/ChildProfileCard";
import Header from "@/components/Header";
import TransactionHistory from "@/components/TransactionHistory/TransactionHistory";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Child } from "@/types/types";
import { getChildrenByParent } from "@/lib/server-actions";

export default function Home() {
  const { data: session } = useSession();
  const [children, setChildren] = useState<Child[]>([{id: "", name: "", username: "", avatar_img: "", parent_id: ""}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChildInfo = async () => {
      if (session?.user.id) {
        try {
          const children = await getChildrenByParent(session?.user.id);
          setChildren(children);
        } catch (error) {
          console.error("Failed to fetch children");
        } finally {
          setLoading(false);
        }
      }
    }

    fetchChildInfo();
  }, [session?.user.id])

  if (loading) {
    return  <p>Loading</p>
  }

  return (
    <>
      <Header title='Trove Family Tree' />
      <div className="space-y-4">
      {children.map((child) => (
        <ChildProfileCard
          key={child.id}
          child_id={child.id}
          childName={child.name}
          profileImageUrl={child.avatar_img}
        />
      ))}
      </div>
     <Header title='Transaction History' />
     <TransactionHistory />
     </>
  )
}
