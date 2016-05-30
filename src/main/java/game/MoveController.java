package game;

import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.entities.data.SFSObject;
import com.smartfoxserver.v2.exceptions.SFSRuntimeException;
import com.smartfoxserver.v2.extensions.BaseClientRequestHandler;

import java.util.List;
import java.util.stream.Collectors;

public class MoveController extends BaseClientRequestHandler {
    @Override
    public void handleClientRequest(User user, ISFSObject params) {
        // Check params
        if (!params.containsKey("cellId")) {
            throw new SFSRuntimeException("Invalid request, one mandatory param is missing. Required 'x' and 'y'");
        }
        trace();
        GameExtension gameExt = (GameExtension) getParentExtension();
        String cellIdString = params.getUtfString("cellId");
        trace("sellIdString = " + cellIdString);
        trace("sellIdString substring " + cellIdString.substring(1));

        int cellId = Integer.valueOf(cellIdString.substring(1));
        trace("int cellId  = " + cellId);


        Board enemyBoard = (Board) user.getProperty("enemyBoard");

        FireResult fireResult = enemyBoard.fire(cellId);

        ISFSObject respObj = new SFSObject();
        respObj.putUtfString("fireResult", fireResult.toString());
        sendBoardsUpdate();

        gameExt.trace(String.format("Handling move from player %s. Cell id = %s", user.getPlayerId(), cellId));
    }

    private void sendBoardsUpdate() {
        GameExtension gameExt = (GameExtension) getParentExtension();
        List<User> userList = gameExt.getGameRoom().getUserList();
        for (User user : userList) {
            ISFSObject respObj = new SFSObject();

            Board board = (Board) user.getProperty("board");
            Board enemyBoard = (Board) user.getProperty("enemyBoard");
            respObj.putIntArray("board", board.toIntList());

            List<Integer> enemyBoardList = enemyBoard.toIntList().stream().map(i -> i == 1 ? 0 : i)
                                                     .collect(Collectors.toList());
            respObj.putIntArray("enemyBoard", enemyBoardList);

            send("boardsUpdate", respObj, user);
        }
    }
}
