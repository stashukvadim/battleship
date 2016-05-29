package game;

import org.junit.Test;

import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;

public class ShipTest {

    @Test
    public void shouldThrowExceptionWhenCreatingIllegalShip() {
        new Ship(singletonList(new Cell(0, 0)));
        new Ship(asList(new Cell(0, 0), new Cell(0, 1)));
        new Ship(asList(new Cell(0, 0), new Cell(1, 0)));


        assertThatExceptionOfType(IllegalArgumentException.class).isThrownBy(() -> new Ship(emptyList()));
        assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> new Ship(asList(new Cell(0, 0), new Cell(0, 2))));
        assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> new Ship(asList(new Cell(0, 0), new Cell(0, 1), new Cell(1, 0))));
    }
}