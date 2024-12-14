import fs from "fs";
import path from "path";
import express from "express";

function getFilesInDirectory(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getFilesInDirectory(filePath, fileList);
    } else if (file.endsWith(".ts")) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

export default function routesConfig(app: express.Application) {
  const routesDir = path.join(process.cwd(), "src", "app", "routes");

  const routeFiles = getFilesInDirectory(routesDir);

  routeFiles.forEach((routePath) => {
    const fileParts = path.relative(routesDir, routePath).split(path.sep);
    const routePrefix = fileParts.slice(0, -1).join("/");
    const fileNamePrefix = path.basename(routePath, ".ts").split(".")[0];

    let fullRoutePrefix = fileNamePrefix;
    if (fileNamePrefix === "index") {
      fullRoutePrefix = routePrefix ? routePrefix : "/";
    } else {
      fullRoutePrefix = routePrefix
        ? `${routePrefix}/${fileNamePrefix}`
        : fileNamePrefix;
    }

    import(routePath)
      .then((routeModule) => {
        if (routeModule.default) {
          app.use(`/${fullRoutePrefix}`, routeModule.default);
        } else {
          console.warn(
            `El archivo ${routePath} no tiene una exportación predeterminada de ruta.`
          );
        }
      })
      .catch((err) =>
        console.error(`Error al importar la ruta ${routePath}:`, err)
      );
  });
}
