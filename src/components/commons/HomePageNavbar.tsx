import { showNotification } from "@mantine/notifications";
import { Navbar, createStyles, Tooltip } from "@mantine/core";

import { useNavigate } from "react-router-dom";

import { Logout } from "tabler-icons-react";

import { saveToken } from "../../utils/localStorage";

import { logoutUser } from "../../services/userService";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },
  };
});

function HomePageNavbar() {
  const { classes } = useStyles();

  const navigate = useNavigate();

  const onSignOutUser = async (event: any) => {
    event.preventDefault();

    try {
      await logoutUser();

      saveToken("", "linkedInScrappingLiAt");
      saveToken("", "linkedInScrappingJSessionId");

      navigate("/login");
    } catch (e: any) {
      showNotification({
        color: "red",
        title: "Error",
        message: e.message,
      });
    }
  };

  return (
    <Navbar width={{ sm: 100 }} p="md">
      <Navbar.Section grow>
        <Tooltip label="Logout">
          <a href="#" className={classes.link} onClick={onSignOutUser}>
            <Logout />
          </a>
        </Tooltip>
      </Navbar.Section>
    </Navbar>
  );
}

export default HomePageNavbar;
