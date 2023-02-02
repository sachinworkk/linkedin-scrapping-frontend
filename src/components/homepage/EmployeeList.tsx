import { Image, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useState, useEffect } from "react";

function EmployeeList(props: any) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    props.handleEmployeePageChange(
      (page - 1) * props.employeesData?.pagination?.count
    );
  }, [page]);

  return (
    <>
      <DataTable
        columns={[
          { accessor: "name", title: "Name" },
          { accessor: "profession", title: "Profession" },
          { accessor: "location", title: "Location" },
          {
            accessor: "imageURL",
            title: "Image",
            // @ts-ignore
            render: ({ imageURL }) => (
              <Image
                width={30}
                height={30}
                fit="contain"
                src={imageURL}
                placeholder={
                  <Text align="center">
                    This image contained the meaning of life
                  </Text>
                }
              />
            ),
          },
        ]}
        records={props?.employeesData?.employees}
        page={page}
        onPageChange={(p) => setPage(p)}
        recordsPerPage={props.employeesData?.pagination?.count}
        totalRecords={props.employeesData?.pagination?.total}
      />
    </>
  );
}

export default EmployeeList;
