import { ServerApp } from "./server-app";
import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

describe("Server App", () => {
  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileName: "test-filename",
    fileDestination: "test-destination",
  };

  test("should create ServerApp instance", () => {
    const serverApp = new ServerApp();

    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  test("should run ServerApp with options", () => {
    const logSpy = jest.spyOn(console, "log");
    const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
    const SaveFileSpy = jest.spyOn(SaveFile.prototype, "execute");

    ServerApp.run(options);

    expect(logSpy).toBeCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith("ServerApp running...");
    expect(logSpy).toHaveBeenCalledWith("File was created!");

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });

    expect(SaveFileSpy).toHaveBeenCalledTimes(1);
    expect(SaveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileName: options.fileName,
      fileDestination: options.fileDestination,
    });
  });

  test("should run with custom values mocked", () => {
    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    const createMock = jest.fn().mockReturnValue("1 x 2 = 2");
    const saveFileMock = jest.fn().mockReturnValue(true);

    console.log = logMock;
    console.error = logErrorMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith("ServerApp running...");
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileName: options.fileName,
      fileDestination: options.fileDestination,
    });
    expect(logMock).toHaveBeenCalledWith("File was created!");
    expect(logErrorMock).not.toHaveBeenCalled();
  });
});
