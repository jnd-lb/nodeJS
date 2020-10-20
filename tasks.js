
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


 const commandList = ['help','quit','exit'];
 const tasksList =[];

function startApp(name){


  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
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
  }
  else if(text === 'help\n'){
    help();
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
  let task = new Task(text.trim().replace("add ",""));
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


// The following line starts the application
startApp("Jihad Noureddine")
