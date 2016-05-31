package game.utils;

import org.junit.Test;

import java.util.List;

import static game.utils.ConversionUtil.booleanMatrixFromList;
import static game.utils.ConversionUtil.int2DArrayFromList;
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
        int[][] ints = int2DArrayFromList(correctList);

        assertThat(ints).isEqualTo(correctMatrix);
    }

    @Test
    public void shouldNotThrowExceptionWhenMatrixIsValidBoard() {
        Verifications verification = new Verifications(booleanMatrixFromList(correctList));
        verification.verifyMatrixIsValidBoard();
        System.out.println(verification.getBoard());
    }

    @Test
    public void shouldThrowExceptionWhenMatrixIsNotValidBoard() {
        Verifications verification = new Verifications(booleanMatrixFromList((incorrectList)));
        System.out.println(verification.getBoard());
        assertThatExceptionOfType(IllegalArgumentException.class).isThrownBy(verification::verifyMatrixIsValidBoard);
    }
}