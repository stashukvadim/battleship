package game;

import static game.CellState.*;

public class Cell {
    private int x;
    private int y;
    private CellState state;
    private Ship ship;//null for empty cell

    public Cell(int x, int y, Ship ship) {
        this.x = x;
        this.y = y;
        this.ship = ship;
        this.state = EMPTY;
    }

    public Cell(int x, int y) {
        this(x, y, null);
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

    public Ship getShip() {
        return ship;
    }

    public void setShip(Ship ship) {
        this.ship = ship;
    }
}
