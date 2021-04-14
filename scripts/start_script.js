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


$(document).ready(() => {
    const tasksBlock = $('.tasks');

    for(let task of day)
        tasksBlock.append(`
        <div class="task">${task['task']}</div>
    `);


    $('.add-task').click(() => {
        const taskInput = $('.task-input');
        const newTask = $(`<div class="task">${taskInput.val()}</div>`);
        newTask.draggable(
            {
                axis: "x",
                containment: [positionLeftTasksBlock, 0, positionRightTasksBlock, 0],
                stop: function () {
                    const absLeftBlock = $(this).position().left;
                    console.log(absLeftBlock);
                    if(absLeftBlock < (positionLeftTasksBlock/0.9)) {
                        $(this).toggleClass('checked');
                    } else {
                        if(absLeftBlock > (positionRightTasksBlock/1.1)) {
                            $(this).toggleClass('deleted');
                        }
                    }
                }
            }
        );
        $('.tasks').append(newTask);

        taskInput.val('');
    });

    const widthTasksBlock = tasksBlock.width();
    const positionLeftTasksBlock = tasksBlock.position().left;
    const positionRightTasksBlock = widthTasksBlock-positionLeftTasksBlock;

    const taskBlock = $('.task');
    taskBlock.draggable(
        {
            axis: "x",
            containment: [positionLeftTasksBlock, 0, positionRightTasksBlock, 0],
            stop: function () {
                const absLeftBlock = $(this).position().left;
                console.log(absLeftBlock);
                if(absLeftBlock < (positionLeftTasksBlock/0.9)) {
                    $(this).toggleClass('checked');
                } else {
                    if(absLeftBlock > (positionRightTasksBlock/1.1)) {
                        $(this).toggleClass('deleted');
                    }
                }
            }
        }
    );
});