import React from "react";
import styles from "./AdminScreen.module.css";
import { Footer } from "../../ui/Footer/Footer";
import { Aside } from "../../ui/Aside/Aside";
import { AdminPrincipalHeader } from "../../ui/AdminPrincipalHeader/AdminPrincipalHeader";
import { AdminHeader } from "../../ui/AdminHeader/AdminHeader";
import { Admin } from "../../ui/Admin/Admin";

export const AdminScreen = () => {
	return (
		<div className={styles.containerAdminScreen}>
			<AdminPrincipalHeader />
			<AdminHeader />
			<div className={styles.containerAdminScreenContent}>
				<Aside />
				<Admin />
			</div>
			<Footer />
		</div>
	);
};
