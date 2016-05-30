package game;

import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.entities.data.SFSObject;
import com.smartfoxserver.v2.extensions.BaseClientRequestHandler;

public class AddShipCellHandler extends BaseClientRequestHandler {
    @Override
    public void handleClientRequest(User user, ISFSObject params) {
        trace("in AddShipCellHandler");
        trace("user = " + user);
        trace("params = " + params);
        int cellId = Integer.valueOf(params.getUtfString("cellId"));
        trace("cellId = " + cellId);

        ISFSObject resObj = new SFSObject();
        GameExtension gameExt = (GameExtension) getParentExtension();

        Board board = new Board("b");
        board.putHardCodedShips();
        resObj.putIntArray("board", board.toIntList());

        send("board", resObj, user);
    }
}
