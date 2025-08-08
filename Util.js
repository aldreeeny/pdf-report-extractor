const getDateFromName = (name) => {
  let nameHold = name.split(".");
  let date = new Date();
  nameHold[0] = nameHold[0].replace( /-/g, "" );
  Logger.log(nameHold[0]);
  let monthHold = nameHold[0].charAt(2)+nameHold[0].charAt(3);
  let dayHold = nameHold[0].charAt(0)+nameHold[0].charAt(1);
  let yearHold = nameHold[0].charAt(4)+nameHold[0].charAt(5)+nameHold[0].charAt(6)+nameHold[0].charAt(7);

  date = new Date(monthHold+"-"+dayHold+"-"+yearHold);
  return date;
}

function importToSpreadsheet(data, sheetname){
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetname);
  let sheetData = sheet.getDataRange().getValues();
  sheetData.shift();
  let writeData = [...data];
  sheet.getRange(2,1,writeData.length,writeData[0].length).setValues(writeData);
  sheet.getRange(2,1,writeData.length,writeData[0].length).sort({
    column: 1,
    ascending: true,
  });
}

const getWageData = (sheetName) => {
  let sheet1Name = "";
  let sheet2Name = "";
  let sheetLink = "";

  switch (sheetName) {
    case "AREA 1": {
      sheet1Name = "AREA 1 All DATA";
      sheetLink = "YOUR_GOOGLE_SPREADSHEET_ID_HERE";
      sheet2Name = "";
      break;
    }
    case "AREA 2": {
      sheet1Name = "AREA 2 All DATA";
      sheetLink = "YOUR_GOOGLE_SPREADSHEET_ID_HERE";
      sheet2Name = "";
      break;
    }
    case "AREA 3": {
      sheet1Name = "AREA 3 All DATA";
      sheetLink = "YOUR_GOOGLE_SPREADSHEET_ID_HERE";
      sheet2Name = "";
      break;
    }
    case "AREA 4": {
      sheet1Name = "AREA 4 All DATA";
      sheetLink = "YOUR_GOOGLE_SPREADSHEET_ID_HERE";
      sheet2Name = "";
      break;
    }
    case "AREA 5": {
      sheet1Name = "AREA 5 All DATA";
      sheetLink = "YOUR_GOOGLE_SPREADSHEET_ID_HERE";
      sheet2Name = "";
      break;
    }
  }

  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet1Name);
  let sheetData = sheet.getDataRange().getValues();
  sheetData.shift();
  Logger.log(sheet1Name);
  
  let sheet2 = SpreadsheetApp.openById(sheetLink).getSheetByName("Sheet1");
  let wageData = sheet2.getDataRange().getValues();
  wageData.shift();
  Logger.log(wageData);
  wageData.forEach(row => {
    if(row[0] != "Totals") {
      let index = sheetData.findIndex(row2 => isSameDate(row[0], row2[0]));
      if(index != -1) {
        sheetData[index][7] = row[2]; 
      }
    }
  });
  importToSpreadsheet(sheetData, sheet1Name);
}

const isSameDate = (d1, d2) => {
  let date1 = new Date(d1);
  let date2 = new Date(d2);

  if(date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear() && date1.getDate() == date2.getDate()) 
  { return true; } else { return false; }
}