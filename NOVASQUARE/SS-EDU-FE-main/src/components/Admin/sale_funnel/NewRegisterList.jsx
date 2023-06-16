import { Funnel } from "@ant-design/plots";

const NewRegisterList = ({
  openCommentInfo,
}) => {

  const data = [
    {
      stage: "level 1",
      number: 253,
    },
    {
      stage: "level 2",
      number: 151,
    },
    {
      stage: "level 3",
      number: 113,
    },
    {
      stage: "level 4",
      number: 87,
    },
    {
      stage: "level 5",
      number: 100,
    },
  ];
  const config = {
    data: data,
    xField: "stage",
    yField: "number",
    dynamicHeight: true,
    legend: false,
    conversionTag: false,
    onReady: (plot ) => {
      plot.on('element:click', (data) => 
        openCommentInfo(data.data.data)
      );
    },
    label: {
      style: {
        fill: 'white',
        fontSize: 20,
        fontWeight: 'bold'
      },
    },
    
  };

  return (
    <>
      <h5 style={{ marginTop: 20 }}>Chart sale funel</h5>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: 650,
            height: 450,
            padding: " 30px 20px",
          }}
        >
          <Funnel {...config} style={{ height: "100%", width: "100%"}} />
        </div>
      </div>
    </>
  );
};

export default NewRegisterList;
