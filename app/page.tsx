import ChildProfileCard from "@/components/ChildCard/ChildProfileCard";

export default function Home() {
  return (
    <>
    <ChildProfileCard
      childName='Samantha'
      profileImageUrl='/images/samantha.png'
      checkingBalance={100}
      savingsBalance={50}
      savingsGoalPercentage={40}
      loanRepaymentPercentage={60}
     />
    </>
  );
}
