package game.model;

import game.utils.VerifyService;

import static game.model.CellState.EMPTY;

public class Cell {
    private int x;
    private int y;
    private CellState state;
    private Ship ship;//null for empty cell
    private boolean available;

    public Cell(int x, int y) {
        VerifyService.verifyCoordinatesCorrect(x, y);
        this.x = x;
        this.y = y;
        this.state = EMPTY;
        available = true;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable() {
        available = true;
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

    public int intValue() {
        return x * 10 + y;
    }

    public Ship getShip() {
        return ship;
    }

    public void setShip(Ship ship) {
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
