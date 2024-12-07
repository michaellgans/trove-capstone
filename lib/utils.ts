// Utility Functions

// Helper function to validate input
function validateNumber(input: any): number {
  if (input === null || input === undefined || isNaN(Number(input))) {
    throw new Error("Input must be a valid number.");
  }
  return Number(input);
}

// Convert cents to dollars
export function centsToDollars(cents: any): number {
  cents = validateNumber(cents);
  return cents / 100;
}

// Convert dollars to cents
export function dollarsToCents(dollars: any): number {
  dollars = validateNumber(dollars);
  return dollars * 100;
}

// Convert millicents to dollars
export function millicentsToDollars(millicents: any): number {
  millicents = validateNumber(millicents);
  return millicents / 100000;
}

// Convert dollars to millicents
export function dollarsToMillicents(dollars: any): number {
  dollars = validateNumber(dollars);
  return dollars * 100000;
}

// Convert millicents to cents
export function millicentsToCents(millicents: any): number {
  millicents = validateNumber(millicents);
  return millicents / 1000;
}

// Convert cents to millicents
export function centsToMillicents(cents: any): number {
  cents = validateNumber(cents);
  return cents * 1000;
}
