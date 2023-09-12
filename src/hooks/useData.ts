import { useEffect, useState } from 'react';
import { getData } from 'services';
import { ResponseType } from 'types/data';

export function useData() {
  const [data, setData] = useState<ResponseType>({});

  const keys = Object.keys(data).map((key) => new Date(key));
  const values = Object.values(data);
  const ids = [...new Set(values.map((value) => value.id))];
  const areaValues = values.map((value, index) => ({
    x: keys[index],
    y: value.value_area,
    id: value.id,
  }));
  const barValues = values.map((value, index) => ({
    x: keys[index],
    y: value.value_bar,
    id: value.id,
    label: `id: ${value.id}\narea: ${value.value_area}\nbar: ${value.value_bar}`,
  }));
  const barMaximum = Math.max(...barValues.map((value) => value.y));
  const areaMaximum = Math.max(...areaValues.map((value) => value.y));

  useEffect(() => {
    getData().then(({ response }) => {
      setData(response);
    });
  }, []);

  return { areaValues, barValues, barMaximum, areaMaximum, ids };
}
