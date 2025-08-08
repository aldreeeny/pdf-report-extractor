function refreshSheet1Data(tableData){
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  //Get all PDF files:
  if(tableData.folderId == "") {
    return;
  }
  const folder = DriveApp.getFolderById(tableData.folderId);

  const files = folder.getFilesByType("application/pdf");
  let sheetData = ss.getSheetByName(tableData.sheetname).getDataRange().getValues();
  sheetData.shift();
  
  //Iterate through each folder
  while(files.hasNext()){
    let file = files.next();
    let fileID = file.getId();
    const doc = getTextFromPDF(fileID);
    let date = getDateFromName(doc.name);

    let sheetRow = sheetData.findIndex(row => isSameDate(row[0], date)

    );
    Logger.log("Test");
    Logger.log(sheetData[sheetRow]);
    Logger.log(date.toString());
    let custcount = 0;
    let refund = 0;
    let netCash = 0;
    let arrText = doc.text.split("\n");

    let custIndex = arrText.findIndex(row => {
      if(row.match(/Customers Item Count/)) {
        return true;
      } else { return false; }
    });
    if(custIndex != -1) {
      let custHold = arrText[custIndex+1].split(" ");
      custcount = custHold[0];
    }
    
    let refundIndex = arrText.findIndex(row => {
      if(row.match(/Paid Out Cash Out Returns /)) {
        return true;
      } else { return false; }
    });
    if(refundIndex != -1) {
      let refundHold = arrText[refundIndex+1].split(" ");
      refund = refundHold[5];
    }
    
    let netCashIndex = arrText.findIndex(row => {
      if(row.match(/Net Tender Totals:/)) {
        return true;
      } else { return false; }
    });
    if(netCashIndex != -1) {
      let netHold = arrText[netCashIndex].split(" ");
      netCash = netHold[9];
    }
    if(sheetRow == -1){
      let arrHold = [
        date,
        custcount,
        refund,
        netCash,
        "",
        "",
        "",
        ""
      ];
      sheetData.push(arrHold);

    } else {

      sheetData[sheetRow][1] = custcount;
      sheetData[sheetRow][2] = refund;
      sheetData[sheetRow][3] = netCash;
    }
    Logger.log(sheetData[sheetRow]);
  }

    importToSpreadsheet(sheetData, tableData.sheetname);
};

function refreshSheet2Data(tableData){
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  //Get all PDF files:
  if(tableData.folderId == "") {
    return;
  }
  const folder = DriveApp.getFolderById(tableData.folderId);

  const files = folder.getFilesByType("application/pdf");
  let sheetData = ss.getSheetByName(tableData.sheetname).getDataRange().getValues();
  sheetData.shift();

  //Iterate through each folder
  while(files.hasNext()){
    let file = files.next();
    let fileID = file.getId();
    const doc = getTextFromPDF(fileID);
    let arrText = doc.text.split("\n");
    let date = getDateFromName(doc.name);

    let sheetRow = sheetData.findIndex(row => isSameDate(row[0], date)

    );

    // variables for table data
    let totalSales = 0;
    let totalProfit = 0;
    let beer = 0;
    let wine = 0;
    let spirits = 0;
    let cigs = 0;
    let totalIndex = arrText.findIndex(row => {
      if(row.match(/Totals/)) {
        return true;
      } else { return false; }
    });
    if(totalIndex != -1){
      let totalArr = arrText[totalIndex].split(" ");
      let totalIndex2 = totalArr.findIndex(row => {
        if(row.match(/Totals/)) {
          return true;
        } else { return false; }
      });
      if(totalIndex2 != -1) {
        totalSales = totalArr[totalIndex2+2];
        totalProfit = totalArr[totalIndex2+5];
      }
    }

    let beerIndex = arrText.findIndex(row => {
      if(row.match(/BEER/)) {
        return true;
      } else { return false; }
    });
    if(beerIndex != -1) {
      let beerArr = arrText[beerIndex].split(" ");
      let beerIndex2 = beerArr.findIndex(row => {
        if(row.match(/BEER/)) {
          return true;
        } else { return false; }
      });
      if(beerIndex2 != -1) {
        beer = beerArr[beerIndex2+3];
        beer = beer.replace(/,/g, "");
      }
    }

    let wineIndex = arrText.findIndex(row => {
      if(row.match(/WINE/)) {
        return true;
      } else { return false; }
    });
    if(wineIndex != -1) {
      let wineArr = arrText[wineIndex].split(" ");
      let wineIndex2 = wineArr.findIndex(row => {
        if(row.match(/WINE/)) {
          return true;
        } else { return false; }
      });
      if(wineIndex2 != -1) {
        wine = wineArr[wineIndex2+3];
        wine = wine.replace(/,/g, "");
      }
    }

    let spiritsIndex = arrText.findIndex(row => {
      if(row.match(/SPIRITS/)) {
        return true;
      } else { return false; }
    });
    if(spiritsIndex != -1) {
      let spiritsArr = arrText[spiritsIndex].split(" ");
      let spiritsIndex2 = spiritsArr.findIndex(row => {
        if(row.match(/SPIRITS/)) {
          return true;
        } else { return false; }
      });
      if(spiritsIndex2 != -1) {
        spirits = spiritsArr[spiritsIndex2+3];
        spirits = spirits.replace(/,/g, "");
      }
    }
    
    let cigsIndex = arrText.findIndex(row => {
      if(row.match(/CIGS & TABACCO/)) {
        return true;
      } else { return false; }
    });
    if(cigsIndex != -1) {
      let cigsArr = arrText[cigsIndex].split(" ");
      let cigsIndex2 = cigsArr.findIndex(row => {
        if(row.match(/CIGS/)) {
          return true;
        } else { return false; }
      });
      if(cigsIndex2 != -1) {
        cigs = cigsArr[cigsIndex2+5];
        cigs = cigs.replace(/,/g, "");
      }
    }
    
    let bwst = parseFloat(beer)+ parseFloat(wine) + parseFloat(spirits) + parseFloat(cigs);

    if(sheetRow == -1){
      let arrHold = [
        date,
        "",
        "",
        "",
        totalSales,
        totalProfit,
        bwst,
        ""
      ];
      sheetData.push(arrHold);
    } else {
      sheetData[sheetRow][4] = totalSales;
      sheetData[sheetRow][5] = totalProfit;
      sheetData[sheetRow][6] = bwst;
    }
    
  }

    importToSpreadsheet(sheetData, tableData.sheetname);
};

function getTextFromPDF(fileID) {
  var blob = DriveApp.getFileById(fileID).getBlob()
  var resource = {
    title: blob.getName(),
    mimeType: blob.getContentType()
  };
  var options = {
    ocr: true, 
    ocrLanguage: "en"
  };
  // Convert the pdf to a Google Doc with ocr.
  var file = Drive.Files.insert(resource, blob, options);

  // Get the texts from the newly created text.
  var doc = DocumentApp.openById(file.id);
  var text = doc.getBody().getText();
  var title = doc.getName();

  // Deleted the document once the text has been stored.
  Drive.Files.remove(doc.getId());
  
  return {
    name:title,
    text:text
  };
}

