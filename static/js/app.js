//giving the dropdown menu functionality
function dropDownMenu() {
    var menu = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        var sampleName = data.names;
        sampleName.forEach((name) => {
            menu
            .append("option")
            .text(name)
            .property("value", name);                
        });

        //set default
        const defaultSample = sampleName[0];
        demoTable(defaultSample);
        charting(defaultSample);
    });
}

function optionChanged(sampleName) {
    demoTable(sampleName)
    charting(sampleName);
}

function demoTable(sampleName) {
    d3.json("samples.json").then((data) => {
        var tabInfo = data.metadata;
        console.log(tabInfo)
        var filtered = tabInfo.filter(x => x.id == sampleName)[0];
        console.log(filtered)
        var tablegraphic = d3.select("#sample-metadata");
        tablegraphic.html("")
        
        Object.entries(filtered).forEach(([key,value]) => {
            var row = tablegraphic.append('tr');
            var cell = tablegraphic.append('td');
            cell.text(key.toUpperCase() + `: ${value}`)
            var cell = row.append('td');
        });
    });
}

function charting(sampleName) {
    d3.json("samples.json").then((data) => {
        var tabInfo = data.samples;
        var filtered = tabInfo.filter(x => x.id.toString() === sampleName)[0];
        console.log(filtered)
        var otu_ids = filtered.otu_ids;
        var otu_labels = filtered.otu_labels
        var sample_values = filtered.sample_values;
        
        //bar chart
        var trace1 = {
            type: "bar",
            orientation: "h",
            x: sample_values.slice(1,10),
            y: otu_ids.slice(1,10).map(x => `OTU ${x}`),
        };

        var data1 = [trace1];

        var layout1 = {
            title: "Top 10 OTU",
            // yaxis: dict(autorange="reversed"),
            xaxis: { title: "OTU (Operational Taxonomic Unit) Labels" },
            yaxis: { 
                title: "OTU (Operational Taxonomic Unit) IDs",
                autorange: "reversed"
            }
        };
        Plotly.newPlot("bar", data1, layout1);

        // Add code for bubble chart 
        var trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
              color: otu_ids,
              opacity: [1, 0.8, 0.6, 0.4],
              size: sample_values
            }
          };
          
          var data = [trace1];
          
          var layout = {
            showlegend: false,
            height: 600,
            width: 1000
          };
          
          Plotly.newPlot('bubble', data, layout);
    });
}

//initialize Dashboard
dropDownMenu();