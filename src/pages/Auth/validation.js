import * as yup from "yup";

const registerSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(8).max(32).required(),
});

export { registerSchema };
