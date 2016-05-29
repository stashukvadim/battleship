package game;

import java.util.ArrayList;
import java.util.List;

import static game.CellState.*;

public class Board {
    protected Cell[][] matrix;
    protected List<Ship> shipList = new ArrayList<>();

    public Board() {
        matrix = new Cell[10][10];
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix.length; j++) {
                matrix[i][j] = new Cell(i, j, null);
            }
        }
    }

    @Override
    public String toString() {
        String result = "  a b c d e f g h i j ";
        for (int i = 0; i < matrix.length; i++) {
            result += "\n" + i + " ";
            for (int j = 0; j < matrix.length; j++) {
                Cell cell = matrix[i][j];
                switch (cell.getState()) {
                    case EMPTY:
                        result += "_ ";
                        break;
                    case SHIP:
                        result += "S ";
                        break;
                    case MISS:
                        result += "* ";
                        break;
                    case HIT:
                        result += "H ";
                        break;
                }
            }
        }
        return result;
    }

    public void addShip(Ship ship) {
        shipList.add(ship);
        int x = ship.getX();
        int y = ship.getY();
        for (int i = 0; i < ship.getSize(); i++) {
            matrix[x][y].setShip(ship);
            matrix[x][y].setState(SHIP);
            if (ship.isVertical()) {
                x++;
            } else {
                y++;
            }
        }
    }

    protected void putHardCodedShips() {
        addShip(new Ship(0, 0, 4));
        addShip(new Ship(0, 5, 3));
        addShip(new Ship(2, 0, true, 3));
        addShip(new Ship(2, 2, 2));
        addShip(new Ship(2, 5, 2));
        addShip(new Ship(2, 8, 2));
        addShip(new Ship(4, 2, 1));
        addShip(new Ship(4, 4, 1));
        addShip(new Ship(4, 6, 1));
        addShip(new Ship(4, 8, 1));
        // TODO: 29.05.2016  add putRandomShipsMethod
    }

    public FireResult fire(int x, int y) {
        Cell cell = getCell(x, y);
        if (cell.getState() == EMPTY) {
            cell.setState(MISS);
            return FireResult.MISS;
        }
        if (cell.getState() == SHIP) {
            cell.setState(HIT);
            Ship ship = cell.getShip();
            ship.hit();
            if (ship.isDead()) {
                return FireResult.DEAD;
            } else {
                return FireResult.HIT;
            }
        }
        return null;
    }

    private Cell getCell(int x, int y) {
        return matrix[x][y];
    }

    private boolean verifyCoordinate(int coordinate) {
        return coordinate <= 10;
    }

    private boolean verifyCoordinates(int x, int y) {
        return verifyCoordinate(x) && verifyCoordinate(y);
    }

}
