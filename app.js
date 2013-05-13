var generate_field = function() {
  var field = []
  var towers = Math.round(Math.random() * 3) + 4
  for (var i = 0; i < towers; i++) {
    field[i] = generate_tower();
  };
  return field;
}
var generate_tower = function() {
  var tower = []
  var stones = Math.round(Math.random() * 5) + 1
  for (var i = 0; i < stones; i++) {
    tower[i] = Math.round(Math.random()) * 2 - 1
  };
  return tower;
}

var score_field = function(field) {
  return field.map(score_tower).reduce(function(accu, stone) { return accu + stone }, 0);
}

var score_tower = function(tower, index) {
  return tower.map(score_stone).reduce(function(accu, stone) { return accu + stone }, 0);
}

var score_stone = function(stone, index) {
  return stone / Math.pow(2, index);
}

var future_score = function() {
  return field.map(function(tower, i) {
    return tower.map(function(stone, j) {
      var clone = field.clone();

      clone[i] = clone[i].slice(0, j);

      return [i, j, score_field(clone)];
    })
  })
}

var best_choice = function(scoreboard, player) {
  if (typeof(player) === undefined) player = 1;
  var scorelist = scoreboard.reduce(function(accu, tower) { return accu.concat(tower) }, [])
  var choice = scorelist.reduce(function(accu, element) {
    if (Math.abs(element[2]) > Math.abs(accu[2]) && field[element[0]][element[1]] == player ) {
      accu = element
    }
    return accu;
  }, [NaN, NaN, 0]);
  return choice;
}


// Clone
// http://my.opera.com/GreyWyvern/blog/show.dml/1725165
Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (i in this) {
    if (i == 'clone') continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
};
