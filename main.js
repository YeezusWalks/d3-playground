var total_population = lineChart();
var population_growth = lineChart().label("Growth(%)").axisLabelTranslate(20).startFromZero(0);
var population_density = lineChart().label("Density/km^2").axisLabelTranslate(40);
var urban_population = lineChart().label("Urban population %").axisLabelTranslate(60);

d3.json("total_population.json",function(error,data){
    if (error) throw error;
    var final_data = [];
    for(i = 0; i<data[1].length; i++){
        var element = data[1][i];
        var entry = [];
        entry.push(element.date);
        entry.push(element.value);
        final_data.push(entry);
    }
    final_data.reverse();
    d3.select("#line-population")
    .datum(final_data)
    .call(total_population);
});

d3.json("growth_population.json",function(error,data){
    if (error) throw error;
    var final_data = [];
    for(i = 0; i<data[1].length; i++){
        var element = data[1][i];
        var entry = [];
        entry.push(element.date);
        entry.push(element.value);
        final_data.push(entry);
    }
    final_data.reverse();
    d3.select("#line-growth")
    .datum(final_data)
    .call(population_growth);
});

d3.json("density_population.json",function(error,data){
    if (error) throw error;
    var final_data = [];
    for(i = 0; i<data[1].length; i++){
        var element = data[1][i];
        var entry = [];
        entry.push(element.date);
        entry.push(element.value);
        final_data.push(entry);
    }
    final_data.reverse();
    d3.select("#line-density")
    .datum(final_data)
    .call(population_density);
});

d3.json("urban_population.json",function(error,data){
    if (error) throw error;
    var final_data = [];
    for(i = 0; i<data[1].length; i++){
        var element = data[1][i];
        var entry = [];
        entry.push(element.date);
        entry.push(element.value);
        final_data.push(entry);
    }
    final_data.reverse();
    d3.select("#line-urban")
    .datum(final_data)
    .call(urban_population);
});