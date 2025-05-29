import { Route, Routes } from "react-router-dom"
import { UserProfileScreen } from "../components/Screens/UserProfileScreen/UserProfileScreen.tsx"
import { LandingScreen } from "../components/Screens/LandingScreen/LandingScreen.tsx"
import {ProductsCatalogScreen } from "../components/Screens/ProductsCatalogScreen/ProductsCatalogScreen.tsx"
import { CartScreen } from "../components/Screens/CartScreen/CartScreen.tsx"
import { ProductScreen } from "../components/Screens/ProductScreen/ProductScreen.tsx"
import { AdminScreen } from "../components/Screens/AdminScreen/AdminScreen.tsx"

export const appRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingScreen />}/>
            <Route path="/userProfile" element={<UserProfileScreen />}/>
            <Route path="/productsCatalog" element={<ProductsCatalogScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/product" element={<ProductScreen />} />
            <Route path="/admin" element={<AdminScreen />} />
        </Routes>
    )
}