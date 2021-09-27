import * as React from 'react';
import Cell from './Cell';
import './DataTable.css';


const setInitialState = settings => {
  const {
    minIndex, maxIndex, startIndex, itemWidth, amount, tolerance
  } = settings; 

  const viewportWidth = amount*itemWidth 
  const totalWidth = (maxIndex - minIndex + 1) * itemWidth 
  const toleranceWidth = tolerance * itemWidth 
  const bufferWidth = viewportWidth + 2 * toleranceWidth 
  const bufferedItems = amount + 2 * tolerance 
  const itemsLeft = startIndex - tolerance - minIndex
  const leftPaddingWidth = itemsLeft * itemWidth 
  const rightPaddingWidth = totalWidth - leftPaddingWidth 
  const initialPosition = leftPaddingWidth + toleranceWidth 
  const begin = 0
  const end = begin+bufferedItems

  return {
    settings,
    viewportWidth, 
    totalWidth,
    toleranceWidth, 
    bufferWidth, 
    bufferedItems, 
    itemsLeft, 
    leftPaddingWidth, 
    rightPaddingWidth, 
    initialPosition,
    begin, 
    end,
  }
}


export default class DataTable extends React.Component {

  constructor(props) {
    super(props); 

    const SETTINGS = {
      itemWidth: 150,
      amount: 10,
      tolerance: 5,
      minIndex: 0,
      maxIndex: 1106,
      startIndex: 0
    };
    
    this.state = setInitialState(SETTINGS);
    this.viewportElement = React.createRef();
  }

  componentDidMount() {
    this.viewportElement.current.scrollLeft = this.state.initialPosition
    if (!this.state.initialPosition) {
      this.runScrolled({ target: {scrollLeft: 0}});
    }
  }

  runScrolled = ({ target: {scrollLeft} }) => {
    
    const {
      totalWidth, 
      toleranceWidth, 
      bufferedItems, 
      settings: {itemWidth, minIndex}
    } = this.state; 

    const index = minIndex+Math.floor((scrollLeft-toleranceWidth)/itemWidth); 
    const begin = Math.max(index, minIndex)
    const end = Math.min(index+bufferedItems, this.state.settings.maxIndex)
    const length = end-begin+1
    const leftPaddingWidth = Math.max((index-minIndex)*itemWidth, 0); 
    const rightPaddingWidth = Math.max(totalWidth - leftPaddingWidth - length * itemWidth, 0);

    this.setState({
      leftPaddingWidth, 
      rightPaddingWidth, 
      begin, 
      end,
    });
  };

  renderHeadingRow = (_cell, cellIndex) => {
    let headings = this.props.headings;
    console.log(this.state.begin)
    console.log(this.state.end)

    let newHeadings = headings.slice(this.state.begin, this.state.end)


    return (
        <Cell
        key={`heading-${cellIndex}`}
        content={newHeadings[cellIndex]}
        header={true}
        />
    )
  };
  
  renderRow = (_row, rowIndex) => {
    let rows = this.props.rows;
    let newRows = []
    for (let i=0; i<rows.length; i++) {
      newRows.push(rows[i].slice(this.state.begin, this.state.end))
    }

    return (
      
      <tr key={`row-${rowIndex}`}>
                  <div style={{width:this.state.leftPaddingWidth}}></div>

        {newRows[rowIndex].map((_cell, cellIndex) => {
          return (
            
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              content={newRows[rowIndex][cellIndex]}
              nullContent={newRows[rowIndex][cellIndex].length===0 ? true: false}

            />
          )
        })}
                  <div style={{width:this.state.leftPaddingWidth}}></div>

      </tr>
    )
  };

  render() {


    let {headings, rows} = this.props;

    console.log('initial')
    console.log(headings)

    this.renderHeadingRow = this.renderHeadingRow.bind(this);
    this.renderRow = this.renderRow.bind(this);

    
    const theadMarkup = (
      <tr key="heading">
        <div style={{width:this.state.leftPaddingWidth}}></div>
        {headings.map(this.renderHeadingRow)}
        <div style={{width:this.state.rightPaddingWidth}}></div>
      </tr>
    );

    const tbodyMarkup = rows.map(this.renderRow);


    return (
        <div
        ref = {this.viewportElement}
        onScroll = {this.runScrolled}
            style={{
              overflow: 'auto',
              width: this.state.viewportWidth,
            }}
        >
          <table className="Table">
            <thead className="Header">{theadMarkup}</thead>
            <tbody>{tbodyMarkup}</tbody>
          </table>

        </div>
    );
  }
}