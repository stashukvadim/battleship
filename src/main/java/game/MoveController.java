package game;

import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.entities.data.SFSObject;
import com.smartfoxserver.v2.exceptions.SFSRuntimeException;
import com.smartfoxserver.v2.extensions.BaseClientRequestHandler;

public class MoveController extends BaseClientRequestHandler {
    @Override
    public void handleClientRequest(User user, ISFSObject params) {
        // Check params
        if (!params.containsKey("x") || !params.containsKey("y"))
            throw new SFSRuntimeException("Invalid request, one mandatory param is missing. Required 'x' and 'y'");

        GameExtension gameExt = (GameExtension) getParentExtension();

        int x = params.getInt("x");
        int y = params.getInt("y");

        Board board = gameExt.getBoardForUserTurn();
        FireResult fireResult = board.fire(x, y);

        ISFSObject respObj = new SFSObject();
        respObj.putUtfString("fireResult", fireResult.toString());
//        respObj.putByteArray("fireResult", getByteArrayFromMatrix(gameExt.getBoardForUserTurn()));


        gameExt.trace(String.format("Handling move from player %s. (%s, %s)", user.getPlayerId(), x, y));

    }


}
