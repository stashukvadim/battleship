package game;

import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.extensions.BaseClientRequestHandler;

public class ReadyHandler extends BaseClientRequestHandler {
    @Override
    public void handleClientRequest(User user, ISFSObject params) {
        GameExtension gameExt = (GameExtension) getParentExtension();

        if (user.isPlayer()) {
            // Checks if two players are available and start game
            int userCount = gameExt.getGameRoom().getSize().getUserCount();
            trace("Check if two players are available and start game. userCount = " + userCount);
            if (userCount == 2) {
                trace("UserCount = " + userCount);
                trace("getUserList().size() = " + gameExt.getGameRoom().getUserList().size());
                trace(gameExt.getGameRoom().getUserList());
                gameExt.getGameRoom().getUserList().forEach(e -> trace("User name = " + user));
            }
            gameExt.startGame();
        }
    }
}