// Code for generating a Chart.js line chart
/* This script file will demonstrate how to create a scatter plot
    
*/

async function getData() {
    const response = await fetch('../data/rpdata.csv');
    const data = await response.text();
    //console.log(data);

    const xDays =[];  // x-axis labels = years
    const controlOneHead = [];  // y-axis labels
    const oneOneHead = []; // y-axis labels
    const controlOneTail = []; // y-axis labels
    const oneOneTail = []; // y-axis labels
    // \n new line character
    // split('\n') will create an array of strings, each string is a line from the csv file
    // slide(start,end) - return a new array starting at start and ending before end
    const table = data.split('\n').slice(1); // slice(1) to skip the header row
    //console.log(table);

    table.forEach(row => {
        const columns = row.split(','); //split each row into an array of columns
        const time = parseFloat(columns[0]); // first column is the year
        xDays.push(time); // push year value into array xDays

        const controlH1 = parseFloat(columns[1]); // convert global value from a string to a float
        controlOneHead.push(controlH1); // push global value into array controlOneHead

        const oneH1 = parseFloat(columns[7]); // convert northern hemisphere value from a string to a float
        oneOneHead.push(oneH1); // push northern hemisphere value into array oneOneHead

        const controlT1 = parseFloat(columns[4]); // convert southern hemisphere value from a string to a float
        controlOneTail.push(controlT1); // push southern hemisphere value into array controlOneTail

        const oneT1 = parseFloat(columns[10]); // convert value from a string to a float
        oneOneTail.push(oneT1); // push southern hemisphere value into array oneOneTail

    
        console.log(time, controlH1, oneH1, controlT1, oneT1); // log the values to the console
    });
    console.log(xDays.length, controlOneHead.length, oneOneHead.length, controlOneTail.length, oneOneTail.length); // log the lengths of the arrays to the console
    return {xDays, controlOneHead, oneOneHead, controlOneTail, oneOneTail}; // use {} to return multiple values as an object
}

async function createChart() {
    const data = await getData() //wait until getData() processes that data
    const lineChart = document.getElementById('lineChart');     // Get the html element that will hold the chart
    
    const myChart = new Chart(lineChart, {  // Construct the chart    
        type: 'line',
        data: {                         // Define data
            labels: data.xDays,        // x-axis labels
            datasets: [                  
                {
                    label:    `Control Head Length`,     // Dataset label for legend
                    data:     data.controlOneHead,    // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(255, 0, 132, 0.2)',    // Color for data marker
                    borderColor:      'rgba(255, 0, 132, 1)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },
                {
                    label:    `Experimental Head Length`,     // Dataset label for legend
                    data:     data.oneOneHead,    // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(0, 102, 255, 0.2)',    // Color for data marker
                    borderColor:      'rgba(0, 102, 255, 1)',      // Color for data marker border
                    borderWidth:      1,  // Data marker border width
                   
                },
                {
                    label:    `Control Tail Length`,     // Dataset label for legend
                    data:     data.controlOneTail,    // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(0, 153, 51, 0.2)',    // Color for data marker
                    borderColor:      'rgb(255, 9, 9)',      // Color for data marker border
                    borderWidth:      1,  // Data marker border width
                },
                {
                    label:    `Experimental Tail Length`,     // Dataset label for legend
                    data:     data.oneOneTail,    // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(0, 153, 51, 0.2)',    // Color for data marker
                    borderColor:      'rgba(0, 0, 0, 0.54)',      // Color for data marker border
                    borderWidth:      1,  // Data marker border width
                },
                
            ]
        },
        options: {                        // Define display chart display options 
            responsive: true,             // Re-size based on screen size
            maintainAspectRatio: false,
            scales: {                     // Display options for x & y axes
                x: {                      // x-axis properties
                    title: {
                        display: true,
                        text: 'Days',     // x-axis title
                        font: {                   // font properties
                            size: 14
                        },
                    },
                    ticks: {
                                            // x-axis tick mark properties
                    min: 0,                     // starting value      
                    max: 12,
                    font: {
                        size: 14  
                    },
                    },
                    grid: {                       // x-axis grid properties
                        color: '#6c767e'
                    }
                },
                y: {                              // y-axis properties
                    title: {
                        display: true,                          
                        text: 'Length (mm)',     // y-axis title
                        font: {
                            size: 14
                        },
                    },
                    ticks: {
                                           
                        maxTicksLimit: 12,        // Limit number of tick marks
                        font: {
                            size: 12
                        }
                    },
                    grid: {                       // y-axis gridlines
                        color: '#6c767e'
                    }
                }
            },
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: 'Growth of Planaria Over 12 Days',
                    font: {
                        size: 24,
                    },
                    color: '#black',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    display: true,
                    align: 'start',
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });  
    

}
createChart();  // Call the function to create the chart 