import { readFile, readFileSync } from "fs"
import path from "path"

export type MAP = {
    [key:string]:string;
}
 

class TemplateGenerator {
    features:string[];
    deviceName:string;
    constructor(name:string) {
        this.deviceName = name;
        this.features = ['Microcontroller']; 
    }
    static TEMPLATE:MAP = {
        core: readFileSync(path.join(__dirname,'../../../templates/sdk/core.txt'),'utf-8'),
        gps: readFileSync(path.join(__dirname, '../../../templates/sdk/gps.txt'), 'utf-8'),
        dht: readFileSync(path.join(__dirname, '../../../templates/sdk/dht.txt'),'utf-8')
    }

    // Take in a template key, and a content object
    static process (templatekey:string, content: any):string  {
        
        let template:string = TemplateGenerator.TEMPLATE[templatekey];
        let source:string = template;
        template.match(/\${.*}/gm)?.forEach((m)=>{
            let values = m.match(/(?<=\$\{).*(?=\})/gm);
            if (values === null) return; // Skip if no interior match was found (Empty literal)
            
            // Get the device's name
            let name:string = values[0];

            if (content[name] === undefined) return; // Skip if value not found in content
            source = source.replace('${'+name+'}', content[name]);
        });

        console.log(template)
        console.log(source);

        return template;
    }
    readTemplate(key:string) {
        return readFileSync(
            path.join(__dirname, `../../../templates/sdk/${key}.txt`),
            'utf-8'
        );
    }
    // TODO: generate code snippets for all features,
    // then generate the core source code and assemble everything
    getData():string {

        this.features.push();
        
        let data = {
            features:`implements ${this.features.join(', ')}`,
            deviceName: this.deviceName
        }
        return TemplateGenerator.process('core', data);
    }
}

export default TemplateGenerator;