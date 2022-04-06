import { ChatEngine } from "react-chat-engine";
import { useSelectUser } from "../../core/hooks/SelectUser/useSelectUser";
import { AuthenticatedView } from "../../core/wrappers/AuthenticatedView";
import { isBoolean } from "../../utils/isCheckers/isBooleans";

export const Chat = () => {
  const { user } = useSelectUser();

  return !isBoolean(user) ? (
    <AuthenticatedView>
      <ChatEngine
        height="100vh"
        projectID="62fb8780-4142-4475-87fb-5ec7f764c07e"
        userName={`${user.firstName}_${user.lastName}`}
        userSecret={user.id}
      />
    </AuthenticatedView>
  ) : (
    <p>Something gone wrong!</p>
  );
};
