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
import { RoleTypeMap } from "@/config/role";
import { AesEncryptGCM } from "@/lib/aes";
import { useTranslation } from "react-i18next";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!email || !psw) return;
    const token = `token_${Date.now()}`;
    AesEncryptGCM(token).then((res) => {
      console.log("加密后的结果", res);
      const userInfo = {
        username: "Vben",
        email,
        avatar:
          "https://unpkg.com/@vbenjs/static-source@0.1.7/source/avatar-v1.webp",
        token: res,
        role: RoleTypeMap.MANAGER,
      };
      localStorage.setItem(token, JSON.stringify(userInfo));
      navigate({ pathname: "/workbench", search: `?t=${token}` });
    });
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={psw}
                  onChange={(e) => setPsw(e.target.value)}
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
