import {
  Text,
  Paper,
  Divider,
  Select,
  Group,
  Button,
  Stack,
} from "@mantine/core";

import { useForm } from "@mantine/form";

import { ORGANIZATIONS, PROFESSION } from "../../constants/constants";

function EmployeeSearchForm(props: any) {
  const form: any = useForm({
    initialValues: {
      organization: "",
      profession: "",
    },
  });

  return (
    <Paper radius="md" p="xl" withBorder>
      <form
        onSubmit={form.onSubmit((values: object) =>
          props.onEmployeeSearch(values)
        )}
      >
        <Stack spacing="lg">
          <Text size="lg" weight={500}>
            Search Employee
          </Text>

          <Divider />

          <Select
            label="Organizations"
            placeholder="Organization"
            data={ORGANIZATIONS}
            {...form.getInputProps("organization")}
          />

          <Select
            label="Professions"
            placeholder="Profession"
            data={PROFESSION}
            {...form.getInputProps("profession")}
          />
        </Stack>

        <Group position="apart" mt="xl">
          <Button type="submit">Search</Button>
        </Group>
      </form>
    </Paper>
  );
}

export default EmployeeSearchForm;
