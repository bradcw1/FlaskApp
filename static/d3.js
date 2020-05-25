//LEGEND
// cpw.csv = children_per_woman_total_fertility
//ipp.csv = income_per_person_gdppercapita_ppp_inflation_adjusted
//ley.csv = life_expectency_years

function x_minMax (data) {
    
    var keys = Object.keys(data[0]['data']['data1']);
    min = d3.min(keys);
    max = d3.max(keys);

    // var values = [("x_min", min), ("x_max", max)]

    return {"x_min":min,"x_max":max};
};
//clicking the button named "Get Countries" will call an AJAX function. This function
//will return the data from the API route "/countries". The resulting data will be printed to
//the console.
$.get("/countries", function(data){
    var parsedData = JSON.parse(data);

    var year = '1801'

    console.log(parsedData);

    // console.log(x_minMax(parsedData).x_min);

    var margin = {top: 10, right: 20, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

    // a common thing is to 'wrap' some elements in a 'g' container (group)
    // this is like wrapping html elements in a container div

    var svg = d3.select("#dataviz")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("style", "outline: thin solid black;")
    .append("g")
      .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    var x = d3.scaleLinear()
    .domain([0, 10])
    .range([ 0, width]);

    svg.append("g")    
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "x-axis")
    .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, 500])
    .range([ height, 0]);

    svg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(y));

    // Add a scale for bubble size
    var z = d3.scaleLinear()
    .domain([1, 100])
    .range([ 1, 100]);

    var g = d3.select("svg")
    .selectAll("g")
    .data(parsedData);

    // create new 'g' elements for each country

    var en = g.enter()
        .append("g")
        .attr("transform",function(d){
            if(d.data.cpw && d.data.ipp)
            {
                return "translate(" + x(d.data.cpw[year]) + "," + y(d.data.ipp[year]) + ")" 
            }
            
    });

    // add a circle to each 'g'
    var circle = en.append("circle")
        .attr("r",function(d){
            if(d && d.data.ley)
            {
                return z(d.data.ley[year])
            }
        })
        .attr("fill",function(d,i){ return i % 2 == 0 ? "red" : "blue" });

    // add a text to each 'g'
    en.append("text").text(function(d){ return d.name + ":" + d.data.cpw[year] + ":" + d.data.ipp[year] });

});
