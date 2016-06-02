package com.stashuk.game.smartfox.battleship.model;

public class IllegalMoveException extends RuntimeException {
    public IllegalMoveException(String message) {
        super(message);
    }
}
