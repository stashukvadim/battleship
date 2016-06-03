package com.stashuk.game.smartfox.battleship.utils;

import com.stashuk.game.smartfox.battleship.model.BoardFactory;
import org.junit.Test;

import java.util.List;

import static com.stashuk.game.smartfox.battleship.utils.Conversions.booleanMatrixFromList;
import static com.stashuk.game.smartfox.battleship.utils.Conversions.intMatrixFromList;
import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;

public class ConversionUtilTest {
    public static List<Integer> correctList = asList(1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
            1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0);

    public static int[][] correctMatrix = {{1, 1, 1, 1, 0, 1, 1, 1, 0, 0,}, {0, 0, 0, 0, 0, 0, 0, 0, 0, 0,}, {1, 1, 1, 0, 1, 1, 0, 1, 1, 0,}, {0, 0, 0, 0, 0, 0, 0, 0, 0, 0,}, {1, 1, 0, 1, 0, 1, 0, 1, 0, 1,}, {0, 0, 0, 0, 0, 0, 0, 0, 0, 0,}, {0, 0, 0, 0, 0, 0, 0, 0, 0, 0,}, {0, 0, 0, 0, 0, 0, 0, 0, 0, 0,}, {0, 0, 0, 0, 0, 0, 0, 0, 0, 0,}, {0, 0, 0, 0, 0, 0, 0, 0, 0, 0}};

    public static List<Integer> incorrectList = asList(1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0);

    public static int[][] incorrectMatrix = {{1, 1, 1, 1, 0, 1, 1, 1, 0, 0,}, {0, 0, 0, 0, 0, 0, 0, 0, 1, 0,}, {1, 1, 1, 0, 1, 1, 0, 1, 1, 0,}, {0, 0, 0, 0, 0, 0, 0, 0, 0, 0,}, {1, 1, 0, 1, 0, 1, 0, 1, 0, 0,}, {0, 0, 0, 0, 0, 0, 0, 0, 0, 0,}, {0, 0, 0, 0, 0, 0, 0, 0, 0, 0,}, {0, 0, 0, 0, 0, 0, 0, 0, 0, 0,}, {0, 0, 0, 0, 0, 0, 0, 0, 0, 0,}, {0, 0, 0, 0, 0, 0, 0, 0, 0, 0}};

    public static int[][] matrixWithIncorrectCount = {{1, 1, 1, 1, 0, 1, 1, 1, 0, 1,}, {0, 0, 0, 0, 0, 0, 0, 0, 0, 0,}, {1, 1, 1, 0, 1, 1, 0, 1, 1, 0,}, {0, 0, 0, 0, 0, 0, 0, 0, 0, 0,}, {1, 1, 0, 1, 0, 1, 0, 1, 0, 1,}, {0, 0, 0, 0, 0, 0, 0, 0, 0, 0,}, {0, 0, 0, 0, 0, 0, 0, 0, 0, 0,}, {0, 0, 0, 0, 0, 0, 0, 0, 0, 0,}, {0, 0, 0, 0, 0, 0, 0, 0, 0, 0,}, {0, 0, 0, 0, 0, 0, 0, 0, 0, 0}};


    @Test
    public void testInt2DArrayFromList() {
        int[][] ints = intMatrixFromList(correctList);

        assertThat(ints).isEqualTo(correctMatrix);
    }

    @Test
    public void shouldNotThrowExceptionWhenMatrixIsValidBoard() {
        boolean[][] booleans = booleanMatrixFromList(correctList);
        new BoardFactory().boardFromMatrix(booleans);
    }

    @Test
    public void shouldThrowExceptionWhenMatrixIsNotAValidBoard() {
        boolean[][] booleans = booleanMatrixFromList((incorrectList));
        assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> new BoardFactory().boardFromMatrix(booleans));
    }
}
