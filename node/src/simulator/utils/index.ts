import util from 'util'
import { exec as exec_ } from 'child_process'

const exec = util.promisify(exec_);
function delay(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)) }
export { exec, delay };

