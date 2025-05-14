import { Route, Routes } from "react-router-dom"
import { UserProfileScreen } from "../components/Screens/UserProfileScreen/UserProfileScreen.tsx"
import { LandingScreen } from "../components/Screens/LandingScreen/LandingScreen.tsx"

export const appRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingScreen />}/>
            <Route path="/userProfile" element={<UserProfileScreen />}/>
        </Routes>
    )
}