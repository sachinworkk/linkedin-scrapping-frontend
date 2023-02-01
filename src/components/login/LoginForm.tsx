import {
  Button,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";

import { useForm } from "@mantine/form";

function LoginForm(props: any) {
  const form: any = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: (values) => ({
      email:
        values.email === ""
          ? "Email is required"
          : /^\S+@\S+$/.test(values.email)
          ? null
          : "Invalid email",
      password: values.password === "" ? "Password is required" : null,
    }),
  });

  return (
    <Paper radius="md" p="xl" withBorder>
      <form
        onSubmit={form.onSubmit((values: object) =>
          props.onLoginFormSubmit(values)
        )}
      >
        <Stack spacing="lg">
          <Text size="lg" weight={500}>
            Welcome to Employee Tracking System
          </Text>

          <Divider />
          <TextInput
            label="Email"
            value={form.values.email}
            placeholder="hello@example.com"
            {...form.getInputProps("email")}
          />

          <PasswordInput
            label="Password"
            value={form.values.password}
            placeholder="Your password"
            {...form.getInputProps("password")}
          />
        </Stack>

        <Group position="apart" mt="xl">
          <Button type="submit">Login</Button>
        </Group>
      </form>
    </Paper>
  );
}

export default LoginForm;
