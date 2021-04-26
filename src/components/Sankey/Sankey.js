import React, { useEffect, useState } from 'react'
import { ResponsiveSankey } from "@nivo/sankey";
import { render } from 'react-dom';
// import { random } from 'faker';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveSankey = ({ /*data, */ sankeyData }) => {

  const [ data, setData ] = useState([])
  const [ sankyInput, setSankyInput ] = useState(null)
  useEffect(() => {
    // console.log('sankey effect')
    // console.log(sankeyData)
    if(sankeyData.length > 0){
      setData(sankeyData)
    }
    // setSankyInput({
    //   nodes: [],
    //   links: []
    // })
    // prepareData()
    // }

  }, [sankeyData])

  const genNodes = () => {

    const categories = [...new Set(data.map(o => o.category))]
    let nodes = categories.map(c => {
      let o = {}
      o['id'] = c;
      o['color'] = 'hsl(' + Math.round(Math.random() * 100) + ', 70%, 50%)';
      return o
    })
    return [...nodes, 
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
        id: "0-10",
        color: "hsl(300, 70%, 50%)"
      },
      {
        id: "10-20",
        color: "hsl(500, 70%, 50%)"
      },
      {
        id: "20-30",
        color: "hsl(600, 70%, 50%)"
      },
      {
        id: "30-40",
        color: "hsl(150, 70%, 50%)"
      },
      
    ]
  }

  const getTarget = ( temp ) => {
    if(temp >= 85 && temp <= 100){
      return 'GOOD'
    }else if(temp < 85 && temp >=70 ){
      return 'MEDIUM'
    }else{
      // console.log('quality')
      // console.log(temp)
      return 'BAD'
    }
  }

  const getThicknessTarget = (temp) => {
    if(temp >= 0 && temp < 10){
      return '0-10'
    }else if(temp >= 10 && temp < 20){
      return '10-20'
    }else if(temp >= 20 && temp < 30){
      return '20-30'
    }else{
      // console.log('thickness ')
      // console.log(temp)
      return '30-40'
    }
  }

  const genLinks = () => {
    // store objects { source: 'cat', target: ''}
    const rel = data.map(o => {
      // console.log('nan')
      // if(isNaN(o.accuracy) || isNaN(o.auc)){
      //   console.log(o)
      // }
      let temp = {
        source: o.category,
        target: o.acc ? getTarget((o.acc + o.auc)/2) : getTarget((o.accuracy + o.auc)/2),
        // thickness: 
      }
      return temp
    })

    const relThick = data.map(o => {
      let temp = {
        source: o.acc ? getTarget((o.acc + o.auc)/2) : getTarget((o.accuracy + o.auc)/2),
        target: getThicknessTarget(o.thickness)
      }
      return temp
    })

    const relThickCat = data.map(o => {
      let temp = {
        source: o.category,
        target: getThicknessTarget(o.thickness)
      }
      return temp
    })
    const categories = [...new Set(data.map(o => o.category))]
    const targets = ['GOOD', 'MEDIUM', 'BAD']
    
    const relations =[]
    // category vs performance relation
    categories.forEach(cat => {
      targets.forEach(t => {
        let count = 0;
        rel.forEach(r => {
          if(r.source == cat && r.target == t){
            count ++ 
          }
        })
        relations.push({
          source: cat,
          target: t,
          value: count
        })
      })
    })

    const thicknesses = ['0-10', '10-20', '20-30', '30-40']
    // performance vs thickness relation
    targets.forEach(cat => {
      thicknesses.forEach(t => {
        let count = 0;
        relThick.forEach(r => {
          if(r.source == cat && r.target == t){
            count ++
          }
        })
        relations.push({
          source: cat,
          target: t,
          value: count
        })
      })
    })
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

    return relations.filter(r => r.value > 0)
  }


  const prepareData = () => {
    // const nodes = genNodes()
    setSankyInput({
      nodes: genNodes(),
      links: genLinks()
    })
    
  }

  // useEffect(() => {
  //   console.log('sankyInput')
  //   console.log(sankyInput)
  // }, [sankyInput])

  useEffect(() => {
    if(data.length > 0){
      // console.log('data is ready')
      prepareData()

    }
  }, [data])
  return (
    <div style={{ height: "500px" }}>
      {
        sankyInput && <ResponsiveSankey
        data={sankyInput}
        margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
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
      }
    </div>
  )
}

export default MyResponsiveSankey;