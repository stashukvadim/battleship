package com.stashuk.game.smartfox.battleship.handler;

import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.entities.data.SFSObject;
import com.smartfoxserver.v2.exceptions.SFSRuntimeException;
import com.smartfoxserver.v2.extensions.BaseClientRequestHandler;
import com.stashuk.game.smartfox.battleship.controller.BattleshipExtension;
import com.stashuk.game.smartfox.battleship.model.Board;
import com.stashuk.game.smartfox.battleship.model.FireResult;

import static com.stashuk.game.smartfox.battleship.model.FireResult.MISSED;
import static com.stashuk.game.smartfox.battleship.utils.ConversionUtil.xFrom;
import static com.stashuk.game.smartfox.battleship.utils.ConversionUtil.yFrom;

public class MoveController extends BaseClientRequestHandler {
    @Override
    public void handleClientRequest(User user, ISFSObject params) {
        if (!params.containsKey("cellId")) {
            throw new SFSRuntimeException("Invalid request, mandatory param is missing. Required param = cellId");
        }
        BattleshipExtension gameExt = (BattleshipExtension) getParentExtension();
        if (gameExt.isGameOver()) {
            throw new SFSRuntimeException("Game is over. No more moves allowed.");
        }
        if (user != gameExt.getWhoseTurn()) {
            throw new SFSRuntimeException("Invalid request, it'n not this user's turn now. User = " + user);
        }
        trace("in MoveController");
        String cellIdString = params.getUtfString("cellId");
        int cellId = Integer.valueOf(cellIdString.substring(1));
        trace(String.format("Handling move from player %s. Cell id = %s", user.getPlayerId(), cellId));

        Board enemyBoard = gameExt.getOpponentBoard(user);

        FireResult fireResult = enemyBoard.fire(xFrom(cellId), yFrom(cellId));

        if (fireResult == MISSED) {
            gameExt.changeTurn(user);
        }

        ISFSObject respObj = new SFSObject();
        respObj.putUtfString("fireResult", fireResult.toString());
        gameExt.sendBoardsUpdate();
    }
}
