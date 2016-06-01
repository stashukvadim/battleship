package game.model;

import game.utils.TestUtil;
import org.junit.Test;

public class PerformanceTest {
    @Test(timeout = 1000)
    public void shouldCreateOneThousandBoardsInLessThanASecond() throws Exception {
        for (int i = 0; i < 1000; i++) {
            Board board = new Board();
            TestUtil.putHardCodedShips(board);
            String s = board.toString();
        }
    }
}
