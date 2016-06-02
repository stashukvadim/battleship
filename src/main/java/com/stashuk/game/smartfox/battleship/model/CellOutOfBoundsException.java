package com.stashuk.game.smartfox.battleship.model;

public class CellOutOfBoundsException extends RuntimeException {
    public CellOutOfBoundsException(int x, int y) {
        super("x = " + x + " y = " + y);
    }
}
