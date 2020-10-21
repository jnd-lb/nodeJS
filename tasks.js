
//import Task from "./task.js";
const Task = require('./task.js');

/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */


 const commandList = ['help','quit','exit',"add","remove","list"];
 let tasksList = [];

function startApp(name){

  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log("\n");
  console.log("------------------------------------------------");
  console.log(`   Welcome to ${name}'s application!`);
  console.log("------------------------------------------------");
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other function
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  //textTrim = text.trim();

  if (text === 'quit\n' || text === 'exit\n' ) {
    quit();
  }
  else if(text.trim().startsWith('hello')){
    hello(text);
  }else if(text.startsWith("add")){
    add(text);
  }else if(text ==  "list\n"){
    list();
  }else if(text.trim().startsWith("remove")){
    remove(text.trim());
  }
  else if(text === 'help\n'){
    help();
  }else if(text.trim().startsWith("edit")){
    edit(text.trim());
  }
  else{
    unknownCommand(text);
  }
}

/**
 * 
 * add the a new task object to the tasksList
 * @param {string} text
 * @returns {void} 
 * 
 */
function add(text){
  if(text.trim()=="add") {
    console.log('\x1b[33m%s\x1b[0m',"the app expect a argument after 'add'");
    return;
  } 
  let task = new Task(text.trim().replace("add ","").trim());
  tasksList.push(task)
  console.log("\x1b[32m","task inserted properly",'\x1b[0m');
}

/**
 * list all the element in a list
 * @returns {void} 
 */
function list(){
  tasksList.forEach(element => {
    console.log((element.checked)?"[✓] ":"[ ] ",element.taskContent);
  });
}


/**
 * remove (without anything) should remove the last task
 * remove + index should remove the task at this index
 * @param {string} command 
 * @returns {void} 
 */

 function remove(command){
    //handle empty list
    if(tasksList.length==0) {
      console.log('\x1b[33m%s\x1b[0m',"the there is no task to be removed");
      return;
     }

  
  if(command == "remove") {
     tasksList.pop();
     console.log("\x1b[32m","task has been removed successfully",'\x1b[0m');
     return;
    }

  let tmp = command.split(" ");
  let index = tmp[1];

    //handle non- digit param
  if(index.match(/^[0-9]+/g) == null) {
    console.log('\x1b[33m%s\x1b[0m',"the app expect a number after 'remove'");
    return;
  }

   // handle out boundery errors
   if(index<=0 || index > tasksList.length){
     console.log('\x1b[33m%s\x1b[0m',`You only allowed to enter a number between 1 and ${tasksList.length}`);
     return;
   }
    
  //parsing it to 0 based indexing 
   index = parseInt(index) - 1;
  
  tasksList= [...tasksList.slice(0,index),
            ...tasksList.slice(index+1,tasksList.length)];

  console.log("\x1b[32m","task has been removed successfully",'\x1b[0m');
 }

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}

/**
 * list all the available to use commands
 * @returns {void}
 */
function help(){
  console.log("\n\n***************************************************************");
  console.log("* You can interact with the app using the following commands: *");
  console.log("***************************************************************");
  commandList.forEach(element=> {
    console.log(`- ${element}`);
  });
}

/**
 * Says hello
 *
 * @param {string} txt text added by user
 * unless the user enter hello ! or hello, it returns any thing entered by the user begins with hello. In case of "hello" or "hello !" the app returns "hello!".
 * @returns {void}
 */
function hello(txt){
  txt = txt.trim();
  if(txt.toLocaleLowerCase()=="hello world") txt=txt+"!"; 
  if(txt==="hello !") txt=txt.replace(" ",""); 
  if(txt==="hello") txt=txt+"!"; 
  console.log(txt)
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

/**
 * edit an existing task
 * @param {string} command
 * @returns {void}
 */

 function edit(command){
   if(command == "edit"){
    console.log('\x1b[33m%s\x1b[0m',"the app expect an argument after edit");
    return;
   }

   // handling wrong command format
   if(!command.match(/^edit [0-9]{1,2} new [A-Z a-z 0-9]{1,}/)){
    console.log('\x1b[33m%s\x1b[0m',"Please enter the commad following this format");
    console.log("edit {the task number} new {the new content}");
    return;
  }

  let temp = command.split(" ");
  let index = parseInt(temp[1]);
  
    // handle out boundery errors
    if(index<=0 || index > tasksList.length){
      console.log('\x1b[33m%s\x1b[0m',`You only allowed to enter a number between 1 and ${tasksList.length} after 'edit'`);
      return;
    }

  tasksList[index-1].taskContent = command.replace(/^edit [0-9]{1,2} /,"");

  //success message
  console.log("\x1b[32m","task has been edited successfully",'\x1b[0m');
 }

// The following line starts the application
startApp("Jihad Noureddine");