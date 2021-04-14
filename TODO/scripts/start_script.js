const tasksBlock = $('.tasks');
const widthTasksBlock = tasksBlock.width();
const positionLeftTasksBlock = tasksBlock.position().left;
const positionRightTasksBlock = widthTasksBlock-positionLeftTasksBlock;


function addEventDraggable(obj) {
    obj.draggable(
        {
            axis: "x",
            containment: [positionLeftTasksBlock*0.8, 0, positionRightTasksBlock*1.2, 0],
            stop: function () {
                const absLeftBlock = $(this).position().left;
                $(this).css('backgroundColor', '');
                $(this).css('left', '0');
                if(absLeftBlock < (positionLeftTasksBlock/0.9)) {
                    $(this).addClass('checked');
                } else {
                    if(absLeftBlock > (positionRightTasksBlock/1.1)) {
                        $(this).addClass('deleted');
                    }
                }
            },
            drag: function() {
                $(this).css('backgroundColor', function () {
                    const differenceBetweenBlocks = $(this).offset().left - $(this).parent().offset().left;
                    if(differenceBetweenBlocks < -15) {
                        return `rgb(${255-2*Math.abs(differenceBetweenBlocks)}, 255, ${255-4*Math.abs(differenceBetweenBlocks)})`;
                    } else {
                        if (differenceBetweenBlocks > 15) {
                            return `rgb(252, ${255 - 2 * differenceBetweenBlocks}, ${255 - 4 * differenceBetweenBlocks})`;
                        }
                    }
                });
            }
        }
    );
}


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
    for(let task of day)
        tasksBlock.append(`
        <div class="task">${task['task']}</div>
    `);

    $('.add-task').click(() => {
        const taskInput = $('.task-input');
        const newTask = $(`<div class="task">${taskInput.val()}</div>`);
        addEventDraggable(newTask);
        $('.tasks').append(newTask);
        taskInput.val('');
    });

    addEventDraggable($('.task'));
});