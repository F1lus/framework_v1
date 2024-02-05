import chalk from "chalk"

const log = console.log
const stderr = console.error

export const LOGGER = {
    ok: (...msg: any[]) => log(chalk.green(msg)),
    error: (...msg: any[]) => stderr(chalk.red(msg)),
    success: (...msg: any[]) => log(chalk.bold.green(msg)),
    warning: (...msg: any[]) => log(chalk.yellow(msg))
}