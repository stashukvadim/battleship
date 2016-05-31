package game;

import com.smartfoxserver.v2.core.SFSEventType;
import com.smartfoxserver.v2.entities.Room;
import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.entities.data.SFSObject;
import com.smartfoxserver.v2.extensions.SFSExtension;
import game.model.Board;

import java.util.List;
import java.util.stream.Collectors;

public class GameExtension extends SFSExtension {
    private Board board1;
    private Board board2;
    private User whoseTurn;

    public Board getBoard1() {
        return board1;
    }

    public void setBoard1(Board board1) {
        trace("setBoard1");
        this.board1 = board1;
    }

    public Board getBoard2() {
        return board2;
    }

    public void setBoard2(Board board2) {
        trace("setBoard2");
        this.board2 = board2;
    }

    public User getWhoseTurn() {
        return whoseTurn;
    }

    @Override
    public void init() {
        trace("init() - Battleship game started");

        addRequestHandler("fire", MoveController.class);
        addRequestHandler("sendBoard", BoardReceivedHandler.class);
        addEventHandler(SFSEventType.USER_LEAVE_ROOM, UserLeftHandler.class);

        whoseTurn = getUserById(1);
    }

    @Override
    public void destroy() {
        trace("Battleship game destroyed");
    }

    Room getGameRoom() {
        return this.getParentRoom();
    }

    public void stopGame() {

    }

    void startGame() {
        trace("startGame()");
        User player1 = getUserById(1);
        User player2 = getUserById(2);
        trace("player1 = " + player1);
        trace("player2 = " + player2);

        board1 = (Board) player1.getProperty("board");
        board2 = (Board) player2.getProperty("board");

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
        sendBoardsUpdate();
    }

    public void changeTurn(User user) {
        User player1 = getUserById(1);
        User player2 = getUserById(2);
        whoseTurn = user == player1 ? player2 : player1;
        trace("changeTurn: now it's turn of " + whoseTurn);
    }

    public void sendBoardsUpdate() {
        trace("sendBoardsUpdate()");
        List<User> userList = getGameRoom().getUserList();
        boolean gameOver = isGameOver();
        for (User user : userList) {
            ISFSObject respObj = new SFSObject();

            boolean isYourTurn = user == getWhoseTurn();
            respObj.putBool("isYourTurn", isYourTurn);

            trace("in sendBoardsUpdate() : isYourTurn = " + isYourTurn);

            Board board = getUserBoard(user);
            Board enemyBoard = getOpponentBoard(user);
            respObj.putIntArray("board", board.toIntList());
            List<Integer> oppBoardList;
            if (!gameOver) {
                oppBoardList = enemyBoard.toIntList().stream().map(i -> i == 1 ? 0 : i).collect(Collectors.toList());
            } else {
                oppBoardList = enemyBoard.toIntList();
            }
            respObj.putIntArray("enemyBoard", oppBoardList);

            send("boardsUpdate", respObj, user);
            trace("sent boarUpdate for User = " + user + " params = " + respObj);

            if (gameOver) {
                send("gameOver", respObj, user);//dummy response object
            }
        }
    }

    public User getUserById(int id) {
        return getParentRoom().getUserByPlayerId(id);
    }

    public boolean isGameOver() {
        trace("board1.allShipsDead() = " + board1.allShipsDead() + ", board2.allShipsDead() = " + board2
                .allShipsDead());
        return (board1.allShipsDead() || board2.allShipsDead());
    }

    public Board getUserBoard(User user) {
        return user.getPlayerId() == 1 ? board1 : board2;
    }

    public Board getOpponentBoard(User user) {
        return user.getPlayerId() == 1 ? board2 : board1;
    }
}
