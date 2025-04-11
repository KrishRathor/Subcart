import { SignInButton } from "@clerk/clerk-react"
import StoreSetupSeamlessDark from "../components/dashboard/CreateStore"

export const DashboardPage = () => {
  return (
    <div>
      <StoreSetupSeamlessDark />
      <SignInButton />
    </div>
  )
}
