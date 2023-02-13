import { Grid } from "@mantine/core";
import { Navigate, Outlet } from "react-router-dom";

import HomePageNavbar from "../components/commons/HomePageNavbar";
import { getToken } from "../utils/localStorage";

const HomeLayout = () => {
  return Boolean(getToken("linkedInScrappingLiAt")) &&
    Boolean(getToken("linkedInScrappingJSessionId")) ? (
    <>
      <Grid>
        <Grid.Col span={1}>
          <HomePageNavbar />
        </Grid.Col>

        <Grid.Col span={11}>
          <Outlet />
        </Grid.Col>
      </Grid>
    </>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default HomeLayout;
