const app = require('./app')
const port = process.env.PORT || 7575;

app.listen(port, () => {
    console.log('App \'the Recipe Box\' is running on port:', port)
});