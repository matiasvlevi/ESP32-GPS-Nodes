import { writeFileSync, readFileSync } from "fs"
import path from 'path'
import TemplateGenerator from "./generator"



const parse = (queries:string[]) => {
    let deviceName:string = queries.splice(0,1)[0];

    let buffer:string = '';
    let queryPair:string[] = []; 
    for (let i = 0; i < queries.length; i++) {
        if (queries[i][0] === '-' && queries[i][1] === '-') {
            buffer = queries[i].replace('--', '');
            queryPair = buffer.split('=');
        }
    }


}
// See generator.ts
const main = (args:string[]) => {

    const deviceName = path.join(__dirname, args[0]);

    // TODO: Add parser
    // const data:dataBlock = {
    //     features: `implements ${features.join(', ')}`,
    //     featureImplementation: '',
    //     deviceName:'myDevice'
    // };

    // let userValues:any = new TemplateGenerator(args[0]);
    // const deviceSource:string = userValues.getData();
    
    //writeFileSync(devicePath, deviceSource, 'utf-8');

}

process.argv.splice(0,2);
main(process.argv);

