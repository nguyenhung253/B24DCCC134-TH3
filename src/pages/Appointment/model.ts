import { useState } from 'react';

export default () => {

  const [data, setData] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [row, setRow] = useState<any>(null);
  const [isEdit, setIsEdit] = useState(false);

  const getData = () => {
    setData([]);
  };

  const deleteData = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    data,
    visible,
    setVisible,
    row,
    setRow,
    isEdit,
    setIsEdit,
    getData,
    deleteData
  };
};