import * as yup from "yup";

export const userDetailsSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  birthDate: yup
    .date()
    .typeError("Invalid date")
    .required("Date of birth is required"),
  gender: yup
    .string()
    .oneOf(["male", "female", "other"], "Gender must be male, female, or other")
    .required("Gender is required"),
  phone: yup
    .string()
    .matches(/^\+?\d{7,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),

  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),

  companyName: yup.string().required("Company name is required"),

  department: yup.string().required("Department is required"),
  title: yup.string(),

  cardExpire: yup
    .string()
    .matches(/^\d{2}\/\d{2}$/, "Invalid expiry format (MM/YY)")
    .required("Card expiry is required"),
  cardNumber: yup
    .string()
    .matches(/^\d{13,19}$/, "Invalid card number")
    .required("Card number is required"),
});
