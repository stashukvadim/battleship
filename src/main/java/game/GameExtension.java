package game;

import com.smartfoxserver.v2.entities.Room;
import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.entities.data.SFSObject;
import com.smartfoxserver.v2.extensions.SFSExtension;

public class GameExtension extends SFSExtension {
    private Board board1;
    private Board board2;
    private User whoseTurn;

    @Override
    public void init() {
        trace("Battleship game started");
        board1 = new Board("Board1");
        board2 = new Board("Board2");
        addRequestHandler("fire", MoveController.class);
        addRequestHandler("ready", ReadyHandler.class);
        addRequestHandler("setShipCell", AddShipCellHandler.class);
        whoseTurn = getParentRoom().getUserByPlayerId(1);
    }

    @Override
    public void destroy() {
        trace("Battleship game destroyed");
    }

    public Board getBoardForUserTurn() {
        return whoseTurn.getId() == 1 ? board2 : board1;
    }

    Room getGameRoom() {
        return this.getParentRoom();
    }

    void startGame() {

        User player1 = getParentRoom().getUserByPlayerId(1);
        User player2 = getParentRoom().getUserByPlayerId(2);
        trace("player1 = " + player1);
        trace("player2 = " + player2);

        // No turn assigned? Let's start with player 1
        if (whoseTurn == null) whoseTurn = player1;
        trace("whoseTurn = " + whoseTurn);

        // Send START event to client
        ISFSObject resObj = new SFSObject();
        resObj.putInt("t", whoseTurn.getPlayerId());
        resObj.putUtfString("p1n", player1.getName());
        resObj.putInt("p1i", player1.getId());
        resObj.putUtfString("p2n", player2.getName());
        resObj.putInt("p2i", player2.getId());

        send("start", resObj, getParentRoom().getUserList());
        trace("send start message to client");
    }
}
