package game.utils;

import game.model.Board;
import game.model.ShipFactory;

public class TestUtil {
    public static void putHardCodedShips(Board board) {
        board.addShip(ShipFactory.shipFor(0, 0, 4, board));
        board.addShip(ShipFactory.shipFor(0, 5, 3, board));
        board.addShip(ShipFactory.shipFor(2, 0, true, 3, board));
        board.addShip(ShipFactory.shipFor(2, 2, 2, board));
        board.addShip(ShipFactory.shipFor(2, 5, 2, board));
        board.addShip(ShipFactory.shipFor(2, 8, 2, board));
        board.addShip(ShipFactory.shipFor(4, 2, 1, board));
        board.addShip(ShipFactory.shipFor(4, 4, 1, board));
        board.addShip(ShipFactory.shipFor(4, 6, 1, board));
        board.addShip(ShipFactory.shipFor(4, 8, 1, board));
    }
}

