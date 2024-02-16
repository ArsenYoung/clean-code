//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput = document.querySelector(".task-items-container__create-task-container__input");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.querySelector(".task-items-container__tasks-list_incompleted");
var completedTasksHolder = document.querySelector(".task-items-container__tasks-list_completed");


//New task list item
var createNewTaskElement = function(taskString){

    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
    var editInput = document.createElement("input");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");
    var deleteButtonImg = document.createElement("img");

    listItem.className = "task-items-container__tasks-list__item task-items-container__tasks-list_incompleted";

    label.innerText = taskString;
    label.className = "task-items-container__tasks-list__item__task-description";

    //Each elements, needs appending
    checkBox.type = "checkbox";
    checkBox.className = "task-items-container__tasks-list__item__checkbox";

    editInput.className = "task-items-container__tasks-list__item__task";
    editInput.type = "text";

    editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
    editButton.className = "task-items-container__tasks-list__item__button-edit button-template";

    deleteButton.className = "task-items-container__tasks-list__item__button-delete button-template";
    deleteButtonImg.className = "task-items-container__tasks-list__item__button-delete__img";
    deleteButtonImg.src = './remove.svg';
    deleteButton.appendChild(deleteButtonImg);

    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask = function(){
    console.log("Add Task...");
    
    if (!taskInput.value) {
        return;
    }

    var listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";
}

//Edit an existing task.

var editTask = function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    var listItem = this.parentNode;

    var editInput = listItem.querySelector(".task-items-container__tasks-list__item__task");
    var label = listItem.querySelector(".task-items-container__tasks-list__item__task-description");
    var editBtn = listItem.querySelector(".task-items-container__tasks-list__item__button-edit");
    var containsClass = editInput.classList.contains("task-items-container__tasks-list__item__task_edit-mode");
    
    if(containsClass) {
        //switch to .editmode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        label.innerText = "";
        editBtn.innerText="Save";
    }

    label.classList.toggle("task-items-container__tasks-list__item__task-description_edit-mode");
    editInput.classList.toggle("task-items-container__tasks-list__item__task_edit-mode");
};


//Delete task.
var deleteTask = function(){
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    ul.removeChild(listItem);

}

//Mark task completed
var taskCompleted = function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    var taskDescription = listItem.querySelector('.task-items-container__tasks-list__item__task-description');

    listItem.classList.toggle("task-items-container__tasks-list_incompleted");
    listItem.classList.toggle("task-items-container__tasks-list_completed");
    taskDescription.classList.toggle("task-items-container__tasks-list__item__task-description_incompleted");
    taskDescription.classList.toggle("task-items-container__tasks-list__item__task-description_completed");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete = function(){
    console.log("Incomplete Task...");
    //Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasksList.
    var listItem = this.parentNode;
    var taskDescription = listItem.querySelector('.task-items-container__tasks-list__item__task-description');

    listItem.classList.toggle("task-items-container__tasks-list_incompleted");
    taskDescription.classList.toggle("task-items-container__tasks-list__item__task-description_completed");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


var bindTaskEvents=function(taskListItem, checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox = taskListItem.querySelector(".task-items-container__tasks-list__item__checkbox");
    var editButton = taskListItem.querySelector(".task-items-container__tasks-list__item__button-edit");
    var deleteButton = taskListItem.querySelector(".task-items-container__tasks-list__item__button-delete");


    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.