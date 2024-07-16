const {Readable,Writable} = require('stream');
const readableStream = new Readable({
    objectMode:true,
    highWaterMark :64,
    read(){}
});
readableStream.on('data',(chunk)=>{
    console.log('Data is coming : ',chunk +"");
    writableStream.write(chunk);
})

console.log(readableStream.push("Data is here"));

const writableStream = new Writable({
    write(s){
        console.log("Write",s+"");
    }
})

writableStream.write('Hello'); 