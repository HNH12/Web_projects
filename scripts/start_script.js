function newTask(day, user_task) {
    day.count += 1;
    day[day.count] = {
      task: user_task,
      is_checked: false
    };
}

const day = {
    date: new Date().getDate(),
    count: 0,

    [Symbol.iterator]: function() {
        let current = 1;
        const last = this.count;
        const obj = this;

        return {
            next() {
                if(current <= last) {
                    return {
                        done: false,
                        value: obj[current++]
                    }
                } else {
                    return {
                        done: true
                    }
                }
            }
        }
    }
};

newTask(day, 'побрить ноги');
newTask(day, 'сделать ToDo');

for(let task of day)
    $('.tasks').append(`
        <div class="task">${task['task']}</div>
    `);


$('.add-task').on('click', () => {
    const taskInput = $('.task-input');

    $('.tasks').append(`
        <div class="task">${taskInput.val()}</div>
    `);

    taskInput.val('');
});