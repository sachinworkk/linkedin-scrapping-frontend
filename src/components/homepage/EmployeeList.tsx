import { Badge, Button, Flex, Image } from "@mantine/core";
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
          { accessor: "connection", title: "Connection" },
          {
            accessor: "connection",
            title: "Options",
            // @ts-ignore
            render: ({ connection, inviteeProfileUrn, invitation }) =>
              connection === "1st degree connection" ? (
                <h1></h1>
              ) : invitation === "PENDING" ? (
                <Badge color="gray">PENDING</Badge>
              ) : (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();

                    props.onSendInviteClick(inviteeProfileUrn);
                  }}
                  loading={
                    inviteeProfileUrn === props.selectedInviteeProfileUrn &&
                    props.isSendingInvite
                  }
                  disabled={invitation === "PENDING"}
                >
                  {invitation === "PENDING" ? "Pending" : "Send Invite"}
                </Button>
              ),
          },
        ]}
        records={props?.employeesData?.employees}
        page={props?.page}
        onPageChange={props?.onPageChange}
        recordsPerPage={props.employeesData?.pagination?.count}
        totalRecords={props.employeesData?.pagination?.total}
        // @ts-ignore
        onRowClick={({ employeeId, navigationURL }) =>
          props?.onRowClick(employeeId, navigationURL)
        }
      />
    </>
  );
}

export default EmployeeList;
