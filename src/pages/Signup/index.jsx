import Header from "../../components/layout/Header";
import Signup from "../../components/Signup";

export default function SignUpPage() {
  return (
    <>
      <Header
        heading="Signup to create an account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/"
      />
      <Signup />
    </>
  );
}
