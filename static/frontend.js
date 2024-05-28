function callAPI_companyInfo() {
    var value = document.getElementById('input').value; 
    if (value === "") { document.getElementById("info-card").style.visibility = "hidden"; 
        var msg = "Please enter a stock ticker.";
        alert(msg); 
        return;}
    else { 
        setVis(); 
    $.ajax({ 
        url: "/getStockOutlookData", 
        type: "GET", 
        dataType: "json", 
        data: { "data": value },
        success: function(response) { 
            var companyName = response.name;
            var stockTickerSymbol = response.ticker;
            var stockExchangeCode = response.exchangeCode;
            var companyStartDate = response.startDate;
            var stockDescription = truncateString(response.description, 400);
            // Create the table and append it to the container
           // let table = $("<table>").appendTo("#company-container");
            $("#company-container").find("#myTable1").empty();
            let table = $("#company-container").find("#myTable1"); 
           // Number of rows in table
            let numRows = 5;
            // Loop to create rows
            for (let i = 0; i < numRows; i++) {
                // Create a row
                let row = $("<tr>").appendTo(table);
                // Create and append cells to the row
                $("<td>").text("Cell 1").appendTo(row);
                $("<td>").text("Cell 2").appendTo(row);
            }
            //row 1
            $("#company-container tr:eq(0) td:eq(0)").text("Company Name");
            $("#company-container tr:eq(0) td:eq(1)").text(companyName);
            $("#company-container tr:eq(0) td:eq(0)").addClass("label-column");  
            $("#company-container tr:eq(0) td:eq(1)").addClass("info-column"); 
            //row 2
            $("#company-container tr:eq(1) td:eq(0)").text("Stock Ticker Symbol");
            $("#company-container tr:eq(1) td:eq(1)").text(stockTickerSymbol);
            $("#company-container tr:eq(1) td:eq(0)").addClass("label-column");  
            $("#company-container tr:eq(1) td:eq(1)").addClass("info-column"); 
            //row 3
            $("#company-container tr:eq(2) td:eq(0)").text("Stock Exchange Code");
            $("#company-container tr:eq(2) td:eq(1)").text(stockExchangeCode);
            $("#company-container tr:eq(2) td:eq(0)").addClass("label-column");  
            $("#company-container tr:eq(2) td:eq(1)").addClass("info-column"); 
            //row 4
            $("#company-container tr:eq(3) td:eq(0)").text("Company Start Date");
            $("#company-container tr:eq(3) td:eq(1)").text(companyStartDate);
            $("#company-container tr:eq(3) td:eq(0)").addClass("label-column");  
            $("#company-container tr:eq(3) td:eq(1)").addClass("info-column"); 
            //row 5
            $("#company-container tr:eq(4) td:eq(0)").text("Description");
            $("#company-container tr:eq(4) td:eq(1)").text(stockDescription);
            $("#company-container tr:eq(4) td:eq(0)").addClass("label-column");  
            $("#company-container tr:eq(4) td:eq(1)").addClass("info-column"); 
            $("#company-container").find("td").css("border", "1px solid black");
        }, 
        error: function(error) { 
            console.log(error); 
        } 
    });
    }
}
function callAPI_stockSummary() {
    var value = document.getElementById('input').value; 
    $.ajax({ 
        url: "/getStockSummaryData", 
        type: "GET", 
        dataType: "json", // This tells jQuery to expect JSON response
        data: { "data": value },
        success: function(response) { 
            let stockTickerSymbol = response[0].ticker;
            let tradingDay = response[0].timestamp;
            let previousClosingPrice = truncateDecimal(response[0].prevClose);
            let openingPrice = truncateDecimal(response[0].open);
            let highPrice = truncateDecimal(response[0].high);
            let lowPrice = truncateDecimal(response[0].low);
            let lastPrice = truncateDecimal(response[0].last);
            var changePrice = truncateDecimal(lastPrice - previousClosingPrice);
            var changePercent = truncateDecimal((changePrice / previousClosingPrice) * 100);
            let numberSharesTraded = response[0].volume;
            
            let greenArrow = "static/GreenArrowUP.png";
            let redArrow = "static/RedArrowDown.png";
            var imgElmGreen7 = $("<img>").attr("src", greenArrow);
            var imgElmGreen8 = imgElmGreen7.clone();
            var imgElmRed7 = $("<img>").attr("src", redArrow);
            var imgElmRed8 = imgElmRed7.clone();
            imgElmGreen7.css({
                "width": "10px",   
                "height": "auto",   
            });            
            imgElmGreen8.css({
                "width": "10px",   
                "height": "auto",   
            });
            imgElmRed7.css({
                "width": "10px",   
                "height": "auto",   
            });
            imgElmRed8.css({
                "width": "10px",   
                "height": "auto",   
            });
            // Create the table and append it to the container
            $("#stock-container").find("#myTable2").empty();
            let table = $("#stock-container").find("#myTable2"); 
           
            // Number of rows in table
            let numRows = 10;
            // Loop to create rows
            for (let i = 0; i < numRows; i++) {
                // Create a row
                let row = $("<tr>").appendTo(table);
                //Create and append cells to the row
                $("<td>").text("Cell 1").appendTo(row);
                $("<td>").text("Cell 2").appendTo(row);
            }
            //row 1
            $("#stock-container tr:eq(0) td:eq(0)").text("Stock Ticker Symbol");
            $("#stock-container tr:eq(0) td:eq(1)").text(stockTickerSymbol);  
            $("#stock-container tr:eq(0) td:eq(0)").addClass("label-column");  
            $("#stock-container tr:eq(0) td:eq(1)").addClass("info-column"); 
            //row 2
            $("#stock-container tr:eq(1) td:eq(0)").text("Trading Day");
            $("#stock-container tr:eq(1) td:eq(1)").text(tradingDay);
            $("#stock-container tr:eq(1) td:eq(0)").addClass("label-column");  
            $("#stock-container tr:eq(1) td:eq(1)").addClass("info-column"); 
            //row 3
            $("#stock-container tr:eq(2) td:eq(0)").text("Previous Closing Price");
            $("#stock-container tr:eq(2) td:eq(1)").text(previousClosingPrice);
            $("#stock-container tr:eq(2) td:eq(0)").addClass("label-column");  
            $("#stock-container tr:eq(2) td:eq(1)").addClass("info-column"); 
            //row 4
            $("#stock-container tr:eq(3) td:eq(0)").text("Opening Price");
            $("#stock-container tr:eq(3) td:eq(1)").text(openingPrice);
            $("#stock-container tr:eq(3) td:eq(0)").addClass("label-column");  
            $("#stock-container tr:eq(3) td:eq(1)").addClass("info-column"); 
            //row 5
            $("#stock-container tr:eq(4) td:eq(0)").text("High Price");
            $("#stock-container tr:eq(4) td:eq(1)").text(highPrice);
            $("#stock-container tr:eq(4) td:eq(0)").addClass("label-column");  
            $("#stock-container tr:eq(4) td:eq(1)").addClass("info-column"); 
            //row 6
            $("#stock-container tr:eq(5) td:eq(0)").text("Low Price");
            $("#stock-container tr:eq(5) td:eq(1)").text(lowPrice);
            $("#stock-container tr:eq(5) td:eq(0)").addClass("label-column");  
            $("#stock-container tr:eq(5) td:eq(1)").addClass("info-column"); 
            //row 7
            $("#stock-container tr:eq(6) td:eq(0)").text("Last Price");
            $("#stock-container tr:eq(6) td:eq(1)").text(lastPrice);
            $("#stock-container tr:eq(6) td:eq(0)").addClass("label-column");  
            $("#stock-container tr:eq(6) td:eq(1)").addClass("info-column"); 
            //row 8
            $("#stock-container tr:eq(7) td:eq(0)").text("Change");
            if (changePrice >= 0) { //if change is +
                $("#stock-container tr:eq(7) td:eq(1)").text(changePrice); 
                $("#stock-container tr:eq(7) td:eq(1)").append(imgElmGreen7);
            }
            else { //if change is -, add a minus sign 
                $("#stock-container tr:eq(7) td:eq(1)").text(changePrice); 
                $("#stock-container tr:eq(7) td:eq(1)").append(imgElmRed7);
            }
            $("#stock-container tr:eq(7) td:eq(0)").addClass("label-column");  
            $("#stock-container tr:eq(7) td:eq(1)").addClass("info-column"); 
            
            //row 9
            $("#stock-container tr:eq(8) td:eq(0)").text("Change Percent");
            if (changePercent >= 0) { //if change is +
                $("#stock-container tr:eq(8) td:eq(1)").text(changePercent);
                $("#stock-container tr:eq(8) td:eq(1)").append(imgElmGreen8);               
            }
            else { //if change is -, add a minus sign 
                $("#stock-container tr:eq(8) td:eq(1)").text(changePercent);
                $("#stock-container tr:eq(8) td:eq(1)").append(imgElmRed8); 
            }
            $("#stock-container tr:eq(8) td:eq(0)").addClass("label-column");  
            $("#stock-container tr:eq(8) td:eq(1)").addClass("info-column"); 
            //row 10
            $("#stock-container tr:eq(9) td:eq(0)").text("Number of Shares Traded");
            $("#stock-container tr:eq(9) td:eq(1)").text(numberSharesTraded);
            $("#stock-container tr:eq(9) td:eq(0)").addClass("label-column");  
            $("#stock-container tr:eq(9) td:eq(1)").addClass("info-column"); 
 
            $("#stock-container").find("td").css("border", "1px solid black");
        }, 
        error: function(error) { 
            console.log(error); 
        } 
    });
}
function handleTabChange(tabId) {
    // Do something when the tab is clicked
    let id = tabId;
    var notEmpty = $("#company-container").html() !== "";
    if (id === "company" && notEmpty) {
        $("#company-container").find("#myTable1").empty();
        callAPI_companyInfo();
        console.log("Tab changed:", tabId);
    }
    if (id === "stock" && notEmpty) { 
        $("#stock-container").find("#myTable2").empty();
        callAPI_stockSummary();
        console.log("Tab changed:", tabId);
    }
}
function setVis() {
    document.getElementById("info-card").style.visibility = "visible"; 
}
function clear_box() {
    document.getElementById("info-card").style.visibility = "hidden";
    $("#company-container").find("#myTable1").empty();
    $("#stock-container").find("#myTable2").empty();
    $("#input").val("");
}
function clearFromStockTab() {
    clear_box();
}
function searchStock() {
    callAPI_companyInfo();
    callAPI_stockSummary();
}
function truncateString(str, maxLength) { 
    if (str.length > maxLength) {
        return str.substr(0, maxLength) + "...";
    } else {
        return str;
    }
}
function truncateDecimal(number) {
    return parseFloat(number.toFixed(2)); // Convert number to fixed-point notation with 2 decimal places and parse it back to float
}