package game.model;

import game.utils.ConversionUtil;
import org.junit.Test;

import java.util.List;

import static java.util.Arrays.asList;
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

        boolean[][] booleans = ConversionUtil.booleanMatrixFromList(listWith4DeckShipMissing);

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
        boolean[][] booleans = ConversionUtil.booleanMatrixFromList(integerListWithLShaped);

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

        boolean[][] booleans = ConversionUtil.booleanMatrixFromList(integerList);

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

        boolean[][] booleans = ConversionUtil.booleanMatrixFromList(integerListWithCornerShip);

        assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> new BoardFactory().boardFromMatrix(booleans));
    }
}