import { OpenConversation } from "../../components/Chat/OpenConversation";
import { Sidebar } from "../../components/Chat/Sidebar";
import { useConversations } from "../../core/contexts/ConversationsProviders";
import { useSelectUser } from "../../core/hooks/SelectUser/useSelectUser";
import { AuthenticatedView } from "../../core/wrappers/AuthenticatedView";
import { isBoolean } from "../../utils/isCheckers/isBooleans";

export const Chat = () => {
  const { user } = useSelectUser();
  const { selectedConversation } = useConversations();

  return !isBoolean(user) ? (
    <AuthenticatedView>
      <div className="d-flex" style={{ height: "100vh" }}>
        <Sidebar id={user.id} />
        {selectedConversation && <OpenConversation />}
      </div>
    </AuthenticatedView>
  ) : (
    <p>Something gone wrong!</p>
  );
};
