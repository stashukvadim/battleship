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
        BattleshipExtension game = (BattleshipExtension) getParentExtension();
        trace("in BoardReceivedHandler. User = " + user);
        List<Integer> boardAsList = (List<Integer>) params.getIntArray("board");
        trace("board = " + boardAsList);
        boolean[][] booleans = ConversionUtil.booleanMatrixFromList(boardAsList);

        Board verifiedBoard = null;
        SFSObject response = new SFSObject();
        try {
            verifiedBoard = new BoardFactory().boardFromMatrix(booleans);
        } catch (IllegalArgumentException e) {
            response.putBool("boardCorrect", false);
            trace("received board is incorrect!");
        }
        if (verifiedBoard != null) {
            trace("received board is correct");

            if (user.getPlayerId() == 1) {
                game.setBoard1(verifiedBoard);
            } else {
                game.setBoard2(verifiedBoard);
            }
            response.putBool("boardCorrect", true);
        }

        send(RESPONSE_BOARD_CHECK_RESULT, response, user);
        if (game.getBoard1() != null && game.getBoard2() != null) {
            game.startGame();
        }
    }
}
