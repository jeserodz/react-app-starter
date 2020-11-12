import React from "react";
import { AxiosInstance } from "axios";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import * as yup from "yup";
import { useStoreActions } from "../store";
import { useScreenRequests } from "../hooks/useScreenRequests";

export function LoginScreen() {
  const actions = useStoreActions((actions) => actions);
  const requests = useScreenRequests(screenRequests);

  const [login] = useMutation(requests.login, {
    onSuccess: (response) => {
      console.log({ response });
      actions.createSession({ accessToken: "123" });
    },
    onError: (error) => alert(error),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: LoginForm) => {
      login(values);
    },
  });

  return (
    <div>
      <h2>Login Screen</h2>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
      </div>
      <div>
        <button type="submit" onClick={formik.submitForm}>
          Submit
        </button>
      </div>
      {formik.isValid === false && (
        <ul>
          {Object.values(formik.errors).map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface LoginForm {
  username: string;
  password: string;
}

const initialValues: LoginForm = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape<LoginForm>({
  username: yup.string().required(),
  password: yup.string().required(),
});

const screenRequests = (apiClient: AxiosInstance) => ({
  login: (values: LoginForm) => apiClient.post("/users", values),
});
