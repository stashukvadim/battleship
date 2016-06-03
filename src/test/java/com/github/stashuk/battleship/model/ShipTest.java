package com.github.stashuk.battleship.model;

import org.junit.Test;

import java.util.Collections;

import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;

public class ShipTest {

    @Test
    public void shouldNotThrowExceptionWhenCreatingVerticalShipsWithValidCells() {
        new Ship(asList(new Cell(0, 0), new Cell(1, 0)));
        new Ship(asList(new Cell(0, 0), new Cell(1, 0), new Cell(2, 0)));
        new Ship(asList(new Cell(0, 0), new Cell(1, 0), new Cell(2, 0), new Cell(3, 0)));
    }

    @Test
    public void shouldNotThrowExceptionWhenCreatingHorizontalShipsWithValidCells() {
        new Ship(singletonList(new Cell(0, 0)));
        new Ship(asList(new Cell(0, 0), new Cell(0, 1)));
        new Ship(asList(new Cell(0, 0), new Cell(0, 1), new Cell(0, 2)));
        new Ship(asList(new Cell(0, 0), new Cell(0, 1), new Cell(0, 2), new Cell(0, 3)));
    }

    @Test
    public void shouldThrowExceptionWhenCreatingShipWithNoCells() {
        assertThatExceptionOfType(IllegalArgumentException.class).isThrownBy(() -> new Ship(Collections.emptyList()));
    }

    @Test
    public void shouldThrowExceptionWhenCreatingShipWithNullCellsList() {
        assertThatExceptionOfType(IllegalArgumentException.class).isThrownBy(() -> new Ship(null));
    }

    @Test
    public void shouldThrowExceptionWhenCreatingHorizontalShipsWithIncorrectCells() {
        assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> new Ship(asList(new Cell(0, 0), new Cell(1, 1))));

        assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> new Ship(asList(new Cell(0, 0), new Cell(0, 1), new Cell(1, 2))));

        assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> new Ship(asList(new Cell(0, 0), new Cell(9, 9))));
    }

    @Test
    public void shouldThrowExceptionWhenCreatingVerticalShipsWithIncorrectCells() {
        assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> new Ship(asList(new Cell(0, 0), new Cell(1, 1))));

        assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> new Ship(asList(new Cell(0, 0), new Cell(1, 0), new Cell(2, 1))));

        assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> new Ship(asList(new Cell(0, 0), new Cell(2, 0))));
    }

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
