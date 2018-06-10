import { SortChangedEvent } from 'ag-grid';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';

interface ICoverStates {
    columnDefs: any;
    rowData: any;
    sortState: string;
}

class Cover extends React.Component<any,ICoverStates> {

    constructor(props: any) {
        super(props);

        this.state = {
            columnDefs: [
                {headerName: "Make", field: "make", headerTooltip: 'none' },
                {headerName: "Model", field: "model"},
                {headerName: "Price", field: "price"}

            ],
            rowData: [
                {make: "Toyota", model: "Celica", price: 35000},
                {make: "Ford", model: "Mondeo", price: 32000},
                {make: "Porsche", model: "Boxter", price: 72000}
            ],
            sortState: 'none'
        }
    }

    public sortChanged = (params: SortChangedEvent) => {
        const gridApi = params.api; 
        const sortState = gridApi.getSortModel();
        console.log('sortChange', sortState);
        if (sortState.length === 0) {
            console.log("No sort active");
            this.headerTooltip([{colId: 'make', sort: 'none'}], gridApi);
        } else {
            // this.setState({sortState: sortState[0].sort});
            this.headerTooltip(sortState, gridApi);
        }
    }

    public headerTooltip = (sortState: any, gridApi: any) => {
        const newColumnDefs = this.state.columnDefs;
        const objIndex = newColumnDefs.findIndex(((obj:any) => obj.field === sortState[0].colId));
        
        console.log('headerTooltip', objIndex);

        newColumnDefs[objIndex].headerTooltip = sortState[0].sort;
        console.log('headerTooltip', newColumnDefs);

        this.setState({ columnDefs: newColumnDefs });
    }

    public render () {
        return (
            <div
                className="ag-theme-balham"
                style={{
                    height: '500px',
                    width: '600px'
                }}
            >
                {this.state.columnDefs[0].headerTooltip}
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData} 
                    enableSorting={true}
                    onSortChanged={this.sortChanged}
                />
            </div>

        )
    }
}

export { Cover };