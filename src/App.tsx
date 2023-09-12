import { MouseEvent, useEffect, useState } from 'react';
import { VictoryArea, VictoryAxis, VictoryBar, VictoryChart, VictoryTheme, VictoryTooltip } from 'victory';

import { ResponseType } from 'types/data';
import { getData } from 'services';

import styles from './App.module.scss';

const App = () => {
  const [data, setData] = useState<ResponseType>({});
  const [selectedId, setSelectedId] = useState<string>('');

  const keys = Object.keys(data).map((key) => new Date(key));
  const values = Object.values(data);
  const ids = [...new Set(values.map((value) => value.id))];
  const areaValues = values.map((value, index) => ({
    x: keys[index],
    y: value.value_area,
  }));
  const barValues = values.map((value, index) => ({
    x: keys[index],
    y: value.value_bar,
    id: value.id,
    label: `id: ${value.id}\narea: ${value.value_area}\nbar: ${value.value_bar}`,
  }));

  const barMaximum = Math.max(...barValues.map((value) => value.y));
  const areaMaximum = Math.max(...areaValues.map((value) => value.y));

  function handleClickButtons(e: MouseEvent<HTMLButtonElement>) {
    setSelectedId((e.target as Element).attributes.getNamedItem('data-id')?.value ?? '');
  }

  useEffect(() => {
    getData().then(({ response }) => {
      setData(response);
    });
  }, []);

  return (
    <>
      <VictoryChart theme={VictoryTheme.material} width={1000} height={500}>
        <VictoryAxis
          key='x'
          scale='time'
          standalone={false}
          tickFormat={(tick) => new Date(tick).toLocaleTimeString()}
        />
        <VictoryAxis
          key='bar'
          orientation='left'
          tickValues={[0, 0.2, 0.4, 0.6, 0.8, 1]}
          tickFormat={(tick) => Math.floor(tick * barMaximum)}
          standalone={false}
          dependentAxis
        />
        <VictoryBar
          key='bar'
          y={(datum) => datum.y / barMaximum}
          data={barValues}
          scale={{ x: 'time', y: 'linear' }}
          labelComponent={<VictoryTooltip />}
          style={{ data: { width: 7, fill: ({ datum }) => (datum.id === selectedId ? '#87ceeb' : '#333333') } }}
          standalone={false}
        />
        <VictoryAxis
          key='area'
          orientation='right'
          offsetX={50}
          tickValues={[0, 0.2, 0.4, 0.6, 0.8, 1]}
          tickFormat={(tick) => Math.floor(tick * areaMaximum * 2)}
          standalone={false}
          dependentAxis
        />
        <VictoryArea
          key='area'
          data={areaValues}
          y={(datum) => datum.y / areaMaximum / 2}
          scale={{ x: 'time', y: 'linear' }}
          style={{ data: { fill: 'rgba(100, 250, 100, 0.8)' }, border: { color: 'black' } }}
          standalone={false}
        />
      </VictoryChart>
      <button className={styles.buttonWrapper} type='button' onClick={handleClickButtons}>
        <button type='button' data-id='none' className={styles.buttons}>
          없음
        </button>
        {ids.map((id) => (
          <button type='button' data-id={id} key={id} className={styles.buttons}>
            {id}
          </button>
        ))}
      </button>
    </>
  );
};

export default App;
