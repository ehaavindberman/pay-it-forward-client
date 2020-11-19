import { BarChart, Bar, LineChart, Line, XAxis, YAxis } from 'recharts';


function TagStatChart({ data, width, height })  {
  const maxShown = 10;

  let retData = [];
  for (let i = 0; i < data.length; i++) {
    let idx = retData.map(e => e.reco.toLowerCase()).indexOf(data[i].text.toLowerCase());
    if (idx === -1) {
      retData.push({count:1, reco:data[i].text});
    } else {
      retData[idx].count++;
    }
  }

  data = retData.sort((x, y) => y.count - x.count).slice(0,maxShown);

  const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    return (
      <text x={x + width+5} y={y+height-3} dy={-6}>
        {`${value}`}
      </text>
    );
  };

  return (
    <BarChart layout="vertical" width={300} height={500} data={data}>
      <YAxis type="category" dataKey="reco" />
      <XAxis type="number" hide />
      <Bar dataKey="count" label={renderCustomBarLabel} barSize={30} fill="#009C95"
         />
    </BarChart>
  );
}

export default TagStatChart;
