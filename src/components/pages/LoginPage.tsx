import { useNavigate } from "react-router-dom";

import { Center } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import LoginForm from "../login/LoginForm";

import * as routes from "../../routes/routes";

import { saveToken } from "../../utils/localStorage";

import { loginUser } from "../../services/userService";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();

  const [isUserLoggingIn, setIsUserLoggingIn] = useState(false);

  const handleLogin = async (loginInfo: object) => {
    setIsUserLoggingIn(true);

    try {
      const resp: any = await loginUser(loginInfo);

      saveToken(JSON.stringify(resp.data.liAt), "linkedInScrappingLiAt");
      saveToken(
        JSON.stringify(resp.data.jSessionId),
        "linkedInScrappingJSessionId"
      );
      navigate(routes.DASHBOARD);
    } catch (e: any) {
      showNotification({
        color: "red",
        title: "Error",
        message: e.message,
      });
    } finally {
      setIsUserLoggingIn(false);
    }
  };

  return (
    <>
      <Center mt={100}>
        <LoginForm
          onLoginFormSubmit={handleLogin}
          isLoggingIn={isUserLoggingIn}
        />
      </Center>
    </>
  );
}

export default LoginPage;
