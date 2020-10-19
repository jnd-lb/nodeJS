
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
  else if(text === 'hello\n'){
    hello();
  }else if(text.trim().toLocaleLowerCase().startsWith("hello")){
    helloParam(text);
  }
  else if(text === 'help\n'){
    help();
  }
  else{
    unknownCommand(text);
  }
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
 * @returns {void}
 */
function hello(){
  console.log('hello!')
}

/**
 * Says hello
 * 
 *@param {string} text the text received 
 * @returns {void}
 */
function helloParam(txt){
  txt = txt.trim();
  if(txt.toLocaleLowerCase()=="hello world") txt=txt+"!"; 
  if(txt==="hello !") txt=txt.replace(" ",""); 
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
