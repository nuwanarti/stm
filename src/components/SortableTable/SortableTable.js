/* eslint-disable default-case */
import _ from "lodash";
import React, { useEffect, useReducer, useState, useRef } from "react";
import { scroller } from "react-scroll";
import { Table } from "semantic-ui-react";
import im from './1_200.jpeg'

// const tableData = [
//   { matName: 'abc', accuracy: 0.96, auc: .017 },
//   { matName: 'def', accuracy: 0.56, auc: .047 },
//   { matName: 'tkl', accuracy: 0.76, auc: .070 },
//   { matName: 'ghi', accuracy: 0.16, auc: .076 },
// ]

function exampleReducer(state, action) {
  switch (action.type) {
    case "INIT_COMP":
      return { ...state, data: action.payload };
    case "CHANGE_SORT":
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: "ascending",
      };
    default:
      throw new Error();
  }
}



const SortableTable = ({ tableData, highlight }) => {
  const [state, dispatch] = useReducer(exampleReducer, {
    column: "matName",
    data: tableData,
    direction: "ascending",
  });

  const [ current, setCurrent] = useState(-1)

  useEffect(() => {
    console.log("tableData");
    console.log(tableData);
    dispatch({ type: "INIT_COMP", payload: tableData });

  }, [tableData]);

  useEffect(() => {
      
    setCurrent(highlight)
  }, [highlight])

  // eslint-disable-next-line no-mixed-operators
//   const myRef = useRef(null)

//   const scrollToSection = (id) => {
//     scroller.scrollTo("row" + id, {
//       duration: 800,
//       delay: 0,
//       smooth: "easeInOutQuart",
//     });
//   };

//   useMountEffect(handleClick); // Scroll on mount

  return (
    <Table sortable celled fixed striped style={{ fontSize: '0.8em' }}>
      <Table.Header>
        <Table.Row>
        <Table.HeaderCell colSpan={2}
            sorted={state.column === "matName" ? state.direction : null}
            onClick={() => dispatch({ type: "CHANGE_SORT", column: "matName" })}
          >
            Material
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={state.column === "category" ? state.direction : null}
            onClick={() => dispatch({ type: "CHANGE_SORT", column: "category" })}
          >
            Category
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={state.column === "accuracy" ? state.direction : null}
            onClick={() =>
              dispatch({ type: "CHANGE_SORT", column: "accuracy" })
            }
          >
            Accuracy
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={state.column === "auc" ? state.direction : null}
            onClick={() => dispatch({ type: "CHANGE_SORT", column: "auc" })}
          >
            AUC
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={state.column === "transmissionCoe" ? state.direction : null}
            onClick={() =>
              dispatch({ type: "CHANGE_SORT", column: "transmissionCoe" })
            }
          >
            T/C
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={state.column === "thickness" ? state.direction : null}
            onClick={() =>
              dispatch({ type: "CHANGE_SORT", column: "thickness" })
            }
          >
            Thickness
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={state.column === "signalEnergy" ? state.direction : null}
            onClick={() =>
              dispatch({ type: "CHANGE_SORT", column: "signalEnergy" })
            }
          >
            Signal Energy
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={state.column === "insertionLoss" ? state.direction : null}
            onClick={() =>
              dispatch({ type: "CHANGE_SORT", column: "insertionLoss" })
            }
          >
            Insertion Loss
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={state.column === "signalToNoice" ? state.direction : null}
            onClick={() =>
              dispatch({ type: "CHANGE_SORT", column: "signalToNoice" })
            }
          >
            Signal To Noice
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={state.column === "peakToPeakAmp" ? state.direction : null}
            onClick={() =>
              dispatch({ type: "CHANGE_SORT", column: "peakToPeakAmp" })
            }
          >
            Peak To Peak Amp
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {state &&
          state.data.map(
            ({
              id,
              matName,
              category,
              accuracy,
              auc,
              transmissionCoe,
              signalEnergy,
              insertionLoss,
              signalToNoice,
              peakToPeakAmp,
              thickness,
            }) => (
              <Table.Row key={id} className={'row' + id} style={{ background: current==id?'#3cbfc8': '#fff'}}>
                <Table.Cell colSpan={2}>{matName}</Table.Cell>
                <Table.Cell>{category}</Table.Cell>
                <Table.Cell>{accuracy}</Table.Cell>
                <Table.Cell>{auc}</Table.Cell>
                <Table.Cell>{transmissionCoe}</Table.Cell>
                <Table.Cell>{thickness}</Table.Cell>
                <Table.Cell>{signalEnergy}</Table.Cell>
                <Table.Cell>{insertionLoss}</Table.Cell>
                <Table.Cell>{signalToNoice}</Table.Cell>
                <Table.Cell>{peakToPeakAmp}</Table.Cell>
                <Table.Cell><img src={im} alt="logo" width="100px" heigh="100px"/></Table.Cell>
              </Table.Row>
            )
          )}
          {/* <Table.Row ><Table.Cell>hi</Table.Cell></Table.Row> */}
      </Table.Body>
    </Table>
  );
};

export default SortableTable;




// /* eslint-disable default-case */
// import _ from "lodash";
// import React, {
//   Component,
//   useEffect,
//   useReducer,
//   useState,
//   useRef,
// } from "react";
// import { render } from "react-dom";
// import { Table } from "semantic-ui-react";

// // const tableData = [
// //   { matName: 'abc', accuracy: 0.96, auc: .017 },
// //   { matName: 'def', accuracy: 0.56, auc: .047 },
// //   { matName: 'tkl', accuracy: 0.76, auc: .070 },
// //   { matName: 'ghi', accuracy: 0.16, auc: .076 },
// // ]

// function exampleReducer(state, action) {
//   switch (action.type) {
//     case "INIT_COMP":
//       return { ...state, data: action.payload };
//     case "CHANGE_SORT":
//       if (state.column === action.column) {
//         return {
//           ...state,
//           data: state.data.slice().reverse(),
//           direction:
//             state.direction === "ascending" ? "descending" : "ascending",
//         };
//       }

//       return {
//         column: action.column,
//         data: _.sortBy(state.data, [action.column]),
//         direction: "ascending",
//       };
//     default:
//       throw new Error();
//   }
// }

// class SortableTable extends Component {
//   constructor(props) {
//     super(props);
//     // tableData
//     this.state = {
//       dispatch: useReducer(exampleReducer, {
//         column: "matName",
//         data: props.tableData,
//         direction: "ascending",
//       }),
//     };
//   }
//   //   const [state, dispatch] = useReducer(exampleReducer, {
//   //     column: "matName",
//   //     data: tableData,
//   //     direction: "ascending",
//   //   });

//   componentDidMount() {
//     // dispatch({ type: "INIT_COMP", payload: tableData });
//   }

//   static getDerivedStateFromProps(props, state) {
//     //   table
//     if (props.tableData !== state.tableData) {
//       this.state.dispatch({ type: "INIT_COMP", payload: state.tableData });
//     }
//     // Return null to indicate no change to state.
//     return null;
//   }

//   //   useEffect(() => {
//   //     console.log("tableData");
//   //     console.log(tableData);
//   //     dispatch({ type: "INIT_COMP", payload: tableData });

//   //   }, [tableData]);

//   // eslint-disable-next-line no-mixed-operators
//   //   const myRef = useRef(null)

//   //   const executeScroll = () => {

//   //     myRef.current.focus()

//   //   }
//   //   useMountEffect(handleClick); // Scroll on mount

//   render() {
//     return (
//       <Table sortable celled fixed>
//         <Table.Header>
//           <Table.Row>
//             <Table.HeaderCell
//               sorted={
//                 this.state.column === "matName" ? this.state.direction : null
//               }
//               onClick={() =>
//                 this.state.dispatch({ type: "CHANGE_SORT", column: "matName" })
//               }
//             >
//               Material Name
//             </Table.HeaderCell>
//             <Table.HeaderCell
//               sorted={
//                 this.state.column === "accuracy" ? this.state.direction : null
//               }
//               onClick={() =>
//                 this.state.dispatch({ type: "CHANGE_SORT", column: "accuracy" })
//               }
//             >
//               Accuracy
//             </Table.HeaderCell>
//             <Table.HeaderCell
//               sorted={this.state.column === "auc" ? this.state.direction : null}
//               onClick={() =>
//                 this.state.dispatch({ type: "CHANGE_SORT", column: "auc" })
//               }
//             >
//               AUC
//             </Table.HeaderCell>
//             <Table.HeaderCell
//               sorted={
//                 this.state.column === "transmissionCoe"
//                   ? this.state.direction
//                   : null
//               }
//               onClick={() =>
//                 this.state.dispatch({
//                   type: "CHANGE_SORT",
//                   column: "transmissionCoe",
//                 })
//               }
//             >
//               T/C
//             </Table.HeaderCell>
//             <Table.HeaderCell
//               sorted={
//                 this.state.column === "thickness" ? this.state.direction : null
//               }
//               onClick={() =>
//                 this.state.dispatch({
//                   type: "CHANGE_SORT",
//                   column: "thickness",
//                 })
//               }
//             >
//               Thickness
//             </Table.HeaderCell>
//             <Table.HeaderCell
//               sorted={
//                 this.state.column === "signalEnergy"
//                   ? this.state.direction
//                   : null
//               }
//               onClick={() =>
//                 this.state.dispatch({
//                   type: "CHANGE_SORT",
//                   column: "signalEnergy",
//                 })
//               }
//             >
//               Signal Energy
//             </Table.HeaderCell>
//             <Table.HeaderCell
//               sorted={
//                 this.state.column === "insertionLoss"
//                   ? this.state.direction
//                   : null
//               }
//               onClick={() =>
//                 this.state.dispatch({
//                   type: "CHANGE_SORT",
//                   column: "insertionLoss",
//                 })
//               }
//             >
//               Insertion Loss
//             </Table.HeaderCell>
//             <Table.HeaderCell
//               sorted={
//                 this.state.column === "signalToNoice"
//                   ? this.state.direction
//                   : null
//               }
//               onClick={() =>
//                 this.state.dispatch({
//                   type: "CHANGE_SORT",
//                   column: "signalToNoice",
//                 })
//               }
//             >
//               AUC
//             </Table.HeaderCell>
//             <Table.HeaderCell
//               sorted={
//                 this.state.column === "peakToPeakAmp"
//                   ? this.state.direction
//                   : null
//               }
//               onClick={() =>
//                 this.state.dispatch({
//                   type: "CHANGE_SORT",
//                   column: "peakToPeakAmp",
//                 })
//               }
//             >
//               Peak To Peak Amp
//             </Table.HeaderCell>
//           </Table.Row>
//         </Table.Header>
//         <Table.Body>
//           {this.state &&
//             this.state.data.map(
//               ({
//                 id,
//                 matName,
//                 accuracy,
//                 auc,
//                 transmissionCoe,
//                 signalEnergy,
//                 insertionLoss,
//                 signalToNoice,
//                 peakToPeakAmp,
//                 thickness,
//               }) => (
//                 <Table.Row key={id} id={id}>
//                   <Table.Cell>{matName}</Table.Cell>
//                   <Table.Cell>{accuracy}</Table.Cell>
//                   <Table.Cell>{auc}</Table.Cell>
//                   <Table.Cell>{transmissionCoe}</Table.Cell>
//                   <Table.Cell>{thickness}</Table.Cell>
//                   <Table.Cell>{signalEnergy}</Table.Cell>
//                   <Table.Cell>{insertionLoss}</Table.Cell>
//                   <Table.Cell>{signalToNoice}</Table.Cell>
//                   <Table.Cell>{peakToPeakAmp}</Table.Cell>
//                 </Table.Row>
//               )
//             )}
//           <Table.Row>
//             <Table.Cell>hi</Table.Cell>
//           </Table.Row>
//         </Table.Body>
//       </Table>
//     );
//   }
// }

// export default SortableTable;
