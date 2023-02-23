import { useState } from "react";

import { Grid } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import EmployeeList from "../homepage/EmployeeList";
import EmployeeSearchForm from "../homepage/EmployeeSearhForm";

import { getToken } from "../../utils/localStorage";

import {
  lazyLoadStatus,
  searchEmployeeDetail,
  searchEmployeeList,
  sendInvite,
} from "../../services/employeeService";
import EmployeeDetail from "../homepage/EmployeeDetail";

export interface employeesDataType {
  employees: any[];
  pagination: {
    count: 0;
  };
}

function HomePage() {
  const [page, setPage] = useState(1);
  const [isOpened, setOpened] = useState(false);

  const [isSendingInvite, setIsSendingInvite] = useState(false);
  const [isEmployeeListLoading, setEmployeeListLoading] = useState(false);

  const [employeesData, setEmployeeData] = useState<employeesDataType>({
    employees: [],
    pagination: {
      count: 0,
    },
  });

  const [employeeDetail, setEmployeeDetailData] = useState({
    number: "",
    email: "",
    connection: "",
    inviteeProfileUrn: "",
  });

  const [employeeSearchParams, setEmployeeSearch] = useState({});

  const [lazyLoadedActionUrns, setLazyLoadedActionUrns] = useState([]);
  const [selectedInviteeProfileUrn, setSelectedInviteeProfileUrn] =
    useState("");

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

    setEmployeeListLoading(true);
    try {
      const resp = await searchEmployeeList(payload);

      const lazyLoadedActionsUrns = resp?.data?.employees?.map(
        (employee: any) => employee?.lazyLoadedActionsUrns
      );

      setLazyLoadedActionUrns(lazyLoadedActionUrns);

      await loadMemberStatuses(lazyLoadedActionsUrns, resp.data);

      setPage(1);
    } catch (e: any) {
      showNotification({
        color: "red",
        title: "Error",
        message: e.message,
      });
    } finally {
      setEmployeeListLoading(false);
    }
  };

  const handlePageChange = async (pageNumber: number) => {
    const payload = {
      ...employeeSearchParams,
      pageNumber,
      liAt: getToken("linkedInScrappingLiAt"),
      jSessionId: getToken("linkedInScrappingJSessionId"),
    };

    setEmployeeListLoading(true);
    try {
      const resp = await searchEmployeeList(payload);

      const lazyLoadedActionsUrns = resp?.data?.employees?.map(
        (employee: any) => employee?.lazyLoadedActionsUrns
      );

      setLazyLoadedActionUrns(lazyLoadedActionUrns);

      await loadMemberStatuses(lazyLoadedActionsUrns, resp.data);
    } catch (e: any) {
      showNotification({
        color: "red",
        title: "Error",
        message: e.message,
      });
    } finally {
      setEmployeeListLoading(false);
    }
  };

  const onEmployeeDetailClick = async (
    employeeId: string,
    navigationURL: string
  ) => {
    try {
      const resp = await searchEmployeeDetail(employeeId, {
        liAt: getToken("linkedInScrappingLiAt"),
        jSessionId: getToken("linkedInScrappingJSessionId"),
        navigationURL,
      });

      setOpened(true);

      setEmployeeDetailData(resp.data);
    } catch (e: any) {}
  };

  const loadMemberStatuses = async (
    lazyLoadedActionsUrns: [],
    employeesResp: {
      employees: [];
      pagination: { count: 0 };
    }
  ) => {
    try {
      const statuses = await lazyLoadStatus({
        liAt: getToken("linkedInScrappingLiAt"),
        jSessionId: getToken("linkedInScrappingJSessionId"),
        lazyLoadedActionsUrns,
      });

      const pendingStatuses = statuses?.data?.membersStatus.filter(
        (status: any) =>
          "invitation" in status?.memberRelationshipData &&
          status?.memberRelationshipData?.invitation?.invitationState ===
            "PENDING"
      );

      const employeeMapped = new Map();

      employeesResp?.employees?.forEach((employee: any) =>
        employeeMapped.set(employee?.inviteeProfileUrn, employee)
      );

      pendingStatuses?.forEach((pendingStatus: any) => {
        if (
          employeeMapped.get(
            pendingStatus?.memberRelationshipData?.invitation?.inviteeMember
          )
        ) {
          employeeMapped?.set(
            pendingStatus?.memberRelationshipData?.invitation?.inviteeMember,
            {
              ...employeeMapped.get(
                pendingStatus?.memberRelationshipData?.invitation?.inviteeMember
              ),
              invitation: "PENDING",
            }
          );
        }
      });

      setEmployeeData({
        employees: Array.from(employeeMapped.values()),
        pagination: employeesResp.pagination,
      });
    } catch (e: any) {
      showNotification({
        color: "red",
        title: "Error",
        message: e.message,
      });
    }
  };

  const onSendInvite = async (inviteeProfileUrn: string) => {
    setIsSendingInvite(true);
    setSelectedInviteeProfileUrn(inviteeProfileUrn);
    try {
      const resp = await sendInvite({
        liAt: getToken("linkedInScrappingLiAt"),
        jSessionId: getToken("linkedInScrappingJSessionId"),
        inviteeProfileUrn,
      });

      await handlePageChange(page);
    } catch (e: any) {
      showNotification({
        color: "red",
        title: "Error",
        message: e.message,
      });
    } finally {
      setIsSendingInvite(false);
    }
  };

  return (
    <>
      <Grid mt={12}>
        <Grid.Col span={2}>
          <EmployeeSearchForm onEmployeeSearch={handleEmployeeSearch} />
        </Grid.Col>

        <EmployeeDetail
          isOpened={isOpened}
          setOpened={setOpened}
          contactNumber={employeeDetail.number}
          email={employeeDetail.email}
          inviteeProfileUrn={employeeDetail.inviteeProfileUrn}
          connection={employeeDetail.connection}
          onSendInviteClick={onSendInvite}
        ></EmployeeDetail>

        <Grid.Col span={10}>
          <EmployeeList
            page={page}
            onPageChange={onPageChange}
            employeesData={employeesData}
            selectedInviteeProfileUrn={selectedInviteeProfileUrn}
            isListLoading={isEmployeeListLoading}
            isSendingInvite={isSendingInvite}
            handleEmployeePageChange={handlePageChange}
            onRowClick={onEmployeeDetailClick}
            onSendInviteClick={onSendInvite}
          />
        </Grid.Col>
      </Grid>
    </>
  );
}

export default HomePage;
