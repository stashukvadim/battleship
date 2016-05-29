package game;

import java.util.ArrayList;
import java.util.List;

public class Ship {
    private Board board;
    private int size;
    private boolean isVertical;
    private int x;
    private int y;
    private boolean isDamaged;
    private boolean isDead;
    private int damagedCellsCount;
    private List<Cell> cellList = new ArrayList<>();

    public List<Cell> getCellList() {
        return cellList;
    }

    public Ship(int x, int y, boolean isVertical, int size, Board board) {
        verifyCoordinates(x, y, isVertical, size);
        this.size = size;
        this.isVertical = isVertical;
        this.x = x;
        this.y = y;
        this.board = board;
        addCells();
    }

    public Ship(int x, int y, int size, Board board) {
        this(x, y, false, size, board);
    }

    private void addCells() {
        int currentX = x;
        int currentY = y;
        for (int i = 0; i < size; i++) {
            cellList.add(board.getCellAt(x, y));
            if (isVertical) {
                currentX++;
            } else {
                currentY++;
            }
        }
    }

    private static void verifyCoordinates(int x, int y, boolean isVertical, int size) {
        for (int i = 0; i < size; i++) {
            if (Board.verifyCoordinate(x) && Board.verifyCoordinate(y)) {
                if (isVertical) {
                    x++;
                } else {
                    y++;
                }
            } else {
                throw new CellOutOfBoundsException(x, y);
            }
        }
    }


    public void setDamaged(boolean damaged) {
        isDamaged = damaged;
    }

    public void setDead(boolean dead) {
        isDead = dead;
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

    public boolean isDead() {
        return isDead;
    }

    public int getSize() {
        return size;
    }

    public boolean isVertical() {
        return isVertical;
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
                ", isVertical=" + isVertical +
                ", x=" + x +
                ", y=" + y +
                ", isDamaged=" + isDamaged +
                ", isDead=" + isDead +
                ", damagedCellsCount=" + damagedCellsCount +
                ", cellList=" + cellList +
                '}';
    }
}
