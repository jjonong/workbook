# 워크북

Oracle SQL(교안 1~14장), 「자바의 정석 4판」(1~13장), DB 모델링(데이터 모델링 교안 1~3장), SQL 튜닝(「친절한 SQL 튜닝」 1~7장·부록)을 연습하는 웹 페이지예요. 실습 문제, 개념 정리, 핵심 정리 탭이 있어요. 빌드 과정 없이 `index.html`을 브라우저로 열면 바로 동작해요.

## 파일 구조

```
index.html              화면 뼈대(HTML)만. CSS·JS·데이터는 아래 파일을 불러와요
css/
  style.css             공통 + SQL 화면 스타일 (색상 변수, 라이트/다크 모드 포함)
  java.css              JAVA 화면 전용 스타일
  db.css                DB 모델링 화면 전용 스타일
  tune.css              SQL 튜닝 화면 전용 스타일
  notes.css             내 필기 사이드 패널 스타일
js/
  theme-init.js         화면이 그려지기 전에 라이트/다크 설정 적용
  oralite.js            Oracle 문법을 SQLite(sql.js)에서 돌려주는 SQL 실행기
  app.js                공통 화면(SQL/JAVA/DB/튜닝 전환, 탭, 테마) + SQL 실습 문제·SQL 연습장
  java.js               JAVA 실습 문제, 기록 저장·불러오기, Java 연습장, Claude 채점
  db-erd.js             DB 모델링 ERD 설계 편집기·그리기
  db.js                 DB 모델링 실습 문제, 오답노트, 기록 저장·불러오기, Claude 채점
  tune.js               SQL 튜닝 실습 문제, 오답노트, 기록 저장·불러오기, Claude 채점
  notes.js              내 필기 (오른쪽 사이드 패널: 글자 + 펜 필기, 페이지, 이미지·파일 저장)
  main.js               모든 파일을 읽은 뒤 화면을 시작
data/
  sql-tables.js         SQL 실습 테이블과 데이터
  sql-problems.js       SQL 문제 (장 → 소단원 → 문제)
  sql-answers.js        SQL 정답 SQL (채점할 때 실행해서 결과를 비교)
  sql-concepts.js       SQL 개념 정리 탭 (HTML)
  sql-cheatsheet.js     SQL 핵심 정리 탭 (HTML)
  sql-migrate.js        예전 문제 번호 → 지금 번호 (예전 기록 옮기기용)
  java-problems.js      JAVA 문제 520개
  java-concepts.js      JAVA 개념 정리 탭 (HTML)
  java-cheatsheet.js    JAVA 핵심 정리 탭 (HTML)
  db-problems.js        DB 모델링 문제 139개 (1~3장, ERD 설계 포함)
  db-concepts.js        DB 모델링 개념 정리 탭 (HTML)
  db-cheatsheet.js      DB 모델링 핵심 정리 탭 (HTML)
  tune-problems.js      SQL 튜닝 문제 155개 (1~7장·부록)
  tune-concepts.js      SQL 튜닝 개념 정리 탭 (HTML, 책 목차 기준)
  tune-cheatsheet.js    SQL 튜닝 핵심 정리 탭 (HTML, 책 색인 기준 용어·힌트·파라미터)
tools/
  verify-java.js        JAVA 문제 검사기 (실제로 컴파일·실행해서 정답 확인)
```

데이터 파일은 `.json`이 아니라 `.js`예요. 그래야 서버 없이 `index.html`을 더블클릭으로 열어도 읽을 수 있어요. 여러 줄 텍스트(코드, HTML)는 ``String.raw`…` `` 안에 그대로 들어 있어서 줄바꿈이나 역슬래시를 따로 이스케이프하지 않아도 돼요. 단, 그 안에 백틱(`` ` ``)이나 `${`는 쓸 수 없어요. HTML이라면 `&#96;`, `&#36;{`로 쓰세요.

## 자주 하는 수정

**JAVA 문제 고치기·추가하기**: `data/java-problems.js`에서 해당 번호(`n:`)를 찾아 고쳐요. 새 문제는 배열 끝에 다음 번호로 추가해요. 화면에서는 장(`ch`)과 난이도(`lv`)에 따라 자동으로 자리를 찾아가요.

- `n`은 저장된 풀이 기록의 열쇠라서 기존 번호는 바꾸거나 재사용하지 마세요.
- `t: "mc"` 객관식: `choices` 보기 배열, `ans` 정답 보기 위치(0부터)
- `t: "out"` 출력 결과: `code` 실행할 코드(main 없이 문장만 써도 돼요), `ans` 정확한 출력
- `t: "self"` 직접 작성: `answer` 모범 답안, `kw` 핵심 키워드
  - 코드 작성 문제는 `kind`(`b` main 안 문장, `m` static 메서드, `c` 클래스)와 `code`(사용 예), `demo`(사용 예 실행 결과)를 함께 써요.

고친 뒤에는 검사기를 돌려 정답이 실제 실행 결과와 맞는지 확인하세요. JDK 17 이상, Java 21 권장이에요.

```bash
node tools/verify-java.js          # 전체 (몇 분 걸려요)
node tools/verify-java.js 5 7      # 5장, 7장만
node tools/verify-java.js 421      # 421번 문제만 (14 이상은 문제 번호)
```

**DB 모델링 문제 고치기·추가하기**: `data/db-problems.js`에서 번호(`n`)를 찾아 고쳐요. 규칙은 JAVA와 같고(`n`은 바꾸지 않기), 유형은 두 가지예요.

- `t: "mc"` 객관식: `choices` 보기 배열, `ans` 정답 보기 위치(0부터)
- `t: "self"` 서술·설계: `answer` 모범 답안(일반 텍스트), `kw` 핵심 키워드, 필요하면 `code`(문제에 붙는 자료)

새 장(예: 4장 물리 모델링)은 `WDB.chapters`에 장을 추가하고 문제의 `ch`를 그 번호로 쓰면 돼요. 개념 정리 문서의 장 제목은 `<h1 id="d-ch-4">`처럼 써야 문제 화면의 “개념 정리 보기” 링크가 맞는 장으로 가요.

**개념 정리·핵심 정리 글 고치기**: `data/*-concepts.js`, `data/*-cheatsheet.js`의 HTML을 고쳐요. 목차는 `<h1>`, `<h2>` 제목으로 자동으로 만들어져요.

**SQL 문제 고치기**: 문제 글은 `data/sql-problems.js`(`html`), 정답 SQL은 `data/sql-answers.js`에서 같은 번호(`n`)를 찾아 고쳐요.

**디자인 고치기**: 색은 `css/style.css` 맨 위 `:root` 변수에 모여 있어요. 다크 모드 색은 바로 아래 `prefers-color-scheme: dark`와 `[data-theme="dark"]` 두 곳을 함께 고쳐요.

## 동작 메모

- **SQL 실행기**: 실행할 때 jsDelivr에서 sql.js를 불러오므로 인터넷 연결이 필요해요.
- **Java 연습장과 Claude 채점**(DB 모델링 서술·설계 문제의 Claude 채점 포함): claude.ai에 올린 페이지에서만 동작해요. 브라우저에서 진짜 JVM을 돌릴 수 없어서 Claude가 코드를 읽고 결과를 예측하는 방식이에요. GitHub에서 열면 사용할 수 없다는 안내가 나와요.
- **풀이 기록**: 브라우저 localStorage에 저장돼요. SQL은 `sqlwb:v3`, JAVA는 `javawb:v1`, DB 모델링은 `dbwb:v1` 키를 써요.
- **오답노트**: 틀린 문제는 풀이 기록 안의 `wrong`(틀린 횟수, 마지막으로 틀린 시각)에 쌓이고, 기록 저장·불러오기에도 함께 들어가요.
- **틀린 문제 → 새 문제**: SQL·JAVA·DB에서 틀리면 카드 아래에 ‘새 문제 만들기’가 나와요. 누르면 Claude가 틀린 개념으로 짧은 새 문제를 만들어요. SQL은 Claude가 준 정답 SQL을 실행기로 실제로 돌려서 1~20행이 나오는지 확인한 뒤 보여주고, 그 결과와 비교해 채점해요(안 맞으면 한 번만 다시 요청). JAVA·DB는 4지선다로 만들어요(`app.js`의 `sqlMakeGen`, `mcMake`). 새 문제는 기록에 남지 않아요. Claude를 쓸 수 없으면 비슷한 기존 문제를 보여줘요(`related`, `jRelated`, `dRelated`).
- **Claude 연결 (API 키)**: claude.ai 안에서는 sample capability로 Claude를 불러요. 그 밖(GitHub Pages 등)에서는 헤더의 ✦ 버튼에서 각자 자기 Anthropic API 키를 넣으면, 브라우저가 `api.anthropic.com/v1/messages`를 직접 불러서 새 문제 만들기·Claude 채점·Java 연습장이 똑같이 동작해요(`app.js`의 `getSample`, `apiSample`). 키는 그 브라우저의 localStorage `wb:anthropic-key`에만 저장되고 저장소에는 절대 들어가지 않아요. 모델은 새 문제 `claude-haiku-5-5`, 채점·연습장 `claude-sonnet-5-5`(`API_MODEL`).
- **내 필기**: 같은 브라우저의 localStorage `wbnotes:v1`에 페이지마다 글자와 펜 획(좌표 목록)을 저장해요. 패널의 ⋮ 메뉴에서 파일로 백업하거나 다른 기기에서 불러올 수 있어요.
