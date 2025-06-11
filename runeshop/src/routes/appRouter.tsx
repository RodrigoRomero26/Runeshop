import { Route, Routes, Navigate } from "react-router-dom";
import { userStore } from "../store/userStore";
import { UserProfileScreen } from "../components/Screens/UserProfileScreen/UserProfileScreen.tsx"
import { LandingScreen } from "../components/Screens/LandingScreen/LandingScreen.tsx"
import {ProductsCatalogScreen } from "../components/Screens/ProductsCatalogScreen/ProductsCatalogScreen.tsx"
import { CartScreen } from "../components/Screens/CartScreen/CartScreen.tsx"
import { ProductScreen } from "../components/Screens/ProductScreen/ProductScreen.tsx"
import { AdminScreen } from "../components/Screens/AdminScreen/AdminScreen.tsx"
import { SuccessScreen } from "../components/Screens/SuccessScreen/SuccessScreen.tsx"
import { PendingScreen } from "../components/Screens/PendingScreen/PendingScreen.tsx"
import { ErrorScreen } from "../components/Screens/ErrorScreen/ErrorScreen.tsx"

export const appRouter = () => {
    const user = userStore(state => state.user); 

    return (
        <Routes>
            <Route path="/" element={<LandingScreen />} />
            <Route path="/userProfile" element={<UserProfileScreen />} />
            <Route path="/productsCatalog" element={<ProductsCatalogScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route
                path="/admin"
                element={
                    user && user.tipoUsuario === "ADMIN"
                        ? <AdminScreen />
                        : <Navigate to="/" />
                }
            />
            <Route path="/success" element={<SuccessScreen />} />
            <Route path="/pending" element={<PendingScreen />} />
            <Route path="/error" element={<ErrorScreen />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};