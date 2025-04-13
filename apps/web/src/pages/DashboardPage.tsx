import { SignInButton } from "@clerk/clerk-react"
import StoreSetupSeamlessDark from "../components/dashboard/CreateStore"
import { urlencoded } from "express"

export const DashboardPage = () => {
  return (
    <div>
      <StoreSetupSeamlessDark />
      <SignInButton />

    </div>
  )
}
