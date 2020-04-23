import {knuthMorrisPratt, sortbyDesc} from './utils';
import * as fs from 'fs';

export class Main{
    static log(val:any){
        console.log(val);
    }

    static run() {
        var text = fs.readFileSync("data/oliver-twist.txt", "utf-8");
        var subtext = fs.readFileSync("data/first-names.txt", "utf-8");
        let oFilePath = 'data/output.txt';
        let results = {};
        var words = subtext.split(/\r?\n/).forEach((word) => {
          if (word.length > 0) {
            let count = knuthMorrisPratt(text, word);
            if(count > 0) {
              results[word] = count;
            }
          }
        });
        
        results = sortbyDesc(results);
        console.log(results);
        var oFileStream = fs.createWriteStream(oFilePath, { encoding: 'utf8' });
        for ( let r in results) {
          oFileStream.write(r + ' : ' + results[r] + '\n');
        }
        oFileStream.end();
    }
}

Main.log('Getting number of names from full text...');
Main.run();