import { Pie, Bar } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';

export default function SystemOverview({ data }) {
  if (!data || !data.levels_summary) return <div>Loading...</div>;
  const pieData = {
    labels: ['Total Users', 'Total Points'],
    datasets: [
      {
        data: [data.total_users, data.total_points],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  let labels = [];
  let values = [];
  for (const level of data.levels_summary) {
    console.log(level.badge);
    labels.push(level.badge);
    values.push(level.total_users);
  }

  const barData = {
    labels: labels,
    datasets: [
      {
        label: 'User Distribution by Level',
        data: values,
        backgroundColor: '#FFCE56',
      },
    ],
  };

  const chartContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    'margin-left': '100px',
  };

  return (
    <div>
      <h2>System Overview</h2>
      <div style={chartContainerStyle}>
        <div style={{ width: '600px', height: '600px' }}>
          <h3>Total Users and Total Points</h3>
          <Pie data={pieData} />
        </div>

        <div style={{ width: '600px', height: '600px' }}>
          <h3>User Distribution by Level</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}
