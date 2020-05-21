function builtcharts(id){


d3.json("static/js/samples.json").then((data) => {

console.log(data);

// filtramos las muestras por ID
        
     
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        // Obtenemos el top 10  de la muestras orden
        var samplevalues = samples.sample_values.slice(0, 10).reverse();
        // Obtenelos el top 10 OTU and y lo ponemos en orden.
        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
        // concatenamos el OTU con el ID de OTU para los lables
        var OTU_id = OTU_top.map(d => "OTU " + d+" ")

var trace = {
  x: samplevalues,
  y: OTU_id,
  //text: labels,
  marker: {
    color: 'rgb(255, 141, 84)'},
  type:"bar",
  orientation: "h",
};

var data = [trace];

// Define the plot layout
var layout = {
title: "Samples",
//xaxis: { title: "X" },
//yaxis: { title: "Y" }
};

Plotly.newPlot("bar", data, layout);


var trace2 = {
  x: samplevalues,
  y: OTU_id,
  mode: 'markers',
  marker: {
    color: OTU_id,
    //opacity: OTU_id,
    size: samplevalues
  }
};

var data = [trace2];

var layout = {
  title: 'bubble chart',
  showlegend: false,
  height: 800,
  width: 1000
};

Plotly.newPlot('bubble', data, layout);

});
}
function builtmetadata(id){
  d3.json("static/js/samples.json").then((data) => {

    console.log(data);
    
    // filtramos las muestras por ID
                     
    var metadata = data.metadata.filter(s => s.id.toString() === id)[0];
    var panel = d3.select("#sample-metadata")
    panel.html("");
    Object.entries(metadata).forEach(([key,value]) => {
      panel.append("h5").text(key + ": " + value)
    })
  });
}
function optionChanged(newsample){
  builtcharts(newsample)
  builtmetadata(newsample)
}
function init(){
  var dropdown  = d3.select("#selDataset")
  d3.json("static/js/samples.json").then((data) => {
  var samplenames = data.names;
  samplenames.forEach((sample)=>{
    dropdown.append("option").text(sample).property("value",sample);
  })
  builtcharts(samplenames[0])
  builtmetadata(samplenames[0])
  });
}
init()