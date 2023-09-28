import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";
interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
  fileName: string;
  fileDestination: string;
}

export class ServerApp {
  static run({
    base,
    limit,
    showTable,
    fileName,
    fileDestination,
  }: RunOptions) {
    console.log("ServerApp running...");

    const table = new CreateTable().execute({ base, limit });
    const wasCreated = new SaveFile().execute({
      filecontent: table,
      fileName: fileName,
      fileDestination: fileDestination,
    });

    if (showTable) {
      console.log(
        "🚀 ~ file: server-app.ts:13 ~ ServerApp ~ run ~ table:",
        table
      );
    }

    if (wasCreated) {
      console.log("File was created!");
    } else {
      console.error("File was not created!");
    }
  }
}
