import TemplateGenerator from "./generator";
import {MAP} from './generator'

const optionConfig:MAP<any> = {
    'features':{
        name:'features',
        action: (gen:TemplateGenerator, content:string)=>{
            let arr = content.split(','); 
            gen.features.push(...arr);
        }
    }
}

export default optionConfig;