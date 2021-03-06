'use strict';

const list = document.querySelector('.list');
const button = document.querySelector('button');
const input = document.querySelector('input');
const incomplete = document.querySelector('.incomplete');
const done = document.querySelector('.done');
const total = document.querySelector('.all');

function ajaxreq(url, method, callback) {
	const req = new XMLHttpRequest();
	req.open(method, url);
	req.onreadystatechange = function() {
        if (req.readyState === 4 && req.status === 200) {
            var response = JSON.parse(req.response);
            callback(response);
        }
    }
    req.send();
};

const getTodoList = function() {
    const req = new XMLHttpRequest();
    const method = 'GET';
    const url = 'http://localhost:3000/todos';
    req.open(method, url);
    req.send();
    req.onreadystatechange = function() {
        if (req.readyState === 4 && req.status === 200) {
            var todoList = JSON.parse(req.response);
            console.log(todoList);
            list.innerText = '';
            todoList.forEach(function(item) {
                var todo = document.createElement('div');
                todo.setAttribute('class', 'todo');
                list.appendChild(todo);
                var todoText = document.createElement('div');
                todoText.innerText = item.text;
                todoText.setAttribute('class', 'todotext');
                todo.appendChild(todoText);
                var icons = document.createElement('div');
                icons.setAttribute('class', 'icons');
                todo.appendChild(icons)
                var trash = document.createElement('div');
                trash.setAttribute('class', 'trash');
                trash.setAttribute('id', item.id);
                icons.appendChild(trash);
                trash.addEventListener('click', function() {
                    ajaxreq('http://localhost:3000/todos/' + trash.id, 'DELETE', getTodoList)
                });
                console.log(item.id);
                console.log(item.text);
                console.log(item.completed);
                var check = document.createElement('div');
                if (item.completed === 0) {
                    check.setAttribute('class', 'no');
                } else {
                    check.setAttribute('class', 'yes');
                };
                check.setAttribute('id', item.id);
                icons.appendChild(check);
                check.addEventListener('click', function() {
                    putToServer('http://localhost:3000/todos/' + check.id, 'PUT', item.completed, getTodoList);
                });
                var getIncomplete = function() {
                	ajaxreq('http://localhost:3000/todos/incomplete', 'GET', getTodoList)
                }
                incomplete.addEventListener('click', getIncomplete);
            });
        }
    }
};

const postToServer = function(url, method, input, callback) {
    const req = new XMLHttpRequest();
    req.open(method, url);
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('Accept', 'application/json');
    req.onreadystatechange = function() {
        if (req.readyState === 4 && req.status === 200) {
            var newTodo = JSON.parse(req.response);
            callback(newTodo);
        };
    };
    var addTodo = {
        text: input,
        completed: 0
    };
    req.send(JSON.stringify(addTodo));
};

button.addEventListener('click', function() {
    postToServer('http://localhost:3000/todos', 'POST', input.value, getTodoList);
    input.value = '';
});

const putToServer = function(url, method, completed, callback) {
    const req = new XMLHttpRequest();
    req.open(method, url);
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('Accept', 'application/json');
    req.onreadystatechange = function() {
        if (req.readyState === 4 && req.status === 200) {
            var newStatus = JSON.parse(req.response);
            callback(newStatus);
        };
    };
    var status;
    if (completed === 0) {
        status = {
            completed: 1
        };
    } else {
        status = {
            completed: 0
        };
    };
    req.send(JSON.stringify(status));
};

total.addEventListener('click', getTodoList);

getTodoList();
