
id = "940"

// function buildCharts(samples) {

    // Use the D3 library to read in samples.json
    d3.json("./data/samples.json").then((data) => {
    console.log(data)

        // Create a horizontal bar chart 
        var selectSample = data.samples.filter(item => item.id.toString() === id)[0];
        console.log(`ID Selected: ${id}`)
        console.log(selectSample);

        // Slice only top 10 sample values 
        var sampleValues = selectSample.sample_values.slice(0, 10).reverse();
        console.log(`Selected Sample ${sampleValues}`)

        // Create variable for otu_ids
        var otuIds = selectSample.otu_ids.slice(0, 10).reverse();
        console.log(`OTU ID: ${otuIds}`)
        // Print OTU in front of value
        otuIdsPrint = otuIds.map(x => "OTU: " + x)

        // Create variable for otu_labels
        var otuLabels = selectSample.otu_labels.slice(0, 10).reverse();
        console.log(`OTU Labels: ${otuLabels}`)

        var trace1 = {
            x: sampleValues,
            y: otuIdsPrint,
            type: "bar",
            orientation: "h"
        };

        var data1  = [trace1];

        var layout1 = {
            title: "Top 10 OTUs",
            yaxis: {},
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };
        
        Plotly.newPlot("bar", data1, layout1);

        // Create a bubble chart that displays each sample
        // Set variables for sample values, otu_ids, otu_labels for bubble 
        var sampleValuesBubble = selectSample.sample_values
        var otuIdsBubble = selectSample.otu_ids
        var otuLabelsBubble = selectSample.otu_labels

        var trace2 = {
            x: otuIdsBubble,
            y: sampleValuesBubble,
            mode: 'markers',
            marker: {
                size: sampleValuesBubble,
                color: otuIdsBubble
            },
            text: otuLabelsBubble
        };

        var data2 = [trace2];

        var layout2 = {
            title: "Sample Values",
            xaxis: {title: "OTU ID"},
            height: 600,
            width: 1200
        };

        Plotly.newPlot("bubble", data2, layout2);

        // Create a gauge chart to plot weekly washing frequency of the individual 
        var sampleValuesGauge = selectSample.sample_values
        var otuIdsGauge = selectSample.otu_ids
        var otuLabelsGauge = selectSample.otu_labels

        var washFrequency = data.metadata.map(d => d.wfreq);
        console.log(`Wash Frequency: ${washFrequency}`)


        var trace3 = {
            domain: { x: [0, 1], y: [0, 1] },
		    value: washFrequency,
		    title: { text: "Belly Button Washing Frequency" },
		    type: "indicator",
		    mode: "gauge+number",
            gauge: {
                axis: { range: [0, 9], tickwidth: 1, tickcolor: "#800020" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "transparent",
                steps: [
                    { range: [0, 1], color:"#D7DBDD"},
                    { range: [1, 2], color: "#CACFD2"},
                    { range: [2, 3], color: "#EAFAF1"},
                    { range: [3, 4], color: "#D4EFDF"},
                    { range: [4, 5], color: "#A9DFBF"},
                    { range: [5, 6], color: "#7DCEA0"},
                    { range: [6, 7], color: "#52BE80"},
                    { range: [7, 8], color: "# 27AE60"},
                    { range: [8, 9], color: "#229954 "},
                ],  
            }
	    };
        var data3 = [trace3];

        var layout3 = {
            width: 500,
            height: 400,
            margin: { t: 0, 
                r: 0, 
                l: 0,
                b: 0 },
            font: { 
                color: "black", 
                family: "Arial" 
            }
        };

        Plotly.newPlot("gauge", data3, layout3);
    });


// Create a function to pull metadata and build panel for demographics 
function buildMetaData(samples) {

    // Use the D3 library to read in samples.json
    d3.json(`/metadata/${sample}`).then((data) => {

        // Use D3 to select the dropdown menu
        var panel = d3.select("#selDataset");

        // Use .html to clear existing metadata
        panel.html("");

        // Assign the value of the panel option to a variable
        Object.entries(data).forEach(([key, value]) => {
            panel.append("h5").text(`${key}:${value}`);
        })
    
    });


   // function init() {
    //     // Use D3 to select the dropdown menu
    //     var dropdownMenu = d3.select("#selDataset");

    //     // Use sample name list to populate the selection options
    //     d3.json("/names").then((sampleNames) => {sampleNames.forEach((sample) =>
    //         dropdownMenu
    //             .append("option")
    //             .text(sample)
    //             .property("vaule", sample)
            
    //         )});
    //     // Assign the value of the dropdown menu option to a variable
    //     var dataset = dropdownMenu.property("value");
    // }
    // // Initialize the dashboard
    // init();
