package com.stashuk.game.smartfox.battleship.handler;

import com.smartfoxserver.v2.core.ISFSEvent;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.entities.data.SFSObject;
import com.smartfoxserver.v2.exceptions.SFSException;
import com.smartfoxserver.v2.extensions.BaseServerEventHandler;
import com.stashuk.game.smartfox.battleship.controller.BattleshipExtension;

public class UserLeftHandler extends BaseServerEventHandler {
    @Override
    public void handleServerEvent(ISFSEvent isfsEvent) throws SFSException {
        trace("User left room!");
        ISFSObject respObj = new SFSObject();
        BattleshipExtension gameExt = (BattleshipExtension) getParentExtension();
        send("opponentLeft", respObj, gameExt.getUsers());
        gameExt.gameOver();
    }
}
