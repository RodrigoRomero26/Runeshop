import { Header } from '../../ui/Header/Header'
import { Footer } from '../../ui/Footer/Footer'
import styles from './CartScreen.module.css'
import { CartScreenComponents } from '../../ui/CartScreenComponents/CartScreenComponents'

export const CartScreen = () => {
  return (
    <div className={styles.cartScreen}>
      <Header{...{ onCloseHeader: () => {} }} />
      <div className={styles.cartScreenContent}>
        <CartScreenComponents />
      </div>
        <Footer />
    </div>
  )
}
