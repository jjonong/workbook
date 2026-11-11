// SQL 튜닝 핵심 정리 탭 (HTML) · 친절한 SQL 튜닝 색인 기준
var WTU = window.WTU = window.WTU || {};
WTU.cheat = String.raw`
<h1 id="tc-0">SQL 튜닝 핵심 정리</h1>
<p>시험 직전에 훑어보는 용어·힌트·파라미터 모음이에요. 책 <strong>색인</strong>에 나온 용어를 장별로 묶고 쪽 번호를 같이 적었어요. 위 검색창에 낱말(예: 클러스터링, 해시 조인, use_nl, Top N, Direct Path, 470)을 넣으면 맞는 줄만 남아요. 자세한 설명은 <a href="#tune" data-goto="tune">개념 정리</a> 탭을 보세요.</p>
<h1 id="tc-ch-0">전체 흐름</h1>
<h2 id="tc-1">튜닝의 큰 원칙</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>튜닝의 목표</td>
<td><strong>논리적 I/O(읽은 블록 수)를 줄이기</strong> → 물리적 I/O도 줄어듦</td>
<td>물리적 I/O = 논리적 I/O × (1 − BCHR)</td>
</tr>
<tr>
<td>인덱스 튜닝 2요소</td>
<td>① 인덱스 스캔 효율화 ② <strong>테이블 랜덤 액세스 최소화</strong>(더 중요)</td>
<td>2.1.1</td>
</tr>
<tr>
<td>조인 메소드 선택</td>
<td>소량 → NL, 대량 → 해시, 대량 + = 아닌 조인 → 소트 머지</td>
<td>4.3.5</td>
</tr>
<tr>
<td>소트 튜닝</td>
<td>소트를 <strong>없애거나</strong>(인덱스, UNION ALL, EXISTS) <strong>줄이기</strong>(Top N, 필요한 컬럼만)</td>
<td>5장</td>
</tr>
<tr>
<td>DML 튜닝</td>
<td>Call 줄이기(One SQL, Array), Direct Path, 파티션, 인덱스·제약 해제</td>
<td>6장</td>
</tr>
<tr>
<td>개발자의 역할</td>
<td>최소 블록만 읽는 SQL, 최적 옵티마이징 팩터 제공, 필요시 힌트</td>
<td>7.2.5</td>
</tr>
</tbody>
</table>
</div>
<h1 id="tc-ch-1">1장 SQL 처리 과정과 I/O</h1>
<h2 id="tc-2">SQL 파싱과 최적화</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>SQL 최적화 단계</td>
<td>① 파싱(파싱 트리 → <strong>Syntax 체크</strong> → <strong>Semantic 체크</strong>) ② 최적화 ③ 로우 소스 생성</td>
<td>Syntax·Semantic 체크 p.19</td>
</tr>
<tr>
<td>옵티마이저</td>
<td>최적의 데이터 액세스 경로를 선택하는 DBMS 핵심 엔진</td>
<td>p.18, 20</td>
</tr>
<tr>
<td>실행계획</td>
<td>옵티마이저가 생성한 처리 절차를 트리 구조로 표현</td>
<td>p.21</td>
</tr>
<tr>
<td>비용(Cost)</td>
<td>쿼리 수행 중 발생할 것으로 <strong>예상되는</strong> I/O 횟수 또는 소요시간</td>
<td>예상치! p.21~24, 510</td>
</tr>
<tr>
<td>옵티마이저 힌트</td>
<td><code>/*+ ... */</code>, 여러 개는 공백 구분, 별칭 있으면 별칭으로, 스키마명 X</td>
<td>틀리면 무시됨 p.24, 27, 517</td>
</tr>
<tr>
<td>SQL 파싱</td>
<td>파싱 트리 생성 → 문법·의미 체크</td>
<td>p.19</td>
</tr>
</tbody>
</table>
</div>
<h2 id="tc-3">SQL 공유 및 재사용</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>SGA</td>
<td>서버·백그라운드 프로세스가 공유하는 메모리</td>
<td>p.29, 274</td>
</tr>
<tr>
<td>라이브러리 캐시</td>
<td>파싱된 SQL·실행계획을 캐싱하는 SGA 영역(Library Cache)</td>
<td>p.29</td>
</tr>
<tr>
<td>소프트 파싱</td>
<td>라이브러리 캐시에 SQL이 있어 바로 실행</td>
<td>p.29, 30</td>
</tr>
<tr>
<td>하드 파싱</td>
<td>캐시에 없어 최적화·로우 소스 생성까지 수행(무거움)</td>
<td>p.29, 30</td>
</tr>
<tr>
<td>SQL 공유</td>
<td>SQL 텍스트가 이름 역할 → 공백·대소문자·리터럴 하나만 달라도 다른 SQL</td>
<td>p.29</td>
</tr>
<tr>
<td>바인드 변수</td>
<td>리터럴 대신 <code>:변수</code> → 하드 파싱 한 번, 커서 공유</td>
<td>p.32</td>
</tr>
</tbody>
</table>
</div>
<h2 id="tc-4">저장 구조와 I/O</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>블록</td>
<td>데이터를 읽고 쓰는 <strong>단위</strong>(보통 8KB)</td>
<td>p.40~46, <code>db_block_size</code> p.45</td>
</tr>
<tr>
<td>익스텐트</td>
<td>공간 확장 단위, <strong>연속된 블록</strong> 집합</td>
<td>p.39~43</td>
</tr>
<tr>
<td>세그먼트</td>
<td>저장 공간이 필요한 오브젝트(테이블·인덱스·파티션·LOB)</td>
<td>p.39</td>
</tr>
<tr>
<td>DBA</td>
<td>데이터 블록 주소(파일 번호 + 블록 번호). DBA는 Data Block Address</td>
<td>p.42</td>
</tr>
<tr>
<td>프로세스 생명주기</td>
<td>생성 → 실행 가능 ⇄ 실행 → 대기(I/O) → 종료</td>
<td>p.37</td>
</tr>
<tr>
<td>시퀀셜 액세스</td>
<td>논리적·물리적 순서대로 차례로 읽기(Sequential Access)</td>
<td>p.47</td>
</tr>
<tr>
<td>랜덤 액세스</td>
<td>레코드 하나 읽으려고 한 블록씩 접근(Random Access)</td>
<td>p.47, 73, 129, 139</td>
</tr>
<tr>
<td>논리적 I/O</td>
<td>SQL 처리 중 발생한 총 블록 I/O(메모리 경유 전체)</td>
<td>p.48, 50</td>
</tr>
<tr>
<td>물리적 I/O</td>
<td>버퍼캐시에 없어 디스크에서 읽은 블록 I/O</td>
<td>p.48, 50</td>
</tr>
<tr>
<td>DB 버퍼캐시</td>
<td>디스크에서 읽은 블록을 캐싱하는 SGA 영역</td>
<td>p.48, 56, 63, 405</td>
</tr>
<tr>
<td>버퍼캐시 히트율(BCHR)</td>
<td>(1 − 물리적 I/O / 논리적 I/O) × 100</td>
<td>p.52, 140</td>
</tr>
<tr>
<td>Single Block I/O</td>
<td>한 번에 한 블록. 인덱스 액세스. <code>db file sequential read</code></td>
<td>p.55</td>
</tr>
<tr>
<td>Multiblock I/O</td>
<td>한 번에 여러 블록. Full Scan. <code>db file scattered read</code></td>
<td>p.55, 508</td>
</tr>
<tr>
<td>db_file_multiblock_read_count</td>
<td>Multiblock I/O 한 번에 읽는 최대 블록 수</td>
<td>p.58</td>
</tr>
<tr>
<td>Table Full Scan</td>
<td>시퀀셜 + Multiblock → 대량 조회 유리</td>
<td>p.60</td>
</tr>
<tr>
<td>Index Range Scan</td>
<td>랜덤 + Single Block → 소량 조회 유리</td>
<td>p.60, 75, 85~94, 110</td>
</tr>
<tr>
<td>래치(Latch)</td>
<td>SGA 공유 구조(해시 체인)를 보호하는 경량 Lock</td>
<td>p.65~66</td>
</tr>
<tr>
<td>버퍼 Lock</td>
<td>버퍼 블록 읽기·변경 중 다른 프로세스 접근 차단</td>
<td>p.66</td>
</tr>
<tr>
<td>액세스 직렬화</td>
<td>공유 자원에 한 프로세스씩 순서대로 접근</td>
<td>p.64~66</td>
</tr>
</tbody>
</table>
</div>
<h1 id="tc-ch-2">2장 인덱스 기본</h1>
<h2 id="tc-5">인덱스 구조</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>B*Tree</td>
<td>루트 → 브랜치 → 리프, 리프는 키+ROWID, 양방향 연결</td>
<td>p.75</td>
</tr>
<tr>
<td>LMC</td>
<td>LeftMost Child, 브랜치 첫 레코드(키 없이 하위 블록 주소만)</td>
<td>p.76, 79, 174</td>
</tr>
<tr>
<td>ROWID</td>
<td>DBA + 로우 번호 → 테이블 레코드 위치</td>
<td>p.76, 130~135</td>
</tr>
<tr>
<td>수직적 탐색</td>
<td>루트 → 리프, <strong>스캔 시작점</strong> 찾기</td>
<td>p.76, 77, 174~179</td>
</tr>
<tr>
<td>수평적 탐색</td>
<td>리프를 따라 옆으로, 데이터 찾기 + ROWID 얻기</td>
<td>p.76, 78, 174~179</td>
</tr>
<tr>
<td>결합 인덱스</td>
<td>두 개 이상 컬럼. = 조건이면 컬럼 순서와 무관하게 읽는 블록 수 같음</td>
<td>p.79, 241</td>
</tr>
</tbody>
</table>
</div>
<h2 id="tc-6">인덱스 사용</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>인덱스를 사용한다</td>
<td>리프에서 시작점을 찾아 스캔하다 <strong>멈추는 것</strong> = Range Scan</td>
<td>2.2.1</td>
</tr>
<tr>
<td>Range Scan 불가</td>
<td>인덱스 컬럼 <strong>가공</strong>(함수, NVL, 중간 LIKE, OR), <strong>선두 컬럼 조건 없음</strong></td>
<td>2.2.2~3</td>
</tr>
<tr>
<td>OR-Expansion</td>
<td>OR 조건을 UNION ALL로 분리해 각각 Range Scan. <code>use_concat</code> / <code>no_expand</code></td>
<td>p.88, 222~223</td>
</tr>
<tr>
<td>IN-List Iterator</td>
<td>IN 값 개수만큼 Range Scan 반복</td>
<td><code>INLIST ITERATOR</code></td>
</tr>
<tr>
<td>소트 연산 생략</td>
<td>ORDER BY가 인덱스 순서와 같으면 SORT ORDER BY 생략</td>
<td>p.94</td>
</tr>
<tr>
<td>ORDER BY 가공</td>
<td>별칭이 가공된 컬럼을 가리키면 소트 생략 불가 → <code>테이블.컬럼</code> 명시</td>
<td>p.97</td>
</tr>
<tr>
<td>SELECT-LIST 가공</td>
<td><code>MAX(NVL(col,0))</code> ✗ → <code>NVL(MAX(col),0)</code> ✓</td>
<td>p.100</td>
</tr>
<tr>
<td>First Row Stopkey 알고리즘</td>
<td>MIN/MAX에서 첫 레코드만 읽고 멈춤 <code>FIRST ROW</code></td>
<td>p.101, 361~366</td>
</tr>
<tr>
<td>자동 형변환</td>
<td>숫자 vs 문자 → <strong>문자를 숫자로</strong>, 날짜 vs 문자 → 문자를 날짜로, LIKE → 문자로</td>
<td>p.104~109</td>
</tr>
</tbody>
</table>
</div>
<h2 id="tc-7">인덱스 스캔 방식</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>Index Range Scan</td>
<td>필요한 범위만 수평 탐색. 선두 컬럼 가공 없이 조건</td>
<td>p.110</td>
</tr>
<tr>
<td>Index Full Scan</td>
<td>리프 전체를 처음부터 끝까지. 최적 인덱스 없을 때 차선책, 정렬 순서 보장</td>
<td>p.85, 111</td>
</tr>
<tr>
<td>Index Unique Scan</td>
<td>Unique 인덱스 <code>=</code> 조건, 수직적 탐색만</td>
<td>p.115</td>
</tr>
<tr>
<td>Index Skip Scan</td>
<td>선두 컬럼 조건 없어도. 선두 NDV 적고 후행 NDV 많을 때. <code>index_ss</code> / <code>no_index_ss</code></td>
<td>p.116, 199 · 힌트 p.118</td>
</tr>
<tr>
<td>Index Fast Full Scan</td>
<td>세그먼트 전체를 <strong>Multiblock</strong>, 순서 보장 X, 병렬 가능, 인덱스 컬럼만 필요. <code>index_ffs</code> / <code>no_index_ffs</code></td>
<td>p.122</td>
</tr>
<tr>
<td>Index Range Scan Descending</td>
<td>뒤에서 앞으로 → 내림차순. <code>index_desc</code></td>
<td>p.96, 124 · 힌트 p.370</td>
</tr>
</tbody>
</table>
</div>
<h1 id="tc-ch-3">3장 인덱스 튜닝</h1>
<h2 id="tc-8">테이블 액세스 최소화</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>테이블 랜덤 액세스</td>
<td>ROWID로 테이블 블록 찾아가기(<code>TABLE ACCESS BY INDEX ROWID</code>), 매번 해시 탐색</td>
<td>p.73, 129, 139, 166~167, 169</td>
</tr>
<tr>
<td>ROWID는 논리적 주소</td>
<td>버퍼캐시 위치를 몰라서 해시 체인 탐색 필요</td>
<td>3.1.1</td>
</tr>
<tr>
<td>메인 메모리 DB</td>
<td>인덱스에 메모리 주소(포인터)를 담아 바로 찾아감</td>
<td>p.133</td>
</tr>
<tr>
<td>클러스터링 팩터(CF)</td>
<td>같은 값을 갖는 데이터가 모여 있는 정도. 좋을수록 테이블 액세스 적음</td>
<td>군집성 계수, Clustering Factor p.136, 148, 509</td>
</tr>
<tr>
<td>버퍼 Pinning</td>
<td>읽은 블록을 고정해 두고 같은 블록 재방문 시 래치 없이 읽음</td>
<td>Buffer Pinning p.137</td>
</tr>
<tr>
<td>인덱스 손익분기점</td>
<td>인덱스 액세스가 Full Scan보다 느려지는 지점(보통 5~20%)</td>
<td>p.138</td>
</tr>
<tr>
<td>온라인 vs 배치 튜닝</td>
<td>온라인: 인덱스·NL / 배치: Full Scan·해시·파티션·병렬</td>
<td>3.1.3</td>
</tr>
<tr>
<td>인덱스 컬럼 추가</td>
<td>테이블 필터로 많이 버려지면 그 컬럼을 인덱스 뒤에 추가</td>
<td>p.145</td>
</tr>
<tr>
<td>컬럼 추가와 CF</td>
<td>변별력 좋은 컬럼을 뒤에 붙이면 정렬이 바뀌어 클러스터링 팩터가 나빠질 수 있음</td>
<td>3.1.4</td>
</tr>
<tr>
<td>인덱스만 읽고 처리</td>
<td>모든 컬럼이 인덱스에 있으면 테이블 액세스 없음(Covered)</td>
<td>p.149</td>
</tr>
<tr>
<td>Include 인덱스</td>
<td>리프에만 컬럼 추가(SQL Server). 오라클엔 없음</td>
<td>p.150</td>
</tr>
<tr>
<td>IOT</td>
<td>Index-Organized Table, 테이블을 인덱스 구조로</td>
<td>인덱스 구조 테이블 p.152</td>
</tr>
<tr>
<td>힙 구조 테이블</td>
<td>Heap-Organized Table, 일반 테이블(랜덤 입력)</td>
<td>p.152~153</td>
</tr>
<tr>
<td>Freelist</td>
<td>입력 가능한 블록 목록</td>
<td>p.153</td>
</tr>
<tr>
<td>인덱스 클러스터 테이블</td>
<td>클러스터 키 같은 레코드를 한 블록에</td>
<td>클러스터 테이블 p.154, Cluster Index p.155</td>
</tr>
<tr>
<td>해시 클러스터 테이블</td>
<td>해시 함수로 클러스터 찾아감, = 조건만</td>
<td>p.156</td>
</tr>
</tbody>
</table>
</div>
<h2 id="tc-9">부분범위 처리</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>부분범위 처리</td>
<td>Fetch Call마다 일정량(Array Size)씩 나눠 전송</td>
<td>p.158, 352, 355, 358</td>
</tr>
<tr>
<td>Array Size</td>
<td>한 번 Fetch에 전송하는 건수(SQL*Plus 15, JDBC 10)</td>
<td>p.160~163</td>
</tr>
<tr>
<td>3-Tier 부분범위 처리</td>
<td>커서를 닫으므로 <strong>Top N + 페이징</strong>으로 구현</td>
<td>3.2.3</td>
</tr>
<tr>
<td>배치 I/O</td>
<td>ROWID를 모아 블록 단위로 한꺼번에 테이블 액세스(정렬 순서 바뀔 수 있음)</td>
<td>Batch I/O p.169, 271</td>
</tr>
</tbody>
</table>
</div>
<h2 id="tc-10">인덱스 스캔 효율화</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>인덱스 스캔 효율성</td>
<td>리프에서 읽은 것 중 결과로 남는 비율</td>
<td>p.71, 180</td>
</tr>
<tr>
<td>인덱스 액세스 조건</td>
<td>스캔 <strong>범위를 결정</strong>하는 조건 <code>access()</code></td>
<td>Access Predicates p.185, 189</td>
</tr>
<tr>
<td>인덱스 필터 조건</td>
<td>테이블 액세스 여부 결정(범위 못 줄임) <code>filter()</code></td>
<td>Filter Predicates p.185, 189</td>
</tr>
<tr>
<td>테이블 필터 조건</td>
<td>최종 결과 선택 여부 결정</td>
<td>3.3.3</td>
</tr>
<tr>
<td>군집성 규칙</td>
<td>선행 컬럼 모두 <code>=</code> + <strong>첫 번째 범위 조건까지</strong> 액세스 조건</td>
<td>3.3.4</td>
</tr>
<tr>
<td>범위 조건 위치</td>
<td>= 조건 컬럼 앞, 범위 조건 컬럼 뒤</td>
<td>3.3.5</td>
</tr>
<tr>
<td>BETWEEN → IN-List</td>
<td>선두 범위 조건을 IN으로 바꿔 = 처럼. IN 개수 적을 때만</td>
<td>3.3.6</td>
</tr>
<tr>
<td>IN 조건은 = 인가</td>
<td>IN-List Iterator일 때만 =. 데이터 분포 따라 필터가 나을 수도</td>
<td>3.3.8</td>
</tr>
<tr>
<td>num_index_keys</td>
<td>IN-List를 몇 번째 컬럼까지 액세스 조건으로 쓸지 지정</td>
<td>p.207</td>
</tr>
<tr>
<td>BETWEEN vs LIKE</td>
<td>LIKE가 더 넓게 스캔할 수 있음 → 범위 검색은 BETWEEN</td>
<td>3.3.9</td>
</tr>
<tr>
<td>옵션 조건 처리</td>
<td>OR / LIKE·BETWEEN / UNION ALL / NVL·DECODE / Dynamic SQL</td>
<td>3.3.11</td>
</tr>
<tr>
<td>_or_expand_nvl_predicate</td>
<td><code>col = NVL(:v, col)</code>을 OR-Expansion으로 분기하는 파라미터</td>
<td>p.222</td>
</tr>
<tr>
<td>다이나믹 SQL</td>
<td>입력된 조건만 붙이는 SQL. 바인드 변수 필수</td>
<td>Dynamic SQL p.224</td>
</tr>
<tr>
<td>함수호출부하</td>
<td>PL/SQL 함수는 느림(인터프리터, 컨텍스트 스위칭, Recursive Call) → 액세스 조건으로 먼저 줄이기, 대량이면 조인으로</td>
<td>3.3.12</td>
</tr>
<tr>
<td>스캔 효율 측정</td>
<td>트레이스의 인덱스 단계 cr(읽은 블록)과 Rows(결과) 비교</td>
<td>3.3.2</td>
</tr>
</tbody>
</table>
</div>
<h2 id="tc-11">인덱스 설계</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>인덱스가 많으면</td>
<td>DML 성능 저하, DB 사이즈 증가, 관리 비용 증가</td>
<td>3.4.1</td>
</tr>
<tr>
<td>인덱스 분할</td>
<td>리프 블록이 꽉 차서 블록을 나누는 작업</td>
<td>Index Split p.231</td>
</tr>
<tr>
<td>두 가지 선택 기준</td>
<td>① 항상(자주) 쓰는 컬럼 선정 ② <strong>= 조건 컬럼을 앞쪽</strong>에</td>
<td>3.4.2</td>
</tr>
<tr>
<td>기타 판단 기준</td>
<td>수행 빈도(NL Inner 쪽 중요), 업무 중요도, CF, 데이터량, DML 부하, 저장 공간</td>
<td>3.4.3</td>
</tr>
<tr>
<td>소트 생략 컬럼 순서</td>
<td>= 조건 컬럼 → ORDER BY 컬럼(순서대로) → 나머지 조건 컬럼</td>
<td>3.4.5</td>
</tr>
<tr>
<td>선택도</td>
<td>조건절로 선택되는 레코드 비율</td>
<td>Selectivity p.241~244, 501</td>
</tr>
<tr>
<td>선분이력</td>
<td>시작일·종료일로 유효 기간 표현</td>
<td>p.378</td>
</tr>
<tr>
<td>중복 인덱스</td>
<td>완전 중복(앞부분 같음) 제거, 불완전 중복은 NDV 보고 통합</td>
<td>3.4.7</td>
</tr>
<tr>
<td>NDV</td>
<td>Number of Distinct Values, 중복 제거한 값 개수</td>
<td>p.245, 501</td>
</tr>
</tbody>
</table>
</div>
<h1 id="tc-ch-4">4장 조인 튜닝</h1>
<h2 id="tc-12">NL 조인</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>NL 조인</td>
<td>Outer 레코드마다 Inner를 인덱스로 탐색(중첩 루프)</td>
<td>NL(Nested Loops) 조인 p.255, 296~298</td>
</tr>
<tr>
<td>Inner 인덱스</td>
<td>Inner 쪽 조인 컬럼에 인덱스 필수</td>
<td>4.1.1</td>
</tr>
<tr>
<td>실행계획 제어</td>
<td><code>ORDERED</code>/<code>LEADING</code> + <code>USE_NL(inner)</code></td>
<td>leading·use_nl p.261</td>
</tr>
<tr>
<td>NL 튜닝 포인트</td>
<td>Outer/Inner 테이블 필터로 버려지는 양, 조인 횟수, 드라이빙 범위</td>
<td>4.1.4</td>
</tr>
<tr>
<td>NL 조인 특징</td>
<td>① 랜덤 액세스 위주 ② 한 레코드씩 → 부분범위 처리 ③ 인덱스 구성 중요 → OLTP</td>
<td>4.1.5</td>
</tr>
<tr>
<td>테이블 Prefetch</td>
<td>곧 읽을 블록 미리 적재. <code>nlj_prefetch</code></td>
<td>Table Prefetch p.270</td>
</tr>
<tr>
<td>NL 조인 배치 I/O</td>
<td>Inner ROWID 모아 한꺼번에. NESTED LOOPS 두 번. <code>nlj_batching</code></td>
<td>p.271~272</td>
</tr>
</tbody>
</table>
</div>
<h2 id="tc-13">소트 머지·해시 조인</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>SGA vs PGA</td>
<td>SGA 공유(래치 필요) / PGA 프로세스 전용(래치 없이 빠름)</td>
<td>PGA p.274~275, 277, 278, 286</td>
</tr>
<tr>
<td>소트 머지 조인</td>
<td>① 양쪽 조인 컬럼 기준 정렬 ② 머지. <code>use_merge</code></td>
<td>Sort Merge Join p.274, 296~298 · 힌트 p.276</td>
</tr>
<tr>
<td>소트 머지 주용도</td>
<td>= 아닌 조인 조건, 조인 조건 없는 카테시안 곱, 이미 정렬된 집합</td>
<td>4.2.4</td>
</tr>
<tr>
<td>Sort Area</td>
<td>PGA 내 정렬 공간</td>
<td>p.276~278, 331~332, 381</td>
</tr>
<tr>
<td>해시 조인</td>
<td>작은 쪽 Build → 해시 테이블, 큰 쪽 Probe. <code>use_hash</code></td>
<td>Hash Join p.282, 296~298</td>
</tr>
<tr>
<td>Build Input</td>
<td>해시 테이블을 만드는 쪽(작아야 유리)</td>
<td>p.283~284, 288~296</td>
</tr>
<tr>
<td>Probe Input</td>
<td>해시 테이블을 탐색하는 쪽</td>
<td>p.284~285</td>
</tr>
<tr>
<td>Hash Area</td>
<td>PGA 내 해시 테이블 공간</td>
<td>p.284, 286~287</td>
</tr>
<tr>
<td>대용량 Build Input</td>
<td>양쪽을 해시 값으로 파티션 → 짝(Pair)별 조인</td>
<td>4.3.3</td>
</tr>
<tr>
<td>swap_join_inputs</td>
<td>Build Input을 지정(바꾸기)</td>
<td>p.291, 294~296</td>
</tr>
<tr>
<td>조인 메소드 선택</td>
<td>소량 NL / 대량 해시 / 대량+비등치 소트 머지. 수행빈도 높으면 NL 우선</td>
<td>4.3.5</td>
</tr>
<tr>
<td>해시 테이블 특징</td>
<td>쿼리 하나를 위해 만들고 끝나면 소멸 → 빈번한 쿼리엔 부담</td>
<td>4.3.5</td>
</tr>
</tbody>
</table>
</div>
<h2 id="tc-14">서브쿼리·뷰 조인</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>쿼리 변환</td>
<td>최적화 전 SQL을 유리한 형태로 변환</td>
<td>Query Transformation p.299</td>
</tr>
<tr>
<td>서브쿼리 조인</td>
<td>서브쿼리를 조인 형태로 처리</td>
<td>p.299</td>
</tr>
<tr>
<td>필터 오퍼레이션</td>
<td>Unnesting 안 하면 메인 레코드마다 서브쿼리 반복(캐싱, 순서 고정)</td>
<td><code>no_unnest</code> p.302, 327</td>
</tr>
<tr>
<td>서브쿼리 Unnesting</td>
<td>서브쿼리를 메인과 같은 레벨로 풀기. <code>unnest</code></td>
<td>Subquery Unnesting p.304, 339 · 힌트 p.304~308, 326</td>
</tr>
<tr>
<td>서브쿼리 Flattening</td>
<td>Unnesting과 같은 말(평평하게 풀기)</td>
<td>p.304</td>
</tr>
<tr>
<td>세미 조인 힌트</td>
<td><code>nl_sj</code>, <code>hash_sj</code>, <code>merge_sj</code></td>
<td>p.304, 306, 27</td>
</tr>
<tr>
<td>ROWNUM 주의</td>
<td>서브쿼리 안 ROWNUM은 Unnesting을 막음</td>
<td>4.4.2</td>
</tr>
<tr>
<td>서브쿼리 Pushing</td>
<td>필터 서브쿼리를 앞 단계로 당김. <code>push_subq</code> / <code>no_push_subq</code></td>
<td>p.308, 310~311</td>
</tr>
<tr>
<td>뷰 머징</td>
<td>인라인 뷰를 메인과 합침. <code>merge</code> / <code>no_merge</code></td>
<td>View Merging p.312, 490 · 힌트 p.312~314</td>
</tr>
<tr>
<td>조인 조건 Pushdown</td>
<td>조인 조건을 뷰 안으로 건건이. <code>push_pred</code> / <code>no_push_pred</code></td>
<td>p.313, 316, 324 · 힌트 p.313, 28</td>
</tr>
<tr>
<td>Predicate Pushing</td>
<td>조건절을 뷰 안으로 밀어 넣기</td>
<td>p.373</td>
</tr>
<tr>
<td>Lateral 인라인 뷰</td>
<td>인라인 뷰에서 메인 컬럼 참조(12c)</td>
<td>p.315</td>
</tr>
<tr>
<td>Cross/Outer Apply 조인</td>
<td>Lateral과 같은 기능의 문법(12c)</td>
<td>p.315, 316</td>
</tr>
<tr>
<td>스칼라 서브쿼리</td>
<td>레코드당 값 하나, NL + Outer 조인처럼 동작</td>
<td>Scalar Subquery p.300, 317</td>
</tr>
<tr>
<td>스칼라 서브쿼리 캐싱</td>
<td>입력값→출력값 캐시. 입력 종류 적을 때 효과, 많으면 역효과</td>
<td>p.318 · <code>_query_execution_cach_max_size</code> p.319</td>
</tr>
<tr>
<td>스칼라 서브쿼리 Unnesting</td>
<td>12c~ 조인으로 변환. <code>_optimizer_unnest_scalar_sq</code></td>
<td>p.325~326</td>
</tr>
</tbody>
</table>
</div>
<h1 id="tc-ch-5">5장 소트 튜닝</h1>
<h2 id="tc-15">소트 연산</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>메모리 소트</td>
<td>Sort Area 안에서 완료(In-memory Sort, Internal)</td>
<td>p.331</td>
</tr>
<tr>
<td>디스크 소트</td>
<td>Temp 테이블스페이스까지 사용(External)</td>
<td>p.331</td>
</tr>
<tr>
<td>Sort Run</td>
<td>디스크 소트 중 Temp에 저장한 정렬 조각</td>
<td>p.332</td>
</tr>
<tr>
<td>Optimal 소트</td>
<td>메모리 안에서 끝나는 소트</td>
<td></td>
</tr>
<tr>
<td>Sort Aggregate</td>
<td>전체 집계. 실제 정렬은 안 함</td>
<td>p.333</td>
</tr>
<tr>
<td>Sort Order By</td>
<td>ORDER BY 정렬</td>
<td>p.335</td>
</tr>
<tr>
<td>Sort Group By</td>
<td>정렬 알고리즘 그룹 집계</td>
<td>p.335~339, 379</td>
</tr>
<tr>
<td>Hash Group By</td>
<td>해싱 그룹 집계(10gR2~), 정렬 보장 X</td>
<td>p.337~339</td>
</tr>
<tr>
<td>Sort Unique</td>
<td>중복 제거(UNION, DISTINCT, Unnesting 서브쿼리)</td>
<td>p.339</td>
</tr>
<tr>
<td>Sort Join</td>
<td>소트 머지 조인</td>
<td>5.1.2</td>
</tr>
<tr>
<td>Window Sort</td>
<td>윈도우(분석) 함수</td>
<td>p.342</td>
</tr>
<tr>
<td>정렬 보장</td>
<td>GROUP BY 결과는 정렬 보장 X → ORDER BY 명시</td>
<td>5.1.2</td>
</tr>
</tbody>
</table>
</div>
<h2 id="tc-16">소트 없애기·줄이기</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>UNION vs UNION ALL</td>
<td>UNION은 Sort Unique. 상호배타적이면 UNION ALL(겹치면 LNNVL로 배제)</td>
<td>5.2.1</td>
</tr>
<tr>
<td>EXISTS 활용</td>
<td>DISTINCT·MINUS 대신 EXISTS/NOT EXISTS → 소트 없음, 부분범위 처리</td>
<td>5.2.2</td>
</tr>
<tr>
<td>조인 방식 변경</td>
<td>해시 → NL로 바꾸면 인덱스 순서 유지로 소트 생략</td>
<td>5.2.3</td>
</tr>
<tr>
<td>Sort Order By 생략</td>
<td>[= 조건 컬럼 + ORDER BY 컬럼] 인덱스</td>
<td>5.3.1</td>
</tr>
<tr>
<td>Top N 쿼리</td>
<td>인라인 뷰 ORDER BY + ROWNUM. <code>COUNT (STOPKEY)</code></td>
<td>p.352, 383</td>
</tr>
<tr>
<td>Top N Stopkey 알고리즘</td>
<td>인덱스로 소트 생략 + ROWNUM → N건 읽고 멈춤</td>
<td>p.357, 373</td>
</tr>
<tr>
<td>페이징 처리</td>
<td>ROWNUM &lt;= :page<em>10 은 </em><em>안쪽</em>*, NO &gt;= 시작은 바깥쪽</td>
<td>p.354</td>
</tr>
<tr>
<td>페이징 ANTI 패턴</td>
<td>ROWNUM 조건을 바깥에 BETWEEN으로 → STOPKEY 안 됨</td>
<td>5.3.2</td>
</tr>
<tr>
<td>Row Limiting</td>
<td><code>FETCH FIRST n ROWS ONLY</code>, <code>OFFSET</code>(12c~)</td>
<td>p.353, 373</td>
</tr>
<tr>
<td>MIN/MAX 최적화</td>
<td>조건·집계 컬럼이 모두 인덱스에 → <code>INDEX RANGE SCAN (MIN/MAX)</code> + FIRST ROW</td>
<td>5.3.3</td>
</tr>
<tr>
<td>이력 조회</td>
<td>최종 이력: First Row Stopkey, INDEX_DESC + ROWNUM, Top N, 전체는 윈도우 함수</td>
<td>5.3.4</td>
</tr>
<tr>
<td>Sort Group By 생략</td>
<td>GROUP BY 컬럼이 인덱스 선두 → <code>SORT GROUP BY NOSORT</code></td>
<td>Sort Group By Nosort p.379</td>
</tr>
<tr>
<td>소트 데이터 줄이기</td>
<td>정렬 후 가공, 필요한 컬럼만 SELECT</td>
<td>5.4.1</td>
</tr>
<tr>
<td>Top N 소트 알고리즘</td>
<td>N 크기 배열만 유지 → <code>SORT ORDER BY STOPKEY</code></td>
<td>p.384~387</td>
</tr>
<tr>
<td>sort_area_size</td>
<td>수동 PGA 관리 시 Sort Area 크기</td>
<td>p.386</td>
</tr>
<tr>
<td>분석함수 Top N</td>
<td>RANK·ROW_NUMBER → <code>WINDOW SORT PUSHED RANK</code>(MAX OVER보다 유리)</td>
<td>5.4.4</td>
</tr>
</tbody>
</table>
</div>
<h1 id="tc-ch-6">6장 DML 튜닝</h1>
<h2 id="tc-17">기본 DML 튜닝</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>DML 성능 요소</td>
<td>인덱스, 무결성 제약, 조건절, 서브쿼리, Redo·Undo 로깅, Lock, 커밋</td>
<td>6.1.1</td>
</tr>
<tr>
<td>Redo 로깅</td>
<td>모든 변경 기록 → Database Recovery, Cache Recovery, Fast Commit</td>
<td>Redo 로그 p.399~400</td>
</tr>
<tr>
<td>Redo 로그버퍼</td>
<td>커밋 시 LGWR이 디스크로 기록</td>
<td>p.405~407</td>
</tr>
<tr>
<td>Undo 로깅</td>
<td>변경 전 데이터 → Rollback, Transaction Recovery, Read Consistency</td>
<td>p.401</td>
</tr>
<tr>
<td>MVCC</td>
<td>쿼리 시작 시점 기준 일관된 데이터 제공(Undo로 CR Copy)</td>
<td>p.401~403, 467</td>
</tr>
<tr>
<td>Current 모드</td>
<td>블록의 <strong>현재 상태</strong> 그대로 읽기</td>
<td>p.402~403, 540</td>
</tr>
<tr>
<td>Consistent 모드</td>
<td>쿼리 시작 시점 기준으로 읽기</td>
<td>p.402~403, 540</td>
</tr>
<tr>
<td>SCN</td>
<td>System Commit Number, 일관성 판단 기준</td>
<td>p.403</td>
</tr>
<tr>
<td>데이터베이스 Call</td>
<td>Parse / Execute / Fetch</td>
<td>p.408~409</td>
</tr>
<tr>
<td>User Call</td>
<td>DBMS 외부(WAS 등)에서 들어오는 Call</td>
<td>p.409</td>
</tr>
<tr>
<td>Recursive Call</td>
<td>DBMS 내부(딕셔너리 조회, PL/SQL 내 SQL)</td>
<td>p.409</td>
</tr>
<tr>
<td>One SQL</td>
<td>루프 대신 하나의 SQL로 → Call 최소화</td>
<td>6.1.2</td>
</tr>
<tr>
<td>Array Processing</td>
<td>한 번의 Call로 여러 건(FORALL, executeBatch)</td>
<td>p.414</td>
</tr>
<tr>
<td>인덱스·제약 해제</td>
<td>대량 DML 전 PK disable·인덱스 unusable → 후 재생성</td>
<td>6.1.4</td>
</tr>
<tr>
<td>skip_unusable_indexes</td>
<td>Unusable 인덱스 무시하고 DML 진행</td>
<td>p.419</td>
</tr>
<tr>
<td>수정가능 조인 뷰</td>
<td>조인 뷰로 UPDATE. 키 보존 테이블 컬럼만 수정</td>
<td>Updatable/Modifiable Join View p.422, 425</td>
</tr>
<tr>
<td>키 보존 테이블</td>
<td>조인 결과에서도 Unique하게 식별되는 테이블(Key-Preserved)</td>
<td>p.427</td>
</tr>
<tr>
<td>비 키-보존 테이블</td>
<td>Non Key-Preserved Table, 수정 불가 → ORA-01779</td>
<td>p.427</td>
</tr>
<tr>
<td>bypass_ujvc</td>
<td>키 보존 검사 생략 힌트(10g까지)</td>
<td>p.428, 435</td>
</tr>
<tr>
<td>MERGE 문</td>
<td>UPSERT(9i~). Source 기준 Target과 Left Outer 조인 → 성공 UPDATE, 실패 INSERT. Optional Clauses, Conditional, DELETE 절</td>
<td>p.430</td>
</tr>
</tbody>
</table>
</div>
<h2 id="tc-18">Direct Path I/O</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>Direct Path I/O</td>
<td>버퍼캐시를 거치지 않고 직접 읽고 쓰기</td>
<td>p.436</td>
</tr>
<tr>
<td>Direct Path Insert</td>
<td>Freelist 무시, <strong>HWM 바깥</strong>에 순차 입력, Undo 없음, NOLOGGING 가능</td>
<td>p.438</td>
</tr>
<tr>
<td>Direct Path Insert 방법</td>
<td><code>APPEND</code>, <code>APPEND_VALUES</code>, 병렬 INSERT, CTAS, SQL*Loader direct</td>
<td>6.2.2</td>
</tr>
<tr>
<td>Direct Path 주의</td>
<td>Exclusive TM Lock, 빈 공간 재활용 X</td>
<td>6.2.2</td>
</tr>
<tr>
<td>HWM</td>
<td>High-Water Mark, 사용된 공간의 최고 지점</td>
<td>p.438~440</td>
</tr>
<tr>
<td>병렬 DML</td>
<td><code>ALTER SESSION ENABLE PARALLEL DML</code> / <code>enable_parallel_dml</code></td>
<td>p.441 · 힌트 p.442</td>
</tr>
<tr>
<td>parallel</td>
<td>병렬 처리 힌트 <code>PARALLEL(t 4)</code></td>
<td>p.437</td>
</tr>
<tr>
<td>parallel_index</td>
<td>인덱스 병렬 스캔 힌트</td>
<td>p.437</td>
</tr>
<tr>
<td>QC</td>
<td>Query Coordinator. DML이 PX COORDINATOR 위에 있으면 QC 혼자 처리</td>
<td>p.442~443</td>
</tr>
</tbody>
</table>
</div>
<h2 id="tc-19">파티션</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>파티션 Pruning</td>
<td>조건절 보고 불필요한 파티션 제외(정적/동적)</td>
<td>p.446</td>
</tr>
<tr>
<td>Range 파티션</td>
<td>값 범위(날짜 등)</td>
<td>p.445</td>
</tr>
<tr>
<td>해시 파티션</td>
<td>해시 함수로 분산, = / IN 조건일 때 Pruning</td>
<td>p.447</td>
</tr>
<tr>
<td>리스트 파티션</td>
<td>불연속 값 목록</td>
<td>List 파티션 p.448</td>
</tr>
<tr>
<td>비파티션 테이블</td>
<td>파티셔닝하지 않은 테이블</td>
<td>Non-Partitioned Table p.449</td>
</tr>
<tr>
<td>로컬 파티션 인덱스</td>
<td>테이블 파티션과 1:1</td>
<td>Local Partitioned Index p.449</td>
</tr>
<tr>
<td>글로벌 파티션 인덱스</td>
<td>테이블과 다른 기준 파티셔닝</td>
<td>Global Partitioned Index p.449, 451</td>
</tr>
<tr>
<td>비파티션 인덱스</td>
<td>파티셔닝 안 한 인덱스</td>
<td>Non-Partitioned Index p.449, 452, 454 · Global p.453</td>
</tr>
<tr>
<td>Prefixed 인덱스</td>
<td>파티션 키가 인덱스 선두</td>
<td>p.453</td>
</tr>
<tr>
<td>Nonprefixed 인덱스</td>
<td>파티션 키가 선두가 아니거나 없음</td>
<td>p.453</td>
</tr>
<tr>
<td>로컬/글로벌 Prefixed</td>
<td>조합별 지원 여부 (글로벌 파티션 인덱스는 Prefixed만)</td>
<td>p.454</td>
</tr>
<tr>
<td>로컬 인덱스 장점</td>
<td>파티션 ADD·DROP·EXCHANGE 때 재생성 불필요 → 무중단 관리</td>
<td>6.3.2</td>
</tr>
<tr>
<td>Unique 인덱스 제약</td>
<td>Unique 인덱스를 파티셔닝하려면 파티션 키가 인덱스 컬럼에 포함</td>
<td>6.3.2</td>
</tr>
<tr>
<td>파티션 Exchange</td>
<td>임시 테이블과 파티션 세그먼트 교체 → 대량 UPDATE</td>
<td>6.3.3</td>
</tr>
<tr>
<td>파티션 Drop/Truncate</td>
<td>대량 DELETE 대신. 일부 남기면 임시 저장 후 Truncate + 재입력</td>
<td>6.3.4</td>
</tr>
<tr>
<td>파티션 단위 대량 INSERT</td>
<td>해당 파티션만 NOLOGGING, 로컬 인덱스 Unusable → APPEND → REBUILD PARTITION</td>
<td>6.3.5</td>
</tr>
</tbody>
</table>
</div>
<h2 id="tc-20">Lock과 동시성 제어</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>DML 로우 Lock</td>
<td>같은 로우 동시 변경 방지(TX Lock), 배타적</td>
<td>p.467</td>
</tr>
<tr>
<td>DML 테이블 Lock</td>
<td>TM Lock. 테이블 구조 변경 방지</td>
<td>p.468</td>
</tr>
<tr>
<td>Lock 호환성</td>
<td>모드별 동시 획득 가능 여부 표</td>
<td>p.468</td>
</tr>
<tr>
<td>ddl_lock_timeout</td>
<td>DDL이 Lock 대기할 시간</td>
<td>p.470</td>
</tr>
<tr>
<td>For Update</td>
<td>읽을 때 Lock. <code>WAIT n</code>, <code>NOWAIT</code>, <code>SKIP LOCKED</code></td>
<td>p.470, 473, 478~479</td>
</tr>
<tr>
<td>블로킹</td>
<td>선행 Lock 때문에 후행이 멈춘 상태 → 커밋으로 해소</td>
<td>6.4.1</td>
</tr>
<tr>
<td>교착상태</td>
<td>서로 상대 Lock을 기다림(Deadlock, ORA-00060)</td>
<td>p.471</td>
</tr>
<tr>
<td>비동기식 커밋</td>
<td><code>COMMIT WRITE NOWAIT</code> LGWR 기록 안 기다림</td>
<td>p.471~472</td>
</tr>
<tr>
<td>배치 커밋</td>
<td><code>COMMIT WRITE BATCH</code></td>
<td>p.472</td>
</tr>
<tr>
<td>동시성 제어</td>
<td>여러 트랜잭션 동시 갱신 시 일관성 보장</td>
<td>Concurrency Control p.404, 472</td>
</tr>
<tr>
<td>비관적 동시성 제어</td>
<td>읽을 때 Lock(SELECT FOR UPDATE)</td>
<td>Pessimistic p.472~473</td>
</tr>
<tr>
<td>낙관적 동시성 제어</td>
<td>변경 시점에 값이 바뀌었는지 확인</td>
<td>Optimistic p.473, 475</td>
</tr>
</tbody>
</table>
</div>
<h2 id="tc-21">채번</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>채번 테이블</td>
<td>번호 테이블 읽고 +1 UPDATE. 누락 없음, Lock 경합</td>
<td>p.480, 490</td>
</tr>
<tr>
<td>시퀀스</td>
<td>NEXTVAL. 빠름, 번호 누락 가능</td>
<td>p.480, 483~488, 490~493</td>
</tr>
<tr>
<td>MAX + 1</td>
<td>최대값+1. 중복 시 재시도, 인덱스 필수</td>
<td>6.4.3</td>
</tr>
<tr>
<td>시퀀스 Lock</td>
<td>로우 캐시 Lock, 시퀀스 캐시 Lock, SV Lock(RAC). CACHE 늘리기</td>
<td>p.484~487</td>
</tr>
<tr>
<td>글로벌 시퀀스</td>
<td>일반 시퀀스(Global Sequence)</td>
<td>p.493, 496</td>
</tr>
<tr>
<td>세션 시퀀스</td>
<td>세션 안에서만 유효(12c, Session Sequence)</td>
<td>p.493, 496</td>
</tr>
<tr>
<td>Scalable 시퀀스</td>
<td>인스턴스·세션 번호 접두로 인덱스 경합 해소(18c)</td>
<td>p.497</td>
</tr>
<tr>
<td>Right Growing 인덱스</td>
<td>순차 증가 키 → 맨 오른쪽 리프에만 입력 → 경합</td>
<td>p.495~498</td>
</tr>
</tbody>
</table>
</div>
<h1 id="tc-ch-7">7장 SQL 옵티마이저</h1>
<h2 id="tc-22">통계정보와 비용</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>선택도</td>
<td>조건절로 선택되는 레코드 <strong>비율</strong>. = 조건은 1/NDV</td>
<td>Selectivity p.241~244, 501</td>
</tr>
<tr>
<td>카디널리티</td>
<td>선택되는 레코드 <strong>개수</strong> = 총 로우 수 × 선택도</td>
<td>Cardinality p.501</td>
</tr>
<tr>
<td>테이블 통계</td>
<td>NUM_ROWS, BLOCKS, AVG_ROW_LEN</td>
<td>p.502</td>
</tr>
<tr>
<td>인덱스 통계</td>
<td>BLEVEL, LEAF_BLOCKS, CLUSTERING_FACTOR, DISTINCT_KEYS</td>
<td>p.503</td>
</tr>
<tr>
<td>컬럼 통계</td>
<td>NUM_DISTINCT(NDV), NUM_NULLS, LOW/HIGH_VALUE, DENSITY</td>
<td>p.505</td>
</tr>
<tr>
<td>히스토그램</td>
<td>값 분포가 고르지 않을 때 정확한 선택도 계산</td>
<td>p.505</td>
</tr>
<tr>
<td>시스템 통계</td>
<td>CPU 속도, Single/Multiblock I/O 속도 등</td>
<td>System Statistics p.31, 507</td>
</tr>
<tr>
<td>오브젝트 통계</td>
<td>테이블·인덱스·컬럼 통계</td>
<td>p.31</td>
</tr>
<tr>
<td>인덱스 액세스 비용</td>
<td>BLEVEL + LEAF_BLOCKS×유효 인덱스 선택도 + CF×유효 테이블 선택도</td>
<td>7.1.3</td>
</tr>
<tr>
<td>모두 = 조건일 때 비용</td>
<td>BLEVEL + AVG_LEAF_BLOCKS_PER_KEY + AVG_DATA_BLOCKS_PER_KEY</td>
<td>7.1.3</td>
</tr>
<tr>
<td>유효 인덱스 선택도</td>
<td>액세스 조건으로 선택될 인덱스 레코드 비율</td>
<td>p.509</td>
</tr>
<tr>
<td>유효 테이블 선택도</td>
<td>인덱스 컬럼 조건 전체로 선택될 비율(테이블 방문 비율)</td>
<td>p.509</td>
</tr>
<tr>
<td>I/O 비용 모델</td>
<td>예상 I/O Call 횟수</td>
<td>p.510</td>
</tr>
<tr>
<td>CPU 비용 모델</td>
<td>I/O 시간 + CPU 시간을 Single Block I/O 시간으로 나눈 값</td>
<td>p.510</td>
</tr>
</tbody>
</table>
</div>
<h2 id="tc-23">옵티마이저</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>규칙기반 옵티마이저</td>
<td>RBO, 우선순위 규칙. 데이터량 무시</td>
<td>Rule-Based p.511~513</td>
</tr>
<tr>
<td>비용기반 옵티마이저</td>
<td>CBO, 통계로 비용 계산</td>
<td>Cost-Based p.511</td>
</tr>
<tr>
<td>옵티마이저 모드</td>
<td>ALL_ROWS / FIRST_ROWS / FIRST_ROWS_N</td>
<td>p.514 · optimizer_mode p.515</td>
</tr>
<tr>
<td>ALL_ROWS</td>
<td>전체 처리량 최적(DW·배치, 기본값)</td>
<td>All_Rows p.514~515</td>
</tr>
<tr>
<td>FIRST_ROWS_N</td>
<td>처음 N건 응답 최적(OLTP)</td>
<td>First_Rows_N p.514~515</td>
</tr>
<tr>
<td>영향 요소</td>
<td>SQL 형태, 옵티마이징 팩터, 제약, 통계, 힌트, 파라미터</td>
<td>7.2.3</td>
</tr>
<tr>
<td>옵티마이저 한계</td>
<td>통계 불완전(샘플링, 상관관계, 바인드 변수 사용 시 히스토그램 활용 불가), 최적화 시간 제약</td>
<td>7.2.4</td>
</tr>
<tr>
<td>개발자의 역할</td>
<td>최소 블록 SQL, 옵티마이징 팩터 제공, 필요시 힌트</td>
<td>7.2.5</td>
</tr>
</tbody>
</table>
</div>
<h1 id="tc-ch-8">부록 SQL 분석 도구</h1>
<h2 id="tc-24">분석 도구</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>EXPLAIN PLAN</td>
<td>예상 실행계획을 PLAN_TABLE에 저장</td>
<td>부록 1</td>
</tr>
<tr>
<td>AutoTrace</td>
<td><code>SET AUTOTRACE ON / TRACEONLY / EXPLAIN / STATISTICS</code></td>
<td>부록 2</td>
</tr>
<tr>
<td>consistent gets</td>
<td>Consistent 모드로 읽은 블록 수</td>
<td>AutoTrace 통계</td>
</tr>
<tr>
<td>db block gets</td>
<td>Current 모드로 읽은 블록 수</td>
<td>AutoTrace 통계</td>
</tr>
<tr>
<td>SQL 트레이스</td>
<td><code>ALTER SESSION SET SQL_TRACE = TRUE</code> → TKProf</td>
<td>부록 3</td>
</tr>
<tr>
<td>TKProf 컬럼</td>
<td>count, cpu, elapsed, <strong>disk</strong>(물리), <strong>query</strong>(consistent), <strong>current</strong>, rows</td>
<td>부록 3</td>
</tr>
<tr>
<td>cr / pr / pw</td>
<td>Row Source의 consistent read / physical read / write (하위 포함 누적)</td>
<td>부록 3</td>
</tr>
<tr>
<td>10046 이벤트</td>
<td>레벨 4 바인드, 8 대기 이벤트, 12 둘 다</td>
<td>부록 3</td>
</tr>
<tr>
<td>DBMS_XPLAN.DISPLAY</td>
<td>예상 실행계획 출력</td>
<td>부록 4</td>
</tr>
<tr>
<td>DISPLAY_CURSOR</td>
<td>캐시 커서의 실제 계획·통계. <code>gather_plan_statistics</code> + <code>ALLSTATS LAST</code></td>
<td>부록 4</td>
</tr>
<tr>
<td>E-Rows / A-Rows</td>
<td>예상 / 실제 Rows. 차이 크면 통계 점검</td>
<td>부록 4</td>
</tr>
<tr>
<td>Starts / Buffers</td>
<td>반복 횟수 / 읽은 블록 수</td>
<td>부록 4</td>
</tr>
<tr>
<td>실시간 SQL 모니터링</td>
<td>5초 이상, 병렬, MONITOR 힌트 SQL</td>
<td><code>_sqlmon_threshold</code>, <code>_sqlmon_max_planlines</code> p.549</td>
</tr>
<tr>
<td>V$SQL</td>
<td>커서별 수행 통계(BUFFER_GETS, DISK_READS, EXECUTIONS...)</td>
<td>p.551</td>
</tr>
</tbody>
</table>
</div>
<h1 id="tc-ch-9">힌트·파라미터 모음</h1>
<h2 id="tc-25">옵티마이저 힌트 (색인)</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>all_rows</td>
<td>전체 처리량 최적 모드</td>
<td>p.514~515</td>
</tr>
<tr>
<td>first_rows</td>
<td>응답 속도 최적 모드(FIRST_ROWS(n))</td>
<td>p.514~515</td>
</tr>
<tr>
<td>bypass_ujvc</td>
<td>수정가능 조인 뷰 키 보존 검사 생략(10g까지)</td>
<td>p.428, 435</td>
</tr>
<tr>
<td>enable_parallel_dml</td>
<td>병렬 DML 활성화(12c)</td>
<td>p.442</td>
</tr>
<tr>
<td>hash_sj</td>
<td>해시 세미 조인</td>
<td>p.306</td>
</tr>
<tr>
<td>index_desc</td>
<td>인덱스 역순 스캔</td>
<td>p.370</td>
</tr>
<tr>
<td>index_ffs</td>
<td>Index Fast Full Scan</td>
<td>p.122</td>
</tr>
<tr>
<td>index_ss</td>
<td>Index Skip Scan</td>
<td>p.118</td>
</tr>
<tr>
<td>leading</td>
<td>조인 순서 첫 테이블 지정</td>
<td>p.261</td>
</tr>
<tr>
<td>merge</td>
<td>뷰 머징</td>
<td>p.312</td>
</tr>
<tr>
<td>merge_sj</td>
<td>소트 머지 세미 조인</td>
<td>p.27</td>
</tr>
<tr>
<td>nl_sj</td>
<td>NL 세미 조인</td>
<td>p.304</td>
</tr>
<tr>
<td>nlj_batching</td>
<td>NL 조인 배치 I/O</td>
<td>p.271~272</td>
</tr>
<tr>
<td>nlj_prefetch</td>
<td>NL 조인 테이블 Prefetch</td>
<td>p.271</td>
</tr>
<tr>
<td>no_expand</td>
<td>OR-Expansion 방지</td>
<td>p.28</td>
</tr>
<tr>
<td>no_index_ffs</td>
<td>Index Fast Full Scan 방지</td>
<td>p.122</td>
</tr>
<tr>
<td>no_index_ss</td>
<td>Index Skip Scan 방지</td>
<td>p.118</td>
</tr>
<tr>
<td>no_merge</td>
<td>뷰 머징 방지</td>
<td>p.312~314</td>
</tr>
<tr>
<td>no_nlj_batching</td>
<td>배치 I/O 방지</td>
<td>p.271~272</td>
</tr>
<tr>
<td>no_nlj_prefetch</td>
<td>Prefetch 방지</td>
<td>p.271</td>
</tr>
<tr>
<td>no_push_pred</td>
<td>조인 조건 Pushdown 방지</td>
<td>p.28</td>
</tr>
<tr>
<td>no_push_subq</td>
<td>서브쿼리 Pushing 방지(맨 마지막에 필터)</td>
<td>p.310~311</td>
</tr>
<tr>
<td>no_unnest</td>
<td>서브쿼리 Unnesting 방지(필터 방식)</td>
<td>p.302, 327</td>
</tr>
<tr>
<td>num_index_keys</td>
<td>인덱스 액세스 조건으로 쓸 컬럼 수</td>
<td>p.207</td>
</tr>
<tr>
<td>ordered</td>
<td>FROM 절 순서대로 조인</td>
<td>p.261, 276, 282</td>
</tr>
<tr>
<td>parallel</td>
<td>병렬 처리</td>
<td>p.437</td>
</tr>
<tr>
<td>parallel_index</td>
<td>인덱스 병렬 스캔</td>
<td>p.437</td>
</tr>
<tr>
<td>push_pred</td>
<td>조인 조건 Pushdown</td>
<td>p.313</td>
</tr>
<tr>
<td>push_subq</td>
<td>서브쿼리 Pushing(먼저 필터)</td>
<td>p.310~311</td>
</tr>
<tr>
<td>swap_join_inputs</td>
<td>해시 조인 Build Input 지정</td>
<td>p.291, 294~296</td>
</tr>
<tr>
<td>unnest</td>
<td>서브쿼리 Unnesting</td>
<td>p.304~308, 326</td>
</tr>
<tr>
<td>use_concat</td>
<td>OR-Expansion 유도</td>
<td>p.88</td>
</tr>
<tr>
<td>use_hash</td>
<td>해시 조인</td>
<td>p.282</td>
</tr>
<tr>
<td>use_merge</td>
<td>소트 머지 조인</td>
<td>p.276</td>
</tr>
<tr>
<td>use_nl</td>
<td>NL 조인</td>
<td>p.261</td>
</tr>
</tbody>
</table>
</div>
<h2 id="tc-26">파라미터 (색인)</h2>
<div class="tw"><table>
<thead>
<tr>
<th>찾는 것</th>
<th>내용</th>
<th>메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>_optimizer_batch_table_access_by_rowid</td>
<td>테이블 액세스 배치 I/O 사용 여부</td>
<td>p.171</td>
</tr>
<tr>
<td>_optimizer_unnest_scalar_sq</td>
<td>스칼라 서브쿼리 Unnesting 사용 여부</td>
<td>p.325~326</td>
</tr>
<tr>
<td>_or_expand_nvl_predicate</td>
<td>NVL/DECODE 조건 OR-Expansion</td>
<td>p.222</td>
</tr>
<tr>
<td>_query_execution_cache_max_size</td>
<td>스칼라 서브쿼리 캐시 크기</td>
<td>p.319</td>
</tr>
<tr>
<td>_sqlmon_max_planlines</td>
<td>실시간 모니터링 최대 실행계획 줄 수</td>
<td>p.549</td>
</tr>
<tr>
<td>_sqlmon_threshold</td>
<td>실시간 모니터링 대상 기준 시간(5초)</td>
<td>p.549</td>
</tr>
<tr>
<td>db_block_size</td>
<td>블록 크기</td>
<td>p.45</td>
</tr>
<tr>
<td>db_file_multiblock_read_count</td>
<td>Multiblock I/O 단위</td>
<td>p.58</td>
</tr>
<tr>
<td>ddl_lock_timeout</td>
<td>DDL Lock 대기 시간</td>
<td>p.470</td>
</tr>
<tr>
<td>optimizer_mode</td>
<td>옵티마이저 모드</td>
<td>p.515</td>
</tr>
<tr>
<td>skip_unusable_indexes</td>
<td>Unusable 인덱스 무시</td>
<td>p.419</td>
</tr>
<tr>
<td>sort_area_size</td>
<td>Sort Area 크기</td>
<td>p.386</td>
</tr>
</tbody>
</table>
</div>
`;
