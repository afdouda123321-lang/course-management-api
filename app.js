const http= require('http') ;  
const fs= require('fs');
const server= http.createServer((req,res)=>{
const url = new URL(req.url, "http://localhost:3000");
if(url.pathname==="/") { res.end('welcome to our course api ')}

 else if (url.pathname==='/courses'&&url.searchParams.get("id") ){
  fs.readFile("courses.json" , "utf8", (err, data)=>{
    if (err) {res.end(err); 
        return;
     } 
    else {
        const courses= JSON.parse(data) ; 
         const  foundcourse= courses.find((ob)=>{return ob.id===Number( url.searchParams.get("id"))}); 
         if (!foundcourse) {
    res.end("Course not found");
    return;
}
        const result= JSON.stringify(foundcourse); 
        res.end(result);
        
    }
 } )

 } 
 else if(url.pathname==='/courses'){ 
    const raedstream = fs.createReadStream( './courses.json', "utf8");
    raedstream.pipe(res); 
}     
 else {
res.end("404 not found");

 }     


});  
server.listen(3000,()=>console.log("server is now working "));                      