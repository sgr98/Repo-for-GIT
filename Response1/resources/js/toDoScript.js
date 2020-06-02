

//SELECT THE ELEMENTS
const list = document.getElementById("list");
const input = document.getElementById("input");


//MY ADDITION (SINCE I AM USING ion-icon TAG INSTEAD OF i) NAMES
const check_btn_name = "checkmark-circle-outline";
const uncheck_btn_name = "radio-button-off-outline";


//CLASSES NAMES
const CHECK = "btn-check";
const UNCHECK = "btn-uncheck";
const LINE_THROUGH = "lineThrough"


//VARIABLES
let LIST, id;




// GET ITEM FROM LOCAL STORAGE
let data = localStorage.getItem("TODO");

// CHECK IF DATA IS NOT EMPTY
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}

// LOAD ITEMS TO USER'S INTERFACE
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}


//ADD A TODO FUNCTION
function addToDo(todo, id, done, trash) {

    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const ICON = done ? check_btn_name : uncheck_btn_name;

    const item = `<li class="item">
                    <ion-icon name="${ICON}" class="${DONE}" job="complete" id="${id}"></ion-icon>
                    <p class="text ${LINE}">${todo}</p>
                    <ion-icon name="trash-outline" class="trash" job="delete" id="${id}"></ion-icon>
                  </li>
                `;
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);

}


//ADD AN ITEM TO THE LIST WHEN USER PRESSES THE ENTER KEY
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const todo = input.value;

        // if the input isn't empty
        if(todo){

            addToDo(todo, id, false, false);
            
            LIST.push({
                name : todo,
                id : id,
                done : false,
                trash : false
            });

            //add item to local storage (this code is added where ever the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});


//COMPLETE TODO
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    // element.nameList.toggle(check_btn_name); ==== logicERR : 1 ====
    // element.nameList.toggle(uncheck_btn_name);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//REMOVE TODO
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = LIST[element.id].trash ? false : true;
}

//TARGET THE ITEMS CREATED DYNAMICALLY
list.addEventListener("click", function(event){

    const element = event.target; // return clicked element inside the list
    const elementJob = element.attributes.job.value; // complete or delete

    if(elementJob == "complete"){
        completeToDo(element);
    }
    else if(elementJob == "delete"){
        removeToDo(element);
    }

    //add item to local storage (this code is added where ever the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));

});


// ==== logicERR : 1 ====
// $('#list li ion-icon').click(function() {
//     $(this).next('ul').slideToggle('500');
//     $(this).find('.btn-uncheck').toggleName('uncheck_btn_name check_btn_name');
//     $(this).find('.btn-check').toggleName('check_btn_name uncheck_btn_name');
// });



// logicERR : 1 ==== ERROR: check mark doesn't appear when the ring is pressed
