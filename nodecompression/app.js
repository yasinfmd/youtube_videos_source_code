const express= require('express');
const app= express();
const compression= require('compression');


app.use(compression({
    threshold:0
}));

app.get('/', (req, res) => {
    const text='Hello World!'.repeat(10000); // 10KB of text
    res.send(text);
});

app.listen(8000, () => {    
    console.log('Server is running on port 8000');
});