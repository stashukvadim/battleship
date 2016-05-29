package game;

import static game.CellState.EMPTY;

public class Cell {
    private int x;
    private int y;
    private CellState state;
    private Ship ship;//null for empty cell
    private boolean available;

    public Cell(int x, int y) {
        this.x = x;
        this.y = y;
        this.state = EMPTY;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
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
