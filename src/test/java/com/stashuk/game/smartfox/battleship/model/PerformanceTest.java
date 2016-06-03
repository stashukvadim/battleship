package com.stashuk.game.smartfox.battleship.model;

import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class PerformanceTest {
    @Test(timeout = 2000)
    public void shouldCreateFiveThousandRandomBoardsInLessThanTwoSeconds() {
        for (int i = 0; i < 5000; i++) {
            Board board = new BoardFactory().newRandomBoard();
            assertThat(board.isComplete()).isTrue();
        }
    }
}
