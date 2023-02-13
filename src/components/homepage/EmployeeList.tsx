import { Flex, Image } from "@mantine/core";
import { DataTable } from "mantine-datatable";

function EmployeeList(props: any) {
  return (
    <>
      <DataTable
        fetching={props?.isListLoading}
        columns={[
          {
            accessor: "name",
            title: "Name",
            // @ts-ignore
            render: ({ name, imageURL }) => (
              <Flex gap={6}>
                <Image
                  width={30}
                  height={30}
                  fit="contain"
                  src={imageURL}
                  withPlaceholder
                />

                <span>{name}</span>
              </Flex>
            ),
          },
          { accessor: "profession", title: "Profession" },
          { accessor: "location", title: "Location" },
        ]}
        records={props?.employeesData?.employees}
        page={props?.page}
        onPageChange={props?.onPageChange}
        recordsPerPage={props.employeesData?.pagination?.count}
        totalRecords={props.employeesData?.pagination?.total}
      />
    </>
  );
}

export default EmployeeList;
