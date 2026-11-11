// SQL 튜닝 실습 문제 (155문제) · 친절한 SQL 튜닝 1~7장·부록
// n: 번호(기록 저장에 쓰여요. 바꾸지 마세요), ch: 장(8 = 부록), lv: 1 기초 · 2 응용 · 3 심화
// t: 'mc' 객관식(ans = 정답 보기 번호, 0부터) · 'self' 서술(answer = 모범 답안, kw = 핵심 키워드)
var WTU = window.WTU = window.WTU || {};
WTU.chapters = [
 {
  "no": 1,
  "title": "1장 SQL 처리 과정과 I/O",
  "short": "SQL 처리 과정과 I/O"
 },
 {
  "no": 2,
  "title": "2장 인덱스 기본",
  "short": "인덱스 기본"
 },
 {
  "no": 3,
  "title": "3장 인덱스 튜닝",
  "short": "인덱스 튜닝"
 },
 {
  "no": 4,
  "title": "4장 조인 튜닝",
  "short": "조인 튜닝"
 },
 {
  "no": 5,
  "title": "5장 소트 튜닝",
  "short": "소트 튜닝"
 },
 {
  "no": 6,
  "title": "6장 DML 튜닝",
  "short": "DML 튜닝"
 },
 {
  "no": 7,
  "title": "7장 SQL 옵티마이저",
  "short": "SQL 옵티마이저"
 },
 {
  "no": 8,
  "title": "부록 SQL 분석 도구",
  "short": "SQL 분석 도구"
 }
];
WTU.problems = [
 {
  "n": 1,
  "ch": 1,
  "lv": 1,
  "t": "mc",
  "q": "SQL 최적화 과정의 순서로 알맞은 것은?",
  "choices": [
   "SQL 파싱 → SQL 최적화 → 로우 소스 생성",
   "로우 소스 생성 → SQL 파싱 → SQL 최적화",
   "SQL 파싱 → 로우 소스 생성 → SQL 최적화",
   "SQL 최적화 → SQL 파싱 → 로우 소스 생성"
  ],
  "ans": 0,
  "exp": "먼저 <b>파싱</b>(파싱 트리 생성, Syntax·Semantic 체크)을 하고, 옵티마이저가 <b>최적화</b>(최저 비용 실행경로 선택)를 한 뒤, <b>로우 소스 생성기</b>가 실행 가능한 코드 형태로 만들어요."
 },
 {
  "n": 2,
  "ch": 1,
  "lv": 1,
  "t": "mc",
  "q": "SQL 파싱 단계 중 <b>Semantic 체크</b>에서 확인하는 것은?",
  "choices": [
   "라이브러리 캐시에 같은 SQL이 있는지",
   "키워드 철자와 순서가 문법에 맞는지",
   "존재하지 않는 테이블·컬럼을 쓰지 않았는지, 권한이 있는지",
   "가장 비용이 낮은 실행계획이 무엇인지"
  ],
  "ans": 2,
  "exp": "Syntax 체크는 <b>문법</b>(누락된 키워드, 순서), Semantic 체크는 <b>의미</b>(없는 오브젝트·컬럼, 권한)를 확인해요. 비용 비교는 최적화 단계의 일이에요."
 },
 {
  "n": 3,
  "ch": 1,
  "lv": 1,
  "t": "mc",
  "q": "실행계획에 표시되는 <b>Cost</b>에 대한 설명으로 알맞은 것은?",
  "choices": [
   "SQL이 라이브러리 캐시에서 차지하는 메모리 크기",
   "쿼리를 실제로 수행하며 측정한 블록 I/O 수",
   "쿼리를 실제로 수행한 시간(초)",
   "수행 중 발생할 것으로 예상되는 I/O 횟수 또는 예상 소요시간"
  ],
  "ans": 3,
  "exp": "Cost는 통계정보로 계산한 <b>예상치</b>예요. 실측치가 아니라서 실제 성능과 다를 수 있어요. 실제 값은 SQL 트레이스나 DISPLAY_CURSOR로 봐요."
 },
 {
  "n": 4,
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "다음 중 <b>힌트가 무시되는</b> 경우는?",
  "choices": [
   "<code>SELECT /*+ FULL(E) */ * FROM EMP E</code>",
   "<code>SELECT /*+ FULL(SCOTT.EMP) */ * FROM SCOTT.EMP</code>",
   "<code>/*+ LEADING(A) USE_NL(B) */</code>",
   "<code>/*+ INDEX(A A_X01) INDEX(B B_X03) */</code>"
  ],
  "ans": 1,
  "exp": "힌트에 <b>스키마명</b>까지 쓰면 무효예요. 또 테이블에 별칭을 줬으면 반드시 별칭으로 지정해야 하고, 힌트 사이 콤마는 무시돼요. 힌트는 틀려도 에러 없이 무시되니 실행계획으로 꼭 확인해요."
 },
 {
  "n": 5,
  "ch": 1,
  "lv": 1,
  "t": "mc",
  "q": "라이브러리 캐시에서 SQL을 찾지 못해 최적화와 로우 소스 생성까지 모두 수행하는 것은?",
  "choices": [
   "Direct Path I/O",
   "소프트 파싱",
   "하드 파싱",
   "Fast Commit"
  ],
  "ans": 2,
  "exp": "캐시에 있으면 <b>소프트 파싱</b>, 없으면 <b>하드 파싱</b>이에요. 하드 파싱은 수많은 실행경로를 평가해야 해서 CPU를 많이 써요."
 },
 {
  "n": 6,
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "로그인할 때마다 <code>WHERE LOGIN_ID = 'tom'</code>, <code>'kim'</code>… 처럼 리터럴 값을 붙여 SQL을 실행하는 프로그램의 문제와 해결책으로 알맞은 것은?",
  "choices": [
   "SQL마다 하드 파싱이 일어나므로 바인드 변수를 사용한다",
   "Undo가 많이 생기므로 커밋을 자주 한다",
   "버퍼캐시 히트율이 낮아지므로 SGA를 늘린다",
   "Full Scan이 발생하므로 인덱스를 추가한다"
  ],
  "ans": 0,
  "exp": "오라클은 SQL <b>텍스트 자체</b>가 이름 역할을 해서 리터럴 값이 다르면 다른 SQL로 보고 매번 하드 파싱해요. <code>WHERE LOGIN_ID = :id</code> 처럼 <b>바인드 변수</b>를 쓰면 한 번만 하드 파싱하고 공유해요."
 },
 {
  "n": 7,
  "ch": 1,
  "lv": 1,
  "t": "mc",
  "q": "오라클에서 데이터를 읽고 쓰는 <b>단위</b>는?",
  "choices": [
   "익스텐트",
   "세그먼트",
   "로우",
   "블록"
  ],
  "ans": 3,
  "exp": "레코드 하나를 읽어도 그 레코드가 속한 <b>블록 전체</b>를 읽어요. 익스텐트는 공간 <b>확장</b> 단위, 세그먼트는 테이블·인덱스 같은 저장 오브젝트예요."
 },
 {
  "n": 8,
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "데이터베이스 저장 구조에 대한 설명으로 <b>틀린</b> 것은?",
  "choices": [
   "한 세그먼트의 익스텐트들은 여러 데이터파일에 흩어질 수 있다",
   "한 익스텐트에 속한 블록들도 여러 데이터파일에 흩어질 수 있다",
   "테이블·인덱스·파티션처럼 저장 공간이 필요한 오브젝트를 세그먼트라 한다",
   "익스텐트는 연속된 블록의 집합이다"
  ],
  "ans": 1,
  "exp": "익스텐트는 <b>연속된 블록</b>의 집합이라 한 익스텐트 안의 블록은 같은 데이터파일에서 인접해 있어요. 세그먼트 단위로는 여러 파일에 흩어질 수 있어요(파일 경합 분산)."
 },
 {
  "n": 9,
  "ch": 1,
  "lv": 1,
  "t": "mc",
  "q": "인덱스 ROWID를 이용해 테이블 블록을 하나씩 찾아가는 액세스 방식은?",
  "choices": [
   "랜덤 액세스",
   "Multiblock I/O",
   "Direct Path I/O",
   "시퀀셜 액세스"
  ],
  "ans": 0,
  "exp": "레코드 하나를 읽기 위해 한 블록씩 접근하는 것이 <b>랜덤 액세스</b>예요. 인덱스 리프를 순서대로 읽거나 Full Scan처럼 순서대로 읽는 건 시퀀셜 액세스예요."
 },
 {
  "n": 10,
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "어떤 SQL의 논리적 I/O가 10,000블록, 물리적 I/O가 500블록일 때 버퍼캐시 히트율은?",
  "choices": [
   "5%",
   "50%",
   "95%",
   "99.5%"
  ],
  "ans": 2,
  "exp": "BCHR = (1 − 물리적 I/O / 논리적 I/O) × 100 = (1 − 500/10,000) × 100 = <b>95%</b>예요."
 },
 {
  "n": 11,
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "물리적 I/O를 줄이기 위한 가장 근본적인 SQL 튜닝 방향은?",
  "choices": [
   "바인드 변수 대신 리터럴을 쓴다",
   "버퍼캐시 히트율을 높이기 위해 같은 SQL을 여러 번 실행한다",
   "논리적 I/O(읽는 블록 수)를 줄인다",
   "Single Block I/O를 Multiblock I/O로 모두 바꾼다"
  ],
  "ans": 2,
  "exp": "물리적 I/O = 논리적 I/O × (100% − BCHR)이고 BCHR은 시스템 상황으로 정해져요. 그래서 SQL 튜닝은 <b>논리적 I/O를 줄이는 것</b>이에요."
 },
 {
  "n": 12,
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "대기 이벤트 <code>db file scattered read</code>가 주로 발생하는 상황은?",
  "choices": [
   "Redo 로그 기록",
   "인덱스 루트 블록 읽기",
   "인덱스 ROWID로 테이블 한 블록 읽기",
   "Table Full Scan으로 여러 블록을 한꺼번에 읽기"
  ],
  "ans": 3,
  "exp": "Multiblock I/O는 <code>db file scattered read</code>, Single Block I/O는 <code>db file sequential read</code>예요. 이름이 반대처럼 느껴지니 주의해요."
 },
 {
  "n": 13,
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "Table Full Scan과 Index Range Scan을 비교한 설명으로 <b>틀린</b> 것은?",
  "choices": [
   "Index Range Scan은 랜덤 액세스와 Single Block I/O 위주다",
   "많은 데이터를 조회할 때는 항상 Index Range Scan이 유리하다",
   "Index Range Scan은 같은 블록을 반복해서 읽는 비효율이 생길 수 있다",
   "Table Full Scan은 시퀀셜 액세스와 Multiblock I/O를 사용한다"
  ],
  "ans": 1,
  "exp": "인덱스는 <b>큰 테이블에서 아주 적은 데이터</b>를 빨리 찾는 도구예요. 많은 데이터를 읽을 땐 Full Scan이 유리할 수 있어요(3장 손익분기점)."
 },
 {
  "n": 14,
  "ch": 1,
  "lv": 3,
  "t": "mc",
  "q": "버퍼캐시 해시 체인을 스캔하는 동안 체인 구조를 보호하기 위해 사용하는 경량 Lock은?",
  "choices": [
   "TM Lock",
   "TX Lock",
   "래치(Latch)",
   "Sequence Lock"
  ],
  "ans": 2,
  "exp": "SGA 공유 구조를 보호하는 직렬화 장치가 <b>래치</b>예요(예: cache buffers chains 래치). 버퍼 블록 자체를 읽고 쓸 땐 <b>버퍼 Lock</b>을 써요. 같은 블록을 불필요하게 많이 읽으면 래치 경합까지 생겨요."
 },
 {
  "n": 15,
  "ch": 1,
  "lv": 2,
  "t": "self",
  "q": "하드 파싱을 왜 ‘하드(hard)’하다고 하는지, 그리고 이를 줄이는 방법을 설명하세요.",
  "answer": "하드 파싱은 라이브러리 캐시에 SQL이 없어서 파싱 후 최적화(여러 조인 순서·조인 방식·액세스 경로 후보를 만들고 통계정보로 비용을 계산해 최저 비용을 선택)와 로우 소스 생성까지 수행하는 과정이다. 후보가 매우 많고 딕셔너리·통계정보를 읽어야 해서 CPU를 많이 쓰는 무거운 작업이다.\n줄이는 방법: 리터럴 대신 바인드 변수를 사용해 SQL 텍스트를 같게 만들어 라이브러리 캐시의 SQL을 재사용(소프트 파싱)한다.",
  "kw": [
   "라이브러리 캐시",
   "최적화",
   "비용",
   "바인드 변수",
   "소프트 파싱"
  ]
 },
 {
  "n": 16,
  "ch": 1,
  "lv": 2,
  "t": "self",
  "q": "논리적 I/O와 물리적 I/O의 차이를 설명하고, 같은 SQL을 반복 실행할 때 각각 어떻게 변하는지 쓰세요.",
  "answer": "논리적 I/O: SQL을 처리하는 동안 발생한 총 블록 I/O(버퍼캐시를 경유해 읽은 블록 전체).\n물리적 I/O: 버퍼캐시에서 찾지 못해 디스크에서 읽은 블록 I/O.\n같은 SQL을 반복 실행하면 논리적 I/O는 거의 같고(같은 블록을 같은 횟수만큼 읽음), 물리적 I/O는 블록이 캐싱되면서 줄어든다.",
  "kw": [
   "버퍼캐시",
   "총 블록",
   "디스크",
   "같다",
   "줄어"
  ]
 },
 {
  "n": 17,
  "ch": 1,
  "lv": 3,
  "t": "self",
  "q": "다음 실행계획에서 ‘Cost’와 실제 성능이 다를 수 있는 이유를 쓰고, 실제 읽은 블록 수를 확인하는 방법을 두 가지 쓰세요.",
  "answer": "Cost는 통계정보를 바탕으로 옵티마이저가 계산한 예상 I/O 횟수(또는 예상 시간)이기 때문에, 통계가 부정확하거나 바인드 변수 값·데이터 분포·캐싱 상태가 달라지면 실제와 차이가 난다.\n실제 블록 수 확인: ① SQL 트레이스 + TKProf(query/current, cr) ② gather_plan_statistics 힌트 + DBMS_XPLAN.DISPLAY_CURSOR('ALLSTATS LAST')의 Buffers ③ AutoTrace 통계(consistent gets, db block gets).",
  "kw": [
   "예상",
   "통계정보",
   "SQL 트레이스",
   "DISPLAY_CURSOR",
   "AutoTrace"
  ],
  "code": "0  SELECT STATEMENT Optimizer=ALL_ROWS (Cost=19 Card=1)\n1  0  TABLE ACCESS (BY INDEX ROWID) OF 'T' (Cost=19)\n2  1    INDEX (RANGE SCAN) OF 'T_X02' (INDEX) (Cost=2)"
 },
 {
  "n": 18,
  "ch": 2,
  "lv": 1,
  "t": "mc",
  "q": "인덱스 튜닝의 두 가지 핵심 요소 중 성능에 <b>더 큰</b> 영향을 주는 것은?",
  "choices": [
   "테이블 랜덤 액세스 최소화",
   "인덱스 리빌드 주기",
   "인덱스 블록 크기",
   "인덱스 스캔 효율화"
  ],
  "ans": 0,
  "exp": "인덱스 튜닝은 ① 인덱스 스캔 효율화 ② 테이블 랜덤 액세스 최소화예요. 이 중 <b>테이블 랜덤 액세스</b>가 가장 비싼 작업이라 이를 줄이는 게 더 중요해요. SQL 튜닝은 랜덤 I/O와의 전쟁이에요."
 },
 {
  "n": 19,
  "ch": 2,
  "lv": 1,
  "t": "mc",
  "q": "B*Tree 인덱스의 <b>리프 블록</b>에 저장되는 것은?",
  "choices": [
   "테이블의 모든 컬럼",
   "해시 값과 버킷 번호",
   "하위 블록 주소와 키값",
   "키값과 ROWID"
  ],
  "ans": 3,
  "exp": "리프 블록에는 <b>키값 + ROWID</b>가 키값 순으로 저장되고, 앞뒤 리프 블록과 양방향으로 연결돼요. 루트·브랜치 블록에는 하위 블록 주소가 있어요."
 },
 {
  "n": 20,
  "ch": 2,
  "lv": 1,
  "t": "mc",
  "q": "ROWID의 구성으로 알맞은 것은?",
  "choices": [
   "테이블 이름 + 로우 번호",
   "데이터 블록 주소(DBA) + 로우 번호",
   "익스텐트 번호 + 컬럼 번호",
   "인덱스 이름 + 키값"
  ],
  "ans": 1,
  "exp": "ROWID = <b>DBA(데이터파일 번호 + 블록 번호) + 로우 번호</b>(블록 안 순번)예요."
 },
 {
  "n": 21,
  "ch": 2,
  "lv": 1,
  "t": "mc",
  "q": "인덱스 <b>수직적 탐색</b>의 목적은?",
  "choices": [
   "스캔 시작 지점을 찾기 위해",
   "ROWID를 정렬하기 위해",
   "테이블 블록을 Multiblock으로 읽기 위해",
   "리프 블록 전체를 읽기 위해"
  ],
  "ans": 0,
  "exp": "수직적 탐색은 루트에서 리프까지 내려가며 <b>조건을 만족하는 첫 레코드(스캔 시작점)</b>를 찾는 과정이에요. 그 뒤 리프를 옆으로 읽는 것이 수평적 탐색이에요."
 },
 {
  "n": 22,
  "ch": 2,
  "lv": 1,
  "t": "mc",
  "q": "인덱스 <code>[업체명]</code>이 있을 때 Index Range Scan이 <b>가능한</b> 조건은?",
  "choices": [
   "<code>WHERE 업체명 LIKE '%대한%'</code>",
   "<code>WHERE SUBSTR(업체명, 1, 2) = '대한'</code>",
   "<code>WHERE 업체명 LIKE '대한%'</code>",
   "<code>WHERE NVL(업체명, 'X') = '대한'</code>"
  ],
  "ans": 2,
  "exp": "인덱스 컬럼을 가공하면 시작점을 찾을 수 없어요. <b>앞부분이 고정된 LIKE</b>는 시작점을 찾을 수 있어 Range Scan이 가능해요. 중간 일치 LIKE, 함수, NVL은 불가능해요."
 },
 {
  "n": 23,
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "인덱스 <code>[기준연도 + 과세구분코드 + 보고회차]</code>가 있을 때 Index Range Scan을 할 수 <b>없는</b> 조건은?",
  "choices": [
   "<code>기준연도 = :a AND 보고회차 = :c</code>",
   "<code>기준연도 = :a</code>",
   "<code>기준연도 = :a AND 과세구분코드 = :b</code>",
   "<code>과세구분코드 = :b AND 보고회차 = :c</code>"
  ],
  "ans": 3,
  "exp": "Range Scan의 조건은 <b>인덱스 선두 컬럼이 가공 없이 조건절에 있는 것</b>이에요. 선두 컬럼(기준연도) 조건이 없으면 Range Scan할 수 없어요(Skip Scan이나 Full Scan 대상)."
 },
 {
  "n": 24,
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "<code>WHERE 전화번호 IN (:a, :b)</code>가 인덱스를 Range Scan으로 처리할 때 실행계획에 나타나는 오퍼레이션은?",
  "choices": [
   "CONCATENATION",
   "INLIST ITERATOR",
   "HASH JOIN",
   "SORT UNIQUE"
  ],
  "ans": 1,
  "exp": "IN 조건은 <b>IN-List Iterator</b>로 IN 값 개수만큼 Range Scan을 반복해요. OR 조건을 UNION ALL처럼 나누는 OR-Expansion은 CONCATENATION으로 표시돼요."
 },
 {
  "n": 25,
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "인덱스 <code>[장비번호 + 변경일자 + 변경순번]</code>이 있을 때 <b>SORT ORDER BY가 발생하는</b> SQL은?",
  "choices": [
   "<code>WHERE 장비번호 = 'C' ORDER BY 변경일자, 변경순번</code>",
   "<code>WHERE 장비번호 = 'C' ORDER BY 변경일자 DESC, 변경순번 DESC</code>",
   "<code>WHERE 장비번호 = 'C' ORDER BY 변경일자 || 변경순번</code>",
   "<code>WHERE 장비번호 = 'C' AND 변경일자 = '20240101' ORDER BY 변경순번</code>"
  ],
  "ans": 2,
  "exp": "ORDER BY에서 컬럼을 <b>가공</b>하면(<code>||</code> 결합) 인덱스 정렬 순서와 다르다고 판단해 정렬이 생겨요. 내림차순은 인덱스를 거꾸로 읽으면 되고(Range Scan Descending), 변경일자까지 = 조건이면 변경순번 순서도 인덱스와 같아 생략돼요."
 },
 {
  "n": 26,
  "ch": 2,
  "lv": 3,
  "t": "mc",
  "q": "다음 SQL에서 인덱스 <code>[주문일자]</code>로 소트를 생략하지 못하는 이유와 해결책으로 알맞은 것은?",
  "choices": [
   "ORDER BY의 주문일자가 SELECT-LIST에서 TO_CHAR로 가공한 별칭을 가리켜서 → <code>ORDER BY A.주문일자</code>로 바꾼다",
   "인덱스가 내림차순이 아니라서 → DESC 인덱스를 만든다",
   "TO_CHAR 때문에 인덱스를 못 타서 → 함수 기반 인덱스를 만든다",
   "주문일자 조건이 범위라서 → = 조건으로 바꾼다"
  ],
  "ans": 0,
  "exp": "ORDER BY에 쓴 <code>주문일자</code>는 SELECT-LIST의 <b>가공된 별칭</b>을 가리켜요. 그래서 가공된 값 기준 정렬이 필요하다고 보고 SORT ORDER BY가 생겨요. 테이블 컬럼을 명시(<code>A.주문일자</code>)하면 해결돼요.",
  "code": "SELECT TO_CHAR(A.주문일자, 'YYYY-MM-DD') AS 주문일자, A.주문금액\nFROM 주문 A\nWHERE A.주문일자 BETWEEN :d1 AND :d2\nORDER BY 주문일자"
 },
 {
  "n": 27,
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "VARCHAR2 타입 컬럼 <code>생년월일</code>에 인덱스가 있을 때 <code>WHERE 생년월일 = 19821225</code> 의 결과로 알맞은 것은?",
  "choices": [
   "타입이 달라 항상 에러가 난다",
   "날짜형으로 바뀌어 비교한다",
   "숫자 19821225가 문자로 바뀌어 인덱스를 정상 사용한다",
   "생년월일 컬럼이 TO_NUMBER로 가공되어 인덱스 Range Scan을 할 수 없다"
  ],
  "ans": 3,
  "exp": "숫자형과 문자형을 비교하면 오라클은 <b>문자형을 숫자형으로</b> 자동 변환해요. 인덱스 컬럼이 <code>TO_NUMBER(생년월일)</code>로 가공되니 Range Scan을 못 해요. 상수 쪽을 <code>'19821225'</code>처럼 맞춰야 해요."
 },
 {
  "n": 28,
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "자동 형변환 규칙으로 <b>틀린</b> 것은?",
  "choices": [
   "LIKE 연산자는 숫자형 컬럼을 문자형으로 바꿔 비교한다",
   "날짜형 컬럼과 문자 상수를 비교하면 날짜 컬럼이 가공되어 인덱스를 못 쓴다",
   "숫자형 vs 문자형 비교 시 문자형이 숫자형으로 바뀐다",
   "날짜형 vs 문자형 비교 시 문자형이 날짜형으로 바뀐다"
  ],
  "ans": 1,
  "exp": "날짜형 vs 문자형은 <b>문자 상수가 날짜형으로</b> 바뀌어서 날짜 컬럼은 가공되지 않아요. 인덱스를 정상 사용할 수 있어요."
 },
 {
  "n": 29,
  "ch": 2,
  "lv": 1,
  "t": "mc",
  "q": "<b>Unique 인덱스를 = 조건</b>으로 탐색해서 수직적 탐색만으로 데이터를 찾는 스캔 방식은?",
  "choices": [
   "Index Unique Scan",
   "Index Full Scan",
   "Index Skip Scan",
   "Index Range Scan"
  ],
  "ans": 0,
  "exp": "<b>Index Unique Scan</b>은 수직적 탐색만으로 끝나요. Unique 인덱스라도 범위 조건이거나 결합 인덱스 일부 컬럼만 조건이면 Range Scan이에요."
 },
 {
  "n": 30,
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "Index Skip Scan이 효과적인 상황은?",
  "choices": [
   "쿼리에 사용한 모든 컬럼이 인덱스에 있을 때",
   "Unique 인덱스를 = 조건으로 탐색할 때",
   "선두 컬럼의 Distinct Value가 적고 후행 컬럼의 Distinct Value가 많을 때",
   "선두 컬럼의 Distinct Value가 많고 후행 컬럼의 Distinct Value가 적을 때"
  ],
  "ans": 2,
  "exp": "예를 들어 <code>[성별 + 연봉]</code> 인덱스에 <code>연봉</code> 조건만 있으면 성별 값(2개)마다 필요한 리프 블록만 골라 읽을 수 있어요. 선두 컬럼 값 종류가 많으면 건너뛸 블록이 거의 없어요."
 },
 {
  "n": 31,
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "Index Fast Full Scan에 대한 설명으로 <b>틀린</b> 것은?",
  "choices": [
   "병렬 스캔이 가능하다",
   "쿼리에 사용한 모든 컬럼이 인덱스에 있어야 한다",
   "Multiblock I/O로 인덱스 세그먼트 전체를 읽는다",
   "결과 집합의 정렬 순서가 보장된다"
  ],
  "ans": 3,
  "exp": "Fast Full Scan은 트리 구조를 무시하고 <b>물리적으로 저장된 순서</b>대로 읽어서 결과 순서가 보장되지 않아요. 순서가 보장되는 건 Index Full Scan이에요."
 },
 {
  "n": 32,
  "ch": 2,
  "lv": 3,
  "t": "mc",
  "q": "인덱스 <code>[ename + sal]</code>만 있는 EMP 테이블에서 <code>WHERE sal > 9000</code> 조건으로 소수 레코드를 찾을 때 옵티마이저가 선택할 만한 차선책은?",
  "choices": [
   "Index Range Scan",
   "Index Full Scan",
   "Index Range Scan Descending",
   "Index Unique Scan"
  ],
  "ans": 1,
  "exp": "선두 컬럼(ename) 조건이 없어 Range Scan은 불가해요. 테이블보다 인덱스가 훨씬 작고 결과가 소수라면 <b>Index Full Scan</b>으로 리프 전체에서 걸러낸 뒤 테이블을 액세스하는 게 차선책이에요(Skip Scan이 쓰일 수도 있어요)."
 },
 {
  "n": 33,
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "다음 중 SELECT-LIST 가공 때문에 <b>First Row Stopkey가 작동하지 않는</b> 것은? (인덱스: <code>[장비번호 + 변경일자 + 변경순번]</code>, 변경순번은 문자형)",
  "choices": [
   "<code>SELECT MAX(변경순번) ... WHERE 장비번호 = 'C' AND 변경일자 = :d</code>",
   "<code>SELECT NVL(TO_NUMBER(MAX(변경순번)), 0) ... WHERE 장비번호 = 'C' AND 변경일자 = :d</code>",
   "<code>SELECT NVL(MAX(TO_NUMBER(변경순번)), 0) ... WHERE 장비번호 = 'C' AND 변경일자 = :d</code>",
   "<code>SELECT MIN(변경순번) ... WHERE 장비번호 = 'C' AND 변경일자 = :d</code>"
  ],
  "ans": 2,
  "exp": "<code>MAX(TO_NUMBER(변경순번))</code>은 숫자 기준 최대값이라 문자 정렬인 인덱스 순서와 다를 수 있어서 모두 읽어야 해요. <code>NVL(TO_NUMBER(MAX(변경순번)), 0)</code>처럼 가공을 집계 함수 <b>밖으로</b> 빼면 마지막 한 건만 읽어요."
 },
 {
  "n": 34,
  "ch": 2,
  "lv": 2,
  "t": "self",
  "q": "OR 조건 <code>WHERE 고객명 = :nm OR 전화번호 = :tel</code>을 각각 인덱스 Range Scan으로 처리할 수 있도록 SQL을 바꾸세요. (두 컬럼 모두 인덱스 있음, 고객명은 NULL 허용)",
  "answer": "SELECT * FROM 고객 WHERE 고객명 = :nm\nUNION ALL\nSELECT * FROM 고객 WHERE 전화번호 = :tel\nAND (고객명 <> :nm OR 고객명 IS NULL);\n\n-- 또는 옵티마이저에게 맡기기: SELECT /*+ USE_CONCAT */ * FROM 고객 WHERE 고객명 = :nm OR 전화번호 = :tel",
  "kw": [
   "UNION ALL",
   "IS NULL",
   "중복",
   "USE_CONCAT",
   "OR-Expansion"
  ],
  "exp": "OR 조건은 그대로면 인덱스 Range Scan을 못 해요. <b>OR-Expansion</b>처럼 UNION ALL로 나누되, 두 번째 집합에서 첫 번째와 겹치는 레코드를 제거해야 결과가 같아요. 고객명이 NULL일 수 있으면 <code>IS NULL</code>도 포함해야 해요."
 },
 {
  "n": 35,
  "ch": 2,
  "lv": 2,
  "t": "self",
  "q": "인덱스 수평적 탐색을 하는 <b>두 가지 이유</b>를 쓰세요.",
  "answer": "① 조건절을 만족하는 데이터를 모두 찾기 위해(조건을 만족하지 않는 레코드를 만날 때까지 리프를 옆으로 스캔)\n② 인덱스에 없는 컬럼을 읽기 위해 테이블을 액세스하는 데 필요한 ROWID를 얻기 위해",
  "kw": [
   "조건",
   "모두 찾기",
   "ROWID"
  ]
 },
 {
  "n": 36,
  "ch": 2,
  "lv": 3,
  "t": "self",
  "q": "Index Full Scan과 Index Fast Full Scan의 차이를 순서 보장, I/O 방식, 병렬 처리, 조회 가능 컬럼 측면에서 비교하세요.",
  "answer": "Index Full Scan: 인덱스 구조(리프 연결)를 따라 스캔 → 결과 순서 보장, Single Block I/O, (파티션 안 된 인덱스는) 병렬 스캔 불가, 인덱스에 없는 컬럼도 테이블 액세스로 조회 가능.\nIndex Fast Full Scan: 세그먼트를 물리적 순서대로 스캔 → 순서 보장 안 됨, Multiblock I/O, 병렬 스캔 가능, 쿼리의 모든 컬럼이 인덱스에 있어야 함.",
  "kw": [
   "순서",
   "Single Block",
   "Multiblock",
   "병렬",
   "인덱스 컬럼"
  ]
 },
 {
  "n": 37,
  "ch": 3,
  "lv": 1,
  "t": "mc",
  "q": "오라클에서 인덱스 ROWID로 테이블을 액세스하는 비용이 생각보다 큰 이유로 알맞은 것은?",
  "choices": [
   "ROWID는 디스크 상 주소라서, 버퍼캐시에서 블록을 찾으려면 매번 해시 탐색(래치, 체인 스캔)을 해야 하기 때문에",
   "ROWID에는 블록 번호가 없어서 Full Scan을 해야 하기 때문에",
   "ROWID를 읽을 때마다 하드 파싱이 일어나기 때문에",
   "ROWID가 메모리 주소라서 포인터로 바로 찾아가기 때문에"
  ],
  "ans": 0,
  "exp": "ROWID는 DBA+로우 번호라는 <b>논리적 주소</b>예요. 그 블록이 버퍼캐시 어디에 있는지 모르니, 찾아갈 때마다 해시 함수 → 해시 체인 → 버퍼 헤더 순으로 탐색해야 해요. 메인 메모리 DB처럼 포인터로 바로 가지 못해요."
 },
 {
  "n": 38,
  "ch": 3,
  "lv": 1,
  "t": "mc",
  "q": "<b>클러스터링 팩터(CF)</b>에 대한 설명으로 알맞은 것은?",
  "choices": [
   "인덱스의 브랜치 레벨 깊이",
   "테이블의 평균 행 길이",
   "인덱스 리프 블록의 개수",
   "특정 컬럼 기준으로 같은 값을 갖는 데이터가 서로 모여 있는 정도"
  ],
  "ans": 3,
  "exp": "CF가 좋은(군집성이 높은) 인덱스는 인덱스 순서대로 테이블을 읽을 때 같은 블록을 연속해서 읽어서, <b>버퍼 Pinning</b> 덕분에 테이블 액세스 비용이 적어요."
 },
 {
  "n": 39,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "인덱스 ROWID로 테이블을 액세스할 때, 직전에 읽은 블록과 <b>같은 블록</b>을 다시 읽으면 래치·해시 체인 스캔 없이 바로 읽게 해 주는 기능은?",
  "choices": [
   "Direct Path I/O",
   "버퍼 Pinning",
   "Multiblock I/O",
   "Fast Commit"
  ],
  "ans": 1,
  "exp": "<b>버퍼 Pinning</b>은 읽은 블록 버퍼를 고정해 두는 거예요. CF가 좋으면 연속으로 같은 블록을 가리키므로 이 효과로 논리적 I/O가 크게 줄어요."
 },
 {
  "n": 40,
  "ch": 3,
  "lv": 1,
  "t": "mc",
  "q": "인덱스 손익분기점에 대한 설명으로 <b>틀린</b> 것은?",
  "choices": [
   "클러스터링 팩터와 무관하게 항상 10%로 고정된다",
   "인덱스로 읽는 데이터가 일정량을 넘으면 Table Full Scan보다 느려지는 지점이다",
   "일반적으로 5~20% 수준이다",
   "클러스터링 팩터가 나쁘면 손익분기점이 낮아진다"
  ],
  "ans": 0,
  "exp": "손익분기점은 <b>CF에 따라 크게 달라져요</b>. CF가 나쁘면 5% 미만에서도 Full Scan이 낫고, 아주 좋으면 90% 가까이까지 인덱스가 유리할 수 있어요."
 },
 {
  "n": 41,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "인덱스 <code>[deptno + job]</code>으로 <code>WHERE deptno = 30 AND sal >= 2000</code>을 처리했더니 테이블 액세스 후 대부분 버려졌어요. 가장 알맞은 개선은?",
  "choices": [
   "ORDER BY sal 추가",
   "인덱스를 Drop하고 Full Scan",
   "인덱스를 <code>[deptno + job + sal]</code>로 컬럼 추가",
   "<code>[sal]</code> 단일 인덱스를 추가"
  ],
  "ans": 2,
  "exp": "테이블 필터로 많이 버려지면 그 필터 컬럼을 <b>인덱스에 추가</b>해서 인덱스 단계에서 거르게 해요. 기존 인덱스 뒤에 덧붙이면 새 인덱스를 만드는 것보다 DML 부담이 적어요."
 },
 {
  "n": 42,
  "ch": 3,
  "lv": 1,
  "t": "mc",
  "q": "쿼리에서 사용하는 <b>모든 컬럼이 인덱스에 포함</b>되어 있어 테이블 액세스가 전혀 없는 쿼리를 무엇이라 하나요?",
  "choices": [
   "Top N 쿼리",
   "스칼라 서브쿼리",
   "Recursive 쿼리",
   "Covered 쿼리"
  ],
  "ans": 3,
  "exp": "인덱스만 읽고 처리하는 쿼리를 <b>Covered 쿼리</b>라고 해요. 실행계획에서 TABLE ACCESS BY INDEX ROWID가 사라져요."
 },
 {
  "n": 43,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "테이블 자체를 인덱스 구조로 생성해 리프 블록에 모든 컬럼을 저장하는 것은?",
  "choices": [
   "힙 구조 테이블",
   "IOT(Index-Organized Table)",
   "해시 클러스터 테이블",
   "글로벌 임시 테이블"
  ],
  "ans": 1,
  "exp": "<code>ORGANIZATION INDEX</code>로 만드는 <b>IOT</b>는 정렬 상태로 저장해서 테이블 랜덤 액세스가 없어요. 일반 테이블은 랜덤으로 입력하는 힙 구조예요."
 },
 {
  "n": 44,
  "ch": 3,
  "lv": 1,
  "t": "mc",
  "q": "오라클 SQL*Plus의 기본 Array Size는?",
  "choices": [
   "10",
   "15",
   "100",
   "1000"
  ],
  "ans": 1,
  "exp": "SQL*Plus 기본 <b>15</b>건, JDBC 기본 fetchSize는 <b>10</b>건이에요. Fetch Call마다 이만큼씩 나눠 전송하는 것이 부분범위 처리예요."
 },
 {
  "n": 45,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "<b>부분범위 처리</b>가 불가능한 경우는?",
  "choices": [
   "NL 조인으로 한 건씩 결과를 내는 경우",
   "인덱스로 소트를 생략할 수 있는 ORDER BY",
   "ORDER BY 컬럼에 맞는 인덱스가 없어 전체를 정렬해야 하는 경우",
   "정렬 조건이 없는 단순 조회"
  ],
  "ans": 2,
  "exp": "결과를 정렬하려면 <b>전체 데이터를 다 읽어야</b> 해서 첫 건도 늦게 나와요. 인덱스로 정렬을 생략하면 앞에서부터 읽다가 멈출 수 있어요."
 },
 {
  "n": 46,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "인덱스 <code>[C1 + C2 + C3 + C4]</code>에 대해 <code>WHERE C1 = 1 AND C2 BETWEEN 'A' AND 'C' AND C3 = 'X' AND C4 = 10</code>일 때 인덱스 <b>액세스 조건</b>은?",
  "choices": [
   "C1, C2",
   "C1, C2, C3",
   "C1, C2, C3, C4",
   "C1만"
  ],
  "ans": 0,
  "exp": "선행 컬럼이 모두 <b>= 조건인 상태에서 첫 번째 범위 조건까지</b>만 액세스 조건이에요. C2가 첫 범위 조건이므로 C1, C2까지 액세스 조건이고 C3, C4는 인덱스 필터 조건이에요."
 },
 {
  "n": 47,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "실행계획 Predicate Information에서 <code>access(...)</code>로 표시되는 조건의 의미는?",
  "choices": [
   "정렬 기준",
   "조인 순서",
   "테이블에서 최종 결과를 거르는 조건",
   "인덱스 스캔 범위를 결정하는 조건"
  ],
  "ans": 3,
  "exp": "<code>access</code>는 인덱스 <b>스캔 범위를 결정</b>하는 액세스 조건, 인덱스 단계의 <code>filter</code>는 테이블 액세스 여부를 정하는 인덱스 필터 조건, 테이블 단계 filter는 최종 결과를 거르는 테이블 필터 조건이에요."
 },
 {
  "n": 48,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "인덱스를 설계할 때 컬럼 순서에 대한 원칙으로 알맞은 것은?",
  "choices": [
   "범위 조건 컬럼을 앞에, = 조건 컬럼을 뒤에",
   "= 조건 컬럼을 앞에, 범위 조건 컬럼을 뒤에",
   "항상 Distinct 값이 많은 컬럼을 앞에",
   "컬럼 길이가 짧은 것을 앞에"
  ],
  "ans": 1,
  "exp": "범위 조건 뒤에 오는 컬럼은 스캔 범위를 줄이지 못해요. 그래서 <b>= 조건 컬럼을 앞쪽</b>, 범위 조건 컬럼을 뒤쪽에 둬요."
 },
 {
  "n": 49,
  "ch": 3,
  "lv": 3,
  "t": "mc",
  "q": "BETWEEN 조건을 IN-List로 바꿔 효과를 볼 수 있는 상황으로 가장 알맞은 것은?",
  "choices": [
   "범위 조건 컬럼이 인덱스 선두 쪽에 있고, 그 컬럼의 값 종류가 적어서 IN 목록이 짧을 때",
   "IN 목록이 수천 개일 때",
   "범위 조건 컬럼이 인덱스에 없을 때",
   "범위 조건 컬럼이 인덱스 맨 뒤에 있을 때"
  ],
  "ans": 0,
  "exp": "BETWEEN을 IN으로 바꾸면 값마다 = 조건처럼 수직 탐색 후 필요한 범위만 스캔해요. 다만 <b>IN 개수만큼 수직적 탐색이 반복</b>되므로 목록이 짧아야 효과가 있어요."
 },
 {
  "n": 50,
  "ch": 3,
  "lv": 3,
  "t": "mc",
  "q": "인덱스 <code>[고객번호 + 상품ID]</code>에서 <code>WHERE 고객번호 = :c AND 상품ID IN ('A','B','C')</code>일 때, 고객별 가입 상품이 1~2개뿐이라면 어떻게 처리하는 것이 유리할 수 있나요?",
  "choices": [
   "해시 조인으로 바꾼다",
   "IN-List Iterator로 상품ID마다 수직 탐색을 반복한다",
   "상품ID IN 조건을 인덱스 필터로 처리해 고객번호 범위만 한 번 스캔한다",
   "Table Full Scan을 한다"
  ],
  "ans": 2,
  "exp": "고객번호 하나의 레코드는 한 리프 블록에 모여 있어서 한 번만 스캔하며 필터하는 게 수직 탐색 3번보다 나아요. <b>IN 조건은 = 이 아니에요</b>. <code>NUM_INDEX_KEYS(a 인덱스 1)</code> 힌트로 제어할 수 있어요."
 },
 {
  "n": 51,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "<code>판매월 LIKE '2019%'</code>와 <code>판매월 BETWEEN '201901' AND '201912'</code>의 차이로 알맞은 것은?",
  "choices": [
   "BETWEEN은 인덱스를 사용할 수 없다",
   "LIKE는 결과가 틀리게 나온다",
   "두 조건은 항상 같은 범위를 스캔한다",
   "LIKE는 '2019'로 시작하는 값 시작점부터 읽어 BETWEEN보다 넓게 스캔할 수 있다"
  ],
  "ans": 3,
  "exp": "LIKE는 '2019' 같은 값이 있을 수도 있다고 보고 더 앞에서 시작해요. 범위 검색은 <b>BETWEEN</b>이 시작·끝점이 정확해요."
 },
 {
  "n": 52,
  "ch": 3,
  "lv": 3,
  "t": "mc",
  "q": "NULL을 허용하는 컬럼에 옵션 조건을 <code>고객ID LIKE :cust_id || '%'</code>로 처리할 때 생기는 문제는?",
  "choices": [
   "결과가 중복된다",
   "고객ID를 입력하지 않았을 때 고객ID가 NULL인 레코드가 결과에서 빠진다",
   "항상 에러가 발생한다",
   "하드 파싱이 반복된다"
  ],
  "ans": 1,
  "exp": "<code>NULL LIKE '%'</code>는 참이 아니에요. 그래서 조건을 생략하려는 의도인데 <b>NULL 레코드가 누락</b>돼요. 또 숫자형 컬럼이면 자동 형변환으로 인덱스를 못 타요."
 },
 {
  "n": 53,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "<code>WHERE 고객ID = NVL(:cust_id, 고객ID)</code> 패턴에 대한 설명으로 <b>틀린</b> 것은?",
  "choices": [
   "옵티마이저가 OR-Expansion으로 변수 입력 여부에 따라 실행계획을 분기할 수 있다",
   "NULL 허용 컬럼에 쓰면 NULL 레코드가 누락된다",
   "여러 컬럼에 이 패턴을 쓰면 모든 컬럼에 대해 분기가 일어난다",
   "NOT NULL 컬럼에 사용하는 것이 안전하다"
  ],
  "ans": 2,
  "exp": "NVL/DECODE 패턴의 OR-Expansion 분기는 <b>한 컬럼에 대해서만</b> 일어나요. 여러 조건에 쓰면 가장 변별력 좋은 하나만 분기 기준이 되고 나머지는 필터로 처리돼요."
 },
 {
  "n": 54,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "조건절에 PL/SQL 사용자 정의 함수가 있을 때 성능을 높이는 방법으로 가장 알맞은 것은?",
  "choices": [
   "인덱스 액세스 조건으로 대상 레코드를 먼저 최대한 줄여 함수 호출 횟수를 줄인다",
   "힌트로 함수 실행을 막는다",
   "함수 안에서 커밋한다",
   "함수를 SELECT-LIST로 옮긴다"
  ],
  "ans": 0,
  "exp": "함수는 테이블 필터 단계에서 읽은 건수만큼 호출돼요. 효과적인 <b>인덱스 구성</b>으로 함수 호출 전에 대상을 줄이는 게 핵심이에요."
 },
 {
  "n": 55,
  "ch": 3,
  "lv": 1,
  "t": "mc",
  "q": "인덱스 설계 시 <b>가장 중요한 두 가지 선택 기준</b>은?",
  "choices": [
   "① Distinct 값이 많은 컬럼 ② 컬럼 길이가 짧은 컬럼",
   "① PK 컬럼만 ② 날짜 컬럼은 항상 뒤에",
   "① SELECT-LIST 컬럼 ② ORDER BY 컬럼",
   "① 조건절에 항상(자주) 쓰이는 컬럼 선정 ② = 조건으로 자주 조회되는 컬럼을 앞쪽에"
  ],
  "ans": 3,
  "exp": "책에서 강조하는 두 기준이에요. 그 뒤에 수행 빈도, 업무 중요도, CF, 데이터량, DML 부하, 저장 공간 등을 함께 고려해요."
 },
 {
  "n": 56,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "인덱스가 많을 때의 단점이 <b>아닌</b> 것은?",
  "choices": [
   "관리·운영 비용 증가",
   "하드 파싱 증가",
   "DML 성능 저하",
   "데이터베이스 사이즈 증가"
  ],
  "ans": 1,
  "exp": "인덱스가 많으면 INSERT/UPDATE/DELETE 때 모든 인덱스를 유지해야 하고(인덱스 분할 포함), 디스크와 관리 비용이 늘어요. 하드 파싱은 바인드 변수와 관련된 문제예요."
 },
 {
  "n": 57,
  "ch": 3,
  "lv": 3,
  "t": "mc",
  "q": "<code>WHERE 계약ID = :id AND 거래일자 BETWEEN :d1 AND :d2 ORDER BY 시간대, 회사</code>에서 소트 연산을 생략하려면 인덱스를 어떻게 구성해야 하나요?",
  "choices": [
   "<code>[계약ID + 시간대 + 회사 + 거래일자]</code>",
   "<code>[시간대 + 회사 + 계약ID + 거래일자]</code>",
   "<code>[거래일자 + 계약ID + 시간대 + 회사]</code>",
   "<code>[계약ID + 거래일자 + 시간대 + 회사]</code>"
  ],
  "ans": 0,
  "exp": "소트 생략을 위한 순서: <b>= 조건 컬럼 → ORDER BY 컬럼(순서대로) → 나머지 조건 컬럼</b>. 거래일자(범위)가 ORDER BY 컬럼보다 앞에 오면 정렬이 깨져요. 대신 거래일자가 필터가 되는 트레이드오프가 있어요."
 },
 {
  "n": 58,
  "ch": 3,
  "lv": 3,
  "t": "mc",
  "q": "선두 두 컬럼이 모두 = 조건으로 쓰이는 인덱스에서 ‘선택도가 낮은(변별력 좋은) 컬럼을 앞에 둬야 한다’는 주장에 대한 평가로 알맞은 것은?",
  "choices": [
   "선택도는 인덱스 설계와 무관하다",
   "항상 맞다. 선택도 좋은 컬럼이 앞에 있어야 스캔 범위가 줄어든다",
   "= 조건끼리는 순서와 상관없이 수직적 탐색으로 바로 시작점에 도달하므로 스캔 범위가 같다",
   "선택도 나쁜 컬럼을 앞에 두면 Range Scan이 불가능하다"
  ],
  "ans": 2,
  "exp": "결합 인덱스는 일차원으로 정렬돼 있어서 <b>= 조건만으로 구성된</b> 선두 컬럼들은 순서와 무관하게 읽는 블록 수가 같아요. 순서는 어떤 컬럼이 <b>항상</b> 쓰이는지, 범위 조건이 있는지로 정해야 해요."
 },
 {
  "n": 59,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "인덱스 <code>[계약ID + 청약일자]</code>와 <code>[계약ID + 청약일자 + 보험개시일자]</code>가 있을 때 알맞은 판단은?",
  "choices": [
   "뒤 인덱스를 지워야 한다",
   "둘을 합쳐 [청약일자 + 계약ID]로 만든다",
   "두 인덱스 모두 꼭 필요하다",
   "앞의 인덱스는 뒤 인덱스로 대체 가능한 완전 중복이다"
  ],
  "ans": 3,
  "exp": "앞부분 컬럼 구성이 같으면 짧은 쪽은 긴 쪽으로 대체할 수 있는 <b>완전 중복</b>이에요. 지워서 DML 부담을 줄여요."
 },
 {
  "n": 60,
  "ch": 3,
  "lv": 2,
  "t": "self",
  "q": "아래 SQL을 3-Tier 웹 환경에서 부분범위 처리 효과를 얻도록 하려면 무엇이 필요한지 설명하세요. (인덱스: <code>[종목코드 + 거래일시]</code>)",
  "answer": "① 인덱스로 소트를 생략할 수 있어야 한다: WHERE 종목코드 = :cd ORDER BY 거래일시 → 인덱스 [종목코드 + 거래일시] 순서와 같아 SORT ORDER BY 생략.\n② 3-Tier 환경은 Fetch 후 커서를 닫으므로 Top N 쿼리(인라인 뷰 + ROWNUM <= N, 또는 FETCH FIRST N ROWS ONLY)로 필요한 건수만 읽고 멈추게 한다 → 실행계획 COUNT (STOPKEY).",
  "kw": [
   "소트 생략",
   "Top N",
   "ROWNUM",
   "STOPKEY",
   "3-Tier"
  ],
  "code": "SELECT 거래일시, 체결건수, 체결수량\nFROM 종목거래\nWHERE 종목코드 = :cd\nORDER BY 거래일시"
 },
 {
  "n": 61,
  "ch": 3,
  "lv": 3,
  "t": "self",
  "q": "다음 트레이스를 보고 문제점과 개선 방안을 쓰세요.",
  "answer": "인덱스(고객_X1)에서 10,000건을 읽어 테이블을 10,000번 랜덤 액세스했지만, 테이블 필터 조건(지역 = '서울')으로 대부분 버려지고 50건만 남았다. 테이블 랜덤 액세스 비효율이 크다.\n개선: 테이블 필터로 쓰인 컬럼(지역)을 인덱스에 추가해 [가입일자 + 지역] 또는 지역 = 조건이 앞에 오도록 [지역 + 가입일자]로 구성하면 인덱스 단계에서 걸러 테이블 액세스를 50건 수준으로 줄일 수 있다(= 조건 컬럼을 앞에 두면 스캔 범위도 줄어든다).",
  "kw": [
   "테이블 필터",
   "랜덤 액세스",
   "인덱스",
   "컬럼 추가",
   "지역"
  ],
  "code": "Rows   Row Source Operation\n------ --------------------------------------------------\n    50 TABLE ACCESS BY INDEX ROWID 고객 (cr=10120)\n 10000   INDEX RANGE SCAN 고객_X1 (cr=40)\n\n-- 고객_X1 : [가입일자]\n-- WHERE 가입일자 BETWEEN :d1 AND :d2 AND 지역 = '서울'"
 },
 {
  "n": 62,
  "ch": 3,
  "lv": 3,
  "t": "self",
  "q": "옵션 조건을 처리하는 방식 중 ‘OR 조건’, ‘LIKE/BETWEEN’, ‘UNION ALL’, ‘Dynamic SQL’의 장단점을 각각 한 줄씩 쓰세요.",
  "answer": "OR 조건(:v IS NULL OR col = :v): 간단하지만 인덱스 액세스 조건으로 쓸 수 없다(필터로만).\nLIKE/BETWEEN: 편하지만 선두 컬럼이면 값이 없을 때 넓게 스캔, NULL 허용 컬럼은 누락, 숫자 컬럼은 형변환으로 인덱스 못 탐.\nUNION ALL: 변수 입력 여부로 분기해 각각 최적 인덱스를 쓰지만 SQL이 길어진다.\nDynamic SQL: 입력된 조건만 붙여 가장 정확하지만 바인드 변수를 반드시 써야 하고 SQL 종류가 늘어난다.",
  "kw": [
   "액세스 조건",
   "NULL",
   "형변환",
   "UNION ALL",
   "바인드 변수"
  ]
 },
 {
  "n": 63,
  "ch": 4,
  "lv": 1,
  "t": "mc",
  "q": "NL 조인에서 <b>반드시</b> 인덱스가 필요한 곳은?",
  "choices": [
   "Outer 테이블의 조인 컬럼",
   "Inner 테이블의 조인 컬럼",
   "Outer 테이블의 PK",
   "SELECT-LIST 컬럼"
  ],
  "ans": 1,
  "exp": "Inner 쪽은 Outer 레코드마다 반복 탐색돼요. 조인 컬럼에 인덱스가 없으면 Outer 건수만큼 <b>Full Scan을 반복</b>해요."
 },
 {
  "n": 64,
  "ch": 4,
  "lv": 1,
  "t": "mc",
  "q": "<code>/*+ ORDERED USE_NL(c) */ ... FROM 사원 e, 고객 c</code> 힌트의 의미는?",
  "choices": [
   "조인 순서는 옵티마이저가 정하고 c만 인덱스 사용",
   "고객을 먼저 읽고 사원을 NL 조인으로",
   "사원을 먼저 읽고 고객을 Inner로 NL 조인",
   "사원과 고객을 해시 조인"
  ],
  "ans": 2,
  "exp": "<code>ORDERED</code>는 FROM 절 순서대로(사원 → 고객), <code>USE_NL(c)</code>는 <b>c를 Inner로</b> NL 조인하라는 뜻이에요."
 },
 {
  "n": 65,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "NL 조인의 특징으로 <b>틀린</b> 것은?",
  "choices": [
   "PGA에 해시 테이블을 만들어 조인한다",
   "랜덤 액세스 위주라 대량 데이터 조인에 불리하다",
   "한 레코드씩 순차 진행해 부분범위 처리가 가능하다",
   "인덱스 구성 전략이 특히 중요하다"
  ],
  "ans": 0,
  "exp": "해시 테이블을 만드는 건 <b>해시 조인</b>이에요. NL 조인은 소량 데이터나 부분범위 처리가 가능한 OLTP에 적합해요."
 },
 {
  "n": 66,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "NL 조인 실행계획에서 <code>TABLE ACCESS BY INDEX ROWID</code>(Inner 테이블)가 <code>NESTED LOOPS</code> <b>위쪽</b>으로 올라가 표시되는 것은 어떤 기능 때문인가요?",
  "choices": [
   "Index Skip Scan",
   "조인 조건 Pushdown",
   "배치 I/O",
   "테이블 Prefetch"
  ],
  "ans": 3,
  "exp": "<b>테이블 Prefetch</b>(9i~)는 Inner 테이블 블록을 곧 읽을 것까지 미리 적재해요. 11g의 <b>배치 I/O</b>는 NESTED LOOPS가 두 번 나타나요."
 },
 {
  "n": 67,
  "ch": 4,
  "lv": 3,
  "t": "mc",
  "q": "NL 조인 배치 I/O(<code>NLJ_BATCHING</code>) 사용 시 주의할 점은?",
  "choices": [
   "Inner 인덱스를 사용할 수 없다",
   "일부 블록을 디스크에서 읽으면 결과 순서가 Outer 순서와 달라질 수 있으므로 정렬이 필요하면 ORDER BY를 명시한다",
   "항상 Full Scan으로 바뀐다",
   "커밋이 자동으로 일어난다"
  ],
  "ans": 1,
  "exp": "배치 I/O는 ROWID를 모아 블록 단위로 읽어서, 디스크 I/O가 생기면 <b>결과 순서가 바뀔 수</b> 있어요. 정렬을 기대하면 ORDER BY를 꼭 써야 해요."
 },
 {
  "n": 68,
  "ch": 4,
  "lv": 1,
  "t": "mc",
  "q": "소트 머지 조인과 해시 조인이 빠른 이유로 공통적인 것은?",
  "choices": [
   "PGA(Sort Area, Hash Area)를 활용해 래치 없이 빠르게 처리해서",
   "Direct Path I/O만 사용해서",
   "Undo를 만들지 않아서",
   "조인 컬럼에 Unique 인덱스가 꼭 있어야 해서"
  ],
  "ans": 0,
  "exp": "<b>PGA</b>는 프로세스 전용 메모리라 SGA 버퍼캐시처럼 래치를 얻을 필요가 없어요."
 },
 {
  "n": 69,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "해시 조인으로 처리할 수 <b>없어</b> 소트 머지 조인이 쓰이는 경우는?",
  "choices": [
   "양쪽 다 Full Scan인 경우",
   "병렬 처리하는 경우",
   "조인 조건이 = 이 아닌 범위 조건인 대량 데이터 조인",
   "Build Input이 작은 경우"
  ],
  "ans": 2,
  "exp": "해시 조인은 <b>= 조건</b>에서만 가능해요. 비등치 조인이나 조인 조건이 없는 카테시안 곱(MERGE JOIN CARTESIAN)은 소트 머지 조인으로 처리해요."
 },
 {
  "n": 70,
  "ch": 4,
  "lv": 1,
  "t": "mc",
  "q": "해시 조인에서 해시 테이블을 만드는 쪽을 무엇이라 하나요?",
  "choices": [
   "Driving Table",
   "Inner Table",
   "Probe Input",
   "Build Input"
  ],
  "ans": 3,
  "exp": "<b>Build Input</b>으로 해시 테이블을 만들고, <b>Probe Input</b>을 읽으며 해시 테이블을 탐색해요. Build Input이 Hash Area에 담길 만큼 작을수록 유리해요."
 },
 {
  "n": 71,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "<code>/*+ LEADING(e) USE_HASH(c) */ ... FROM 사원 e, 고객 c</code>에서 Build Input은?",
  "choices": [
   "둘 다",
   "사원(e)",
   "고객(c)",
   "옵티마이저가 항상 큰 쪽을 선택"
  ],
  "ans": 1,
  "exp": "LEADING/ORDERED로 지정한 <b>첫 테이블이 Build Input</b>(실행계획에서 위쪽)이 돼요. 바꾸려면 <code>SWAP_JOIN_INPUTS(c)</code>를 써요."
 },
 {
  "n": 72,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "Build Input이 Hash Area에 담기지 않을 만큼 클 때 해시 조인이 처리하는 방식은?",
  "choices": [
   "Build Input을 정렬한 뒤 머지",
   "NL 조인으로 자동 전환",
   "양쪽을 해시 값 기준으로 파티션으로 나눈 뒤, 짝(Pair)마다 해시 조인",
   "에러 발생"
  ],
  "ans": 2,
  "exp": "<b>분할·정복</b> 방식이에요. 파티션 단계에서 양쪽을 같은 해시 함수로 나눠 Temp에 저장하고, 조인 단계에서 파티션 짝별로 작은 쪽으로 해시 테이블을 만들어 조인해요."
 },
 {
  "n": 73,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "수행 빈도가 매우 높은 OLTP 쿼리에서 NL 조인과 해시 조인 성능이 비슷하다면?",
  "choices": [
   "NL 조인을 선택한다",
   "소트 머지 조인을 선택한다",
   "아무거나 상관없다",
   "해시 조인을 선택한다"
  ],
  "ans": 0,
  "exp": "해시 테이블은 <b>쿼리 하나를 위해 만들고 바로 소멸</b>해서 자주 실행하면 CPU·메모리 부담과 래치 경합이 커요. NL 조인이 쓰는 인덱스는 영구적으로 공유돼요. 해시 조인이 <b>매우</b> 빠를 때만 해시 조인을 써요."
 },
 {
  "n": 74,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "Unnesting 되지 않은 서브쿼리를 처리하는 <b>필터 오퍼레이션</b>의 특징이 <b>아닌</b> 것은?",
  "choices": [
   "메인쿼리 한 건이 조인에 성공하면 다음 로우로 넘어간다",
   "서브쿼리 입력 값별 결과를 캐싱한다",
   "메인쿼리가 항상 드라이빙 집합이 된다",
   "서브쿼리 집합을 먼저 읽어 드라이빙할 수 있다"
  ],
  "ans": 3,
  "exp": "필터 오퍼레이션은 메인쿼리에 종속돼 <b>조인 순서가 고정</b>돼요. 서브쿼리를 먼저 드라이빙하려면 Unnesting이 필요해요."
 },
 {
  "n": 75,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "서브쿼리 안에 <code>AND ROWNUM <= 1</code>을 넣었을 때 생길 수 있는 부작용은?",
  "choices": [
   "결과가 틀려진다",
   "서브쿼리 Unnesting이 막혀서 해시 세미조인 같은 좋은 실행계획을 쓸 수 없다",
   "하드 파싱이 반복된다",
   "Direct Path I/O가 발생한다"
  ],
  "ans": 1,
  "exp": "ROWNUM은 <b>Unnesting을 방지</b>하는 효과가 있어요. EXISTS는 원래 하나만 찾으면 멈추니 ROWNUM을 넣을 필요가 없어요. 잘 쓰면 약, 잘못 쓰면 독이에요."
 },
 {
  "n": 76,
  "ch": 4,
  "lv": 3,
  "t": "mc",
  "q": "<code>PUSH_SUBQ</code> 힌트에 대한 설명으로 알맞은 것은?",
  "choices": [
   "Unnesting 되지 않은 서브쿼리 필터를 실행계획의 앞 단계로 당겨서 처리한다. NO_UNNEST와 함께 쓴다",
   "뷰 안으로 조인 조건을 밀어 넣는다",
   "서브쿼리 결과를 캐시에 저장하지 않는다",
   "서브쿼리를 메인쿼리와 같은 레벨로 푼다"
  ],
  "ans": 0,
  "exp": "필터 서브쿼리는 기본적으로 마지막 단계에서 처리돼요. <b>Pushing</b>하면 불필요한 조인을 하기 전에 걸러요. Unnesting된 서브쿼리에는 작동하지 않으므로 <code>NO_UNNEST PUSH_SUBQ</code>를 함께 써요."
 },
 {
  "n": 77,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "메인쿼리를 실행하면서 조인 조건 값을 건건이 인라인 뷰 안으로 밀어 넣어, 뷰를 머징하지 않고도 필요한 데이터만 읽게 하는 기능과 실행계획 표시는?",
  "choices": [
   "OR-Expansion / CONCATENATION",
   "뷰 머징 / VIEW",
   "조인 조건 Pushdown / VIEW PUSHED PREDICATE",
   "서브쿼리 Pushing / FILTER"
  ],
  "ans": 2,
  "exp": "<b>조인 조건 Pushdown</b>(<code>PUSH_PRED</code>)은 GROUP BY 인라인 뷰에서 특히 유용해요. 부분범위 처리도 가능해져요."
 },
 {
  "n": 78,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "뷰 머징(View Merging)에 대한 설명으로 <b>틀린</b> 것은?",
  "choices": [
   "NO_MERGE 힌트로 막을 수 있다",
   "인라인 뷰를 메인쿼리와 합쳐 하나의 쿼리 블록으로 최적화한다",
   "머징하면 조인을 먼저 하고 나중에 GROUP BY할 수 있다",
   "머징은 항상 성능이 좋아진다"
  ],
  "ans": 3,
  "exp": "머징하면 조인에 성공한 전체 데이터를 GROUP BY해야 해서 대상이 많으면 오히려 느려질 수 있어요. 상황에 따라 <b>MERGE/NO_MERGE</b>를 판단해요."
 },
 {
  "n": 79,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "스칼라 서브쿼리 캐싱 효과가 <b>떨어지는</b> 경우는?",
  "choices": [
   "입력 값의 종류가 적을 때",
   "입력 값이 거의 모두 다를 때(예: 고객번호별)",
   "같은 함수를 여러 번 호출할 때",
   "코드성 테이블을 조회할 때"
  ],
  "ans": 1,
  "exp": "캐시 공간이 작아서 입력 값 종류가 많으면 캐시 확인 비용만 늘어 <b>오히려 느려져요</b>. 입력 값 종류가 적을 때(코드명 조회 등) 효과적이에요."
 },
 {
  "n": 80,
  "ch": 4,
  "lv": 3,
  "t": "mc",
  "q": "12c부터 스칼라 서브쿼리를 조인으로 변환하는 기능이 원치 않게 작동해 느려졌을 때 쓰는 힌트는?",
  "choices": [
   "MERGE",
   "UNNEST",
   "NO_UNNEST",
   "PUSH_PRED"
  ],
  "ans": 2,
  "exp": "스칼라 서브쿼리 Unnesting(<code>_optimizer_unnest_scalar_sq</code>)을 막으려면 서브쿼리에 <b>NO_UNNEST</b>를 써요."
 },
 {
  "n": 81,
  "ch": 4,
  "lv": 2,
  "t": "self",
  "q": "조인 메소드 선택 기준을 데이터량·조인 조건·수행 빈도 관점에서 정리하세요.",
  "answer": "① 소량 데이터 조인 → NL 조인\n② 대량 데이터 조인 → 해시 조인\n③ 대량 데이터인데 조인 조건이 = 이 아니거나(범위) 조인 조건이 없을 때 → 소트 머지 조인\n④ 수행 빈도가 매우 높은 쿼리는 NL과 해시 성능이 비슷하거나 해시가 약간 빨라도 NL 조인, 해시가 매우 빠를 때만 해시 조인(해시 테이블은 쿼리마다 생성·소멸해 CPU·메모리 부담).",
  "kw": [
   "소량",
   "NL",
   "대량",
   "해시",
   "소트 머지",
   "수행 빈도"
  ]
 },
 {
  "n": 82,
  "ch": 4,
  "lv": 3,
  "t": "self",
  "q": "다음 트레이스를 보고 NL 조인의 비효율 지점을 찾아 개선 방안을 쓰세요.",
  "answer": "사원_X1으로 2,780건을 읽어 사원 테이블을 액세스했는데 부서코드 필터로 3건만 남았다(Outer 테이블 필터 비효율). 개선: 사원_X1에 부서코드를 추가해 [입사일자 + 부서코드] 또는 = 조건을 앞에 둔 [부서코드 + 입사일자]로 구성하면 인덱스 단계에서 걸러져 사원 테이블 랜덤 액세스가 3건 수준으로 준다. 이후 고객 쪽(Inner) 조인 횟수도 3회로 유지된다.",
  "kw": [
   "사원_X1",
   "부서코드",
   "인덱스",
   "추가",
   "테이블 필터"
  ],
  "code": "Rows  Row Source Operation\n----  -------------------------------------------\n   5  NESTED LOOPS (cr=2732)\n   3    TABLE ACCESS BY INDEX ROWID 사원 (cr=2627)\n2780      INDEX RANGE SCAN 사원_X1 (cr=6)\n   5    TABLE ACCESS BY INDEX ROWID 고객 (cr=105)\n   8      INDEX RANGE SCAN 고객_X1 (cr=102)\n\n-- 사원_X1 : [입사일자]\n-- WHERE e.입사일자 >= '19960101' AND e.부서코드 = 'Z123'\n--   AND c.관리사원번호 = e.사원번호 AND c.최종주문금액 >= 20000"
 },
 {
  "n": 83,
  "ch": 4,
  "lv": 3,
  "t": "self",
  "q": "서브쿼리를 Unnesting 해서 서브쿼리 쪽 집합을 먼저 드라이빙할 때, 결과가 중복되지 않도록 옵티마이저가 하는 처리를 설명하세요.",
  "answer": "서브쿼리를 드라이빙해 메인쿼리와 일반 조인하면 서브쿼리 쪽(M쪽) 값이 중복될 때 메인쿼리 레코드가 중복 출력될 수 있다. 그래서 옵티마이저는 서브쿼리 결과를 SORT UNIQUE 또는 HASH UNIQUE로 중복 제거한 뒤 조인하거나(조인 컬럼이 Unique 인덱스로 보장되면 생략), 세미조인 방식으로 처리한다.",
  "kw": [
   "중복",
   "SORT UNIQUE",
   "HASH UNIQUE",
   "세미조인",
   "Unique"
  ]
 },
 {
  "n": 84,
  "ch": 4,
  "lv": 2,
  "t": "self",
  "q": "아래 SQL에 힌트를 넣어 고객을 Build Input으로, 주문을 Probe Input으로 하는 해시 조인이 되게 하세요.",
  "answer": "SELECT /*+ LEADING(c) USE_HASH(o) */ c.고객명, o.주문금액\nFROM 고객 c, 주문 o\nWHERE o.고객번호 = c.고객번호\nAND o.주문일자 >= :dt;\n\n-- 또는 /*+ USE_HASH(c o) SWAP_JOIN_INPUTS(c) */",
  "kw": [
   "LEADING(c)",
   "USE_HASH(o)",
   "SWAP_JOIN_INPUTS"
  ],
  "code": "SELECT c.고객명, o.주문금액\nFROM 고객 c, 주문 o\nWHERE o.고객번호 = c.고객번호\nAND o.주문일자 >= :dt"
 },
 {
  "n": 85,
  "ch": 5,
  "lv": 1,
  "t": "mc",
  "q": "소트 연산이 Sort Area 안에서 끝나지 않아 Temp 테이블스페이스까지 사용하는 것은?",
  "choices": [
   "디스크 소트",
   "Top N 소트",
   "Sort Aggregate",
   "메모리 소트"
  ],
  "ans": 0,
  "exp": "<b>디스크 소트</b>(To-Disk, External Sort)는 Sort Run을 Temp에 저장했다가 머지해서 성능이 크게 떨어져요."
 },
 {
  "n": 86,
  "ch": 5,
  "lv": 1,
  "t": "mc",
  "q": "이름은 Sort지만 실제로 데이터를 <b>정렬하지 않는</b> 오퍼레이션은?",
  "choices": [
   "Sort Unique",
   "Sort Join",
   "Sort Order By",
   "Sort Aggregate"
  ],
  "ans": 3,
  "exp": "<b>Sort Aggregate</b>는 전체 로우를 대상으로 SUM, MAX 같은 집계를 할 때 값을 하나씩 누적할 뿐 정렬하지 않아요."
 },
 {
  "n": 87,
  "ch": 5,
  "lv": 2,
  "t": "mc",
  "q": "다음 중 연산과 소트 오퍼레이션의 짝이 <b>틀린</b> 것은?",
  "choices": [
   "윈도우 함수 → Window Sort",
   "UNION ALL → Sort Unique",
   "UNION → Sort Unique",
   "소트 머지 조인 → Sort Join"
  ],
  "ans": 1,
  "exp": "<b>UNION ALL</b>은 중복 확인 없이 결합만 해서 소트가 없어요. UNION, MINUS, INTERSECT, DISTINCT가 Sort Unique(또는 Hash Unique)를 일으켜요."
 },
 {
  "n": 88,
  "ch": 5,
  "lv": 2,
  "t": "mc",
  "q": "<code>SELECT deptno, SUM(sal) FROM emp GROUP BY deptno</code>의 결과에 대한 설명으로 알맞은 것은?",
  "choices": [
   "Hash Group By로 처리될 수 있어 정렬이 보장되지 않으므로, 정렬이 필요하면 ORDER BY를 명시해야 한다",
   "GROUP BY는 항상 디스크 소트를 일으킨다",
   "GROUP BY는 Sort Aggregate로만 처리된다",
   "항상 deptno 순으로 정렬되어 나온다"
  ],
  "ans": 0,
  "exp": "10gR2부터 ORDER BY가 없으면 <b>Hash Group By</b>를 쓸 수 있어 순서가 보장되지 않아요. Sort Group By라도 정렬을 보장하지 않으니 <b>ORDER BY를 명시</b>하세요."
 },
 {
  "n": 89,
  "ch": 5,
  "lv": 1,
  "t": "mc",
  "q": "두 집합이 서로 겹치지 않는(상호배타적) 경우 UNION 대신 써야 하는 것은?",
  "choices": [
   "INTERSECT",
   "DISTINCT",
   "UNION ALL",
   "MINUS"
  ],
  "ans": 2,
  "exp": "상호배타적이면 중복이 없으니 <b>UNION ALL</b>로 Sort Unique를 없애요."
 },
 {
  "n": 90,
  "ch": 5,
  "lv": 2,
  "t": "mc",
  "q": "두 조건이 겹칠 수 있는 UNION을 UNION ALL로 바꿀 때 결과가 같도록 하는 방법은?",
  "choices": [
   "ORDER BY를 추가한다",
   "DISTINCT를 바깥에 감싼다",
   "UNION ALL로 그대로 바꾼다",
   "두 번째 집합에 첫 번째 조건을 배제하는 조건(필요시 LNNVL)을 추가한다"
  ],
  "ans": 3,
  "exp": "겹치는 레코드를 한쪽에서 빼면 돼요. 예: <code>AND 결제일자 <> :dt</code>, 결제일자가 NULL 허용이면 <code>AND (결제일자 <> :dt OR 결제일자 IS NULL)</code> 또는 <code>LNNVL(결제일자 = :dt)</code>."
 },
 {
  "n": 91,
  "ch": 5,
  "lv": 2,
  "t": "mc",
  "q": "DISTINCT를 EXISTS 서브쿼리로 바꿨을 때의 장점이 <b>아닌</b> 것은?",
  "choices": [
   "부분범위 처리가 가능해진다",
   "항상 해시 조인으로 바뀐다",
   "Sort Unique / Hash Unique가 사라진다",
   "조건에 맞는 첫 레코드를 찾으면 멈춘다"
  ],
  "ans": 1,
  "exp": "EXISTS는 존재 여부만 확인하고 멈춰서 소트 없이 부분범위 처리가 가능해요. 조인 방식이 항상 해시로 바뀌는 건 아니에요."
 },
 {
  "n": 92,
  "ch": 5,
  "lv": 2,
  "t": "mc",
  "q": "인덱스로 소트를 생략할 수 있는데 해시 조인 때문에 SORT ORDER BY가 생겼어요. 소트를 생략하려면?",
  "choices": [
   "병렬 처리한다",
   "UNION ALL로 바꾼다",
   "정렬 기준 테이블을 드라이빙하는 NL 조인으로 바꾼다",
   "DISTINCT를 추가한다"
  ],
  "ans": 2,
  "exp": "<b>NL 조인</b>은 드라이빙 테이블을 인덱스 순서대로 읽으며 한 건씩 조인해서 결과 순서가 유지돼요."
 },
 {
  "n": 93,
  "ch": 5,
  "lv": 1,
  "t": "mc",
  "q": "인덱스로 소트를 생략한 Top N 쿼리의 실행계획에 나타나는 오퍼레이션은?",
  "choices": [
   "COUNT (STOPKEY)",
   "HASH GROUP BY",
   "SORT UNIQUE",
   "SORT ORDER BY"
  ],
  "ans": 0,
  "exp": "<b>COUNT (STOPKEY)</b>는 ROWNUM으로 지정한 건수에 도달하면 바로 멈춰요(Top N Stopkey 알고리즘)."
 },
 {
  "n": 94,
  "ch": 5,
  "lv": 2,
  "t": "mc",
  "q": "다음 중 Top N Stopkey가 작동하는 <b>올바른 페이징</b> 쿼리 구조는?",
  "choices": [
   "바깥쪽에서 NO BETWEEN 시작 AND 끝으로 한 번에",
   "ORDER BY 없이 WHERE ROWNUM <= 10",
   "ROWNUM 조건 없이 FETCH 후 애플리케이션에서 자르기",
   "안쪽에서 ROWNUM <= :page*10, 바깥쪽에서 NO >= 시작번호"
  ],
  "ans": 3,
  "exp": "ROWNUM 조건을 <b>안쪽</b>에 둬야 STOPKEY가 작동해요. 바깥쪽에서 BETWEEN으로 한 번에 자르는 건 전체를 읽는 <b>ANTI 패턴</b>이에요."
 },
 {
  "n": 95,
  "ch": 5,
  "lv": 3,
  "t": "mc",
  "q": "인덱스가 <code>[종목코드 + 거래일시]</code>인데 Top N 쿼리 실행계획에 <code>SORT ORDER BY STOPKEY</code>가 나타났다면 가장 가능성 높은 원인은?",
  "choices": [
   "ROWNUM 조건을 안쪽에 써서",
   "ORDER BY가 인덱스 순서와 달라(예: 다른 컬럼 추가, 가공) 소트를 생략하지 못해서",
   "Array Size가 작아서",
   "통계정보가 최신이라서"
  ],
  "ans": 1,
  "exp": "SORT ORDER BY STOPKEY는 <b>Top N 소트 알고리즘</b>이에요. 정렬 부하는 줄었지만 대상 전체를 읽어야 해요. 인덱스로 소트를 생략할 수 있게 ORDER BY·조건절을 고쳐야 부분범위 처리가 돼요."
 },
 {
  "n": 96,
  "ch": 5,
  "lv": 2,
  "t": "mc",
  "q": "인덱스 <code>[DEPTNO + MGR + SAL]</code>에서 <code>SELECT MAX(SAL) FROM EMP WHERE DEPTNO = 30 AND MGR = 7698</code>의 실행계획으로 알맞은 것은?",
  "choices": [
   "FIRST ROW + INDEX RANGE SCAN (MIN/MAX)",
   "INDEX FAST FULL SCAN + HASH GROUP BY",
   "SORT ORDER BY STOPKEY",
   "TABLE ACCESS FULL + SORT AGGREGATE"
  ],
  "ans": 0,
  "exp": "조건절 컬럼과 MAX 인자 컬럼이 모두 인덱스에 있고 = 조건이 앞에 있어서 해당 범위 맨 뒤 <b>한 건만</b> 읽어요(First Row Stopkey)."
 },
 {
  "n": 97,
  "ch": 5,
  "lv": 3,
  "t": "mc",
  "q": "이력 테이블에서 장비별 최종 이력을 <code>SUBSTR(MAX(변경일자 || 변경순번), 9)</code>로 구했더니 느려졌어요. 이유는?",
  "choices": [
   "문자 결합이 Undo를 만들어서",
   "MAX를 쓰면 항상 Full Scan이라서",
   "컬럼을 결합·가공해서 인덱스 정렬 순서를 그대로 쓸 수 없어 First Row Stopkey가 작동하지 않아서",
   "SUBSTR이 PL/SQL 함수라서"
  ],
  "ans": 2,
  "exp": "가공한 값의 MAX는 인덱스 순서와 같다고 옵티마이저가 보장하지 못해 <b>해당 장비의 이력을 모두</b> 읽어요. INDEX_DESC + ROWNUM <= 1 또는 Top N 형태로 바꿔요."
 },
 {
  "n": 98,
  "ch": 5,
  "lv": 2,
  "t": "mc",
  "q": "<code>GROUP BY region</code> 쿼리에서 <code>[region]</code> 인덱스를 이용해 그룹핑 연산을 생략했을 때 실행계획 표시는?",
  "choices": [
   "SORT AGGREGATE",
   "WINDOW SORT",
   "HASH GROUP BY",
   "SORT GROUP BY NOSORT"
  ],
  "ans": 3,
  "exp": "인덱스를 차례로 읽으며 그룹별로 집계하는 <b>SORT GROUP BY NOSORT</b>예요. 그룹 하나가 끝나면 바로 출력할 수 있어 부분범위 처리가 가능해요."
 },
 {
  "n": 99,
  "ch": 5,
  "lv": 2,
  "t": "mc",
  "q": "Sort Area를 적게 사용하는 SQL 작성법으로 알맞은 것은?",
  "choices": [
   "가공한 결과를 정렬한다",
   "정렬을 먼저 하고 바깥에서 가공한다",
   "SELECT *로 모든 컬럼을 정렬한다",
   "정렬 컬럼을 문자열로 결합한다"
  ],
  "ans": 1,
  "exp": "가공된 긴 문자열 대신 <b>가공 전 데이터를 정렬</b>하고, SELECT-LIST에 <b>필요한 컬럼만</b> 두면 Sort Area 사용량이 줄어요."
 },
 {
  "n": 100,
  "ch": 5,
  "lv": 3,
  "t": "mc",
  "q": "윈도우 함수 중 <b>Top N 소트 알고리즘</b>이 작동해 <code>WINDOW SORT PUSHED RANK</code>로 처리될 수 있는 것은?",
  "choices": [
   "MAX() OVER",
   "SUM() OVER",
   "RANK() / ROW_NUMBER() OVER + 바깥에서 순위 조건",
   "AVG() OVER"
  ],
  "ans": 2,
  "exp": "<b>RANK, ROW_NUMBER</b>로 순위를 매기고 바깥에서 <code>= 1</code> 같은 조건을 주면 상위 N개만 유지하며 정렬해 소트 부하가 적어요. MAX OVER는 전체를 정렬해요."
 },
 {
  "n": 101,
  "ch": 5,
  "lv": 2,
  "t": "self",
  "q": "다음 페이징 SQL의 문제점을 설명하고 Top N Stopkey가 작동하도록 고치세요.",
  "answer": "문제: ROWNUM 조건이 바깥쪽 BETWEEN에만 있어 COUNT STOPKEY가 작동하지 않는다. 앞 페이지만 볼 때도 조건을 만족하는 전체 데이터를 읽는다.\n\nSELECT *\nFROM (SELECT ROWNUM NO, a.*\n      FROM (SELECT 거래일시, 체결건수, 체결수량\n            FROM 종목거래\n            WHERE 종목코드 = :cd\n            ORDER BY 거래일시) a\n      WHERE ROWNUM <= (:page * 10))\nWHERE NO >= (:page - 1) * 10 + 1;",
  "kw": [
   "ROWNUM <=",
   "안쪽",
   "STOPKEY",
   "NO >="
  ],
  "code": "SELECT *\nFROM (SELECT ROWNUM NO, a.*\n      FROM (SELECT 거래일시, 체결건수, 체결수량\n            FROM 종목거래\n            WHERE 종목코드 = :cd\n            ORDER BY 거래일시) a)\nWHERE NO BETWEEN (:page - 1) * 10 + 1 AND (:page * 10)"
 },
 {
  "n": 102,
  "ch": 5,
  "lv": 2,
  "t": "self",
  "q": "상품 중 계약이 한 건이라도 있는 상품만 조회하는 아래 SQL을 소트 없이 부분범위 처리가 가능하도록 바꾸세요.",
  "answer": "SELECT p.상품번호, p.상품명, p.상품가격\nFROM 상품 p\nWHERE p.상품유형코드 = :pclscd\nAND EXISTS (SELECT 'x' FROM 계약 c\n            WHERE c.상품번호 = p.상품번호\n            AND c.계약일자 BETWEEN :dt1 AND :dt2);",
  "kw": [
   "EXISTS",
   "DISTINCT",
   "상품번호"
  ],
  "code": "SELECT DISTINCT p.상품번호, p.상품명, p.상품가격\nFROM 상품 p, 계약 c\nWHERE p.상품유형코드 = :pclscd\nAND c.상품번호 = p.상품번호\nAND c.계약일자 BETWEEN :dt1 AND :dt2"
 },
 {
  "n": 103,
  "ch": 5,
  "lv": 3,
  "t": "self",
  "q": "장비별 최종 상태 이력을 조회할 때 (A) 소수 장비만 조회하는 경우와 (B) 전체 장비를 조회하는 경우에 각각 적합한 방식을 쓰세요. (인덱스: 상태변경이력_PK [장비번호 + 변경일자 + 변경순번])",
  "answer": "(A) 소수 장비: 장비마다 PK 인덱스를 역순으로 한 건만 읽고 멈추는 방식이 유리 → 스칼라 서브쿼리 안에서 INDEX_DESC 힌트 + ROWNUM <= 1, 또는 12c 이상이면 인라인 뷰 ORDER BY 변경일자 DESC, 변경순번 DESC + ROWNUM <= 1(Top N). First Row Stopkey 효과.\n(B) 전체 장비: 장비마다 인덱스를 랜덤 액세스하면 비효율 → 이력 테이블을 Full Scan 하면서 윈도우 함수 ROW_NUMBER() OVER(PARTITION BY 장비번호 ORDER BY 변경일자 DESC, 변경순번 DESC) = 1 (또는 RANK)로 처리. WINDOW SORT PUSHED RANK로 소트 부하도 줄어든다.",
  "kw": [
   "INDEX_DESC",
   "ROWNUM",
   "Top N",
   "Full Scan",
   "ROW_NUMBER",
   "PARTITION BY"
  ]
 },
 {
  "n": 104,
  "ch": 6,
  "lv": 1,
  "t": "mc",
  "q": "UPDATE 문이 인덱스에 미치는 영향으로 알맞은 것은?",
  "choices": [
   "변경된 인덱스 컬럼에 대해 인덱스 레코드 삭제 + 삽입 두 개의 오퍼레이션이 발생한다",
   "인덱스 레코드만 그 자리에서 값이 바뀐다",
   "인덱스가 자동으로 Unusable 된다",
   "인덱스는 변경되지 않는다"
  ],
  "ans": 0,
  "exp": "인덱스는 정렬 상태를 유지해야 해서 UPDATE는 <b>삭제 후 새 위치에 삽입</b>해요. 그래서 인덱스 개수가 DML 성능에 큰 영향을 줘요."
 },
 {
  "n": 105,
  "ch": 6,
  "lv": 1,
  "t": "mc",
  "q": "Redo 로그의 목적이 <b>아닌</b> 것은?",
  "choices": [
   "Database Recovery",
   "Cache Recovery(Instance Recovery)",
   "Fast Commit",
   "Read Consistency"
  ],
  "ans": 3,
  "exp": "Read Consistency(읽기 일관성)는 <b>Undo</b>의 목적이에요. Undo는 Transaction Rollback, Transaction Recovery, Read Consistency에 쓰여요."
 },
 {
  "n": 106,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "쿼리가 시작된 이후 다른 트랜잭션이 변경한 블록을 만났을 때, Undo로 복사본을 만들어 쿼리 시작 시점 상태로 읽는 모드는?",
  "choices": [
   "Current 모드",
   "Consistent 모드",
   "Direct 모드",
   "Exclusive 모드"
  ],
  "ans": 1,
  "exp": "<b>Consistent 모드</b>(MVCC)예요. 기준은 쿼리 시작 시점의 <b>SCN</b>이에요. Current 모드는 블록의 현재 상태 그대로 읽어요."
 },
 {
  "n": 107,
  "ch": 6,
  "lv": 1,
  "t": "mc",
  "q": "DBMS 외부(WAS 등)에서 네트워크를 통해 들어오는 Call은?",
  "choices": [
   "User Call",
   "System Call",
   "Parse Call",
   "Recursive Call"
  ],
  "ans": 0,
  "exp": "<b>User Call</b>은 외부에서, <b>Recursive Call</b>은 DBMS 내부(딕셔너리 조회, PL/SQL 안의 SQL)에서 발생해요."
 },
 {
  "n": 108,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "자바 프로그램에서 100만 건을 루프로 한 건씩 INSERT하는 것을 개선하는 방법으로 가장 알맞지 <b>않은</b> 것은?",
  "choices": [
   "INSERT INTO ... SELECT 로 One SQL 구현",
   "addBatch() / executeBatch()로 Array Processing",
   "루프 안에서 매 건 커밋",
   "PL/SQL FORALL 사용"
  ],
  "ans": 2,
  "exp": "매 건 커밋은 커밋마다 LGWR 대기가 생겨 더 느려져요. 핵심은 <b>Call 횟수를 줄이는 것</b>(One SQL, Array Processing)이에요."
 },
 {
  "n": 109,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "대량 INSERT 전에 인덱스를 Unusable 상태로 두고 DML을 진행하게 해 주는 파라미터는?",
  "choices": [
   "db_file_multiblock_read_count",
   "ddl_lock_timeout",
   "optimizer_mode",
   "skip_unusable_indexes"
  ],
  "ans": 3,
  "exp": "<b>skip_unusable_indexes = TRUE</b>(기본값)면 Unusable 인덱스를 무시하고 DML이 진행돼요. 단, Unique 인덱스는 Unusable이면 입력할 수 없어요."
 },
 {
  "n": 110,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "수정가능 조인 뷰로 UPDATE할 때 수정할 수 있는 컬럼은?",
  "choices": [
   "모든 테이블의 컬럼",
   "키 보존 테이블의 컬럼",
   "비 키-보존 테이블의 컬럼",
   "PK 컬럼만"
  ],
  "ans": 1,
  "exp": "<b>키 보존 테이블</b>(조인 결과에서도 Unique하게 식별되는 쪽, 보통 M쪽)의 컬럼만 수정할 수 있어요. 1쪽에 Unique 인덱스가 없으면 ORA-01779가 나요."
 },
 {
  "n": 111,
  "ch": 6,
  "lv": 3,
  "t": "mc",
  "q": "수정가능 조인 뷰에서 ORA-01779가 발생할 때 11g 이후 권장되는 대안은?",
  "choices": [
   "NOLOGGING",
   "BYPASS_UJVC 힌트",
   "MERGE 문으로 UPDATE",
   "DELETE 후 INSERT"
  ],
  "ans": 2,
  "exp": "<code>BYPASS_UJVC</code>는 11g부터 쓸 수 없어요. <b>MERGE 문</b>의 WHEN MATCHED THEN UPDATE 만 사용하면 같은 처리를 할 수 있어요."
 },
 {
  "n": 112,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "MERGE 문의 DELETE 절에 대한 설명으로 알맞은 것은?",
  "choices": [
   "UPDATE가 끝난 결과를 기준으로, 조인에 성공한 레코드 중 조건에 맞는 것을 삭제한다",
   "UPDATE 전 값을 기준으로 삭제한다",
   "INSERT된 레코드를 삭제한다",
   "조인에 실패한 레코드를 삭제한다"
  ],
  "ans": 0,
  "exp": "DELETE 절은 <b>WHEN MATCHED THEN UPDATE ... DELETE WHERE</b> 형태로, 갱신된 값 기준으로 판단하고 조인에 성공한 데이터만 삭제할 수 있어요."
 },
 {
  "n": 113,
  "ch": 6,
  "lv": 1,
  "t": "mc",
  "q": "버퍼캐시를 경유하지 않고 데이터 블록을 직접 읽고 쓰는 I/O 방식은?",
  "choices": [
   "Single Block I/O",
   "Batch I/O",
   "Conventional Path I/O",
   "Direct Path I/O"
  ],
  "ans": 3,
  "exp": "<b>Direct Path I/O</b>는 병렬 쿼리 Full Scan, 병렬 DML, Direct Path Insert, Temp 읽기·쓰기 등에서 작동해요."
 },
 {
  "n": 114,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "Direct Path Insert의 특징으로 <b>틀린</b> 것은?",
  "choices": [
   "Undo 로깅을 하지 않는다",
   "Freelist를 조회해 빈 공간을 재활용한다",
   "버퍼캐시를 거치지 않고 데이터파일에 직접 기록한다",
   "HWM 바깥 영역에 데이터를 순차적으로 입력한다"
  ],
  "ans": 1,
  "exp": "Direct Path Insert는 Freelist를 <b>참조하지 않고</b> HWM 바깥에 입력해요. 그래서 DELETE로 생긴 빈 공간을 재활용하지 못해 테이블이 커질 수 있어요."
 },
 {
  "n": 115,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "<code>INSERT /*+ APPEND */</code>를 트랜잭션이 많은 주간에 사용하면 안 되는 이유는?",
  "choices": [
   "테이블에 Exclusive 모드 TM Lock이 걸려 커밋 전까지 다른 트랜잭션이 DML을 못 해서",
   "인덱스가 사라져서",
   "결과가 정렬되어 입력돼서",
   "Redo가 너무 많이 생겨서"
  ],
  "ans": 0,
  "exp": "Direct Path Insert는 <b>Exclusive 모드 TM Lock</b>을 걸어요. 병렬 DML도 마찬가지예요."
 },
 {
  "n": 116,
  "ch": 6,
  "lv": 3,
  "t": "mc",
  "q": "UPDATE를 병렬로 처리했는데 실행계획에서 UPDATE 오퍼레이션이 <code>PX COORDINATOR</code> <b>위쪽</b>에 있다면?",
  "choices": [
   "파티션 Pruning이 일어났다",
   "병렬 DML이 정상 작동했다",
   "대상 찾기만 병렬이고 실제 변경은 QC가 혼자 처리했다(병렬 DML 미활성화)",
   "Direct Path Insert가 작동했다"
  ],
  "ans": 2,
  "exp": "<code>ALTER SESSION ENABLE PARALLEL DML</code>(또는 12c <code>ENABLE_PARALLEL_DML</code> 힌트)을 하지 않으면 변경은 <b>QC</b>가 혼자 해요. UPDATE가 PX COORDINATOR <b>아래</b>에 있어야 병렬 DML이에요."
 },
 {
  "n": 117,
  "ch": 6,
  "lv": 1,
  "t": "mc",
  "q": "SQL 조건절을 분석해 읽지 않아도 되는 파티션을 액세스 대상에서 제외하는 기능은?",
  "choices": [
   "파티션 Split",
   "Partition-wise Join",
   "파티션 Exchange",
   "파티션 Pruning"
  ],
  "ans": 3,
  "exp": "<b>파티션 Pruning</b>이에요. 상수 조건이면 정적, 바인드 변수면 실행 시점에 결정되는 동적 Pruning(실행계획 Pstart/Pstop에 KEY)이에요."
 },
 {
  "n": 118,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "<b>Unique 인덱스</b>를 파티셔닝할 때의 제약은?",
  "choices": [
   "반드시 글로벌 파티션 인덱스여야 한다",
   "파티션 키 컬럼이 모두 인덱스 구성 컬럼이어야 한다",
   "해시 파티션만 가능하다",
   "Nonprefixed로만 만들 수 있다"
  ],
  "ans": 1,
  "exp": "파티션 키가 인덱스에 포함돼야 다른 파티션에 같은 값이 없음을 보장할 수 있어요. 그래서 PK를 로컬 인덱스로 만들려면 파티션 키를 PK에 포함해야 해요."
 },
 {
  "n": 119,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "인덱스 파티션 키 컬럼이 인덱스 키 컬럼의 <b>왼쪽 선두</b>에 위치하는 것은?",
  "choices": [
   "비파티션 인덱스",
   "함수 기반 인덱스",
   "Prefixed 인덱스",
   "Nonprefixed 인덱스"
  ],
  "ans": 2,
  "exp": "<b>Prefixed</b>는 파티션 키가 인덱스 선두, Nonprefixed는 선두가 아니거나 없어요. 오라클은 글로벌 Nonprefixed를 지원하지 않아요."
 },
 {
  "n": 120,
  "ch": 6,
  "lv": 3,
  "t": "mc",
  "q": "월 단위 Range 파티션 테이블의 특정 월 데이터 대부분을 다른 값으로 바꿔야 할 때 가장 효율적인 방법은?",
  "choices": [
   "임시 테이블에 바뀐 값으로 데이터를 만들고 인덱스를 생성한 뒤 EXCHANGE PARTITION",
   "DELETE 후 일반 INSERT",
   "병렬 쿼리로 SELECT만 한다",
   "인덱스를 유지한 채 UPDATE"
  ],
  "ans": 0,
  "exp": "<b>파티션 Exchange</b>는 딕셔너리 정보만 바꿔 순식간에 세그먼트를 교체해요. 로컬 인덱스여야 해요."
 },
 {
  "n": 121,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "두 트랜잭션이 서로 상대가 가진 Lock을 기다리며 진행하지 못하는 상태는?",
  "choices": [
   "래치 경합",
   "Lock 에스컬레이션",
   "블로킹",
   "교착상태(Deadlock)"
  ],
  "ans": 3,
  "exp": "<b>교착상태</b>예요. 오라클은 이를 먼저 인지한 트랜잭션의 문장을 롤백하고 ORA-00060 에러를 내요. 블로킹은 한쪽이 기다리는 상태로 커밋하면 풀려요."
 },
 {
  "n": 122,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "오라클에서 <b>SELECT 문</b>이 다른 트랜잭션이 변경 중인 로우를 읽을 때 일어나는 일은?",
  "choices": [
   "Lock이 풀릴 때까지 대기한다",
   "MVCC 덕분에 Lock 없이 Consistent 모드로 변경 전 값을 읽는다",
   "에러가 난다",
   "변경 중인 값을 그대로 읽는다(Dirty Read)"
  ],
  "ans": 1,
  "exp": "오라클의 SELECT는 <b>Lock을 걸지 않고</b>(FOR UPDATE 제외) Undo로 쿼리 시작 시점 데이터를 읽어요."
 },
 {
  "n": 123,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "<b>낙관적 동시성 제어</b>에 대한 설명으로 알맞은 것은?",
  "choices": [
   "Lock 없이 읽고, 변경 시점에 그 사이 다른 트랜잭션이 바꿨는지 확인한다",
   "항상 테이블 Lock을 건다",
   "동시성이 가장 낮은 방식이다",
   "데이터를 읽을 때 SELECT FOR UPDATE로 Lock을 건다"
  ],
  "ans": 0,
  "exp": "읽을 때 값(또는 최종변경일시)을 기억해 두고 UPDATE 조건에 포함해 0건이면 누군가 먼저 바꾼 것으로 판단하고 재처리해요. 비관적 방식은 읽을 때 FOR UPDATE로 Lock을 걸어요."
 },
 {
  "n": 124,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "여러 프로세스가 큐 테이블에서 미처리 데이터를 겹치지 않게 나눠 가져갈 때 유용한 FOR UPDATE 옵션은?",
  "choices": [
   "NOWAIT",
   "WAIT 3",
   "SKIP LOCKED",
   "OF 컬럼"
  ],
  "ans": 2,
  "exp": "<b>SKIP LOCKED</b>는 다른 트랜잭션이 Lock 건 레코드를 건너뛰고 나머지를 가져와요."
 },
 {
  "n": 125,
  "ch": 6,
  "lv": 3,
  "t": "mc",
  "q": "시퀀스나 입력 일시처럼 순차적으로 증가하는 값을 인덱스 키로 쓸 때 동시 INSERT가 많으면 생기는 문제와 해결책으로 알맞은 것은?",
  "choices": [
   "하드 파싱 증가 / 바인드 변수",
   "디스크 소트 / Sort Area 증가",
   "Index Skip Scan 발생 / 인덱스 Drop",
   "맨 오른쪽 리프 블록에만 입력이 몰리는 Right Growing 인덱스 경합 / 해시 파티셔닝, Reverse 키 인덱스, Scalable 시퀀스"
  ],
  "ans": 3,
  "exp": "<b>Right Growing 인덱스</b>는 마지막 리프 블록에 경합이 생겨요. 인덱스를 해시 파티셔닝하거나 Reverse 키 인덱스로 분산하고, 18c부터는 Scalable 시퀀스도 쓸 수 있어요."
 },
 {
  "n": 126,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "채번 방식 중 <b>번호 누락이 생길 수 있지만 가장 빠른</b> 방식은?",
  "choices": [
   "채번 테이블",
   "시퀀스 오브젝트",
   "MAX + 1 조회",
   "FOR UPDATE + COUNT(*)"
  ],
  "ans": 1,
  "exp": "<b>시퀀스</b>는 캐시와 롤백 때문에 번호가 빠질 수 있어요. 채번 테이블은 누락이 없지만 Lock 경합, MAX+1은 동시 입력 시 중복 에러(재시도) 가능성이 있어요."
 },
 {
  "n": 127,
  "ch": 6,
  "lv": 2,
  "t": "self",
  "q": "Direct Path Insert를 하는 방법을 세 가지 이상 쓰고, 사용 시 주의할 점 두 가지를 쓰세요.",
  "answer": "방법: INSERT /*+ APPEND */ INTO ... SELECT, INSERT /*+ APPEND_VALUES */ INTO ... VALUES(11gR2~), 병렬 모드 INSERT, CREATE TABLE ... AS SELECT, SQL*Loader direct 옵션.\n주의: ① Exclusive 모드 TM Lock이 걸려 커밋 전까지 다른 트랜잭션이 해당 테이블에 DML을 못 한다. ② Freelist를 조회하지 않고 HWM 바깥에 입력하므로 DELETE로 생긴 빈 공간을 재활용하지 못해 테이블이 계속 커질 수 있다.",
  "kw": [
   "APPEND",
   "APPEND_VALUES",
   "CTAS",
   "TM Lock",
   "HWM",
   "빈 공간"
  ]
 },
 {
  "n": 128,
  "ch": 6,
  "lv": 3,
  "t": "self",
  "q": "수정가능 조인 뷰를 이용해 아래 UPDATE를 고객 테이블을 한 번만 읽도록 바꾸세요. (12c, 거래는 GROUP BY 후 조인)",
  "answer": "UPDATE (\n  SELECT c.최종거래일시, c.최근거래횟수, t.거래일시, t.거래횟수\n  FROM (SELECT 고객번호, MAX(거래일시) 거래일시, COUNT(*) 거래횟수\n        FROM 거래\n        WHERE 거래일시 >= TRUNC(ADD_MONTHS(SYSDATE, -1))\n        GROUP BY 고객번호) t,\n       고객 c\n  WHERE c.고객번호 = t.고객번호)\nSET 최종거래일시 = 거래일시, 최근거래횟수 = 거래횟수;\n\n-- 또는 MERGE INTO 고객 c USING (GROUP BY 인라인 뷰) t ON (c.고객번호 = t.고객번호)\n--      WHEN MATCHED THEN UPDATE SET c.최종거래일시 = t.거래일시, c.최근거래횟수 = t.거래횟수;",
  "kw": [
   "UPDATE (SELECT",
   "GROUP BY",
   "SET",
   "키 보존",
   "MERGE"
  ],
  "code": "UPDATE 고객 c\nSET (최종거래일시, 최근거래횟수) =\n    (SELECT MAX(거래일시), COUNT(*)\n     FROM 거래\n     WHERE 고객번호 = c.고객번호\n     AND 거래일시 >= TRUNC(ADD_MONTHS(SYSDATE, -1)))\nWHERE EXISTS (SELECT 'x' FROM 거래\n              WHERE 고객번호 = c.고객번호\n              AND 거래일시 >= TRUNC(ADD_MONTHS(SYSDATE, -1)))"
 },
 {
  "n": 129,
  "ch": 6,
  "lv": 3,
  "t": "self",
  "q": "월별 Range 파티션 테이블(로컬 인덱스)에서 2023년 12월 파티션 데이터 중 ‘상태 = 완료’만 남기고 나머지를 대량 삭제하는 효율적인 절차를 쓰세요.",
  "answer": "① 남길 데이터(상태 = '완료')만 임시 테이블에 저장 (CREATE TABLE tmp NOLOGGING AS SELECT ... WHERE 거래일자 해당 월 AND 상태 = '완료')\n② 삭제 대상 파티션을 TRUNCATE (ALTER TABLE 거래 TRUNCATE PARTITION p202312)\n③ 임시 테이블 데이터를 원래 파티션에 다시 입력 (INSERT /*+ APPEND */ INTO 거래 SELECT * FROM tmp)\n④ 임시 테이블 DROP (필요하면 로컬 인덱스 파티션 Unusable → REBUILD PARTITION)\n서비스 중단 없이 하려면 남길 데이터로 임시 테이블+인덱스를 만들고 EXCHANGE PARTITION 한다.",
  "kw": [
   "임시 테이블",
   "TRUNCATE",
   "APPEND",
   "EXCHANGE",
   "로컬"
  ]
 },
 {
  "n": 130,
  "ch": 6,
  "lv": 2,
  "t": "self",
  "q": "낙관적 동시성 제어로 상품 가격을 변경하는 SQL을 작성하세요. 읽을 때 최종변경일시 값을 :mod_dt에 담아 두었다고 가정합니다.",
  "answer": "UPDATE 상품\nSET 판매가격 = :new_price, 최종변경일시 = SYSDATE\nWHERE 상품코드 = :prod_cd\nAND 최종변경일시 = :mod_dt;\n\n-- 처리 건수가 0이면 다른 트랜잭션이 먼저 변경한 것이므로 롤백 후 다시 조회·처리",
  "kw": [
   "최종변경일시 = :mod_dt",
   "0",
   "재처리",
   "롤백"
  ]
 },
 {
  "n": 131,
  "ch": 7,
  "lv": 1,
  "t": "mc",
  "q": "총 10만 건인 테이블에서 상품분류 NDV가 4이고 히스토그램이 없을 때, <code>상품분류 = '가전'</code>의 예상 카디널리티는?",
  "choices": [
   "4건",
   "25,000건",
   "40,000건",
   "100,000건"
  ],
  "ans": 1,
  "exp": "= 조건 선택도 = 1/NDV = 1/4 = 25%, 카디널리티 = 총 로우 수 × 선택도 = 100,000 × 0.25 = <b>25,000건</b>."
 },
 {
  "n": 132,
  "ch": 7,
  "lv": 1,
  "t": "mc",
  "q": "<b>선택도</b>와 <b>카디널리티</b>의 관계로 알맞은 것은?",
  "choices": [
   "카디널리티 = NDV × 선택도",
   "선택도 = 블록 수 / NDV",
   "카디널리티 = 총 로우 수 × 선택도",
   "선택도 = 총 로우 수 × 카디널리티"
  ],
  "ans": 2,
  "exp": "선택도는 <b>비율</b>, 카디널리티는 <b>개수</b>예요. 옵티마이저는 카디널리티로 액세스 방식·조인 순서·조인 방식을 정해요."
 },
 {
  "n": 133,
  "ch": 7,
  "lv": 2,
  "t": "mc",
  "q": "인덱스 통계 항목 중 <b>수직적 탐색 비용</b>을 나타내는 것은?",
  "choices": [
   "BLEVEL",
   "CLUSTERING_FACTOR",
   "NUM_ROWS",
   "LEAF_BLOCKS"
  ],
  "ans": 0,
  "exp": "<b>BLEVEL</b>(브랜치 레벨)은 루트에서 리프까지 내려가는 비용, LEAF_BLOCKS는 수평적 탐색 비용, CLUSTERING_FACTOR는 테이블 랜덤 액세스 비용 계산에 쓰여요."
 },
 {
  "n": 134,
  "ch": 7,
  "lv": 2,
  "t": "mc",
  "q": "특정 값에 데이터가 몰려 있어 1/NDV로는 선택도를 정확히 구할 수 없을 때 수집하는 통계는?",
  "choices": [
   "테이블 통계",
   "인덱스 통계",
   "시스템 통계",
   "컬럼 히스토그램"
  ],
  "ans": 3,
  "exp": "<b>히스토그램</b>은 값별 분포를 저장해 고르지 않은 분포에서도 정확한 선택도를 계산하게 해요(도수분포, 높이균형, 상위도수분포, 하이브리드)."
 },
 {
  "n": 135,
  "ch": 7,
  "lv": 3,
  "t": "mc",
  "q": "인덱스를 이용한 테이블 액세스 비용 공식에서 <b>CLUSTERING_FACTOR</b>에 곱하는 값은?",
  "choices": [
   "유효 인덱스 선택도",
   "유효 테이블 선택도",
   "BLEVEL",
   "NDV"
  ],
  "ans": 1,
  "exp": "비용 = BLEVEL + LEAF_BLOCKS × <b>유효 인덱스 선택도</b> + CLUSTERING_FACTOR × <b>유효 테이블 선택도</b>. 유효 테이블 선택도는 인덱스 컬럼 조건 전체(액세스 + 인덱스 필터)로 테이블을 방문할 비율이에요."
 },
 {
  "n": 136,
  "ch": 7,
  "lv": 2,
  "t": "mc",
  "q": "I/O 비용 모델과 CPU 비용 모델의 차이로 알맞은 것은?",
  "choices": [
   "I/O 비용 모델은 예상 I/O Call 횟수, CPU 비용 모델은 I/O 시간과 CPU 연산 시간을 Single Block I/O 시간으로 나눈 상대적 시간",
   "둘은 같은 것이다",
   "CPU 비용 모델은 블록 수만 센다",
   "I/O 비용 모델은 시스템 통계를 반드시 사용한다"
  ],
  "ans": 0,
  "exp": "CPU 비용 모델은 <b>시스템 통계</b>를 활용해 CPU 연산까지 반영해요(10g부터 기본)."
 },
 {
  "n": 137,
  "ch": 7,
  "lv": 1,
  "t": "mc",
  "q": "미리 정해 둔 우선순위 규칙으로 실행계획을 정하고 데이터량을 고려하지 않는 옵티마이저는?",
  "choices": [
   "ASH",
   "CBO",
   "RBO",
   "AWR"
  ],
  "ans": 2,
  "exp": "<b>RBO</b>(Rule-Based)는 인덱스가 있으면 데이터량과 상관없이 우선 써서 대량 데이터에 비효율적이에요. 지금은 통계 기반 <b>CBO</b>가 표준이에요."
 },
 {
  "n": 138,
  "ch": 7,
  "lv": 1,
  "t": "mc",
  "q": "DW·배치처럼 결과를 끝까지 Fetch하는 환경에 맞는 옵티마이저 모드(기본값)는?",
  "choices": [
   "FIRST_ROWS_1",
   "RULE",
   "FIRST_ROWS_10",
   "ALL_ROWS"
  ],
  "ans": 3,
  "exp": "<b>ALL_ROWS</b>는 전체 처리량(시스템 리소스 최소)을 목표로 해요. OLTP처럼 앞쪽 일부만 빨리 보여 줄 땐 FIRST_ROWS_N이 맞아요."
 },
 {
  "n": 139,
  "ch": 7,
  "lv": 2,
  "t": "mc",
  "q": "FIRST_ROWS_N 모드로 최적화된 쿼리를 사용자가 엑셀 다운로드로 <b>끝까지 Fetch</b>할 때 생길 수 있는 문제는?",
  "choices": [
   "항상 더 빠르다",
   "인덱스로 소트를 생략하는 계획이 선택돼 대량 데이터를 랜덤 액세스로 읽느라 오히려 느려질 수 있다",
   "결과가 틀려진다",
   "하드 파싱이 매번 일어난다"
  ],
  "ans": 1,
  "exp": "FIRST_ROWS 계열은 앞부분만 빨리 읽는 계획을 고르기 쉬워요. 실제로 전부 읽으면 <b>랜덤 액세스</b> 비효율이 드러나요."
 },
 {
  "n": 140,
  "ch": 7,
  "lv": 2,
  "t": "mc",
  "q": "옵티마이저에 영향을 미치는 요소로 보기 <b>어려운</b> 것은?",
  "choices": [
   "제약 설정(PK, FK, NOT NULL)",
   "옵티마이저 관련 파라미터",
   "SQL을 실행한 사용자의 화면 해상도",
   "통계정보"
  ],
  "ans": 2,
  "exp": "SQL 형태, 인덱스·파티션 같은 옵티마이징 팩터, 제약, 통계, 힌트, 파라미터가 영향을 줘요. 예를 들어 NOT NULL 제약이 있으면 COUNT(*)에 인덱스를 쓸 수 있어요."
 },
 {
  "n": 141,
  "ch": 7,
  "lv": 3,
  "t": "mc",
  "q": "옵티마이저의 한계에 해당하지 <b>않는</b> 것은?",
  "choices": [
   "모든 실행계획 후보를 항상 빠짐없이 평가한다",
   "통계를 샘플링으로 수집해 부정확할 수 있다",
   "컬럼 간 상관관계를 반영하기 어렵다",
   "바인드 변수를 쓰면 실제 값을 모르고 균등 분포를 가정할 수 있다"
  ],
  "ans": 0,
  "exp": "조인 테이블이 많으면 후보가 폭발적으로 늘어 <b>최적화 시간 제약</b> 때문에 모두 평가하지 못해요. 옵티마이저는 ‘충분히 좋은’ 답을 찾아요."
 },
 {
  "n": 142,
  "ch": 7,
  "lv": 2,
  "t": "self",
  "q": "옵티마이저의 한계를 보완하기 위한 <b>개발자의 역할</b>을 세 가지 쓰세요.",
  "answer": "① 필요한 최소 블록만 읽도록 쿼리를 작성한다(불필요한 조건 범위·컬럼·조인 제거, 부분범위 처리 활용).\n② 최적의 옵티마이징 팩터를 제공한다(전략적인 인덱스 구성, 파티션·클러스터·IOT·병렬 처리 등 DBMS 기능 활용).\n③ 필요하다면 옵티마이저 힌트로 최적의 액세스 경로를 유도한다.",
  "kw": [
   "최소 블록",
   "인덱스",
   "옵티마이징 팩터",
   "힌트"
  ]
 },
 {
  "n": 143,
  "ch": 7,
  "lv": 3,
  "t": "self",
  "q": "DISPLAY_CURSOR 결과에서 E-Rows가 10인데 A-Rows가 50,000이었어요. 무슨 의미이고 무엇을 점검해야 하는지 쓰세요.",
  "answer": "옵티마이저가 카디널리티를 10건으로 예상했지만 실제로는 50,000건이 나왔다는 뜻으로, 카디널리티(선택도) 추정이 크게 틀렸다. 그 결과 NL 조인·인덱스 같은 잘못된 실행계획이 선택됐을 가능성이 크다. 점검: 테이블·컬럼 통계가 최신인지, 값 분포가 치우친 컬럼에 히스토그램이 필요한지, 컬럼 간 상관관계(확장 통계), 바인드 변수 피킹 문제 등을 확인하고 필요하면 통계 재수집이나 힌트로 보완한다.",
  "kw": [
   "카디널리티",
   "예상",
   "통계",
   "히스토그램",
   "실행계획"
  ]
 },
 {
  "n": 144,
  "ch": 8,
  "lv": 1,
  "t": "mc",
  "q": "<code>EXPLAIN PLAN FOR</code>로 생성한 실행계획이 저장되는 테이블은?",
  "choices": [
   "DBA_TABLES",
   "AUX_STATS$",
   "V$SQL",
   "PLAN_TABLE"
  ],
  "ans": 3,
  "exp": "EXPLAIN PLAN 결과는 <b>PLAN_TABLE</b>에 저장되고 <code>DBMS_XPLAN.DISPLAY</code>로 출력해요. 예상 실행계획이라 실제와 다를 수 있어요."
 },
 {
  "n": 145,
  "ch": 8,
  "lv": 1,
  "t": "mc",
  "q": "쿼리를 <b>실행하지 않고</b> 예상 실행계획만 보여 주는 AutoTrace 옵션은?",
  "choices": [
   "SET AUTOTRACE TRACEONLY",
   "SET AUTOTRACE TRACEONLY EXPLAIN",
   "SET AUTOTRACE ON STATISTICS",
   "SET AUTOTRACE ON"
  ],
  "ans": 1,
  "exp": "<b>TRACEONLY EXPLAIN</b>만 쿼리를 실행하지 않아요. TRACEONLY는 실행은 하되 결과를 출력하지 않아요."
 },
 {
  "n": 146,
  "ch": 8,
  "lv": 2,
  "t": "mc",
  "q": "AutoTrace 통계에서 <b>논리적 I/O</b>를 구하는 방법은?",
  "choices": [
   "db block gets + consistent gets",
   "recursive calls + sorts (memory)",
   "rows processed × SQL*Net roundtrips",
   "physical reads + redo size"
  ],
  "ans": 0,
  "exp": "<b>db block gets</b>(Current 모드) + <b>consistent gets</b>(Consistent 모드)가 논리적 I/O예요. physical reads는 물리적 I/O예요."
 },
 {
  "n": 147,
  "ch": 8,
  "lv": 2,
  "t": "mc",
  "q": "TKProf 리포트의 Call 통계 컬럼 중 <b>Consistent 모드로 읽은 블록 수</b>는?",
  "choices": [
   "rows",
   "disk",
   "query",
   "current"
  ],
  "ans": 2,
  "exp": "<b>query</b>는 Consistent 모드, <b>current</b>는 Current 모드, <b>disk</b>는 디스크에서 읽은 블록 수(물리적 I/O)예요."
 },
 {
  "n": 148,
  "ch": 8,
  "lv": 2,
  "t": "mc",
  "q": "다음 Row Source Operation에서 테이블 액세스 단계 <b>자체</b>에서 읽은 블록 수는?",
  "choices": [
   "4",
   "3",
   "1",
   "7"
  ],
  "ans": 2,
  "exp": "각 단계의 cr은 <b>하위 단계를 포함한 누적값</b>이에요. 테이블 단계 cr=4 − 인덱스 단계 cr=3 = <b>1</b>블록.",
  "code": "Rows  Row Source Operation\n   1  TABLE ACCESS BY INDEX ROWID EMP (cr=4 pr=0 pw=0)\n   1   INDEX UNIQUE SCAN PK_EMP (cr=3 pr=0 pw=0)"
 },
 {
  "n": 149,
  "ch": 8,
  "lv": 2,
  "t": "mc",
  "q": "10046 이벤트 트레이스에서 바인드 변수와 대기 이벤트를 <b>모두</b> 수집하는 레벨은?",
  "choices": [
   "1",
   "4",
   "8",
   "12"
  ],
  "ans": 3,
  "exp": "레벨 4 = 바인드 변수, 8 = 대기 이벤트, <b>12 = 둘 다</b>예요."
 },
 {
  "n": 150,
  "ch": 8,
  "lv": 2,
  "t": "mc",
  "q": "실제 실행 통계(A-Rows, Buffers 등)를 <code>DBMS_XPLAN.DISPLAY_CURSOR</code>로 보려면 쿼리에 추가하는 힌트와 포맷은?",
  "choices": [
   "/*+ APPEND */ , 'TYPICAL'",
   "/*+ RULE */ , 'ALL'",
   "/*+ MONITOR */ , 'BASIC'",
   "/*+ GATHER_PLAN_STATISTICS */ , 'ALLSTATS LAST'"
  ],
  "ans": 3,
  "exp": "<code>GATHER_PLAN_STATISTICS</code>(또는 statistics_level = ALL)로 실행 통계를 모으고, <b>ALLSTATS LAST</b>로 마지막 실행값을 봐요. LAST를 빼면 누적값이에요."
 },
 {
  "n": 151,
  "ch": 8,
  "lv": 2,
  "t": "mc",
  "q": "DISPLAY_CURSOR 출력의 <b>Starts</b> 컬럼이 의미하는 것은?",
  "choices": [
   "예상 Rows",
   "각 오퍼레이션이 반복 수행된 횟수",
   "읽은 블록 수",
   "PGA 사용량"
  ],
  "ans": 1,
  "exp": "<b>Starts</b>는 반복 횟수예요. NL 조인 Inner 쪽은 Outer 건수만큼 Starts가 커져요. Buffers가 읽은 블록 수, E-Rows/A-Rows가 예상/실제 Rows예요."
 },
 {
  "n": 152,
  "ch": 8,
  "lv": 2,
  "t": "mc",
  "q": "11g 실시간 SQL 모니터링의 기본 대상이 <b>아닌</b> 것은?",
  "choices": [
   "병렬 SQL",
   "MONITOR 힌트를 지정한 SQL",
   "소프트 파싱된 모든 SQL",
   "CPU 또는 I/O 시간을 5초 이상 소비한 SQL"
  ],
  "ans": 2,
  "exp": "5초(<code>_sqlmon_threshold</code>) 이상, 병렬, MONITOR 힌트 SQL이 대상이에요. 실행계획이 <code>_sqlmon_max_planlines</code>(기본 300줄)를 넘으면 대상에서 빠져요."
 },
 {
  "n": 153,
  "ch": 8,
  "lv": 2,
  "t": "mc",
  "q": "V$SQL에서 SQL별 <b>실행당 평균 논리적 I/O</b>를 구하는 식은?",
  "choices": [
   "BUFFER_GETS / EXECUTIONS",
   "ELAPSED_TIME / FETCHES",
   "ROWS_PROCESSED / PARSE_CALLS",
   "DISK_READS / EXECUTIONS"
  ],
  "ans": 0,
  "exp": "<b>BUFFER_GETS</b>가 논리적 I/O, DISK_READS가 물리적 I/O예요. EXECUTIONS로 나누면 실행당 평균이에요."
 },
 {
  "n": 154,
  "ch": 8,
  "lv": 2,
  "t": "self",
  "q": "SQL 트레이스를 걸고 TKProf로 리포트를 만드는 과정을 순서대로 쓰세요.",
  "answer": "① ALTER SESSION SET SQL_TRACE = TRUE; (또는 10046 이벤트)\n② 분석할 SQL 실행 (끝까지 Fetch)\n③ ALTER SESSION SET SQL_TRACE = FALSE;\n④ 트레이스 파일 위치 확인: SELECT value FROM v$diag_info WHERE name = 'Default Trace File';\n⑤ tkprof 트레이스파일.trc report.prf sys=no 로 포맷팅해서 Call 통계(count, cpu, elapsed, disk, query, current, rows)와 Row Source Operation(cr, pr, pw, time)을 확인",
  "kw": [
   "SQL_TRACE = TRUE",
   "FALSE",
   "v$diag_info",
   "tkprof"
  ]
 },
 {
  "n": 155,
  "ch": 8,
  "lv": 3,
  "t": "self",
  "q": "트레이스에서 Execute Call이 100,000회, Fetch Call도 100,000회인 INSERT/SELECT 혼합 배치 프로그램을 발견했어요. 어떤 문제를 의심하고 어떻게 개선할지 쓰세요.",
  "answer": "루프 안에서 한 건씩 SQL을 실행하는 절차적 처리로 데이터베이스 Call(User Call 또는 Recursive Call)이 과다하게 발생하고 있다고 의심한다. 개선: 가능하면 INSERT INTO ... SELECT, 수정가능 조인 뷰, MERGE 같은 One SQL로 바꿔 Call을 한 번으로 줄이고, 어려우면 BULK COLLECT / FORALL, JDBC addBatch·executeBatch 등 Array Processing으로 Call 횟수를 줄인다. 조회 쪽은 Array Size(fetchSize)를 키워 Fetch Call을 줄인다.",
  "kw": [
   "Call",
   "루프",
   "One SQL",
   "Array Processing",
   "Array Size"
  ]
 }
];
