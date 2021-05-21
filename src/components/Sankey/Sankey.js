import React, { useEffect, useState } from "react";
import { ResponsiveSankey } from "@nivo/sankey";
import { render } from "react-dom";
import { Button } from "semantic-ui-react";
// import { random } from 'faker';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveSankey = ({ /*data, */ sankeyData, filterScatterData }) => {
  const [data, setData] = useState([]);
  const [sankyInput, setSankyInput] = useState(null);
  const [btn, enable] = useState(false);

  const [params, setParams] = useState([]);

  const getCategories = (d) => {
    let temp = [];
    d.forEach((o) => {
      temp.push(o.category);
    });
    return [...new Set(temp)];
  };

  const getPerf = (d) => {
    let temp = [];
    d.forEach((o) => {
      temp.push(
        o.acc
          ? getTarget((o.acc + o.auc) / 2)
          : getTarget((o.accuracy + o.auc) / 2)
      );
    });

    return [...new Set(temp)];
  };

  const getSizes = (d) => {
    let temp = [];
    d.forEach((o) => {
      temp.push(getThicknessTarget(o.thickness));
    });
    return [...new Set(temp)];
  };

  const adjustParams = (temp) => {
    let tempCat = getCategories(temp);
    let tempPerf = getPerf(temp);
    let tempSizes = getSizes(temp);

    setParams([...tempCat, ...tempPerf, ...tempSizes]);

    // let tempCat = getCategories(data);
    // let tempPerf = getPerf(data);
    // let tempSizes = getSizes(data);

    // setParams([...tempCat, ...tempPerf, ...tempSizes]);


  };

  useEffect(() => {
    // console.log('sankey effect')
    // console.log(sankeyData)

    if (sankeyData.length > 0) {
      setData(sankeyData);
      // console.log("sankeydata");
      // console.log(sankeyData);
    }

    // setSankyInput({
    //   nodes: [],
    //   links: []
    // })
    // prepareData()
    // }
  }, [sankeyData]);

  const genNodes = () => {
    let temp = [
      {
        id: "Glass",
        color: "hsl(220, 60%, 50%)",
      },
      {
        id: "Plastics",
        color: "hsl(30, 100%, 50%)",
      },
      {
        id: "Woods",
        color: "hsl(135, 35%, 50%)",
      },
      {
        id: "Paper",
        color: "hsl(336, 100%, 50%)",
      },
      {
        id: "Fabrics",
        color: "hsl(285, 100%, 50%)",
      },
      {
        id: "Ceramic",
        color: "hsl(340, 100%, 30%)",
      },
      {
        id: "GOOD",
        color: "hsl(107, 70%, 50%)",
      },
      {
        id: "MEDIUM",
        color: "hsl(405, 70%, 50%)",
      },
      {
        id: "BAD",
        color: "hsl(698, 70%, 50%)",
      },
      {
        id: "0-10mm",
        color: "hsl(180, 90%, 50%)",
      },
      {
        id: "10-20mm",
        color: "hsl(210, 90%, 50%)",
      },
      {
        id: "20-30mm",
        color: "hsl(30, 90%, 50%)",
      },
      {
        id: "30-40mm",
        color: "hsl(120, 35%, 50%)",
      },
    ];

    const filtered = temp.filter((o) => params.find((obj) => obj == o.id));
    // console.log("filtered");
    // console.log(filtered);
    // console.log("params");
    // console.log(params);
    return filtered.length > 0 ? filtered : temp;
    // return ;
  };

  const getTarget = (temp) => {
    if (temp >= 85 && temp <= 100) {
      return "GOOD";
    } else if (temp < 85 && temp >= 70) {
      return "MEDIUM";
    } else {
      // console.log('quality')
      // console.log(temp)
      return "BAD";
    }
  };

  const getThicknessTarget = (temp) => {
    if (temp >= 0 && temp < 10) {
      return "0-10mm";
    } else if (temp >= 10 && temp < 20) {
      return "10-20mm";
    } else if (temp >= 20 && temp < 30) {
      return "20-30mm";
    } else {
      // console.log('thickness ')
      // console.log(temp)
      return "30-40mm";
    }
  };

  const genLinks = () => {
    // store objects { source: 'cat', target: ''}
    const rel = data.map((o) => {
      // console.log('nan')
      // if(isNaN(o.accuracy) || isNaN(o.auc)){
      //   console.log(o)
      // }
      let temp = {
        source: o.category,
        target: o.acc
          ? getTarget((o.acc + o.auc) / 2)
          : getTarget((o.accuracy + o.auc) / 2),
        // thickness:
      };
      return temp;
    });

    const relThick = data.map((o) => {
      let temp = {
        source: o.acc
          ? getTarget((o.acc + o.auc) / 2)
          : getTarget((o.accuracy + o.auc) / 2),
        target: getThicknessTarget(o.thickness),
      };
      return temp;
    });

    const relThickCat = data.map((o) => {
      let temp = {
        source: o.category,
        target: getThicknessTarget(o.thickness),
      };
      return temp;
    });
    const categories = [...new Set(data.map((o) => o.category))];
    const targets = ["GOOD", "MEDIUM", "BAD"];

    const relations = [];
    // category vs performance relation
    categories.forEach((cat) => {
      targets.forEach((t) => {
        let count = 0;
        rel.forEach((r) => {
          if (r.source == cat && r.target == t) {
            count++;
          }
        });
        relations.push({
          source: cat,
          target: t,
          value: count,
        });
      });
    });

    const thicknesses = ["0-10mm", "10-20mm", "20-30mm", "30-40mm"];
    // performance vs thickness relation
    targets.forEach((cat) => {
      thicknesses.forEach((t) => {
        let count = 0;
        relThick.forEach((r) => {
          if (r.source == cat && r.target == t) {
            count++;
          }
        });
        relations.push({
          source: cat,
          target: t,
          value: count,
        });
      });
    });
    // category vs thickness relation
    // categories.forEach(cat => {
    //   thicknesses.forEach(t => {
    //     let count = 0;
    //     relThickCat.forEach(r => {
    //       if(r.source == cat && r.target == t){
    //         count ++
    //       }
    //     })
    //     relations.push({
    //       source: cat,
    //       target: t,
    //       value: count
    //     })
    //   })
    // })

    return relations.filter((r) => r.value > 0);
  };

  const prepareData = () => {
    // const nodes = genNodes()
    setSankyInput({
      nodes: genNodes(),
      links: genLinks(),
    });
  };

  // useEffect(() => {
  //   console.log('sankyInput')
  //   console.log(sankyInput)
  // }, [sankyInput])
  const handleClick = (dd) => {
    let temp = [];
    if (dd.id) {
      enable(true);
      switch (dd.id) {
        case "Ceramic":
          temp = data.filter((d) => d.category == "Ceramic");
          break;
        case "Paper":
          temp = data.filter((d) => d.category == "Paper");
          break;
        case "Fabrics":
          temp = data.filter((d) => d.category == "Fabrics");
          break;
        case "Woods":
          temp = data.filter((d) => d.category == "Woods");
          break;
        case "Plastics":
          temp = data.filter((d) => d.category == "Plastics");
          break;
        case "Glass":
          temp = data.filter((d) => d.category == "Glass");
          break;
        case "GOOD":
          temp = data.filter(
            (o) =>
              (o.acc
                ? getTarget((o.acc + o.auc) / 2)
                : getTarget((o.accuracy + o.auc) / 2)) == "GOOD"
          );

          break;
        case "BAD":
          temp = data.filter(
            (o) =>
              (o.acc
                ? getTarget((o.acc + o.auc) / 2)
                : getTarget((o.accuracy + o.auc) / 2)) == "BAD"
          );

          break;
        case "MEDIUM":
          temp = data.filter(
            (o) =>
              (o.acc
                ? getTarget((o.acc + o.auc) / 2)
                : getTarget((o.accuracy + o.auc) / 2)) == "MEDIUM"
          );

          break;
        case "30-40mm":
          temp = data.filter(
            (d) => getThicknessTarget(d.thickness) == "30-40mm"
          );
          break;
        case "20-30mm":
          temp = data.filter(
            (d) => getThicknessTarget(d.thickness) == "20-30mm"
          );
          break;
        case "10-20mm":
          temp = data.filter(
            (d) => getThicknessTarget(d.thickness) == "10-20mm"
          );
          break;
        case "0-10mm":
          temp = data.filter(
            (d) => getThicknessTarget(d.thickness) == "0-10mm"
          );
          break;
        default:
          break;
      }
      setData(temp);
      filterScatterData(temp);

      adjustParams(temp)
    }
  };
  useEffect(() => {
    if (data.length > 0) {
      // console.log('data is ready')
      // adjustParams([])
      prepareData();
    }
  }, [data]);
  return (
    <div style={{ height: "500px" }}>
      {btn && (
        <Button
          onClick={() => {
            setData(sankeyData);
            filterScatterData([]);
            setParams([])
            enable(false);
          }}
          circular
          icon="close"
          color="google plus"
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            zIndex: 1000,
          }}
        />
      )}
      {sankyInput && (
        <ResponsiveSankey
          data={sankyInput}
          // margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
          onClick={(data, e) => handleClick(data)}
          // onMouseEnter={(data, e) => {
          //   console.log({is: 'mouseEnter', data, event: e})
          // }}
          // onMouseLeave={(data, e) => {
          //   console.log({is: 'mouseLeave', data, event:e})
          // }}
          margin={{ top: 30, right: 45, bottom: 35, left: 50 }}
          align="justify"
          colors={{ scheme: "category10" }}
          nodeOpacity={1}
          nodeThickness={18}
          nodeInnerPadding={3}
          nodeSpacing={24}
          nodeBorderWidth={0}
          nodeBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
          linkOpacity={0.5}
          linkHoverOthersOpacity={0.1}
          enableLinkGradient={true}
          labelPosition="outside"
          labelOrientation="vertical"
          labelPadding={16}
          labelTextColor={{ from: "color", modifiers: [["darker", 1]] }}
          // legends={[
          //   {
          //     anchor: "bottom-right",
          //     direction: "column",
          //     translateX: 130,
          //     itemWidth: 100,
          //     itemHeight: 14,
          //     itemDirection: "right-to-left",
          //     itemsSpacing: 2,
          //     itemTextColor: "#999",
          //     symbolSize: 14,
          //     effects: [
          //       {
          //         on: "hover",
          //         style: {
          //           itemTextColor: "#000",
          //         },
          //       },
          //     ],
          //   },
          // ]}
        />
      )}
    </div>
  );
};

export default MyResponsiveSankey;
