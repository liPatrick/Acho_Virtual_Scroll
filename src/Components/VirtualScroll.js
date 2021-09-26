
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
            sampleData: [['1', '2' ,'3'], ['1', '2', '3']]
        })

    }

    processData = () => {

        console.log('process data')
        
        let myData = Array.from(this.props.csvData).slice(0,51)
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
        console.log(newData)

    }

    componentDidUpdate(prevProps) {
        if (prevProps.csvData !== this.props.csvData) {
            this.processData()
        }
    }

    

    render() {

        
        
        return (
            <div>
                <DataTable headings={this.state.headings} rows={this.state.data}/>
            </div>
        );
    }

    

}



export default VirtualScroll;