import { Button } from "@mantine/core";
import { Modal } from "@mantine/core";

interface EmployeeDetailProps {
  isOpened: boolean;
  setOpened: Function;
  contactNumber: String;
  email: String;
  connection: String;
  onSendInviteClick: Function;
  inviteeProfileUrn: String;
}

function EmployeeDetail(props: EmployeeDetailProps) {
  return (
    <Modal
      opened={props.isOpened}
      onClose={() => props.setOpened(false)}
      title="Contact Info"
    >
      <h2>Phone</h2>
      <span>{props.contactNumber}</span>

      <h2>Email</h2>
      <span>{props.email}</span>

      {props.connection === "1st degree connection" || (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            props.onSendInviteClick(props.inviteeProfileUrn);
          }}
        >
          Send Invite
        </Button>
      )}
    </Modal>
  );
}

export default EmployeeDetail;
