import React, { Component } from 'react';
import { Page, DataTable, Card, Link } from '@shopify/polaris';

export default class ConversionsTable extends Component {
  state = {
    sortedRows: null,
  };


  sortCurrency = (rows, index, direction) => {
    return [...rows].sort((a, b) => {
      return direction === 'descending'
        ? a[index].toString().localeCompare(b[index].toString(), undefined, { numeric: true, sensitivity: 'base' })
        : b[index].toString().localeCompare(a[index].toString(), undefined, { numeric: true, sensitivity: 'base' });
    });
  };

  handleSort = (rows) => (index, direction) => {
    this.setState({ sortedRows: this.sortCurrency(rows, index, direction) });
  };

  render() {
    const { sortedRows } = this.state;
    const initiallySortedRows = [
      ['Milk', 350, 'ml', 'R123.42', 'Fruit & Veg', 'Dairy', 'Fridge', '1200ml', '10000ml', '1400ml', 'R512.10', 'Click', '2018/04/18'],
      ['Coffee', 1200, 'ml', 'R123.42', 'Fruit & Veg', 'Dry Goods', 'Bar', '1200ml', '10000ml', '1400ml', 'R512.10', 'Click', '2018/04/18'],
      ['Bread', 500, 'g', 'R123.42', 'Fruit & Veg', 'Fresh Produce', 'Kitchen', '1200ml', '10000ml', '1400ml', 'R512.10', 'Click', '2018/04/18'],
      ['Bread', 500, 'g', 'R123.42', 'Fruit & Veg', 'Dairy', 'Fridge', '1200ml', '10000ml', '1400ml', 'R512.10', 'Click', '2018/04/18'],
      ['Bread', 500, 'g', 'R123.42', 'Fruit & Veg', 'Dairy', 'Fridge', '1200ml', '10000ml', '1400ml', 'R512.10',
        <Link url="https://www.example.com">Click</Link>, '2018/04/13'],
    ];
    const rows = sortedRows ? sortedRows : initiallySortedRows;

    return (

      <DataTable
        columnContentTypes={[
          'text',
          'numeric',
          'text',
          'text',
          'text',
          'text',
          'text',
          'numeric',
          'numeric',
          'numeric',
          'numeric',
          'numeric',
          'numeric',
        ]}
        headings={[
          'Name',
          'Size',
          'Unit',
          'Price',
          'Supplier',
          'Category',
          'Storage',
          'Min Par',
          'Max Par',
          'Amount on hand',
          'Value on hand',
          'Order History',
          'Date Updated'
        ]}
        rows={rows}
        sortable={[false, true, false, true, true, true, true, true, true, true, true, false, true]}
        defaultSortDirection="descending"
        initialSortColumnIndex={0}
        onSort={this.handleSort(rows)}
      />

    );
  }
}
