import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import OtpVerification from "./OtpVerification";
import LoginPassword from "./LoginPassword";
function Login() {
const activeScreen = useSelector(state=>state.authentication.activeScreen);    
  return (
    <>
    {activeScreen=="Login" && <LoginForm />}
    {activeScreen=="OTPVerification" && <OtpVerification />}
    {activeScreen=="LoginPassword" && <LoginPassword />}
    </>
  );
}
export default Login;
