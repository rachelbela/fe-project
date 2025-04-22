import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";
import { useState } from "react";
import { AesEncryptGCM } from "@/lib/aes";
import { useTranslation } from "react-i18next";
import userService, { SignInReq } from "@/api/service/userService";
import { useMutation } from "@tanstack/react-query";
import { useUserInfoStore } from "@/store/userInfoSlice";

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useUserInfoStore();

  const signInMutation = useMutation({
    mutationFn: (data: SignInReq) => {
      return userService.signin(data);
    },
  });

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!username || !password) return;

    try {
      const res = await signInMutation.mutateAsync({ username, password });
      console.log("登录接口返回结果", res);

      const { user, accessToken } = res;
      setUserInfo(user);
      if (accessToken) {
        AesEncryptGCM(accessToken).then((encryptToken) => {
          console.log("加密后的结果", encryptToken);
          const userInfo = {
            ...user,
            accessToken: encryptToken,
          };
          localStorage.setItem(encryptToken, JSON.stringify(userInfo));
          navigate({ pathname: HOMEPAGE, search: `?t=${encryptToken}` });
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      console.log("done");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{t("login-to-your-account")}</CardTitle>
          <CardDescription>
            {t("enter-your-email-below-to-login-to-your-account")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">{t("password")}</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    {t("forgot-your-password")}
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  onClick={(e) => {
                    handleLogin(e);
                  }}
                >
                  {t("login")}
                </Button>
                <Button variant="outline" className="w-full">
                  {t("login-with-google")}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              {t("don-and-apos-t-have-an-account")}{" "}
              <a href="#" className="underline underline-offset-4">
                {t("sign-up")}
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
