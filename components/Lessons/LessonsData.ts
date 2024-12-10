export interface Keyword {
  term: string;
  definition: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface Resource {
  title: string;
  url: string;
}

export interface Lesson {
  id: string;
  majorTitle: string;
  keywords: Keyword[];
  descriptiveText: string[];
  example: string[];
  mathEquations?: string[];
  quiz: QuizQuestion[];
  conclusion: string;
  resources: Resource[];
}

const lessonsData: Lesson[] = [
  {
    id: "interest-loans",
    majorTitle: "Loans and Interest",
    keywords: [
      { term: "Borrower", definition: "The person who borrows money from the lender." },
      { term: "Lender", definition: "The person who lends money to the borrower." },
      {
        term: "Loan",
        definition:
          "An agreement between a borrower and a lender. The lender will give the borrower money right now with the promise that the borrower will pay the money back with a little bit extra, called interest, in the future.",
      },
      { term: "Principal", definition: "The original amount of money the lender gave the borrower." },
      { term: "Interest", definition: "The amount of money the borrower will pay back on top of the original amount." },
      {
        term: "Interest Rate",
        definition:
          "The percentage of the original amount of money borrowed that will be paid as interest.",
      },
      {
        term: "Late Fees",
        definition:
          "If the borrower agrees to pay back a certain amount of their loan every month or few months, and they miss their payment when it’s due, they will owe a late fee. This is money paid on top of both the original loan, and the interest.",
      },
    ],
    descriptiveText: [
      "Today we’re going to learn about loans and interest. How they work, how they can be helpful, and how they can be dangerous if not handled in a responsible way. To put it simply, a loan is money that you can borrow now from a lender, with a promise to pay back what you borrowed in the future with interest. Which is just a fancy way of saying that you will pay back the amount you borrowed with a little extra.",
      "So what are loans helpful for? Adults use them for things like cars and houses, or other big things where it can be hard to save up enough money to buy them all at once. They can also be used in emergencies. If it’s a really hot summer day, and your cold air stops working, you can take out a loan to fix the air conditioner now, and pay back what you borrowed in the future.",
      "Why are loans dangerous? Anytime someone is thinking about borrowing money with a loan, they need to remember that the money is not free. You can think of a loan as borrowing money from yourself in the future. Because when it is time to pay back the money you borrowed, it’s not yours anymore. Finally, if you’re not careful with interest, and it takes you a long time to pay back what you borrowed, you can end up paying back a lot more money than you originally borrowed.",
    ],
    example: [
      "Let’s say there’s a game you want really badly, and it costs $25. You look in your wallet and you only have $5, darn! You talk to your parents and they agree to give you a loan for $20, so now you have enough to buy the game, that’s great! However, you can’t forget interest, your parents say that they are going to charge you 25% interest. So let’s do some quick math. If your parents give you one month to pay back the loan with interest: $20 * 25% = $5. That means that when it’s time to pay back the loan after one month, you will owe your parents $25. It is a lot of fun to have that game right now, but you always have to ask the question, is it better for me to be patient and wait? The answer isn’t always easy, so it’s always important to talk to an adult to figure out what the best choice is.",
    ],
    mathEquations: [
      "$20 * 25% = $5",
      "$20 + $5 = $25",
    ],
    quiz: [
      {
        question: "What is a Loan?",
        options: [
          "Free money",
          "A gift",
          "Money you save for later",
          "An agreement to borrow money now, in exchange for a promise to pay it back in the future with interest",
        ],
        answer:
          "An agreement to borrow money now, in exchange for a promise to pay it back in the future with interest",
      },
      {
        question: "What is Principal?",
        options: [
          "The person who’s in charge of your school",
          "The original amount of money borrowed",
          "The amount of money paid on top of the original amount borrowed",
          "A lottery prize",
        ],
        answer: "The original amount of money borrowed",
      },
      {
        question: "What is Interest?",
        options: [
          "The amount of money paid on top of the original amount borrowed",
          "The thing you have with your favorite hobby",
          "Bonus money you get when you agree to a loan",
          "Something that doesn’t matter",
        ],
        answer: "The amount of money paid on top of the original amount borrowed",
      },
      {
        question: "What is a Borrower?",
        options: [
          "A tiny little person who takes things from your cupboard",
          "The person who borrows money with a loan",
          "The person who lends money with a loan",
          "A bank account you can take unlimited money from",
        ],
        answer: "The person who borrows money with a loan",
      },
      {
        question: "Is taking a Loan ever a bad choice?",
        options: [
          "Nah, it’s literally always a win-win",
          "It depends on what you need the loan for, and whether or not you think it’s worth paying the interest for it",
          "YES, LOANS ARE TERRIFYING AHHHH",
          "Loans are very rarely a good idea, and should only be used in emergencies",
        ],
        answer:
          "It depends on what you need the loan for, and whether or not you think it’s worth paying the interest for it",
      },
    ],
    conclusion:
      "In conclusion, Loans can be very helpful tools for paying for things you can’t afford to buy all at once. They can also be used in emergencies when we really need the help. But it’s always important to remember that any time you have the option to take a loan, you need to ask yourself a lot of questions, and be cautious and thoughtful in your decision.",
    resources: [
      {
        title: "FDIC Consumer Resource Center",
        url: "https://www.fdic.gov/consumer-resource-center/chapter-7-loans-and-credit",
      },
      {
        title: "Easy Peasy Finance - Loans for Kids",
        url: "https://www.easypeasyfinance.com/borrowing-loan-for-kids-beginners/#:~:text=A%20loan%20is%20money%20that,little%20extra%20money%20%E2%80%93%20called%20interest.",
      },
    ],
  },
  {
    id: "savings",
    majorTitle: "Savings and Checking",
    keywords: [
      { term: "Savings", definition: "Money you set aside to use later instead of spending it right now." },
      { term: "Bank", definition: "A place where you can keep your money safe and use it to save, spend, or borrow." },
      { term: "Interest", definition: "Extra money you earn when you save at a bank, or extra money you pay when you borrow." },
      { term: "Emergency", definition: "An unexpected problem or situation that needs quick attention, like a broken phone or a trip to the doctor." },
      { term: "Checking Account", definition: "A type of bank account you use for daily spending, like buying snacks or paying for a subscription." },
      { term: "Savings Account", definition: "A type of bank account you use for saving money, earns interest over time." },
      { term: "Security", definition: "Feeling safe or protected, especially when it comes to your money or personal things." },
      { term: "Budget", definition: "A plan for how to spend and save your money so you don’t run out." },
    ],
    descriptiveText: [
      "Savings is the money you set aside to use later, like putting money in a piggy bank or a special account at a bank. It’s important because it helps you pay for things in the future, like toys, games, or even big things when you get older, like a car. People save money for emergencies too, like when something unexpected happens and they need extra money right away.",
      "A savings account helps you save money for future goals and emergencies. It’s like a safe spot for money you won’t need to use right away, and it can even earn a little extra money called interest. A checking account is for spending money more often, like when you need to buy something today. It’s easier to access your money in a checking account, but it doesn’t earn interest. ",
    ],
    example: [
      "Example 1: Saving for a new bike You want to buy a bike that costs $100, but you only get $10 a week for your allowance. If you save all your allowance for 10 weeks (10 weeks x $10 = $100), you'll have enough money to buy the bike!\n\nExample 2: Emergency savings Imagine your pet needs a sudden trip to the vet that costs $20. If you saved $5 each week for 4 weeks (4 weeks x $5 = $20), you’d have the money ready in case your pet needs something unexpected.",
    ],
    mathEquations: [
      "10 weeks * $10 = $100",
      "4 weeks * $5 = $20",
    ],
    quiz: [
      {
        question: "Why is it important to save money?",
        options: ["To buy things right away", "To have money for later", "To give it away", "To throw it away"],
        answer: "To have money for later",
      },
      {
        question: "What is savings?",
        options: ["Money you spend every day", "Money you save for the future", "Money you hide under your bed", "Money you borrow from friends"],
        answer: "Money you save for the future",
      },
      {
        question: "Which is better for emergencies?",
        options: ["Checking account", "Savings account", "Credit card", "No money at all"],
        answer: "Savings account",
      },
      {
        question: "If you want to buy something that costs $50 and you save $10 each week, how many weeks will it take?",
        options: ["2 weeks", "5 weeks", "4 weeks", "10 weeks"],
        answer: "5 weeks",
      },
      {
        question: "What should you use your savings for?",
        options: ["Fun and games only", "Important things and emergencies", "Things you don’t need", "Things you already own"],
        answer: "Important things and emergencies",
      },
    ],
    conclusion:
      "Saving money is important because it helps you reach your goals and be ready for emergencies. By putting aside money in a savings account, you can be sure you’re prepared for both fun things and unexpected events in life. Remember, saving is about being smart with your money today so you can enjoy it tomorrow!",
    resources: [
      {
        title: "FDIC Consumer Resource Center: Money Smart for Young People",
        url: "https://www.fdic.gov/consumer-resource-center/money-smart-young-people",
      },
      {
        title: "Consumer Financial Protection Bureau: Explore Saving",
        url: "https://www.consumerfinance.gov/consumer-tools/money-as-you-grow/school-age-children-preteens/explore-saving/",
      },
    ],
  },
  {
    id: "taxes",
    majorTitle: "Taxes and Withholding",
    keywords: [
      { term: "Income", definition: "Money you earn from working." },
      { term: "Tax", definition: "A fee paid to the government for services that benefit the community." },
      { term: "Income Tax", definition: "A tax on the money you earn." },
      { term: "Sales Tax", definition: "A tax on things you buy." },
      { term: "IRS (Internal Revenue Service)", definition: "The government agency that collects taxes." },
      { term: "Tax Return", definition: "A form you fill out to report your income and taxes." },
      { term: "Tax Rate", definition: "The percentage of income that goes to taxes." },
      { term: "Net Income", definition: "The money you keep after paying taxes." },
      { term: "Refund", definition: "Money returned if you overpay on taxes." },
      { term: "Deductions", definition: "Expenses that reduce your taxable income." },
      { term: "Tax Bracket", definition: "Income ranges that determine your tax rate." },
      { term: "Public Services", definition: "Services funded by taxes, like schools, roads, and emergency services." },
    ],
    descriptiveText: [
      "Taxes are like a fee we pay to the government to fund essential services like schools, roads, and public safety. We typically pay taxes on our income, which is the money we earn from working.",
      "Taxes are like a class fund that everyone contributes to, and the money is used to pay for things that benefit the whole community, such as building and maintaining roads, funding schools, and paying for police and firefighters to keep us safe. It's like giving back to the community we live in.",
      "Types of Taxes: Income tax — tax on earnings. Income tax is like a fee on the money we earn from jobs. Sales tax — tax on purchases. Sales tax is a fee added to the price of things we buy. Property tax — tax on owning property. Property tax is a fee on owning things like houses or land.",
      "To file a tax return, you gather information about your income and expenses. You then use this information to fill out tax forms, which are sent to the IRS. The IRS is a government agency responsible for collecting taxes. They review the forms to ensure that the correct amount of tax is paid. If you owe money, you pay it to the IRS. If you've paid too much, the IRS may send you a refund. It’s always important to report your taxes truthfully. Not only could you end up owing more if you don’t file them correctly, you can get in trouble for doing so."
    ],
    example: [
      "Imagine you earn $1,000 in a year. The government might have a flat income tax rate of 10% for people with your income level. Here's how the calculation works:\n\n" +
      "1. Calculate the tax amount:\n" +
      "   Tax amount = Income * Tax rate\n\n" +
      "   Your tax amount = $1,000 * 10% = $100\n\n" +
      "2. Calculate the net income (money you keep):\n" +
      "   Net income = Income - Tax amount\n\n" +
      "   Your net income = $1,000 - $100 = $900\n\n" +
      "So, in this example, you would pay $100 in taxes to the government, and you would have $900 left as your net income.\n\n" +
      "Remember: This is a very simplified example. In reality, tax systems are more complex, with different tax brackets and deductions. The actual amount of tax you pay will depend on various factors like your income level, filing status, and any deductions or credits you may be eligible for.",
    ],
    mathEquations: [
      "$1,000 × 10% = $100",
      "$1,000 - $100 = $900",
    ],
    quiz: [
      {
        question: "What are taxes used for?",
        options: [
          "To buy goods and services for individuals",
          "To fund the government and community services like schools and roads",
          "To pay for family expenses",
          "To save for personal emergencies",
        ],
        answer: "To fund the government and community services like schools and roads",
      },
      {
        question: "Which type of tax is applied to things we buy, like clothes or food?",
        options: ["Income tax", "Sales tax", "Property tax", "Employment tax"],
        answer: "Sales tax",
      },
      {
        question: "If you earn $2,000 and the income tax rate is 10%, how much will you pay in taxes?",
        options: ["$20", "$100", "$200", "$900"],
        answer: "$200",
      },
      {
        question: "Which government agency is responsible for collecting taxes in the United States?",
        options: ["FBI", "IRS", "CIA", "FDA"],
        answer: "IRS",
      },
      {
        question: "Why is it important to be honest when filing taxes?",
        options: [
          "To avoid paying taxes",
          "Because lying about your taxes can get you in trouble",
          "So you can reduce your income",
          "To impress your employer",
        ],
        answer: "Because lying about your taxes can get you in trouble",
      },
    ],
    conclusion:
      "Taxes are an essential part of how communities function. They fund public services like schools, roads, and emergency services. By understanding taxes, you can make better financial decisions and ensure you're contributing to your community responsibly.",
    resources: [
      {
        title: "Understanding Taxes - IRS Teacher Resources",
        url: "https://apps.irs.gov/app/understandingTaxes/teacher/whys_thm01_les01.jsp#:~:text=Taxes%20provide%20revenue%20for%20federal,system%2D%2Dthat%20benefit%20all",
      },
      {
        title: "Teach Personal Finance: Taxes for Students",
        url: "https://teachpersonalfinance.com/teach-taxes-students/",
      },
    ],
  },
  {
    id: "obligation",
    majorTitle: "Bills and Payments",
    keywords: [
      {
        term: "Financial Obligation",
        definition: "This means money you owe or need to pay for something, like a bill or a loan.",
      },
      { term: "Debt", definition: "Money that you have borrowed and still need to pay back." },
      {
        term: "Responsibility",
        definition: "Something you need to take care of or do, like a chore or a promise you made to someone.",
      },
      { term: "Loan", definition: "Money you borrow from someone, like a bank, that you agree to pay back later." },
      {
        term: "Credit",
        definition:
          "Money that you can borrow from a bank, credit card company, or parent, usually up to a certain limit, that you promise to pay back.",
      },
      { term: "Repayment", definition: "Paying back money that you borrowed." },
      { term: "Payment", definition: "Giving money for something, like buying something or paying a bill." },
    ],
    descriptiveText: [
      "Financial obligations are promises to pay back money that you owe. When people or businesses borrow money or buy things with credit, they agree to pay it back little by little, sometimes with extra money called interest. Some common financial obligations are loans, credit cards, and bills like rent or water and electricity. Taking care of these payments helps people and businesses stay out of debt and keep their money in good shape.",
    ],
    example: [
      "Buying a Game Console on Layaway\n\nAlex wants a game console that costs $80, but he can’t pay the full amount right away. The store allows him to put down a $20 deposit and pay $10 each week until it's paid off.\n\nAfter one week: $80 - $20 (deposit) - $10 (weekly payment) = $50 remaining.\nAfter two weeks: $50 - $10 = $40 remaining.\n\nBorrowing Money for a New Bike\n\nTaylor borrows $60 from his friend to buy a new bike. He agrees to pay back $15 each month.\n\nAfter one month: $60 - $15 = $45 remaining.\nAfter two months: $45 - $15 = $30 remaining.",
    ],
    mathEquations: [
      "$60 - $15 (monthly payment) = $45 remaining",
      "$45 - $15 = $30 remaining",
    ],
    quiz: [
      {
        question: "What is a financial obligation?",
        options: [
          "A free gift from the bank",
          "A payment received for doing work",
          "A type of loan that doesn’t need to be repaid",
          "A commitment to pay money owed",
        ],
        answer: "A commitment to pay money owed",
      },
      {
        question: "Which of these is an example of a financial obligation?",
        options: ["Paying rent", "Volunteering", "Reading a book", "Doing homework"],
        answer: "Paying rent",
      },
      {
        question: "If you borrow $10 and pay back $2 each week, how much will you owe after the first week?",
        options: ["$2", "$10", "$8", "$0"],
        answer: "$8",
      },
      {
        question: "When you buy something on credit or take out a loan, what does it mean?",
        options: [
          "You pay later, often with interest",
          "You get it for free",
          "You get paid by the seller",
          "You pay the full price immediately",
        ],
        answer: "You pay later, often with interest",
      },
      {
        question: "Why is it important to manage financial obligations?",
        options: [
          "To receive gifts",
          "To avoid going into debt",
          "To earn interest",
          "To pay more taxes",
        ],
        answer: "To avoid going into debt",
      },
    ],
    conclusion:
      "Knowing about financial obligations is important for handling money well. By keeping track of what they owe and paying on time, people can build good money habits. This helps them stay out of debt and plan for a strong financial future.",
    resources: [
      {
        title: "Investopedia: How to Talk to Kids About Money",
        url: "https://www.investopedia.com/how-to-talk-to-kids-about-money-8646557",
      },
      {
        title: "Investopedia: Teach Kids Financial Literacy",
        url: "https://www.investopedia.com/ric-edelman-teach-kids-financial-literacy-4684227",
      },
      {
        title: "Khan Academy: Kids Personal Finance",
        url: "https://www.khanacademy.org/search?referer=%2Fcollege-careers-more%2Fpersonal-finance&page_search_query=Kids",
      },
    ],
  },
  {
    id: "financial-literacy",
    majorTitle: "Financial Literacy",
    keywords: [
      { term: "Financial Literacy", definition: "Having an understanding of financial concepts like money, savings, loans, interest, obligations, and taxes." },
      { term: "Money", definition: "Whether in paper form (currency, bills, coins, etc.), or digital form, money is a representation of value." },
      {
        term: "Financial Responsibility",
        definition: "Using financial literacy to make smart decisions about how to spend and save money to prevent financial stress.",
      },
      {
        term: "Financial Security",
        definition:
          "Using financial responsibility to put yourself into a position where you don’t have to worry about if you have enough money to take care of yourself.",
      },
    ],
    descriptiveText: [
      "Financial Literacy is an important thing to have. As you get older, you’ll start to face important decisions and questions related to money. How you spend it, how you save it, and what attitude you have towards it. With all of that said, it’s vital that you learn about basic financial concepts, and develop an understanding about how to make good decisions with this knowledge. This is the introductory lesson for the Trove Learning Center. Today we’ll explore what money is, learn a little about where it came from, and find out where you can learn more about some of the major topics related to financial literacy.",
    ],
    example: [
      "What is money, and where did it come from?\n\n" +
      "Long ago, humans didn’t have money. When we wanted something that someone else had, we had to trade for it. If I’m a fisherman, and Bob is a farmer, and I want some of his delicious corn, I could offer him a few fish in exchange for some corn. But what if Bob doesn’t want fish? To make a long story short, this is where money comes in. Money is just a thing that represents a value that everyone can agree it has. If I sell my fish to the market for two coins, and Bob is selling his corn for one coin each, now I can buy two corn, and Bob can go spend the coins he earned on something he wants.\n\n" +
      "Why does money matter?\n\n" +
      "Money will play a big role in the choices you make and the opportunities you’ll have. If you learn to make good decisions with your money early on, you’ll prevent a lot of problems, and set yourself up to pursue the things that make you happy.",
    ],
    quiz: [
      {
        question: "What is Financial Literacy?",
        options: [
          "Knowing big words",
          "Not having any idea what money is or what it’s for",
          "The understanding of important financial concepts",
          "Being able to spell the word money",
        ],
        answer: "The understanding of important financial concepts",
      },
      {
        question: "What is Money?",
        options: ["Nothing important", "A representation of value", "Magic green paper", "Something you get for free"],
        answer: "A representation of value",
      },
      {
        question: "Why is Financial Literacy Important?",
        options: [
          "Understanding financial topics helps you make smarter decisions with how you spend and save your money",
          "I don’t know, it just is?",
          "Because the lesson says so",
          "So you can spend all your money on the newest gaming console",
        ],
        answer:
          "Understanding financial topics helps you make smarter decisions with how you spend and save your money",
      },
      {
        question: "What is Financial Security?",
        options: [
          "Being stressed out about money all the time",
          "Security guards with dollar signs on their jackets",
          "Being in the position where money doesn’t cause stress",
          "The big door to the vault at the bank",
        ],
        answer: "Being in the position where money doesn’t cause stress",
      },
      {
        question: "What is the Trove Learning Center?",
        options: [
          "An excellent resource on Trove.com for learning financial concepts",
          "The only place to learn about money",
          "The worst financial lessons ever",
          "Kash’s school",
        ],
        answer: "An excellent resource on Trove.com for learning financial concepts",
      },
    ],
    conclusion:
      "In conclusion, Financial Literacy can help you navigate through the critical decisions you’ll make with your money. We here at Trove truly hope our lessons help provide you with the confidence and assurance you need to prepare for your financial future. Let’s Learn Together!",
    resources: [
      {
        title: "Extra History: What is Money?",
        url: "https://www.youtube.com/watch?v=-nZkP2b-4vo&ab_channel=ExtraHistory",
      },
      {
        title: "FDIC Consumer Resource Center: Money Smart for Young People",
        url: "https://www.fdic.gov/consumer-resource-center/money-smart-young-people",
      },
    ],
  },
];

export default lessonsData;
