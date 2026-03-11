import { Calendar } from 'antd';
import type { Moment } from 'moment';

export default function CalendarView({ data }: any) {

  const dateCellRender = (value: Moment) => {

    const date = value.format('YYYY-MM-DD');

    const list = data?.filter((item: any) => item.date === date) || [];

    return (
      <ul>
        {list.map((item: any) => (
          <li key={item.id}>
            {item.time} - {item.customer}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Calendar dateCellRender={dateCellRender} />
  );
}