var field = [[]]

var game = (function() {
  var board = d3.select('body').append("ul").classed('towers',1);
  var ki = -1
  return {
    draw: function(matrix) {
      var towers = board.selectAll('li')
        .data(matrix, function(data, index) { return index })

      towers
        .enter()
          .append("li")
          .attr("tower", function(d,i) { return i })
      towers
        .exit().remove();

      var stones = towers.selectAll("button")
        .data(function(matrix) { return matrix }, function(data, index) { return data * (index+1) })

      stones
        .enter()
          .append("button")
          .attr("class", function(d) { return d != ki ? "white" : "black" })
          .attr("stone", function(d,i) { return i })
          .on("click", function(d, i) {
            if (d == ki) return;
            var x = parseInt(this.parentElement.attributes.tower.value);
            var y = i;
            console.log(x, y)
            field[x] = field[x].slice(0,y);
            game.draw(field)
            setTimeout(game.computer, 500)
          })
          .transition().delay(20)
      stones
        .exit().transition().style("opacity", 0).delay(20).remove()

      game.check();
    },
    computer: function() {
      var decision_matrix = future_score(field)
      var decision = best_choice(decision_matrix, ki)
      var x = decision[0], y = decision[1]
      field[x] = field[x].slice(0,y)

      game.draw(field)
    },
    check: function() {
      var decision_matrix = future_score(field)
      var decision_ki = best_choice(decision_matrix, ki)
      var decision_player = best_choice(decision_matrix, -ki)

      console.log(decision_ki)
      console.log(decision_player)

      if (isNaN(decision_ki[0])) { 
        alert("KI lost")
        game.reset()
      }
      if (isNaN(decision_player[0])) {
        alert("Player lost")
        game.reset()
      }
    },
    reset: function() {
      field = game.generate_winning_field();
      game.draw(field)
    },
    generate_winning_field: function() {
      var field = generate_field()
      while(score_field(field) > 0) { // TODO: Ugly magic number
        field = generate_field()
      }
      return field;
    }
  }
})();
game.reset();

game.draw(field);
