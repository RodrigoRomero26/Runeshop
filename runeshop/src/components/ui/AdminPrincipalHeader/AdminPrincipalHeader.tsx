import React, { useState } from "react";
import styles from "./AdminPrincipalHeader.module.css";
import { useNavigate } from "react-router";

export const AdminPrincipalHeader = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/");
  };

  return (
    <div className={styles.principalAdminContainerHeader}>
      <h1 className={styles.titleHeader}>Admin</h1>
      <button className={styles.logoutButton} onClick={handleLogOut}>
        <span className="material-symbols-outlined">logout</span>
      </button>
    </div>
  );
};
