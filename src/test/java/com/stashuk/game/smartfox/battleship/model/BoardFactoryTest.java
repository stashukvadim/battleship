package com.stashuk.game.smartfox.battleship.model;

import org.junit.Test;

import java.util.List;

import static com.stashuk.game.smartfox.battleship.utils.ConversionUtil.booleanMatrixFromList;
import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;

public class BoardFactoryTest {

    @Test
    public void shouldThrowExceptionWhenMatrixIsMissing4DeckShip(){
        List<Integer> listWith4DeckShipMissing = asList(
                0, 0, 0, 0, 0, 1, 1, 1, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 0, 1, 0, 1, 0, 1, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

        boolean[][] booleans = booleanMatrixFromList(listWith4DeckShipMissing);

        assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> new BoardFactory().boardFromMatrix(booleans));
    }


    @Test
    public void shouldThrowExceptionWhenMatrixHasLShapedShip() {
        List<Integer> integerListWithLShaped = asList(
                1, 1, 1, 0, 1, 1, 1, 0, 0, 0,
                1, 0, 0, 0, 0, 0, 0, 0, 1, 0,
                0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
                0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 1, 1, 1, 1, 0, 1,
                0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        boolean[][] booleans = booleanMatrixFromList(integerListWithLShaped);

        assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> new BoardFactory().boardFromMatrix(booleans));
    }

    @Test()
    public void shouldNotThrowExceptionWhenMatrixIsLegalBoard() {
        List<Integer> integerList = asList(
                1, 1, 1, 1, 0, 1, 1, 1, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 0, 1, 0, 1, 0, 1, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

        boolean[][] booleans = booleanMatrixFromList(integerList);

        new BoardFactory().boardFromMatrix(booleans);
    }

    @Test()
    public void shouldThrowExceptionWhenMatrixHasCornerShips() {
        List<Integer> integerListWithCornerShip = asList(
                1, 0, 0, 0, 0, 0, 0, 1, 0, 1,
                1, 0, 0, 1, 0, 0, 0, 1, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 0, 1,
                1, 0, 0, 0, 1, 0, 0, 0, 0, 0,
                0, 1, 0, 0, 0, 0, 0, 0, 1, 1,
                0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

        boolean[][] booleans = booleanMatrixFromList(integerListWithCornerShip);

        assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> new BoardFactory().boardFromMatrix(booleans));
    }

    @Test()
    public void testRandomBoard() {
        Board board = new BoardFactory().newRandomBoard();
        assertThat(board.isComplete()).isTrue();
    }
}
