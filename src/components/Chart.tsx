import { Dispatch, SetStateAction } from 'react';
import {
  VictoryArea,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLegend,
  VictoryTheme,
  VictoryTooltip,
} from 'victory';

interface Props {
  areaValues: { x: Date; y: number; id: string }[];
  barValues: { x: Date; y: number; id: string; label: string }[];
  areaMaximum: number;
  barMaximum: number;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

export const Chart = ({ areaValues, barValues, areaMaximum, barMaximum, selectedId, setSelectedId }: Props) => (
  <VictoryChart theme={VictoryTheme.material} width={1000} height={500}>
    <VictoryLegend
      centerTitle
      orientation='horizontal'
      data={[
        { name: 'value_bar', symbol: { fill: '#333333' } },
        { name: 'value_area', symbol: { fill: 'rgba(100, 250, 100, 0.8)' } },
      ]}
    />
    <VictoryAxis key='x' scale='time' standalone={false} tickFormat={(tick) => new Date(tick).toLocaleTimeString()} />
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
      style={{ data: { width: 8, fill: ({ datum }) => (datum.id === selectedId ? '#87ceeb' : '#333333') } }}
      standalone={false}
      events={[
        {
          target: 'data',
          eventHandlers: {
            onClick: (_, { datum }: { datum: { id: string } }) => {
              setSelectedId(datum.id);
            },
          },
        },
      ]}
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
);
