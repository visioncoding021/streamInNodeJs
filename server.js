const http = require('http');
const fs = require('fs');
const {Transform, pipeline} = require('stream');

const server = http.createServer((req,res)=>{
       if(req.url !=='/'){
         return res.end("this is an end!");
       }
       console.log("req coming!!");
       // Dounloading big file (bad way)
   /***    const file = fs.readFileSync("example.txt");
       return res.end(file);
       */

       // good way (streams)

      //  const readableStreams = fs.createReadStream("example.txt");
        // pipe the readable stream to writeable stream
        // readableStreams.pipe(res);


   /// stream video in bad way

// const file = fs.readFileSync('sql.mp4');
// res.writeHead(200,{'Content-Type':'video/mp4'})
// res.end(file);

//// good way to stream

// const readableStreams = fs.createReadStream("sql.mp4");
// readableStreams.pipe(res);

// copying big file in bad way

// const file = fs.readFileSync("example.txt");
// fs.writeFileSync("output.txt",file);
// res.end();

//copy big file in good way (stream);

// const readStream = fs.createReadStream("example.txt");
// const writeStream = fs.createWriteStream('output.txt');
// readStream.on('data',(chunk)=>{
//   console.log("chunk : ", chunk);
//   writeStream.write(chunk);
// })


//// string processing.....
const sampleFileStream = fs.createReadStream('example.txt');
const writableStream = fs.createWriteStream("output.txt");
// sampleFileStream.on('data',(chunk)=>{
//   console.log("Data",chunk);
//   const finalString = chunk.toString().toUpperCase();
//   writableStream.write(finalString);
// })


//************* trensform stream*/

const transfromStream = new Transform({
  transform(chunk,encoding,callback){
    console.log("chunk");
    const finalString = chunk.toString().toUppercase();
    callback(null,finalString);
  },
});


// sampleFileStream.pipe(transfromStream).pipe(writableStream);
// sampleFileStream.pipe(transfromStream).on('error',(err)=>{console.log(err)}).pipe(writableStream);
pipeline(sampleFileStream,transfromStream,writableStream,(err)=>{
  console.log(err);
});
res.end();




})

const PORT = 3000;
server.listen(PORT,()=>console.log('Listing on port',PORT));