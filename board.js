var field = generate_field();

var game = (function() {
  var board = d3.select('body').append("ul").classed('towers',1);
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
        .data(function(matrix) { return matrix })

      stones
        .enter()
          .append("button")
          .attr("class", function(d) { return d > 0 ? "white" : "black" })
          .attr("stone", function(d,i) { return i })
          .on("click", function(d, i) {
            var x = parseInt(this.parentElement.attributes.tower.value);
            var y = i;
            console.log("Tower " + x, "Stone " + y)

            field[x] = field[x].slice(0,y);
            game.draw(field)
          })
      stones
        .exit().transition().style("opacity", 0).delay(20).remove()

      console.log(board);
      console.log(towers);
    }
  }
})();

game.draw(field);
