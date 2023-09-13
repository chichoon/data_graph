<h1 align="center"> Data Graph </h1>
<p align="center">
  <img src="https://img.shields.io/badge/-Typescript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/-Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"> <img src="https://img.shields.io/badge/-Victory-ED7258?style=flat-square&logoColor=white">
</p>

## [배포 페이지](https://data-graph-tan.vercel.app)

## 기능 소개

<img width="640" alt="image" src="https://github.com/chichoon/data_graph/assets/37893979/9a371d91-14af-4829-938a-d12cd387c115">

주어진 Mock Data를 그래프로 출력합니다.

막대형 그래프와 영역 그래프가 겹쳐져서 함께 출력됩니다.

![Sep-12-2023 20-05-26](https://github.com/chichoon/data_graph/assets/37893979/cfad9010-fb19-4e71-8354-816873a9cbe9)

하단의 버튼을 누르면 해당하는 지역 (id) 의 모든 그래프가 하이라이트 됩니다.

![Sep-12-2023 20-05-47](https://github.com/chichoon/data_graph/assets/37893979/d6b103ae-e2e7-4fe9-a980-113ac14f41ea)

마찬가지로 막대 그래프를 클릭하면 같은 지역에 해당하는 그래프가 하이라이트 됩니다.

![Sep-12-2023 20-06-15](https://github.com/chichoon/data_graph/assets/37893979/e68d49c1-1a3b-438f-aa7f-0569ab0cafa9)

마우스를 올리면 툴팁을 출력합니다.

툴팁에서는 ID, value_bar, value_area 를 출력합니다.

## 사용한 라이브러리

그래프 출력, 그래프 이벤트 핸들링, 툴팁 출력은 [Victory](https://formidable.com/open-source/victory/) 라이브러리를 사용하였습니다.

스타일링은 Scss를 이용하였습니다.

## 고민한 사항

### 버튼에 이벤트 부착하기

```ts

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
```

여러 버튼이 비슷한 동작을 하기 때문에 각각의 핸들러를 선언하기보다는 부모 컴포넌트에 단 하나의 핸들러를 부착하고, 이벤트를 위임받아 적절한 처리를 하도록 하였습니다.

이때 자식 버튼들을 구분하기 위해 data-id property를 사용하였습니다.


### useData

useData는 데이터를 json 파일로부터 읽어들여 적절한 형태로 가공하는 관심사를 가진 훅입니다.

일련의 로직이 데이터 정제 및 가공에 관련되어 있다고 판단되어 커스텀 훅으로 묶어주게 되었습니다.

