package com.stashuk.game.smartfox.battleship.controller;

import com.smartfoxserver.v2.core.SFSEventType;
import com.smartfoxserver.v2.entities.Room;
import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.entities.data.SFSObject;
import com.smartfoxserver.v2.extensions.SFSExtension;
import com.stashuk.game.smartfox.battleship.handler.BoardReceivedHandler;
import com.stashuk.game.smartfox.battleship.handler.MoveController;
import com.stashuk.game.smartfox.battleship.handler.UserLeftHandler;
import com.stashuk.game.smartfox.battleship.model.Board;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.stashuk.game.smartfox.battleship.utils.ConversionUtil.boardToIntList;

public class BattleshipExtension extends SFSExtension {
    public static final String FIRE_REQUEST = "fire";
    public static final String SEND_BOARD_REQUEST = "sendBoard";

    private Board board1;
    private Board board2;
    private User whoseTurn;
    private boolean gameOver;

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

        addRequestHandler(FIRE_REQUEST, MoveController.class);
        addRequestHandler(SEND_BOARD_REQUEST, BoardReceivedHandler.class);
        addEventHandler(SFSEventType.USER_DISCONNECT, UserLeftHandler.class);
        addEventHandler(SFSEventType.USER_LEAVE_ROOM, UserLeftHandler.class);

        whoseTurn = getUserById(1);
    }

    @Override
    public void destroy() {
        super.destroy();
        trace("Battleship game destroyed!");
    }

    public Room getGameRoom() {
        return this.getParentRoom();
    }

    public void stopGame() {

    }

    public void startGame() {
        trace("startGame()");
        User player1 = getUserById(1);
        User player2 = getUserById(2);
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
        resObj.putUtfString("gameName", getGameRoom().getName());

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
            respObj.putIntArray("board", boardToIntList(board));
            List<Integer> oppBoardList;
            if (!gameOver) {
                oppBoardList = boardToIntList(enemyBoard).stream().map(i -> i == 1 ? 0 : i)
                                                         .collect(Collectors.toList());
            } else {
                oppBoardList = boardToIntList(enemyBoard);
            }
            respObj.putIntArray("enemyBoard", oppBoardList);

            send("boardsUpdate", respObj, user);
            trace("sent boarUpdate for User = " + user + " params = " + respObj);

            if (gameOver) {
                send("gameOver", respObj, user);//dummy response object
            }
        }
    }

    public List<User> getUsers() {
        List<User> users = new ArrayList<>();
        User user1 = getUserById(1);
        User user2 = getUserById(2);
        if (user1 != null) {
            users.add(user1);
        }
        if (user2 != null) {
            users.add(user2);
        }
        return users;
    }

    public User getUserById(int id) {
        return getParentRoom().getUserByPlayerId(id);
    }

    public boolean isGameOver() {
        return (gameOver || board1.allShipsDead() || board2.allShipsDead());
    }

    public Board getUserBoard(User user) {
        return user.getPlayerId() == 1 ? board1 : board2;
    }

    public Board getOpponentBoard(User user) {
        return user.getPlayerId() == 1 ? board2 : board1;
    }

    public void gameOver() {
        gameOver = true;
        trace("User gone. removeRoom");
        getApi().removeRoom(getGameRoom());
    }
}
