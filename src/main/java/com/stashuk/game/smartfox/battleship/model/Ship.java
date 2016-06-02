package com.stashuk.game.smartfox.battleship.model;

import java.util.ArrayList;
import java.util.List;

import static com.stashuk.game.smartfox.battleship.model.CellState.DAMAGED;
import static java.util.Collections.unmodifiableList;

public class Ship {
    private final List<Cell> cells;

    public Ship(List<Cell> cells) throws IllegalArgumentException {
        verifyShipLegal(cells);
        this.cells = new ArrayList<>(cells);
    }

    private void verifyShipLegal(List<Cell> cells) throws IllegalArgumentException {
        if (null == cells || cells.size() < 1 || cells.size() > 4) {
            throw new IllegalArgumentException("Cells are incorrect" + cells);
        }
        if (cells.size() == 1) {
            return;
        }
        boolean vertical = false;
        int xDiff = cells.get(1).getX() - cells.get(0).getX();
        int yDiff = cells.get(1).getY() - cells.get(0).getY();

        if (xDiff == 1 && yDiff == 0) {
            vertical = true;
        } else if (yDiff == 1 && xDiff == 0) {
            vertical = false;
        }
        Cell previous = cells.get(0);
        for (int i = 1; i < cells.size(); i++) {
            Cell current = cells.get(i);
            if (vertical && current.getX() - previous.getX() == 1 && current.getY() == previous.getY()) {
                previous = current;
            } else if (!vertical && current.getY() - previous.getY() == 1 && current.getX() == previous.getX()) {
                previous = current;
            } else {
                throw new IllegalArgumentException();
            }
        }
    }

    public List<Cell> getCells() {
        return unmodifiableList(cells);
    }

    public boolean isDamaged() {
        return cells.stream().anyMatch(c -> c.getState() == DAMAGED);
    }

    public boolean isDead() {
        return cells.stream().allMatch(c -> c.getState() == DAMAGED);
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
