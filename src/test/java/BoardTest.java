import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class BoardTest {
    @Test
    public void testToString() {
        String actual = new Board().toString();
        String expected = "  a b c d e f g h i j \n" +
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
        Board board = new Board();
        board.addShip(0, 0, 1);
        String actual = board.toString();
        String expected = "  a b c d e f g h i j \n" +
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

    @Test
    public void testAddShipWith4CellsVertical() {
        Board board = new Board();
        board.addShip(1, 1, true, 4);
        String actual = board.toString();
        String expected = "  a b c d e f g h i j \n" +
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

    @Test
    public void testAddShipWith4CellsHorizontal() {
        Board board = new Board();
        board.addShip(1, 1, 4);
        String actual = board.toString();
        String expected = "  a b c d e f g h i j \n" +
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
    public void testPutRandomShips() {
        Board board = new Board();
        board.putRandomShips();
        int[][] matrix = board.matrix;
        int countShips = 0;
        int countEmpty = 0;
        int countHit = 0;
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix.length; j++) {
                switch (matrix[i][j]) {
                    case 1:
                        countShips++;
                        break;
                    case 0:
                        countEmpty++;
                        break;
                    case -1:
                        countHit++;
                        break;
                    default:
                        throw new IllegalStateException(
                                "The valid values in matrix are 1, 0, -1. Value " + matrix[i][j] + " is illegal.");
                }
            }
        }
        assertThat(countShips).isEqualTo(20);
        assertThat(countEmpty).isEqualTo(80);
        assertThat(countHit).isEqualTo(0);

        String expected = "  a b c d e f g h i j \n" +
                "0 S S S S _ S S S _ _ \n" +
                "1 _ _ _ _ _ _ _ _ _ _ \n" +
                "2 S S S _ S S _ S S _ \n" +
                "3 _ _ _ _ _ _ _ _ _ _ \n" +
                "4 S S _ S _ S _ S _ S \n" +
                "5 _ _ _ _ _ _ _ _ _ _ \n" +
                "6 _ _ _ _ _ _ _ _ _ _ \n" +
                "7 _ _ _ _ _ _ _ _ _ _ \n" +
                "8 _ _ _ _ _ _ _ _ _ _ \n" +
                "9 _ _ _ _ _ _ _ _ _ _ ";

        assertThat(board.toString()).isEqualTo(expected);
    }

    @Test
    public void shouldReturnMissWhenFireToEmptyCell() {
        Board board = new Board();
        board.putRandomShips();

        FireResult fireResult = board.fire(1, 1);

        assertThat(fireResult).isEqualTo(FireResult.MISS);
    }

    @Test
    public void shouldReturnHitWhenFireToShip() {
        Board board = new Board();
        board.putRandomShips();

        FireResult fireResult = board.fire(0, 0);

        assertThat(fireResult).isEqualTo(FireResult.HIT);
    }
}