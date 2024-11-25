import { Transactions } from "@/lib/definitions";

// store equals this uuid = 0f3b2880-b99d-4029-a4df-21c6efb5f80b
// charity equals this uuid = 7e210182-d7fc-479f-bc0e-5986b902a82c

export const transactions: Transactions[] = [
  {
    "transaction_id": "cf43fe8f-4ff9-4c34-b954-edfac5b5a000",
    "timestamp": "2024-11-15T10:00:00Z",
    "type": "deposit",
    "description": "Weekly Allowance",
    "to_external_id": null,
    "amount": 1000,
    "withholdings": null,
    "to_name": "Johnny",
    "from_name": "Mom",
    "to_account_id": "81b632a5-3585-4063-b253-034f940e56b3",
    "from_account_id": "da307308-4477-4a71-b515-1012a451dd31",
    "p_account_id": "da307308-4477-4a71-b515-1012a451dd31"
  },
  {
    "transaction_id": "cf43fe8f-4ff9-4c34-b954-edfac5b5a001",
    "timestamp": "2024-11-15T12:00:00Z",
    "type": "payment",
    "description": "Johnny purchased a snack",
    "to_external_id": "0f3b2880-b99d-4029-a4df-21c6efb5f80b",
    "amount": 500,
    "withholdings": null,
    "to_name": "store",
    "from_name": "Johnny",
    "to_account_id": null,
    "from_account_id": "81b632a5-3585-4063-b253-034f940e56b3",
    "p_account_id": "da307308-4477-4a71-b515-1012a451dd31"
  },
  {
    "transaction_id": "cf43fe8f-4ff9-4c34-b954-edfac5b5a002",
    "timestamp": "2024-11-15T13:00:00Z",
    "type": "payment",
    "description": "Matt bought a book",
    "to_external_id": "0f3b2880-b99d-4029-a4df-21c6efb5f80b",
    "amount": 1000,
    "withholdings": null,
    "to_name": "store",
    "from_name": "Matt",
    "to_account_id": null,
    "from_account_id": "81b632a5-3585-4063-b253-034f940e56b4",
    "p_account_id": "da307308-4477-4a71-b515-1012a451dd31"
  },
  {
    "transaction_id": "cf43fe8f-4ff9-4c34-b954-edfac5b5a003",
    "timestamp": "2024-11-15T13:21:57Z",
    "type": "deposit",
    "description": "Weekly Allowance",
    "to_external_id": null,
    "amount": 1000,
    "withholdings": null,
    "to_name": "Michael",
    "from_name": "Svitlana",
    "to_account_id": "81b632a5-3585-4063-b253-034f940e56b1",
    "from_account_id": "da307308-4477-4a71-b515-1012a451dd30",
    "p_account_id": "da307308-4477-4a71-b515-1012a451dd30"
  },
  {
    "transaction_id": "cf43fe8f-4ff9-4c34-b954-edfac5b5a004",
    "timestamp": "2024-11-15T13:21:057Z",
    "type": "deposit",
    "description": "Weekly Allowance",
    "to_external_id": null,
    "amount": 1000,
    "withholdings": null,
    "to_name": "Chris",
    "from_name": "Svitlana",
    "to_account_id": "81b632a5-3585-4063-b253-034f940e56b0",
    "from_account_id": "da307308-4477-4a71-b515-1012a451dd30",
    "p_account_id": "da307308-4477-4a71-b515-1012a451dd30"
  },
  {
    "transaction_id": "cf43fe8f-4ff9-4c34-b954-edfac5b5a005",
    "timestamp": "2024-11-15T13:21:57Z",
    "type": "deposit",
    "description": "Weekly Allowance",
    "to_external_id": null,
    "amount": 1000,
    "withholdings": null,
    "to_name": "Mei",
    "from_name": "Svitlana",
    "to_account_id": "81b632a5-3585-4063-b253-034f940e56b2",
    "from_account_id": "da307308-4477-4a71-b515-1012a451dd30",
    "p_account_id": "da307308-4477-4a71-b515-1012a451dd30"
  },
  {
    "transaction_id": "cf43fe8f-4ff9-4c34-b954-edfac5b5a006",
    "timestamp": "2024-11-15T13:21:57Z",
    "type": "loan",
    "description": "Loan to Chris from Svitlana",
    "to_external_id": null,
    "amount": 1500,
    "withholdings": null,
    "to_name": "Chris",
    "from_name": "Svitlana",
    "to_account_id": "81b632a5-3585-4063-b253-034f940e56b0",
    "from_account_id": "da307308-4477-4a71-b515-1012a451dd30",
    "p_account_id": "da307308-4477-4a71-b515-1012a451dd30"
  },
  {
    "transaction_id": "cf43fe8f-4ff9-4c34-b954-edfac5b5a007",
    "timestamp": "2024-11-15T13:21:57Z",
    "type": "loan",
    "description": "Loan to Michael from Mei",
    "to_external_id": null,
    "amount": 1000,
    "withholdings": null,
    "to_name": "Michael",
    "from_name": "Mei",
    "to_account_id": "81b632a5-3585-4063-b253-034f940e56b1",
    "from_account_id": "81b632a5-3585-4063-b253-034f940e56b2",
    "p_account_id": "da307308-4477-4a71-b515-1012a451dd30"
  }
];
