import React from "react";
import { Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import styles from "./styles.module.scss";

type IFormInput = {
  email: string;
  password: string;
};

const Auth = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  console.log("control", control);

  const onSubmit = (data: IFormInput) => console.log(data);

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["title"]}>Log In to Dashboard</div>
      <div className={styles["subTitle"]}>
        Enter your email and password below
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <div className={styles["input"]}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value:
                  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                message: "Email is not correct",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                value={value}
                onChange={onChange}
                helperText={error ? error.message : null}
                error={!!error}
                label="Email"
                id="outlined-adornment-email"
                sx={{ width: "250px" }}
              />
            )}
          />
        </div>
        <div className={styles["input"]}>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Password"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                type="password"
                id="outlined-adornment-password"
                sx={{ width: "250px" }}
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Email is required",
              },
              minLength: {
                value: 8,
                message: "Password must be have 8-64 symbols",
              },
              maxLength: {
                value: 64,
                message: "Password must be have 8-64 symbols",
              },
            }}
          />
        </div>
        <div className={styles["button"]}>
          <Button
            variant="contained"
            sx={{ width: "250px", height: "50px" }}
            type="submit"
          >
            Log in
          </Button>
        </div>
      </form>

      <div className={styles["signUp"]}>
        Don't have an account? <span>Sign up</span>
      </div>
    </div>
  );
};

export default Auth;
