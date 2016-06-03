package com.github.stashuk.battleship.model;

import com.github.stashuk.battleship.utils.Verifications;

public class Cell {
    private final int x;
    private final int y;
    private CellState state;
    private Ship ship;//null for empty cell
    private boolean available;

    public Cell(int x, int y) {
        Verifications.verifyCoordinatesCorrect(x, y);
        this.x = x;
        this.y = y;
        this.state = CellState.EMPTY;
        available = true;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setUnavailable() {
        available = false;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public CellState getState() {
        return state;
    }

    public void setState(CellState state) {
        this.state = state;
    }

    public int getId() {
        return x * 10 + y;
    }

    public Ship getShip() {
        return ship;
    }

    public void setShip(Ship ship) {
        if (!available) {
            throw new IllegalArgumentException("Cell is unavailable");
        }
        this.ship = ship;
    }

    @Override
    public String toString() {
        return "Cell{" +
                "x=" + x +
                ", y=" + y +
                ", state=" + state +
                '}';
    }
}
