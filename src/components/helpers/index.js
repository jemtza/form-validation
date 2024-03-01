export const isValidEmail = (email = "") => /^\S+@\S+\.\S+$/.test(email);

export const isValidUsername = (username = "") =>
  !(username.length < 3 || username.length > 10);

export const validateForm = (form) => {
  const newErrors = {};

  if (!form.username) newErrors.username = "Username is required";
  else if (!isValidUsername(form.username))
    newErrors.username = "Username should be between 3 and 10 characters";

  if (!form.email) newErrors.email = "Email is required";
  else if (!isValidEmail(form.email)) newErrors.email = "Invalid email format";

  if (!form.role) newErrors.role = "Role is required";

  return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
};
