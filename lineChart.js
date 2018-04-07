/* global d3 */

function lineChart() {

	var margin = {top: 40, right: 20, bottom: 150, left: 70},
		width = 900,
		height = 450,
		parseTime = d3.timeParse("%Y"),
		innerWidth = width - margin.left - margin.right,
		innerHeight = height - margin.top - margin.bottom,
		xValue = function(d) { return parseTime(d[0]); },
		yValue = function(d) { return +d[1]; },
		xScale = d3.scaleTime().rangeRound([0,innerWidth]),
		yScale = d3.scaleLinear().rangeRound([innerHeight,0]),
		onMouseOver = function () { },
		onMouseOut = function () { }
		,label =""
		,axisLabelTranslate = 0
		,startFromZero = 1;
	
	function chart(selection) {

		selection.each(function (data) {
  
			// Select the svg element, if it exists.
			var svg = d3.select(this).selectAll("svg").data([data]);
	
			// Otherwise, create the skeletal chart.
			var svgEnter = svg.enter().append("svg");
			var gEnter = svgEnter.append("g");
	
			innerWidth = width - margin.left - margin.right,
			innerHeight = height - margin.top - margin.bottom,
  
			// Update the outer dimensions.
			svg.merge(svgEnter).attr("width", width)
			.attr("height", height);
	
			// Update the inner dimensions.
			var g = svg.merge(svgEnter).select("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
			xScale.domain(d3.extent(data, function(d) { return xValue(d); }));

			if(startFromZero===1){
				yScale.rangeRound([innerHeight, 0]).domain([0, d3.max(data, yValue)]);
			}
			else{
				yScale.domain(d3.extent(data, function(d) { return yValue(d); }));
			}
			
			var line = d3.line()
    			.x(function(d) { return X(d); })
    			.y(function(d) { return Y(d); });			

			g.append("g")
				.attr("transform", "translate(0," + innerHeight + ")")
				.call(d3.axisBottom(xScale));
			
			g.append("g")
				.call(d3.axisLeft(yScale))
			  	.append("text")
				.attr("fill", "#000")
				.attr("transform", "translate("+axisLabelTranslate+",-20)")
				.attr("y", 6)
				.attr("dy", "0.71em")
				.attr("text-anchor", "end")
				.text(label);

			
			g.append("path")
				.datum(data)
				.attr("fill", "none")
				.attr("stroke", "steelblue")
				.attr("stroke-linejoin", "round")
				.attr("stroke-linecap", "round")
				.attr("stroke-width", 1.5)
				.attr("d", line);
		});
	}
		
  // The x-accessor for the path generator; xScale ∘ xValue.
	function X(d) {
	  return xScale(xValue(d));
	}
  
	// The y-accessor for the path generator; yScale ∘ yValue.
	function Y(d) {
	  return yScale(yValue(d));
	}
  
	chart.margin = function(_) {
	  if (!arguments.length) return margin;
	  margin = _;
	  return chart;
	};

	chart.label = function(_){
		if (!arguments.length) return label
		label = _;
		return chart;
	}
	
	chart.axisLabelTranslate = function(_){
		if(!arguments.length) return axisLabelTranslate;
		axisLabelTranslate = _;
		return chart;
	}

	chart.startFromZero = function(_){
		if(!arguments.length) return startFromZero;
		startFromZero = _;
		return chart;
	}

	chart.width = function(_) {
	  if (!arguments.length) return width;
	  width = _;
	  return chart;
	};
  
	chart.height = function(_) {
	  if (!arguments.length) return height;
	  height = _;
	  return chart;
	};
  
	chart.x = function(_) {
	  if (!arguments.length) return xValue;
	  xValue = _;
	  return chart;
	};
  
	chart.y = function(_) {
	  if (!arguments.length) return yValue;
	  yValue = _;
	  return chart;
	};
  
	chart.onMouseOver = function(_) {
	  if (!arguments.length) return onMouseOver;
	  onMouseOver = _;
	  return chart;
	};
  
	chart.onMouseOut = function(_) {
	  if (!arguments.length) return onMouseOut;
	  onMouseOut = _;
	  return chart;
	};
	
	return chart;
}
  
  
  
  