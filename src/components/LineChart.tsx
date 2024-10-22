import { TimeSeriesIntraday } from '@/types/timeSeriesIntraday';
import { FC } from 'react';
import {
  ResponsiveContainer,
  LineChart as LChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

type LineChartProps = {
  data: Record<string, TimeSeriesIntraday>;
};

const LineChart: FC<LineChartProps> = ({ data }) => {
  const sortedData = Object.values(data).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  return (
    <div className="w-full md:w-3/4 lg:w-1/2 h-96 md:h-128 lg:h-160">
      <ResponsiveContainer width="100%" height="100%">
        <LChart
          width={500}
          height={300}
          data={sortedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" allowDataOverflow name="Time" />
          <YAxis type="number" name="Price" domain={['auto', 'auto']} />
          <Tooltip filterNull={true} />
          <Legend />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            dot={false}
            name="Closing prices / stock"
          />
          {/** entry level */}
        </LChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
