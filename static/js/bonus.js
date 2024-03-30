
// Sample JSON
console.log("Sample Json in bonus.js: ", sampleJson);


function gaugeChart(metadata) {

    console.log("metadata in bonus: ", metadata)

    let washfrequency = Object.entries(metadata)[6][1];

    console.log("washFrequency: ", washfrequency)
    
// Set up the trace for the gauge chart
let trace = {
    value: washfrequency,
    title: {
        text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
    },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
        axis: {range: [0,10], tickmode: "linear", tick0: 1, dtick: 1},
        // steps: [
        //     {range: [0, 1], color: "rgba(255, 255, 255, 0)"},
        //     {range: [1, 2], color: "rgba(232, 226, 202, .5)"},
        //     {range: [2, 3], color: "rgba(210, 206, 145, .5)"},
        //     {range: [3, 4], color:  "rgba(202, 209, 95, .5)"},
        //     {range: [4, 5], color:  "rgba(184, 205, 68, .5)"},
        //     {range: [5, 6], color: "rgba(170, 202, 42, .5)"},
        //     {range: [6, 7], color: "rgba(142, 178, 35 , .5)"},
        //     {range: [7, 8], color:  "rgba(110, 154, 22, .5)"},
        //     {range: [8, 9], color: "rgba(50, 143, 10, 0.5)"},
        //     {range: [9, 10], color: "rgba(14, 127, 0, .5)"},
        // ],
        steps: [
            { range: [0, 1], color: 'rgb(235, 255, 235)' },
            { range: [1, 2], color: 'rgb(215, 245, 215)' },
            { range: [2, 3], color: 'rgb(195, 235, 195)' },
            { range: [3, 4], color: 'rgb(175, 225, 175)' },
            { range: [4, 5], color: 'rgb(155, 215, 155)' },
            { range: [5, 6], color: 'rgb(135, 205, 135)' },
            { range: [6, 7], color: 'rgb(115, 195, 115)' },
            { range: [7, 8], color: 'rgb(95, 185, 95)' },
            { range: [8, 9], color: 'rgb(75, 175, 75)' },
            { range: [9, 10], color: 'rgb(55, 165, 55)' }
        ],
    } 
};

    let data = [trace];
    
    Plotly.newPlot('gauge', data);

}
