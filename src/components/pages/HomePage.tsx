import { Grid } from "@mantine/core";
import { searchEmployeeList } from "../../services/employeeService";
import EmployeeSearchForm from "../homepage/EmployeeSearhForm";

import { getToken } from "../../utils/localStorage";
import { useState } from "react";

import { showNotification } from "@mantine/notifications";

import EmployeeList from "../homepage/EmployeeList";

function HomePage() {
  const [employeesData, setEmployeeData] = useState({
    employees: [],
    pagination: {},
  });

  const [employeeSearchParams, setEmployeeSearch] = useState({});

  const handleEmployeeSearch = async (employeeSearch: object) => {
    setEmployeeSearch(employeeSearch);

    const payload = {
      ...employeeSearch,
      pageNumber: "0",
      liAt: getToken("linkedInScrappingLiAt"),
      jSessionId: getToken("linkedInScrappingJSessionId"),
    };

    try {
      const resp = await searchEmployeeList(payload);

      setEmployeeData(resp.data);
    } catch (e: any) {
      showNotification({
        color: "red",
        title: "Error",
        message: e.message,
      });
    }
  };

  const handlePageChange = async (pageNumber: string) => {
    const payload = {
      ...employeeSearchParams,
      pageNumber,
      liAt: getToken("linkedInScrappingLiAt"),
      jSessionId: getToken("linkedInScrappingJSessionId"),
    };

    try {
      const resp = await searchEmployeeList(payload);

      setEmployeeData(resp.data);
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
      <Grid p={16}>
        <Grid.Col span={4}>
          <EmployeeSearchForm onEmployeeSearch={handleEmployeeSearch} />
        </Grid.Col>

        <Grid.Col span={8}>
          <EmployeeList
            employeesData={employeesData}
            handleEmployeePageChange={handlePageChange}
          />
        </Grid.Col>
      </Grid>
    </>
  );
}

export default HomePage;
