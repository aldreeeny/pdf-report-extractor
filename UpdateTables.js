const updateArea1 = () => {

  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AREA 1 LINKS");
  let sheetData = sheet.getDataRange().getValues();
  sheetData.shift();
  sheetData.forEach((row) => {
    let testData = {folderId: row[0], sheetname: "AREA 2 All DATA"}
    refreshSheet1Data(testData);
    testData = {folderId: row[1], sheetname: "AREA 2 All DATA"}
    refreshSheet2Data(testData);
  });
  getWageData("AREA 1");
}

const updateArea2 = () => {

  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AREA 2 LINKS");
  let sheetData = sheet.getDataRange().getValues();
  sheetData.shift();
  sheetData.forEach((row) => {
    let testData = {folderId: row[0], sheetname: "AREA 2 All DATA"}
    refreshSheet1Data(testData);
    testData = {folderId: row[1], sheetname: "AREA 2 All DATA"}
    refreshSheet2Data(testData);
  });
  getWageData("AREA 2");
}

const updateArea3 = () => {

  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AREA 3 LINKS");
  let sheetData = sheet.getDataRange().getValues();
  sheetData.shift();
  sheetData.forEach((row) => {
    
    let testData = {folderId: row[0], sheetname: "AREA 3 All DATA"}
    refreshSheet1Data(testData);
    testData = {folderId: row[1], sheetname: "AREA 3 All DATA"}
    refreshSheet2Data(testData);
  });
  getWageData("AREA 3");
}

const updateArea4 = () => {

  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AREA 4 LINKS");
  let sheetData = sheet.getDataRange().getValues();
  sheetData.shift();
  sheetData.forEach((row) => {
    let testData = {folderId: row[0], sheetname: "AREA 4 All DATA"}
    refreshSheet1Data(testData);
    testData = {folderId: row[1], sheetname: "AREA 4 All DATA"}
    refreshSheet2Data(testData);
  });
  getWageData("AREA 4");
}

const updateArea5 = () => {

  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AREA 5 LINKS");
  let sheetData = sheet.getDataRange().getValues();
  sheetData.shift();
  sheetData.forEach((row) => {
    let testData = {folderId: row[0], sheetname: "AREA 5 All DATA"}
    refreshSheet1Data(testData);
    testData = {folderId: row[1], sheetname: "AREA 6 All DATA"}
    refreshSheet2Data(testData);
  });
  getWageData("AREA 5");
}
