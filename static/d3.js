var countries;
var x;
var y;
var z;
var duration = 1000;
var yearSlider = document.getElementById("yearSlider");

function createGraph(){

    // Create margin variables for the size of the svg
    var margin = {top: 10, right: 20, bottom: 30, left: 50},
    width = 900 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

    // Create the base svg to build on top of
    var svg = d3.select("#data")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("style", "outline: thin solid black;")
    .append("g")
      .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    x = d3.scaleLinear()
        .domain([0, 9])
        .range([ 0, width]);    

    svg.append("g")    
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "x-axis")
        .call(d3.axisBottom(x));

    // X axis text
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text("Children Per Woman")

    // Add Y axis
    y = d3.scaleLinear()
        .domain([0, 200000])
        .range([ height, 0]);

    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    // Y axis text
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 10)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Income Per Person GDP Per Capita")

    // Add a scale for bubble size
    z = d3.scaleLinear()
    .domain([1, 100])
    .range([ 1, 20]);
};

// When the slider is moved to change the year, move the circles
function moveCircles() {
    newYear = yearSlider.value;

    d3.select("svg").selectAll(".datapoint")
        .transition()
        .duration(duration)
        .attr("transform",function(d){
            if(d.data.cpw && d.data.ipp){
                
                if (d.data.cpw[newYear] != undefined){var cpw = d.data.cpw[newYear]}
                if (d.data.ipp[newYear] != undefined){var ipp = d.data.ipp[newYear]}
                
                if (cpw&&ipp){return "translate(" + x(cpw) + "," + y(ipp) + ")"} 
            }
        })

    d3.select("svg").selectAll("circle")
        .transition()
        .duration(duration)
        .attr("r", function(d) {
            if(d && d.data.ley){
                return z(d.data.ley[newYear])
            }
        })        
}

$.get("/countries", function (data){
    countries = JSON.parse(data);
    createGraph();

    // Tooltip div that is hidden by default
    var tooltip = d3.select("#data")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")

    // Show Tool Tip
    var showTooltip = function(d) {
        tooltip
          .transition()
          .duration(200)
        tooltip
          .style("opacity", 1)
          .html(
              "<p>Country: " + d.name + "</p><p>Life Expectancy: " + d.data.ley[document.getElementById("yearSlider").value] + "</p>"
          )
          .style("left", (d3.event.pageX + 15) + "px")
          .style("top", (d3.event.pageY + 15) + "px")
    }

    // Move Tool Tip
    var moveTooltip = function(d) {
    tooltip
        .style("left", (d3.event.pageX + 15) + "px")
        .style("top", (d3.event.pageY + 15) + "px")
    }
    // Hide Tool Tip
    var hideTooltip = function(d) {
    tooltip
        .transition()
        .duration(100)
        .style("opacity", 0)
    }

    // Select the base svf and append the data to points "g"
    var g = d3.select("svg")
    .selectAll("g")
    .data(countries);

    // Move the data points to the data that has been mapped to them
    var enter = g.enter()
        .append("g")
        .attr("id", function(d) {return d.name})
        .attr("class", "datapoint" )
        .attr("transform",function(d){
            if(d.data.cpw && d.data.ipp){
                
                if (d.data.cpw[1800] != undefined){var cpw = d.data.cpw[1800]}
                if (d.data.ipp[1800] != undefined){var ipp = d.data.ipp[1800]}
                
                if (cpw&&ipp){return "translate(" + x(cpw) + "," + y(ipp) + ")"} 
            }
        });
    
    // Draw the intial circles
    var circle = enter.append("circle")
        .attr("class", "circle")
        .attr("r", "20")
        .attr("r", function(d) {
            if(d && d.data.ley){
                return z(d.data.ley[1800])
            }            
        })
        .on("mouseover", showTooltip )
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip );
    
    // On sider change update the circles
    // This was previously oninput, but I used oninput in the HTML to update
    // the year counter
    yearSlider.onchange = function() {
        moveCircles();
    };
});




