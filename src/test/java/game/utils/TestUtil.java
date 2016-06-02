package game.utils;

import game.model.Board;
import game.model.BoardFactory;
import game.model.ShipFactory;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

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

    @Test
    public void testPutHardCodedShips() {
        Board board = new BoardFactory().newEmptyBoard();
        putHardCodedShips(board);

        String hardcodedBoardToString =
                        "  0 1 2 3 4 5 6 7 8 9 \n" +
                        "0 S S S S _ S S S _ _ \n" +
                        "1 _ _ _ _ _ _ _ _ _ _ \n" +
                        "2 S _ S S _ S S _ S S \n" +
                        "3 S _ _ _ _ _ _ _ _ _ \n" +
                        "4 S _ S _ S _ S _ S _ \n" +
                        "5 _ _ _ _ _ _ _ _ _ _ \n" +
                        "6 _ _ _ _ _ _ _ _ _ _ \n" +
                        "7 _ _ _ _ _ _ _ _ _ _ \n" +
                        "8 _ _ _ _ _ _ _ _ _ _ \n" +
                        "9 _ _ _ _ _ _ _ _ _ _ ";

        assertThat(board.toString()).isEqualTo(hardcodedBoardToString);
    }
}

