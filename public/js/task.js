function showTasks() {
    fetch('tasks')
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            document.querySelector('#tasks').innerHTML = '';

            var tasks = json.tasks;
            for(var i = 0; i < tasks.length; i++) {
                var task = tasks[i];
                var removeButton = '<button onclick="removeTask(\'' + task._id + '\')">X</button>';

                document.querySelector('#tasks').innerHTML += '<li>' + tasks[i].name + ' ' + removeButton + '</li>';
            }
        });
};

function removeTask(id) {
    fetch('task/' + id, {
        method: 'delete'
    })
        .then(showTasks);
};

function addTask() {
    var taskName = document.querySelector('#new_task').value;

    fetch('task', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: taskName })
    })
        .then(showTasks());

    return false;
};

showTasks();