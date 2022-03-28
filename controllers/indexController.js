
const sampleIndexController = async(req, res) => {
   res.render('index', { title: 'Express' });
}

module.exports = {
    sampleIndexController
}