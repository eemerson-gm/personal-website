import { Bar } from 'react-chartjs-2';
import Upload from '../components/Upload';
import { useState } from 'react';
import moment from 'moment';

interface PerformanceItem {
  date: string;
  value: string;
}

export default function FinancePage() {
  const [tableLabels, setTableLabels] = useState<string[]>();
  const [tableData, setTableData] = useState<number[]>();

  const [baseValue, setBaseValue] = useState<number>(0);
  const [monthlyValue, setMonthlyValue] = useState<number>(0);

  const onUpload = (data: string) => {
    const json = JSON.parse(data);
    const values = json.data.performance[0].valueChart as PerformanceItem[];

    let totalMonthly = 0;
    const money = values.map((val) => {
      const date = moment(val.date).date();
      const deposit = Boolean(
        moment(val.date).daysInMonth() === date || date === 15
      );

      totalMonthly += Number(deposit) * monthlyValue;

      return Number(val.value) - baseValue - totalMonthly;
    });

    setTableLabels(values.map((val) => val.date));
    setTableData(money);
  };

  return (
    <>
      <article>
        <header>
          <hgroup style={{ margin: 0 }}>
            <h2>Profit Caulcator</h2>
            <h3>Calculate how much you've made from financial data.</h3>
          </hgroup>
        </header>
        <label>Base Value:</label>
        <input
          type='number'
          value={baseValue}
          onChange={(e) => setBaseValue(Number(e.target.value))}
        />
        <label>x2 Monthy Deposit:</label>
        <input
          type='number'
          value={monthlyValue}
          onChange={(e) => setMonthlyValue(Number(e.target.value))}
        />
        <Upload accept='.json' onUpload={onUpload} />
        <Bar
          options={{
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Date',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Profit',
                },
              },
            },
          }}
          data={{
            labels: tableLabels,
            datasets: [
              {
                data: tableData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
            ],
          }}
        />
      </article>
    </>
  );
}
