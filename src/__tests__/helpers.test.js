import { DEFAULT_FORM_DATA } from "../components/consts";
import {
  isValidEmail,
  isValidUsername,
  validateForm,
} from "../components/helpers";

describe("validate email", () => {
  it("should return true for valid email", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
  });

  it("should return false for invalid email", () => {
    const invalidEmails = ["test@example", "@example.com", "", undefined];
    invalidEmails.forEach((email) => {
      expect(isValidEmail(email)).toBe(false);
    });
  });
});

describe("validate username", () => {
  it("should return true for username with length between 3 and 10 characters", () => {
    const usernames = ["abcde", "12345", "abc 123"];
    usernames.forEach((username) => {
      expect(isValidUsername(username)).toBe(true);
    });
  });

  it("should return false for username with less than 3 characters or more than 10 characters", () => {
    const shortUsernames = ["", "a", undefined];
    shortUsernames.forEach((username) => {
      expect(isValidUsername(username)).toBe(false);
    });

    const longUsernames = [
      "abcdefghijklmnopqrstuvwxyz",
      "01234567890123456789",
    ];
    longUsernames.forEach((username) => {
      expect(isValidUsername(username)).toBe(false);
    });
  });
});

describe("validate form", () => {
  it("should return an object with the property `isValid` set to false for a form with empty fields", () => {
    const result = validateForm(DEFAULT_FORM_DATA);
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty("username");
    expect(result.errors).toHaveProperty("email");
    expect(result.errors).toHaveProperty("role");
    expect(result.errors.username).toBe("Username is required");
  });

  it("should return an object with the property `isValid` set to false for a form with invalid username", () => {
    const result = validateForm({ ...DEFAULT_FORM_DATA, username: "ab" });
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty("username");
    expect(result.errors.username).toBe(
      "Username should be between 3 and 10 characters"
    );
  });

  it("should return an object with the property `isValid` set to false for a form with valid username", () => {
    const result = validateForm({ ...DEFAULT_FORM_DATA, username: "abcde" });
    expect(result.isValid).toBe(false);
    expect(result.errors).not.toHaveProperty("username");
  });

  it("should return an object with the property `isValid` set to false for a form with invalid email", () => {
    const result = validateForm({
      ...DEFAULT_FORM_DATA,
      email: "test@example",
    });
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty("email");
  });

  it("should return an object with the property `isValid` set to false for a form with valid email", () => {
    const result = validateForm({
      ...DEFAULT_FORM_DATA,
      email: "test@example.com",
    });
    expect(result.isValid).toBe(false);
    expect(result.errors).not.toHaveProperty("email");
  });

  it("should return an object with the property `isValid` set to false for a form with empty role", () => {
    const result = validateForm({ ...DEFAULT_FORM_DATA, role: "Admin" });
    expect(result.isValid).toBe(false);
    expect(result.errors).not.toHaveProperty("role");
  });

  it("should return an object with the property `isValid` set to false for a form with valid username & email", () => {
    const result = validateForm({
      ...DEFAULT_FORM_DATA,
      username: "abcde",
      email: "test@example.com",
    });
    expect(result.isValid).toBe(false);
    expect(result.errors).not.toHaveProperty("username");
    expect(result.errors).not.toHaveProperty("email");
  });

  it("should return an object with the property `isValid` set to false for a form with valid username & role", () => {
    const result = validateForm({
      ...DEFAULT_FORM_DATA,
      username: "abcde",
      role: "Admin",
    });
    expect(result.isValid).toBe(false);
    expect(result.errors).not.toHaveProperty("username");
    expect(result.errors).not.toHaveProperty("role");
  });

  it("should return an object with the property `isValid` set to false for a form with valid email & role", () => {
    const result = validateForm({
      ...DEFAULT_FORM_DATA,
      email: "test@example.com",
      role: "User",
    });
    expect(result.isValid).toBe(false);
    expect(result.errors).not.toHaveProperty("email");
    expect(result.errors).not.toHaveProperty("role");
  });

  it("should return an object with the property `isValid` set to true if the form is correct", () => {
    const validForm = {
      username: "abcde",
      email: "test@example.com",
      role: "Admin",
    };
    const result = validateForm(validForm);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });
});
