import React, { useState } from "react";
import styles from "./AdminPrincipalHeader.module.css";
import { useNavigate } from "react-router";
import { filtersStore } from "../../../store/filtersStore";

export const AdminPrincipalHeader = () => {
	const navigate = useNavigate();
	const { resetFilters } = filtersStore();

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("userId");
		resetFilters(); 
		navigate("/");
	};

	return (
		<div className={styles.principalAdminContainerHeader}>
			<h1 className={styles.titleHeader}>Admin</h1>
			<button className={styles.logoutButton} onClick={handleLogout}>
				<span className="material-symbols-outlined">logout</span>
			</button>
		</div>
	);
};
