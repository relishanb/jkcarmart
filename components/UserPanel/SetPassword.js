import React, { useRef } from "react";
import Image from "next/image";
import styles from './UserPanel.module.scss';
import { FaEye } from 'react-icons/fa';
import Card from "../UI/Card";
import PrimaryButton from "../UI/PrimaryButton";

import { useForm } from "react-hook-form";

const SetPassword = () => {

    const formErrors = {
        Password: {
          required: { value: true, message: "Please Enter Password" },
          minLength: { value: 5, message: "Password Should Not be Less Then 5 Characters" },
          maxLength: { value: 10, message: "Password Should Not be Greater Then 10 Characters" },          
        },           
      };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
      const onSubmit = (data) => console.log(data);


      let enteredPassword = useRef();
      enteredPassword = watch("password", "");

  return (
    <Card className={styles.card}>
      <div className={styles.center}>
        <Image src={require("./password.png")} width="100" alt="" />

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={`${styles.form_group}`}>
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
            <div className={styles.input_group}>
              <input
                type="password"
                className={styles.form_style}
                placeholder="Enter Password"
                {...register("password", formErrors.Password)}
              />
              <span className={`${styles.input_icon} `}>
                <FaEye />
              </span>
            </div>
          </div>
          <div className={`${styles.form_group}`}>
            {errors.confirmPassword && (
              <span className={styles.error}>
                {errors.confirmPassword.message}
              </span>
            )}
            <div className={styles.input_group}>
              <input
                type="password"
                className={styles.form_style}
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === enteredPassword || "Password Do Not Match",
                })}
              />
              <span className={`${styles.input_icon} `}>
                <FaEye />
              </span>
            </div>
          </div>
          <div className={styles.center}>
            <PrimaryButton>Set Password</PrimaryButton>
          </div>
        </form>
      </div>
    </Card>
  );
 }
 export default SetPassword;