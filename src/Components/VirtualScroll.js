
import React, {} from 'react'

import DataTable from "./DataTable";
import './DataTable.css';


class VirtualScroll extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            data: [],
            headings: [],
            rows: 0, 
            cols: 0, 
        })

    }

    processData = () => {

        console.log('process data')
        
        let myData = Array.from(this.props.csvData).slice(0,11)
        var newData = [] 
        
        for (let i=0; i<myData.length; i++) {
            let row = myData[i];
            newData.push(row.data)
        }

        let rows = myData.length 
        let cols = myData[0].data.length

        this.setState({
            headings: newData[0],
            data: newData.slice(1),
            rows: rows, 
            cols: cols, 
        })

    }

    componentDidUpdate(prevProps) {
        if (prevProps.csvData !== this.props.csvData) {
            this.processData()
        }
    }

    render() {
        return (
            <DataTable headings={this.state.headings} rows={this.state.data}/>
        );
    }
}

export default VirtualScroll;