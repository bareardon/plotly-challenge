
function buildCharts(id) {

    // Use the D3 library to read in samples.json
    d3.json("./data/samples.json").then(data=> {
        console.log(data)

        // Create a horizontal bar chart 
        var sampleData = data.samples.filter(d => d.id === id)[0];

        // console.log(`ID Selected: ${id}`)
        console.log(sampleData);

        // Slice only top 10 sample values 
        var sampleValues = sampleData.sample_values.slice(0, 10).reverse();
        console.log(`Selected Sample ${sampleValues}`)

        // Create variable for otu_ids
        var otuIds = sampleData.otu_ids.slice(0, 10).reverse();
        // console.log(`OTU ID: ${otuIds}`)
        // Print OTU in front of value
        otuIdsPrint = otuIds.map(d => "OTU: " + d)

        // Create variable for otu_labels
        var otuLabels = sampleData.otu_labels.slice(0, 10);
        // console.log(`OTU Labels: ${otuLabels}`)

        var trace1 = {
            x: sampleValues,
            y: otuIdsPrint,
            text: otuLabels,
            marker: {
                color: 'blue'
            },
            type: "bar",
            orientation: "h",
        };

        var data1 = [trace1];

        var layout1 = {
            title: "Top 10 OTUs",
            yaxis: {
                tickmode: "linear"
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

        Plotly.newPlot("bar", data1, layout1);

        // Create a bubble chart that displays each sample
        // Set variables for sample values, otu_ids, otu_labels for bubble 
        var sampleValuesBubble = sampleData.sample_values
        var otuIdsBubble = sampleData.otu_ids
        var otuLabelsBubble = sampleData.otu_labels

        var trace2 = {
            x: otuIdsBubble,
            y: sampleValuesBubble,
            mode: "markers",
            marker: {
                size: sampleValuesBubble,
                color: otuIdsBubble,
                colorscale: [[0, 'blue'], [1, 'green']],
                opacity: [1, 0.8, 0.6, 0.4],
            },
            text: otuLabelsBubble
        };

        var data2 = [trace2];

        var layout2 = {
            title: "Sample Values",
            xaxis: { title: "OTU ID" },
            height: 600,
            width: 1200
        };

        Plotly.newPlot("bubble", data2, layout2);
    });
}
// Create a function to pull metadata and build panel for demographics 
function buildDemoInfo(id) {

    // Use the D3 library to read in samples.json
    d3.json("./data/samples.json").then((data) => {

        // Use D3 to select the metadata
        var metadata = data.metadata;
        console.log(metadata)

        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        var demographicInfo = d3.select("#sample-metadata");

        // Use .html to clear existing metadata
        demographicInfo.html("");

        // Assign the value of the panel option to a variable
        Object.entries(result).forEach((key) => {
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
        showGauge(result.wfreq);
    });
}

function optionChanged(id) {
    buildCharts(id);
    buildDemoInfo(id);
}

function init() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");

    // Use sample name list to populate the selection options
    d3.json("./data/samples.json").then((data) => {
        console.log(data)
        data.names.forEach(function (name) {
            dropdownMenu.append("option").text(name).property("vaule");
        });

        buildCharts(data.names[0]);
        buildDemoInfo(data.names[0]);
    });
};

// Create a gauge chart to plot weekly washing frequency of the individual 
function showGauge(freq) {
    console.log("FRQ", freq);

    var data = [
        {domain: { x: [0, 1], y: [0, 1] },
        value: freq,
        title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
        type: "indicator",
        direction: 'clockwise',
        textinfo: 'text',
        textposition: 'inside',
        marker: {
            labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
            hoverinfo: 'text+name',
            color: "black",
            size: 12},
        mode: "gauge+number",
        gauge: {
            axis: { range: [0, 9], tickwidth: 1, tickcolor: "#800020", showticklables: false },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "transparent",
            bar: "black",
            steps: [
                { range: [0, 1], color: "#D7DBDD"},
                { range: [1, 2], color: "#CACFD2"},
                { range: [2, 3], color: "#EAFAF1"},
                { range: [3, 4], color: "#D4EFDF"},
                { range: [4, 5], color: "#A9DFBF"},
                { range: [5, 6], color: "#7DCEA0"},
                { range: [6, 7], color: "#52BE80"},
                { range: [7, 8], color: "#27AE60"},
                { range: [8, 9], color: "#229954"},]
            }
    }];

    var layout = {
        width: 500,
        height: 425,
        margin: {
            t: 100,
            r: 0,
            l: 0,
            b: 25
        },
    };

Plotly.newPlot("gauge", data, layout);
};

// Initialize the dashboard
init();


