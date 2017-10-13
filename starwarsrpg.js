
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


}

function selectEnemyFunction(event) {
    $(".attack-button").on("click", attackEnemyFunction);
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

    if (enemyToAttack.health <= 0) {
        $(".attack-button").off("click");
        if ($(".enemies-to-attack .char-tile").length != 0) {
            //remove that enemy
            $('.current-enemy-attacking div').remove();
            $('.current-stats').empty();
            //select a new enemy
            $(".enemies-to-attack .char-tile").on("click", selectEnemyFunction);
        } else {
            setTimeout(function () {
                var playAgain = confirm("You defeated " + enemyToAttack.name + "! Press OK to play again.");
                if (playAgain == true) {
                    starWarsReset();
                }
            }, 100)
        }
    }
}

function starWarsReset() {
    var skywalker = new StarWarsChar("Luke Skywalker", "luke", "assets/images/skywalker.png", 150, 6, 6);
    var darth = new StarWarsChar("Darth Vader", "vader", "assets/images/darthvader.png", 220, 10, 25);
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
        $('.current-stats').empty();

    });

    $(".characters .char-tile").on("click", selectYourCharacter);
}

$(window).load(starWarsReset)