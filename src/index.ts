
import {v4 as uuidV4} from "uuid";

const  list = document.querySelector<HTMLUListElement>("#list");
const  form = document.querySelector<HTMLFormElement>("#new-task-form");
const  inputTitle = document.querySelector<HTMLInputElement>("#new-task-title");
const  inputDesc = document.querySelector<HTMLInputElement>("#task-details");
const button = document.querySelector<HTMLButtonElement>("#cancel")
let tasks : Task[] = loadTasks();
tasks.forEach(t=>{
    addListItem(t);
});

type Task = { id:string , title: string , desc:string , completed:boolean , createdAt : Date};
button?.addEventListener('click', () => {
    form?.reset();
  });
form?.addEventListener("submit" , e=>{
    e.preventDefault();
    if(inputTitle?.value == "" ||  inputTitle?.value == null){
        return
    }
    const task :Task = {
        id:uuidV4(),
        title: inputTitle?.value ,
        completed : false,
        desc:inputDesc?.value==null ? "" : inputDesc?.value,
        createdAt: new Date()
    }
    tasks.push(task);
    savaTasks();
    addListItem(task);
    form.reset();
})

function addListItem(task: Task)  {
    const item = document.createElement("li");
    item.setAttribute("class" , "grid grid-cols-3 gap-4");
    item.setAttribute("id" , task.id);
    

    const divTaskDesc = document.createElement("div");
    divTaskDesc.setAttribute("class", "col-span-2");

    const divTaskAction = document.createElement("div");
    divTaskAction.setAttribute("class", "col-span-1 justify-self-end flex");

    const pTitle = document.createElement("p");
    pTitle.setAttribute("class" , "text-sm font-semibold leading-6 text-gray-900");
    
    const pDesc = document.createElement("p");
    pDesc.setAttribute("class" , "mt-1 truncate text-xs leading-5 text-gray-500");
  
    const divCheckBoxCaintainer = document.createElement("div");
    divCheckBoxCaintainer.setAttribute("class" , "px-2");
    const checkbox = document.createElement("input");
    checkbox.addEventListener("change", ()=>{
        task.completed=checkbox.checked;
        savaTasks();
    });
    checkbox.type="checkbox";
    checkbox.checked = task.completed;
    divCheckBoxCaintainer.append(checkbox);

    const divDeleteCaintainer = document.createElement("div");
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class" , "text-sm font-semibold text-white rounded-md bg-red-600 px-4 py-2")
    deleteButton.addEventListener("click", ()=>{
       tasks = tasks.filter(ele => ele.id === task.id);
       document.getElementById(task.id)?.remove();
       savaTasks();
    });
    deleteButton.type="button";
    const iconDelete = document.createElement("i");
    iconDelete.setAttribute("class" , "fas fa-trash-alt")

    deleteButton.append(iconDelete);
    divDeleteCaintainer.append(deleteButton);
   
    pTitle.append( task.title);
    pDesc.append(task.desc);
    divTaskDesc.append(pTitle);
    divTaskDesc.append(pDesc);
    divTaskAction.append(divCheckBoxCaintainer);
    divTaskAction.append(divDeleteCaintainer);

    item.append(divTaskDesc);
    item.append(divTaskAction);
    list?.append(item);
}

function savaTasks(){
    localStorage.setItem("Tasks", JSON.stringify(tasks));
}

function loadTasks() : Task[] {
    const  taskJson = localStorage.getItem("Tasks") ;
    if(taskJson == null) return  [];
    return JSON.parse(taskJson) ;
}