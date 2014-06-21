var express = require('express');
var app = express();
app.use(express.static('app'));
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'));
console.log('app on port', app.get('port'));