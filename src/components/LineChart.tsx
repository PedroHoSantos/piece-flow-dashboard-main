
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartData } from '../types';

interface LineChartComponentProps {
  data: ChartData[];
}

const LineChartComponent = ({ data }: LineChartComponentProps) => {
  // Transformar os dados para o formato do gráfico de linha
  const lineData = data.map((item, index) => ({
    name: item.name,
    value: item.value,
    index: index + 1
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            allowDecimals={false}
          />
          <Tooltip 
            formatter={(value, name) => [value, 'Quantidade']}
            labelFormatter={(label) => `Categoria: ${label}`}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#8884d8" 
            strokeWidth={3}
            dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, fill: '#8884d8' }}
            name="Quantidade"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
