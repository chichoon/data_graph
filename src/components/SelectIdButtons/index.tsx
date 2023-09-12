import { Dispatch, MouseEvent, SetStateAction } from 'react';

import styles from './SelectIdButtons.module.scss';

interface Props {
  ids: string[];
  setSelectedId: Dispatch<SetStateAction<string>>;
}

export const SelectIdButtons = ({ ids, setSelectedId }: Props) => {
  function handleClickButtons(e: MouseEvent<HTMLButtonElement>) {
    setSelectedId((e.target as Element).attributes.getNamedItem('data-id')?.value ?? '');
  }

  return (
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
  );
};
