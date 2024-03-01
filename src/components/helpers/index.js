export const isValidEmail = (email = "") => /^\S+@\S+\.\S+$/.test(email);

export const isValidUsername = (username = "") =>
  !(username.length < 3 || username.length > 10);
