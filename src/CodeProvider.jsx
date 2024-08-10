import { createContext, useState, useEffect, useContext } from "react";
import { path } from "@tauri-apps/api";
import {
  writeTextFile,
  BaseDirectory,
  readTextFile,
  exists,
} from "@tauri-apps/api/fs";

import { Command } from "@tauri-apps/api/shell";

const CodeContext = createContext();

export const CodeProvider = ({ children }) => {
  const [code, setCode] = useState();
  const [stdOut, setStdOut] = useState();
  const [stdErr, setStdErr] = useState();

  const handleRunCode = async () => {
    setStdOut("");
    setStdErr("");

    const configDir = await path.appConfigDir();

    const appDirPath = await path.join(configDir, "..");
    const appConfPath = await path.join(appDirPath, "temp.js");
    let fileContent = await readTextFile(appConfPath, {
      dir: BaseDirectory.AppConfig,
    });

    fileContent = fileContent.replace(/console\.log/g, (match, p1) => {
      // Reemplazar el contenido dentro de los paréntesis para manejar múltiples argumentos
      // Añadir { depth: null } como segundo argumento
      return `console.dir`;
    });

    // add depth: null to console.dir
    fileContent = fileContent.replace(
      /console\.dir\((.*)\)/g,
      (match, p1) => `console.dir(${p1}, { depth: null })`
    );

    console.log(fileContent);

    const command = new Command("node", ["-e", fileContent]);

    command.on("error", (error) => {
      setStdErr((prev = "") => prev + error);
    });

    command.stdout.on("data", (line = "", a) => {
      setStdOut((prev = "") => prev + line);
    });

    command.stderr.on("data", (line) =>
      setStdErr((prev = "") => (prev += line))
    );

    try {
      const child = await command.spawn();
      console.log("pid:", child.pid);
      x;
    } catch (error) {
      console.error(`Error executing command: ${error}`);
    }
  };

  const handleSetCode = async (text) => {
    setCode(text);
    const configDir = await path.appConfigDir();

    const appDirPath = await path.join(configDir, "..");
    const appConfPath = await path.join(appDirPath, "temp.js");
    await writeTextFile(appConfPath, text, {
      dir: BaseDirectory.AppConfig,
    });
  };

  const validateExistFileOrCreate = async () => {
    const configDir = await path.appConfigDir();

    const appDirPath = await path.join(configDir, "..");
    const appConfPath = await path.join(appDirPath, "temp.js");
    console.log(appDirPath);

    const existFile = await exists(appConfPath);

    if (!existFile) {
      await writeTextFile(appConfPath, "console.log('hello world');", {
        dir: BaseDirectory.AppConfig,
      });
    }

    const fileContent = await readTextFile(appConfPath, {
      dir: BaseDirectory.AppConfig,
    });

    return fileContent;
  };

  useEffect(() => {
    validateExistFileOrCreate()
      .then((content) => {
        setCode(content);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <CodeContext.Provider
      value={{
        code,
        midifyCode: handleSetCode,
        runCode: handleRunCode,
        out: stdOut,
        err: stdErr,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
};

export const useCode = () => useContext(CodeContext);
