import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import axios from "axios";
import React from "react";

import useGenius from "../hooks/useGenius";
import queryGenius from "../services/queryGenius";
import SearchGenius from "./SearchGenius";

jest.mock("axios");
jest.mock("../hooks/useGenius");

describe("SearchGenius", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        axios.mockRestore();
        useGenius.mockRestore();
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    it("renders search input form", () => {
        useGenius.mockImplementationOnce(() => {
            return {
                error: null,
                isLoading: false,
                results: [],
            };
        });

        render(<SearchGenius />);

        expect(screen.getByTestId("search-form-wrapper")).toBeInTheDocument();
        expect(screen.getByTestId("search-form")).toBeInTheDocument();
        expect(screen.getByTestId("search-input")).toBeInTheDocument();
    });

    describe("when search results are loading", () => {
        it("renders progress bar", () => {
            useGenius.mockImplementationOnce(() => {
                return {
                    error: null,
                    isLoading: true,
                    results: [],
                };
            });

            render(<SearchGenius />);

            expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
        });
    });

    describe("when error fetching search results", () => {
        it("renders progress bar", () => {
            useGenius.mockImplementationOnce(() => {
                return {
                    error: "An error occurred",
                    isLoading: false,
                    results: [],
                };
            });

            render(<SearchGenius />);

            expect(screen.getByTestId("error-indicator")).toBeInTheDocument();
        });
    });

    describe("when search returns results", () => {
        it("renders results", async () => {
            const mockGeniusResponse = [
                {
                    result: {
                        artist_names: "Elton John, Benny AND the Jets",
                        full_title: "Fake Full Title",
                        header_image_thumbnail_url: "https://fake.thumb.url",
                        id: "testId",
                        primary_artist: { url: "https://fake.artist.url" },
                        release_date_for_display: "Test Release Date",
                        stats: {
                            hot: true,
                        },
                        title: "Fake Title",
                        url: "https://fake.result.url",
                    },
                },
            ];

            useGenius.mockImplementation(() => {
                return {
                    error: null,
                    isLoading: false,
                    results: mockGeniusResponse,
                };
            });

            const { debug, rerender } = render(<SearchGenius />);

            act(() => {
                fireEvent.change(screen.getByTestId("search-input"), {
                    target: { value: "Hey kids" },
                });
                jest.advanceTimersByTime(2100);
            });

            await waitFor(() => {
                expect(
                    screen.getByTestId("results-wrapper")
                ).toBeInTheDocument();
                expect(
                    screen.getByTestId("result-item-wrapper")
                ).toBeInTheDocument();
            });
        });
    });

    describe("when search returns no results", () => {
        it("renders no results message", async () => {
            useGenius.mockImplementation(() => {
                return {
                    error: null,
                    isLoading: false,
                    results: [],
                };
            });

            render(<SearchGenius />);

            act(() => {
                fireEvent.change(screen.getByTestId("search-input"), {
                    target: { value: "some gibberish that isnt a song lyric" },
                });
                jest.advanceTimersByTime(2100);
            });

            await waitFor(() =>
                expect(
                    screen.getByTestId("no-results-indicator")
                ).toBeInTheDocument()
            );
        });
    });

    describe("when search input is empty", () => {
        it("does not attempt to fetch results", async () => {
            useGenius.mockImplementation(() => {
                queryGenius("");
                return {
                    error: null,
                    isLoading: false,
                    results: [],
                };
            });

            render(<SearchGenius />);

            act(() => {
                fireEvent.change(screen.getByTestId("search-input"), {
                    target: { value: "" },
                });
                jest.advanceTimersByTime(2100);
            });

            expect(axios).not.toHaveBeenCalled();
        });
    });
});
