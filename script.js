let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){

    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if(text===""){
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text:text,
        completed:false
    });

    input.value="";

    saveTasks();

    displayTasks();

}

function displayTasks(){

    let list=document.getElementById("taskList");

    let search=document.getElementById("search").value.toLowerCase();

    list.innerHTML="";

    tasks.forEach((task,index)=>{

        if(task.text.toLowerCase().includes(search)){

            let li=document.createElement("li");

            let span=document.createElement("span");

            span.innerText=task.text;

            if(task.completed){
                span.classList.add("completed");
            }

            li.appendChild(span);

            let actions=document.createElement("div");

            actions.className="actions";

            let complete=document.createElement("button");
            complete.innerText=task.completed ? "Undo" : "Complete";
            complete.className="completeBtn";

            complete.onclick=function(){

                tasks[index].completed=!tasks[index].completed;

                saveTasks();

                displayTasks();

            };

            let edit=document.createElement("button");

            edit.innerText="Edit";

            edit.className="editBtn";

            edit.onclick=function(){

                let newTask=prompt("Edit Task",task.text);

                if(newTask!=null && newTask.trim()!=""){

                    tasks[index].text=newTask.trim();

                    saveTasks();

                    displayTasks();

                }

            };

            let del=document.createElement("button");

            del.innerText="Delete";

            del.className="deleteBtn";

            del.onclick=function(){

                if(confirm("Delete this task?")){

                    tasks.splice(index,1);

                    saveTasks();

                    displayTasks();

                }

            };

            actions.appendChild(complete);

            actions.appendChild(edit);

            actions.appendChild(del);

            li.appendChild(actions);

            list.appendChild(li);

        }

    });

}

displayTasks();