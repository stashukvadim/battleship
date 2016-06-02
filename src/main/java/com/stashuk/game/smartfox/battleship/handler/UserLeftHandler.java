package com.stashuk.game.smartfox.battleship.handler;

import com.smartfoxserver.v2.core.ISFSEvent;
import com.smartfoxserver.v2.entities.data.SFSObject;
import com.smartfoxserver.v2.exceptions.SFSException;
import com.smartfoxserver.v2.extensions.BaseServerEventHandler;
import com.stashuk.game.smartfox.battleship.controller.BattleshipExtension;

import static com.stashuk.game.smartfox.battleship.controller.BattleshipExtension.RESPONSE_OPPONENT_LEFT;

public class UserLeftHandler extends BaseServerEventHandler {
    @Override
    public void handleServerEvent(ISFSEvent isfsEvent) throws SFSException {
        trace("User left room!");
        BattleshipExtension game = (BattleshipExtension) getParentExtension();
        send(RESPONSE_OPPONENT_LEFT, new SFSObject(), game.getUsers());
        game.gameOver();
    }
}
