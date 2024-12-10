import { centsToDollars, dollarsToCents, millicentsToDollars, dollarsToMillicents, millicentsToCents, centsToMillicents } from "../lib/utils";

describe("Utility Functions in utils.ts", () => {
  describe("validateNumber (indirectly tested via utility functions)", () => {
    it("throws an error for null, undefined, or non-numeric input", () => {
      expect(() => centsToDollars(null)).toThrow("Input must be a valid number.");
      expect(() => dollarsToCents(undefined)).toThrow("Input must be a valid number.");
      expect(() => millicentsToDollars("abc")).toThrow("Input must be a valid number.");
    });

    it("accepts numeric strings, integers, and floats", () => {
      expect(centsToDollars("200")).toBe(2.00);
      expect(dollarsToCents(3)).toBe(300);
      expect(millicentsToDollars(123456)).toBe(1.23);
    });
  });

  describe("centsToDollars", () => {
    it("converts cents to dollars correctly", () => {
      expect(centsToDollars(200)).toBe(2.00);
      expect(centsToDollars("150")).toBe(1.50);
      expect(centsToDollars(125)).toBe(1.25);
    });
  });

  describe("dollarsToCents", () => {
    it("converts dollars to cents correctly", () => {
      expect(dollarsToCents(3)).toBe(300);
      expect(dollarsToCents("1.75")).toBe(175);
      expect(dollarsToCents(1.25)).toBe(125);
    });
  });

  describe("millicentsToDollars", () => {
    it("converts millicents to dollars correctly", () => {
      expect(millicentsToDollars(123456)).toBe(1.23);
      expect(millicentsToDollars("500000")).toBe(5.00);
      expect(millicentsToDollars(25000)).toBe(0.25);
    });
  });

  describe("dollarsToMillicents", () => {
    it("converts dollars to millicents correctly", () => {
      expect(dollarsToMillicents(2)).toBe(200000);
      expect(dollarsToMillicents("3.50")).toBe(350000);
      expect(dollarsToMillicents(1.25)).toBe(125000);
    });
  });

  describe("millicentsToCents", () => {
    it("converts millicents to cents correctly", () => {
      expect(millicentsToCents(1500)).toBe(1.50);
      expect(millicentsToCents("3000")).toBe(3.00);
      expect(millicentsToCents(1250)).toBe(1.25);
    });
  });

  describe("centsToMillicents", () => {
    it("converts cents to millicents correctly", () => {
      expect(centsToMillicents(2)).toBe(2000);
      expect(centsToMillicents("3")).toBe(3000);
      expect(centsToMillicents(1.25)).toBe(1250);
    });
  });

  describe("Edge Cases", () => {
    it("handles zero correctly", () => {
      expect(centsToDollars(0)).toBe(0.00);
      expect(dollarsToCents(0)).toBe(0);
      expect(millicentsToDollars(0)).toBe(0.00);
      expect(dollarsToMillicents(0)).toBe(0);
      expect(millicentsToCents(0)).toBe(0.0);
      expect(centsToMillicents(0)).toBe(0);
    });

    it("handles negative values correctly", () => {
      expect(centsToDollars(-200)).toBe(-2.00);
      expect(dollarsToCents(-3)).toBe(-300);
      expect(millicentsToDollars(-123456)).toBe(-1.23);
      expect(dollarsToMillicents(-2)).toBe(-200000);
      expect(millicentsToCents(-1500)).toBe(-1.50);
      expect(centsToMillicents(-2)).toBe(-2000);
    });
  });
});