package game;

import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.extensions.SFSExtension;

public class GameExtension extends SFSExtension {
    private Board board1;
    private Board board2;
    private User whoseTurn;

    @Override
    public void init() {
        trace("Battleship game started");
        addRequestHandler("fire", GameController.class);
        whoseTurn = getParentRoom().getUserByPlayerId(1);
    }

    @Override
    public void destroy() {
        trace("Battleship game destroyed");
    }

    public Board getBoardForUserTurn() {
        return whoseTurn.getId() == 1 ? board2 : board1;
    }
}
