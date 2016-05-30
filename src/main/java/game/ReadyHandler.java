package game;

import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.extensions.BaseClientRequestHandler;

import java.util.List;

public class ReadyHandler extends BaseClientRequestHandler {
    @Override
    public void handleClientRequest(User user, ISFSObject params) {
        GameExtension gameExt = (GameExtension) getParentExtension();
        trace("Ready send from " + user);
        user.setProperty("ready", true);
        if (user.isPlayer()) {
            // Checks if two players are available and start game
            int userCount = gameExt.getGameRoom().getSize().getUserCount();
            trace("Check if two players are available and start game. userCount = " + userCount);
            List<User> userList = gameExt.getGameRoom().getUserList();
            boolean bothUsersReady = true;

            for (User u : userList) {
                Boolean ready = (Boolean) u.getProperty("ready");
                trace(u.getName() + "is ready? " + ready);
                if (!ready) {
                    bothUsersReady = false;
                }
            }

            if (userCount == 2 && bothUsersReady) {
                trace("Both users ready");
                trace("UserCount = " + userCount);
                trace("getUserList().size() = " + userList.size());
                trace(userList);
                userList.forEach(e -> trace("User name = " + user));
                gameExt.startGame();
                gameExt.sendBoardsUpdate();
            } else {
                trace("Both users are not ready");
            }
        }
    }
}