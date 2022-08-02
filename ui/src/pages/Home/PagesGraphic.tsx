import {useNavigate} from 'react-router-dom';
import {OpenInNew} from '@mui/icons-material';
import {Box, CircularProgress, Typography} from '@mui/material';
import {PieChart, Pie, Cell} from 'recharts';

import {InfoCard} from '../../components/InfoCard';
import UserStore from '../../store/User';

type Props = {
  pages: number;
  categories: number;
  users: number;
  products: number;
  loading: boolean;
};

export const PagesWidget = ({
  pages,
  categories,
  users,
  products,
  loading,
}: Props) => {
  const navigate = useNavigate();

  const moveToPages = () => {
    navigate('/pages');
    UserStore.setSelectedPage('/pages');
  };

  const data = [
    {name: 'Pages', value: pages},
    {name: 'Categories', value: categories},
    {name: 'Users', value: users},
    {name: 'Products', value: products},
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const xName = cx + radius * Math.cos(-midAngle * RADIAN) * 2.1;
    const yName = cy + radius * Math.sin(-midAngle * RADIAN) * 2;

    return (
      <>
        <text
          x={x}
          y={y}
          fill="primary.main"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
        <text
          x={xName}
          y={yName}
          fill="primary.main"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central">
          {name}
        </text>
      </>
    );
  };

  return (
    <Box>
      <InfoCard
        header={
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Typography variant="subtitle1">All</Typography>
          </Box>
        }
        containerStyles={{flexGrow: 1}}
        headerStyles={{mt: '0.5em'}}
        handleAction={moveToPages}
        headerActionIcon={<OpenInNew sx={{color: 'primary.main'}} />}
        showHeaderBackground>
        <Box>
          {loading ? (
            <CircularProgress />
          ) : (
            <Box display="flex" justifyContent="center">
              <PieChart width={300} height={300}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value">
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </Box>
          )}
        </Box>
      </InfoCard>
    </Box>
  );
};
