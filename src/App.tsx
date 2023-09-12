import { useState } from 'react';

import { useData } from 'hooks/useData';
import { SelectIdButtons } from 'components/SelectIdButtons';
import { Chart } from 'components/Chart';

const App = () => {
  const { areaValues, barValues, barMaximum, areaMaximum, ids } = useData();
  const [selectedId, setSelectedId] = useState<string>('');

  return (
    <>
      <Chart
        areaValues={areaValues}
        barValues={barValues}
        barMaximum={barMaximum}
        areaMaximum={areaMaximum}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <SelectIdButtons ids={ids} setSelectedId={setSelectedId} />
    </>
  );
};

export default App;
