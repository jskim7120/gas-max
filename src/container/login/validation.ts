import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

export const schema = yup.object({
  username: yup.string().required("username is required"),
  password: yup
    .string()
    .required("password is required")
    .min(
      6,
      "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
    )
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character"),
});

export const LoginSchema = yup.object({
  username: yup.string().required("username is required"),
  password: yup.string().required("password is required"),
});

export const ReLoginSchema = yup.object({
  username: yup.string().required("username is required"),
});
