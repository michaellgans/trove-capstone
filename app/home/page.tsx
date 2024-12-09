import ChildProfileCard from "@/components/ChildCard/ChildProfileCard";
import Header from "@/components/Header";
import TransactionHistory from "@/components/TransactionHistory/TransactionHistory";

export default function Home() {
  return (
    <>
      <Header title='Trove Family Tree' />
      <ChildProfileCard
      childName='Samantha'
      profileImageUrl='/images/samantha.png'
      checkingBalance={100}
      savingsBalance={50}
      savingsGoalPercentage={40}
      loanRepaymentPercentage={60}
     />
     <Header title='Transaction History' />
     <TransactionHistory />
     </>
  )
}