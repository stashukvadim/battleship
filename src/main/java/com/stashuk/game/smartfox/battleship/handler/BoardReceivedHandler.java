package com.stashuk.game.smartfox.battleship.handler;

import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.entities.data.SFSObject;
import com.smartfoxserver.v2.extensions.BaseClientRequestHandler;
import com.stashuk.game.smartfox.battleship.controller.BattleshipExtension;
import com.stashuk.game.smartfox.battleship.model.Board;
import com.stashuk.game.smartfox.battleship.model.BoardFactory;
import com.stashuk.game.smartfox.battleship.utils.ConversionUtil;

import java.util.List;

import static com.stashuk.game.smartfox.battleship.controller.BattleshipExtension.RESPONSE_BOARD_CHECK_RESULT;

public class BoardReceivedHandler extends BaseClientRequestHandler {
    @Override
    public void handleClientRequest(User user, ISFSObject params) {
        BattleshipExtension gameExt = (BattleshipExtension) getParentExtension();
        trace("in BoardReceivedHandler. User = " + user);
        List<Integer> boardAsList = (List<Integer>) params.getIntArray("board");
        trace("board = " + boardAsList);
        boolean[][] booleans = ConversionUtil.booleanMatrixFromList(boardAsList);

        Board verifiedBoard = null;
        SFSObject resObj = new SFSObject();
        try {
            verifiedBoard = new BoardFactory().boardFromMatrix(booleans);
        } catch (IllegalArgumentException e) {
            resObj.putBool("boardCorrect", false);
            trace("received board is incorrect!");
        }
        if (verifiedBoard != null) {
            trace("received board is correct");

            if (user.getPlayerId() == 1) {
                gameExt.setBoard1(verifiedBoard);
            } else {
                gameExt.setBoard2(verifiedBoard);
            }
            resObj.putBool("boardCorrect", true);
        }

        send(RESPONSE_BOARD_CHECK_RESULT, resObj, user);
        if (gameExt.getBoard1() != null && gameExt.getBoard2() != null) {
            gameExt.startGame();
        }
    }
}
