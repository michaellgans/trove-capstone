// Keywords Component

// Asset Imports
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useFonts } from "expo-font";

const keywords = [
  { word: "Bank", definition: " A place where you can keep your money safe and use it to save, spend, or borrow." },
  { word: "Borrower", definition: " The person who borrows money from the lender." },
  { word: "Budget", definition: " A plan for how to spend and save your money so you don’t run out." },
  { word: "Checking Account", definition: " A type of bank account you use for daily spending, like buying snacks or paying for a subscription." },
  { word: "Credit", definition: " Money that you can borrow from a bank, credit card company, or parent, usually up to a certain limit, that you promise to pay back." },
  { word: "Debt", definition: " Money that you have borrowed and still need to pay back." },
  { word: "Deductions", definition: " Expenses that reduce your taxable income." },
  { word: "Emergency", definition: " An unexpected problem or situation that needs quick attention, like a broken phone or a trip to the doctor." },
  { word: "Financial Literacy", definition: " Having an understanding of financial concepts like money, savings, loans, interest, obligations, and taxes." },
  { word: "Financial Obligation", definition: " This means money you owe or need to pay for something, like a bill or a loan." },
  { word: "Financial Responsibility", definition: " Using financial literacy to make smart decisions about how to spend and save money to prevent financial stress." },
  { word: "Financial Security", definition: " Using financial responsibility to put yourself into a position where you don’t have to worry about if you have enough money to take care of yourself." },
  { word: "Income", definition: " Money you earn from working." },
  { word: "Income Tax", definition: " A tax on the money you earn." },
  { word: "Interest", definition: " Extra money you earn when you save at a bank, or extra money you pay when you borrow." },
  { word: "Interest Rate", definition: " The percentage of the original amount of money borrowed that will be paid as interest." },
  { word: "IRS (Internal Revenue Service)", definition: " The government agency that collects taxes." },
  { word: "Late Fees", definition: " If the borrower agrees to pay back a certain amount of their loan every month or few months, and they miss their payment when it’s due, they will owe a late fee. This is money paid on top of both the original loan, and the interest." },
  { word: "Lender", definition: " The person who lends money to the borrower." },
  { word: "Loan", definition: " An agreement between a borrower and a lender. The lender will give the borrower money right now with the promise that the borrower will pay the money back with a little bit extra, called interest, in the future." },
  { word: "Money", definition: " Whether in paper form (currency, bills, coins, etc.), or digital form, money is a representation of value." },
  { word: "Net Income", definition: " The money you keep after paying taxes." },
  { word: "Payment", definition: " Giving money for something, like buying something or paying a bill." },
  { word: "Principal", definition: " The original amount of money the lender gave the borrower." },
  { word: "Public Services", definition: " Services funded by taxes, like schools, roads, and emergency services." },
  { word: "Refund", definition: " Money returned if you overpay on taxes." },
  { word: "Repayment", definition: " Paying back money that you borrowed." },
  { word: "Responsibility", definition: " Something you need to take care of or do, like a chore or a promise you made to someone." },
  { word: "Savings", definition: " Money you set aside to use later instead of spending it right now." },
  { word: "Savings Account", definition: " A type of bank account you use for saving money, earns interest over time." },
  { word: "Sales Tax", definition: " A tax on things you buy." },
  { word: "Security", definition: " Feeling safe or protected, especially when it comes to your money or personal things." },
  { word: "Tax", definition: " A fee paid to the government for services that benefit the community." },
  { word: "Tax Bracket", definition: " Income ranges that determine your tax rate." },
  { word: "Tax Rate", definition: " The percentage of income that goes to taxes." },
  { word: "Tax Return", definition: " A form you fill out to report your income and taxes." },
  { word: "Transaction", definition: " A specific event involving the exchange of money, like a purchase." },
  { word: "Withdrawal", definition: " Taking money out of your bank. account." }
];

// Returns a Keywords Component
export function Keywords() {
    return (
      <View
        style={styles.container}
      >
        <Text
          style={styles.title}
        >
          Keywords
        </Text>
        <ScrollView
          style={styles.scrollView}
        >
          {keywords.map((item, index) => (
            <View
              key={index}
              style={styles.keywordItem}
            >
              <Text
                style={styles.blueText}
              >
                {item.word}
              </Text>
              <Text
                style={styles.definition}
              > {'\u2022'}{item.definition}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  blueText: {
    color: "#0255EE",
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "bold",
  },
  container: {
    flexGrow: 1,
    width: "90%",
  },
  definition: {
    fontFamily: "Inter",
    fontSize: 14,
  },
  title: {
    fontFamily: "Inter",
    fontSize: 32,
    fontWeight: "semibold",
  },
  keywordItem: {
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollView: {
    borderWidth: 3,
    borderColor: "white",
    height: 230,
    paddingVertical: 10,
    paddingBottom: 30,
  },
});

