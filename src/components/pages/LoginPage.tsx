import { Center } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import * as routes from "../../routes/routes";

import { showNotification } from "@mantine/notifications";

import LoginForm from "../login/LoginForm";

import { saveToken } from "../../utils/localStorage";

import { loginUser } from "../../services/userService";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (loginInfo: object) => {
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
    }
  };

  return (
    <>
      <Center>
        <LoginForm onLoginFormSubmit={handleLogin} />
      </Center>
    </>
  );
}

export default LoginPage;
