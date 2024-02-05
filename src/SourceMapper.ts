import * as fs from "fs";
import * as path from "path";
import {from, switchMap, tap} from "rxjs";
import { LOGGER } from "./util/logger";
import { ClassLike } from "./metadata/types";

export class SourceMapper {
    
    private static readonly applicationEntryFolder = path.join(
        process.argv[1],
        '..',
        process.env.APP_ROOT ?? 'src/version'
    )

    private static files: string[] = []

    static classMapping() {
        LOGGER.warning('Source mapping has started...')
        this.loadProjectFiles(this.applicationEntryFolder)
        return from(Promise.all(
            this.files.map(file => {
                return import(file)
            })
        )).pipe(
            tap(_ => LOGGER.ok('Source mapping has completed!')),
            switchMap(files => {
                return files.map(file => {
                    const exports = Object.values(file) as ClassLike[]
                    return exports.map(exp => {
                        try {
                            return new exp()
                        } catch {
                            return null
                        }
                    }).filter(exp => !!exp)

                }).flat()
            })
        )
    }

    private static loadProjectFiles(location: string) {
        try {
            const filesInDir = fs.readdirSync(location)
            filesInDir.forEach(file => {
                const filePath = path.join(location, file)

                const stats = fs.statSync(filePath)
                if (stats.isFile() && file.endsWith(".js")) {
                    this.files.push(filePath)
                }

                if(stats.isDirectory()) {
                    this.loadProjectFiles(filePath)
                }
            })
        } catch (err) {
            LOGGER.error("An error has occurred:", err)
        }
    }
}
