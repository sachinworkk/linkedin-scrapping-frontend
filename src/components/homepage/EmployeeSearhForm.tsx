import {
  Text,
  Paper,
  Divider,
  Group,
  Button,
  Stack,
  TextInput,
  Autocomplete,
} from "@mantine/core";
import { useForm } from "@mantine/form";

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
        onSubmit={form.onSubmit((values: object) => {
          props.onEmployeeSearch(values);
        })}
      >
        <Stack spacing="lg">
          <Text size="lg" weight={500}>
            Search Employee
          </Text>

          <Divider />

          <Autocomplete
            label="Search"
            placeholder="Enter your search query"
            value={props.searchValue}
            data={props.employees}
            onChange={props.onEmployeeListSearch}
            onItemSubmit={(item) =>
              form.setFieldValue("organization", item?.id)
            }
          />

          <TextInput
            label="Professions"
            placeholder="Profession"
            {...form.getInputProps("profession")}
          />

          {/* <Select
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
          /> */}
        </Stack>

        <Group position="apart" mt="xl">
          <Button type="submit">Search</Button>
        </Group>
      </form>
    </Paper>
  );
}

export default EmployeeSearchForm;
