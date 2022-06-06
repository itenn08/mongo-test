import React from "react";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import styles from "./styles.module.scss";

const Auth = () => {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["title"]}>Log In to Dashboard</div>
      <div className={styles["subTitle"]}>
        Enter your email and password below
      </div>
      <div className={styles["form"]}>
        <FormControl variant="outlined" className={styles["input"]}>
          <InputLabel htmlFor="outlined-adornment-email">
            Enter your email
          </InputLabel>
          <OutlinedInput
            label="Enter your email"
            id="outlined-adornment-email"
          />
        </FormControl>

        <FormControl variant="outlined" className={styles["input"]}>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            endAdornment={<InputAdornment position="end"></InputAdornment>}
            label="Password"
          />
        </FormControl>
      </div>
      <div className={styles["button"]}>
        <Button variant="contained" sx={{ width: "250px" }}>
          Log in
        </Button>
      </div>

      <div className={styles["signUp"]}>
        Don't have an account? <span>Sign up</span>
      </div>
    </div>
  );
};

export default Auth;
