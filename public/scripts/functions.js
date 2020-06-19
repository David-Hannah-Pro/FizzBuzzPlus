//TEMPORARY Word Values
const wordArray = [
   'Whizz',
   'Abuzz',
   'Hired',
   'Jazz',
   'Pazazz',
   'Blitz',
   'Actor',
   'Agent',
   'Apply',
   'Begin',
   'Below',
   'Love',
   'Board',
   'Clean',
   'Coast',
   'Beach',
   'Cabin',
   'Daily',
   'Guest',
   'Human',
   'Hotel',
   'Ideal',
   'Input',
   'Laugh',
   'Logic',
   'Movie',
   'Novel',
   'Ocean',
   'Nurse',
   'Price',
   'Power',
   'Scope',
   'Sight',
   'Sleep',
   'Round',
   'Prove',
   'Rural',
   'Smile',
   'Storm',
   'Start',
   'Speed',
   'These',
   'Think',
   'Sweet',
   'Style',
   'Upper',
   'Young',
   'Honest',
   'Write',
   'Valid',
   'Unity',
];
const randomNumForWord = () => Math.ceil(Math.random()*wordArray.length-1); //Used to select a random word from the array

//Fx that returns a random number between 1-25 - used to generate a default value when adding a new rule
const randomNum25 = () => Math.ceil(Math.random()*24)+1;

//Populates display with default rules
const createDefaultRules = () => {
    $('#word-rules').html('');
    $('#FB-display').html('');


    appendRuleForm();
    appendRuleForm();
    appendAddNewRuleButton();

    $('.num-input').eq(0).attr('value', '3');
    $('.num-input').eq(1).attr('value', '5');

    $('.word-input').eq(0).attr('value', 'Fizz');
    $('.word-input').eq(1).attr('value', 'Buzz');

    rulesArray = updateRulesArray();
   
    //Creates Default Color Values
   createColorInputs();
   $('.color-input').eq(0).attr('value', '#BB86FC');
   $('.color-input').eq(1).attr('value', '#03DAC5');
};

//Appends a button to add new rules
const appendAddNewRuleButton = () => {
    //Creates Add New Rule Button
    const addButton = $('<button></button>');
    addButton.attr('id', 'add-new-button');
    addButton.addClass('add-new-button');
    addButton.text('+');

    //Creates Add New Rule Text
    const buttonLabel = $('<label></label>');
    buttonLabel.attr('for', 'add-new-button');
    buttonLabel.addClass('add-text');
    buttonLabel.text('Add New Rule');

    //Puts button and label together in form
    const addNewForm = $('<form></form>');
    addNewForm.attr('id', 'new-rule-form');
    addNewForm.append(addButton, buttonLabel);

    //Appends Add New Rule to rulesDisplay
    $('#add-new-button').append(addNewForm);
    addAddNewRuleButtonListener();
};

//Appends a new rule to the display
const appendRuleForm = () => {
    //Create Remove Button
    const removeButton = $('<button></button>');
    removeButton.addClass('remove-button');
    removeButton.text('X');

    //Create Word Input
    const wordLabel = $('<label></label>');
    wordLabel.attr('for', 'word');
    wordLabel.text('Write');

    //Create Word Input
    const randomIndex = randomNumForWord();
    const wordInput = $('<input></input>');
    wordInput.attr({
        type: 'text',
        name: 'word',
        value: wordArray[randomIndex]
    });
    wordArray.splice(randomIndex, 1);
    wordInput.addClass(['input', 'word-input']);

    //Create rule text
    const numLabel = $('<label></label>');
    numLabel.attr('for', 'num');
    numLabel.addClass('divisible');
    numLabel.text('when divisible by');

    //Create  number input
    const numInput = $('<input></input>');
    numInput.attr({
        name: 'num',
        type: 'number',
        value: randomNum25(),
    });
    numInput.addClass(['input', 'num-input']);


    const form = $('<form></form>');
    form.addClass('rule-line');
    form.append(removeButton, wordLabel, wordInput, numLabel, numInput);

    $('#word-rules').append(form);

    //Update FizzBuzz display and color inputs
    rulesArray = updateRulesArray();
    createColorInputs();
    addColorButtonListener();
    appendFizzBuzzDOM();
};

//Creates a color input
const createColorInputs = () => {
    //Clears existing colorInputs
    $('#color-rules').html('');

    //Update each button with corresponding word and append
    rulesArray.forEach(function (rule) {

        //Create Input
        const input = $('<input></input>');
        input.addClass(['color-input', `${rule.word}-button`]);
        input.attr({
            name: 'color-input',
            type: 'color',
            value: rule.color
        });

        //Create Label
        const label = $('<label></label>');
        label.attr('for', 'color-input');
        label.addClass('color-label');
        label.text(`${rule.word}`);

         //Create form
        const form = $('<form></form>');
        form.append(input, label);
        form.addClass(`${rule.word}`)

        form.appendTo($('#color-rules'));
    });
};

//returns rulesArray w/ objects w/ word, num, and color values
const updateRulesArray = () => {
    let rulesArray = [];
    const ruleLines = $('.rule-line');
    for(i=0; i<ruleLines.length; i++){
        ruleObject = {
            word: $('.word-input').eq(i).attr('value'),
            num: Number($('.num-input').eq(i).attr('value')),
            color: $('.color-input').eq(i).attr('value')===undefined ? '#'+("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6) : $('.color-input').eq(i).attr('value')
        }
        rulesArray.push(ruleObject);
        console.log(ruleObject);
    };
    return rulesArray;
};

//Takes Rules List and appliees it to fizzBuzz Array. Then appends the array
const appendFizzBuzzDOM = () => {
    //Resets FB-Display
    $('#FB-display').html('');


    //Generate arrays for FizzBuzz
    let wordNumbers = [];//This array takes a number that has been replaced with a word (ex. 3 for Fizz)
    let fbInnerHTML = [];//This builds the innertext to append later

    for(i=1; i<=100; i++){
        let value = '';
        
        rulesArray.forEach((rule) => {
            if (i%rule.num === 0){ //if the digit is divisible by the inputted number
                value = rule.word;
                if(wordNumbers[wordNumbers.length-1] !== i){//checks for multiple words for one value (like FizzBuzz @ 15)
                    fbInnerHTML += `<span class='${value}'>${value}  </span>`;
                    wordNumbers.push(i);
                }else if (wordNumbers[wordNumbers.length-1] === i){
                    let newHTML = fbInnerHTML.slice(0, fbInnerHTML.length-9) + fbInnerHTML.slice(fbInnerHTML.length-7, fbInnerHTML.length); //Removes spaces between words for the same number (prevents Fizz  Buzz at 15)
                    newHTML += `<span class='${value}' i>${value}  </span>`;
                    fbInnerHTML = newHTML;
                };
            };
        });

        //If theres not a match, add the num to innerHTML
        if(value === '') {
            value = i.toString();
            fbInnerHTML += `${value}  `;
        };
    };


    //Create and append fizzBuzz array
    const fbElement = $('<p></p>');
    fbElement.addClass('fb-p');
    fbElement.html(fbInnerHTML);
    $('#FB-display').append(fbElement);


    //Adds color to corresponding words - applies to color input as well
    rulesArray.forEach(function (rule){
        $(`.${rule.word}`).css('color', `${rule.color}`);
        $(`.${rule.word}-button`).css('background-color', `${rule.color}`);
    });
};

//Adds event listeners to rule lines 
const addRuleFormListeners = () => {
    //Event Listener for word input
    $('.word-input').on('input', function (e){
        $(this).attr('value', `${e.target.value}`)
        rulesArray = updateRulesArray();
        createColorInputs();
        addColorButtonListener();
        appendFizzBuzzDOM();
    });
    
    //Event Listener for number input
    $('.num-input').on('input', function (e){
        $(this).attr('value', `${e.target.value}`)
        rulesArray = updateRulesArray();
        createColorInputs();
        addColorButtonListener();
        appendFizzBuzzDOM();
    });
    
    //Event Listener for Remove Button
    $('.remove-button').click(function (e){
        e.preventDefault();
        e.target.parentNode.remove();

        const ruleWord = e.target.parentNode.children[2].value;
        const deletedRuleIndex = rulesArray.findIndex((rule) => rule.word===ruleWord);
        rulesArray.splice(deletedRuleIndex, 1);

        e.stopImmediatePropagation()//In some edge cases, the remove-button event handler can be added to the same element twice. This line runs on the first event, and prevents a duplicate event from firing

        createColorInputs();
        appendFizzBuzzDOM();
        
        //Checks for maximum of 5 rules
        if($('#word-rules').children().length<=4){
            $('#add-new-button').html('');
            appendAddNewRuleButton();
        }
        //Disables delete button if there is only 1 rule
        if(rulesArray.length === 1){
            $('.remove-button').attr('disabled', 'disabled');
        };
    });
};

//Adds event listeners to color buttons
const addColorButtonListener = () => {
    $('.color-input').on('input', function (e){
        const word = e.target.parentNode.className;
        const color = e.target.value
    
        $(this).attr('value', `${color}`);
    
        const rule = rulesArray.find((rule) => {
            return rule.word === word
        });
    
        rule.color = color
    
        rulesArray = updateRulesArray();//thisisrestting colors to 000000
        appendFizzBuzzDOM();
    });
};

//Adds listener to add-new-rule button
const addAddNewRuleButtonListener = () => {
    //Add-New-Rule Button Listener
    $('.add-new-button').click(function (e){
        e.preventDefault();
        $('#add-new-button').html('');


        //Creates maximum of 5 rules
        if($('#word-rules').children().length<=4){
            appendRuleForm();
            addRuleFormListeners();
            appendAddNewRuleButton();
        }

        //Create notification that maximum rules has been reached
        if($('#word-rules').children().length===5){
            const ruleLimitReached = $('<p></p>');
            ruleLimitReached.text('maximum of five rules');
            ruleLimitReached.attr('id', 'max-reached');
            $('#add-new-button').html(ruleLimitReached);
        };

        //If there are 2 or more rules, enable delte button on first rule
        if (rulesArray.length >= 1){
            $('.remove-button').eq(0).removeAttr('disabled');
        };
    });
};

//Adds listener for Learn-More section
const addLearnMoreListener = () => {

   $('.learn-more-btn').click(() => {
      $('.learn-more-btn').css('display', 'none');
      $('.text-description').css('display', 'block');
   });

   $('.close-description').click(() => {
      $('.text-description').css('display', 'none');
      $('.learn-more-btn').css('display', 'block');
   });
};