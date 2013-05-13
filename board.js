var field = generate_field();

var board = d3.select('body').append("ul").classed('towers',1);

var towers = board
  .selectAll('li')


var stones = towers
  .data(field)
  .enter()
    .append("li")
    .attr("tower", function(d,i) { return i })
    .selectAll("button")
    .data(function(d) { return d; }, function(d,i) { return i; })

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
    })

stones.exit().remove();
