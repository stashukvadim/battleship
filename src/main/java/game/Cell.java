package game;

import static game.CellState.EMPTY;

public class Cell {
    private int x;
    private int y;
    private CellState state;
    private Ship ship;//null for empty cell
    private boolean isBounded;

    public Cell(int x, int y, Ship ship) {
        this.x = x;
        this.y = y;
        this.ship = ship;
        this.state = EMPTY;
    }

    public Cell(int x, int y) {
        this(x, y, null);
    }

    public boolean isBounded() {
        return isBounded;
    }

    public void setBounded(boolean bounded) {
        isBounded = bounded;
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


    @Override
    public String toString() {
        return "Cell{" +
                "x=" + x +
                ", y=" + y +
                ", state=" + state +
                '}';
    }
}
