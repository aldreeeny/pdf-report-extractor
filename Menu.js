const onOpen = () => {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'AREA 1', functionName: 'updateArea1'},
    {name: 'AREA 2', functionName: 'updateArea2'},
    {name: 'AREA 3', functionName: 'updateArea3'},
    {name: 'AREA 4', functionName: 'updateArea4'},
    {name: 'AREA 5', functionName: 'updateArea5'}
  ];
  spreadsheet.addMenu('Update Tables', menuItems);
}