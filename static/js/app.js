const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"

// Sample JSON
const sampleJson = d3.json(url);
console.log("Sample Json: ", sampleJson);


// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    d3.json(url).then((data) => {
        
        let names = data.names;

        // populate the dropdown from the id's in the json response
        names.forEach((id) => {
            dropdownMenu.append("option")
                .text(id)
                .property("value",id);
            
        })

        // pick the 1st record in the response for sample chart
        let sampleData = data.samples[0];
        
        console.log("Sample Data: ", sampleData);

        // Initial Plots
        updateDemoInfo(data.metadata[0])
        barChart(sampleData);
        bubbleChart(sampleData);
        gaugeChart(data.metadata[0]);

    })
    
}


// This function is called whenever there is any change of value in the dropdown
function optionChanged(value){

    // log the changed option
    console.log("option changed, new value: ", value);

    d3.json(url).then((data) => {

        // select the json sample data for the selection from the dropdown
        sampleData = data.samples.filter(sample => sample.id == value)

        // Create Plot
        barChart(sampleData[0])
        bubbleChart(sampleData[0])

        // select the metadata for the selection from the dropdown
        metadata = data.metadata.filter(metadata => metadata.id == value)
        updateDemoInfo(metadata[0])

        // update gauge chart
        gaugeChart(metadata[0])
    })

}


function barChart(sampleData){

    // Fetch the Top 10 values for the given sample Data
    let otu_ids = sampleData.otu_ids.slice(0,10);
    let otu_labels = sampleData.otu_labels.slice(0,10);
    let sample_values = sampleData.sample_values.slice(0,10);

    console.log("otu_ids: ", otu_ids);
    console.log("otu_labels: ", otu_labels);
    console.log("sample_values: ", sample_values);

    // Initialize the x, y and hover text for the bar chart
    let trace = {
        x: sample_values.reverse(),
        y: otu_ids.map(id => `OTU-${id}`).reverse(),
        text: otu_labels.reverse(),
        type: "bar",
        orientation: 'h'
    }

    let data = [trace]

    // plot the bar chart
    Plotly.newPlot("bar", data)
}


function bubbleChart(sampleData){

    // Initialize the x, y and hover text for the bubble chart
    let trace = {
        x: sampleData.otu_ids,
        y: sampleData.sample_values,
        text: sampleData.otu_labels,
        mode: 'markers',
        marker: {
            size: sampleData.sample_values,
            color: sampleData.otu_ids
        }
    }
    
    let layout = {
        xaxis: {title: "OTU ID"}
    }

    let data = [trace]

    // plot the bubble chart
    Plotly.newPlot("bubble", data, layout)

}


function updateDemoInfo(metadata){

    console.log("metadata: ", metadata)

    // use d3 to select demo info
    let sampleMetadata = d3.select("#sample-metadata").html("")

    Object.entries(metadata).forEach(([key,value]) => {
        sampleMetadata.append("p")
        .text(`${key} : ${value}`);
    })

}

// Call the init function to load the default page
init()