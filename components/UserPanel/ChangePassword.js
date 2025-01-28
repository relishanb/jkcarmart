import React, { useRef } from "react";
import Image from "next/image";
import styles from "./UserPanel.module.scss";
import { FaEye } from "react-icons/fa";

import Card from "../UI/Card";
import PrimaryButton from "../UI/PrimaryButton";

import { useForm } from "react-hook-form";

const ChangePassword = () => {

const oldPassword = "12345";

  const formErrors = {   
    NewPassword: {
      required: { value: true, message: "Please Enter New Password" },
      minLength: {
        value: 5,
        message: "New Password Should Not be Less Then 5 Characters",
      },
      maxLength: {
        value: 10,
        message: "New Password Should Not be Greater Then 10 Characters",
      },
    },
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  let enteredNewPassword = useRef();
  enteredNewPassword = watch("newPassword", "");

  return (
    <Card className={styles.card}>
      <div className={styles.center}>
        <Image src={require("./password.png")} width="100" alt="" />

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.form_group}>
            {errors.oldPassword && (
              <span className={styles.error}>{errors.oldPassword.message}</span>
            )}
            <div className={styles.input_group}>
              <input
                type="password"                
                className={styles.form_style}
                placeholder="Old Password"
                {...register("oldPassword", {
                  validate: (value) =>
                    value === oldPassword || "Incorrect Old Password",
                })}
              />
              <span className={`${styles.input_icon} `}>
                <FaEye />
              </span>
            </div>
          </div>
          <div className={styles.form_group}>
            {errors.newPassword && (
              <span className={styles.error}>{errors.newPassword.message}</span>
            )}
            <div className={styles.input_group}>
              <input
                type="password"
                name="newpassword"
                className={styles.form_style}
                placeholder="New Password"
                {...register("newPassword", formErrors.NewPassword)}
              />
              <span className={`${styles.input_icon} `}>
                <FaEye />
              </span>
            </div>
          </div>
          <div className={styles.form_group}>
            {errors.confirmNewPassword && (
              <span className={styles.error}>{errors.confirmNewPassword.message}</span>
            )}
            <div className={styles.input_group}>
              <input
                type="password"                
                className={styles.form_style}
                placeholder="Confirm New Password"
                {...register("confirmNewPassword", {
                    validate: (value) =>
                      value === enteredNewPassword || "Password Do Not Match",
                  })}
              />
              <span className={`${styles.input_icon} `}>
                <FaEye />
              </span>
            </div>
          </div>
          <div className={styles.center}>
            <PrimaryButton>Change Password</PrimaryButton>
          </div>
        </form>
      </div>
    </Card>
  );
};
export default ChangePassword;
