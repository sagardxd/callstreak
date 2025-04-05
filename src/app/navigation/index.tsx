import MainStack from "./MainStack"
import AuthStack from "./AuthStack"
import { useAuth } from "../context/AuthContext";


const AppNavigator = () => {
    const {user, loading} = useAuth();

    if (loading) return null;

  return user ? <MainStack/> : <AuthStack/>;
  
}

export default AppNavigator