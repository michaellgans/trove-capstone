import ChildProfileCard from "@/components/ChildCard/ChildProfileCard";
import TransactionHistory from "@/components/TransactionHistory/TransactionHistory";

export default function Home() {
  return (
    <div id='gradial'>
      <ChildProfileCard
      childName='Samantha'
      profileImageUrl='/images/samantha.png'
      checkingBalance={100}
      savingsBalance={50}
      savingsGoalPercentage={40}
      loanRepaymentPercentage={60}
     />
     <TransactionHistory />
    </div>
  )
}