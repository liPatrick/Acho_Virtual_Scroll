
import React, {} from 'react'

import DataTable from "./DataTable";
import './DataTable.css';


class VirtualScroll extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            data: [],
            headings: [],
            settings: {
                itemWidth: 150,
                amount: 7,
                tolerance: 5,
                minIndex: 0,
                maxIndex: 0,
                startIndex: 0
              }
        })
        
    }

    processData = () => {        
        let myData = Array.from(this.props.csvData).slice(0,51)
        var newData = [] 
        for (let i=0; i<myData.length; i++) {
            let row = myData[i];
            newData.push(row.data)
        }

        this.setState({
            headings: newData[0],
            data: newData.slice(1),
            settings: {
                itemWidth: 150, 
                amount: 7, 
                tolerance: 5, 
                minIndex: 0,
                maxIndex: newData[0].length-1, 
                startIndex: 0, 
            }
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.csvData !== this.props.csvData) {
            this.processData()
        }
    }

    render() {
        return (
            <DataTable headings={this.state.headings} rows={this.state.data} settings={this.state.settings}/>
        );
    }
}

export default VirtualScroll;