package game;

import java.util.HashSet;
import java.util.Set;

import static game.Ship.Direction.HORIZONTAL;
import static game.Ship.Direction.VERTICAL;

public class Ship {
    private int size;
    private Direction direction;
    private int x;
    private int y;
    private boolean isDamaged;
    private boolean isDead;
    private int damagedCellsCount;
    private Set<Cell> cellList = new HashSet<>();
    private Set<Cell> boundedCells = new HashSet<>();

    protected Ship(int x, int y, Direction direction, int size) {
        verifyCoordinates(x, y, direction, size);
        this.size = size;
        this.direction = direction;
        this.x = x;
        this.y = y;
    }

    public Ship(int x, int y, int size) {
        this(x, y, HORIZONTAL, size);
    }

    private static void verifyCoordinates(int x, int y, Direction direction, int size) {
        for (int i = 0; i < size; i++) {
            if (Board.coordinateCorrect(x) && Board.coordinateCorrect(y)) {
                if (direction == VERTICAL) {
                    x++;
                } else {
                    y++;
                }
            } else {
                throw new CellOutOfBoundsException(x, y);
            }
        }
    }

    public Set<Cell> getBoundedCells() {
        return boundedCells;
    }

    public void setBoundedCells(Set<Cell> boundedCells) {
        this.boundedCells = boundedCells;
    }

    public Set<Cell> getCellList() {
        return cellList;
    }

    public void setCellList(Set<Cell> cellList) {
        this.cellList = cellList;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public boolean isDamaged() {
        return isDamaged;
    }

    public void setDamaged(boolean damaged) {
        isDamaged = damaged;
    }

    public boolean isDead() {
        return isDead;
    }

    public void setDead(boolean dead) {
        isDead = dead;
    }

    public int getSize() {
        return size;
    }

    public Direction getDirection() {
        return direction;
    }

    public void hit() {
        damagedCellsCount++;
        isDamaged = true;
        if (damagedCellsCount == size) {
            isDead = true;
        }
    }

    @Override
    public String toString() {
        return "Ship{" +
                "size=" + size +
                ", direction=" + direction +
                ", x=" + x +
                ", y=" + y +
                ", isDamaged=" + isDamaged +
                ", isDead=" + isDead +
                ", damagedCellsCount=" + damagedCellsCount +
                ", cellList=" + cellList +
                '}';
    }

    enum Direction {
        VERTICAL, HORIZONTAL
    }

    enum Size {
        ONE(1), TWO(2), THREE(3), FOUR(4);
        private int size;

        Size(int size) {
            this.size = size;
        }

        public int value() {
            return size;
        }
    }
}
