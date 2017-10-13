//When the game starts, the player chooses a character by clicking on the fighter's picture
//The player will fight as that character for the rest of the game.
//The player must then defeat all of the remaining fighters
//Enemies should be moved to a different area of the screen
//The player chooses an opponent by clicking on an enemy's picture
//Once the player selects an opponent, that enemy is moved to a defender area
//The player will now be able to click the attack button.
//Whenever the player clicks attack, their character damages the defender
//The opponent will lose HP (health points). These points are displayed at the bottom of the defender's picture
//The opponent character will instantly counter the attack
//When that happens, the player's character will lose some of their HP
//These points are shown at the bottom of the player character's picture.
//The player will keep hitting the attack button in an effort to defeat their opponent.
//When the defender's HP is reduced to zero or below, remove the enemy from the defender area
//The player character can now choose a new opponent
//The player wins the game by defeating all enemy characters
//The player loses the game if their character's HP falls to zero or below

//Option 2 Game design notes
//Each character in the game has 3 attributes: Health Points, Attack Power and Counter Attack Power
//Each time the player attacks, their character's Attack Power increases by its base Attack Power
//For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on)
//The enemy character only has Counter Attack Power
//Unlike the player's Attack Points, Counter Attack Power never changes
//The Health Points, Attack Power and Counter Attack Power of each character must differ
//No characters in the game can heal or recover Health Points. 
//A winning player must pick their characters wisely by first fighting an enemy with low Counter Attack Power
// This will allow them to grind Attack Power and to take on enemies before they lose all of their Health Points
//Healing options would mess with this dynamic
//Your players should be able to win and lose the game no matter what character they choose
//The challenge should come from picking the right enemies, not choosing the strongest player

var yourPlayer = null;
var enemyToAttack = null;

var characterOptions = [];

function StarWarsChar(name, id, image, health, attack, counter) {
    this.name = name;
    this.id = id;
    this.image = image;
    this.health = health;
    this.baseattack = attack;
    this.attack = attack;
    this.counter = counter;
}

function selectYourCharacter(event) {
    console.log($(this).attr('id'));
    var selectedChar = $(this);
    $(".your-character").append(selectedChar);
    $(".characters .char-tile").off("click");

    var selectedCharId = $(this).attr('id')

    jQuery.each(characterOptions, function (i, val) {
        if (val.id != selectedCharId) {
            var unselectedChar = $("#" + val.id);
            $(".enemies-to-attack").append(unselectedChar);
        } else {
            yourPlayer = val;
        }
    });

    $(".enemies-to-attack .char-tile").on("click", selectEnemyFunction);
    $(".attack-button").on("click", attackEnemyFunction);

}

function selectEnemyFunction(event) {
    console.log($(this).attr('id'));
    var selectedEnemyChar = $(this);
    $(".current-enemy-attacking").append(selectedEnemyChar);
    $(".enemies-to-attack .char-tile").off("click");

    var selectedEnemyID = $(this).attr('id')

    jQuery.each(characterOptions, function (i, val) {
        if (val.id == selectedEnemyID) {
            enemyToAttack = val;
        }
    });

}

function attackEnemyFunction(event) {
    enemyToAttack.health -= (yourPlayer.attack);
    $("#" + enemyToAttack.id + " h3").text(enemyToAttack.health);
    $(".current-stats").text("You attacked " + enemyToAttack.name + " for " + yourPlayer.attack + " damage.");
    yourPlayer.attack += yourPlayer.baseattack;
    yourPlayer.health -= (enemyToAttack.counter);
    $(".current-stats").append("<br>" + enemyToAttack.name + " counter attacked you for " + enemyToAttack.attack + " damage.");
    $("#" + yourPlayer.id + " h3").text(yourPlayer.health);

    if (yourPlayer.health <= 0) {
        $(".attack-button").off("click");
        setTimeout(function () {
            var playAgain = confirm(enemyToAttack.name + " defeated you! Press OK to play again.");
            if (playAgain == true) {
                starWarsReset();
            }
        }, 100)
    }
}

function starWarsReset() {
    var skywalker = new StarWarsChar("Luke Skywalker", "luke", "assets/images/skywalker.png", 150, 6, 6);
    var darth = new StarWarsChar("Darth Vader", "vader", "assets/images/darthvader.png", 270, 10, 25);
    var leia = new StarWarsChar("Princess Leia", "leia", "assets/images/leia.png", 190, 8, 16);
    var jabba = new StarWarsChar("Jabba the Hutt", "jabba", "assets/images/jabba.png", 110, 1, 3);
    yourPlayer = null;
    enemyToAttack = null;

    characterOptions = [skywalker, darth, leia, jabba];

    jQuery.each(characterOptions, function (i, val) {
        console.log(val);
        var newCharDiv = $("<div class='char-tile' id='" + val.id + "'>");
        $(newCharDiv).append('<h1>' + val.name + '</h1>')
        $(newCharDiv).append('<img src="' + val.image + '" />')
        $(newCharDiv).append('<h3>' + val.health + '</h3>')
        $(".characters").append(newCharDiv);
        $('.your-character div').remove();
        $('.enemies-to-attack div').remove();
        $('.current-enemy-attacking div').remove();
        $('.current-enemy-attacking div').remove();
        $('.current-stats').empty();

    });

    $(".characters .char-tile").on("click", selectYourCharacter);
}

$(window).load(starWarsReset)