import { useUserInfoStore } from "@/store/userInfoSlice";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

function useAuth() {
  const [isLogin, setIsLogin] = useState(false);
  const { setUserInfo } = useUserInfoStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const username = searchParams.get("t") || "";
    const user = localStorage.getItem(username);
    function check() {
      if (user) {
        const userEntity = JSON.parse(user);
        setUserInfo(userEntity);
        setIsLogin(true);
      } else {
        setIsLogin(false);
        navigate("/login", { replace: true });
      }
    }
    check();
  }, [searchParams]);
  return isLogin;
}

export default useAuth;
