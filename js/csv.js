async function getData() {
    const response = await fetch('../data/rpdata.csv'); // .. moves you up one folder level
    const data = await response.text();                 // CSV in TEXT format
    console.log(data);
}