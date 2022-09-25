const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path){
    fs.readFile(path, 'utf8', function(err,data){
        if (err){
            console.log(`ERROR ${err}: cannot read ${path}`);
            process.exit(1);
        } else {
        console.log(data);
        }
    });
}

async function webCat(url){
    try {
        await axios.get(url).then(function(res){
            console.log(res.data.slice(0,100), '...');
        });
    } catch (err) {
        console.log(`ERROR ${err}: cannot fetch ${url}`)
        process.exit(1);
    }
}

function handleOutput(text, out){
    if(out){
        fs.writeFile(out, text, 'utf8', function(err){
            if(err){
                console.log(`ERROR ${err}: couldn't write ${out}`)
                process.exit(1);
            }
        })
    } else{
        console.log(text);
    }
}

let arg;
let out;

if (process.argv[2] === '--out'){
    out = process.argv[3];
    arg = process.argv[4];
} else {
    arg = process.argv[2];
}

if (arg.slice(0,4) === 'http'){
    webCat(arg, out);
} else {
    cat(arg, out);
}