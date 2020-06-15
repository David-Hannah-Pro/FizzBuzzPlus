//TEMPORARY Word Values
const wordArray = [
   'Whizz',
   'Abuzz',
   'Frizz',
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
const randomNum50 = () => Math.ceil(Math.random()*wordArray.length-1); //Used to select a random word form the array

//Fx that returns a random number between 1-25 - used to generate a default value when adding a new rule
const randomNum25 = () => Math.ceil(Math.random()*25);


//Default Color Values
const colorArray = [
   '#BB86FC',
   '#03DAC5',
   '#f2a365',
   '#ef3038',
   '#ed8d8d'
]


//INIT
let rulesArray = [];
createDefaultRules();
rulesArray = updateRulesArray();
   //Creates Default Color Values
createColorInputs();
$('.color-input').eq(0).attr('value', colorArray[0]);
$('.color-input').eq(1).attr('value', colorArray[1]);
   //updates rules w/ data from color input
rulesArray = updateRulesArray();
appendFizzBuzzDOM();


//addEventListeners
addRuleFormListeners();
addColorButtonListener();
$('#reset-all-btn').click(() => {
    location.reload(true); //reloads the page to restore defaults
});

//Listerner for Learn-More section
$('.learn-more-btn').click(() => {
    $('.learn-more-btn').css('display', 'none');
    $('.text-description').css('display', 'block');
});

$('.close-description').click(() => {
    $('.text-description').css('display', 'none');
    $('.learn-more-btn').css('display', 'block');
})