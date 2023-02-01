import AppRoutes from "./router/AppRoutes";

import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

function App() {
  return (
    <MantineProvider>
      <NotificationsProvider>
        <AppRoutes />
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
