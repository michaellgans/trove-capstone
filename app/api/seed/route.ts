import { prisma } from "@/prisma";
import bcrypt from "bcryptjs";

async function prepareSeed() {
  const loanDueDate = new Date();
  loanDueDate.setDate(loanDueDate.getDate() + 10);

  const parentTestPassword = "12345";
  const encryptedParentPassword = await bcrypt.hash(parentTestPassword, 10);

  const childOneTestPassword = "12345";
  const encryptedChildOnePassword = await bcrypt.hash(childOneTestPassword, 10);

  const childTwoTestPassword = "12345";
  const encryptedChildTwoPassword = await bcrypt.hash(childTwoTestPassword, 10);

  const childThreeTestPassword = "12345";
  const encryptedChildThreePassword = await bcrypt.hash(childThreeTestPassword, 10);

  const parentUserSeed = {
      id: "cm4eniw0d000008kvblsvhkav",
      name: "Chris Stephens",
      email: "chrisstephens@test.com",
      password: encryptedParentPassword,
      avatar_img: "/images/chris.png",
  };
  const childUserSeed = [
    {
      id: "cm4enry7p000308kv9ohq1r6d",
      parent_id: "cm4eniw0d000008kvblsvhkav",
      name: "Samantha Stephens",
      username: "sammygirl",
      password: encryptedChildOnePassword,
      avatar_img: "/images/samantha.png",
    },
    {
      id: "cm4ens5o8000408kv87592vbv",
      parent_id: "cm4eniw0d000008kvblsvhkav",
      name: "Rowan Stephens",
      username: "grubbyguy",
      password: encryptedChildTwoPassword,
      avatar_img: "/images/rowan.png",
    },
    {
      id: "cm4ens8lf000508kv9ji7hthw",
      parent_id: "cm4eniw0d000008kvblsvhkav",
      name: "Teddy Stephens",
      username: "cheddertedder",
      password: encryptedChildThreePassword,
      avatar_img: "/images/teddy.png",
    },
  ];
  const parentAccountSeed = {
    id: "cm4enlmi6000208kv3ukt6wl5",
    parent_id: "cm4eniw0d000008kvblsvhkav",
    stripe_account_id: null,
    balance: 10000,
    withholding_balance: 2000,

  };
  const childAccountSeed = [
    {
      id: "cm4ensqwu000608kvh2tr0vin",
      child_id: "cm4enry7p000308kv9ohq1r6d",
      parent_id: "cm4eniw0d000008kvblsvhkav",
      checking_balance: 5000,
      savings_balance: 5000,
      savings_goal: 10000,
    },
    {
      id: "cm4ensuso000708kvewg5hvv9",
      child_id: "cm4ens5o8000408kv87592vbv",
      parent_id: "cm4eniw0d000008kvblsvhkav",
      checking_balance: 2500,
      savings_balance: 1000,
      savings_goal: 5000,
    },
    {
      id: "cm4ensxr2000808kvepn71w8u",
      child_id: "cm4ens8lf000508kv9ji7hthw",
      parent_id: "cm4eniw0d000008kvblsvhkav",
      checking_balance: 500,
      savings_balance: 1000,
      savings_goal: 2500,
    }
  ];
  const lessonsCompletedSeed = {
    id: "cm4ent17w000908kvbbj7dxcx",
    parent_id: "cm4eniw0d000008kvblsvhkav",
    financial_literacy: false,
    savings: false,
    taxes: false,
    loans: false,
    obligations: false,

  };
  const transactionSeed = [
    {
      id: "cm4ent51g000a08kv94ke4rie",
      timestamp: new Date(),
      type: "Deposit",
      from_account_id: "cm4enlmi6000208kv3ukt6wl5",
      from_name: "Chris Stephens",
      to_account_id: "cm4ensqwu000608kvh2tr0vin",
      to_name: "Samantha Stephens",
      to_external_id: null,
      amount: 2000,
      withholdings: 5,
      description: "Mowed the yard",
      p_account_id: "cm4enlmi6000208kv3ukt6wl5",
    },
    {
      id: "cm4ent7oi000b08kv0ppv5cra",
      timestamp: new Date(),
      type: "Loan",
      from_account_id: "cm4enlmi6000208kv3ukt6wl5",
      from_name: "Chris Stephens",
      to_account_id: "cm4ens5o8000408kv87592vbv",
      to_name: "Rowan Stephens",
      to_external_id: null,
      amount: 2500,
      withholdings: 0,
      description: "Loan for new game",
      p_account_id: "cm4enlmi6000208kv3ukt6wl5",
    },
    {
      id: "cm4entbc1000c08kv4mx74k17",
      timestamp: new Date(),
      type: "Loan",
      from_account_id: "cm4ensuso000708kvewg5hvv9",
      from_name: "Rowan Stephens",
      to_account_id: "cm4enlmi6000208kv3ukt6wl5",
      to_name: "Chris Stephens",
      to_external_id: null,
      amount: 1000,
      withholdings: 0,
      description: "Loan Payment",
      p_account_id: "cm4enlmi6000208kv3ukt6wl5",
    },
    {
      id: "cm4entdvc000d08kv73o803n3",
      timestamp: new Date(),
      type: "Transfer",
      from_account_id: "cm4ensqwu000608kvh2tr0vin",
      from_name: "Samantha Stephens",
      to_account_id: "cm4ensxr2000808kvepn71w8u",
      to_name: "Teddy Stephens",
      to_external_id: null,
      amount: 500,
      withholdings: 0,
      description: "For ice cream",
      p_account_id: "cm4enlmi6000208kv3ukt6wl5",
    },
    {
      id: "cm4entlem000e08kvbzsu9vqw",
      timestamp: new Date(),
      type: "Transfer",
      from_account_id: "cm4ensuso000708kvewg5hvv9",
      from_name: "Rowan Stephens",
      to_account_id: "cm4ensxr2000808kvepn71w8u",
      to_name: "Teddy Stephens",
      to_external_id: null,
      amount: 750,
      withholdings: 0,
      description: "Pokemon Cards",
      p_account_id: "cm4enlmi6000208kv3ukt6wl5",
    }
  ];
  const loanSeed = [
    {
      id: "cm4entpc7000f08kv62h5gehn",
      lender_id: "cm4eniw0d000008kvblsvhkav",
      borrower_id: "cm4enry7p000308kv9ohq1r6d",
      interest_rate: 10,
      loan_amount: 5000,
      current_balance: 4000,
      due_date: loanDueDate,
      p_account_id: "cm4enlmi6000208kv3ukt6wl5",
    },
    {
      id: "cm4ents30000g08kvhzlg7wqi",
      lender_id: "cm4eniw0d000008kvblsvhkav",
      borrower_id: "cm4ens5o8000408kv87592vbv",
      interest_rate: 5,
      loan_amount: 2500,
      current_balance: 2500,
      due_date: loanDueDate,
      p_account_id: "cm4enlmi6000208kv3ukt6wl5",
    }
  ];
  const settingsSeed = {
    id: "cm4entvc9000h08kvcp9nbcje",
    parent_id: "cm4enlmi6000208kv3ukt6wl5",
  };

  return { parentUserSeed, parentAccountSeed, childUserSeed, childAccountSeed, lessonsCompletedSeed, transactionSeed, loanSeed, settingsSeed };
}

/**
 * Exposes an API endpoint `GET /api/seed`. When hit, runs the commands against the database to create tables and load data.
 */
export async function GET() {
  try {
    const {
      parentUserSeed,
      parentAccountSeed,
      childUserSeed,
      childAccountSeed,
      lessonsCompletedSeed,
      transactionSeed,
      loanSeed,
      settingsSeed
    } = await prepareSeed();

    await prisma.parent_user.create({
      data: parentUserSeed,
    });

    await prisma.parent_account.create({
      data: parentAccountSeed,
    });

    for (const child of childUserSeed) {
      await prisma.child_user.create({
        data: child,
      });
    }

    for (const child_account of childAccountSeed) {
      await prisma.child_account.create({
        data: child_account,
      });
    }

    await prisma.lessons_completed.create({
      data: lessonsCompletedSeed,
    });

    for (const transaction of transactionSeed) {
      await prisma.transaction.create({
        data: transaction,
      });
    }

    for (const loan of loanSeed) {
      await prisma.loan.create({
        data: loan,
      });
    }

    await prisma.settings.create({
      data: settingsSeed,
    });

    return Response.json({ message: "Database seeded" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
