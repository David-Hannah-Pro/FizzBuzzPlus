//INIT
let rulesArray = [];
createDefaultRules();
rulesArray = updateRulesArray();
appendFizzBuzzDOM();


//addEventListeners
addRuleFormListeners();
addColorButtonListener();
addLearnMoreListener();
$('#reset-all-btn').click(() => {
    location.reload(true); //reloads the page to restore defaults
});

