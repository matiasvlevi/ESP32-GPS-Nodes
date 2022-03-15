import { readFileSync } from "fs"
import optionConfig from "./config"
import path from "path"

export type MAP<T> = {
    [key:string]:T;
}
 
export type queryPair = {
    query:string;
    content:string;
}

class TemplateGenerator {
    features:string[];
    deviceName:string;
    options:MAP<queryPair>;

    constructor(name:string, argv:string[]) {
        this.deviceName = name;
        this.features = ['Microcontroller'];

        this.options = TemplateGenerator.parseOptions(argv);

        for (let option in this.options) {
            for (let available in optionConfig) {
                if (option !== available) continue;
                
                // Run option action
                optionConfig[available].action(
                    this, 
                    this.options[option].content
                );
            }
        }
    }
    static TEMPLATE:MAP<string> = {
        core: readFileSync(path.join(__dirname,'../../../templates/sdk/core.txt'),'utf-8'),
        gps: readFileSync(path.join(__dirname, '../../../templates/sdk/gps.txt'), 'utf-8'),
        dht: readFileSync(path.join(__dirname, '../../../templates/sdk/dht.txt'),'utf-8')
    }

    static parseOptions (argv:string[]):MAP<queryPair>  {
        let entries:MAP<queryPair> = {}; 
        let pair:string[] = [];
        let buffer:string = '';
    
        for (let i = 0; i < argv.length; i++) {
            if (argv[i][0] === '-' && argv[i][1] === '-') {
                buffer = argv[i].replace('--', '');
                pair = buffer.split('=');
                entries[pair[0]] = {
                    query:pair[0],
                    content:pair[1]
                };
            }
        }
        return entries;
    }
    static process (temp:string, content: any):string  {
        
        let template:string = temp;

        let source:string = template;
        template.match(/\${.*?}/gm)?.forEach((m)=>{
            let values = m.match(/(?<=\$\{).*?(?=\})/gm);

            if (values === null) return; // Skip if no interior match was found (Empty literal)
            
            // Get the device's name
            let name:string = values[0];

            if (content[name] === undefined) return; // Skip if value not found in content
            source = source.replace('${'+name+'}', content[name]);
        });

        console.log(template)
        console.log(source);

        return source;
    }
    readTemplate(key:string) {
        return readFileSync(
            path.join(__dirname, `../../../templates/sdk/${key}.txt`),
            'utf-8'
        );
    }

    formatImports() {
        let stream:string = `import { Microcontroller } from '../core/Microcontroller'\n`;
        for (let i = 1; i < this.features.length; i ++) {
            let sensor = this.features[i].toLocaleLowerCase();
            stream+=`import { ${this.features[i]}, ${sensor}Data } from '../sensors/${sensor}'\n`;
        }
        return stream;
    }
    // TODO: generate code snippets for all features,
    // then generate the core source code and assemble everything
    getData():string {

        let data = {
            imports: this.formatImports(),
            features:`implements ${this.features.join(', ')}`,
            deviceName: this.deviceName
        }
        let coreSource:string = TemplateGenerator.process(TemplateGenerator.TEMPLATE.core, data);

        let featureImplementation:string = '';
        let key:string;
        for (let i = 0; i < this.features.length; i++) {
 
            key = this.features[i].toLocaleLowerCase();
            console.log([TemplateGenerator.TEMPLATE[key]])
            if (TemplateGenerator.TEMPLATE[key] !== undefined)  {
                featureImplementation += 
                    `\n\t${TemplateGenerator.TEMPLATE[key].split(/\n/gm).filter(x=>(x.length>0)).join('\n\t')}\n\t`
            }
        }

        console.log('thisone',[featureImplementation]);
        coreSource = TemplateGenerator.process(
            coreSource,
            {featureImplementation}
        )
        return coreSource;
    }
}

export default TemplateGenerator;