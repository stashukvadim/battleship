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

import java.util.List;
import java.util.stream.Collectors;

import static com.stashuk.game.smartfox.battleship.utils.ConversionUtil.boardToIntList;

public class BattleshipExtension extends SFSExtension {
    public static final String REQUEST_FIRE = "fire";
    public static final String REQUEST_SEND_BOARD = "sendBoard";

    public static final String RESPONSE_BOARDS_UPDATE = "boardsUpdate";
    public static final String RESPONSE_GAME_OVER = "gameOver";
    public static final String RESPONSE_START = "start";
    public static final String RESPONSE_BOARD_CHECK_RESULT = "boardCheckResult";
    public static final String RESPONSE_OPPONENT_LEFT = "opponentLeft";

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

        addRequestHandler(REQUEST_FIRE, MoveController.class);
        addRequestHandler(REQUEST_SEND_BOARD, BoardReceivedHandler.class);
        addEventHandler(SFSEventType.USER_DISCONNECT, UserLeftHandler.class);
        addEventHandler(SFSEventType.USER_LEAVE_ROOM, UserLeftHandler.class);
    }

    @Override
    public void destroy() {
        trace("Battleship game destroyed!");
        super.destroy();
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

        if (whoseTurn == null) {
            whoseTurn = Math.random() < 0.5 ? player1 : player2;
        }
        trace("whoseTurn = " + whoseTurn);

        send(RESPONSE_START, new SFSObject(), getParentRoom().getUserList());
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

            send(RESPONSE_BOARDS_UPDATE, respObj, user);
            trace("sent boarUpdate for User = " + user + " params = " + respObj);

            if (gameOver) {
                send(RESPONSE_GAME_OVER, new SFSObject(), user);
            }
        }
    }

    public List<User> getUsers() {
        return getGameRoom().getPlayersList();
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
