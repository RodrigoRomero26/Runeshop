import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    
    <div className={styles.principalContainerFooter}>
        <div className={styles.dataContainerFooter}>
            <div className={styles.aboutUsContainerFooter}>
                <div className={styles.aboutUsDataContainerFooter}>
                    <div className={styles.aboutUsDataContainer}>
                    <h1>Sobre nosotros</h1>
                    <p>Somos una empresa dedicada a la venta de productos deportivos de alta calidad.</p>
                    </div>
                </div>
            </div>
            <div className={styles.contactUsContainerFooter}>
                <div className={styles.contactUsWhereAreWe}>
                    <p>Encontranos en. Av. San Martin 178</p>
                    <p>Contactanos al 2615874587</p>
                </div>
                <div className={styles.contactUsReserveRights}>
                    <p>Los señores de la runa <br /> Todos los derechos reservados</p>
                </div>
                <div className={styles.contactUsSocialMedia}>
                    <button onClick={() => window.open("https://res.cloudinary.com/dpyfse8qb/video/upload/v1749535382/ettvqxbymhog9ny6imaf.mp4", "_blank")} className={styles.logoButton}><img src="src\components\ui\Footer\img\xlogo.png" alt="X" /></button>
                    <button onClick={() => window.open("https://res.cloudinary.com/dpyfse8qb/video/upload/v1749535800/zkh8hqra4j7xgllkgqzo.mp4", "_blank")} className={styles.logoButton}><img src="src\components\ui\Footer\img\iglogo.png" alt="Instagram" /></button>
                    <button onClick={() => window.open("https://res.cloudinary.com/dpyfse8qb/video/upload/v1749534570/kq8kx9jcpslfablzam61.mp4", "_blank")} className={styles.logoButton}><img src="src\components\ui\Footer\img\facelogo.png" alt="Facebook" /></button>
                </div>
            </div>
        </div>
    </div>
  )
}
