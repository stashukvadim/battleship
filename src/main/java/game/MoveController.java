package game;

import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.entities.data.SFSObject;
import com.smartfoxserver.v2.exceptions.SFSRuntimeException;
import com.smartfoxserver.v2.extensions.BaseClientRequestHandler;

import static game.FireResult.MISS;

public class MoveController extends BaseClientRequestHandler {
    @Override
    public void handleClientRequest(User user, ISFSObject params) {
        // Check params
        if (!params.containsKey("cellId")) {
            throw new SFSRuntimeException("Invalid request, mandatory param is missing. Required param = cellId");
        }
        GameExtension gameExt = (GameExtension) getParentExtension();
        if (gameExt.isGameOver()) {
            throw new SFSRuntimeException("Game is over. No more moves allowed.");
        }
        if (user != gameExt.getWhoseTurn()) {
            throw new SFSRuntimeException("Invalid request, it'n not this user's turn now. User = " + user);
        }

        String cellIdString = params.getUtfString("cellId");

        int cellId = Integer.valueOf(cellIdString.substring(1));
        gameExt.trace(String.format("Handling move from player %s. Cell id = %s", user.getPlayerId(), cellId));

        Board enemyBoard = (Board) user.getProperty("enemyBoard");

        FireResult fireResult = enemyBoard.fire(cellId);

        if (fireResult == MISS) {
            gameExt.changeTurn(user);
        }

        ISFSObject respObj = new SFSObject();
        respObj.putUtfString("fireResult", fireResult.toString());
        gameExt.sendBoardsUpdate();
    }
}
