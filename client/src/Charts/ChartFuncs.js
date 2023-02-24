import {PieChart, Pie, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, RadialBarChart, RadialBar} from "recharts";

export function pieChart(testData)
{
  return(
    <PieChart width = {700} height = {350}>
    <Pie
      dataKey = "Expected"
      isAnimationActive = {false}
      data = {testData}
      cx = {200}
      cy = {200}
      outerRadius = {80}
      fill = "#57c0e8"
      label
    />
    <text
      x='28%'
      y='10%'
      style={{ fontSize: 24, fontWeight: 'bold', fill: '#000000' }}
      width={200}
      scaleToFit={true}
      textAnchor='middle'
      verticalAnchor='middle'
    >
      PieChart
    </text>
    <Tooltip />
  </PieChart>
  );
};

export function barChart(testData)
    {
      return(
        <BarChart width={730} height={250} data={testData} margin={{ top: 50, right: 5, bottom: 5, left: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <text
          x='28%'
          y='10%'
          style={{ fontSize: 24, fontWeight: 'bold', fill: '#000000' }}
          width={200}
          scaleToFit={true}
          textAnchor='middle'
          verticalAnchor='middle'
        >
          BarChart
        </text>
        <Tooltip />
        <Legend />
        <Bar dataKey="Expected" fill="#8884d8" />
        <Bar dataKey="Measured" fill="#82ca9d" />
      </BarChart>
      );
    }