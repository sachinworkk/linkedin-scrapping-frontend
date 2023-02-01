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

import { Autocomplete } from "@mantine/core";

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

          <Autocomplete
            label="Organization"
            placeholder="Organization"
            {...form.getInputProps("organization")}
            data={["React", "Angular", "Svelte", "Vue"]}
          />

          <Select
            label="Profession"
            placeholder="Profession"
            data={[
              { value: "project%20manager", label: "Project Manager" },
              { value: "Software%20Engineer", label: "Software Engineer" },
            ]}
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
