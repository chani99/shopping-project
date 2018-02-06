const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const session = require('express-session');
const path = require('path');

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))

app.use(session({
    secret: 'ssshhhhh',
    resave: true,
    saveUninitialized: true
}));

app.use(fileUpload());
 
var sess;
app.get('/', function(req,res){
    sess = req.session;
    sess['username'] = 'Student';
    console.log(sess);
    
    res.end(`Hello ${sess.username}`);
});

app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
    console.log(req.files);
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.file;
 
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(`uploads/${sampleFile.name}`, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});

app.listen(8081, function() {
    console.log('8081 success');
})