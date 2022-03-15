import { writeFileSync, readFileSync } from "fs"
import path from 'path'
import TemplateGenerator from "./generator"


// See generator.ts
const main = (args:string[]) => {

    const devicePath = path.join(__dirname, `../../../src/types/devices/${args[0]}.ts`);

    let userValues:TemplateGenerator = new TemplateGenerator(args[0], args);
    const deviceSource:string = userValues.getData();
    
    writeFileSync(devicePath, deviceSource, 'utf-8');

}


let args:string[] | undefined = process.env.SUDO_COMMAND?.split(' ');

if (args !== undefined) {
    args.splice(0,3);
    main(args);
}


