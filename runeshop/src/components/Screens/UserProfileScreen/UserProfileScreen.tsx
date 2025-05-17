import { Footer } from "../../ui/Footer/Footer";
import { Header } from "../../ui/Header/Header";
import { UserProfile } from "../../ui/UserProfile/UserProfile";
import styles from "./UserProfileScreen.module.css";

export const UserProfileScreen = () => {
  return (
    <div className={styles.containerUserProfileScreen}>
      <Header />
      <div className={styles.containerUserProfileScreenContent}>
        <UserProfile />
        <Footer />
      </div>
    </div>
  );
};
