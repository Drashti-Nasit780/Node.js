const express = require('express');
const server = express();

server.set('view engine', 'ejs');
server.use(express.urlencoded({ extended: true }));

let tasks = [
    { no: '1', tname: 'C++', tprio: 'low' },
    { no: '2', tname: 'JavaScript', tprio: 'low' },
    { no: '3', tname: 'Study', tprio: 'low' }
];

server.get('/', (req, res) => {
    res.render('index', { tasks });
});

server.post('/add-task', (req, res) => {
    tasks.push(req.body);
    res.redirect('/');
});

server.get('/delete-task/:no', (req, res) => {
    tasks = tasks.filter(t => t.no != req.params.no);
    res.redirect('/');
});

server.get('/edit-task/:no', (req, res) => {
    const record = tasks.find(t => t.no == req.params.no);
    res.render('editTask', { task: record });
});

server.post('/update-task', (req, res) => {
    const { no, tname, tprio } = req.body;

    tasks = tasks.map(t => {
        if (t.no == no) {
            t.tname = tname;
            t.tprio = tprio;
        }
        return t;
    });

    res.redirect('/');
});

server.listen(8073);
