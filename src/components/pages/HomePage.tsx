import { Center } from "@mantine/core";
import { searchEmployeeList } from "../../services/employeeService";
import EmployeeSearchForm from "../homepage/EmployeeSearhForm";

import { getToken } from "../../utils/localStorage";

function HomePage() {
  const handleEmployeeSearch = async (employeeSearch: object) => {
    const payload = {
      ...employeeSearch,
      liAt: getToken("linkedInScrappingLiAt"),
      jSessionId: getToken("linkedInScrappingJSessionId"),
    };

    const resp = await searchEmployeeList(payload);

    console.log(resp);
  };

  return (
    <>
      <Center>
        <EmployeeSearchForm onEmployeeSearch={handleEmployeeSearch} />
      </Center>
    </>
  );
}

export default HomePage;
