import express from 'express';
const app = express();

app.use(express.static('public'))
app.use('/css', express.static('public/css'))
app.use('/js', express.static('public/js'))
app.use('/images', express.static('public/images'))
app.set('views', './views')
app.set('view engine', 'ejs')

const PORT = process.env.PORT || 3000;

app.get('', (req, res) => {
    res.render('index', { input: 'Hello' })
})

app.get('/changeGreeting', (req, res) => {
    let input = req.originalUrl.replace("/changeGreeting?greeting=", "").replace("%20", " ");
    res.render('index', { input: input })
})

app.listen(PORT, () => console.info(`App listening on port ${PORT}`))
