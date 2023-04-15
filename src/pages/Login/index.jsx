import Header from "../../components/layout/Header";
import Login from "../../components/Login";

export default function LoginPage() {
  return(
    <>
        <Header
            heading="Login in to your account"
            paragraph="Don't have an account yet?"
            linkName="Signup"
            linkUrl="/signup"
            />
        <Login/>

    </>
  )
}
