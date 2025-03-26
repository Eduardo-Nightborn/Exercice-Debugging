// FormBug.tsx - Problèmes avec la gestion de formulaires
import React, { useState, FormEvent } from "react";
interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
export const SignupForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Bug 1:
  const validate = (formValues: FormValues): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formValues.username) {
      newErrors.username = "Username is required";
    }
    if (!formValues.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formValues.email)) {
      // Bug: wrong regex
      newErrors.email = "Email is invalid";
    }
    if (!formValues.password) {
      newErrors.password = "Password is required";
    } else if (formValues.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    // Bug:
    if (!formValues.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return newErrors;
  };
  // Bug 2:
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log("NAAME : ", name);
    console.log("VALUE : ", value);
    // Bug: values ne mets pas a jour le state -- FIXED
    //values[name as keyof FormValues] = value;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Validation
    const formErrors = validate(values);

    if (Object.keys(errors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      setIsSubmitted(false);
      return;
    }

    // Bug 3:
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {isSubmitted && Object.keys(errors).length === 0 ? (
        <div style={{ color: "green" }}>Successfully signed up!</div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword}</p>
          )}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};
