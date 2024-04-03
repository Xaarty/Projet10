import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form, { mockContactApi } from "./index";

describe("Form Component", () => {
  describe("Form submission", () => {
    it("should call sendContact function on form submission", () => {
      const sendContact = jest.fn();
      render(<Form onSuccess={() => {}} onError={() => {}} />);
      fireEvent.submit(screen.getByRole("form"));
      expect(sendContact).toHaveBeenCalled();
    });
  });

  describe("Error handling", () => {
    it("should call onError function when an error occurs", async () => {
      const onError = jest.fn();
      jest.spyOn(window, "mockContactApi").mockRejectedValueOnce(new Error("API Error"));
      render(<Form onSuccess={() => {}} onError={onError} />);
      fireEvent.submit(screen.getByRole("form"));
      await waitFor(() => expect(onError).toHaveBeenCalled());
    });
  });

  describe("Mock API function", () => {
    it("should resolve after specified timeout", async () => {
      jest.useFakeTimers();
      const promise = mockContactApi();
      jest.advanceTimersByTime(1000); // Advance timer by 1 second
      await expect(promise).resolves.toBeUndefined();
    });
  });

  describe("onSuccess prop", () => {
    it("should call onSuccess function on successful form submission", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} onError={() => {}} />);
      fireEvent.submit(screen.getByRole("form"));
      await waitFor(() => expect(onSuccess).toHaveBeenCalled());
    });
  });

  describe("Debugging Test Case", () => {
    it("should log messages to track flow of execution", () => {
      const consoleSpy = jest.spyOn(console, "log");
      render(<Form onSuccess={() => {}} onError={() => {}} />);
      fireEvent.submit(screen.getByRole("form"));
      expect(consoleSpy).toHaveBeenCalledWith("Form submitted");
      expect(consoleSpy).toHaveBeenCalledWith("API call started");
      expect(consoleSpy).toHaveBeenCalledWith("API call finished");
    });
  });
});