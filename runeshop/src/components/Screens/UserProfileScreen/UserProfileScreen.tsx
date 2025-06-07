import { Footer } from "../../ui/Footer/Footer";
import { Header } from "../../ui/Header/Header";
import { UserProfile } from "../../ui/UserProfile/UserProfile";
import styles from "./UserProfileScreen.module.css";

export const UserProfileScreen = () => {
  return (
    <div className={styles.containerUserProfileScreen}>
      <Header {...{ onCloseHeader: () => {} }} />
      <div className={styles.containerUserProfileScreenContent}>
        <UserProfile />
        
      </div>
      <Footer />
    </div>
  );
};
