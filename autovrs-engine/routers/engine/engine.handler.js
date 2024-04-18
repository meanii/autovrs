import path from 'node:path';
import { execAsync } from '../../utils/exec.js';


class Enginehandler {
    #BLENDER_BIN = process.env.BLENDER_BIN ?? `/Users/anil/blender-git/build_darwin/bin/blender.app/Contents/MacOS/blender`;
    #ENGINE_CLI_PATH = path.resolve(process.cwd(), `engine`, `cli.py`);

    constructor(file, options) {
        this.file = file;
        this.options = options;
    }

    #getOutputFile() {
        const exportedExtension = this.options.export
        return path.resolve(process.cwd(), `filestorage`, `${new Date().getTime()}-uploaded.${exportedExtension}`);
    }

    process() {
        return new Promise(async (resolve, reject) => {
            try {
                const outputfile = this.#getOutputFile();
                const command = `${this.#BLENDER_BIN} --background -P ${this.#ENGINE_CLI_PATH} -- --verbose --input="${this.options.input}" --output="${outputfile}" --scale=${this.options.scale} --position ${this.options.position.x} ${this.options.position.y} ${this.options.position.z} --levels=${this.options.subdivision}`
                console.log(`running command: ${command}`);
                const { stdout, stderr } = await execAsync(command); // #TODO: stderr, gives the error message even if the command is successful
                if (stdout) return resolve(outputfile)
            } catch (error) {
                console.log(`something went wrong: ${error?.message}`)
                return reject(error)
            }
        })
    }

}

export { Enginehandler };