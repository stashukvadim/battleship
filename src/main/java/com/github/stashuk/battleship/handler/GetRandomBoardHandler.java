package com.github.stashuk.battleship.handler;

import com.github.stashuk.battleship.controller.BattleshipExtension;
import com.github.stashuk.battleship.model.Board;
import com.github.stashuk.battleship.model.BoardFactory;
import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.entities.data.SFSObject;
import com.smartfoxserver.v2.exceptions.SFSRuntimeException;
import com.smartfoxserver.v2.extensions.BaseClientRequestHandler;

import static com.github.stashuk.battleship.controller.BattleshipExtension.RESPONSE_RANDOM_BOARD;
import static com.github.stashuk.battleship.utils.Conversions.boardToIntList;

public class GetRandomBoardHandler extends BaseClientRequestHandler {


    @Override
    public void handleClientRequest(User user, ISFSObject isfsObject) {
        BattleshipExtension game = (BattleshipExtension) getParentExtension();
        if (game.isGameStarted()) {
            throw new SFSRuntimeException("The game already started. You can't change a board now.");
        }
        trace("in GetRandomBoardHandler. User = " + user);

        Board randomBoard = new BoardFactory().newRandomBoard();
        if (user.getPlayerId() == 1) {
            game.setBoard1(randomBoard);
        } else {
            game.setBoard2(randomBoard);
        }

        SFSObject response = new SFSObject();
        response.putIntArray("randomBoard", boardToIntList(randomBoard));
        send(RESPONSE_RANDOM_BOARD, response, user);
        if (game.getBoard1() != null && game.getBoard2() != null) {
            game.startGame();
        }
    }
}

