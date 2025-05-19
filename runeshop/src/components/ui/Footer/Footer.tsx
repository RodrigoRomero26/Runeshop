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
                    <button className={styles.logoButton}><img src="src\components\ui\Footer\img\xlogo.png" alt="X" /></button>
                    <button className={styles.logoButton}><img src="src\components\ui\Footer\img\iglogo.png" alt="Instagram" /></button>
                    <button className={styles.logoButton}><img src="src\components\ui\Footer\img\facelogo.png" alt="Facebook" /></button>
                </div>
            </div>
        </div>
    </div>
  )
}
