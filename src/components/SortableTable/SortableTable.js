/* eslint-disable default-case */
import _ from "lodash";
import React, { useEffect, useReducer, useState, useRef } from "react";
import { scroller } from "react-scroll";
import { Table } from "semantic-ui-react";

// import ImgsViewer from "react-images-viewer";
// import im from './1_200.jpeg'
import images from "../../components/Images/Images";

import ImageModal from "../../components/Modal/ImageModal";

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

const SortableTable = ({ tableData, highlight, selectedFromDropdown }) => {
  const [state, dispatch] = useReducer(exampleReducer, {
    column: "matName",
    data: tableData,
    direction: "ascending",
  });

  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    // console.log("tableData");
    // console.log(tableData);
    dispatch({ type: "INIT_COMP", payload: tableData });
  }, [tableData]);

  useEffect(() => {
    setCurrent(highlight);
  }, [highlight]);

  useEffect(() => {
    console.log("selected from dropdown");
    console.log(selectedFromDropdown);
    console.log(tableData);
    // if(selectedFromDropdown.length > 0){
    //   dispatch({ type: "INIT_COMP", payload: tableData.filter(o => !selectedFromDropdown.find(d => d.id == o.id)) });
    // }
  }, [selectedFromDropdown]);

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

  const getImage = (id) => {
    let str = id + "..*";
    let re = new RegExp(str, "g");
    // console.log('str')
    // console.log(images)
    let img = images.find((im) => im.match(re));
    // console.log('found image')
    // console.log(img)
    return img;
  };

  const getColor = (temp) => {
    let code = "";
    switch (temp) {
      case "Glass":
        code = "#3366cc";
        break;
      case "Plastics":
        code = "#ff6600"; //"#78433B";
        break;
      case "Woods":
        code = "#53ac69";
        break;
      case "Paper":
        code = "#ff0066";
        break;
      case "Fabrics":
        code = "#bf00ff";
        break;
      case "Ceramic":
        code = "#990033";
        break;
      default:
        break;
    }
    return code;
  };

  return (
    <div>
      <Table sortable celled fixed striped style={{ fontSize: "0.8em" }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={state.column === "matName" ? state.direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "matName" })
              }
            >
              Material
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={state.column === "category" ? state.direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "category" })
              }
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
              sorted={state.column === "y" ? state.direction : null}
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "y" })}
            >
              {selectedFromDropdown.length > 0
                ? "Predicted Performance"
                : "Performance"}
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                state.column === "transmissionCoe" ? state.direction : null
              }
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
            <Table.HeaderCell>Image</Table.HeaderCell>
            <Table.HeaderCell>Mag 20</Table.HeaderCell>
            <Table.HeaderCell>Mag 200</Table.HeaderCell>
            <Table.HeaderCell>Mag 200 Roughness</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {selectedFromDropdown.length > 0 &&
            selectedFromDropdown.map(
              ({
                id,
                matName,
                category,
                accuracy,
                acc,
                auc,
                transmissionCoe,
                signalEnergy,
                insertionLoss,
                signalToNoice,
                peakToPeakAmp,
                thickness,
              }) => (
                <Table.Row
                  key={id}
                  positive={current == id}
                  className={"row" + id}
                  style={{
                    background: `${getColor(category)}70`,
                  }}
                >
                  <Table.Cell>{matName}</Table.Cell>
                  <Table.Cell>{category}</Table.Cell>
                  <Table.Cell>{acc}</Table.Cell>
                  <Table.Cell>{auc}</Table.Cell>
                  <Table.Cell>{"-"}</Table.Cell>
                  <Table.Cell>{transmissionCoe}</Table.Cell>
                  <Table.Cell>{thickness}</Table.Cell>
                  <Table.Cell>{signalEnergy}</Table.Cell>
                  <Table.Cell>{insertionLoss}</Table.Cell>
                  <Table.Cell>{signalToNoice}</Table.Cell>
                  <Table.Cell>{peakToPeakAmp}</Table.Cell>

                  <Table.Cell>
                    <ImageModal image={getImage('^/static/media/' + id + "_c")} />
                  </Table.Cell>
                  <Table.Cell>
                    <ImageModal image={getImage('^/static/media/' + id + "\\.")} />
                  </Table.Cell>
                  <Table.Cell>
                    <ImageModal image={getImage('^/static/media/' + id + "_200")} />
                  </Table.Cell>
                  <Table.Cell>
                    <ImageModal image={getImage('^/static/media/' + id + "_SR")} />
                  </Table.Cell>
                  {/* <ImgsViewer
                    imgs={[
                      { src: "/static/media/54_c.2ad0dabf.jpeg" },
                      { src: "/static/media/54_c.2ad0dabf.jpeg" },
                      { src: "/static/media/54_c.2ad0dabf.jpeg" },
                      { src: "/static/media/54_c.2ad0dabf.jpeg" },
                    ]}
                  /> */}
                </Table.Row>
              )
            )}

          {state &&
            state.data
              .filter((d) => !selectedFromDropdown.find((o) => o.id == d.id))
              .map(
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
                  y,
                }) => (
                  <Table.Row
                    key={id}
                    positive={current == id}
                    className={"row" + id}
                  >
                    <Table.Cell>{matName}</Table.Cell>
                    <Table.Cell>{category}</Table.Cell>
                    <Table.Cell>
                      {selectedFromDropdown.length > 0 ? "-" : accuracy}
                    </Table.Cell>
                    <Table.Cell>
                      {selectedFromDropdown.length > 0 ? "-" : auc}
                    </Table.Cell>
                    {/* { selectedFromDropdown.length > 0 && <Table.Cell>{y}</Table.Cell>} */}
                    <Table.Cell>{y}</Table.Cell>
                    <Table.Cell>{transmissionCoe}</Table.Cell>
                    <Table.Cell>{thickness}</Table.Cell>
                    <Table.Cell>{signalEnergy}</Table.Cell>
                    <Table.Cell>{insertionLoss}</Table.Cell>
                    <Table.Cell>{signalToNoice}</Table.Cell>
                    <Table.Cell>{peakToPeakAmp}</Table.Cell>

                    <Table.Cell>
                      <ImageModal image={getImage('^/static/media/' + id + "_c")} />
                    </Table.Cell>
                    <Table.Cell>
                      <ImageModal image={getImage('^/static/media/' + id + "\\.")} />
                    </Table.Cell>
                    <Table.Cell>
                      <ImageModal image={getImage('^/static/media/' + id + "_200")} />
                    </Table.Cell>
                    <Table.Cell>
                      <ImageModal image={getImage('^/static/media/' + id + "_SR")} />
                    </Table.Cell>
                    {/* <ImgsViewer
                      imgs={
                        [
                          {
                            src: "/static/media/54_c.2ad0dabf.jpeg",
                            caption: "A forest",
                            // As an array
                            srcSet: [
                              "/static/media/54_c.2ad0dabf.jpeg",
                              "/static/media/54_c.2ad0dabf.jpeg",
                              "/static/media/54_c.2ad0dabf.jpeg",
                              "/static/media/54_c.2ad0dabf.jpeg",
                            ],
                            thumbnail: [
                              "/static/media/54_c.2ad0dabf.jpeg",
                              "/static/media/54_c.2ad0dabf.jpeg",
                              "/static/media/54_c.2ad0dabf.jpeg",
                              "/static/media/54_c.2ad0dabf.jpeg",
                            ],
                          },
                          {
                            src: "/static/media/54_c.2ad0dabf.jpeg",
                            // As a string
                            srcSet:
                              "/static/media/54_c.2ad0dabf.jpeg, /static/media/54_c.2ad0dabf.jpeg, /static/media/54_c.2ad0dabf.jpeg, /static/media/54_c.2ad0dabf.jpeg, /static/media/54_c.2ad0dabf.jpeg",
                          },
                        ]
                        //   [
                        //   { src:'/static/media/54_c.2ad0dabf.jpeg'},
                        //   { src:'/static/media/54_c.2ad0dabf.jpeg'},
                        //   { src:'/static/media/54_c.2ad0dabf.jpeg'},
                        //   { src:'/static/media/54_c.2ad0dabf.jpeg'},
                        // ]
                      }
                      currImg={0}
                      isOpen={false}
                      showThumbnails
                    /> */}
                  </Table.Row>
                )
              )}
          {/* <Table.Row ><Table.Cell>hi</Table.Cell></Table.Row> */}
        </Table.Body>
      </Table>
    </div>
  );
};

export default SortableTable;
