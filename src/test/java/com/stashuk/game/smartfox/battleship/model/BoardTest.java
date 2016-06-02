package com.stashuk.game.smartfox.battleship.model;

import org.assertj.core.api.SoftAssertions;
import org.junit.Test;

import static com.stashuk.game.smartfox.battleship.model.FireResult.*;
import static com.stashuk.game.smartfox.battleship.model.ShipFactory.shipFor;
import static com.stashuk.game.smartfox.battleship.utils.TestUtil.putHardCodedShips;
import static org.assertj.core.api.Assertions.*;

public class BoardTest {
    private Board board = new Board();

    private Board getHardCodedBoard() {
        Board board = new Board();
        putHardCodedShips(board);
        return board;
    }

    @Test
    public void testToStringForEmptyBoard() {
        String actual = board.toString();
        String expected =
                "  0 1 2 3 4 5 6 7 8 9 \n" +
                "0 _ _ _ _ _ _ _ _ _ _ \n" +
                "1 _ _ _ _ _ _ _ _ _ _ \n" +
                "2 _ _ _ _ _ _ _ _ _ _ \n" +
                "3 _ _ _ _ _ _ _ _ _ _ \n" +
                "4 _ _ _ _ _ _ _ _ _ _ \n" +
                "5 _ _ _ _ _ _ _ _ _ _ \n" +
                "6 _ _ _ _ _ _ _ _ _ _ \n" +
                "7 _ _ _ _ _ _ _ _ _ _ \n" +
                "8 _ _ _ _ _ _ _ _ _ _ \n" +
                "9 _ _ _ _ _ _ _ _ _ _ ";
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    public void testAddShip() {
        board.addShip(shipFor(0, 0, 1, board));
        String actual = board.toString();
        String expected =
                "  0 1 2 3 4 5 6 7 8 9 \n" +
                "0 S _ _ _ _ _ _ _ _ _ \n" +
                "1 _ _ _ _ _ _ _ _ _ _ \n" +
                "2 _ _ _ _ _ _ _ _ _ _ \n" +
                "3 _ _ _ _ _ _ _ _ _ _ \n" +
                "4 _ _ _ _ _ _ _ _ _ _ \n" +
                "5 _ _ _ _ _ _ _ _ _ _ \n" +
                "6 _ _ _ _ _ _ _ _ _ _ \n" +
                "7 _ _ _ _ _ _ _ _ _ _ \n" +
                "8 _ _ _ _ _ _ _ _ _ _ \n" +
                "9 _ _ _ _ _ _ _ _ _ _ ";
        assertThat(actual).isEqualTo(expected);
    }

    @SuppressWarnings("Duplicates")
    @Test
    public void testAddShipWith4CellsVertical() {

        board.addShip(shipFor(1, 1, true, 4, board));
        String actual = board.toString();
        String expected = "  0 1 2 3 4 5 6 7 8 9 \n" +
                "0 _ _ _ _ _ _ _ _ _ _ \n" +
                "1 _ S _ _ _ _ _ _ _ _ \n" +
                "2 _ S _ _ _ _ _ _ _ _ \n" +
                "3 _ S _ _ _ _ _ _ _ _ \n" +
                "4 _ S _ _ _ _ _ _ _ _ \n" +
                "5 _ _ _ _ _ _ _ _ _ _ \n" +
                "6 _ _ _ _ _ _ _ _ _ _ \n" +
                "7 _ _ _ _ _ _ _ _ _ _ \n" +
                "8 _ _ _ _ _ _ _ _ _ _ \n" +
                "9 _ _ _ _ _ _ _ _ _ _ ";
        assertThat(actual).isEqualTo(expected);
    }

    @SuppressWarnings("Duplicates")
    @Test
    public void testAddShipWith4CellsHorizontal() {
        board.addShip(shipFor(1, 1, 4, board));
        String actual = board.toString();
        String expected = "  0 1 2 3 4 5 6 7 8 9 \n" +
                "0 _ _ _ _ _ _ _ _ _ _ \n" +
                "1 _ S S S S _ _ _ _ _ \n" +
                "2 _ _ _ _ _ _ _ _ _ _ \n" +
                "3 _ _ _ _ _ _ _ _ _ _ \n" +
                "4 _ _ _ _ _ _ _ _ _ _ \n" +
                "5 _ _ _ _ _ _ _ _ _ _ \n" +
                "6 _ _ _ _ _ _ _ _ _ _ \n" +
                "7 _ _ _ _ _ _ _ _ _ _ \n" +
                "8 _ _ _ _ _ _ _ _ _ _ \n" +
                "9 _ _ _ _ _ _ _ _ _ _ ";
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    public void shouldReturnMissWhenFireToEmptyCell() {
        Board board = getHardCodedBoard();

        FireResult fireResult = board.fire(1, 1);

        assertThat(fireResult).isEqualTo(MISSED);
    }

    @Test
    public void shouldReturnHitWhenFireToShip() {
        Board board = getHardCodedBoard();

        FireResult fireResult = board.fire(0, 0);

        assertThat(fireResult).isEqualTo(HIT);
    }

    @Test
    public void shouldReturnDeadWhenFireToOneCellShip() {
        Board board = getHardCodedBoard();

        FireResult fireResult = board.fire(4, 2);

        assertThat(fireResult).isEqualTo(DEAD);
    }

    @Test
    public void shouldReturnCorrectFireResultsWhenFireSeveralTimes() {
        Board board = getHardCodedBoard();

        assertThat(board.fire(0, 0)).isEqualTo(HIT);
        assertThat(board.fire(0, 1)).isEqualTo(HIT);
        assertThat(board.fire(0, 2)).isEqualTo(HIT);
        assertThat(board.fire(0, 3)).isEqualTo(DEAD);
    }

    @Test
    public void shouldAddMissToAllAdjacentCellsWhenShipIsDead() {
        Board board = getHardCodedBoard();

        FireResult fireResult = board.fire(4, 2);
        assertThat(fireResult).isEqualTo(DEAD);

        SoftAssertions softly = new SoftAssertions();
        softly.assertThat(board.getCellAt(3, 1).getState()).isEqualTo(CellState.MISS);
        softly.assertThat(board.getCellAt(3, 2).getState()).isEqualTo(CellState.MISS);
        softly.assertThat(board.getCellAt(3, 3).getState()).isEqualTo(CellState.MISS);
        softly.assertThat(board.getCellAt(4, 1).getState()).isEqualTo(CellState.MISS);
        softly.assertThat(board.getCellAt(4, 3).getState()).isEqualTo(CellState.MISS);
        softly.assertThat(board.getCellAt(5, 1).getState()).isEqualTo(CellState.MISS);
        softly.assertThat(board.getCellAt(5, 2).getState()).isEqualTo(CellState.MISS);
        softly.assertThat(board.getCellAt(5, 3).getState()).isEqualTo(CellState.MISS);
        softly.assertAll();
    }


    @Test
    public void shouldThrowIllegalMoveExceptionWhenFireToAlreadyHitCell() {
        Board board = getHardCodedBoard();

        FireResult fireResult = board.fire(0, 0);
        assertThat(fireResult).isEqualTo(HIT);

        assertThatThrownBy(() -> board.fire(0, 0)).isInstanceOf(IllegalMoveException.class);
    }

    @Test
    public void shouldThrowIllegalMoveExceptionWhenFireToAlreadyMissCell() {
        Board board = getHardCodedBoard();

        FireResult fireResult = board.fire(1, 0);
        assertThat(fireResult).isEqualTo(MISSED);

        assertThatThrownBy(() -> board.fire(1, 0)).isInstanceOf(IllegalMoveException.class);
    }

    @Test
    public void shouldReturnFalseWhenAllShipsDeadWhenThereAreShipsLeft() {
        Board board = getHardCodedBoard();

        assertThat(board.allShipsDead()).isFalse();

        board.fire(0, 0);
        assertThat(board.allShipsDead()).isFalse();
    }

    @Test
    public void shouldReturnTrueWhenAllShipsDead() {
        board.addShip(shipFor(0, 0, 2, board));
        board.addShip(shipFor(2, 2, 1, board));
        board.fire(0, 0);
        board.fire(0, 1);
        assertThat(board.allShipsDead()).isFalse();
        board.fire(2, 2);
        assertThat(board.allShipsDead()).isTrue();
    }

    @Test
    public void shouldThrowIllegalArgumentExceptionWhenAddTwoFourCellShips() {
        board.addShip(shipFor(0, 0, 4, board));
        assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> board.addShip(shipFor(2, 0, 4, board)));
    }

    @Test
    public void testIsCompleteMethod() {
        assertThat(board.isComplete()).isFalse();

        board.addShip(shipFor(0, 0, 4, board));
        assertThat(board.isComplete()).isFalse();

        board = new Board();
        putHardCodedShips(board);
        assertThat(board.isComplete()).isTrue();
    }
}