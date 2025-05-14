import styles from "./UserProfileScreen.module.css";

export const UserProfileScreen = () => {
	return (
		<div className={styles.principalContainerUserProfile}>
            <h1>Mi perfil</h1>
			<div className={styles.dataContainerUserProfile}>
                <div className={styles.userDataForm}>
                <span className="material-symbols-outlined">account_circle</span>
                <div>
                    <input type="text" name="user" placeholder="Nombre de usuario" />
                    <input type="text" name="name" placeholder="Nombre" />
                </div>
                </div>
                <div className={styles.userAdressesForm}>

                </div>
            </div>
		</div>
	);
};
