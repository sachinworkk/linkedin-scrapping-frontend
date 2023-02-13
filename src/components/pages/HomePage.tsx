import { useState } from "react";

import { Grid } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import EmployeeList from "../homepage/EmployeeList";
import EmployeeSearchForm from "../homepage/EmployeeSearhForm";

import { getToken } from "../../utils/localStorage";

import { searchEmployeeList } from "../../services/employeeService";

function HomePage() {
  const [page, setPage] = useState(1);

  const [employeesData, setEmployeeData] = useState({
    employees: [],
    pagination: {
      count: 0,
    },
  });
  const [employeeSearchParams, setEmployeeSearch] = useState({});

  const onPageChange = (page: number) => {
    setPage(page);
    handlePageChange((page - 1) * employeesData?.pagination?.count);
  };

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
      setPage(1);
    } catch (e: any) {
      showNotification({
        color: "red",
        title: "Error",
        message: e.message,
      });
    }
  };

  const handlePageChange = async (pageNumber: number) => {
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
      <Grid mt={12}>
        <Grid.Col span={2}>
          <EmployeeSearchForm onEmployeeSearch={handleEmployeeSearch} />
        </Grid.Col>

        <Grid.Col span={10}>
          <EmployeeList
            page={page}
            onPageChange={onPageChange}
            employeesData={employeesData}
            handleEmployeePageChange={handlePageChange}
          />
        </Grid.Col>
      </Grid>
    </>
  );
}

export default HomePage;
