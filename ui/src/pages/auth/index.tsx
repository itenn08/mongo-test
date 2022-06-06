import React from "react";
import Auth from "../../components/Auth";

import styles from "./styles.module.scss";

const AuthPage = () => {
  return (
    <div className={styles["authWrapper"]}>
      <div className={styles["container"]}>
        <Auth />
      </div>
    </div>
  );
};

export default AuthPage;
