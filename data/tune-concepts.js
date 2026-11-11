// SQL 튜닝 개념 정리 탭 (HTML) · 친절한 SQL 튜닝 목차 기준
var WTU = window.WTU = window.WTU || {};
WTU.concepts = String.raw`
<h1 id="t-0">SQL 튜닝 개념 정리: 친절한 SQL 튜닝 1~7장·부록</h1>
<p>『친절한 SQL 튜닝』(조시형) 목차와 색인을 기준으로, 장·절·세부 항목 순서 그대로 핵심 내용을 정리한 문서예요. 책 문장을 옮긴 것이 아니라 각 항목의 개념을 이해하기 쉽게 풀어 쓴 요약이에요. 항목 옆 <strong>p.숫자</strong>는 책의 쪽 번호라서 책과 같이 볼 때 찾기 쉬워요.</p>
<blockquote>
<p>📌 <strong>표시 안내</strong></p>
<ul>
<li>⭐ = 시험·실무에서 특히 자주 나오는 핵심</li>
<li>💡 = 이해를 돕기 위한 보충 설명·비유</li>
<li>⚠️ = 자주 하는 실수, 헷갈리는 부분</li>
</ul>
</blockquote>
<hr />
<h2 id="t-1">0. 전체 그림 먼저 보기 ⭐</h2>
<p>SQL 튜닝의 거의 모든 이야기는 <strong>“디스크 I/O를 줄이는 것”</strong> 하나로 모여요. 책의 7개 장은 이 목표를 서로 다른 각도에서 다뤄요.</p>
<div class="tw"><table>
<thead>
<tr>
<th>장</th>
<th>주제</th>
<th>한 줄 요약</th>
</tr>
</thead>
<tbody>
<tr>
<td>1장</td>
<td>SQL 처리 과정과 I/O</td>
<td>SQL이 실행계획으로 바뀌는 과정, 블록 단위 I/O, 버퍼캐시</td>
</tr>
<tr>
<td>2장</td>
<td>인덱스 기본</td>
<td>B*Tree 구조, 인덱스를 못 타는 이유, 다양한 인덱스 스캔 방식</td>
</tr>
<tr>
<td>3장</td>
<td>인덱스 튜닝</td>
<td>테이블 랜덤 액세스 줄이기, 인덱스 스캔 범위 줄이기, 인덱스 설계</td>
</tr>
<tr>
<td>4장</td>
<td>조인 튜닝</td>
<td>NL·소트 머지·해시 조인의 원리와 선택 기준, 서브쿼리·뷰 변환</td>
</tr>
<tr>
<td>5장</td>
<td>소트 튜닝</td>
<td>소트가 생기는 연산, 소트를 없애거나 줄이는 SQL 작성법</td>
</tr>
<tr>
<td>6장</td>
<td>DML 튜닝</td>
<td>DML 성능 요소, Direct Path I/O, 파티션 활용, Lock과 동시성</td>
</tr>
<tr>
<td>7장</td>
<td>SQL 옵티마이저</td>
<td>통계정보·선택도·카디널리티, 비용 계산, 옵티마이저 종류와 모드</td>
</tr>
<tr>
<td>부록</td>
<td>SQL 분석 도구</td>
<td>실행계획, AutoTrace, SQL 트레이스, DBMS_XPLAN, SQL 모니터링, V$SQL</td>
</tr>
</tbody>
</table>
</div>
<pre><code>SQL 작성 ─▶ 파싱·최적화(1장, 7장) ─▶ 실행계획 ─▶ 실행
                                         │
              어떤 경로로 읽나? ──────────┼── 인덱스(2·3장)
              여러 테이블을 어떻게 잇나? ─┼── 조인(4장)
              정렬·그룹핑은? ────────────┼── 소트(5장)
              데이터를 바꿀 때는? ────────┴── DML(6장)
         결과 확인: 실행계획·트레이스(부록)로 &quot;읽은 블록 수&quot;를 본다
</code></pre>
<p>💡 <strong>한 문장 요약</strong>: 필요한 데이터만, 최대한 적은 블록을, 가능하면 한 번에 많이(시퀀셜·멀티블록) 읽도록 SQL과 인덱스를 설계하는 것이 튜닝이에요.</p>
<h1 id="t-ch-1">1장. SQL 처리 과정과 I/O</h1>
<h2 id="t-2">1.1 SQL 파싱과 최적화 (p.17)</h2>
<h3 id="t-3">1.1.1 구조적, 집합적, 선언적 질의 언어 (p.17)</h3>
<ul>
<li>SQL은 <strong>Structured Query Language</strong>. 데이터를 <strong>집합 단위</strong>로 다루고, <strong>무엇을(What)</strong> 원하는지만 선언해요.</li>
<li><strong>어떻게(How)</strong> 읽을지는 DBMS 안의 <strong>옵티마이저</strong>가 정해요. 같은 SQL이라도 처리 절차(프로시저)는 여러 가지가 될 수 있어요.</li>
<li>💡 그래서 튜닝은 “옵티마이저가 더 좋은 절차를 고르게 돕는 일”이에요.</li>
</ul>
<h3 id="t-4">1.1.2 SQL 최적화 (p.19)</h3>
<p>SQL을 실행하기 전 최적화 과정은 크게 3단계예요. ⭐</p>
<div class="tw"><table>
<thead>
<tr>
<th>단계</th>
<th>하는 일</th>
</tr>
</thead>
<tbody>
<tr>
<td>① SQL 파싱 (Parser)</td>
<td><strong>파싱 트리</strong> 생성 → <strong>Syntax 체크</strong>(문법) → <strong>Semantic 체크</strong>(의미: 없는 테이블·컬럼, 권한)</td>
</tr>
<tr>
<td>② SQL 최적화 (Optimizer)</td>
<td>통계정보를 바탕으로 여러 실행경로를 만들고 <strong>비용이 가장 낮은 것</strong>을 고름</td>
</tr>
<tr>
<td>③ 로우 소스 생성 (Row-Source Generator)</td>
<td>고른 실행경로를 실제 실행 가능한 코드(프로시저) 형태로 포맷팅</td>
</tr>
</tbody>
</table>
</div>
<h3 id="t-5">1.1.3 SQL 옵티마이저 (p.20)</h3>
<ul>
<li><strong>옵티마이저</strong>: 사용자가 원하는 작업을 가장 효율적으로 수행할 수 있는 <strong>최적의 데이터 액세스 경로</strong>를 선택해 주는 DBMS의 핵심 엔진.</li>
<li>최적화 단계(비용기반 옵티마이저 기준)</li>
<li>사용자로부터 받은 쿼리를 수행하는 데 후보군이 될 만한 실행계획들을 찾아낸다.</li>
<li><strong>데이터 딕셔너리</strong>에 미리 수집해 둔 오브젝트 통계 및 시스템 통계정보로 각 실행계획의 <strong>예상 비용</strong>을 산정한다.</li>
<li>최저 비용을 나타내는 실행계획을 선택한다.</li>
</ul>
<h3 id="t-6">1.1.4 실행계획과 비용 (p.21)</h3>
<ul>
<li><strong>실행계획(Execution Plan)</strong>: 옵티마이저가 생성한 처리 절차를 트리 구조로 보여 주는 것. <code>EXPLAIN PLAN</code> → <code>DBMS_XPLAN.DISPLAY</code> 등으로 확인.</li>
<li>실행계획에서 볼 수 있는 것: <strong>조인 순서, 조인 방식, 액세스 방식(Full Scan / Index Scan), 사용 인덱스, 예상 Rows, Cost</strong>.</li>
<li><strong>Cost(비용)</strong>: 쿼리를 수행하는 동안 발생할 것으로 <strong>예상되는</strong> I/O 횟수 또는 예상 소요시간을 표현한 값. ⚠️ 실측치가 아니라 <strong>예상치</strong>라서 실제 성능과 다를 수 있어요.</li>
</ul>
<pre><code>Execution Plan
-----------------------------------------------------------
0      SELECT STATEMENT Optimizer=ALL_ROWS (Cost=19 Card=1 ...)
1  0     TABLE ACCESS (BY INDEX ROWID) OF 'T' (Cost=19 ...)
2  1       INDEX (RANGE SCAN) OF 'T_X02' (INDEX) (Cost=2 ...)
</code></pre>
<h3 id="t-7">1.1.5 옵티마이저 힌트 (p.24)</h3>
<ul>
<li>옵티마이저가 항상 최선은 아니므로, 개발자가 <strong>힌트</strong>로 데이터 액세스 경로를 바꿀 수 있어요.</li>
<li>사용법: <code>SELECT /*+ INDEX(A 고객_PK) */ ...</code> — 주석 기호에 <strong><code>+</code></strong> 를 붙임. 여러 개는 <strong>공백</strong>으로 구분(콤마 X).</li>
</ul>
<p>⚠️ <strong>힌트 사용 시 주의</strong></p>
<div class="tw"><table>
<thead>
<tr>
<th>잘못 쓴 예</th>
<th>이유</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>/*+ INDEX(A A_X01) , INDEX(B, B_X03) */</code></td>
<td>힌트 사이 <strong>콤마</strong>는 무시됨(인자 안 콤마는 OK)</td>
</tr>
<tr>
<td><code>/*+ FULL(SCOTT.EMP) */</code></td>
<td>스키마명까지 쓰면 무효 → <code>FULL(EMP)</code> 또는 별칭</td>
</tr>
<tr>
<td><code>FROM EMP E</code> 인데 <code>/*+ FULL(EMP) */</code></td>
<td>테이블에 <strong>별칭</strong>을 줬으면 반드시 별칭으로 지정</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>힌트는 문법이 틀려도 <strong>에러 없이 무시</strong>돼요. 그래서 실행계획으로 반드시 확인해야 해요.</li>
<li>💡 실무에서는 일부만 지정하기보다 <strong>조인 순서(LEADING/ORDERED), 액세스 방식(INDEX/FULL), 조인 방식(USE_NL/USE_HASH)</strong> 을 빈틈없이 지정하는 편이 안정적이에요 (특히 중요한 OLTP 쿼리).</li>
</ul>
<div class="tw"><table>
<thead>
<tr>
<th>분류</th>
<th>대표 힌트</th>
</tr>
</thead>
<tbody>
<tr>
<td>최적화 목표</td>
<td><code>ALL_ROWS</code>, <code>FIRST_ROWS(n)</code></td>
</tr>
<tr>
<td>액세스 방식</td>
<td><code>FULL</code>, <code>INDEX</code>, <code>INDEX_DESC</code>, <code>INDEX_FFS</code>, <code>INDEX_SS</code></td>
</tr>
<tr>
<td>조인 순서</td>
<td><code>ORDERED</code>, <code>LEADING</code></td>
</tr>
<tr>
<td>조인 방식</td>
<td><code>USE_NL</code>, <code>USE_MERGE</code>, <code>USE_HASH</code>, <code>NL_SJ</code>, <code>HASH_SJ</code>, <code>MERGE_SJ</code></td>
</tr>
<tr>
<td>서브쿼리 팩토링</td>
<td><code>MATERIALIZE</code>, <code>INLINE</code></td>
</tr>
<tr>
<td>쿼리 변환</td>
<td><code>MERGE</code>/<code>NO_MERGE</code>, <code>UNNEST</code>/<code>NO_UNNEST</code>, <code>PUSH_PRED</code>/<code>NO_PUSH_PRED</code>, <code>USE_CONCAT</code>/<code>NO_EXPAND</code></td>
</tr>
<tr>
<td>병렬 처리</td>
<td><code>PARALLEL</code>, <code>PARALLEL_INDEX</code>, <code>PQ_DISTRIBUTE</code></td>
</tr>
<tr>
<td>기타</td>
<td><code>APPEND</code>, <code>DRIVING_SITE</code>, <code>PUSH_SUBQ</code>, <code>NO_PUSH_SUBQ</code></td>
</tr>
</tbody>
</table>
</div>
<h2 id="t-8">1.2 SQL 공유 및 재사용 (p.29)</h2>
<h3 id="t-9">1.2.1 소프트 파싱 vs. 하드 파싱 (p.29) ⭐</h3>
<ul>
<li><strong>SGA</strong>(System Global Area): 서버 프로세스와 백그라운드 프로세스가 공통으로 쓰는 메모리. 그 안의 <strong>라이브러리 캐시</strong>(Shared Pool의 일부)에 파싱·최적화된 SQL과 실행계획을 캐싱해요.</li>
<li>SQL 실행 시 먼저 라이브러리 캐시에서 같은 SQL을 찾아요.</li>
</ul>
<div class="tw"><table>
<thead>
<tr>
<th>구분</th>
<th>상황</th>
<th>비용</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>소프트 파싱</strong></td>
<td>라이브러리 캐시에 있음 → 바로 실행</td>
<td>낮음</td>
</tr>
<tr>
<td><strong>하드 파싱</strong></td>
<td>없음 → 최적화 + 로우 소스 생성까지 전부 수행</td>
<td>매우 높음(CPU 많이 사용)</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>💡 하드 파싱이 “하드(hard)”인 이유: 테이블 5개 조인만 해도 조인 순서만 120가지, 여기에 조인 방식·인덱스 선택까지 곱하면 경우의 수가 엄청나요. 이걸 매번 계산하는 데 필요한 딕셔너리·통계 정보를 읽는 작업이 무거워요.</li>
</ul>
<h3 id="t-10">1.2.2 바인드 변수의 중요성 (p.32) ⭐</h3>
<ul>
<li>오라클은 SQL <strong>텍스트 자체</strong>가 이름(ID) 역할을 해요. 공백·대소문자·주석·리터럴 값이 하나라도 다르면 <strong>다른 SQL</strong>로 보고 따로 하드 파싱해요.</li>
<li>리터럴 값을 그대로 붙이면(<code>WHERE LOGIN_ID = 'tom'</code>, <code>'kim'</code>…) 사용자마다 하드 파싱 → 라이브러리 캐시 경합.</li>
<li><strong>바인드 변수</strong>를 쓰면 SQL 텍스트가 같아서 <strong>한 번만 하드 파싱</strong>하고 재사용해요.</li>
<li><strong>이름 없는 SQL</strong>: 프로시저·함수·트리거·패키지는 이름이 있고 딕셔너리에 영구 저장돼요. SQL은 이름이 없어 <strong>텍스트 자체가 식별자</strong>이고 딕셔너리에 저장되지 않아요. 캐시 공간이 부족해 밀려나면 다음 실행 때 다시 하드 파싱해서 적재해요.</li>
</ul>
<pre><code class="language-sql">-- ✗ 리터럴: 로그인할 때마다 서로 다른 SQL
SELECT * FROM CUSTOMER WHERE LOGIN_ID = 'tom';
-- ✓ 바인드 변수: 하나의 SQL을 공유
SELECT * FROM CUSTOMER WHERE LOGIN_ID = :LOGIN_ID;
</code></pre>
<h2 id="t-11">1.3 데이터 저장 구조 및 I/O 메커니즘 (p.36)</h2>
<h3 id="t-12">1.3.1 SQL이 느린 이유 (p.36)</h3>
<ul>
<li>대부분 <strong>디스크 I/O</strong> 때문이에요. I/O 요청 동안 프로세스는 잠(대기)에 빠져요.</li>
<li><strong>프로세스 생명주기</strong>: 생성(new) → 실행 가능(runnable) ⇄ 실행(running) → 대기(waiting, I/O 요청 시 sleep) → 종료. I/O Call이 끝날 때까지 CPU를 놓고 기다리는 시간이 길수록 SQL이 느려져요.</li>
</ul>
<h3 id="t-13">1.3.2 데이터베이스 저장 구조 (p.39) ⭐</h3>
<pre><code>테이블스페이스 ─┬─ 세그먼트(테이블·인덱스 하나) ─┬─ 익스텐트 ─┬─ 블록 ─ 로우
               └─ 데이터파일(물리 OS 파일)        │ (연속 블록) │
</code></pre>
<div class="tw"><table>
<thead>
<tr>
<th>용어</th>
<th>뜻</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>블록</strong></td>
<td>데이터를 읽고 쓰는 <strong>단위</strong> (보통 8KB, <code>db_block_size</code>)</td>
</tr>
<tr>
<td><strong>익스텐트</strong></td>
<td>공간을 확장하는 단위, <strong>연속된 블록</strong>의 집합</td>
</tr>
<tr>
<td><strong>세그먼트</strong></td>
<td>데이터 저장 공간이 필요한 오브젝트(테이블, 인덱스, 파티션, LOB)</td>
</tr>
<tr>
<td><strong>테이블스페이스</strong></td>
<td>세그먼트를 담는 콘테이너, 여러 데이터파일로 구성</td>
</tr>
<tr>
<td><strong>데이터파일</strong></td>
<td>디스크 상의 물리적인 OS 파일</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>한 세그먼트의 익스텐트는 여러 데이터파일에 흩어질 수 있어요(파일 경합 줄이기). 단, 한 익스텐트 안의 블록은 같은 파일에서 서로 인접해요.</li>
<li><strong>DBA</strong>(Data Block Address): 모든 블록이 가진 고유 주소. 인덱스 ROWID에 이 DBA 정보가 들어 있어요.</li>
</ul>
<h3 id="t-14">1.3.3 블록 단위 I/O (p.43)</h3>
<ul>
<li>오라클은 <strong>레코드 하나를 읽어도 블록 전체</strong>를 읽어요. 컬럼 하나를 읽어도 마찬가지.</li>
<li>테이블뿐 아니라 인덱스도 블록 단위로 읽고 써요.</li>
</ul>
<h3 id="t-15">1.3.4 시퀀셜 액세스 vs. 랜덤 액세스 (p.47) ⭐</h3>
<div class="tw"><table>
<thead>
<tr>
<th>구분</th>
<th>방식</th>
<th>예</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>시퀀셜 액세스</strong></td>
<td>논리적·물리적으로 연결된 순서를 따라 차례로 읽음</td>
<td>인덱스 리프 블록 스캔(앞뒤 포인터), 테이블 Full Scan(익스텐트 목록 순서)</td>
</tr>
<tr>
<td><strong>랜덤 액세스</strong></td>
<td>순서와 상관없이 <strong>레코드 하나를 읽기 위해 한 블록씩</strong> 접근</td>
<td>인덱스 ROWID로 테이블 블록 찾아가기</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>💡 튜닝의 큰 방향: <strong>시퀀셜 액세스의 선택도를 높이고</strong>(읽은 것 중 버리는 것 줄이기), <strong>랜덤 액세스 발생량을 줄이는 것</strong>.</li>
</ul>
<h3 id="t-16">1.3.5 논리적 I/O vs. 물리적 I/O (p.48) ⭐</h3>
<ul>
<li><strong>DB 버퍼캐시</strong>: 디스크에서 읽은 블록을 캐싱하는 SGA 영역. 같은 블록을 다시 읽을 때 디스크 I/O를 피함.</li>
<li><strong>논리적 I/O</strong>: SQL 처리 중 발생한 <strong>총 블록 I/O</strong> (메모리에서 읽은 것 = 버퍼캐시 경유 전체). </li>
<li><strong>물리적 I/O</strong>: 버퍼캐시에서 못 찾아 <strong>디스크에서 읽은</strong> 블록 I/O.</li>
<li>같은 SQL을 여러 번 실행해도 논리적 I/O는 거의 같고(같은 블록을 같은 횟수로 읽음), 물리적 I/O는 캐싱 상태에 따라 달라져요.</li>
</ul>
<p><strong>버퍼캐시 히트율 (BCHR)</strong> ⭐</p>
<pre><code>BCHR = (캐시에서 곧바로 찾은 블록 수 / 총 읽은 블록 수) × 100
     = (1 − 물리적 I/O / 논리적 I/O) × 100
</code></pre>
<ul>
<li>물리적 I/O = 논리적 I/O × (100% − BCHR). BCHR은 시스템 상황에 따라 정해지는 값이라 마음대로 못 바꿔요.</li>
<li>⭐ 그래서 물리적 I/O를 줄이는 근본 방법은 <strong>논리적 I/O를 줄이는 것</strong> → SQL 튜닝 = 논리적 I/O 줄이기.</li>
<li>⚠️ BCHR이 높다고 무조건 효율적인 건 아니에요. 같은 블록을 비효율적으로 반복해서 읽어도 히트율은 올라가요.</li>
</ul>
<h3 id="t-17">1.3.6 Single Block I/O vs. Multiblock I/O (p.55)</h3>
<div class="tw"><table>
<thead>
<tr>
<th>구분</th>
<th>한 번 I/O Call로 읽는 양</th>
<th>주로 쓰는 곳</th>
<th>대기 이벤트</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Single Block I/O</strong></td>
<td>한 블록</td>
<td>인덱스 루트·브랜치·리프 블록, 인덱스로 테이블 액세스</td>
<td><code>db file sequential read</code></td>
</tr>
<tr>
<td><strong>Multiblock I/O</strong></td>
<td>여러 블록(최대 <code>db_file_multiblock_read_count</code>)</td>
<td>테이블 Full Scan, Index Fast Full Scan</td>
<td><code>db file scattered read</code></td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>Multiblock I/O는 “어차피 잠자야 한다면 한 번에 많이 읽자”는 방식. 많은 데이터를 읽을 때 유리해요.</li>
<li>⚠️ 익스텐트 경계를 넘지 못해요(한 익스텐트 안에서만 한꺼번에 읽음).</li>
</ul>
<h3 id="t-18">1.3.7 Table Full Scan vs. Index Range Scan (p.60) ⭐</h3>
<div class="tw"><table>
<thead>
<tr>
<th></th>
<th>Table Full Scan</th>
<th>Index Range Scan</th>
</tr>
</thead>
<tbody>
<tr>
<td>읽는 방식</td>
<td>테이블 전체를 <strong>시퀀셜 + Multiblock I/O</strong></td>
<td>인덱스로 일부 범위 → ROWID로 <strong>랜덤 + Single Block I/O</strong></td>
</tr>
<tr>
<td>유리한 경우</td>
<td><strong>많은</strong> 데이터 조회(집계용 대량 배치)</td>
<td><strong>소량</strong> 데이터 조회(OLTP)</td>
</tr>
<tr>
<td>특징</td>
<td>시퀀셜하게 읽어 한 번에 많이</td>
<td>같은 블록을 반복해서 읽는 비효율 가능</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>⚠️ “인덱스는 항상 좋다”는 착각. 많은 데이터를 읽을 때는 인덱스가 오히려 독이 될 수 있어요(3장의 손익분기점).</li>
<li>💡 인덱스는 큰 테이블에서 <strong>아주 적은 일부 데이터를 빨리 찾는 도구</strong>예요.</li>
</ul>
<h3 id="t-19">1.3.8 캐시 탐색 메커니즘 (p.63)</h3>
<ul>
<li>Direct Path I/O를 제외한 모든 블록 I/O는 메모리 버퍼캐시를 경유해요.</li>
<li>버퍼캐시 탐색 과정: 데이터 블록 주소(DBA)를 <strong>해시 함수</strong>에 넣어 <strong>해시 체인</strong>을 찾고, 체인을 따라 <strong>버퍼 헤더</strong>를 찾아요.</li>
<li>해시 구조의 성질: 같은 입력 값은 항상 같은 체인에 연결되고, 다른 입력 값이 같은 체인에 연결될 수도 있으며, 체인 안의 정렬은 보장되지 않아요.</li>
</ul>
<p><strong>메모리 공유자원 보호(직렬화)</strong></p>
<ul>
<li>버퍼캐시는 SGA 공유자원이라 여러 프로세스가 동시에 접근하면 문제가 생겨요 → 한 프로세스씩 순차 접근하도록 <strong>직렬화</strong>(줄 세우기) 필요.</li>
<li><strong>래치(Latch)</strong>: 해시 체인을 스캔하는 동안 체인 구조를 보호하는 경량 Lock. 예: <code>cache buffers chains</code> 래치.</li>
<li><strong>버퍼 Lock</strong>: 버퍼 블록 자체를 읽거나 변경하는 동안 다른 프로세스 접근을 막는 Lock.</li>
<li><strong>액세스 직렬화</strong>: 래치·버퍼 Lock 같은 직렬화 메커니즘 때문에 동시 접근이 많으면 경합(대기)이 생겨요.</li>
<li>💡 그래서 같은 블록을 불필요하게 반복 읽는 SQL은 I/O뿐 아니라 <strong>래치 경합</strong>까지 일으켜 시스템 전체를 느리게 만들어요. 논리적 I/O를 줄이는 게 중요한 또 하나의 이유예요.</li>
</ul>
<h1 id="t-ch-2">2장. 인덱스 기본</h1>
<h2 id="t-20">2.1 인덱스 구조 및 탐색 (p.69)</h2>
<h3 id="t-21">2.1.1 미리 보는 인덱스 튜닝 (p.69)</h3>
<p>데이터를 찾는 방법은 두 가지예요: <strong>테이블 전체 스캔</strong>, <strong>인덱스 이용</strong>. 인덱스 튜닝의 두 가지 핵심 요소 ⭐</p>
<div class="tw"><table>
<thead>
<tr>
<th>핵심</th>
<th>내용</th>
<th>다루는 곳</th>
</tr>
</thead>
<tbody>
<tr>
<td>① 인덱스 <strong>스캔 효율화</strong></td>
<td>인덱스를 스캔하는 과정에서 읽는 범위를 줄이기</td>
<td>3.3</td>
</tr>
<tr>
<td>② <strong>테이블 랜덤 액세스 최소화</strong></td>
<td>인덱스 스캔 후 테이블 레코드를 찾아가는 횟수 줄이기</td>
<td>3.1</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>💡 비유: 시력이 1.0~1.5인 “홍길동”을 찾을 때 이름순 명부는 이름이 앞에 있어 한 곳만 보면 되지만, 시력순 명부는 1.0~1.5 전부를 훑어야 해요. <strong>인덱스 컬럼 순서</strong>가 스캔 범위를 결정해요.</li>
<li>⭐ 두 가지 중 <strong>랜덤 액세스 최소화</strong>가 성능에 더 큰 영향을 줘요(테이블 랜덤 액세스가 가장 비싼 작업).</li>
<li><strong>SQL 튜닝은 랜덤 I/O와의 전쟁</strong>이에요.</li>
</ul>
<h3 id="t-22">2.1.2 인덱스 구조 (p.74)</h3>
<ul>
<li>인덱스: 대용량 테이블에서 필요한 데이터만 빠르게 효율적으로 액세스하려고 쓰는 오브젝트. 범위 스캔이 가능한 건 <strong>정렬</strong>되어 있기 때문.</li>
<li>DBMS는 일반적으로 <strong>B*Tree</strong> 인덱스를 사용해요. ⭐</li>
</ul>
<pre><code>                     [루트 블록]
              ┌──────────┼──────────┐
         [브랜치]     [브랜치]     [브랜치]
        ┌───┼───┐
     [리프]⇄[리프]⇄[리프] ⇄ ...   ← 리프끼리 양방향 연결 리스트
</code></pre>
<div class="tw"><table>
<thead>
<tr>
<th>블록</th>
<th>저장 내용</th>
</tr>
</thead>
<tbody>
<tr>
<td>루트·브랜치</td>
<td>각 레코드가 <strong>하위 블록 주소</strong>를 가짐. 키값 = 하위 블록 첫 키값. 맨 왼쪽 첫 레코드는 <strong>LMC</strong>(LeftMost Child, 키값 없이 주소만)</td>
</tr>
<tr>
<td>리프</td>
<td><strong>키값 + ROWID</strong>, 키값 순 정렬(키가 같으면 ROWID 순), 앞뒤 리프와 양방향 연결</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li><strong>ROWID</strong> = 데이터 블록 주소(<strong>DBA</strong>) + 로우 번호(블록 내 순번)</li>
<li>DBA = 데이터파일 번호 + 블록 번호</li>
<li><strong>인덱스 탐색 과정</strong> ⭐</li>
<li><strong>수직적 탐색</strong>: 인덱스 스캔 <strong>시작 지점</strong>을 찾는 과정(루트 → 리프)</li>
<li><strong>수평적 탐색</strong>: 데이터를 찾는 과정(리프 블록을 따라 옆으로)</li>
</ul>
<h3 id="t-23">2.1.3 인덱스 수직적 탐색 (p.77)</h3>
<ul>
<li>정렬된 인덱스 레코드 중 <strong>조건을 만족하는 첫 번째 레코드</strong>를 찾는 과정.</li>
<li>루트에서 시작, 브랜치의 각 레코드가 가리키는 하위 블록으로 내려가요. ⚠️ 찾는 값과 <strong>같은 키</strong>가 아니라 “찾는 값보다 크거나 같은 첫 키” 바로 <strong>직전</strong> 레코드가 가리키는 블록으로 내려가야 해요(같은 값이 앞 블록 끝에 있을 수 있으므로).</li>
</ul>
<h3 id="t-24">2.1.4 인덱스 수평적 탐색 (p.78)</h3>
<ul>
<li>찾고자 하는 데이터가 더 안 나타날 때까지 리프 블록을 <strong>수평적으로</strong> 스캔.</li>
<li>리프 블록끼리 앞뒤 주소를 갖고 있어 좌→우, 우→좌 모두 가능.</li>
<li>수평적 탐색 이유: ① 조건절을 만족하는 데이터를 모두 찾기 위해 ② <strong>ROWID를 얻기 위해</strong>(인덱스에 없는 컬럼은 테이블을 액세스해야 하므로).</li>
</ul>
<h3 id="t-25">2.1.5 결합 인덱스 구조와 탐색 (p.79)</h3>
<ul>
<li>두 개 이상 컬럼을 결합한 인덱스. 예: <code>[성별 + 고객명]</code>.</li>
<li>리프 블록은 첫 컬럼 순, 첫 컬럼이 같으면 둘째 컬럼 순으로 정렬.</li>
<li>⭐ 인덱스는 컬럼이 <strong>하나든 여럿이든 일차원 리스트</strong>처럼 정렬되어 있어요. 그래서 <code>성별='남' AND 고객명='이재희'</code> 조건이면 <code>[성별+고객명]</code>이든 <code>[고객명+성별]</code>이든 <strong>수직적 탐색으로 바로 시작점에 도달</strong>해 읽는 블록 수는 같아요. (3.4.6 결합 인덱스 선택도 참고)</li>
<li>💡 “선택도 좋은 컬럼을 앞에” 라는 공식이 <strong>= 조건끼리는</strong> 의미가 없는 이유가 바로 이거예요.</li>
</ul>
<h2 id="t-26">2.2 인덱스 기본 사용법 (p.84)</h2>
<h3 id="t-27">2.2.1 인덱스를 사용한다는 것 (p.84) ⭐</h3>
<ul>
<li>인덱스를 <strong>정상적으로 사용한다</strong> = 리프 블록에서 <strong>스캔 시작점을 찾아 거기서부터 스캔하다가 중간에 멈추는 것</strong> = <strong>Index Range Scan</strong>.</li>
<li>인덱스 컬럼을 <strong>가공</strong>하면 시작점을 찾을 수 없어 → <strong>Index Full Scan</strong>(리프 블록 전체를 스캔)하거나 Table Full Scan.</li>
<li>💡 비유: 국어사전에서 ‘ㄱ’으로 시작하는 단어는 앞부분만 찾으면 되지만, ‘~기’로 끝나는 단어는 사전 전체를 봐야 해요.</li>
</ul>
<h3 id="t-28">2.2.2 인덱스를 Range Scan 할 수 없는 이유 (p.86) ⭐</h3>
<p><strong>인덱스 컬럼을 가공하면 스캔 시작점을 찾을 수 없어요.</strong></p>
<div class="tw"><table>
<thead>
<tr>
<th>경우</th>
<th>예</th>
<th>Range Scan</th>
</tr>
</thead>
<tbody>
<tr>
<td>함수 가공</td>
<td><code>WHERE SUBSTR(생년월일, 5, 2) = '05'</code></td>
<td>✗</td>
</tr>
<tr>
<td>NVL</td>
<td><code>WHERE NVL(주문수량, 0) &lt; 100</code></td>
<td>✗</td>
</tr>
<tr>
<td>중간값 LIKE</td>
<td><code>WHERE 업체명 LIKE '%대한%'</code></td>
<td>✗</td>
</tr>
<tr>
<td>앞부분 LIKE</td>
<td><code>WHERE 업체명 LIKE '대한%'</code></td>
<td>✓</td>
</tr>
<tr>
<td>OR 조건</td>
<td><code>WHERE 전화번호 = :a OR 고객명 = :b</code></td>
<td>✗ (OR-Expansion으로 변환하면 ✓)</td>
</tr>
<tr>
<td>IN 조건</td>
<td><code>WHERE 전화번호 IN (:a, :b)</code></td>
<td>✓ <strong>IN-List Iterator</strong>로 UNION ALL처럼 처리</td>
</tr>
</tbody>
</table>
</div>
<p><strong>OR-Expansion</strong> (색인 p.88, 222)</p>
<pre><code class="language-sql">-- OR 조건을 UNION ALL로 분리하면 각각 Range Scan 가능
SELECT * FROM 고객 WHERE 고객명 = :cust_nm
UNION ALL
SELECT * FROM 고객 WHERE 전화번호 = :tel_no
AND (고객명 &lt;&gt; :cust_nm OR 고객명 IS NULL);   -- 중복 제거 조건
</code></pre>
<ul>
<li>옵티마이저가 자동으로 바꾸게 하려면 <code>/*+ USE_CONCAT */</code> 힌트, 막으려면 <code>/*+ NO_EXPAND */</code>.</li>
<li><strong>IN-List Iterator</strong>: <code>IN (:a, :b)</code>를 <code>= :a UNION ALL = :b</code> 처럼 <strong>IN 개수만큼 Range Scan을 반복</strong>. 실행계획에 <code>INLIST ITERATOR</code> 표시.</li>
</ul>
<h3 id="t-29">2.2.3 더 중요한 인덱스 사용 조건 (p.90) ⭐</h3>
<ul>
<li><strong>인덱스 선두 컬럼이 조건절에 있어야(가공 없이)</strong> Range Scan 가능.</li>
<li>예: 인덱스 <code>[기준연도 + 과세구분코드 + 보고회차 + 실명확인번호]</code></li>
<li><code>WHERE 과세구분코드 = :b AND 보고회차 = :c</code> → 선두 컬럼(기준연도) 없음 → Range Scan 불가.</li>
<li>⚠️ <strong>인덱스 잘 타니까 튜닝 끝?</strong> Range Scan을 한다고 끝이 아니에요. 리프 블록에서 <strong>스캔하는 양</strong>을 따져 봐야 해요(3.3에서 상세).</li>
</ul>
<h3 id="t-30">2.2.4 인덱스를 이용한 소트 연산 생략 (p.94) ⭐</h3>
<ul>
<li>인덱스는 <strong>정렬</strong>되어 있으므로, Range Scan 결과도 정렬되어 있어요 → <code>ORDER BY</code>가 인덱스 순서와 같으면 <strong>SORT ORDER BY 연산 생략</strong>.</li>
<li>예: 인덱스 <code>[장비번호 + 변경일자 + 변경순번]</code></li>
<li><code>WHERE 장비번호 = 'C' ORDER BY 변경일자, 변경순번</code> → 정렬 생략(실행계획에 SORT ORDER BY 없음).</li>
<li>내림차순은 인덱스를 거꾸로 읽으면 돼요 → <strong>INDEX RANGE SCAN DESCENDING</strong> (리프를 우→좌로).</li>
<li>💡 MAX 값을 구할 때 인덱스를 뒤에서부터 한 건만 읽고 멈출 수 있는 원리(5.3.3)와 연결돼요.</li>
</ul>
<h3 id="t-31">2.2.5 ORDER BY 절에서 컬럼 가공 (p.97)</h3>
<ul>
<li>조건절이 아닌 <strong>ORDER BY / SELECT-LIST</strong> 에서 컬럼을 가공해도 인덱스를 정상적으로 쓸 수 없는 경우가 있어요.</li>
<li>예: 인덱스 <code>[장비번호 + 변경일자 + 변경순번]</code>인데 <code>ORDER BY 변경일자 || 변경순번</code> → 가공된 값 기준 정렬이라 <strong>SORT ORDER BY 발생</strong>.</li>
<li>⚠️ 함정 사례: <code>SELECT TO_CHAR(A.주문일자, 'YYYY-MM-DD') AS 주문일자 ... ORDER BY 주문일자</code> </li>
<li>ORDER BY의 <code>주문일자</code>가 <strong>SELECT-LIST의 가공된 별칭</strong>을 가리켜서 정렬 생략 불가 → <code>ORDER BY A.주문일자</code>처럼 <strong>테이블 컬럼을 명시</strong>하면 해결.</li>
</ul>
<h3 id="t-32">2.2.6 SELECT-LIST에서 컬럼 가공 (p.100)</h3>
<ul>
<li><code>SELECT MIN(변경순번)</code>, <code>MAX(변경순번)</code> 은 인덱스 <code>[장비번호 + 변경일자 + 변경순번]</code>에서 처음/마지막 한 건만 읽고 끝 → 실행계획에 <strong><code>FIRST ROW</code>, <code>INDEX RANGE SCAN (MIN/MAX)</code></strong>.</li>
<li>⚠️ <code>MAX(NVL(TO_NUMBER(변경순번), 0))</code> 처럼 가공하면 정렬 순서가 달라질 수 있어 <strong>전체를 읽어야</strong> 해요.</li>
<li>해결: <code>NVL(TO_NUMBER(MAX(변경순번)), 0)</code> → <strong>가공을 집계 함수 밖으로</strong>.</li>
<li>스칼라 서브쿼리 안에서 MAX를 구할 때도 같은 원리(<strong>First Row Stopkey 알고리즘</strong>, 색인 p.101).</li>
</ul>
<h3 id="t-33">2.2.7 자동 형변환 (p.104) ⭐</h3>
<ul>
<li>조건절의 양쪽 타입이 다르면 오라클이 <strong>자동 형변환</strong>해요. 그 규칙 때문에 인덱스 컬럼이 가공될 수 있어요.</li>
</ul>
<div class="tw"><table>
<thead>
<tr>
<th>비교</th>
<th>자동 변환 방향</th>
<th>인덱스 영향</th>
</tr>
</thead>
<tbody>
<tr>
<td>숫자형 vs 문자형</td>
<td><strong>문자 → 숫자</strong> (숫자형 우선)</td>
<td>문자형 인덱스 컬럼이 <code>TO_NUMBER(컬럼)</code>으로 가공됨 → ✗</td>
</tr>
<tr>
<td>날짜형 vs 문자형</td>
<td><strong>문자 → 날짜</strong> (날짜형 우선)</td>
<td>날짜 컬럼 쪽은 안 바뀜 → ✓</td>
</tr>
<tr>
<td>LIKE 연산자</td>
<td>문자형 기준</td>
<td>숫자 컬럼에 LIKE → <code>TO_CHAR(컬럼)</code> 가공 → ✗</td>
</tr>
</tbody>
</table>
</div>
<pre><code class="language-sql">-- 생년월일이 VARCHAR2 인데 숫자로 비교
WHERE 생년월일 = 19821225     -- 내부적으로 TO_NUMBER(생년월일) = 19821225 → 인덱스 Range Scan 불가
WHERE 생년월일 = '19821225'   -- ✓
</code></pre>
<ul>
<li>⚠️ 숫자형 컬럼 + LIKE 조건으로 “옵션 조건” 처리하는 패턴(예: <code>거래일자 LIKE :dt || '%'</code>)은 인덱스 사용을 막을 수 있어요.</li>
<li>⚠️ 자동 형변환에 기대면 <strong>성능</strong>뿐 아니라 <strong>에러</strong>도 생길 수 있어요(숫자로 못 바꾸는 문자 → ORA-01722). 또 <code>DECODE(a, b, c, d)</code> 의 결과 타입은 <strong>세 번째 인자(c)</strong> 타입을 따르는 함정도 있어요.</li>
<li>⭐ 결론: <strong>형변환은 명시적으로</strong>, 조건절 <strong>상수 쪽을</strong> 가공하세요.</li>
</ul>
<h2 id="t-34">2.3 인덱스 확장기능 사용법 (p.110)</h2>
<h3 id="t-35">2.3.1 Index Range Scan (p.110)</h3>
<ul>
<li>B*Tree 인덱스의 <strong>가장 일반적이고 정상적인</strong> 형태. 루트 → 리프 수직적 탐색 후 <strong>필요한 범위만</strong> 수평적 탐색.</li>
<li>조건: <strong>인덱스 선두 컬럼을 가공하지 않은 상태로 조건절에 사용</strong>.</li>
<li>성능은 <strong>인덱스 스캔 범위</strong>와 <strong>테이블 액세스 횟수</strong>를 얼마나 줄이느냐에 달려 있어요.</li>
</ul>
<h3 id="t-36">2.3.2 Index Full Scan (p.111)</h3>
<ul>
<li>수직적 탐색 없이(정확히는 가장 왼쪽 리프로 내려가서) <strong>리프 블록 전체를 처음부터 끝까지</strong> 수평적 탐색.</li>
<li>언제? 최적의 인덱스가 없을 때 <strong>차선책</strong>. 예: 인덱스 <code>[ename + sal]</code>, 조건 <code>WHERE sal &gt; 9000</code> (선두 컬럼 없음)</li>
<li>테이블 전체보다 <strong>인덱스가 훨씬 작고</strong>, 조건에 맞는 데이터가 <strong>소수</strong>라서 인덱스에서 필터링하면 유리할 때.</li>
<li><strong>인덱스를 이용한 소트 연산 생략</strong>: <code>ORDER BY ename</code> + <code>FIRST_ROWS</code> → 정렬 없이 앞부분만 빠르게 반환. ⚠️ 대부분 레코드를 읽게 되면 Table Full Scan보다 훨씬 느려질 수 있어요.</li>
</ul>
<h3 id="t-37">2.3.3 Index Unique Scan (p.115)</h3>
<ul>
<li><strong>수직적 탐색만</strong>으로 데이터를 찾는 방식. <strong>Unique 인덱스를 <code>=</code> 조건</strong>으로 탐색할 때.</li>
<li>⚠️ Unique 인덱스라도 <strong>범위 조건</strong>(BETWEEN, 부등호, LIKE)이면 Range Scan. 결합 Unique 인덱스에서 <strong>일부 컬럼만</strong> 조건이면 역시 Range Scan.</li>
</ul>
<h3 id="t-38">2.3.4 Index Skip Scan (p.116)</h3>
<ul>
<li>인덱스 <strong>선두 컬럼이 조건절에 없어도</strong> 사용 가능한 방식(오라클 9i~). 힌트 <code>INDEX_SS</code> / <code>NO_INDEX_SS</code>.</li>
<li>원리: 루트·브랜치 블록에서 읽은 컬럼 값 정보로 <strong>조건에 부합하는 레코드를 포함할 “가능성이 있는” 리프 블록만 골라서</strong> 액세스.</li>
<li>효과적인 경우: <strong>선두 컬럼의 Distinct Value 개수가 적고, 후행 컬럼의 Distinct Value 개수가 많을 때</strong>. 예: <code>[성별 + 연봉]</code>에서 <code>WHERE 연봉 BETWEEN 2000 AND 4000</code>.</li>
<li>선두 컬럼이 범위 조건이거나, 중간 컬럼이 빠져도 활용 가능.</li>
<li>⚠️ 선두 컬럼의 Distinct Value가 <strong>많으면</strong> 건너뛸 수 있는 리프 블록이 거의 없어 비효율적이에요. Skip Scan은 차선책이고, 자주 쓰는 조건이면 그에 맞는 인덱스를 만드는 게 정석이에요.</li>
</ul>
<h3 id="t-39">2.3.5 Index Fast Full Scan (p.122)</h3>
<ul>
<li>Index Full Scan보다 빠름: 논리적 인덱스 트리 구조를 무시하고 <strong>세그먼트 전체를 Multiblock I/O</strong>로 읽어요. 힌트 <code>INDEX_FFS</code> / <code>NO_INDEX_FFS</code>.</li>
<li>조건: 쿼리에 사용한 <strong>모든 컬럼이 인덱스에 포함</strong>되어 있어야 해요.</li>
</ul>
<div class="tw"><table>
<thead>
<tr>
<th>Index Full Scan</th>
<th>Index Fast Full Scan</th>
</tr>
</thead>
<tbody>
<tr>
<td>인덱스 구조(리프 연결)를 따라 스캔</td>
<td><strong>물리적으로 저장된 순서</strong>대로 스캔</td>
</tr>
<tr>
<td>결과 집합 <strong>순서 보장</strong></td>
<td>결과 집합 <strong>순서 보장 안 됨</strong></td>
</tr>
<tr>
<td><strong>Single Block</strong> I/O</td>
<td><strong>Multiblock</strong> I/O</td>
</tr>
<tr>
<td>(파티션 안 된 인덱스) 병렬 스캔 불가</td>
<td><strong>병렬 스캔 가능</strong></td>
</tr>
<tr>
<td>인덱스에 포함 안 된 컬럼 조회도 가능</td>
<td>인덱스 컬럼만 조회할 때 가능</td>
</tr>
</tbody>
</table>
</div>
<h3 id="t-40">2.3.6 Index Range Scan Descending (p.124)</h3>
<ul>
<li>Index Range Scan과 같은 방식인데 <strong>뒤에서부터 앞쪽으로</strong> 스캔 → <strong>내림차순 정렬된 결과</strong>.</li>
<li><code>ORDER BY empno DESC</code> 이면 옵티마이저가 알아서 선택. 직접 지정은 <code>/*+ INDEX_DESC(e emp_pk) */</code>.</li>
<li><code>MAX</code> 값을 구할 때도 인덱스를 뒤에서부터 한 건만 읽고 멈춰요 → <code>INDEX FULL SCAN (MIN/MAX)</code> + <code>FIRST ROW</code>.</li>
</ul>
<h1 id="t-ch-3">3장. 인덱스 튜닝</h1>
<h2 id="t-41">3.1 테이블 액세스 최소화 (p.129)</h2>
<h3 id="t-42">3.1.1 테이블 랜덤 액세스 (p.129) ⭐</h3>
<ul>
<li>인덱스로 ROWID를 얻은 뒤 테이블을 액세스하는 단계: 실행계획 <code>TABLE ACCESS BY INDEX ROWID</code>.</li>
<li><strong>인덱스 ROWID는 물리적 주소? 논리적 주소!</strong> ROWID는 DBA(파일+블록 번호)+로우 번호를 담고 있지만, 그 블록이 <strong>버퍼캐시 어디에 있는지</strong>는 몰라요. 그래서 ROWID로 찾아갈 때마다 1.3.8의 <strong>해시 탐색(래치, 체인 스캔)</strong> 을 거쳐야 해요.</li>
<li><strong>메인 메모리 DB</strong>(MMDB)는 데이터를 메모리에 올리면서 <strong>메모리 상 주소</strong>를 인덱스에 넣어 포인터로 바로 찾아가요. 오라클은 그렇지 않아서 <strong>ROWID로 테이블 액세스하는 것이 생각보다 비싸요</strong>.</li>
<li>💡 비유: ROWID는 “우편 주소”, 메모리 포인터는 “전화번호”. 우편 주소로 찾아가려면 매번 길을 찾아야 해요.</li>
<li>I/O 메커니즘 정리: 블록 주소(DBA) → 해시 함수 → 버퍼 헤더 → 있으면 바로 읽고, 없으면 디스크에서 읽어 버퍼캐시에 적재 후 읽음.</li>
</ul>
<h3 id="t-43">3.1.2 인덱스 클러스터링 팩터 (p.136) ⭐</h3>
<ul>
<li><strong>클러스터링 팩터(CF, 군집성 계수)</strong>: 특정 컬럼 기준으로 <strong>같은 값을 갖는 데이터가 서로 모여 있는 정도</strong>.</li>
<li>CF가 <strong>좋은</strong> 컬럼의 인덱스는 → 인덱스 순서대로 테이블을 읽을 때 <strong>같은 블록을 연속해서</strong> 읽게 돼서 테이블 액세스량이 적어요.</li>
<li>원리: 인덱스 ROWID로 테이블을 액세스할 때, 래치 획득·해시 체인 스캔을 거쳐 찾아간 테이블 블록 주소를 <strong>버퍼 Pinning</strong> 해 둬요. 다음 인덱스 레코드가 <strong>같은 블록</strong>을 가리키면 래치·체인 스캔 없이 바로 읽어요.</li>
<li><strong>버퍼 Pinning</strong>: 읽은 블록의 버퍼 헤더를 고정해 두는 것. 같은 블록을 연속해서 읽을 때 논리적 I/O 감소.</li>
</ul>
<h3 id="t-44">3.1.3 인덱스 손익분기점 (p.138) ⭐</h3>
<ul>
<li>인덱스 ROWID로 테이블을 액세스하는 방식은 <strong>읽어야 할 데이터가 일정량을 넘으면 Table Full Scan보다 느려져요</strong>. 그 기준점이 <strong>인덱스 손익분기점</strong>.</li>
<li>보통 <strong>5~20%</strong> 수준(CF에 따라 다름, CF가 나쁘면 5% 미만, 좋으면 90%까지도).</li>
</ul>
<div class="tw"><table>
<thead>
<tr>
<th>Table Full Scan이 유리한 이유</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>시퀀셜 액세스 vs 랜덤 액세스</td>
<td>Full Scan은 시퀀셜, 인덱스는 랜덤</td>
</tr>
<tr>
<td>Multiblock I/O vs Single Block I/O</td>
<td>Full Scan은 한 번에 많이, 인덱스는 한 블록씩</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li><strong>온라인 프로그램 튜닝 vs 배치 프로그램 튜닝</strong></li>
<li>온라인(OLTP): 소량 데이터 → <strong>인덱스, NL 조인</strong> 중심.</li>
<li>배치(대량 처리): 대량 데이터 → <strong>Full Scan, 해시 조인</strong>, 필요하면 <strong>파티션 + 병렬 처리</strong>. 전체 처리 속도(throughput) 최적화가 목표.</li>
<li>💡 “1억 건 중 100만 건(1%)도 인덱스로는 느릴 수 있다”: 손익분기점은 비율이 아니라 결국 <strong>랜덤 액세스 횟수</strong>의 문제예요.</li>
</ul>
<h3 id="t-45">3.1.4 인덱스 컬럼 추가 (p.145) ⭐</h3>
<ul>
<li>테이블 액세스 후 <strong>필터 조건</strong>에 의해 대부분 버려진다면 → 그 필터 컬럼을 <strong>인덱스에 추가</strong>하면 테이블 액세스 횟수가 크게 줄어요.</li>
<li>예: 인덱스 <code>[deptno + job]</code>, 조건 <code>deptno = 30 AND sal &gt;= 2000</code> → 인덱스를 <code>[deptno + job + sal]</code>로 바꾸면 sal 조건을 인덱스에서 걸러요.</li>
<li>⚠️ 인덱스 <strong>추가</strong>는 DML 부하 증가, 관리 부담이 있으므로 기존 인덱스에 컬럼을 <strong>덧붙이는</strong> 방법이 효과적이에요.</li>
<li>효과: 인덱스 <strong>스캔량은 그대로</strong>지만 테이블 랜덤 액세스 횟수가 줄어요. 가장 흔한 테이블 액세스 최소화 기법이에요.</li>
<li>⚠️ <strong>컬럼 추가에 따른 CF 변화</strong>: 키 값이 같은 인덱스 레코드는 ROWID 순으로 정렬돼 있는데, 변별력 좋은 컬럼을 뒤에 추가하면 그 컬럼 순으로 정렬이 바뀌어 <strong>클러스터링 팩터가 나빠질</strong> 수 있어요. 변별력 나쁜 컬럼 뒤에 변별력 좋은 컬럼을 붙일 땐 CF 변화를 확인하세요.</li>
</ul>
<h3 id="t-46">3.1.5 인덱스만 읽고 처리 (p.149)</h3>
<ul>
<li>쿼리에 쓰인 <strong>모든 컬럼이 인덱스에 있으면</strong> 테이블 액세스가 아예 없어요 → <strong>Covered 쿼리</strong>(Covered Index).</li>
<li>실행계획에 <code>TABLE ACCESS BY INDEX ROWID</code>가 사라져요.</li>
<li><strong>Include 인덱스</strong>(SQL Server 기능, 색인 p.150): 리프 블록에만 컬럼을 추가해 두는 방식. 추가한 컬럼은 수직적 탐색에는 못 쓰고, 필터와 테이블 액세스 줄이기에만 쓰여요. 오라클에는 아직 없어요.</li>
</ul>
<h3 id="t-47">3.1.6 인덱스 구조 테이블 (p.152)</h3>
<ul>
<li><strong>IOT</strong>(Index-Organized Table): 테이블 자체를 <strong>인덱스 구조</strong>로 생성. 리프 블록에 <strong>모든 컬럼</strong>을 저장 → 테이블 랜덤 액세스가 없음.</li>
<li>일반 테이블은 <strong>힙 구조 테이블</strong>(Heap-Organized Table): 데이터 입력 시 <strong>랜덤 방식</strong>으로 빈 블록에 저장(Freelist).</li>
<li>IOT는 <strong>정렬 상태</strong>를 유지하며 저장 → <strong>시퀀셜 방식</strong>. 예: 영업사원별 실적을 월별로 자주 조회 → <code>[사원번호 + 실적년월]</code> IOT.</li>
</ul>
<pre><code class="language-sql">CREATE TABLE index_org_t (a NUMBER, b VARCHAR(10), CONSTRAINT index_org_t_pk PRIMARY KEY (a))
ORGANIZATION INDEX;
</code></pre>
<h3 id="t-48">3.1.7 클러스터 테이블 (p.154)</h3>
<div class="tw"><table>
<thead>
<tr>
<th>종류</th>
<th>특징</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>인덱스 클러스터 테이블</strong></td>
<td><strong>클러스터 키 값이 같은 레코드를 한 블록에 모아서</strong> 저장. 넘치면 체인으로 연결. 클러스터 인덱스는 키 값마다 한 레코드(Unique)지만 테이블 레코드와 <strong>1:M</strong>.</td>
</tr>
<tr>
<td><strong>해시 클러스터 테이블</strong></td>
<td>인덱스 대신 <strong>해시 알고리즘</strong>으로 클러스터를 찾아감. <strong>= 조건만</strong> 가능.</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>인덱스 클러스터는 <strong>여러 테이블 레코드를 한 블록에 함께</strong> 저장하는 다중 테이블 클러스터도 가능해요.</li>
<li>💡 SQL Server/MySQL의 “클러스터형 인덱스”(=IOT 개념)와 오라클 “클러스터 테이블”은 달라요. 오라클 클러스터는 같은 키 값을 <strong>모아만 둘 뿐 정렬하지 않아요</strong>.</li>
</ul>
<h2 id="t-49">3.2 부분범위 처리 활용 (p.158)</h2>
<h3 id="t-50">3.2.1 부분범위 처리 (p.158) ⭐</h3>
<ul>
<li>DBMS는 클라이언트에게 데이터를 보낼 때 <strong>일정량씩 나누어 전송</strong>해요. 오라클의 기본 단위는 <strong>Array Size</strong>(SQL*Plus 기본 15건, JDBC 기본 10건).</li>
<li><strong>부분범위 처리</strong>: 전체 결과를 연속 전송하지 않고 <strong>사용자로부터 Fetch Call이 있을 때마다 일정량씩 나누어 전송</strong>하는 것.</li>
<li>💡 비유: 쌀 한 가마를 다 담을 때까지 기다리지 않고, 리어카(Array Size)에 실을 만큼만 실어 계속 날라요.</li>
<li><strong>정렬 조건이 있을 때</strong>: <code>ORDER BY</code> 컬럼에 인덱스가 없으면 전체를 읽고 정렬해야 해서 부분범위 처리 불가. <strong>인덱스로 소트를 생략</strong>하면 부분범위 처리 가능.</li>
<li><strong>Array Size 조정</strong>: 대량 데이터를 모두 Fetch할 땐 크게 → Fetch Call 횟수 감소. 앞쪽 일부만 볼 땐 작게.</li>
</ul>
<h3 id="t-51">3.2.2 부분범위 처리 구현 (p.164)</h3>
<ul>
<li>결과를 다 가져오지 않고 <strong>원하는 만큼 읽다가 멈출 수 있는</strong> 프로그램 구조(예: 화면에 첫 페이지만 표시, 사용자가 다음을 눌러야 추가 Fetch).</li>
<li>JDBC: <code>stmt.setFetchSize(n)</code> 로 Array Size 조정.</li>
</ul>
<h3 id="t-52">3.2.3 OLTP 환경에서 부분범위 처리에 의한 성능개선 원리 (p.166)</h3>
<ul>
<li>OLTP는 대부분 <strong>소량 데이터 조회</strong>지만, 결과가 많아도 <strong>앞쪽 일부만</strong> 보면 되는 경우(목록 화면, 페이징)가 많아요.</li>
<li><strong>멈출 수 있어야 의미 있다</strong>: 클라이언트·서버 구조(2-Tier)에서는 커서를 열어 둔 채 멈출 수 있지만, 웹 3-Tier(커넥션 풀)에서는 Fetch 후 커서를 닫으므로 → <strong>Top N 쿼리 + 페이징</strong>으로 구현(5.3.2).</li>
<li><strong>배치 I/O</strong>(Batch I/O, 색인 p.169·271): 인덱스로 테이블을 액세스할 때 ROWID를 모아 <strong>블록 단위로 정렬 후 한꺼번에</strong> 읽는 기능(12c). ⚠️ 결과 <strong>정렬 순서가 바뀔 수</strong> 있어 소트 생략 실행계획에서는 주의(ORDER BY를 명시해야 보장). 파라미터 <code>_optimizer_batch_table_access_by_rowid</code>.</li>
</ul>
<h2 id="t-53">3.3 인덱스 스캔 효율화 (p.173)</h2>
<h3 id="t-54">3.3.1 인덱스 탐색 (p.173)</h3>
<ul>
<li>수직적 탐색 = 스캔 <strong>시작점</strong> 찾기, 수평적 탐색 = <strong>멈출 때까지</strong> 리프 스캔. 리프 블록 첫 레코드의 LMC를 따라 내려가는 구조(2.1 복습).</li>
<li>조건절에 따라 시작점·끝점이 어떻게 정해지는지가 스캔 효율을 좌우해요.</li>
</ul>
<h3 id="t-55">3.3.2 인덱스 스캔 효율성 (p.180)</h3>
<ul>
<li><strong>스캔 효율</strong> = 인덱스 리프에서 <strong>읽은 레코드 중 결과로 남는 비율</strong>. 읽고 버리는 게 많을수록 비효율.</li>
<li>💡 비유: 사전에서 ‘성’으로 시작하고 넷째 글자가 ‘다’인 단어를 찾으면 ‘성’으로 시작하는 모든 단어를 훑어야 해요. 반면 ‘성능검사’로 시작하는 단어는 바로 찾아요.</li>
<li><strong>선행 컬럼이 모두 = 조건일 때</strong> 필요한 범위만 스캔하고 멈출 수 있어요. 선행 컬럼이 조건절에 없거나 = 조건이 아니면 비효율이 생겨요.</li>
<li><strong>측정 방법</strong>: SQL 트레이스에서 인덱스 단계의 <strong>읽은 블록 수(cr)</strong> 와 <strong>결과 건수(Rows)</strong> 를 비교해요. 예를 들어 결과 10건을 얻으려고 블록 수천 개를 읽었다면 리프에서 수백만 건을 읽고 버린 셈이에요.</li>
</ul>
<h3 id="t-56">3.3.3 액세스 조건과 필터 조건 (p.185) ⭐</h3>
<div class="tw"><table>
<thead>
<tr>
<th>조건</th>
<th>의미</th>
<th>실행계획(Predicate Information)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>인덱스 액세스 조건</strong></td>
<td>인덱스 <strong>스캔 범위를 결정</strong>하는 조건</td>
<td><code>access(...)</code></td>
</tr>
<tr>
<td><strong>인덱스 필터 조건</strong></td>
<td>테이블로 액세스할지를 결정하는 조건(범위는 못 줄임)</td>
<td><code>filter(...)</code> (인덱스 단계)</td>
</tr>
<tr>
<td><strong>테이블 필터 조건</strong></td>
<td>쿼리 결과로 최종 선택될지 결정</td>
<td><code>filter(...)</code> (테이블 단계)</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>옵티마이저 비용 = <strong>인덱스 수직적 탐색 비용 + 수평적 탐색 비용 + 테이블 랜덤 액세스 비용</strong>. 액세스 조건이 수평적 범위를, 인덱스 필터가 테이블 랜덤 액세스 횟수를 결정해요.</li>
</ul>
<h3 id="t-57">3.3.4 비교 연산자 종류와 컬럼 순서에 따른 군집성 (p.186)</h3>
<ul>
<li>인덱스 선행 컬럼이 <strong>모두 <code>=</code> 조건</strong>이면, 조건을 만족하는 레코드는 <strong>한데 모여</strong> 있어요(군집성 좋음).</li>
<li>선행 컬럼이 <strong>범위 조건</strong>이면 그 뒤 컬럼 조건은 모여 있지 않아요.</li>
<li>⭐ <strong>규칙</strong>: 선행 컬럼이 모두 <code>=</code> 조건인 상태에서 <strong>첫 번째 범위 조건까지만</strong> 인덱스 <strong>액세스 조건</strong>(스캔 범위 결정), 나머지는 <strong>필터 조건</strong>.</li>
</ul>
<pre><code>인덱스 [C1 + C2 + C3 + C4]
WHERE C1 = 1 AND C2 = 'A' AND C3 BETWEEN 100 AND 200 AND C4 = 'X'
       └──── 액세스 조건 ───────────────────────┘  └ 필터 조건 ┘
</code></pre>
<h3 id="t-58">3.3.5 인덱스 선행 컬럼이 등치(=) 조건이 아닐 때 생기는 비효율 (p.191)</h3>
<ul>
<li>예: 인덱스 <code>[아파트시세코드 + 평형 + 평형타입 + 인터넷매물]</code>, 조건 <code>인터넷매물 BETWEEN '1' AND '2'</code>(범위) + 나머지 <code>=</code>.</li>
<li><strong>범위 조건 컬럼이 맨 뒤</strong>에 있으면 효율적.</li>
<li>인덱스를 <code>[인터넷매물 + 아파트시세코드 + 평형 + 평형타입]</code>로 바꾸면(범위 조건 선두) 필요 없는 범위까지 읽어 비효율.</li>
<li>⭐ <strong>인덱스 설계 시 = 조건 컬럼을 앞에, 범위 조건 컬럼을 뒤에</strong>.</li>
</ul>
<h3 id="t-59">3.3.6 BETWEEN을 IN-List로 전환 (p.194)</h3>
<ul>
<li>범위 조건 컬럼이 인덱스 선두 쪽에 있어 비효율이 생길 때, <strong>BETWEEN을 IN-List로 바꾸면</strong> 각 값마다 <code>=</code> 조건처럼 Range Scan(INLIST ITERATOR)을 반복 → 필요한 범위만 스캔.</li>
</ul>
<pre><code class="language-sql">WHERE 인터넷매물 IN ('1', '2')   -- BETWEEN '1' AND '2' 대신
</code></pre>
<ul>
<li>⚠️ 주의: <strong>IN-List 개수가 적어야</strong> 해요. 많으면 수직적 탐색이 여러 번 반복되어 오히려 느려져요. 또 <strong>해당 컬럼의 Distinct 값이 적어서 값 목록이 고정</strong>일 때 유리.</li>
<li>⭐ 효과가 있는 경우: 조건을 만족하는 레코드들이 <strong>서로 멀리 떨어져</strong> 있을 때. 어차피 가까이 모여 있다면 범위 스캔과 차이가 거의 없어요.</li>
<li>💡 인덱스 구조를 바꾸기 어려울 때 쓰는 방법이에요. 근본 해결은 범위 조건 컬럼을 인덱스 뒤로 보내는 것.</li>
<li>💡 <strong>NUM_INDEX_KEYS</strong> 힌트(색인 p.207): IN-List를 인덱스 <strong>액세스 조건으로 쓸지 필터로 쓸지</strong> 제어. 예 <code>/*+ NUM_INDEX_KEYS(a 고객별가입상품_X1 1) */</code> → 첫 1개 컬럼까지만 액세스 조건.</li>
</ul>
<h3 id="t-60">3.3.7 Index Skip Scan 활용 (p.199)</h3>
<ul>
<li>BETWEEN을 IN-List로 바꾸지 않고도, 선두 범위 컬럼의 <strong>Distinct 값이 적으면</strong> Skip Scan으로 비슷한 효과.</li>
<li>예: 인덱스 <code>[판매월 + 판매구분]</code>, <code>WHERE 판매구분 = 'A' AND 판매월 BETWEEN '202001' AND '202012'</code> → <code>/*+ INDEX_SS(t 월별고객별판매집계_IDX2) */</code>.</li>
</ul>
<h3 id="t-61">3.3.8 IN 조건은 ‘=’인가 (p.203)</h3>
<ul>
<li>IN 조건은 <code>=</code> 이 아니에요! <strong>IN-List Iterator 방식</strong>으로 풀릴 때만 <code>=</code> 처럼 동작해요.</li>
<li>인덱스 <code>[고객번호 + 상품ID]</code>에서 <code>상품ID IN ('NH00037', 'NH00041', 'NH00050')</code> → 고객별로 가입 상품이 <strong>한두 개</strong>이고 같은 리프 블록에 모여 있다면, IN-List Iterator로 수직 탐색을 3번 하는 것보다 <strong>그냥 고객번호 범위를 스캔하면서 필터</strong>하는 게 더 나을 수 있어요.</li>
<li>⭐ IN 조건이 <strong>액세스 조건으로 효과적인지</strong>는 <strong>데이터 분포</strong>와 <strong>수직적 탐색 비용</strong>을 함께 따져야 해요 → <code>NUM_INDEX_KEYS</code> 힌트로 제어.</li>
</ul>
<h3 id="t-62">3.3.9 BETWEEN과 LIKE 스캔 범위 비교 (p.209)</h3>
<ul>
<li>같은 의미여도 LIKE는 BETWEEN보다 <strong>넓은 범위</strong>를 스캔할 수 있어요.</li>
<li>예: <code>판매월 LIKE '2019%'</code> vs <code>판매월 BETWEEN '201901' AND '201912'</code> → LIKE는 <code>'2019'</code>(4자리)로 시작하는 값 시작점부터 스캔(<code>'2019'</code> 자체가 존재할 수 있으므로), BETWEEN은 <code>'201901'</code>부터.</li>
<li>⭐ <strong>범위 검색 조건은 가능하면 BETWEEN</strong>을 쓰세요(정확한 시작·끝점).</li>
</ul>
<h3 id="t-63">3.3.10 범위검색 조건을 남용할 때 생기는 비효율 (p.211)</h3>
<ul>
<li>코딩을 쉽게 하려고 <strong>조건이 없을 때도 LIKE/BETWEEN을 넣는 습관</strong> → 스캔 범위가 넓어짐.</li>
<li>예: 회사코드·지역코드 옵션 조건을 <code>지역코드 LIKE :rgn || '%'</code> 로 처리 → 지역코드가 입력되어도 = 조건이 아닌 범위 조건이 되어 그 뒤 컬럼(상품명 등)이 액세스 조건에서 빠짐.</li>
<li>해결: 옵션 조건별로 SQL을 분기(UNION ALL), 또는 = 조건으로 처리.</li>
</ul>
<h3 id="t-64">3.3.11 다양한 옵션 조건 처리 방식의 장단점 비교 (p.214) ⭐</h3>
<div class="tw"><table>
<thead>
<tr>
<th>방식</th>
<th>예</th>
<th>장점</th>
<th>단점</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>OR 조건</strong></td>
<td><code>(:cust_id IS NULL OR 고객ID = :cust_id)</code></td>
<td>간단</td>
<td>인덱스 <strong>액세스 조건도, 인덱스 필터 조건도 못 됨</strong> → <strong>테이블 필터</strong>로만 쓰임. 인덱스 선두 컬럼 옵션에는 쓰면 안 됨</td>
</tr>
<tr>
<td><strong>LIKE/BETWEEN</strong></td>
<td><code>고객ID LIKE :cust_id \|\| '%'</code></td>
<td>편리. 변별력 좋은 <strong>필수 조건</strong>이 따로 있어 그게 액세스 조건이 될 때 성능도 좋음</td>
<td>① 인덱스 선두 컬럼에 쓰면 값이 없을 때 전체 스캔 ② NULL 허용 컬럼에 쓰면 결과 누락(NULL은 LIKE '%'에 안 걸림) ③ <strong>숫자형 컬럼</strong>은 자동 형변환으로 인덱스 못 탐 ④ 가변 길이 컬럼은 다른 값도 걸릴 수 있음(예: '김훈' 검색에 '김훈남'도 나옴)</td>
</tr>
<tr>
<td><strong>UNION ALL</strong></td>
<td>변수 입력 여부로 SQL 분기</td>
<td>각자 최적 인덱스 사용</td>
<td>SQL 길어짐</td>
</tr>
<tr>
<td><strong>NVL/DECODE</strong></td>
<td><code>고객ID = NVL(:cust_id, 고객ID)</code></td>
<td>SQL이 간단하면서 UNION ALL과 비슷한 성능. 옵티마이저가 <strong>OR-Expansion</strong>(<code>_or_expand_nvl_predicate</code>)으로 분기 처리</td>
<td>NULL 허용 컬럼엔 못 씀, <strong>변환이 안 일어나면 인덱스를 못 탐</strong>, <strong>여러 컬럼에 쓰면</strong> 하나만 분기</td>
</tr>
<tr>
<td><strong>Dynamic SQL</strong></td>
<td>입력된 조건만 SQL에 붙임</td>
<td>가장 정확</td>
<td><strong>바인드 변수</strong> 반드시 사용, 조건 조합별 SQL 수 증가</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>⚠️ <code>NVL(:a, 컬럼)</code> 패턴은 <strong>NULL 허용 컬럼</strong>이면 NULL인 레코드가 누락돼요(NULL = NULL은 거짓).</li>
</ul>
<h3 id="t-65">3.3.12 함수호출부하 해소를 위한 인덱스 구성 (p.225)</h3>
<ul>
<li><strong>PL/SQL 사용자 정의 함수</strong>는 대량 데이터에서 매우 느려요. 이유 세 가지: ① 가상머신(PL/SQL 엔진)에서 <strong>인터프리터</strong> 방식으로 실행 ② 호출 시마다 <strong>컨텍스트 스위칭</strong> ③ 함수 안의 SQL이 <strong>Recursive Call</strong>로 반복 실행(가장 결정적).</li>
<li>💡 대량 데이터라면 함수 호출 대신 <strong>조인</strong>으로 바꾸는 것을 먼저 고려해요.</li>
<li>조건절에 함수가 있으면 <strong>테이블 필터</strong> 단계에서 읽은 건수만큼 호출돼요.</li>
<li>⭐ 해결: <strong>효과적인 인덱스 구성</strong>으로 함수 호출 전에 <strong>액세스 조건으로 대상을 최대한 줄이기</strong>. 예: <code>WHERE 생년 = '1987' AND 회원구분 = :b AND encryption(전화번호) = :tel</code> → <code>[생년 + 회원구분]</code> 인덱스로 먼저 걸러서 함수 호출 횟수 최소화.</li>
</ul>
<h2 id="t-66">3.4 인덱스 설계 (p.230)</h2>
<h3 id="t-67">3.4.1 인덱스 설계가 어려운 이유 (p.230)</h3>
<ul>
<li>SQL마다 최적 인덱스를 만들면 인덱스가 너무 많아져요. 인덱스가 많으면:</li>
<li><strong>DML 성능 저하</strong>(TPS 저하) — INSERT 시 인덱스마다 위치를 찾아 입력, <strong>인덱스 분할(Index Split)</strong> 발생 가능.</li>
<li><strong>데이터베이스 사이즈 증가</strong>(디스크 공간 낭비).</li>
<li><strong>데이터베이스 관리 및 운영 비용 상승</strong>.</li>
<li><strong>인덱스 분할</strong>(Index Split, 색인 p.231): 리프 블록이 꽉 찼을 때 새 블록을 할당해 레코드를 나누는 작업 → INSERT 성능 저하.</li>
</ul>
<h3 id="t-68">3.4.2 가장 중요한 두 가지 선택 기준 (p.232) ⭐</h3>
<ol>
<li><strong>조건절에 항상 사용</strong>되거나 <strong>자주</strong> 사용되는 컬럼을 선정</li>
<li>선정된 컬럼 중 <strong><code>=</code> 조건으로 자주 조회되는 컬럼을 앞쪽</strong>에</li>
</ol>
<h3 id="t-69">3.4.3 스캔 효율성 이외의 판단 기준 (p.233)</h3>
<ul>
<li><strong>수행 빈도</strong> ⭐: 자주 수행되는 SQL은 조금 비효율이어도 전체 영향이 커요.</li>
<li>NL 조인 <strong>Outer(드라이빙) 쪽</strong> 인덱스는 스캔 비효율이 있어도 한 번만 읽으므로 영향이 제한적이에요.</li>
<li>NL 조인 <strong>Inner 쪽</strong> 인덱스는 비효율이 조인 횟수만큼 누적돼 치명적 → <strong>= 조건 컬럼을 선두</strong>에 두고, 테이블 액세스 없이 <strong>인덱스에서 필터링이 끝나도록</strong> 구성.</li>
<li><strong>업무상 중요도</strong>, <strong>클러스터링 팩터</strong>, <strong>데이터량</strong>(작은 테이블은 굳이 인덱스 불필요, 초대용량은 DML 발생량을 특히 고려), <strong>DML 부하</strong>(기존 인덱스 개수, 초당 DML 발생량, 자주 갱신되는 컬럼 포함 여부), <strong>저장 공간</strong>, <strong>인덱스 관리 비용</strong>.</li>
</ul>
<h3 id="t-70">3.4.4 공식을 초월한 전략적 설계 (p.236)</h3>
<ul>
<li>모든 조건 조합에 최적 인덱스를 만들 순 없으니, 핵심 액세스 경로 <strong>한두 개를 전략적으로</strong> 설계하고 나머지는 그걸 활용하도록.</li>
<li>책의 예(보험 가계약 조회): = 조건 컬럼을 모두 앞에 두는 공식대로 하면 인덱스가 수십 개 필요해 DML 부담이 너무 커요. 그래서 <strong>일자 조건을 선두</strong>로 한 소수의 인덱스로 줄이는 전략을 택해요.</li>
<li>💡 가장 많이 쓰는 조회 패턴(대부분의 호출)에 최적화하고, 나머지 패턴의 약간의 비효율은 <strong>목표 성능을 만족하는 선</strong>에서 감수해요.</li>
</ul>
<h3 id="t-71">3.4.5 소트 연산을 생략하기 위한 컬럼 추가 (p.238)</h3>
<ul>
<li>인덱스는 정렬돼 있으므로 ORDER BY뿐 아니라 <strong>GROUP BY 소트</strong>도 생략할 수 있어요.</li>
<li><strong>소트 생략 컬럼 순서 공식</strong> ⭐</li>
<li><strong>= 조건 컬럼</strong>을 먼저 선정 (ORDER BY에 없어도 되고, ORDER BY 컬럼 사이 어디에 둬도 정렬이 깨지지 않음)</li>
<li><strong>ORDER BY 컬럼</strong>을 순서대로 추가</li>
<li><strong>= 조건이 아닌 조건 컬럼</strong>은 그 뒤에. 넣을지 말지는 데이터 분포를 보고 결정</li>
<li>⚠️ 소트만 없애는 구성은, 조건을 만족하는 데이터가 인덱스 <strong>뒤쪽</strong>에 있으면 앞부분을 한참 읽고 버려야 해서 I/O와 대기가 커질 수 있어요.</li>
<li>예: <code>WHERE 계약ID = :a AND 거래일자 BETWEEN ... ORDER BY 시간대, 회사</code> → 정렬 생략하려면 <code>[계약ID + 시간대 + 회사 + 거래일자]</code>.</li>
<li>⚠️ I/O 최소화와 소트 생략을 <strong>둘 다</strong> 완벽히 만족시키기 어려울 수 있어 트레이드오프를 판단해야 해요.</li>
<li>💡 <strong>IN 조건은 = 이 아니다</strong>: IN-List Iterator로 풀면 소트 생략이 깨질 수 있어요(각 값마다 따로 정렬된 결과를 이어 붙이므로).</li>
</ul>
<h3 id="t-72">3.4.6 결합 인덱스 선택도 (p.241) ⭐</h3>
<ul>
<li><strong>선택도(Selectivity)</strong>: 전체 레코드 중 조건절을 만족하는 레코드 비율. 선택도 × 총 레코드 수 = <strong>카디널리티</strong>.</li>
<li>선택도가 높다 = 많이 선택된다 = 인덱스 효용가치 낮음.</li>
<li><strong>컬럼 순서 결정 시 선택도 이슈</strong> ⭐</li>
<li>선두 컬럼들이 모두 <code>=</code> 조건이면 <strong>선택도는 순서와 무관</strong>(2.1.5에서 본 대로 스캔 범위가 같음).</li>
<li>“선택도 낮은(좋은) 컬럼을 앞에” 가 의미 있는 경우: 그 컬럼이 <strong>항상 조건에 쓰이는지</strong>, 또는 <strong>선두 범위 조건</strong>이라 뒤 컬럼이 필터가 될 때.</li>
<li><strong>인덱스 선택도</strong>: 인덱스 컬럼을 <strong>모두 = 조건</strong>으로 조회할 때 평균적으로 선택되는 비율. 선택도가 높은(카디널리티가 높은) 인덱스는 테이블 액세스가 많아 효용이 낮아요.</li>
<li>⭐ 결론: 선택도가 낮은 컬럼을 앞에 두려는 노력은 의미가 없거나 오히려 손해일 수 있어요. 기준은 <strong>항상(자주) 쓰는 컬럼</strong>을 앞에, 그중 <strong>= 조건 컬럼</strong>을 앞쪽에.</li>
</ul>
<h3 id="t-73">3.4.7 중복 인덱스 제거 (p.244)</h3>
<ul>
<li><strong>완전 중복</strong>: <code>[계약ID + 청약일자]</code>와 <code>[계약ID + 청약일자 + 보험개시일자]</code> → 앞의 인덱스는 뒤 인덱스로 대체 가능.</li>
<li><strong>불완전 중복</strong>: <code>[계약ID + 청약일자]</code>와 <code>[계약ID + 보험개시일자]</code> → 계약ID의 <strong>NDV</strong>(Distinct Value 수)가 매우 많아 계약ID당 레코드가 적으면 <code>[계약ID]</code> 하나로 통합 가능.</li>
</ul>
<h3 id="t-74">3.4.8 인덱스 설계도 작성 (p.249)</h3>
<ul>
<li>인덱스 설계 시 테이블별 <strong>액세스 경로 조사</strong> → 조건절 컬럼, 연산자, 수행 빈도, 처리 건수를 표로 정리 → 인덱스 후보 도출 → 중복 제거 → 설계도 작성.</li>
<li>💡 시스템 전체를 고려한 <strong>설계도</strong>를 남기면 인덱스가 무분별하게 늘어나는 걸 막을 수 있어요.</li>
</ul>
<h1 id="t-ch-4">4장. 조인 튜닝</h1>
<h2 id="t-75">4.1 NL 조인 (p.255)</h2>
<h3 id="t-76">4.1.1 기본 메커니즘 (p.255) ⭐</h3>
<ul>
<li><strong>NL(Nested Loops) 조인</strong> = 중첩 루프문과 같은 방식. <strong>Outer(Driving) 테이블</strong>에서 읽은 레코드마다 <strong>Inner 테이블</strong>을 인덱스로 찾아가요.</li>
</ul>
<pre><code>FOR outer IN (SELECT * FROM 사원 WHERE 입사일자 &gt;= '19960101') LOOP     -- Outer (Driving)
  FOR inner IN (SELECT * FROM 고객 WHERE 관리사원번호 = outer.사원번호) LOOP   -- Inner
    결과 출력;
  END LOOP;
END LOOP;
</code></pre>
<ul>
<li>일반적으로 <strong>Outer와 Inner 양쪽 모두 인덱스</strong>를 이용해요. Outer 쪽은 대상이 많지 않거나 Full Scan이 유리하면 인덱스 없어도 되지만, ⭐ <strong>Inner 쪽 조인 컬럼에는 인덱스가 반드시 필요</strong>해요(없으면 Outer 건수만큼 Full Scan 반복).</li>
</ul>
<h3 id="t-77">4.1.2 NL 조인 실행계획 제어 (p.260)</h3>
<pre><code class="language-sql">SELECT /*+ ORDERED USE_NL(c) */ ...
FROM 사원 e, 고객 c WHERE ...
-- 또는
SELECT /*+ LEADING(e) USE_NL(c) INDEX(c 고객_X1) */ ...
</code></pre>
<pre><code>NESTED LOOPS
  TABLE ACCESS BY INDEX ROWID  사원     ← Outer
    INDEX RANGE SCAN  사원_X1
  TABLE ACCESS BY INDEX ROWID  고객     ← Inner
    INDEX RANGE SCAN  고객_X1
</code></pre>
<ul>
<li><code>ORDERED</code>: FROM 절에 나열한 순서대로 조인. <code>LEADING(e)</code>: e 테이블을 <strong>가장 먼저</strong> 읽음.</li>
<li><code>USE_NL(c)</code>: <strong>c 테이블을 Inner로</strong> NL 조인. ⚠️ 힌트 인자는 Inner 쪽 테이블.</li>
<li>세 개 이상: <code>/*+ LEADING(A B C) USE_NL(B) USE_NL(C) */</code> 또는 <code>ORDERED USE_NL(B C)</code>.</li>
</ul>
<h3 id="t-78">4.1.3 NL 조인 수행 과정 분석 (p.261)</h3>
<p>조건절이 다음과 같을 때 처리 순서 예:</p>
<pre><code class="language-sql">SELECT /*+ ORDERED USE_NL(c) INDEX(e) INDEX(c) */ ...
FROM 사원 e, 고객 c
WHERE c.관리사원번호 = e.사원번호      -- ①
AND   e.입사일자 &gt;= '19960101'        -- ②
AND   e.부서코드 = 'Z123'             -- ③
AND   c.최종주문금액 &gt;= 20000         -- ④
</code></pre>
<ul>
<li>인덱스: <code>사원_X1 [입사일자]</code>, <code>고객_X1 [관리사원번호]</code>, <code>고객_X2 [최종주문금액]</code></li>
<li>순서: ② 사원_X1 Range Scan → ③ 사원 테이블에서 부서코드 필터 → ① 고객_X1로 조인 → ④ 고객 테이블에서 최종주문금액 필터.</li>
<li>💡 각 단계에서 “몇 건 읽고 몇 건 버렸는지”가 튜닝 포인트(4.1.4).</li>
</ul>
<h3 id="t-79">4.1.4 NL 조인 튜닝 포인트 (p.264) ⭐</h3>
<div class="tw"><table>
<thead>
<tr>
<th>포인트</th>
<th>확인할 것</th>
</tr>
</thead>
<tbody>
<tr>
<td>① Outer 인덱스 → Outer 테이블 액세스</td>
<td>테이블 필터로 <strong>많이 버려지면</strong> → 필터 컬럼을 인덱스에 추가</td>
</tr>
<tr>
<td>② Inner 인덱스 탐색</td>
<td><strong>Outer 건수만큼 반복</strong>(랜덤 액세스). 조인 횟수 자체를 줄여야</td>
</tr>
<tr>
<td>③ Inner 인덱스 → Inner 테이블 액세스</td>
<td>여기서도 많이 버려지면 필터 컬럼을 인덱스에 추가</td>
</tr>
<tr>
<td>④ 맨 처음 액세스하는 Outer 범위</td>
<td>대상이 너무 많으면 <strong>조인 순서 변경</strong>, 해시 조인 고려</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>⭐ NL 조인의 <strong>전체 일량</strong>은 맨 처음 Outer 인덱스 스캔에서 얻는 결과 건수에 좌우돼요(그 건수만큼 이후 단계가 반복되므로).</li>
<li>
<p>단계를 하나씩 끝내고 넘어가는 게 아니라 <strong>레코드 한 건씩</strong> 모든 단계를 거쳐 진행돼요.</p>
</li>
<li>
<p><strong>올바른 조인 메소드 선택</strong>: OLTP에서는 일단 NL 조인부터 고려. 랜덤 액세스 때문에 성능이 안 나오면 → 조인 순서 변경 → 소트 머지/해시 조인 검토.</p>
</li>
</ul>
<h3 id="t-80">4.1.5 NL 조인 특징 요약 (p.265) ⭐</h3>
<ol>
<li><strong>랜덤 액세스 위주</strong> 조인 방식 → 대량 데이터 조인 시 불리.</li>
<li><strong>한 레코드씩 순차 진행</strong> → 대용량이라도 <strong>부분범위 처리</strong>가 가능하면 매우 빠른 응답(먼저 액세스한 테이블 처리 범위에 따라 성능 결정).</li>
<li><strong>인덱스 구성 전략이 특히 중요</strong>(Inner 쪽 조인 컬럼 인덱스 유무, 컬럼 구성).</li>
<li>⭐ → <strong>소량 데이터를 주로 처리하거나 부분범위 처리가 가능한 OLTP</strong>에 적합.</li>
</ol>
<h3 id="t-81">4.1.6 NL 조인 튜닝 실습 (p.266)</h3>
<ul>
<li>실행계획 + 트레이스(Rows, cr)를 보며 <strong>어디서 블록을 많이 읽고 많이 버렸는지</strong> 찾는 연습.</li>
<li>예시 패턴</li>
<li>Outer 인덱스 Range Scan 결과 대부분이 테이블 필터로 버려짐 → 필터 컬럼을 Outer 인덱스에 추가.</li>
<li>Inner 인덱스로 찾은 결과 대부분이 Inner 테이블 필터로 버려짐 → Inner 인덱스에 컬럼 추가.</li>
<li>조인 성공 건수가 Outer 건수보다 훨씬 적음 → <strong>조인 순서</strong>를 바꾸거나 Inner 쪽 조건을 먼저 적용.</li>
<li>💡 트레이스 <code>cr</code>(consistent read)은 블록 읽기 수, <code>Rows</code>는 각 단계 출력 건수예요.</li>
</ul>
<h3 id="t-82">4.1.7 NL 조인 확장 메커니즘 (p.270)</h3>
<p>버전이 올라가면서 NL 조인 성능을 높이기 위해 도입된 기능들이에요. 공통 원리: <strong>디스크 I/O를 모아서 한 번에</strong>.</p>
<div class="tw"><table>
<thead>
<tr>
<th>기능</th>
<th>내용</th>
<th>실행계획 특징</th>
<th>힌트</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>테이블 Prefetch</strong> (9i~)</td>
<td>Inner 테이블 블록을 읽을 때 <strong>곧 읽을 블록까지 미리</strong> 캐시에 적재</td>
<td><code>TABLE ACCESS BY INDEX ROWID</code>가 <code>NESTED LOOPS</code> <strong>위</strong>로 올라감</td>
<td><code>NLJ_PREFETCH</code> / <code>NO_NLJ_PREFETCH</code></td>
</tr>
<tr>
<td><strong>배치 I/O</strong> (11g~)</td>
<td>Inner 인덱스로 찾은 ROWID를 <strong>모아서</strong> 테이블 블록 단위로 한꺼번에 액세스</td>
<td><code>NESTED LOOPS</code>가 <strong>두 번</strong> 나옴</td>
<td><code>NLJ_BATCHING</code> / <code>NO_NLJ_BATCHING</code></td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>두 기능 모두 <strong>블록마다 I/O Call이 발생하는 비효율</strong>을 줄이려고 도입됐어요.</li>
<li>⚠️ 배치 I/O는 Inner 쪽 테이블 블록을 모두 버퍼캐시에서 찾으면(디스크 I/O가 없으면) 데이터 정렬 순서가 바뀌지 않지만, 일부라도 디스크에서 읽으면 <strong>결과 순서가 Outer 순서와 다를 수</strong> 있어요 → 정렬이 필요하면 ORDER BY를 꼭 명시.</li>
</ul>
<h2 id="t-83">4.2 소트 머지 조인 (p.274)</h2>
<h3 id="t-84">4.2.1 SGA vs. PGA (p.274)</h3>
<ul>
<li><strong>SGA</strong>: 공유 메모리. 여러 프로세스가 동시 접근 → <strong>래치</strong> 등 직렬화 필요.</li>
<li><strong>PGA</strong>: 각 서버 프로세스의 <strong>독립 메모리 영역</strong>. 다른 프로세스와 공유하지 않으므로 <strong>래치 없이 빠르게</strong> 읽음.</li>
<li>소트 머지 조인·해시 조인은 <strong>PGA</strong>(Sort Area, Hash Area)를 활용 → 같은 양을 읽어도 SGA 버퍼캐시보다 훨씬 빨라요.</li>
</ul>
<h3 id="t-85">4.2.2 기본 메커니즘 (p.276) ⭐</h3>
<ol>
<li><strong>소트 단계</strong>: 양쪽 집합을 <strong>조인 컬럼 기준으로 정렬</strong>(PGA Sort Area에, 넘치면 Temp 테이블스페이스).</li>
<li><strong>머지 단계</strong>: 정렬된 양쪽 집합을 서로 <strong>머지(Merge)</strong>.</li>
</ol>
<pre><code class="language-sql">SELECT /*+ ORDERED USE_MERGE(c) */ ...
FROM 사원 e, 고객 c WHERE c.관리사원번호 = e.사원번호 ...
</code></pre>
<pre><code>MERGE JOIN
  SORT (JOIN)
    TABLE ACCESS BY INDEX ROWID  사원
  SORT (JOIN)
    TABLE ACCESS BY INDEX ROWID  고객
</code></pre>
<ul>
<li>머지 과정: Outer(First)를 하나씩 읽으며 Inner(Second)의 PGA 정렬 집합에서 <strong>조인 대상을 찾고 멈출 지점까지만</strong> 스캔(이미 정렬되어 있으므로 시작점을 기억해 다음에 이어서).</li>
</ul>
<h3 id="t-86">4.2.3 소트 머지 조인이 빠른 이유 (p.278)</h3>
<ul>
<li>NL 조인은 조인 과정에서 <strong>DB 버퍼캐시</strong>(SGA)를 경유 → 래치 획득·랜덤 액세스 부담.</li>
<li>소트 머지 조인은 양쪽을 <strong>한꺼번에 읽어 PGA에 저장 후</strong> 조인 → 조인 과정에서 래치 없이 PGA에서 빠르게.</li>
<li>대량 데이터 조인에서 NL 조인보다 유리. 다만 <strong>정렬 부담</strong>이 있어서 요즘은 대부분 해시 조인이 대체.</li>
</ul>
<h3 id="t-87">4.2.4 소트 머지 조인의 주용도 (p.279)</h3>
<p>해시 조인이 더 빠른 경우가 많지만, 아래 상황에서는 소트 머지 조인이 쓰여요.</p>
<ul>
<li>조인 조건식이 <strong>등치(=) 조건이 아닌</strong> 대량 데이터 조인 (해시 조인은 = 조건에서만 가능)</li>
<li>조인 조건식이 <strong>아예 없는</strong> 카테시안 곱(Cross Join): <code>MERGE JOIN CARTESIAN</code></li>
<li>💡 (보충) 양쪽 집합이 이미 정렬돼 있거나 인덱스로 정렬을 생략할 수 있을 때도 유리할 수 있어요.</li>
</ul>
<h3 id="t-88">4.2.5 소트 머지 조인 제어하기 (p.280)</h3>
<pre><code class="language-sql">SELECT /*+ ORDERED USE_MERGE(c) */ ...    -- 사원 → 고객 순으로 소트 머지
</code></pre>
<ul>
<li>인덱스로 정렬이 생략 가능하면 First 쪽은 SORT JOIN 없이 인덱스 순서로 읽기도 해요.</li>
</ul>
<h3 id="t-89">4.2.6 소트 머지 조인 특징 요약 (p.281)</h3>
<ol>
<li><strong>조인을 위해 실시간으로 인덱스를 생성</strong>하는 것과 비슷(Inner 쪽 PGA 정렬 집합). 양쪽 집합을 정렬한 뒤 NL 조인과 같은 방식으로 진행하지만 PGA를 쓰므로 빠름.</li>
<li><strong>조인 컬럼에 인덱스가 없어도</strong> 됨 → 인덱스 유무에 영향 덜 받음. 특히 양쪽 집합을 <strong>각자 조건으로 먼저 줄일 수 있을 때</strong> 유리해요.</li>
<li>양쪽 집합을 <strong>개별적으로 읽고</strong> 조인 시작 → 스캔 위주 액세스 방식(Full Scan도 가능).</li>
<li>⚠️ 모든 처리가 스캔 방식은 아니에요. 양쪽 소스 집합에서 대상을 찾을 때 인덱스를 쓰면 랜덤 액세스가 생겨요(해시 조인도 마찬가지).</li>
</ol>
<h2 id="t-90">4.3 해시 조인 (p.282)</h2>
<h3 id="t-91">4.3.1 기본 메커니즘 (p.282) ⭐</h3>
<ol>
<li><strong>Build 단계</strong>: 작은 쪽 집합(<strong>Build Input</strong>)을 읽어 <strong>해시 테이블</strong>(PGA의 Hash Area)을 생성. 조인 컬럼을 해시 함수에 넣어 버킷에 저장.</li>
<li><strong>Probe 단계</strong>: 반대쪽 집합(<strong>Probe Input</strong>)을 읽으며 해시 테이블을 탐색해 조인.</li>
</ol>
<pre><code class="language-sql">SELECT /*+ ORDERED USE_HASH(c) */ ...
FROM 사원 e, 고객 c WHERE c.관리사원번호 = e.사원번호 ...
</code></pre>
<pre><code>HASH JOIN
  TABLE ACCESS BY INDEX ROWID  사원   ← Build Input (위)
  TABLE ACCESS BY INDEX ROWID  고객   ← Probe Input (아래)
</code></pre>
<ul>
<li>Hash Area가 부족하면 <strong>Temp 테이블스페이스</strong>에 저장(성능 저하).</li>
</ul>
<h3 id="t-92">4.3.2 해시 조인이 빠른 이유 (p.286)</h3>
<ul>
<li>Hash Area에 생성한 해시 테이블(해시 맵)을 이용한다는 점만 다를 뿐 진행 방식은 NL 조인과 비슷해요.</li>
<li>해시 테이블을 <strong>PGA</strong>에 만들기 때문에 래치 없이 빠르게 탐색 → 소트 머지 조인처럼 빠름.</li>
<li>소트 머지보다 빠른 이유: <strong>양쪽 모두 정렬할 필요가 없고</strong>, 작은 쪽만 해시 맵을 만들면 됨. 소트 머지는 양쪽 집합 정렬 부담 + 큰 집합 정렬 시 Temp 사용.</li>
<li>⭐ <strong>Build Input이 Hash Area에 담길 정도로 작아야</strong> 효과적이에요.</li>
</ul>
<h3 id="t-93">4.3.3 대용량 Build Input 처리 (p.288)</h3>
<ul>
<li>양쪽 모두 대용량이라 해시 영역에 담을 수 없을 때 → <strong>분할·정복(Divide &amp; Conquer)</strong> 방식.</li>
<li><strong>파티션 단계</strong>: 양쪽 집합의 조인 컬럼에 해시 함수를 적용해 <strong>같은 해시 값끼리 파티션</strong>으로 나누어 Temp에 저장(Pair).</li>
<li><strong>조인 단계</strong>: 각 파티션 짝(Pair)에 대해 작은 쪽으로 해시 테이블을 만들어 조인. (짝마다 Build/Probe 역할이 바뀔 수 있음)</li>
</ul>
<h3 id="t-94">4.3.4 해시 조인 실행계획 제어 (p.290)</h3>
<pre><code class="language-sql">SELECT /*+ USE_HASH(e c) */ ...                     -- 순서는 옵티마이저가 결정
SELECT /*+ LEADING(e) USE_HASH(c) */ ...            -- e를 Build Input으로
SELECT /*+ USE_HASH(e c) SWAP_JOIN_INPUTS(c) */ ... -- c를 Build Input으로
</code></pre>
<ul>
<li><strong>세 개 이상 테이블 해시 조인</strong>: 조인 연결고리를 따라 순방향·역방향 <strong>어떤 조합도</strong> 가능. <code>LEADING</code>으로 첫 번째 Build Input을 정하고, 이후 조인에서 Build Input을 바꾸려면 <code>SWAP_JOIN_INPUTS</code>, 그대로 두려면 <code>NO_SWAP_JOIN_INPUTS</code>.</li>
<li><code>USE_HASH</code>만 쓰고 순서를 지정하지 않으면 Build Input은 옵티마이저가 정해요. 보통 <strong>카디널리티가 작은</strong> 쪽을 골라요.</li>
<li>💡 <code>ORDERED</code>/<code>LEADING</code>으로 지정한 첫 테이블이 <strong>Build Input</strong>(위쪽)이 되는 게 기본이에요.</li>
</ul>
<h3 id="t-95">4.3.5 조인 메소드 선택 기준 (p.296) ⭐</h3>
<ul>
<li>
<p>💡 여기서 “대량”의 기준은 단순 건수가 아니라, <strong>NL 조인을 최적화해도 랜덤 액세스가 많아 목표 성능이 안 나오는</strong> 경우예요.</p>
</li>
<li>
<p><strong>소량</strong> 데이터 조인 → <strong>NL 조인</strong></p>
</li>
<li><strong>대량</strong> 데이터 조인 → <strong>해시 조인</strong></li>
<li>
<p>대량 데이터 조인인데 해시 조인으로 처리할 수 없을 때(<strong>조인 조건식이 = 조건이 아닐 때</strong>, 조인 조건이 아예 없는 카테시안 곱 포함) → <strong>소트 머지 조인</strong></p>
</li>
<li>
<p><strong>수행빈도가 매우 높은 쿼리</strong>라면: NL 조인과 해시 조인 성능이 같다면 <strong>NL 조인</strong>, 해시 조인이 약간 빨라도 <strong>NL 조인</strong>, NL 조인보다 해시 조인이 <strong>매우 빠른</strong> 경우에만 해시 조인.</p>
</li>
<li>이유 ⭐: <strong>해시 테이블은 단 하나의 쿼리를 위해 생성하고 조인이 끝나면 바로 소멸</strong>하는 자료구조. 수행 빈도가 높은 쿼리에 쓰면 CPU·메모리 사용률이 크게 증가하고, 해시 맵 생성 과정의 래치 경합도 생겨요. 반면 NL 조인이 쓰는 인덱스는 영구적으로 유지되며 다양한 쿼리에 공유·재사용돼요.</li>
<li>💡 해시 조인은 수행빈도가 낮고, 쿼리 수행 시간이 오래 걸리는 <strong>대량 데이터 조인</strong>(배치, DW, OLAP)에 적합.</li>
</ul>
<h2 id="t-96">4.4 서브쿼리 조인 (p.299)</h2>
<h3 id="t-97">4.4.1 서브쿼리 변환이 필요한 이유 (p.299)</h3>
<ul>
<li>옵티마이저는 비용을 평가하고 실행계획을 생성하기 전에 사용자로부터 전달받은 SQL을 <strong>최적화에 유리한 형태로 변환</strong>하는 작업, 즉 <strong>쿼리 변환(Query Transformation)</strong> 부터 진행해요.</li>
<li>서브쿼리 종류</li>
</ul>
<div class="tw"><table>
<thead>
<tr>
<th>종류</th>
<th>위치</th>
<th>설명</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>인라인 뷰</strong></td>
<td>FROM 절</td>
<td></td>
</tr>
<tr>
<td><strong>중첩된 서브쿼리</strong>(Nested Subquery)</td>
<td>WHERE 절</td>
<td>메인쿼리 컬럼을 참조하면 <strong>상관관계 있는</strong> 서브쿼리</td>
</tr>
<tr>
<td><strong>스칼라 서브쿼리</strong></td>
<td>주로 SELECT-LIST</td>
<td><strong>한 레코드당 정확히 하나의 값</strong>을 반환</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>서브쿼리를 <strong>메인쿼리와 같은 레벨로 풀어내면</strong>(Unnesting, View Merging) 다양한 액세스 경로와 조인 메소드를 평가할 수 있어요.</li>
</ul>
<h3 id="t-98">4.4.2 서브쿼리와 조인 (p.302) ⭐</h3>
<p><strong>필터 오퍼레이션</strong> (Unnesting 안 할 때, <code>NO_UNNEST</code>)</p>
<ul>
<li>메인쿼리에서 읽은 레코드마다 서브쿼리를 반복 수행하는 NL 조인과 비슷한 방식. 차이점:</li>
<li>메인쿼리 한 건이 서브쿼리 집합과 <strong>조인에 성공하는 순간 다음 로우로</strong>(EXISTS 의미).</li>
<li><strong>캐싱 기능</strong>: 서브쿼리 입력 값별 결과(true/false)를 캐시에 저장해 같은 값은 재사용.</li>
<li>메인쿼리에 종속 → <strong>조인 순서 고정</strong>(항상 메인쿼리가 드라이빙).</li>
</ul>
<p><strong>서브쿼리 Unnesting</strong> (<code>UNNEST</code>, 색인 p.304~308)</p>
<ul>
<li>메인과 서브쿼리 간 계층 구조를 풀어 <strong>같은 레벨(Flat한 구조)</strong> 로 만드는 것 = <strong>서브쿼리 Flattening</strong>.</li>
<li>풀어내면 NL 세미조인 외에 <strong>해시 세미조인, 조인 순서 변경</strong>(서브쿼리 쪽 집합을 먼저 드라이빙) 등 다양한 방식 가능.</li>
<li>힌트: <code>/*+ UNNEST NL_SJ */</code>, <code>/*+ UNNEST HASH_SJ */</code>, 서브쿼리 먼저: <code>/*+ LEADING(c@sub) */</code>.</li>
<li>서브쿼리를 드라이빙하면 결과 집합이 메인쿼리 레코드를 중복시킬 수 있으므로, 옵티마이저는 서브쿼리 쪽을 <strong>SORT UNIQUE / HASH UNIQUE</strong> 하거나(Unique 보장 시 생략) 세미조인으로 처리해요.</li>
</ul>
<p><strong>ROWNUM - 잘 쓰면 약, 잘못 쓰면 독</strong></p>
<ul>
<li><code>WHERE ... AND ROWNUM &lt;= 1</code> 을 서브쿼리에 넣으면 <strong>Unnesting을 방지</strong>하는 효과가 생겨 해시 세미조인 같은 좋은 실행계획을 막을 수 있어요. EXISTS는 원래 하나만 찾으면 멈추므로 ROWNUM이 필요 없어요.</li>
</ul>
<p><strong>서브쿼리 Pushing</strong> (<code>PUSH_SUBQ</code> / <code>NO_PUSH_SUBQ</code>, 색인 p.308·310)</p>
<ul>
<li>Unnesting 되지 않은 서브쿼리는 기본적으로 <strong>실행계획 맨 마지막 단계</strong>에서 필터링돼요.</li>
<li><strong>Pushing</strong>: 서브쿼리 필터링을 <strong>가능한 한 앞 단계</strong>로 당겨서 처리 → 불필요한 조인 횟수 감소.</li>
<li>⚠️ <code>PUSH_SUBQ</code>는 <strong>Unnesting 되지 않은 서브쿼리</strong>에만 작동 → <code>NO_UNNEST</code>와 함께 서브쿼리 안에 기술.</li>
</ul>
<h3 id="t-99">4.4.3 뷰(View)와 조인 (p.311)</h3>
<p><strong>뷰 머징(View Merging)</strong> (<code>MERGE</code> / <code>NO_MERGE</code>, 색인 p.312)</p>
<ul>
<li>최적화 단위는 <strong>쿼리 블록</strong>. 인라인 뷰를 머징하지 않으면 뷰를 독자적으로 최적화 → 예: 당월 전체 거래를 GROUP BY 한 뒤 조인 → 비효율.</li>
<li>뷰를 메인쿼리와 <strong>머징</strong>하면 조인을 먼저 하고 나중에 GROUP BY → 소량 고객만 조인 후 집계할 수 있음.</li>
<li>⚠️ 머징이 항상 좋은 건 아니에요(조인에 성공한 전체 데이터를 GROUP BY 해야 하므로). 대상 고객이 적으면 머징, 많으면 NO_MERGE가 유리할 수 있어요.</li>
</ul>
<p><strong>조인 조건 Pushdown</strong> (<code>PUSH_PRED</code> / <code>NO_PUSH_PRED</code>, 색인 p.313·316)</p>
<ul>
<li>메인쿼리를 실행하면서 <strong>조인 조건절 값을 건건이 뷰 안으로 밀어 넣는</strong> 기능 (11g~).</li>
<li>뷰를 머징하지 않으면서도, 메인쿼리 각 건에 대해 뷰 안에서 <strong>필요한 데이터만</strong> 읽어 GROUP BY → <strong>부분범위 처리 가능</strong>.</li>
<li>실행계획: <code>VIEW PUSHED PREDICATE</code>.</li>
</ul>
<pre><code class="language-sql">SELECT /*+ LEADING(c) USE_NL(t) */ c.고객번호, t.평균거래 ...
FROM 고객 c,
     (SELECT /*+ NO_MERGE PUSH_PRED */ 고객번호, AVG(거래금액) 평균거래
      FROM 거래 WHERE 거래일시 &gt;= TRUNC(SYSDATE, 'MM') GROUP BY 고객번호) t
WHERE t.고객번호 = c.고객번호 ...
</code></pre>
<p><strong>Lateral 인라인 뷰, Cross/Outer Apply 조인</strong> (12c, 색인 p.315)</p>
<ul>
<li>인라인 뷰 안에서 <strong>메인쿼리 테이블 컬럼을 참조</strong>할 수 있는 문법(<code>LATERAL</code>, <code>CROSS APPLY</code>, <code>OUTER APPLY</code>).</li>
<li>⚠️ 굳이 쓸 필요는 적어요. 조인 조건 Pushdown이 잘 작동하지 않을 때 대안 정도로 알아두기.</li>
</ul>
<h3 id="t-100">4.4.4 스칼라 서브쿼리 조인 (p.317) ⭐</h3>
<p><strong>스칼라 서브쿼리 특징</strong></p>
<ul>
<li>함수와 달리 <strong>재귀적으로 실행되지 않고</strong>, 컨텍스트 스위칭 없이 메인쿼리와 한 몸체처럼 실행돼요.</li>
<li>메인쿼리 레코드마다 <strong>정확히 하나의 값</strong>만 반환. 스칼라 서브쿼리를 이용한 조인은 <strong>NL 조인</strong>과 같은 방식이지만, <strong>Outer 조인</strong>처럼 동작(결과 없으면 NULL).</li>
<li>실행계획: 스칼라 서브쿼리가 <strong>메인쿼리보다 위쪽</strong>에 표시돼요.</li>
</ul>
<p><strong>스칼라 서브쿼리 캐싱 효과</strong> (색인 p.318)</p>
<ul>
<li>입력 값(메인쿼리 컬럼)과 출력 값을 <strong>Query Execution Cache</strong>에 저장. 이 캐시는 <strong>쿼리 단위로 PGA</strong>에 할당되고 쿼리가 끝나면 반환돼요. 같은 입력 값이면 서브쿼리를 실행하지 않고 캐시 값 반환 → <strong>함수 호출 횟수 최소화</strong>에도 활용.</li>
<li>캐시 크기: 파라미터 <code>_query_execution_cache_max_size</code>.</li>
</ul>
<pre><code class="language-sql">-- 함수를 스칼라 서브쿼리로 감싸면 입력 값이 같을 때 캐싱되어 호출 감소
SELECT 판매번호, (SELECT GET_상품명(상품번호) FROM DUAL) ...
</code></pre>
<p><strong>스칼라 서브쿼리 캐싱 부작용</strong></p>
<ul>
<li>캐시 공간은 작아요 → <strong>입력 값의 종류가 소수</strong>여서 해시 충돌 가능성이 적을 때 효과적. 입력 값이 거의 다 다르면(예: 고객번호별) 캐시를 확인하는 비용만 추가돼서 <strong>오히려 느려짐</strong>.</li>
<li>메인쿼리 집합이 매우 작은 경우에도 캐싱 효과 미미(예: 부분범위 처리로 몇 건만 읽는 경우).</li>
</ul>
<p><strong>두 개 이상의 값 반환</strong></p>
<ul>
<li>같은 테이블에서 여러 값을 얻으려고 스칼라 서브쿼리를 여러 번 쓰면 <strong>같은 데이터를 반복해서 읽는</strong> 비효율이 생겨요.</li>
<li>스칼라 서브쿼리는 값 하나만 반환 → 여러 컬럼이 필요하면 문자열로 <strong>결합 후 SUBSTR로 분리</strong>하거나, 오브젝트 TYPE 사용, 또는 인라인 뷰 + 조인 조건 Pushdown(11g~)이 더 깔끔해요.</li>
</ul>
<p><strong>스칼라 서브쿼리 Unnesting</strong> (12c, 색인 p.325)</p>
<ul>
<li>💡 <strong>병렬 쿼리</strong>에서는 스칼라 서브쿼리를 피하고 해시 조인으로 처리하는 편이 효과적이에요.</li>
<li>스칼라 서브쿼리도 NL 방식으로 반복 실행되므로 대량이면 느림 → 12c부터 옵티마이저가 <strong>조인문으로 변환</strong>(Unnesting, 주로 해시 Outer 조인)할 수 있어요.</li>
<li>힌트 <code>UNNEST</code> / <code>NO_UNNEST</code>, 파라미터 <code>_optimizer_unnest_scalar_sq</code>. ⚠️ 원치 않게 풀려서 성능이 나빠지면 <code>NO_UNNEST</code>로 막기.</li>
</ul>
<h1 id="t-ch-5">5장. 소트 튜닝</h1>
<h2 id="t-101">5.1 소트 연산에 대한 이해 (p.331)</h2>
<h3 id="t-102">5.1.1 소트 수행 과정 (p.331) ⭐</h3>
<ul>
<li>소트는 기본적으로 <strong>PGA에 할당한 Sort Area</strong>에서 이루어져요. 공간이 부족하면 <strong>디스크 Temp 테이블스페이스</strong>를 사용.</li>
</ul>
<div class="tw"><table>
<thead>
<tr>
<th>종류</th>
<th>설명</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>메모리 소트</strong>(In-Memory Sort, Internal Sort)</td>
<td>전체 데이터 정렬을 메모리 내에서 완료</td>
</tr>
<tr>
<td><strong>디스크 소트</strong>(To-Disk Sort, External Sort)</td>
<td>Sort Area 안에서 못 끝내서 디스크 공간까지 사용</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>디스크 소트 과정: 정렬 대상을 Sort Area에 담다가 꽉 차면 정렬해서 Temp에 저장(<strong>Sort Run</strong>) → 반복 → 정렬된 Sort Run들을 <strong>머지</strong>(Merge)하며 최종 결과.</li>
<li>⭐ 소트 연산은 <strong>메모리 집약적 + CPU 집약적</strong>이고, 디스크 소트가 발생하면 성능이 크게 떨어져요. 부분범위 처리도 불가능하게 만들어요.</li>
<li><strong>Optimal 소트</strong>(1-pass, multi-pass와 구분): Sort Area 내에서 끝나는 소트.</li>
</ul>
<h3 id="t-103">5.1.2 소트 오퍼레이션 (p.333) ⭐</h3>
<div class="tw"><table>
<thead>
<tr>
<th>오퍼레이션</th>
<th>발생하는 경우</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Sort Aggregate</strong></td>
<td>전체 로우를 대상으로 <strong>집계</strong>(SUM, MAX, MIN, AVG, COUNT). ⚠️ 이름은 Sort지만 실제로 <strong>정렬하지 않아요</strong> (값을 하나씩 누적)</td>
</tr>
<tr>
<td><strong>Sort Order By</strong></td>
<td>데이터를 <strong>정렬</strong>할 때(ORDER BY)</td>
</tr>
<tr>
<td><strong>Sort Group By</strong></td>
<td>소팅 알고리즘으로 <strong>그룹별 집계</strong>. 그룹 개수만큼만 Sort Area 사용 → 대량이어도 디스크 소트 드뭄</td>
</tr>
<tr>
<td><strong>Hash Group By</strong></td>
<td>10gR2~ GROUP BY 절 뒤에 ORDER BY 없으면 해싱 알고리즘으로 그룹별 집계 (<code>/*+ NO_USE_HASH_AGGREGATION */</code>로 Sort Group By 강제)</td>
</tr>
<tr>
<td><strong>Sort Unique</strong></td>
<td>Unnesting된 서브쿼리가 M쪽 집합이거나 Unique 인덱스 없을 때 <strong>중복 제거</strong>. UNION, MINUS, INTERSECT, DISTINCT. 유일성이 PK·Unique 인덱스로 보장되면 생략</td>
</tr>
<tr>
<td><strong>Hash Unique</strong></td>
<td>10gR2~ DISTINCT를 해싱으로 처리(ORDER BY 없을 때)</td>
</tr>
<tr>
<td><strong>Sort Join</strong></td>
<td><strong>소트 머지 조인</strong> 수행 시</td>
</tr>
<tr>
<td><strong>Window Sort</strong></td>
<td><strong>윈도우 함수</strong>(분석 함수) 수행 시</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>⚠️ <strong>Sort Group By / Hash Group By의 결과는 정렬 보장이 안 돼요.</strong> 정렬된 결과가 필요하면 반드시 <strong>ORDER BY</strong>를 명시하세요(Sort Group By도 GROUP BY 컬럼 순으로 정렬되어 나오는 것처럼 보이지만 보장 X).</li>
</ul>
<h2 id="t-104">5.2 소트가 발생하지 않도록 SQL 작성 (p.343)</h2>
<h3 id="t-105">5.2.1 Union vs. Union All (p.343) ⭐</h3>
<ul>
<li><strong>UNION</strong>: 두 집합의 <strong>중복을 제거</strong> → <strong>Sort Unique</strong> 발생.</li>
<li><strong>UNION ALL</strong>: 중복 확인 없이 <strong>두 집합을 단순히 결합</strong> → 소트 없음.</li>
<li>⭐ 두 집합이 <strong>상호배타적</strong>(조건이 겹치지 않음)이면 UNION 대신 <strong>UNION ALL</strong>을 써야 해요.</li>
</ul>
<pre><code class="language-sql">-- 결제일자 조건이 서로 배타적이면 UNION ALL
SELECT ... FROM 결제 WHERE 결제일자 = '20180316'
UNION ALL
SELECT ... FROM 결제 WHERE 주문일자 = '20180316'
AND 결제일자 &lt;&gt; '20180316';    -- 겹치는 부분 제거 (결제일자 NULL 허용이면 LNNVL(결제일자 = '20180316'))
</code></pre>
<ul>
<li>⚠️ 조건이 겹칠 수 있는데 그냥 UNION ALL로 바꾸면 결과가 <strong>중복</strong>될 수 있어요 → 위처럼 한쪽 조건을 배제하거나 <strong>LNNVL</strong> 함수 활용.</li>
</ul>
<h3 id="t-106">5.2.2 Exists 활용 (p.346)</h3>
<ul>
<li>중복 레코드를 제거하려고 <strong>DISTINCT</strong>를 쓰는 경우, 대부분 전체 데이터를 읽은 후 Sort Unique / Hash Unique.</li>
<li><strong>EXISTS 서브쿼리</strong>는 데이터 존재 여부만 확인 → 조건에 맞는 첫 레코드를 찾으면 멈춤 → <strong>부분범위 처리 가능 + 소트 없음</strong>.</li>
</ul>
<pre><code class="language-sql">-- ✗ 
SELECT DISTINCT p.상품번호, p.상품명 ...
FROM 상품 p, 계약 c WHERE ... AND c.상품번호 = p.상품번호;
-- ✓
SELECT p.상품번호, p.상품명 ... FROM 상품 p
WHERE ... AND EXISTS (SELECT 'x' FROM 계약 c WHERE c.상품번호 = p.상품번호 AND ...);
</code></pre>
<ul>
<li>💡 <strong>상품 수는 적고 계약 건수는 많을수록</strong> 효과가 커요(DISTINCT는 많은 계약을 다 읽어야 하지만 EXISTS는 상품마다 하나만 찾으면 되므로).</li>
<li><strong>MINUS → NOT EXISTS</strong> 로 바꾸는 것도 같은 원리.</li>
</ul>
<h3 id="t-107">5.2.3 조인 방식 변경 (p.348)</h3>
<ul>
<li>인덱스로 소트 생략이 가능한 상황인데 <strong>해시 조인</strong>을 하면 Build Input이 바뀌거나 결과 순서가 보장되지 않아 <strong>SORT ORDER BY</strong> 발생.</li>
<li><strong>NL 조인</strong>으로 바꾸면(정렬 기준 테이블을 드라이빙, 인덱스로 정렬 순서대로 읽음) 소트 연산 생략 가능.</li>
<li>조건(예: 지점ID)을 만족하는 데이터가 많고 <strong>부분범위 처리</strong>가 가능한 상황에서 효과가 커요.</li>
<li>⚠️ 정렬 기준이 <strong>조인 키 컬럼</strong>이면 소트 머지 조인도 Sort Order By를 생략할 수 있어요.</li>
</ul>
<pre><code class="language-sql">SELECT /*+ LEADING(c) USE_NL(a) */ ...   -- 계약_X01 [지점ID + 계약일시]로 정렬 순서대로
FROM 계약 c, 상품 a WHERE c.지점ID = :brch_id AND a.상품코드 = c.상품코드
ORDER BY c.계약일시 DESC;
</code></pre>
<h2 id="t-108">5.3 인덱스를 이용한 소트 연산 생략 (p.350)</h2>
<h3 id="t-109">5.3.1 Sort Order By 생략 (p.350) ⭐</h3>
<ul>
<li>인덱스 선두 컬럼을 <code>[종목코드 + 거래일시]</code>로 구성하면, <code>WHERE 종목코드 = 'KR123456' ORDER BY 거래일시</code> 에서 <strong>소트 연산 생략</strong> → 실행계획에 SORT ORDER BY 없음.</li>
<li>소트가 생략되면 조건을 만족하는 레코드를 <strong>전부 읽지 않고도 바로 결과 집합 출력</strong> → <strong>부분범위 처리</strong> 가능.</li>
<li>💡 3-Tier 환경에서는 <strong>Top N 쿼리</strong>로 부분범위 처리를 구현(5.3.2).</li>
</ul>
<h3 id="t-110">5.3.2 Top N 쿼리 (p.352) ⭐</h3>
<ul>
<li>전체 결과 중 <strong>상위 N개</strong>만 출력하는 쿼리.</li>
</ul>
<pre><code class="language-sql">-- 오라클: 인라인 뷰로 정렬 후 ROWNUM
SELECT * FROM (
  SELECT 거래일시, 체결건수, 체결수량, 거래대금
  FROM 종목거래 WHERE 종목코드 = 'KR123456' AND 거래일시 &gt;= '20180304'
  ORDER BY 거래일시
) WHERE ROWNUM &lt;= 10;
-- 12c~ Row Limiting 절
... ORDER BY 거래일시 FETCH FIRST 10 ROWS ONLY;
</code></pre>
<ul>
<li>인덱스로 소트를 생략하면 실행계획에 <strong><code>COUNT (STOPKEY)</code></strong> → ROWNUM으로 지정한 건수만큼 읽으면 <strong>바로 멈춤</strong> = <strong>Top N Stopkey 알고리즘</strong>.</li>
<li><strong>페이징 처리</strong> (색인 p.354) ⭐: 3-Tier 환경에서 대량 결과 집합을 조회할 때 페이징 처리 활용.</li>
</ul>
<pre><code class="language-sql">SELECT * FROM (
  SELECT ROWNUM NO, a.* FROM (
    /* SQL Body: 정렬된 결과 */
    SELECT ... FROM 종목거래 WHERE 종목코드 = 'KR123456' ORDER BY 거래일시
  ) a WHERE ROWNUM &lt;= (:page * 10)      -- ← 여기서 STOPKEY
) WHERE NO &gt;= (:page - 1) * 10 + 1;
</code></pre>
<ul>
<li>체크 포인트: ① 부분범위 처리 가능하도록 SQL 작성(인덱스로 소트 생략 가능하게) ② <strong>작성한 SQL 문을 Top N 쿼리 형태로</strong>(표준 페이징 패턴의 SQL Body 자리에 넣기) ③ ROWNUM 조건은 <strong>안쪽</strong>에.</li>
<li>💡 뒤쪽 페이지로 갈수록 읽는 양이 늘어나는 단점이 있지만, 사용자는 대부분 앞쪽 몇 페이지만 보므로 보통 문제되지 않아요.</li>
<li>⚠️ <strong>페이징 처리 ANTI 패턴</strong>: <code>WHERE NO BETWEEN (:page-1)*10+1 AND :page*10</code> 처럼 ROWNUM 조건을 <strong>바깥쪽 한 번에</strong> 쓰면 STOPKEY가 작동하지 않아 전체를 읽어요. (ORDER BY 없이 ROWNUM을 쓰면 정렬 전에 잘려서 틀린 결과도 나와요.)</li>
<li><strong>부분범위 처리 가능하도록 SQL 수정</strong> ⭐</li>
<li>조건절이 <strong>인덱스를 사용</strong>할 수 있게 작성(컬럼 가공, OR 조건 등 제거)</li>
<li>조인은 <strong>NL 조인 위주</strong>로(룩업용 작은 테이블은 해시 조인 Build Input으로 써도 됨)</li>
<li>ORDER BY가 있어도 <strong>소트를 생략할 수 있게</strong> 인덱스 구성</li>
<li>토드·오렌지 같은 쿼리 툴에서 실제로 부분범위 처리가 되는지(첫 화면이 바로 뜨는지) 테스트</li>
<li>소트 생략이 깨지면 Stopkey가 있어도 의미가 없어요. 예: <code>ORDER BY</code> 컬럼이 인덱스와 다르면 COUNT STOPKEY가 있어도 SORT ORDER BY STOPKEY가 되어 전체를 읽어요.</li>
<li><strong>Row Limiting 절</strong>(12c, 색인 p.353·373): <code>OFFSET n ROWS FETCH NEXT m ROWS ONLY</code>. 내부적으로 ROW_NUMBER로 변환되어 Window Sort Pushed Rank 형태로 처리.</li>
</ul>
<h3 id="t-111">5.3.3 최소값/최대값 구하기 (p.360) ⭐</h3>
<ul>
<li>MIN/MAX를 구할 때도 보통 전체 데이터를 읽어 Sort Aggregate 하지만, <strong>인덱스를 이용</strong>하면 정렬 없이 <strong>첫 번째/마지막 한 건만</strong> 읽고 멈춤(오라클 8i부터).</li>
<li>실행계획: <code>FIRST ROW</code> + <code>INDEX RANGE SCAN (MIN/MAX)</code> → <strong>First Row Stopkey 알고리즘</strong>.</li>
<li>조건: <strong>조건절 컬럼과 MIN/MAX 함수 인자 컬럼이 모두 인덱스에 포함</strong>, 테이블 액세스 X.</li>
<li>인덱스 <code>[DEPTNO + MGR + SAL]</code>, <code>WHERE DEPTNO = 30 AND MGR = 7698</code> → <code>MAX(SAL)</code> 하나만 읽음 ✓</li>
<li>인덱스 <code>[DEPTNO + SAL + MGR]</code> → 범위 내에서 MGR 필터가 필요해 조건을 만족하는 첫 레코드에서 멈춤 ✓(일부 스캔)</li>
<li>인덱스 <code>[SAL + DEPTNO + MGR]</code> → Index Full Scan 하다가 첫 매치에서 멈춤</li>
<li>조건절 컬럼이 인덱스에 없으면 → 전체 스캔 후 Sort Aggregate ✗</li>
<li><strong>Top N 쿼리 이용해 최소/최대값 구하기</strong>: <code>ROWNUM &lt;= 1</code> + 인덱스 정렬 → 조건 컬럼이 인덱스에 없어도 <strong>조건을 만족하는 레코드 하나 찾으면 바로 멈춤</strong>. 인라인 뷰를 써서 쿼리가 조금 복잡하지만 성능 측면에서 MIN/MAX 쿼리보다 유리할 수 있어요.</li>
</ul>
<pre><code class="language-sql">SELECT * FROM (
  SELECT SAL FROM EMP WHERE DEPTNO = 30 AND MGR = 7698 ORDER BY SAL DESC
) WHERE ROWNUM &lt;= 1;
</code></pre>
<h3 id="t-112">5.3.4 이력 조회 (p.366) ⭐</h3>
<ul>
<li>일반 테이블에서 <strong>각 대상의 최종 이력</strong>을 조회할 때 서브쿼리로 MAX(변경일자)를 구하는 패턴.</li>
<li><strong>가장 단순한 이력 조회</strong>: 스칼라 서브쿼리 안에서 <code>SELECT MAX(변경일자)</code> + 인덱스 <code>[장비번호 + 변경일자]</code> → First Row Stopkey ✓</li>
<li><strong>점점 복잡해지는 이력 조회</strong>: <code>SUBSTR(MAX(변경일자 || 변경순번), 9)</code> 처럼 <strong>컬럼을 가공</strong>하면 First Row Stopkey 불가 → 전체 이력 스캔.</li>
<li><strong>INDEX_DESC 힌트 활용</strong>: <code>SELECT /*+ INDEX_DESC(x 상태변경이력_PK) */ ... WHERE ROWNUM &lt;= 1</code> → 인덱스 역순으로 한 건만. ⚠️ 인덱스 구성이 바뀌면 결과가 틀려질 위험 → 대안으로 <strong>Top N 쿼리</strong>(인라인 뷰 + ORDER BY ... DESC + ROWNUM &lt;= 1). 11g까지 스칼라 서브쿼리 안의 인라인 뷰에서 메인쿼리 컬럼 참조 불가 → 12c부터 가능.</li>
<li><strong>윈도우 함수와 Row Limiting 절</strong>: 전체 이력을 조회할 때는 <code>ROW_NUMBER() OVER(PARTITION BY 장비번호 ORDER BY 변경일자 DESC, 변경순번 DESC)</code> 또는 <code>MAX(...) OVER()</code> → <strong>장비 전체</strong>를 대상으로 할 땐 인덱스 Stopkey보다 Full Scan + 윈도우 함수가 유리.</li>
<li><strong>상황에 따라 달라지는 이력 조회 패턴</strong>: 전체 이력 조회 vs 일부 장비만 조회에 따라 최적 패턴이 달라요.</li>
<li><strong>선분이력 맛보기</strong>: 이력 테이블에 <code>유효시작일자, 유효종료일자</code>를 두면 <code>WHERE :dt BETWEEN 유효시작일자 AND 유효종료일자</code> 처럼 간단히 특정 시점 이력 조회 가능.</li>
</ul>
<h3 id="t-113">5.3.5 Sort Group By 생략 (p.379)</h3>
<ul>
<li>인덱스를 이용해 소트 연산을 생략할 수 있듯이, <strong>그룹핑 연산도 생략</strong> 가능.</li>
<li>예: 인덱스 <code>[region]</code>, <code>SELECT region, AVG(age), COUNT(*) FROM customer GROUP BY region</code> → 인덱스를 차례로 읽으며 그룹별로 집계 → 실행계획 <strong><code>SORT GROUP BY NOSORT</code></strong>.</li>
<li>부분범위 처리 가능(그룹 하나가 끝나면 바로 출력).</li>
</ul>
<h2 id="t-114">5.4 Sort Area를 적게 사용하도록 SQL 작성 (p.381)</h2>
<h3 id="t-115">5.4.1 소트 데이터 줄이기 (p.381)</h3>
<pre><code class="language-sql">-- ① 가공한 결과 집합을 정렬 (가공된 긴 문자열이 소트 대상) ✗
SELECT LPAD(상품번호, 30) || LPAD(상품명, 30) || ... FROM 예수금원장 ORDER BY 상품번호;
-- ② 정렬 후 가공 → Sort Area에는 가공 전 데이터만 ✓
SELECT LPAD(상품번호, 30) || LPAD(상품명, 30) || ...
FROM (SELECT 상품번호, 상품명, ... FROM 예수금원장 ORDER BY 상품번호);
</code></pre>
<ul>
<li><strong>SELECT-LIST에 필요한 컬럼만</strong>: <code>SELECT *</code> 로 모든 컬럼을 정렬하면 Sort Area를 많이 써요. 필요한 컬럼만 지정. 같은 테이블을 똑같이 Full Scan해도 정렬 대상 컬럼을 줄이면 소트 데이터량이 수십 배까지 줄 수 있어요.</li>
</ul>
<h3 id="t-116">5.4.2 Top N 쿼리의 소트 부하 경감 원리 (p.383) ⭐</h3>
<ul>
<li>인덱스로 소트를 생략할 수 없을 때도 Top N 쿼리는 <strong>Top N 소트 알고리즘</strong>으로 소트 부하를 줄여요.</li>
<li>원리: 상위 N개를 담을 <strong>N 크기의 배열</strong>만 유지하면서, 새 값이 배열 최대값보다 작을 때만 교체 → 전체를 정렬할 필요 없음.</li>
<li>실행계획: <code>SORT ORDER BY STOPKEY</code>. 트레이스의 <strong><code>sorts (memory)</code></strong>, physical read(Temp) 등이 매우 적게 나와요.</li>
</ul>
<h3 id="t-117">5.4.3 Top N 쿼리가 아닐 때 발생하는 소트 부하 (p.386)</h3>
<ul>
<li>앞의 페이징 ANTI 패턴처럼 ROWNUM 조건을 빼면 → 전체를 정렬하는 일반 SORT ORDER BY → Sort Area 부족 시 <strong>디스크 소트</strong>(physical read/write Temp, <code>sorts (disk)</code>).</li>
<li>파라미터 <code>sort_area_size</code>(수동 PGA 관리 시) 를 줄여 놓고 비교해 보면 차이가 확실해요.</li>
</ul>
<h3 id="t-118">5.4.4 분석함수에서의 Top N 소트 (p.387)</h3>
<ul>
<li><strong>윈도우 함수</strong> 중 <code>RANK</code>, <code>ROW_NUMBER</code> 는 Top N 소트 알고리즘이 작동 → <code>MAX</code> 등 다른 윈도우 함수보다 소트 부하가 적어요.</li>
<li>실행계획: <code>WINDOW SORT PUSHED RANK</code>.</li>
</ul>
<pre><code class="language-sql">-- MAX 윈도우 함수: 전체 정렬 (WINDOW SORT) → 디스크 소트 가능
SELECT ... FROM (SELECT 장비번호, 변경일자, MAX(변경일자) OVER (PARTITION BY 장비번호) 최종변경일자 ...)
WHERE 변경일자 = 최종변경일자;
-- RANK 윈도우 함수: Top N 소트 (WINDOW SORT PUSHED RANK) ✓
SELECT ... FROM (SELECT ..., RANK() OVER (PARTITION BY 장비번호 ORDER BY 변경일자 DESC) RNUM ...)
WHERE RNUM = 1;
</code></pre>
<h1 id="t-ch-6">6장. DML 튜닝</h1>
<h2 id="t-119">6.1 기본 DML 튜닝 (p.393)</h2>
<h3 id="t-120">6.1.1 DML 성능에 영향을 미치는 요소 (p.393) ⭐</h3>
<div class="tw"><table>
<thead>
<tr>
<th>요소</th>
<th>영향</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>인덱스</strong></td>
<td>테이블에 레코드 입력 시 <strong>인덱스에도 입력</strong>. 테이블은 Freelist로 빈 블록을 받지만 인덱스는 정렬 구조라 <strong>수직적 탐색</strong>으로 입력할 블록을 찾아야 해서 더 무거움. UPDATE는 인덱스 <strong>삭제 + 삽입</strong> 2개 오퍼레이션. 인덱스 개수가 DML 성능에 큰 영향 → 핵심 트랜잭션 테이블은 인덱스 하나라도 줄이기</td>
</tr>
<tr>
<td><strong>무결성 제약</strong></td>
<td>PK·FK·Check·Not Null. PK·FK가 성능 영향 큼(체크하려면 인덱스·참조 테이블 확인)</td>
</tr>
<tr>
<td><strong>조건절</strong></td>
<td>UPDATE/DELETE 대상을 찾는 과정은 SELECT와 같음 → 인덱스 튜닝 원리 그대로</td>
</tr>
<tr>
<td><strong>서브쿼리</strong></td>
<td>조건절 서브쿼리도 SELECT와 같은 원리(Unnesting 등)</td>
</tr>
<tr>
<td><strong>Redo 로깅</strong></td>
<td>데이터파일·컨트롤 파일 변경사항을 Redo 로그에 기록</td>
</tr>
<tr>
<td><strong>Undo 로깅</strong></td>
<td>변경 전 데이터를 Undo에 기록</td>
</tr>
<tr>
<td><strong>Lock</strong></td>
<td>필요 이상으로 자주·길게·높은 레벨로 쓰면 DML이 느려지고, 너무 적게·짧게 쓰면 데이터 품질이 나빠짐 → 세심한 동시성 제어 필요</td>
</tr>
<tr>
<td><strong>커밋</strong></td>
<td>Fast Commit 덕분에 빠르지만, 커밋마다 Redo 로그 버퍼를 디스크에 기록(LGWR)하는 <strong>Sync 방식</strong>이라 가볍지 않음</td>
</tr>
</tbody>
</table>
</div>
<p><strong>Redo 로깅</strong> (색인 p.399~400)</p>
<ul>
<li>데이터파일·컨트롤 파일에 가해지는 <strong>모든 변경사항</strong>을 기록. 목적:</li>
<li><strong>Database Recovery</strong>: 미디어 Fail 시 백업 + Redo로 복구</li>
<li><strong>Cache Recovery</strong>(Instance Recovery): 인스턴스 비정상 종료 시 버퍼캐시 변경분 복구(Roll Forward)</li>
<li><strong>Fast Commit</strong>: 변경된 블록을 바로 데이터파일에 쓰지 않고 <strong>Redo 로그에 Append</strong> 방식으로 빠르게 기록 후 커밋 완료.</li>
</ul>
<p><strong>Undo 로깅</strong> (색인 p.401)</p>
<ul>
<li>변경 전 데이터 보관. 용도:</li>
<li><strong>Transaction Rollback</strong></li>
<li><strong>Transaction Recovery</strong>(Cache Recovery 후 커밋 안 된 트랜잭션 롤백)</li>
<li><strong>Read Consistency</strong>(읽기 일관성)</li>
<li><strong>MVCC 모델</strong>(Multi-Version Concurrency Control, 색인 p.401~403)</li>
<li><strong>Current 모드</strong>: 디스크에서 캐시로 적재된 원본 블록을 <strong>현재 상태 그대로</strong> 읽음.</li>
<li><strong>Consistent 모드</strong>: 쿼리가 시작된 시점 이후 변경된 블록을 만나면 원본 블록으로부터 <strong>복사본(CR Copy)</strong> 을 만들고 Undo로 되돌려 <strong>쿼리 시작 시점의 일관된 상태</strong>로 읽음.</li>
<li>기준: <strong>SCN</strong>(System Commit Number) — 쿼리 시작 시점의 SCN과 블록 SCN 비교.</li>
<li>SELECT는 Consistent 모드, DML은 대상 찾을 땐 Consistent 모드 → 변경할 땐 Current 모드.</li>
</ul>
<p><strong>Lock / 커밋</strong></p>
<ul>
<li>커밋은 <strong>LGWR</strong>이 Redo 로그 버퍼를 디스크에 기록할 때까지 대기 → <strong>너무 잦은 커밋은 성능 저하</strong>, 너무 안 하면 Undo 공간 부족·Lock 장기 보유.</li>
<li>💡 Undo 로깅은 생략할 수 없지만, <strong>INSERT</strong>는 Redo 로깅을 생략할 수 있는 방법이 있어요(NOLOGGING + Direct Path Insert). UPDATE/DELETE는 Redo 생략 불가.</li>
<li>💡 커밋 내부 과정: DB 버퍼캐시 → (DBWR, 나중에 모아서) 데이터파일, Redo 로그버퍼 → (LGWR, 커밋 시) Redo 로그파일.</li>
</ul>
<h3 id="t-121">6.1.2 데이터베이스 Call과 성능 (p.408) ⭐</h3>
<ul>
<li>SQL 실행 단계별 Call: <strong>Parse Call</strong>(파싱·최적화), <strong>Execute Call</strong>(실행), <strong>Fetch Call</strong>(SELECT 결과 전송).</li>
<li>Call 발생 위치에 따라</li>
<li><strong>User Call</strong>: 네트워크를 경유해 DBMS <strong>외부</strong>에서 인입(WAS·클라이언트 → DB).</li>
<li><strong>Recursive Call</strong>: DBMS <strong>내부</strong>에서 발생(SQL 파싱 중 딕셔너리 조회, PL/SQL 함수·프로시저 내 SQL).</li>
<li><strong>절차적 루프 처리</strong>: 자바에서 100만 건을 루프 돌며 한 건씩 INSERT → User Call 100만 번 → 매우 느림. PL/SQL로 해도 Recursive Call 100만 번.</li>
<li>⭐ <strong>One SQL의 중요성</strong>: 업무 로직이 복잡하면 여러 SQL을 루프로 처리하기 쉽지만, 가능하면 <strong>INSERT INTO SELECT</strong>, <strong>수정가능 조인 뷰</strong>, <strong>MERGE</strong> 등으로 <strong>하나의 SQL</strong>로 구현 → Call 감소.</li>
</ul>
<h3 id="t-122">6.1.3 Array Processing 활용 (p.414)</h3>
<ul>
<li><strong>Array Processing</strong>: 한 번의 SQL(INSERT/UPDATE/DELETE) Call로 <strong>여러 레코드를 처리</strong>. Call 횟수 감소.</li>
<li>PL/SQL: <code>BULK COLLECT</code>, <code>FORALL</code>. Java JDBC: <code>addBatch()</code> + <code>executeBatch()</code>.</li>
</ul>
<pre><code class="language-sql">FORALL i IN 1..l_arr.COUNT
  INSERT INTO 월요금납부실적 VALUES l_arr(i);
</code></pre>
<ul>
<li>💡 One SQL로 구현하기 어려운 복잡한 로직에서 차선책.</li>
</ul>
<h3 id="t-123">6.1.4 인덱스 및 제약 해제를 통한 대량 DML 튜닝 (p.418)</h3>
<ul>
<li>대량 INSERT/UPDATE 때는 인덱스·무결성 제약 체크 부담이 큼 → <strong>배치 작업 중에는 인덱스·제약을 해제</strong>했다가 끝난 후 재생성.</li>
<li>⚠️ <strong>온라인 트랜잭션 시스템에서는 불가</strong>. 동시 트랜잭션이 없는 대량 적재 배치에서만 써요.</li>
<li><strong>PK 제약과 인덱스 해제 1 – PK 제약에 Unique 인덱스를 사용한 경우</strong>: PK 제약을 <code>DISABLE ... DROP INDEX</code>로 끄고(인덱스도 함께 삭제) 다른 인덱스는 <code>UNUSABLE</code> 상태로 → 입력 후 PK <code>ENABLE</code>, 인덱스 <code>REBUILD</code>.</li>
<li><strong>PK 제약과 인덱스 해제 2 – PK 제약에 Non-Unique 인덱스를 사용한 경우</strong>: PK를 Non-Unique 인덱스로 만들어 두면 PK 제약만 <code>DISABLE</code>하고 인덱스는 <code>UNUSABLE</code> → 나중에 REBUILD 후 ENABLE NOVALIDATE 가능.</li>
<li>파라미터 <strong><code>skip_unusable_indexes</code></strong>(기본 TRUE): Unusable 인덱스를 무시하고 DML 진행. ⚠️ Unique 인덱스는 Unusable 상태에서 입력 불가.</li>
</ul>
<pre><code class="language-sql">ALTER TABLE target MODIFY CONSTRAINT target_pk DISABLE DROP INDEX;
ALTER INDEX target_x1 UNUSABLE;
INSERT /*+ APPEND */ INTO target SELECT * FROM source;
ALTER TABLE target MODIFY CONSTRAINT target_pk ENABLE NOVALIDATE;
ALTER INDEX target_x1 REBUILD;
</code></pre>
<h3 id="t-124">6.1.5 수정가능 조인 뷰 (p.422) ⭐</h3>
<ul>
<li>다른 테이블 값으로 UPDATE할 때 전통 방식은 <strong>같은 서브쿼리를 SET 절과 WHERE 절에 반복</strong> → 비효율.</li>
</ul>
<pre><code class="language-sql">-- ✗ 전통적인 방식: 고객 테이블을 두 번 이상 읽음
UPDATE 고객 c SET 최종거래일시 = (SELECT MAX(거래일시) FROM 거래 WHERE 고객번호 = c.고객번호 ...)
WHERE EXISTS (SELECT 'x' FROM 거래 WHERE 고객번호 = c.고객번호 ...);
-- ✓ 수정가능 조인 뷰
UPDATE (SELECT /*+ ORDERED USE_HASH(c) */ c.최종거래일시, t.거래일시
        FROM (SELECT 고객번호, MAX(거래일시) 거래일시 FROM 거래 ... GROUP BY 고객번호) t, 고객 c
        WHERE c.고객번호 = t.고객번호)
SET 최종거래일시 = 거래일시;
</code></pre>
<ul>
<li><strong>조인 뷰</strong>: FROM 절에 두 개 이상 테이블을 가진 뷰. <strong>수정가능 조인 뷰</strong>(Updatable/Modifiable Join View): 입력·수정·삭제가 허용되는 조인 뷰.</li>
<li>⭐ <strong>키 보존 테이블(Key-Preserved Table)</strong>: 조인된 결과 집합을 통해서도 <strong>중복 없이 Unique하게 식별 가능한</strong> 테이블(1쪽 집합과 조인되는 M쪽 테이블). 쉽게 말해 <strong>뷰에 ROWID를 제공하는 테이블</strong>. <strong>키 보존 테이블의 컬럼만 수정 가능</strong>.</li>
<li>1쪽 테이블에 <strong>Unique 인덱스(PK)</strong> 가 있어야 옵티마이저가 키 보존을 인식. 없으면 <strong>ORA-01779</strong>(키 보존 테이블이 아닌 테이블로 매핑된 열을 수정할 수 없음).</li>
<li><strong>비 키-보존 테이블</strong>(Non Key-Preserved Table): 키 보존 테이블이 아닌 쪽.</li>
<li><strong>ORA-01779 회피</strong>: 10g까지 <code>BYPASS_UJVC</code> 힌트(11g부터 사용 불가) → 11g~ <strong>MERGE 문</strong>으로 바꾸기.</li>
<li>💡 12c부터 GROUP BY 한 집합과 조인하면(위 예시처럼) 그 결과가 Unique하므로 수정 가능.</li>
</ul>
<h3 id="t-125">6.1.6 MERGE 문 활용 (p.430) ⭐</h3>
<ul>
<li>DW에서 기간계 시스템(Source)의 변경분을 타겟(Target)에 반영해 동기화할 때 써요(오라클 9i~).</li>
<li>원리: Source를 기준으로 Target과 <strong>Left Outer 조인</strong>해서 조인에 성공하면 UPDATE, 실패하면 INSERT → 그래서 <strong>UPSERT</strong>라고도 해요.</li>
</ul>
<pre><code class="language-sql">MERGE INTO customer t USING customer_delta s ON (t.cust_id = s.cust_id)
WHEN MATCHED THEN UPDATE
  SET t.cust_nm = s.cust_nm, t.email = s.email, ...
WHEN NOT MATCHED THEN INSERT
  (cust_id, cust_nm, email, ...) VALUES (s.cust_id, s.cust_nm, s.email, ...);
</code></pre>
<ul>
<li><strong>Optional Clauses</strong>(10g~): UPDATE와 INSERT를 <strong>선택적으로</strong> 처리 가능 → 수정가능 조인 뷰 대신 MERGE로 UPDATE만 할 수 있어 ORA-01779 회피.</li>
<li><strong>Conditional Operations</strong>: <code>WHEN MATCHED THEN UPDATE SET ... WHERE 조건</code>, <code>WHEN NOT MATCHED THEN INSERT ... WHERE 조건</code>.</li>
<li><strong>DELETE Clause</strong>: <code>WHEN MATCHED THEN UPDATE ... DELETE WHERE 조건</code> → ⚠️ <strong>UPDATE 된 결과</strong>를 기준으로 삭제 판단, 조인에 성공한 데이터만 삭제 가능.</li>
<li><strong>Merge Into 활용</strong>: SELECT 해서 있으면 UPDATE, 없으면 INSERT 하는 로직을 MERGE 하나로 → Call·읽기 횟수 감소.</li>
</ul>
<h2 id="t-126">6.2 Direct Path I/O 활용 (p.436)</h2>
<h3 id="t-127">6.2.1 Direct Path I/O (p.436) ⭐</h3>
<ul>
<li>일반 블록 I/O는 <strong>DB 버퍼캐시를 경유</strong>(Conventional Path). 재사용 가능성이 없는 대량 데이터를 버퍼캐시로 읽으면 오히려 비효율.</li>
<li><strong>Direct Path I/O</strong>: 버퍼캐시를 경유하지 않고 곧바로 데이터 블록을 읽고 씀. 작동하는 경우:</li>
<li>병렬 쿼리로 Full Scan 수행</li>
<li>병렬 DML 수행</li>
<li><strong>Direct Path Insert</strong> 수행</li>
<li>Temp 세그먼트 블록들을 읽고 쓸 때</li>
<li>direct 옵션을 지정하고 export 수행</li>
<li>nocache 옵션을 지정한 LOB 컬럼을 읽을 때</li>
<li>💡 병렬 쿼리: <code>/*+ FULL(t) PARALLEL(t 4) */</code>, <code>/*+ INDEX_FFS(t t_idx) PARALLEL_INDEX(t t_idx 4) */</code>.</li>
</ul>
<h3 id="t-128">6.2.2 Direct Path Insert (p.438) ⭐</h3>
<ul>
<li>일반 INSERT가 느린 이유: <strong>Freelist</strong> 조회(빈 블록 찾기) → 버퍼캐시에서 블록 찾고 없으면 디스크에서 읽기 → 블록에 입력 → <strong>Undo·Redo</strong> 생성.</li>
<li><strong>Direct Path Insert</strong>: </li>
<li>Freelist를 참조하지 않고 <strong>HWM(High-Water Mark) 바깥 영역</strong>에 데이터를 순차적으로 입력</li>
<li>블록을 버퍼캐시에서 탐색하지 않음, 버퍼캐시에 적재하지 않고 <strong>데이터파일에 직접 기록</strong></li>
<li><strong>Undo 로깅 안 함</strong>, Redo 로깅도 안 하게 할 수 있음(<code>ALTER TABLE t NOLOGGING</code>)</li>
<li>방법</li>
</ul>
<div class="tw"><table>
<thead>
<tr>
<th>방법</th>
<th>비고</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>INSERT /*+ APPEND */ INTO ... SELECT</code></td>
<td></td>
</tr>
<tr>
<td><code>INSERT /*+ APPEND_VALUES */ INTO ... VALUES</code></td>
<td>11gR2~ (Array Processing과 함께)</td>
</tr>
<tr>
<td>병렬 모드 INSERT</td>
<td></td>
</tr>
<tr>
<td><code>CREATE TABLE ... AS SELECT</code></td>
<td></td>
</tr>
<tr>
<td>SQL*Loader direct 옵션</td>
<td></td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>⚠️ 주의</li>
<li><strong>Exclusive 모드 TM Lock</strong> → 다른 트랜잭션이 해당 테이블에 DML 불가(커밋 전까지). 트랜잭션이 빈번한 주간에 쓰면 안 됨.</li>
<li><strong>Freelist를 조회하지 않고 HWM 바깥에 입력</strong> → DELETE로 생긴 빈 공간을 재활용 못 함 → 과거 데이터를 DELETE만 하고 APPEND로 입력하면 테이블 크기가 계속 커짐 → Range 파티션이면 <strong>파티션 DROP</strong>으로 지우고, 비파티션 테이블은 주기적으로 <strong>Reorg</strong>.</li>
<li>NOLOGGING으로 입력한 데이터는 <strong>장애 시 복구 불가</strong> → 입력 후 바로 백업하거나, 언제든 다시 만들 수 있는 데이터에만 사용.</li>
<li>💡 일반(Conventional) INSERT는 Redo 로깅을 생략할 방법이 없어요.</li>
</ul>
<h3 id="t-129">6.2.3 병렬 DML (p.441)</h3>
<ul>
<li>INSERT는 APPEND 힌트로 Direct Path Write가 되지만, <strong>UPDATE·DELETE는 기본적으로 Direct Path Write 불가</strong> → <strong>병렬 DML이 유일한 방법</strong>이에요(오라클은 병렬 DML에 항상 Direct Path Write 사용).</li>
<li>병렬 INSERT는 APPEND 힌트 없이도 Direct Path Insert로 동작하지만, 병렬 DML이 안 될 때를 대비해 <strong>APPEND를 함께</strong> 쓰는 게 좋아요.</li>
<li>병렬 DML 활성화 필수: <code>ALTER SESSION ENABLE PARALLEL DML;</code> (12c~ <code>/*+ ENABLE_PARALLEL_DML */</code> 힌트).</li>
</ul>
<pre><code class="language-sql">ALTER SESSION ENABLE PARALLEL DML;
INSERT /*+ PARALLEL(c 4) */ INTO 고객 c SELECT /*+ FULL(o) PARALLEL(o 4) */ * FROM 외부가입고객 o;
UPDATE /*+ FULL(c) PARALLEL(c 4) */ 고객 c SET 고객상태코드 = 'WD' WHERE ...;
</code></pre>
<ul>
<li>⚠️ 병렬 DML도 <strong>Exclusive 모드 TM Lock</strong>. 병렬 DML 활성화를 안 하면 대상 레코드 찾는 것만 병렬, 변경은 QC가 혼자 처리.</li>
<li><strong>QC</strong>(Query Coordinator, 색인 p.442): 병렬 SQL을 실행한 세션(최초 서버 프로세스). 실행계획에서 <code>PX COORDINATOR</code> 아래에 DML 오퍼레이션(UPDATE, INSERT)이 있으면 병렬 처리된 것, <strong>위</strong>에 있으면 QC가 혼자 처리한 것.</li>
</ul>
<h2 id="t-130">6.3 파티션을 활용한 DML 튜닝 (p.444)</h2>
<h3 id="t-131">6.3.1 테이블 파티션 (p.444) ⭐</h3>
<ul>
<li><strong>파티셔닝</strong>: 테이블·인덱스 데이터를 특정 컬럼 값에 따라 <strong>별도 세그먼트에 나누어 저장</strong>.</li>
<li>효과: 관리적 측면(파티션 단위 백업·추가·삭제·변경 → 가용성↑), 성능 측면(<strong>파티션 Pruning</strong>으로 필요한 파티션만 읽음, 경합·부하 분산).</li>
</ul>
<div class="tw"><table>
<thead>
<tr>
<th>종류</th>
<th>기준</th>
<th>예</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Range 파티션</strong>(8~)</td>
<td>값의 <strong>범위</strong>. 주로 날짜 컬럼. <code>MAXVALUE</code> 파티션으로 나머지 값 수용</td>
<td>주문일자 기준 월·분기별</td>
</tr>
<tr>
<td><strong>해시 파티션</strong>(8i~)</td>
<td>해시 함수 결과. 사용자는 <strong>개수만</strong> 정하고 분산은 오라클이 결정. 변별력 높고 분포가 고른 컬럼에 적합. <strong>= / IN-List 조건일 때만 Pruning</strong></td>
<td>고객ID로 균등 분산</td>
</tr>
<tr>
<td><strong>리스트 파티션</strong>(9i~)</td>
<td>사용자가 정한 <strong>값 목록(그룹)</strong>. 값의 순서와 무관. <code>DEFAULT</code> 파티션으로 기타 값 수용. 파티션별 데이터가 고르게 나뉘도록</td>
<td>지역(서울/경기/…)</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li><strong>파티션 Pruning</strong>(색인 p.446): SQL 조건절을 분석해 <strong>읽지 않아도 되는 파티션 세그먼트를 액세스 대상에서 제외</strong>.</li>
<li><strong>정적 Pruning</strong>: 상수 조건 → 컴파일 시점에 결정.</li>
<li><strong>동적 Pruning</strong>: 바인드 변수 → 실행 시점에 결정 (실행계획 Pstart/Pstop에 KEY).</li>
<li>💡 파티션 + Full Scan은 “인덱스보다 빠른 Full Scan” 을 가능하게 해요(대용량 배치의 핵심 무기).</li>
</ul>
<h3 id="t-132">6.3.2 인덱스 파티션 (p.449) ⭐</h3>
<div class="tw"><table>
<thead>
<tr>
<th>구분</th>
<th>설명</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>로컬 파티션 인덱스</strong></td>
<td>테이블 파티션과 <strong>1:1</strong> 대응(테이블과 같은 기준으로 파티셔닝). 파티션 관리 작업 시 인덱스 재생성 불필요 → 관리 편리</td>
</tr>
<tr>
<td><strong>글로벌 파티션 인덱스</strong></td>
<td>테이블과 <strong>다른 기준</strong>으로 파티셔닝. 테이블 파티션 구성 변경(DROP, SPLIT, EXCHANGE) 시 Unusable → 재생성 필요</td>
</tr>
<tr>
<td><strong>비파티션 인덱스</strong>(Global Non-Partitioned)</td>
<td>파티셔닝하지 않은 인덱스. 여러 테이블 파티션 가리킴. 글로벌 파티션 인덱스처럼 관리 부담</td>
</tr>
</tbody>
</table>
</div>
<div class="tw"><table>
<thead>
<tr>
<th>구분</th>
<th>뜻</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Prefixed</strong></td>
<td>인덱스 <strong>파티션 키 컬럼이 인덱스 키 컬럼 왼쪽 선두</strong>에 위치</td>
</tr>
<tr>
<td><strong>Nonprefixed</strong></td>
<td>파티션 키 컬럼이 인덱스 선두가 아니거나 아예 포함되지 않음</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>조합: <strong>로컬 Prefixed</strong>, <strong>로컬 Nonprefixed</strong>, <strong>글로벌 Prefixed</strong>, 비파티션 (<strong>글로벌 파티션 인덱스는 Prefixed만</strong> 지원).</li>
<li>로컬 인덱스는 파티션 ADD·DROP·EXCHANGE 때 재생성이 필요 없어, 피크 시간만 피하면 <strong>무중단</strong> 작업이 가능해요. 글로벌 파티션·비파티션 인덱스는 DROP·EXCHANGE·SPLIT 때 Unusable이 되어 재생성하는 동안 서비스에 영향이 있어요.</li>
<li>⚠️ DBA가 테이블과 인덱스 파티션을 수동으로 똑같이 맞춰도 오라클이 자동 관리하지 않으므로 <strong>로컬이 아니라 글로벌 파티션 인덱스</strong>예요.</li>
<li><strong>중요한 인덱스 파티션 제약</strong> ⭐: <strong>Unique 인덱스를 파티셔닝하려면 파티션 키가 모두 인덱스 구성 컬럼이어야</strong> 해요. (그래야 다른 파티션에 같은 값이 없음을 보장)</li>
<li>그래서 PK 인덱스를 로컬로 만들려면 파티션 키를 PK에 포함해야 하고, 못하면 글로벌/비파티션 인덱스가 되어 파티션 관리가 불편해져요.</li>
</ul>
<h3 id="t-133">6.3.3 파티션을 활용한 대량 UPDATE 튜닝 (p.456)</h3>
<ul>
<li>대량 UPDATE 시 인덱스 유지 부담이 매우 큼. 손익분기점을 넘으면 <strong>인덱스를 Drop 후 재생성</strong>이 빠를 수 있지만 테이블이 크면 재생성도 오래 걸림.</li>
<li><strong>파티션 Exchange를 이용한 대량 데이터 변경</strong> ⭐</li>
<li>임시 테이블을 NOLOGGING 모드로 생성</li>
<li>거래 데이터를 읽어 <strong>변경할 값으로 바꿔 가며</strong> 임시 테이블에 입력(CTAS 또는 APPEND)</li>
<li>임시 테이블에 원본 테이블과 같은 구조로 인덱스 생성(NOLOGGING)</li>
<li><strong><code>ALTER TABLE 거래 EXCHANGE PARTITION p201412 WITH TABLE 거래_t</code></strong> → 파티션과 임시 테이블 <strong>세그먼트 교체</strong>(딕셔너리 정보만 바뀌어 순식간)</li>
<li>임시 테이블 Drop, (NOLOGGING 했다면) LOGGING 모드로 전환</li>
<li>⚠️ 로컬 인덱스여야 해요.</li>
</ul>
<h3 id="t-134">6.3.4 파티션을 활용한 대량 DELETE 튜닝 (p.460)</h3>
<ul>
<li><strong>DELETE가 느린 이유</strong>: 테이블 레코드 삭제 + <strong>Undo·Redo 기록</strong> + 인덱스 레코드 삭제(각 인덱스마다 Undo·Redo), 그리고 버퍼캐시에 블록을 적재해야 함.</li>
<li><strong>파티션 Drop/Truncate</strong>: 삭제 조건이 파티션 키와 일치하고 파티션 전체를 지운다면 → <code>ALTER TABLE ... DROP PARTITION</code> / <code>TRUNCATE PARTITION</code> (11g~ <code>FOR</code> 절 사용 가능). <strong>로컬 인덱스</strong>면 즉시.</li>
<li><strong>파티션 Truncate를 이용한 대량 데이터 삭제</strong>: 일부 레코드만 남기고 삭제할 때 →</li>
<li>남길 데이터만 임시 테이블에 저장</li>
<li>삭제 대상 파티션을 Truncate</li>
<li>임시 테이블에 저장한 데이터를 원본 파티션에 다시 입력(APPEND)</li>
<li>임시 테이블 Drop</li>
<li>서비스 중단 없이 하려면 파티션 Exchange 방식.</li>
<li>💡 <strong>조건절이 파티션 키와 무관하면</strong> 이 방법을 못 써요 → 테이블을 처음 설계할 때 삭제 기준을 고려한 파티셔닝이 중요.</li>
</ul>
<h3 id="t-135">6.3.5 파티션을 활용한 대량 INSERT 튜닝 (p.463)</h3>
<ul>
<li><strong>비파티션 테이블</strong>일 때: 테이블을 NOLOGGING → 인덱스 Unusable → APPEND INSERT → 인덱스 재생성 → LOGGING.</li>
<li><strong>파티션 테이블</strong>일 때: <strong>파티션 단위로</strong> 작업. 해당 파티션을 NOLOGGING → 로컬 인덱스 파티션만 Unusable → APPEND INSERT → 로컬 인덱스 파티션만 <code>REBUILD PARTITION</code> → LOGGING.</li>
<li>⭐ 로컬 파티션이어야 다른 파티션에 영향 없이 일부만 작업 가능.</li>
</ul>
<h2 id="t-136">6.4 Lock과 트랜잭션 동시성 제어 (p.466)</h2>
<h3 id="t-137">6.4.1 오라클 Lock (p.466) ⭐</h3>
<ul>
<li>종류: DML Lock, DDL Lock, 래치, 버퍼 Lock, 라이브러리 캐시 Lock/Pin 등.</li>
<li><strong>DML Lock</strong>: 다중 트랜잭션이 동시에 액세스하는 사용자 데이터의 <strong>무결성 보호</strong>.</li>
<li><strong>DML 로우 Lock</strong>(TX Lock, 색인 p.467): 두 트랜잭션이 <strong>같은 로우를 동시에 변경</strong>하지 못하도록. 로우 Lock은 항상 <strong>배타적 모드</strong>. 단, <strong>MVCC 모델</strong> 덕분에 <strong>SELECT는 Lock 없이</strong> 읽음(변경 중인 로우도 Consistent 모드로 읽음, FOR UPDATE 제외).</li>
<li><strong>DML 테이블 Lock</strong>(<strong>TM Lock</strong>, 색인 p.468): 로우 Lock을 얻기 전에 먼저 걸어서, 변경 중인 테이블 구조를 다른 트랜잭션이 바꾸지 못하게. Lock 모드: RS, RX, S, SRX, X. 💡 테이블 전체의 DML을 막는다는 뜻이 아니라, “이 테이블에서 작업 중”이라는 <strong>푯말</strong>에 가까워요. </li>
<li><strong>Lock 호환성</strong>(색인 p.468): 선행 트랜잭션과 후행 트랜잭션이 동시에 Lock을 걸 수 있는지 정리한 표. 예: DML끼리는 RX 모드끼리 호환 → 다른 로우는 동시에 변경 가능.</li>
<li><strong>대상 리소스가 사용 중일 때</strong>: 기본은 <strong>기다림</strong>. DDL은 <code>ddl_lock_timeout</code>(색인 p.470) 파라미터, SELECT FOR UPDATE는 <code>WAIT n</code> / <code>NOWAIT</code> 로 제어.</li>
</ul>
<div class="tw"><table>
<thead>
<tr>
<th>구분</th>
<th>Lock 범위</th>
<th>예</th>
</tr>
</thead>
<tbody>
<tr>
<td>로우 Lock</td>
<td>로우</td>
<td>같은 로우 UPDATE 동시 실행 → 후행이 대기</td>
</tr>
<tr>
<td>테이블 Lock(TM)</td>
<td>테이블</td>
<td>DML 진행 중 DDL(ALTER, DROP) 불가</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li><strong>Lock을 푸는 열쇠, 커밋</strong></li>
<li><strong>블로킹(Blocking)</strong>: 선행 트랜잭션이 Lock을 걸어 후행이 진행 못하고 <strong>멈춰 있는</strong> 상태 → <strong>커밋/롤백</strong>으로 해소.</li>
<li><strong>교착상태(Deadlock, 색인 p.471)</strong>: 두 트랜잭션이 <strong>서로 상대가 가진 Lock을 기다리며</strong> 진행 못함. 오라클은 먼저 인지한 트랜잭션 쪽 <strong>문장 수준 롤백</strong> + 에러(ORA-00060). ⚠️ 트랜잭션 전체가 아니라 문장만 롤백되므로, 에러를 받은 쪽은 <strong>커밋 또는 롤백을 명시적으로 결정</strong>해야 해요(예외 처리가 없으면 Lock을 쥔 채 남을 수 있음).</li>
<li>커밋 시점 원칙: 불필요하게 트랜잭션을 길게 유지하지 말고, 너무 자주 커밋하지도 말기.</li>
<li><strong>비동기식 커밋</strong>(색인 p.471~472, 10gR2~): <code>COMMIT WRITE NOWAIT</code> / <code>WAIT</code>, <code>BATCH</code> / <code>IMMEDIATE</code>. LGWR이 Redo를 디스크에 기록할 때까지 기다리지 않음 → 빠르지만 장애 시 데이터 손실 가능.</li>
<li><strong>배치 커밋</strong>(색인 p.472): <code>BATCH</code> 옵션 — Redo 로그를 모아서 일괄 기록.</li>
</ul>
<h3 id="t-138">6.4.2 트랜잭션 동시성 제어 (p.472) ⭐</h3>
<ul>
<li><strong>동시성 제어(Concurrency Control)</strong>: 여러 트랜잭션이 동시에 같은 데이터를 갱신할 때 일관성과 무결성 보장.</li>
</ul>
<div class="tw"><table>
<thead>
<tr>
<th>구분</th>
<th>방식</th>
<th>특징</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>비관적 동시성 제어</strong>(Pessimistic)</td>
<td>데이터를 <strong>읽는 시점에 Lock</strong>(<code>SELECT ... FOR UPDATE</code>)</td>
<td>동시성 낮음, 안전</td>
</tr>
<tr>
<td><strong>낙관적 동시성 제어</strong>(Optimistic)</td>
<td>Lock 없이 읽고, <strong>변경 시점에 다른 트랜잭션이 바꿨는지 확인</strong></td>
<td>동시성 높음, 실패 시 재처리</td>
</tr>
</tbody>
</table>
</div>
<pre><code class="language-sql">-- 비관적
SELECT 적립포인트 ... FROM 고객 WHERE 고객번호 = :cust_num FOR UPDATE;
UPDATE 고객 SET 적립포인트 = :point WHERE 고객번호 = :cust_num;
-- 낙관적: 읽을 때 값(또는 변경일시)을 기억 → UPDATE 조건에 포함
UPDATE 상품 SET 판매가격 = :새가격
WHERE 상품코드 = :prod_cd AND 최종변경일시 = :mod_dt;   -- 0건이면 누가 먼저 바꿈 → 재처리
</code></pre>
<ul>
<li><strong>FOR UPDATE 옵션</strong>: <code>WAIT 3</code>(3초 대기), <code>NOWAIT</code>(바로 에러), <strong><code>SKIP LOCKED</code></strong>(Lock 걸린 레코드는 건너뜀 → 큐 테이블 처리에 유용).</li>
<li><strong>데이터 품질과 동시성 향상을 위한 제언</strong>: FOR UPDATE를 두려워하지 말 것(필요하면 사용, 대신 WAIT/NOWAIT로 대기 제어). 다중 트랜잭션이 존재하는 상황에서 품질 문제는 Lock을 덜 걸려다가 생겨요.</li>
<li><strong>로우 Lock 대상 테이블 지정</strong>: 조인 쿼리에서 <code>FOR UPDATE OF 계좌.잔고</code> 처럼 Lock 대상 테이블 지정 가능.</li>
<li><strong>SELECT FOR UPDATE + 큐(Queue) 처리</strong>: <code>SKIP LOCKED</code> 로 여러 프로세스가 동시에 미처리 데이터를 나눠서 가져감.</li>
<li><strong>채번 시 Lock 경합</strong>이 다음 주제(6.4.3)로 이어져요.</li>
</ul>
<h3 id="t-139">6.4.3 채번 방식에 따른 INSERT 성능 비교 (p.480) ⭐</h3>
<div class="tw"><table>
<thead>
<tr>
<th>방식</th>
<th>설명</th>
<th>장단점</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>채번 테이블</strong></td>
<td>별도 테이블에 현재 번호를 관리 → 읽고 +1 해서 UPDATE (FOR UPDATE Lock)</td>
<td>범용, 중간 번호 누락 없음 / <strong>Lock 경합</strong>으로 동시 INSERT 많으면 느림. 자율 트랜잭션으로 채번 처리하는 방법도</td>
</tr>
<tr>
<td><strong>시퀀스 오브젝트</strong></td>
<td><code>CREATE SEQUENCE</code> → <code>NEXTVAL</code></td>
<td>성능 빠름 / 번호 <strong>누락</strong> 가능(캐시, 롤백), 테이블별 시퀀스 관리 부담</td>
</tr>
<tr>
<td><strong>MAX + 1 조회</strong></td>
<td><code>SELECT MAX(번호) + 1</code> 후 INSERT</td>
<td>별도 관리 불필요, 동시 INSERT 적으면 성능 좋음 / <strong>중복 레코드 발생 가능</strong>(PK 제약으로 에러 → 재시도), 인덱스로 MAX를 빠르게 찾을 수 있어야</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li><strong>시퀀스 Lock</strong>(색인 p.484~487)</li>
<li><strong>로우 캐시 Lock</strong>: 시퀀스 정보는 딕셔너리(로우 캐시)에 저장 → 캐시 소진 시 갱신하며 Lock. <strong>CACHE 크기를 늘리면</strong> 빈도 감소(기본 20).</li>
<li><strong>시퀀스 캐시 Lock</strong>: 캐시에서 값을 가져올 때 직렬화.</li>
<li><strong>SV Lock</strong>(RAC): RAC 환경에서 노드 간 시퀀스 순서 보장(ORDER 옵션) 시 발생.</li>
<li><strong>글로벌 시퀀스 / 세션 시퀀스</strong>(색인 p.493, 496, 12c~): <code>SESSION</code> 옵션 → 세션 내에서만 유효한 시퀀스(글로벌 임시 테이블용).</li>
<li><strong>Scalable 시퀀스</strong>(색인 p.497, 18c~): 인스턴스 번호 + 세션 번호를 앞에 붙여 <strong>인덱스 경합</strong> 해소.</li>
<li><strong>인덱스 블록 경합</strong> ⭐: 시퀀스·일시 같은 <strong>순차적으로 증가하는 값</strong>을 인덱스 키로 쓰면 항상 <strong>맨 오른쪽 리프 블록</strong>에만 입력 → <strong>Right Growing 인덱스</strong>(색인 p.495~498) → 동시 INSERT 시 경합.</li>
<li>해결: 인덱스를 <strong>해시 파티셔닝</strong>(값이 여러 리프로 분산), 또는 <strong>Reverse 키 인덱스</strong>(키 값을 뒤집어 저장), Scalable 시퀀스.</li>
<li><strong>채번 테이블 vs 시퀀스 vs MAX+1 선택 기준</strong>: 동시 INSERT가 매우 많으면 → 시퀀스(누락 허용 시) 또는 MAX+1 + 재시도. 순번이 <strong>연속이어야 하고 PK 구조가 복잡</strong>하면 채번 테이블(동시성 낮을 때).</li>
</ul>
<h1 id="t-ch-7">7장. SQL 옵티마이저</h1>
<h2 id="t-140">7.1 통계정보와 비용 계산 원리 (p.501)</h2>
<h3 id="t-141">7.1.1 선택도와 카디널리티 (p.501) ⭐</h3>
<ul>
<li><strong>선택도(Selectivity)</strong>: 전체 레코드 중에서 조건절에 의해 <strong>선택되는 레코드 비율</strong>.</li>
<li><strong>카디널리티(Cardinality)</strong>: 전체 레코드 중 조건절에 의해 선택되는 <strong>레코드 개수</strong>.</li>
</ul>
<pre><code>카디널리티 = 총 로우 수 × 선택도
= 조건 선택도 = 1 / NDV   (= 조건, 히스토그램 없을 때)
</code></pre>
<ul>
<li><strong>NDV</strong>(Number of Distinct Values): 컬럼의 <strong>중복을 제거한 값의 개수</strong>.</li>
<li>예: 상품분류 NDV가 4(가전, 의류, 식음료, 생활용품)이고 총 10만 건 → <code>상품분류 = '가전'</code> 선택도 25%, 카디널리티 25,000.</li>
<li>⭐ 옵티마이저는 카디널리티로 비용을 계산하고 <strong>액세스 방식, 조인 순서, 조인 방식</strong>을 결정 → <strong>선택도를 정확히 구하는 것이 핵심</strong> → 통계정보 정확성이 중요.</li>
</ul>
<h3 id="t-142">7.1.2 통계정보 (p.502) ⭐</h3>
<div class="tw"><table>
<thead>
<tr>
<th>종류</th>
<th>주요 항목</th>
<th>조회 뷰</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>테이블 통계</strong></td>
<td>NUM_ROWS(총 레코드 수), BLOCKS(사용 블록 수), AVG_ROW_LEN(평균 행 길이), SAMPLE_SIZE, LAST_ANALYZED</td>
<td><code>USER_TABLES</code>, <code>USER_TAB_STATISTICS</code></td>
</tr>
<tr>
<td><strong>인덱스 통계</strong></td>
<td>BLEVEL(브랜치 레벨: 수직적 탐색 비용), LEAF_BLOCKS(수평적 탐색 비용), NUM_ROWS, DISTINCT_KEYS, AVG_LEAF_BLOCKS_PER_KEY, AVG_DATA_BLOCKS_PER_KEY, <strong>CLUSTERING_FACTOR</strong></td>
<td><code>USER_INDEXES</code>, <code>USER_IND_STATISTICS</code></td>
</tr>
<tr>
<td><strong>컬럼 통계</strong></td>
<td>NUM_DISTINCT(<strong>NDV</strong>), DENSITY, AVG_COL_LEN, LOW_VALUE, HIGH_VALUE, NUM_NULLS, NUM_BUCKETS, HISTOGRAM</td>
<td><code>USER_TAB_COLUMNS</code>, <code>USER_TAB_COL_STATISTICS</code></td>
</tr>
<tr>
<td><strong>시스템 통계</strong></td>
<td>CPU 속도, 평균 Single/Multiblock I/O 속도, 평균 Multiblock I/O 개수, I/O 서브시스템 최대 처리량 등 → 하드웨어·애플리케이션 특성 반영</td>
<td><code>SYS.AUX_STATS$</code></td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>통계 수집: <code>DBMS_STATS.GATHER_TABLE_STATS('SCOTT', 'EMP')</code>, <code>GATHER_INDEX_STATS</code>, <code>GATHER_SYSTEM_STATS</code>.</li>
<li><strong>컬럼 히스토그램</strong>(색인 p.505): 값별 분포가 균일하지 않을 때(예: 특정 값에 몰림) 선택도를 정확히 계산하기 위해 수집. 종류: 도수분포(Frequency), 높이균형(Height-Balanced), 상위도수분포(Top-Frequency, 12c), 하이브리드(Hybrid, 12c).</li>
<li><strong>오브젝트 통계</strong>(테이블·인덱스·컬럼, 색인 p.31) vs <strong>시스템 통계</strong>(System Statistics, 색인 p.31·507).</li>
</ul>
<h3 id="t-143">7.1.3 비용 계산 원리 (p.509)</h3>
<ul>
<li>
<p>인덱스를 이용한 테이블 액세스 비용(I/O 비용 모델):</p>
</li>
<li>
<p>인덱스 키 값을 <strong>모두 = 조건</strong>으로 검색할 때:</p>
</li>
</ul>
<pre><code>비용 = BLEVEL + AVG_LEAF_BLOCKS_PER_KEY + AVG_DATA_BLOCKS_PER_KEY
</code></pre>
<ul>
<li>그 외(범위 조건 포함 등)의 경우:</li>
</ul>
<pre><code>비용 = BLEVEL                                   -- 인덱스 수직적 탐색 비용
     + LEAF_BLOCKS × 유효 인덱스 선택도           -- 인덱스 수평적 탐색 비용
     + CLUSTERING_FACTOR × 유효 테이블 선택도      -- 테이블 랜덤 액세스 비용
</code></pre>
<div class="tw"><table>
<thead>
<tr>
<th>용어</th>
<th>뜻</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>유효 인덱스 선택도</strong></td>
<td>전체 인덱스 레코드 중 <strong>액세스 조건</strong>(스캔 범위 결정)으로 선택될 것으로 예상되는 레코드 비율</td>
</tr>
<tr>
<td><strong>유효 테이블 선택도</strong></td>
<td>전체 인덱스 레코드 중 <strong>인덱스 컬럼 조건 전체</strong>(액세스 + 인덱스 필터)로 선택될 것으로 예상되는 비율 → 테이블 방문 비율</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li><strong>I/O 비용 모델</strong> vs <strong>CPU 비용 모델</strong>(색인 p.510)</li>
<li>I/O 비용 모델: 예상되는 <strong>I/O Call 횟수</strong>가 비용.</li>
<li>CPU 비용 모델: I/O 소요 시간 + CPU 연산 시간을 <strong>Single Block I/O 시간으로 나눈 상대적 시간 값</strong>(시스템 통계 활용). 9i 도입, 10g부터 기본.</li>
<li>⚠️ Table Full Scan 비용은 HWM 아래 총 블록 수를 <strong>Multiblock I/O 단위</strong>로 나눈 값을 바탕으로 계산.</li>
</ul>
<h2 id="t-144">7.2 옵티마이저에 대한 이해 (p.511)</h2>
<h3 id="t-145">7.2.1 옵티마이저 종류 (p.511) ⭐</h3>
<div class="tw"><table>
<thead>
<tr>
<th>종류</th>
<th>원리</th>
<th>비고</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>규칙기반 옵티마이저</strong>(RBO, Rule-Based)</td>
<td>미리 정해 둔 <strong>우선순위 규칙</strong>(액세스 경로별 순위)에 따라 실행계획 결정. 데이터량·분포 고려 안 함</td>
<td>10g부터 공식 지원 중단</td>
</tr>
<tr>
<td><strong>비용기반 옵티마이저</strong>(CBO, Cost-Based)</td>
<td><strong>통계정보</strong>(데이터량, 컬럼 값 수·분포, 인덱스 높이, 클러스터링 팩터 등)를 바탕으로 각 실행계획의 <strong>비용을 계산</strong>해 가장 낮은 것 선택</td>
<td>현재 표준</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>RBO 규칙 예: 1순위 ROWID로 단일 행 → … → 4순위 Unique 인덱스 단일 행 → … → 9순위 단일 컬럼 인덱스 → … → 15순위 Full Table Scan. 인덱스가 있으면 무조건 인덱스 우선(데이터량 무관) → 대량 데이터에서 비효율.</li>
<li>💡 CBO가 사용하는 “비용”은 <strong>예상치</strong>예요. 통계가 부정확하면 틀린 판단을 해요.</li>
</ul>
<h3 id="t-146">7.2.2 옵티마이저 모드 (p.514) ⭐</h3>
<div class="tw"><table>
<thead>
<tr>
<th>모드</th>
<th>목표</th>
<th>적합한 환경</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>ALL_ROWS</strong></td>
<td>쿼리 최종 결과 집합을 <strong>끝까지 Fetch</strong> 하는 것을 전제로 <strong>시스템 리소스(I/O, CPU, 메모리)를 가장 적게</strong> 사용 → 전체 처리량(Throughput)</td>
<td><strong>DW, 배치</strong> (기본값)</td>
</tr>
<tr>
<td><strong>FIRST_ROWS</strong></td>
<td>전체 결과 중 <strong>일부만 Fetch</strong> 하다가 멈추는 것을 전제로 <strong>가장 빠른 응답 속도</strong>. 인덱스·NL 조인을 선호하는 경향. 폐기 예정이라 비권장</td>
<td>구 OLTP</td>
</tr>
<tr>
<td><strong>FIRST_ROWS_N</strong></td>
<td>처음 <strong>N개 로우만 Fetch</strong> 하는 것을 전제로 가장 빠른 응답 속도. 읽을 건수가 명시돼 FIRST_ROWS보다 비용 산정이 정확. 세션·시스템 설정은 N = 1, 10, 100, 1000</td>
<td><strong>OLTP</strong> (힌트로는 <code>FIRST_ROWS(30)</code> 처럼 0보다 큰 임의 정수 가능)</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>설정: <code>ALTER SESSION SET OPTIMIZER_MODE = FIRST_ROWS_10;</code> 또는 힌트 <code>/*+ ALL_ROWS */</code>, <code>/*+ FIRST_ROWS(10) */</code>. 파라미터 <strong><code>optimizer_mode</code></strong>(색인 p.515).</li>
<li>💡 FIRST_ROWS 계열에서는 인덱스로 소트를 생략하는 실행계획(부분범위 처리)이 선택되기 쉬워요. ⚠️ 그런데 실제로 끝까지 Fetch하면(예: 엑셀 다운로드) 오히려 느려질 수 있어요.</li>
</ul>
<h3 id="t-147">7.2.3 옵티마이저에 영향을 미치는 요소 (p.516)</h3>
<div class="tw"><table>
<thead>
<tr>
<th>요소</th>
<th>내용</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>SQL과 연산자 형태</strong></td>
<td>같은 결과라도 SQL 형태(서브쿼리 vs 조인, IN vs BETWEEN, LIKE vs = 등)에 따라 실행계획이 달라짐</td>
</tr>
<tr>
<td><strong>인덱스·IOT·클러스터링·파티셔닝·MV 등 옵티마이징 팩터</strong></td>
<td>쿼리를 똑같이 작성해도 인덱스·파티션 구성에 따라 성능이 크게 달라짐</td>
</tr>
<tr>
<td><strong>제약 설정</strong></td>
<td>PK·FK·Check·Not Null 제약은 옵티마이저에게 <strong>쿼리 성능 최적화 정보</strong>로도 활용(예: NOT NULL이면 COUNT(*)에 인덱스 사용, FK가 있으면 불필요한 조인 제거 Join Elimination)</td>
</tr>
<tr>
<td><strong>통계정보</strong></td>
<td>가장 큰 영향. 통계가 바뀌면 실행계획이 바뀔 수 있음 → 운영 DB 통계 수집 정책 중요</td>
</tr>
<tr>
<td><strong>옵티마이저 힌트</strong></td>
<td>힌트는 <strong>명령어</strong>(Directives)로, 문법이 맞고 가능한 경로면 따름</td>
</tr>
<tr>
<td><strong>옵티마이저 관련 파라미터</strong></td>
<td><code>optimizer_mode</code>, <code>optimizer_features_enable</code>, <code>optimizer_index_cost_adj</code>, <code>db_file_multiblock_read_count</code> 등. DB 버전 업그레이드 시 실행계획 변경 원인</td>
</tr>
</tbody>
</table>
</div>
<h3 id="t-148">7.2.4 옵티마이저의 한계 (p.518)</h3>
<ul>
<li>옵티마이저 행동에 가장 큰 영향을 주는 <strong>통계정보가 완벽하지 않음</strong>: 수집 시간·리소스 부담 때문에 <strong>샘플링</strong>, 컬럼 간 <strong>상관관계</strong> 반영 어려움, <strong>바인드 변수를 쓰면 컬럼 히스토그램을 활용할 수 없음</strong>(실제 값을 모르니 균등 분포 가정).</li>
<li><strong>최적화 시간 제약</strong>: 모든 실행계획 후보를 다 평가할 수 없음(조인 테이블이 많으면 순열 폭발) → 적당히 좋은 계획을 빨리 찾는 게 목표.</li>
<li>💡 그래서 옵티마이저는 <strong>“완벽한” 답이 아니라 “충분히 좋은” 답</strong>을 찾아요.</li>
</ul>
<h3 id="t-149">7.2.5 개발자의 역할 (p.519) ⭐</h3>
<p>옵티마이저 한계를 보완하는 개발자의 역할(이 책 전체 요약이기도 해요):</p>
<ol>
<li><strong>필요한 최소 블록만 읽도록</strong> 쿼리 작성 (조건 범위, 불필요한 컬럼·조인 제거)</li>
<li><strong>최적의 옵티마이징 팩터 제공</strong>: 전략적 인덱스 구성, DBMS 기능(파티션, 클러스터, IOT, MV, 병렬 처리) 활용</li>
<li><strong>필요하다면 옵티마이저 힌트로 최적의 액세스 경로 유도</strong></li>
<li>💡 화면 설계 단계부터 성능 고려 (예: 조회 기간 제한, 페이징, 필수 조건)</li>
<li>💡 One SQL, Array Processing, 부분범위 처리 등 <strong>Call 최소화</strong></li>
</ol>
<h3 id="t-150">7.2.6 튜닝 전문가 되는 공부방법 (p.525)</h3>
<ul>
<li>튜닝은 결국 <strong>데이터베이스 I/O 원리</strong>를 이해하는 게 핵심 → 원리 위주로 공부(블록 I/O, 버퍼캐시, 인덱스 구조, 조인 메커니즘).</li>
<li>실행계획과 SQL 트레이스를 <strong>직접 보면서</strong> 실습 → 각 단계 Rows·cr을 읽는 습관.</li>
<li>💡 “왜 느린가?”를 항상 <strong>읽은 블록 수</strong>로 설명할 수 있어야 해요.</li>
</ul>
<h1 id="t-ch-8">부록. SQL 분석 도구</h1>
<h2 id="t-151">부록 1. 실행계획 확인 (p.531) ⭐</h2>
<pre><code class="language-sql">EXPLAIN PLAN FOR
SELECT * FROM emp WHERE empno = 7900;
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY(NULL, NULL, 'TYPICAL'));
</code></pre>
<ul>
<li><code>EXPLAIN PLAN</code> 실행 결과는 <strong>PLAN_TABLE</strong>에 저장(10g~ 기본 제공, <code>@?/rdbms/admin/utlxplan.sql</code> 로 직접 생성도 가능).</li>
<li>SQL*Plus에서는 <code>SET AUTOTRACE</code> 로도 확인.</li>
<li>⚠️ EXPLAIN PLAN은 <strong>예상 실행계획</strong>이에요. 바인드 변수 타입·값 등에 따라 실제 실행계획과 다를 수 있어요.</li>
</ul>
<h2 id="t-152">부록 2. AutoTrace (p.534)</h2>
<ul>
<li>SQL*Plus에서 실행계획 + <strong>실행 통계</strong>를 함께 확인.</li>
</ul>
<div class="tw"><table>
<thead>
<tr>
<th>명령</th>
<th>쿼리 실행</th>
<th>결과 출력</th>
<th>실행계획</th>
<th>실행 통계</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>SET AUTOTRACE ON</code></td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
</tr>
<tr>
<td><code>SET AUTOTRACE ON EXPLAIN</code></td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td></td>
</tr>
<tr>
<td><code>SET AUTOTRACE ON STATISTICS</code></td>
<td>✓</td>
<td>✓</td>
<td></td>
<td>✓</td>
</tr>
<tr>
<td><code>SET AUTOTRACE TRACEONLY</code></td>
<td>✓</td>
<td></td>
<td>✓</td>
<td>✓</td>
</tr>
<tr>
<td><code>SET AUTOTRACE TRACEONLY EXPLAIN</code></td>
<td>✗(실행 안 함)</td>
<td></td>
<td>✓</td>
<td></td>
</tr>
<tr>
<td><code>SET AUTOTRACE TRACEONLY STATISTICS</code></td>
<td>✓</td>
<td></td>
<td></td>
<td>✓</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>실행 통계 항목: recursive calls, <strong>db block gets</strong>(Current 모드 읽기), <strong>consistent gets</strong>(Consistent 모드 읽기), <strong>physical reads</strong>, redo size, bytes sent/received, SQL*Net roundtrips, <strong>sorts (memory)</strong>, <strong>sorts (disk)</strong>, rows processed.</li>
<li>💡 논리적 I/O = db block gets + consistent gets.</li>
<li>권한: PLAN_TABLE, 그리고 통계를 보려면 <code>PLUSTRACE</code> 롤(v_$sesstat, v_$statname, v_$mystat 조회 권한) 필요.</li>
</ul>
<h2 id="t-153">부록 3. SQL 트레이스 (p.537) ⭐</h2>
<pre><code class="language-sql">ALTER SESSION SET SQL_TRACE = TRUE;
SELECT * FROM emp WHERE empno = 7900;
ALTER SESSION SET SQL_TRACE = FALSE;
-- 트레이스 파일 위치 (11g~)
SELECT value FROM v$diag_info WHERE name = 'Default Trace File';
</code></pre>
<ul>
<li>생성된 트레이스 파일(.trc)을 <strong>TKProf</strong> 유틸리티로 보기 좋게 포맷팅: <code>tkprof ora_12345.trc report.prf sys=no</code>.</li>
</ul>
<pre><code>call     count   cpu  elapsed   disk   query  current   rows
------- ------ ----- -------- ------ ------- -------- ------
Parse        1  0.00     0.00      0       0        0      0
Execute      1  0.00     0.00      0       0        0      0
Fetch        2  0.00     0.00      0       4        0      1
------- ------ ----- -------- ------ ------- -------- ------
total        4  0.00     0.00      0       4        0      1

Rows  Row Source Operation
----  ---------------------------------------------------
   1  TABLE ACCESS BY INDEX ROWID EMP (cr=4 pr=0 pw=0 time=..)
   1   INDEX UNIQUE SCAN PK_EMP (cr=3 pr=0 pw=0 time=..)
</code></pre>
<div class="tw"><table>
<thead>
<tr>
<th>항목</th>
<th>의미</th>
</tr>
</thead>
<tbody>
<tr>
<td>call</td>
<td>Parse / Execute / Fetch 단계</td>
</tr>
<tr>
<td>count</td>
<td>각 단계의 Call 횟수</td>
</tr>
<tr>
<td>cpu / elapsed</td>
<td>CPU 시간 / 총 소요 시간(초)</td>
</tr>
<tr>
<td><strong>disk</strong></td>
<td>디스크에서 읽은 블록 수(물리적 I/O)</td>
</tr>
<tr>
<td><strong>query</strong></td>
<td>Consistent 모드로 읽은 블록 수</td>
</tr>
<tr>
<td><strong>current</strong></td>
<td>Current 모드로 읽은 블록 수</td>
</tr>
<tr>
<td>rows</td>
<td>처리 건수</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>Row Source Operation의 <strong>cr</strong>(consistent read) = query, <strong>pr</strong>(physical read) = disk, <strong>pw</strong>(physical write), <strong>time</strong>(마이크로초 µs).</li>
<li>⭐ 각 단계 <strong>cr 값은 하위 단계 값을 포함</strong>한 누적값이에요. 예: 위에서 테이블 단계 cr=4 = 인덱스 3 + 테이블 1.</li>
<li>이벤트 트레이스: <code>ALTER SESSION SET EVENTS '10046 trace name context forever, level 12'</code> → 레벨 4: 바인드 변수, 8: 대기 이벤트, 12: 둘 다.</li>
</ul>
<h2 id="t-154">부록 4. DBMS_XPLAN 패키지 (p.542)</h2>
<div class="tw"><table>
<thead>
<tr>
<th>함수</th>
<th>용도</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>DBMS_XPLAN.DISPLAY</code></td>
<td><strong>예상 실행계획</strong> (PLAN_TABLE) 출력</td>
</tr>
<tr>
<td><code>DBMS_XPLAN.DISPLAY_CURSOR</code></td>
<td><strong>캐시된 커서의 실제 실행계획과 실행 통계</strong> 출력</td>
</tr>
<tr>
<td><code>DBMS_XPLAN.DISPLAY_AWR</code></td>
<td>AWR에 저장된 과거 SQL 실행계획</td>
</tr>
</tbody>
</table>
</div>
<ul>
<li>포맷 옵션: <code>BASIC</code>, <code>TYPICAL</code>(기본), <code>SERIAL</code>, <code>ALL</code>, <code>ADVANCED</code>, 추가로 <code>+ALIAS</code>, <code>+OUTLINE</code>, <code>+PEEKED_BINDS</code>, <code>+PREDICATE</code> 등.</li>
<li><strong>DISPLAY_CURSOR로 실제 실행 통계 보기</strong> ⭐</li>
<li><code>/*+ GATHER_PLAN_STATISTICS */</code> 힌트(또는 <code>statistics_level = ALL</code>)로 실행</li>
<li><code>SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY_CURSOR(NULL, NULL, 'ALLSTATS LAST'));</code></li>
<li>출력 컬럼: <strong>Starts</strong>(각 오퍼레이션 반복 수행 횟수), <strong>E-Rows</strong>(예상 Rows), <strong>A-Rows</strong>(실제 Rows), <strong>A-Time</strong>, <strong>Buffers</strong>(cr 또는 current), <strong>Reads</strong>(pr), Writes, OMem/1Mem/Used-Mem(PGA 사용량).</li>
<li>💡 <strong>E-Rows와 A-Rows 차이가 크면</strong> 옵티마이저가 카디널리티를 잘못 추정한 것 → 통계정보 점검.</li>
<li>⚠️ <code>ALLSTATS</code>(LAST 없이)는 누적값, <code>ALLSTATS LAST</code>는 마지막 실행값.</li>
</ul>
<h2 id="t-155">부록 5. 실시간 SQL 모니터링 (p.549)</h2>
<ul>
<li>11g~. 오래 걸리는 SQL을 <strong>실행 중에 실시간으로</strong> 모니터링. <strong>CPU 시간 또는 I/O 시간을 5초 이상</strong> 소비한 SQL, <strong>병렬 SQL</strong>, <code>MONITOR</code> 힌트를 지정한 SQL이 대상.</li>
<li>파라미터: <code>_sqlmon_threshold</code>(기본 5초), <code>_sqlmon_max_planlines</code>(기본 300줄 넘으면 모니터링 안 함).</li>
<li>확인: <code>DBMS_SQLTUNE.REPORT_SQL_MONITOR(sql_id =&gt; '...', type =&gt; 'HTML')</code>, 뷰 <code>V$SQL_MONITOR</code>, <code>V$SQL_PLAN_MONITOR</code>.</li>
<li>⚠️ Tuning Pack 라이선스 필요.</li>
</ul>
<h2 id="t-156">부록 6. V$SQL (p.551)</h2>
<ul>
<li>라이브러리 캐시에 캐싱된 각 <strong>SQL 커서의 수행 통계</strong>를 보여 주는 뷰. 쿼리가 끝날 때마다 갱신(오래 걸리면 5초마다).</li>
<li>주요 컬럼: <code>SQL_ID</code>, <code>CHILD_NUMBER</code>, <code>PARSE_CALLS</code>, <code>LOADS</code>(하드 파싱 횟수), <code>EXECUTIONS</code>, <code>FETCHES</code>, <code>ROWS_PROCESSED</code>, <code>BUFFER_GETS</code>(논리적 I/O), <code>DISK_READS</code>(물리적 I/O), <code>CPU_TIME</code>, <code>ELAPSED_TIME</code>, <code>SORTS</code>, <code>SHARABLE_MEM</code>.</li>
<li>활용: SQL별 <strong>실행당 평균 블록 수, 평균 소요 시간</strong>을 계산해 튜닝 대상 SQL을 찾음.</li>
</ul>
<pre><code class="language-sql">SELECT sql_id, executions,
       ROUND(buffer_gets / executions) avg_lio,
       ROUND(elapsed_time / executions / 1000000, 2) avg_sec
FROM v$sql WHERE executions &gt; 0
ORDER BY buffer_gets DESC;
</code></pre>
`;
