export function getFilterStringFunctionMonitoring(combinedFilter: any, dataIndex: any): string {
  const filter = combinedFilter;
  let name = '';
  let filterString = '';
  filter.forEach(element => {
      if (typeof (element) !== 'object') {
        if (element !== 'and') {
          if (element.columnIndex >= 0) {
            name = dataIndex.filter(d => d.i === element.columnIndex)[0].n;
            filterString += name;
          } else if (element === '=') {
            filterString += '=';
          } else if (element === 'contains') {
            filterString += '=';
          } else if (element === '>=') {
            filterString += '>';
          } else if (element === '<=') {
            filterString += '<';
          } else if (element.indexOf('function') === -1) {
            if (name.indexOf('Date') >= 0) {
              if (isNaN(element)) {
                filterString += element;
              } else {
                const date = new Date(element).getTime();
                filterString += date;
              }
            } else {
              filterString += element;
            }
          }
      } else {
        filterString += '&';
      }
    } else if (typeof (element) === 'object') {
      element.forEach(el => {
        if (el !== 'and') {
          if (el.columnIndex >= 0) {
            name = dataIndex.filter(d => d.i === el.columnIndex)[0].n;
            filterString += name;
          } else if (el === '=') {
            filterString += '=';
          } else if (el === 'contains') {
            filterString += '=';
          } else if (el === '>=') {
            filterString += '>';
          } else if (el === '<=') {
            filterString += '<';
          } else if (el.indexOf('function') === -1) {
            if (name.indexOf('Date') >= 0) {
              if (isNaN(el)) {
                filterString += el;
              } else {
                const date = new Date(el).getTime();
                filterString += date;
              }
            } else {
              filterString += el;
            }
          }
        } else {
          filterString += '&';
        }

      })
    }
  });

return filterString;
}
