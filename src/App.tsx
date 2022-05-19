import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import classes from "./App.module.css";
import { ConversationsProvider } from "./core/contexts/ConversationsProviders";
import { SocketProvider } from "./core/contexts/SockerProvider";
import { useChat } from "./core/hooks/Chat/useChat";
import { useSelectUser } from "./core/hooks/SelectUser/useSelectUser";
import { BootstrapAuthentication } from "./core/wrappers/BootstrapAuthentication";
import { RouterPathsKeys } from "./types";
import { isBoolean } from "./utils/isCheckers/isBooleans";
import { Chat } from "./view/Chat/Chat";
import { Client } from "./view/Clients/Client/Client";
import { Clients } from "./view/Clients/Clients";
import { Companies } from "./view/Companies/Companies";
import { CompanyDetails } from "./view/Companies/CompanyDetails/CompanyDetails";
import { Employee } from "./view/Employees/EmployeeDetails/Employee";
import { Employees } from "./view/Employees/Employees";
import { Files } from "./view/Files/Files";
import { MyProfile } from "./view/MyProfile/MyProfile";
import { OrderDetails } from "./view/Orders/OrderDetails/OrderDetails";
import { Orders } from "./view/Orders/Orders";
import { SignIn } from "./view/SignIn/SignIn";

function App() {
  const { user } = useSelectUser();
  // const { convs } = useChat({ fetchOnMount: true });
  let id;

  if (!isBoolean(user)) {
    id = user.id;
  }

  return (
    <SocketProvider id={id}>
      <ConversationsProvider id={id}>
        <BootstrapAuthentication>
          <div className={classes.App}>
            <Router>
              <Routes>
                <Route path="*" element={<SignIn />} />
                <Route path={RouterPathsKeys.SIGN_IN} element={<SignIn />} />
                <Route
                  path={RouterPathsKeys.MY_PROFILE}
                  element={<MyProfile />}
                />
                <Route
                  path={RouterPathsKeys.EMPLOYEE}
                  element={<Employees />}
                />
                <Route
                  path={RouterPathsKeys.EMPLOYEE + ":id"}
                  element={<Employee />}
                />
                <Route path={RouterPathsKeys.CLIENT} element={<Clients />} />
                <Route
                  path={RouterPathsKeys.CLIENT + ":id"}
                  element={<Client />}
                />
                <Route path={RouterPathsKeys.ORDER} element={<Orders />} />
                <Route
                  path={RouterPathsKeys.ORDER + ":id"}
                  element={<OrderDetails />}
                />
                <Route path={RouterPathsKeys.COMPANY} element={<Companies />} />
                <Route
                  path={RouterPathsKeys.COMPANY + ":id"}
                  element={<CompanyDetails />}
                />
                <Route path={RouterPathsKeys.FILE} element={<Files />} />
                <Route path={RouterPathsKeys.CHAT} element={<Chat />} />
              </Routes>
            </Router>
          </div>
        </BootstrapAuthentication>
      </ConversationsProvider>
    </SocketProvider>
  );
}

export default App;
