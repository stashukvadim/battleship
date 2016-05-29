package game;

import java.util.ArrayList;
import java.util.List;

public class Ship {
    private List<Cell> cells = new ArrayList<>();

    public Ship(List<Cell> cells) {
        verifyCorrectCells(cells);
        this.cells = cells;
    }

    private void verifyCorrectCells(List<Cell> cells) throws IllegalArgumentException {//// TODO: 29.05.2016 Simplify
        int size = cells.size();
        if (size == 1) {
            return;
        }
        if (size > 1 && size < 5) {
            boolean vertical = false;
            int difference = cells.get(1).getAsInt() - cells.get(0).getAsInt();
            if (difference == 10) {
                vertical = true;
            } else if (difference != 1) {
                throw new IllegalArgumentException();
            }
            int current = cells.get(0).getAsInt();

            for (int i = 1; i < size; i++) {
                if (vertical) {
                    if (current + 10 == cells.get(i).getAsInt()) {
                        current = current + 10;
                    } else {
                        throw new IllegalArgumentException();
                    }
                } else if (!vertical) {
                    if (current + 1 == cells.get(i).getAsInt()) {
                        current = current + 1;
                    } else {
                        throw new IllegalArgumentException();
                    }
                }
            }
        } else {
            throw new IllegalArgumentException();
        }
    }

    public List<Cell> getCells() {
        return cells;
    }

    public void setCells(List<Cell> cells) {
        this.cells = cells;
    }

    public boolean isDamaged() {
        for (Cell cell : cells) {
            if (cell.getState() == CellState.HIT) {
                return true;
            }
        }
        return false;
    }

    public boolean isDead() {
        for (Cell cell : cells) {
            if (cell.getState() == CellState.SHIP) {
                return false;
            }
        }
        return true;
    }

    public int getSize() {
        return cells.size();
    }

    @Override
    public String toString() {
        return "Ship{" +
                "size=" + getSize() +
                ", x=" + cells.get(0).getX() +
                ", y=" + cells.get(0).getY() +
                ", cells=" + cells +
                '}';
    }
}
