import { Image, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";

function EmployeeList(props: any) {
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
        page={props?.page}
        onPageChange={props?.onPageChange}
        recordsPerPage={props.employeesData?.pagination?.count}
        totalRecords={props.employeesData?.pagination?.total}
      />
    </>
  );
}

export default EmployeeList;
