import { Loans } from "@/types/types";

export const loans: Loans[] = [
  {
    "loan_id": "1d5ef45e-3527-4240-ac1c-dcdb6265bda0",
    "loan_amount": 1500,
    "interest_rate": 10,
    "due_date": new Date(2024-12-15),
    "current_amount": 650,
    "lender_id": "da307308-4477-4a71-b515-1012a451dd30",
    "borrower_id": "81b632a5-3585-4063-b253-034f940e56b0"
  },
  {
    "loan_id": "1d5ef45e-3527-4240-ac1c-dcdb6265bda1",
    "loan_amount": 1000,
    "interest_rate": 5,
    "due_date": new Date(2024-12-1),
    "current_amount": 250,
    "lender_id": "81b632a5-3585-4063-b253-034f940e56b2",
    "borrower_id": "81b632a5-3585-4063-b253-034f940e56b1"
  }
];
