import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const yarg = yargs(hideBin(process.argv))
  .options("b", {
    alias: "base",
    type: "number",
    demandOption: true,
    describe: "Es la base de la tabla de multiplicar",
  })
  .options("l", {
    alias: "limit",
    type: "number",
    default: 10,
    describe: "Es el limite de la tabla de multiplicar",
  })
  .options("s", {
    alias: "show",
    type: "boolean",
    default: false,
    describe: "Muestra la tabla en consola",
  })
  .options("n", {
    alias: "name",
    type: "string",
    default: "multiplication-table",
    describe: "File name",
  })
  .options("d", {
    alias: "destination",
    type: "string",
    default: "outputs",
    describe: "File destination",
  })
  .check((argv, options) => {
    if (argv.b < 1) {
      throw "La base tiene que ser un número positivo";
    }
    return true;
  })
  .parseSync();
