import Notification from "./notification";

describe("Unit tests for notifications", () => {
  it("should create errors", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "test1",
    };

    notification.addError(error);

    expect(notification.messages("test1")).toBe("test1: error message,");

    const error2 = {
      message: "error message2",
      context: "test1",
    };
    notification.addError(error2);

    expect(notification.messages("test1")).toBe(
      "test1: error message,test1: error message2,"
    );

    const error3 = {
      message: "error message3",
      context: "test2",
    };
    notification.addError(error3);

    expect(notification.messages("test1")).toBe(
      "test1: error message,test1: error message2,"
    );
    expect(notification.messages()).toBe(
      "test1: error message,test1: error message2,test2: error message3,"
    );
  });

  it("should check if notification has at least one error", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "test1",
    };
    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);
  });

  it("should get all errors props", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "test1",
    };
    notification.addError(error);

    expect(notification.getErrors()).toEqual([error]);
  });
});
