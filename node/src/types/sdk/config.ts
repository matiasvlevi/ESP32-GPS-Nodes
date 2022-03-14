import TemplateGenerator from "./generator";
import {MAP} from './generator'

const optionConfig:MAP<any> = {
    'features':{
        name:'features',
        action: (gen:TemplateGenerator, content:string)=>{

            gen.features.push(...content.split(','));
        }
    }
}

export default optionConfig;