// DB 모델링 개념 정리 탭 (HTML)
var WDB = window.WDB = window.WDB || {};
WDB.concepts = String.raw`
<h1 id="d-0">DB 모델링 개념 정리: 데이터 모델링 1~3장</h1>
<p>강의 교안(1장 데이터 모델링 이론, 2장 개념 모델링, 3장 논리 모델링)과 수업 필기를 장별로 정리한 문서예요. 4장 물리 모델링은 수업이 진행되면 추가할 예정이에요.</p>
<blockquote>
<p>📌 <strong>표시 안내</strong></p>
<ul>
<li>⭐ = 강의 자료에 별표/박스로 강조된 부분</li>
<li>📝 = 손글씨 필기 메모</li>
<li>💡 = 흐름 이해를 돕기 위해 덧붙인 보충 설명</li>
</ul>
</blockquote>
<hr />
<h2 id="d-1">0. 전체 그림 먼저 보기 ⭐</h2>
<p>📝 <strong>이 과목의 순서</strong>: ① 모델링 이론 → <strong>② 개념 모델링 → ③ 논리 모델링</strong> (⭐ 핵심) → ④ 물리 모델링 (4장, 아직 안 나감)</p>
<p>📝 <strong>필기로 그린 전체 구조</strong></p>
<div class="tw"><table>
<thead>
<tr>
<th>분석</th>
<th></th>
<th>설계</th>
<th></th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>현재</strong></td>
<td><strong>미래</strong></td>
<td><strong>① 개념</strong></td>
<td><strong>② 논리</strong></td>
<td><strong>③ 물리</strong></td>
</tr>
<tr>
<td>현행 업무, 추가 요구사항</td>
<td>개선, 향후 계획 수립</td>
<td>주제영역, 핵심 엔티티</td>
<td>엔티티, 관계, 속성</td>
<td>테이블, 제약조건</td>
</tr>
</tbody>
</table>
</div>
<p>그리고 이 모든 단계의 바닥에 <strong>표준</strong>(데이터 표준화)이 깔려 있어요.</p>
<pre><code>[분석]                            [설계]
현행 분석 → 방향성 수립 → 개념 모델링 → 논리 모델링 → 물리 모델링
                          (대충/개략)   (구체적/명확)   (DB에 맞게 구현)
                ↑______________ 데이터 표준 (단어·용어·도메인·코드) ______________↑
</code></pre>
<p>💡 <strong>한 문장 요약</strong>: 현재 업무를 분석해서 → 큰 덩어리(주제영역)로 나누고 → 덩어리마다 엔티티·관계·속성을 구체화하고 → 마지막에 실제 DB 테이블로 만든다. 전 과정에서 이름과 타입은 표준을 따른다.</p>
<hr />
<h1 id="d-ch-1">1장. 데이터 모델링 이론</h1>
<h2 id="d-2">1-1. 데이터 모델링이란?</h2>
<blockquote>
<p><strong>실제 업무를 분석하여 데이터 모델로 만드는 것</strong></p>
</blockquote>
<ul>
<li><strong>모델</strong>: 작품을 만들기 전에 미리 만든 물건. 완성된 작품을 대표하는 보기</li>
<li><strong>모델링</strong>: 모델을 만드는 것</li>
<li><strong>데이터 모델</strong>: 데이터를 그룹화하고, 그룹 사이의 관계를 표현한 것 (ER Model)</li>
<li><strong>데이터 모델링 작업 순서</strong>
  1. 현행 업무(현업 인터뷰, 업무 지침서, 용어집, 산출물 등)를 파악하고
  2. 개념들을 정리하고 분류해서
  3. <strong>엔티티, 속성, 관계</strong>로 형상화한다</li>
</ul>
<h3>📝 모델링하는 방법: "그룹화 - 줄긋기"</h3>
<ol>
<li><strong>화면 캡처</strong>: 실제 업무 자료(예: 영수증)를 확보</li>
<li><strong>컬럼 수집</strong>: 자료에 나오는 항목을 전부 나열
   - 주문번호, 매장명, 사업자등록번호, 전화번호, 주소, 주문일시, 상품명1, 상품단가1, 상품수량1, 상품금액1, 상품명2 ..., 소계금액, 과세금액, 부가세, 합계금액, 카드결제금액, 카드사명, 카드번호, 승인번호, 할부구분</li>
<li><strong>컬럼 그룹화</strong>: 관련 있는 컬럼끼리 묶고(네모 치기), 묶음끼리 관계를 연결(줄긋기)</li>
</ol>
<div class="tw"><table>
<thead>
<tr>
<th>영수증 하나를 그룹화한 결과</th>
<th>포함 컬럼</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>매장</strong></td>
<td>매장번호, 매장명, 사업자등록번호, 전화번호, 주소</td>
</tr>
<tr>
<td><strong>주문</strong></td>
<td>주문번호, 주문일시, 과세금액, 부가세, 매장번호(FK)</td>
</tr>
<tr>
<td><strong>상품</strong></td>
<td>상품코드, 상품명, 상품단가</td>
</tr>
<tr>
<td><strong>주문상품</strong></td>
<td>주문번호(FK), 상품코드(FK), 상품수량, 상품금액</td>
</tr>
<tr>
<td><strong>카드승인</strong></td>
<td>카드승인번호, 카드결제금액, 카드사명, 카드번호, 할부구분, 주문번호(FK)</td>
</tr>
</tbody>
</table>
</div>
<p>💡 상품명1·상품명2처럼 <strong>반복되는 컬럼</strong>은 별도 엔티티(주문상품)로 빼요. 이것이 뒤에 나오는 <strong>정규화</strong>의 출발점이에요.</p>
<h3>📝 쪼개기와 다시 붙이기</h3>
<ul>
<li><strong>쪼개기(정규화)</strong> → 쪼갠 테이블은 조회할 때 <strong>JOIN</strong>으로 다시 합쳐야 해요.</li>
<li><strong>다시 붙이기(역정규화)</strong> → JOIN이 줄어서 <strong>성능 ↑</strong></li>
</ul>
<hr />
<h2 id="d-3">1-2. ER 모델의 질적 특성 (📝 가볍게 보기)</h2>
<div class="tw"><table>
<thead>
<tr>
<th>특성</th>
<th>의미</th>
</tr>
</thead>
<tbody>
<tr>
<td>완전성 (completeness)</td>
<td>모든 업무 요구사항을 표현해야 한다</td>
</tr>
<tr>
<td>정확성 (correctness)</td>
<td>규칙에 맞게 정확히 작성해야 한다</td>
</tr>
<tr>
<td>최소성 (minimality)</td>
<td>불필요한 중복이 없어야 한다</td>
</tr>
<tr>
<td>자명성 (self-explanation)</td>
<td>누구나 이해하기 쉽게 의미를 명확히 설명해야 한다</td>
</tr>
<tr>
<td>확장성 (extensibility)</td>
<td>업무 범위가 확대·변경돼도 어렵지 않게 설계해야 한다</td>
</tr>
<tr>
<td>표현성 (expressiveness)</td>
<td>요구사항을 자연스럽게 표현하고 표준 용어를 사용한다</td>
</tr>
<tr>
<td>가독성 (readability)</td>
<td>읽기 쉽게 표현해야 한다</td>
</tr>
</tbody>
</table>
</div>
<p>📝 그룹(엔티티) + 관계 ⇒ <strong>설계</strong></p>
<hr />
<h2 id="d-4">1-3. ER 모델 구성요소</h2>
<p><strong>엔티티(Entity), 관계(Relationship), 속성(Attribute), 식별자(Identifier)</strong></p>
<div class="tw"><table>
<thead>
<tr>
<th>구성요소</th>
<th>📝 프로그래밍에 비유하면</th>
<th>ERD에서 그리는 법</th>
</tr>
</thead>
<tbody>
<tr>
<td>엔티티</td>
<td><strong>class</strong></td>
<td>네모 치기</td>
</tr>
<tr>
<td>관계</td>
<td>객체 간 참조</td>
<td>줄긋기</td>
</tr>
<tr>
<td>속성</td>
<td><strong>인스턴스 변수(iv)</strong></td>
<td>네모 안의 항목</td>
</tr>
<tr>
<td>식별자</td>
<td><strong>PK</strong></td>
<td>네모 윗칸</td>
</tr>
</tbody>
</table>
</div>
<p>예시: <code>본부(본부코드, 본부명)</code> ─1:N─ <code>팀(팀코드, 팀명, 본부코드(FK))</code></p>
<hr />
<h2 id="d-5">1-4. 엔티티 (Entity)</h2>
<blockquote>
<p><strong>실존하거나 개념적인 것</strong></p>
</blockquote>
<ul>
<li><strong>실존</strong>하는 것: 고객, 상품, 직원</li>
<li><strong>개념적</strong>인 것: 주문, 결제</li>
<li>최소한 <strong>둘 이상의 인스턴스(row)</strong>가 존재할 수 있어야 해요.</li>
<li>최소한 <strong>둘 이상의 속성(column)</strong>이 있어야 해요.</li>
</ul>
<h3>📝 엔티티 설계는 trade-off (OOP와 비교)</h3>
<p>필기에서는 객체지향 설계에 비유했어요.
- <code>List&lt;PrimeType&gt;</code>, <code>List&lt;RefType&gt;</code> ⇒ <code>List&lt;Type&gt;</code>: 공통점을 묶어 일반화
- <strong>Composite 패턴</strong>, <strong>Command 패턴</strong>(모든 종류의 '명령'을 하나의 타입으로), <code>Stack&lt;Command&gt;</code>
- 즉 엔티티도 "얼마나 묶고 얼마나 나눌지"를 선택하는 문제예요.</p>
<p><strong>고객을 설계하는 3가지 방법</strong></p>
<div class="tw"><table>
<thead>
<tr>
<th>설계</th>
<th>구조</th>
<th>특징</th>
</tr>
</thead>
<tbody>
<tr>
<td>고객 설계 ①</td>
<td><code>고객</code> 하나에 고객유형코드, 주민등록번호, 법인등록번호를 모두 둠</td>
<td>단순하지만, 개인이면 법인등록번호가, 법인이면 주민번호가 비어 있음</td>
</tr>
<tr>
<td>고객 설계 ②</td>
<td><code>개인고객</code>, <code>법인고객</code>을 완전히 분리</td>
<td>각자 깔끔하지만 공통 속성(이름·주소)이 중복되고, 주문이 어느 쪽 고객인지 처리하기 복잡함</td>
</tr>
<tr>
<td>고객 설계 ③</td>
<td><code>고객</code>(공통) + <code>개인고객</code>/<code>법인고객</code>(개별) → <strong>슈퍼타입/서브타입</strong></td>
<td>공통은 한 곳에, 개별 속성은 따로. 설계는 조금 복잡함</td>
</tr>
</tbody>
</table>
</div>
<p>💡 정답은 없고 업무에 맞게 고르는 <strong>trade-off</strong>예요. ③은 뒤의 "엔티티 통합(일반화/특수화)"과 같은 개념이에요.</p>
<hr />
<h2 id="d-6">1-5. 엔티티의 분류 ⭐</h2>
<p>다양한 관점이 있지만 <strong>주로 "엔티티 형태"와 "엔티티 생성 관점"의 분류</strong>를 사용해요 (📝 빨간 박스).</p>
<div class="tw"><table>
<thead>
<tr>
<th>엔티티 관계</th>
<th>⭐ 엔티티 형태</th>
<th>⭐ 엔티티 생성 관점</th>
<th>엔티티 유무형</th>
</tr>
</thead>
<tbody>
<tr>
<td>강한 (Strong)</td>
<td><strong>독립</strong> (Kernel, Master)</td>
<td><strong>핵심</strong> (Key)</td>
<td>실체 (Tangible)</td>
</tr>
<tr>
<td>약한 (Weak)</td>
<td><strong>업무중심</strong> (Transaction)</td>
<td><strong>중요</strong> (Main)</td>
<td>비실체 (Intangible) - 개념 (Conceptual)</td>
</tr>
<tr>
<td></td>
<td><strong>종속</strong> (Dependent)</td>
<td><strong>행위</strong> (Action)</td>
<td>비실체 (Intangible) - 사건 (Event)</td>
</tr>
<tr>
<td></td>
<td><strong>교차</strong> (Associative)</td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
</div>
<p>📝 독립 ↔ 종속은 <strong>반대</strong> 개념이에요.</p>
<h3>분류 예시: 고객 ─ 주문 ─ 주문상품 ─ 상품</h3>
<div class="tw"><table>
<thead>
<tr>
<th>엔티티</th>
<th>관계</th>
<th>형태</th>
<th>생성 관점</th>
<th>유무형</th>
</tr>
</thead>
<tbody>
<tr>
<td>고객</td>
<td>강한</td>
<td>독립</td>
<td>핵심</td>
<td>실체</td>
</tr>
<tr>
<td>주문</td>
<td>강한</td>
<td>업무중심</td>
<td>중요</td>
<td>사건</td>
</tr>
<tr>
<td>주문상품</td>
<td><strong>약한</strong></td>
<td>종속, 교차</td>
<td>행위</td>
<td>사건</td>
</tr>
<tr>
<td>상품</td>
<td>강한</td>
<td>독립</td>
<td>핵심</td>
<td>실체</td>
</tr>
</tbody>
</table>
</div>
<p>💡 <strong>강한 엔티티</strong>는 혼자 존재할 수 있고, <strong>약한 엔티티</strong>는 다른 엔티티가 있어야 존재해요. 주문상품은 주문과 상품이 있어야만 존재하죠.</p>
<hr />
<h2 id="d-7">1-6. 엔티티 간의 관계</h2>
<p>관계는 <strong>관계수, 선택성, 식별자 상속</strong>으로 표현해요.</p>
<h3>표기법 비교</h3>
<div class="tw"><table>
<thead>
<tr>
<th>구성요소</th>
<th>DA# (Barker 표기)</th>
<th>ERwin (IE 표기)</th>
</tr>
</thead>
<tbody>
<tr>
<td>관계수 (Cardinality)</td>
<td>표시 없으면 1, Crow's foot(&lt;)이면 M</td>
<td>Bar(-)이면 1, Crow's foot(&lt;)이면 M</td>
</tr>
<tr>
<td>선택성 (Optionality) 📝 = 필수/선택</td>
<td>(상대쪽이) 점선이면 Optional, 실선이면 Mandatory</td>
<td>Bar(-)이면 Mandatory, ○이면 Optional (자기 편에 표시)</td>
</tr>
<tr>
<td>식별자 상속</td>
<td>Bar(-)가 있으면 식별자 상속, 없으면 비식별자 상속</td>
<td>실선이면 식별자 상속, 점선이면 비식별자 상속</td>
</tr>
</tbody>
</table>
</div>
<p><strong>ERwin으로 관계선 읽기 (고객 ─ 주문)</strong>: ① 관계수 → ② 선택성 → ③ 식별자 상속 → ④ 관계 동사(주문자/주문)</p>
<h3>① 관계수: 1:1, 1:M, M:N</h3>
<div class="tw"><table>
<thead>
<tr>
<th>관계</th>
<th>예시</th>
</tr>
</thead>
<tbody>
<tr>
<td>1:1</td>
<td>직원 ─ 인턴과정 (이수하여 / 채용되어)</td>
</tr>
<tr>
<td>1:M</td>
<td>부서 ─ 직원 (구성되어 / 소속되어)</td>
</tr>
<tr>
<td>M:N</td>
<td>학생 ─ 수강과목 (수강하여 / 선택되어)</td>
</tr>
</tbody>
</table>
</div>
<p>💡 M:N은 RDB에서 바로 표현할 수 없어서, 중간에 <strong>교차 엔티티</strong>(예: 수강)를 두어 1:M 두 개로 풀어요.</p>
<h3>② 선택성: 필수-선택, 선택-선택</h3>
<div class="tw"><table>
<thead>
<tr>
<th>유형</th>
<th>예시</th>
<th>의미</th>
</tr>
</thead>
<tbody>
<tr>
<td>필수-선택</td>
<td>고객 ─ 주문 (주문고객)</td>
<td>주문에는 고객이 <strong>반드시</strong> 있어야 하고, 고객은 주문이 없어도 됨</td>
</tr>
<tr>
<td>선택-선택</td>
<td>사원 ─ 계좌 (소개사원)</td>
<td>계좌는 소개사원이 없어도 되고, 사원도 소개한 계좌가 없어도 됨</td>
</tr>
</tbody>
</table>
</div>
<h3>③ 식별자 상속: 식별 관계 vs 비식별 관계</h3>
<blockquote>
<p>부모의 PK가 자식에서 <strong>PK이면서 동시에 FK</strong>인 경우 = 식별 관계</p>
</blockquote>
<div class="tw"><table>
<thead>
<tr>
<th>구분</th>
<th>예시</th>
<th>자식의 키</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>식별 관계</strong></td>
<td>고객 → 고객주소</td>
<td><code>고객번호(PK, FK)</code> + 연락처일련번호</td>
</tr>
<tr>
<td><strong>비식별 관계</strong></td>
<td>고객 → 주문</td>
<td>주문번호(PK), <code>고객번호(FK)</code>: 일반 속성으로만 상속</td>
</tr>
<tr>
<td><strong>인조 식별자로 비식별</strong></td>
<td>고객 → 고객주소</td>
<td>고객주소번호(PK), <code>고객번호(FK)</code></td>
</tr>
</tbody>
</table>
</div>
<p>📝 <strong>비식별로 해도 OK</strong> (인조 식별자를 쓰면 식별 관계를 비식별 관계로 바꿀 수 있어요.)</p>
<h3>④ 관계 유형</h3>
<div class="tw"><table>
<thead>
<tr>
<th>#</th>
<th>유형</th>
<th>예시</th>
<th>📝 메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>①</td>
<td><strong>기본 관계</strong></td>
<td>엔티티 ─ 엔티티</td>
<td>가장 일반적</td>
</tr>
<tr>
<td>②</td>
<td><strong>재귀적 관계</strong></td>
<td>부서(부서번호, 상위부서번호(FK))</td>
<td><strong>위아래(계층)를 정할 때!</strong> 상사 파악할 때 <strong>self join</strong>. 사용하는 경우를 파악하자</td>
</tr>
<tr>
<td>③</td>
<td><strong>병렬 관계</strong></td>
<td>고객 ─ 보험계약 (계약자, 피보험자, 수익자1, 수익자2)</td>
<td>두 엔티티 사이에 관계가 여러 개. 역할이 늘어나면 <strong>계약당사자</strong> 엔티티를 추가로 설계(당사자구분: 계약자·피보험자·수익자)</td>
</tr>
<tr>
<td>④</td>
<td><strong>슈퍼타입/서브타입</strong></td>
<td>고객 → 개인고객, 법인고객 (고객유형코드로 구분)</td>
<td>공통은 슈퍼타입, 개별은 서브타입</td>
</tr>
</tbody>
</table>
</div>
<hr />
<h2 id="d-8">1-7. 속성 (Attribute)</h2>
<blockquote>
<p><strong>데이터를 표현하는 가장 작은 단위</strong></p>
</blockquote>
<div class="tw"><table>
<thead>
<tr>
<th>항목</th>
<th>설명</th>
<th>예시</th>
</tr>
</thead>
<tbody>
<tr>
<td>속성명</td>
<td>의미를 정확히 표현하는 명사, 표준 단어의 조합</td>
<td>고객명</td>
</tr>
<tr>
<td>식별자 여부</td>
<td>엔티티 식별자에 해당하는지 표시</td>
<td>주민번호</td>
</tr>
<tr>
<td>옵셔널리티</td>
<td>필수인지 선택인지 표시 📝 <strong>NOT NULL = 필수, NULL = 선택</strong></td>
<td>한글이름 필수, 영문이름 선택</td>
</tr>
<tr>
<td>도메인</td>
<td>속성의 타입과 범위</td>
<td>학년: 숫자, 1~4</td>
</tr>
</tbody>
</table>
</div>
<h3>속성의 분류</h3>
<p><strong>① 단순 속성 vs 복합 속성</strong>
- 복합 속성: 고객주소 = <code>양평동(기본) + 12(상세)</code> 처럼 여러 값이 합쳐진 것
- 📝 → <strong>column 합치기</strong>의 문제 (나눌지 합칠지 결정)</p>
<p><strong>② ⭐ 저장 속성 vs 파생 속성</strong>
- 📝 저장 속성: 값을 저장할 컬럼 / 파생 속성: 저장하지 않은 임시 값(계산 결과)
- 예: <code>주문금액 = 상품단가 × 주문수량</code> (300 = 100 × 3)</p>
<div class="tw"><table>
<thead>
<tr>
<th>구분</th>
<th>📝 동작</th>
<th>장점</th>
<th>단점</th>
</tr>
</thead>
<tbody>
<tr>
<td>① 저장</td>
<td><strong>I/O</strong>로 읽기만 함, 계산 X</td>
<td>출력 속도 ↑</td>
<td>단가·수량이 바뀌면 <strong>update</strong> 필요 (불일치 위험)</td>
</tr>
<tr>
<td>② 파생</td>
<td><strong>CPU</strong>로 계산 후 출력</td>
<td>항상 정확, 저장 공간 절약</td>
<td>조회할 때마다 계산 비용</td>
</tr>
</tbody>
</table>
</div>
<p><strong>③ 단일 값 속성 vs 다중 값 속성</strong>
- 다중 값: 취미 = <code>수영, 독서</code> 처럼 한 칸에 여러 값
- 📝 → <strong>row 합치기</strong>의 문제 (보통 별도 행/엔티티로 분리)</p>
<hr />
<h2 id="d-9">1-8. 식별자 (Identifier)</h2>
<blockquote>
<p><strong>행(row)을 개별적으로 식별할 수 있는 속성</strong>
📝 <strong>PK = NN(Not Null) + UQ(Unique)</strong></p>
</blockquote>
<div class="tw"><table>
<thead>
<tr>
<th>특성</th>
<th>의미</th>
</tr>
</thead>
<tbody>
<tr>
<td>유일성 (uniqueness)</td>
<td>엔티티 안에서 식별자로 구별 가능해야</td>
</tr>
<tr>
<td>최소성 (minimum)</td>
<td>최소한의 속성으로 구성 (1개~n개)</td>
</tr>
<tr>
<td>⭐ 불변성 (stability)</td>
<td>값이 바뀌지 않아야</td>
</tr>
<tr>
<td>존재성 (mandatory)</td>
<td>값이 반드시 있어야</td>
</tr>
</tbody>
</table>
</div>
<p>📝 <strong>PK 값은 바꾸지 않는 게 좋을 뿐, 바꿀 수는 있다.</strong></p>
<p><strong>잘못된 예시</strong>
- <strong>최소성 위반</strong>: <code>고객구분 + 고객번호</code>를 PK로 했는데 실제로는 <code>고객번호</code>만으로 유일함 → 고객구분은 빼야 해요.
- <strong>불변성 위반</strong>: 고객주소이력의 PK에 <code>유효종료일자</code>를 넣으면, 새 주소가 생길 때 <code>99991231 → 20190131</code>로 PK 값이 바뀌어요. → <code>변경일련번호</code>를 PK로 써요.</p>
<h3>식별자의 유형</h3>
<p><strong>본질 식별자 vs 인조 식별자</strong></p>
<div class="tw"><table>
<thead>
<tr>
<th>구분</th>
<th>📝 의미</th>
<th>예시 (주문내역)</th>
</tr>
</thead>
<tbody>
<tr>
<td>본질 식별자</td>
<td><strong>데이터의 의미가 있는 '식별'</strong></td>
<td>주문번호(FK) + <strong>상품코드</strong></td>
</tr>
<tr>
<td>인조 식별자</td>
<td><strong>내가 임의로 숫자 매긴 것</strong></td>
<td>주문번호(FK) + <strong>주문일련번호</strong></td>
</tr>
</tbody>
</table>
</div>
<p>📝 인조 식별자를 쓰면 같은 주문에 같은 상품이 두 줄 들어갈 수 있어요.</p>
<div class="tw"><table>
<thead>
<tr>
<th>주문번호</th>
<th>#</th>
<th>상품</th>
</tr>
</thead>
<tbody>
<tr>
<td>ORD001</td>
<td>1</td>
<td>새우깡</td>
</tr>
<tr>
<td>ORD001</td>
<td>2</td>
<td>새우깡</td>
</tr>
</tbody>
</table>
</div>
<p>💡 그래서 인조 식별자를 쓸 때는 본질 식별자 조합(주문번호+상품코드)에 <strong>UNIQUE 제약</strong>을 따로 거는 경우가 많아요.</p>
<p><strong>주 식별자 vs 대체 식별자</strong></p>
<div class="tw"><table>
<thead>
<tr>
<th>엔티티</th>
<th>주 식별자</th>
<th>대체 식별자</th>
</tr>
</thead>
<tbody>
<tr>
<td>사원</td>
<td>사원번호</td>
<td>주민등록번호</td>
</tr>
<tr>
<td>주문내역</td>
<td>주문번호 + 상품코드</td>
<td>주문번호 + 주문일련번호</td>
</tr>
</tbody>
</table>
</div>
<hr />
<h2 id="d-10">1-9. 관계형 데이터 모델 이론</h2>
<blockquote>
<p><strong>데이터를 2차원 테이블 형식으로 정의하고 표현한 모델</strong></p>
</blockquote>
<div class="tw"><table>
<thead>
<tr>
<th>관계형 용어</th>
<th>일반 용어</th>
<th>📝 메모</th>
</tr>
</thead>
<tbody>
<tr>
<td>릴레이션 (Relation)</td>
<td>테이블</td>
<td></td>
</tr>
<tr>
<td>스키마 = 릴레이션명 + 어트리뷰트</td>
<td>테이블 구조, 컬럼</td>
<td>Table(구조) = 스키마</td>
</tr>
<tr>
<td>인스턴스 = 튜플 (Tuples)</td>
<td>행</td>
<td>객체 = row</td>
</tr>
</tbody>
</table>
</div>
<h3>관계형 모델의 키</h3>
<div class="tw"><table>
<thead>
<tr>
<th>키</th>
<th>의미</th>
<th>예시 (사원)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>슈퍼키</strong> 📝 모든 키</td>
<td>키로 쓸 수 있는 모든 조합 (최소성 없어도 OK)</td>
<td>사원번호+사원명</td>
</tr>
<tr>
<td><strong>후보키</strong></td>
<td>기본키로 쓸 수 있는 키</td>
<td>사원번호, 주민등록번호</td>
</tr>
<tr>
<td>① <strong>기본키</strong></td>
<td>후보키 중 선택한 키</td>
<td>사원번호</td>
</tr>
<tr>
<td>② <strong>대체키</strong></td>
<td>기본키는 아니지만 대신 쓸 수 있는 키</td>
<td>주민등록번호</td>
</tr>
</tbody>
</table>
</div>
<pre><code>슈퍼키 ⊃ 후보키 = 기본키 + 대체키
</code></pre>
<h3>제약 조건</h3>
<div class="tw"><table>
<thead>
<tr>
<th>제약</th>
<th>확인 내용</th>
</tr>
</thead>
<tbody>
<tr>
<td>키 제약조건 (PK)</td>
<td>PK가 중복되지 않는지</td>
</tr>
<tr>
<td>실체 무결성 (Not Null)</td>
<td>반드시 값이 있는지</td>
</tr>
<tr>
<td>영역 무결성</td>
<td>값의 타입과 범위가 맞는지</td>
</tr>
<tr>
<td>참조 무결성 (FK)</td>
<td>참조하는 다른 테이블의 값이 실제로 있는지</td>
</tr>
</tbody>
</table>
</div>
<h3>함수 종속 (📝 이건 신경 쓰지 X)</h3>
<blockquote>
<p>속성 X에 의해 속성 Y가 결정되는 것</p>
</blockquote>
<div class="tw"><table>
<thead>
<tr>
<th>종류</th>
<th>형태</th>
<th>예시</th>
</tr>
</thead>
<tbody>
<tr>
<td>완전 함수종속</td>
<td>X → Y</td>
<td>고객번호 → (고객명, 생년월일, 전화번호, 주소)</td>
</tr>
<tr>
<td>부분 함수종속</td>
<td>(X, Y) → Z 인데 Y → Z</td>
<td>(주문번호, 상품코드) → (주문수량, 상품명, 상품단가) 인데, 상품명·상품단가는 상품코드만으로 결정됨</td>
</tr>
<tr>
<td>이행적 함수종속</td>
<td>X → Y, Y → Z 이므로 X → Z</td>
<td>주문번호 → 고객번호, 고객번호 → 고객명 ⇒ 주문번호 → 고객명</td>
</tr>
</tbody>
</table>
</div>
<p>💡 신경 쓰지 않아도 된다고 했지만, 바로 아래 <strong>2정규형 = 부분 종속 제거, 3정규형 = 이행 종속 제거</strong>라서 개념만 알면 정규화가 쉽게 이해돼요.</p>
<hr />
<h2 id="d-11">1-10. 정규화</h2>
<blockquote>
<p><strong>하나의 엔티티를 둘로 나누는 것, 중복 제거를 위해</strong>
📝 <strong>테이블 쪼개기 - why? 중복 제거.</strong> (제1 ~ 6 정규화가 있음)
📝 <strong>언제까지 쪼개요? → 더 이상 못 쪼갤 때까지</strong></p>
</blockquote>
<p><strong>정규화의 효과</strong>
- 데이터를 수정할 때 생기는 이상 현상 최소화
- 구조가 유연해지고 재사용성이 높아짐
- 변경(입력·수정·삭제) 작업 최소화
- 저장 공간 최소화
- 조회 성능이 떨어지면 <strong>역정규화</strong>(de-normalization)로 정규화 전으로 되돌림</p>
<h3>제1정규형: 속성 값은 <strong>단일 값</strong>이어야 (원자성)</h3>
<div class="tw"><table>
<thead>
<tr>
<th>문제</th>
<th>예시</th>
</tr>
</thead>
<tbody>
<tr>
<td>중복 열</td>
<td>전화번호1, 전화번호2 컬럼</td>
</tr>
<tr>
<td>다중 값</td>
<td>전화번호 한 칸에 <code>02-111-1111, 02-222-2222</code></td>
</tr>
</tbody>
</table>
</div>
<p>→ 전화번호를 별도 행/엔티티로 분리</p>
<h3>제2정규형: <strong>부분 종속</strong> 해소</h3>
<pre><code>[전]  주문내역(주문번호, 상품코드 | 상품명, 상품단가, 주문수량)
          → 상품명·상품단가는 상품코드에만 종속 (부분 종속)
[후]  주문내역(주문번호(FK), 상품코드(FK) | 주문수량)
      상품(상품코드 | 상품명, 상품단가)
</code></pre>
<h3>제3정규형: <strong>이행 종속</strong> 해소</h3>
<pre><code>[전]  주문(주문번호 | 주문일자, 고객번호, 고객전화번호)
          → 고객전화번호는 고객번호에 종속 (주문번호 → 고객번호 → 고객전화번호)
[후]  주문(주문번호 | 주문일자, 고객번호(FK))
      고객(고객번호 | 고객전화번호)
</code></pre>
<hr />
<h1 id="d-ch-2">2장. 개념 모델링</h1>
<h2 id="d-12">2-1. 데이터 모델링 절차 ⭐</h2>
<div class="tw"><table>
<thead>
<tr>
<th>분석</th>
<th></th>
<th>설계</th>
<th></th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>현행 분석</strong></td>
<td><strong>방향성 수립</strong></td>
<td><strong>개념 모델링</strong></td>
<td><strong>논리 모델링</strong></td>
<td><strong>물리 모델링</strong></td>
</tr>
<tr>
<td>현행 업무 분석<br>현행 데이터 분석<br>요구사항 정의</td>
<td></td>
<td>주제영역 정의<br>핵심 엔티티 정의</td>
<td>엔티티 정의<br>관계 정의<br>속성 정의</td>
<td>테이블 설계<br>무결성 설계<br>인덱스 등 설계</td>
</tr>
</tbody>
</table>
</div>
<p>↕ <strong>데이터 표준</strong>: 표준단어, 표준용어, 표준도메인, 표준코드 → Repository에 저장</p>
<hr />
<h2 id="d-13">2-2. 현행 분석 및 방향성 수립</h2>
<blockquote>
<p><strong>현재 사용 중인 시스템과 업무를 분석</strong></p>
</blockquote>
<p>📝 <strong>기존 시스템을 빨리 파악하는 순서</strong>
1. <strong>문서를 통한 업무 요건 파악</strong>: 관련 문서를 최대한 확보. 특히 <strong>사용자 매뉴얼</strong>
2. <strong>리버스 모델링</strong>: 물리 모델(기존 시스템의 DB)을 논리 모델로 변환 (ERwin, Claude 등 활용)
3. 현업 담당자와 협업: 설문지, 인터뷰, 회의</p>
<p>📝 <strong>ERD도 없고 FK도 없으면 관계를 어떻게 파악할까? → 코드 분석...</strong>
💡 애플리케이션의 SQL에서 어떤 컬럼끼리 JOIN하는지 보면 숨은 관계를 찾을 수 있어요.</p>
<h3>예시: AS-IS → TO-BE</h3>
<div class="tw"><table>
<thead>
<tr>
<th>분석</th>
<th>문제점 및 시사점 (AS-IS)</th>
<th>개선 방향 (TO-BE)</th>
</tr>
</thead>
<tbody>
<tr>
<td>현행 데이터 분석</td>
<td>업무 흐름과 비슷하게 테이블을 설계함</td>
<td>데이터 중심 모델 설계</td>
</tr>
<tr>
<td></td>
<td>업무 단위로 고객·사업장을 중복 관리, 데이터 발생 및 관리 주체에 대한 방안 필요</td>
<td>동질성을 갖는 유사한 구조의 테이블 통합</td>
</tr>
<tr>
<td></td>
<td>데이터 표준으로 일관된 명명 규칙 적용 필요</td>
<td>식별체계 기준 마련, 데이터 표준 준수</td>
</tr>
<tr>
<td></td>
<td>식별자 체계 및 구성 원칙 마련 필요</td>
<td></td>
</tr>
<tr>
<td>요구사항 정의</td>
<td>동일 사업장의 법인명·주소 불일치 해소</td>
<td></td>
</tr>
<tr>
<td></td>
<td>법인등록번호, 사업자등록번호 등 식별체계 강화로 중복 제거</td>
<td></td>
</tr>
<tr>
<td></td>
<td>월말 마감 업무 지연으로 인한 서비스 차질 등 성능 이슈 해결</td>
<td>업무 유연성 및 성능을 고려한 설계</td>
</tr>
</tbody>
</table>
</div>
<hr />
<h2 id="d-14">2-3. 개념 모델링</h2>
<blockquote>
<p><strong>전체적인 관점에서 개략적인 데이터 모델을 제시하는 단계</strong>
📝 개략적 = <strong>대충 설계</strong></p>
</blockquote>
<p>📝 <strong>대충(추상적, 개념) → 자세히(구체적, 논리) → 구현(물리)</strong></p>
<ul>
<li>상위 수준의 데이터 구조를 설계하는 과정</li>
<li>데이터 주제영역을 계층적으로 도출</li>
<li>요구사항에서 개념을 도출하고, 개념을 구체화해서 엔티티를 식별</li>
</ul>
<p><strong>개념 모델링 3단계</strong>
1. <strong>주제영역 도출</strong> 📝 = 설계 범위 정하기
2. <strong>주제영역 분류 및 정의</strong>
3. <strong>핵심 엔티티 정의 및 관계 정의</strong> 📝 예: 고객, 상품, 주문...</p>
<hr />
<h2 id="d-15">2-4. 주제 영역</h2>
<blockquote>
<p><strong>데이터를 ⭕최상위 단계에서 분류한 데이터 ⭕집합</strong></p>
</blockquote>
<ul>
<li>주제영역 안의 데이터는 서로 밀접하게 관련되고, 다른 주제영역과는 명확히 구분돼요.</li>
<li>일관된 분류 원칙을 따라서, 비즈니스 환경이 바뀌어도 데이터 영향을 최소화해야 해요.</li>
<li>기업이 어떤 데이터를 관리하는지, 누가 <strong>오너십</strong>(📝 = 책임)을 가졌는지 큰 틀에서 파악할 수 있어요.</li>
</ul>
<p><strong>주제영역의 효과</strong></p>
<div class="tw"><table>
<thead>
<tr>
<th>관점</th>
<th>효과</th>
</tr>
</thead>
<tbody>
<tr>
<td>업무</td>
<td>조직의 데이터를 연결·활용해 업무 효율 ↑, 서로 다른 조직의 데이터를 중복 없이 관리해 불일치 최소화</td>
</tr>
<tr>
<td>시스템</td>
<td>IT 자원을 파악해 중복 투자 방지, 자원을 효율적으로 재분배</td>
</tr>
<tr>
<td>데이터 관리</td>
<td>통합·연계·중복 방안 수립의 기초 자료, 최상위 아키텍처 제공. 주제영역별로 분산 방법과 오너십을 정할 수 있음</td>
</tr>
<tr>
<td>데이터 설계</td>
<td>전사 데이터 영역을 한눈에 봄. 논리·물리 모델로 구체화할 때 방향 제공</td>
</tr>
</tbody>
</table>
</div>
<h3>① 주제영역 도출</h3>
<p>업무 자료나 현행 시스템의 주제영역을 참고해요.
- 예: 인터넷뱅킹 <strong>메뉴</strong>를 보고 도출 → 개인, 기업, 상품, 예금, ISA, 대출, 펀드, 보험, 외환, 퇴직연금, 입출금, 이체</p>
<h3>② 주제영역 분류</h3>
<p><strong>주제영역 프레임워크</strong> 📝 업무 규칙을 <strong>주어, 목적어, 동사</strong>로 보면 쉬워요.</p>
<div class="tw"><table>
<thead>
<tr>
<th>구분</th>
<th>📝 문장 성분</th>
<th>분류</th>
</tr>
</thead>
<tbody>
<tr>
<td>Who</td>
<td>주어</td>
<td><strong>주체</strong></td>
</tr>
<tr>
<td>What (How)</td>
<td>목적어</td>
<td><strong>대상 / 자원</strong></td>
</tr>
<tr>
<td>Where</td>
<td>장소</td>
<td><strong>장소</strong> 📝 본점, 지점, 출장소</td>
</tr>
<tr>
<td>Biz. Event (When/Why 포함)</td>
<td>동사</td>
<td><strong>약정 / 계약</strong></td>
</tr>
<tr>
<td>Additional Biz. Event, Status</td>
<td></td>
<td><strong>행위 / 이벤트 / 상태</strong></td>
</tr>
</tbody>
</table>
</div>
<ul>
<li><strong>핵심(Key) 데이터 주제영역</strong>: 비즈니스 주체와 대상, 지원 자원, 장소. 기능에 종속되지 않고, 중복 없이 식별 가능하게 도출</li>
<li><strong>중요(Main) 데이터 주제영역</strong>: 핵심 영역들이 관계한 사실을 바탕으로 상태·방법·행위를 설명하는 정보. 기능 목적과 정보 속성에 따라 분류</li>
</ul>
<p>📝 <strong>설계 = 동그라미(그룹화·통합) + 선긋기</strong></p>
<p><strong>인터넷뱅킹 분류 결과</strong></p>
<div class="tw"><table>
<thead>
<tr>
<th>분류</th>
<th>주제영역</th>
</tr>
</thead>
<tbody>
<tr>
<td>주체</td>
<td>개인, 기업</td>
</tr>
<tr>
<td>대상/자원</td>
<td>상품 (예금, 대출, 펀드 등)</td>
</tr>
<tr>
<td>약정/계약</td>
<td>예금, ISA, 대출, 펀드, 보험, 외환, 퇴직연금</td>
</tr>
<tr>
<td>행위 상세</td>
<td>입출금, 이체, 뱅킹관리</td>
</tr>
</tbody>
</table>
</div>
<h3>③ 주제영역의 상세화</h3>
<p>계층 상세화 기준은 <strong>데이터 측면(응집도)</strong>과 <strong>관리적 측면(업무)</strong>으로 나눠요. 일관된 원칙과 기준을 따라요.</p>
<div class="tw"><table>
<thead>
<tr>
<th>1레벨</th>
<th>2레벨</th>
<th>3레벨</th>
</tr>
</thead>
<tbody>
<tr>
<td>상품</td>
<td>상품기본</td>
<td>상품특징, 금리이율</td>
</tr>
<tr>
<td></td>
<td>약관</td>
<td></td>
</tr>
<tr>
<td>계약</td>
<td>수신</td>
<td></td>
</tr>
<tr>
<td></td>
<td>여신</td>
<td></td>
</tr>
</tbody>
</table>
</div>
<h3>④ 주제영역의 정의</h3>
<blockquote>
<p><strong>주제영역을 설명하고 데이터의 범위, 내용을 정의</strong></p>
</blockquote>
<p>📝 <strong>나누는 기준을 구분하기 위해 정의함. 큰 주제 → 쪼갬 → 나눠서 설계!!</strong></p>
<p><strong>주제영역도 (인터넷뱅킹)</strong>: 고객(고객기본, 고객부가) / 상품(상품기본, 약관/설명) / 계좌(계좌기본, 약정) / 예금(입출금, 이체) / 대출(담보, 상환) / ISA / 펀드 / 보험 / 외환 / 퇴직연금</p>
<p><strong>주제영역 정의서 예시</strong></p>
<div class="tw"><table>
<thead>
<tr>
<th>주제영역</th>
<th>하위 영역</th>
<th>정의</th>
<th>정보유형</th>
<th>주요 정보항목</th>
</tr>
</thead>
<tbody>
<tr>
<td>고객</td>
<td></td>
<td>인터넷뱅킹 홈페이지를 통해 회원 가입한 개인 또는 기업</td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td>고객기본</td>
<td>고객 기본정보 및 직장 정보</td>
<td>고객기본, 주소, 직장</td>
<td>생년월일, 연락처, 주소</td>
</tr>
<tr>
<td></td>
<td>고객부가</td>
<td>개인신용정보 등 부가사항에 대한 등록사항</td>
<td>개인신용정보 동의</td>
<td>이용기간, 동의여부</td>
</tr>
<tr>
<td>계좌</td>
<td></td>
<td>예금·대출·ISA 등 상품에 가입한 경우 계좌 및 약정 체결 정보</td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td>계좌기본</td>
<td>상품 가입에 따른 계좌 기본 내용</td>
<td>계좌</td>
<td>계좌번호, 상품번호, 해지</td>
</tr>
<tr>
<td></td>
<td>약정</td>
<td>상품 가입 약정 내용 및 변경 이력</td>
<td>약정내용, 이율</td>
<td>약정기간, 적용이율</td>
</tr>
</tbody>
</table>
</div>
<hr />
<h2 id="d-16">2-5. 핵심 엔티티 식별</h2>
<blockquote>
<p><strong>최하위 주제영역별로 핵심 엔티티를 도출 &amp; 식별</strong></p>
</blockquote>
<ul>
<li>최하위 주제영역은 <strong>하나 이상의 핵심 엔티티</strong>를 포함해야 해요. (너무 세분화했으면 통합)</li>
<li>업무, 주체, 대상, 자원, 장소, 계약, 주문, 입출금 등에 해당하는 엔티티</li>
</ul>
<p><strong>예시: 퇴직연금</strong></p>
<div class="tw"><table>
<thead>
<tr>
<th>주제영역</th>
<th>핵심 엔티티</th>
</tr>
</thead>
<tbody>
<tr>
<td>제도</td>
<td>확정급여형(DB), 확정기여형(DC), 개인형(IRP)</td>
</tr>
<tr>
<td>고객</td>
<td>사업장, 개인, 금융기관</td>
</tr>
<tr>
<td>상품</td>
<td>원리금보장형(예금), 투자형(펀드)</td>
</tr>
<tr>
<td>계약</td>
<td>운용관리, 자산관리</td>
</tr>
<tr>
<td>납입</td>
<td>부담금, 수수료</td>
</tr>
<tr>
<td>운용지시</td>
<td>운용신청, 교체매매</td>
</tr>
<tr>
<td>적립금</td>
<td>계약자, 가입자</td>
</tr>
<tr>
<td>지급</td>
<td>연금, 일시금</td>
</tr>
</tbody>
</table>
</div>
<h2 id="d-17">2-6. 식별자 및 속성 정의</h2>
<ul>
<li>모든 속성을 다 도출하지 않아도, <strong>식별자와 주요 속성을 먼저</strong> 정의해요.</li>
<li>이해 당사자와 의사소통하는 데 문제없을 정도면 충분해요.</li>
</ul>
<p>💡 개념 모델은 "대충 설계"라서 여기서 멈추고, 자세한 건 논리 모델링에서 채워요.</p>
<hr />
<h1 id="d-ch-3">3장. 논리 모델링</h1>
<h2 id="d-18">3-1. 논리 모델링이란?</h2>
<blockquote>
<p><strong>데이터를 명확하고 ⭐구체적으로 정의하는 과정</strong></p>
</blockquote>
<p>📝 <strong>개념 모델링(개략적, 대충) → 논리 모델링(구체적, 명확) → 물리</strong></p>
<ul>
<li>비즈니스 전체 영역에 대해 <strong>상세한 수준</strong>의 데이터 구조를 설계</li>
<li><strong>주제영역 단위</strong>로 진행. 모든 업무 특성을 빠짐없이 반영해야</li>
<li><strong>핵심 엔티티를 중심으로 하위 엔티티로 확장</strong>하면서 상세화</li>
<li><strong>DBMS의 물리적 특성은 고려하지 않는다.</strong></li>
<li>📝 → 이후 <strong>물리 모델링 단계에서 성능 저하를 확인하면</strong> 그때 조정 (JOIN이 많으면 역정규화 등)</li>
<li>개념 모델과 계속 구조적 일관성을 유지하며 진행</li>
</ul>
<hr />
<h2 id="d-19">3-2. ⭐ 핵심 엔티티 (Key Entity, 기준정보)</h2>
<blockquote>
<p>고객, 부서, 직원, 상품처럼 <strong>혼자서도 존재하는</strong> 엔티티
업무 행위의 <strong>주체</strong>이거나 <strong>대상</strong>이 되는 엔티티</p>
</blockquote>
<p>💡 특징: 다른 엔티티 없이도 존재(독립성), 자기만의 PK를 가짐, 다른 엔티티의 부모, 변경이 적은 기준(마스터) 데이터</p>
<div class="tw"><table>
<thead>
<tr>
<th>#</th>
<th>유형</th>
<th>의미</th>
<th>예시</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>유형 및 분류 (type &amp; category)</td>
<td>데이터를 구분하는 기준 코드</td>
<td>고객 유형 코드, 상품 분류(대/중/소)</td>
</tr>
<tr>
<td>2</td>
<td>업무규칙 및 지식 (rule &amp; knowledge)</td>
<td>업무가 따르는 규칙과 기준값</td>
<td>보험료 조건, 직급별 연봉, 환불 정책</td>
</tr>
<tr>
<td>3</td>
<td>업무주체 및 대상 (subject &amp; object)</td>
<td>행위를 하는 쪽과 받는 쪽</td>
<td>고객, 상품, 사원, 예금</td>
</tr>
<tr>
<td>4</td>
<td>장소 (where)</td>
<td>업무가 일어나는 곳</td>
<td>물류창고, 공장, 강의장</td>
</tr>
</tbody>
</table>
</div>
<p>💡 기억하는 법: "<strong>누가</strong>(3) <strong>어디서</strong>(4) <strong>무엇을</strong>(3) <strong>어떤 기준/규칙으로</strong>(1, 2) 하는가?"</p>
<p><strong>핵심 엔티티의 정의를 명확하게</strong>: 고객은 누구인가? 비회원도 고객인가? 외국인도 고객인가? 고객 등록에 필요한 최소 정보는?
💡 정의에 따라 식별자(외국인이면 주민번호 불가), 필수 속성(비회원이면 ID 필수 불가), 엔티티 분리 여부가 달라져요.</p>
<p>📝 <strong>핵심 엔티티 → 파생 엔티티: ① 상세 ② 상태 ③ 이력 ④ 교차</strong></p>
<hr />
<h2 id="d-20">3-3. ⭐ 파생 엔티티</h2>
<blockquote>
<p><strong>핵심 엔티티와 관련된 엔티티</strong> (상세, 상태, 이력, 교차 등)</p>
</blockquote>
<div class="tw"><table>
<thead>
<tr>
<th>#</th>
<th>파생 유형</th>
<th>언제 생기나</th>
<th>예시</th>
</tr>
</thead>
<tbody>
<tr>
<td>①</td>
<td>상세</td>
<td>하나가 여러 하위 항목을 가질 때 (1:N)</td>
<td>주문 → 주문상세</td>
</tr>
<tr>
<td>②</td>
<td>상태</td>
<td>진행 단계·현재 상태를 관리할 때</td>
<td>주문상태(접수·배송중·완료)</td>
</tr>
<tr>
<td>③</td>
<td>이력</td>
<td>과거 값의 변경 기록이 필요할 때</td>
<td>가격이력, 직급이력</td>
</tr>
<tr>
<td>④</td>
<td>교차</td>
<td>M:N 관계를 풀 때</td>
<td>학생 ↔ 과목 → 수강</td>
</tr>
</tbody>
</table>
</div>
<h3>ERD 예시: 품의 시스템</h3>
<div class="tw"><table>
<thead>
<tr>
<th>엔티티</th>
<th>파생 유형</th>
<th>PK</th>
<th>주요 속성</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>품의</strong></td>
<td>핵심</td>
<td>품의번호</td>
<td>품의제목, 품의내용, 품의일자, 품의금액</td>
</tr>
<tr>
<td>품의내역</td>
<td>① 상세</td>
<td>품의번호(FK) + 품의항목코드</td>
<td>품의수량, 품의단가</td>
</tr>
<tr>
<td>품의첨부파일</td>
<td>① 상세</td>
<td>품의번호(FK) + 첨부파일일련번호</td>
<td>첨부파일명</td>
</tr>
<tr>
<td>품의진행상태</td>
<td>② 상태</td>
<td>품의번호(FK) + 품의진행상태코드</td>
<td>품의처리일시</td>
</tr>
<tr>
<td>품의이력</td>
<td>③ 이력</td>
<td>품의번호(FK) + 품의이력일련번호</td>
<td>품의일자, 품의금액</td>
</tr>
<tr>
<td>품의거래처</td>
<td>④ 교차</td>
<td>품의번호(FK) + 거래처번호(FK)</td>
<td>계약금액</td>
</tr>
</tbody>
</table>
</div>
<p>💡 파생 엔티티는 모두 PK에 부모 키(품의번호)를 포함하는 <strong>식별 관계</strong>예요. 교차 엔티티는 두 부모의 키를 합쳐 PK로 쓰고, 계약금액처럼 그 조합에만 의미 있는 속성을 가져요.</p>
<hr />
<h2 id="d-21">3-4. ⭐ 이력 관리 방법</h2>
<blockquote>
<p>여러 방법 중에서 <strong>선택</strong>해서 조합해요.</p>
</blockquote>
<div class="tw"><table>
<thead>
<tr>
<th>선택지</th>
<th>A</th>
<th>B</th>
</tr>
</thead>
<tbody>
<tr>
<td>무엇을 기록?</td>
<td>① 속성 <strong>전체</strong> 이력</td>
<td>② 속성 <strong>일부</strong> 이력</td>
</tr>
<tr>
<td>시간 표현?</td>
<td>③ <strong>점</strong> 이력</td>
<td>④ <strong>선분</strong> 이력</td>
</tr>
<tr>
<td>현재 값 포함?</td>
<td>⑤ 최종 데이터 <strong>포함</strong></td>
<td>최종 데이터 <strong>미포함</strong></td>
</tr>
</tbody>
</table>
</div>
<p><strong>① 전체 vs ② 일부</strong>: 값이 하나라도 바뀌면 행 전체를 복사(전체) / 이력이 필요한 속성만 따로 관리(일부, 예: 가격만)</p>
<p><strong>③ 점 이력 vs ④ 선분 이력</strong></p>
<pre><code>-- 점 이력: 변경일자만 저장 → 4월 1일 현재 값
SELECT MAX(변경일자) FROM 과제이력 WHERE 변경일자 &lt;= '20190401'

-- 선분 이력: 시작일자~종료일자 저장 → 4월 1일 현재 값
WHERE 변경시작일자 &lt;= '20190401' AND 변경종료일자 &gt;= '20190401'
</code></pre>
<div class="tw"><table>
<thead>
<tr>
<th>구분</th>
<th>점 이력</th>
<th>선분 이력 📝 (<strong>가격</strong> 이력에 주로 사용)</th>
</tr>
</thead>
<tbody>
<tr>
<td>저장</td>
<td>변경일자</td>
<td>시작일자 + 종료일자</td>
</tr>
<tr>
<td>조회</td>
<td>MAX 서브쿼리 필요 (복잡, 느림)</td>
<td>범위 조건 하나 (간단, 빠름)</td>
</tr>
<tr>
<td>입력</td>
<td>새 행만 추가</td>
<td>새 행 추가 + 직전 행 종료일자 수정</td>
</tr>
</tbody>
</table>
</div>
<p>📝 현재 유효한 행의 종료일자는 <strong><code>'99991231'</code> (문자열)</strong>. NULL 대신 먼 미래 날짜를 넣어야 범위 조건 하나로 현재 값까지 조회돼요.</p>
<p><strong>⑤ 최종 데이터 포함 vs 미포함</strong>: 이력에 현재 값까지 넣으면 이력 테이블 하나로 전체 기간 조회 가능(대신 원본과 중복) / 안 넣으면 중복은 없지만 원본과 UNION 해야 전체가 보임</p>
<hr />
<h2 id="d-22">3-5. 엔티티의 도출 및 식별</h2>
<blockquote>
<p><strong>현행 데이터를 분석해서 엔티티로 구체화</strong></p>
</blockquote>
<ul>
<li>현업의 기능과 요구사항을 정의하면서 엔티티를 도출 &amp; 식별 (리버스 모델링)</li>
<li>현행 모델에서 불필요한 것을 식별해서 삭제</li>
<li>엔티티명, 관계선, 속성명을 정리하고 <strong>현업</strong>(📝 = <strong>최종 승인</strong>)과 인터뷰로 확정</li>
<li>엔티티 통합과 용어 통일</li>
</ul>
<p><strong>예시 1: 비슷한 엔티티 통합</strong>
- 근로자, 고객, 거래처가 각각 따로 있음 → <code>고객</code>으로 통합 (내외국인구분코드, 사업자구분코드 등으로 구분)</p>
<p><strong>예시 2: 이름 통일</strong> 📝 <strong>이름은 최대한 자세히!</strong></p>
<div class="tw"><table>
<thead>
<tr>
<th>엔티티</th>
<th>속성명 (전)</th>
<th>컬럼명 (전)</th>
<th>속성명 (후)</th>
</tr>
</thead>
<tbody>
<tr>
<td>예산</td>
<td>진행상태</td>
<td>STAT</td>
<td><strong>예산진행상태코드</strong></td>
</tr>
<tr>
<td>입찰</td>
<td>상태코드</td>
<td>STAT</td>
<td><strong>입찰상태코드</strong></td>
</tr>
<tr>
<td>계약</td>
<td>상태코드</td>
<td>STATECD</td>
<td><strong>계약상태코드</strong></td>
</tr>
<tr>
<td>결재</td>
<td>상태코드</td>
<td>STATUS</td>
<td><strong>결재상태코드</strong></td>
</tr>
</tbody>
</table>
</div>
<p>📝 물리 이름(컬럼명)도 제각각이었던 것을 통일해요.</p>
<hr />
<h2 id="d-23">3-6. 엔티티 정의</h2>
<blockquote>
<p><strong>데이터 집합을 규정하고, 발생 규칙, 업무 규칙, 설명을 기술</strong></p>
</blockquote>
<ul>
<li><strong>독립 엔티티</strong>: 주민번호, 상품번호 같은 <strong>식별자 중심</strong>으로 정의</li>
<li><strong>종속 엔티티</strong>: 엔티티 간 관계를 파악해서 <strong>집합 단위</strong> 또는 <strong>데이터 발생 기준</strong>을 정의</li>
</ul>
<p><strong>정의하는 3가지 방법</strong>
1. 엔티티 자체만으로 정의
2. 엔티티가 관리하는 속성 중심으로 정의
3. 다른 엔티티와의 관계를 바탕으로 정의</p>
<hr />
<h2 id="d-24">3-7. 엔티티 통합 (일반화와 특수화)</h2>
<div class="tw"><table>
<thead>
<tr>
<th>구분</th>
<th>📝 메모</th>
<th>의미</th>
<th>예시</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>일반화</strong></td>
<td><strong>추상화</strong></td>
<td>공통 속성을 상위 엔티티로 통합</td>
<td>개인고객 + 법인고객의 공통(고객명, 주소) → <strong>고객</strong></td>
</tr>
<tr>
<td><strong>특수화</strong></td>
<td><strong>자세히</strong>(구체화)</td>
<td>하위 엔티티에는 개별 속성만</td>
<td>개인고객(주민등록번호), 법인고객(법인등록번호, 대표자명)</td>
</tr>
</tbody>
</table>
</div>
<p><strong>예시</strong>
- <code>고객</code>(고객번호, 고객명, 고객주소, 고객유형코드) → <code>개인고객</code>, <code>법인고객</code>
- <code>상품</code>(상품번호, 상품명, 상품분류코드, 공급업체번호) → <code>일반상품</code>(제조사, 규격, 무게), <code>도서상품</code>(ISBN, 저자명, 출판사), <code>여행상품</code>(여행기간, 출발일자)</p>
<p>💡 1장의 <strong>슈퍼타입/서브타입</strong>과 <strong>고객 설계 ③</strong>이 바로 이거예요.</p>
<h2 id="d-25">3-8. 데이터 통합</h2>
<blockquote>
<p><strong>데이터의 분류체계, 식별체계, 속성체계를 일원화하는 과정</strong></p>
</blockquote>
<div class="tw"><table>
<thead>
<tr>
<th>체계</th>
<th>내용</th>
<th>예시</th>
</tr>
</thead>
<tbody>
<tr>
<td>분류체계 일원화</td>
<td>같거나 비슷한 데이터를 같은 유형으로 분류</td>
<td>고객 → 개인, 법인, 사업자, 임의단체 / 상품 → 전자, 의류, 식품</td>
</tr>
<tr>
<td>식별체계 일원화</td>
<td>같은 분류 안의 데이터를 유일하고 중복 없이 식별</td>
<td>개인: 주민번호·외국인등록번호·여권번호 / 법인: 사업자등록번호·법인번호</td>
</tr>
<tr>
<td>속성체계 일원화</td>
<td>같은 분류 안의 데이터는 관리 속성도 같거나 비슷하게</td>
<td>고객 공통: 고객명, 주소/연락처</td>
</tr>
</tbody>
</table>
</div>
<hr />
<h2 id="d-26">3-9. 관계 도출 및 정의</h2>
<blockquote>
<p><strong>엔티티 간의 관계: 종속 관계, 참조 관계</strong></p>
</blockquote>
<ul>
<li>행위의 주체, 대상, 상세, 인과, 역할/자격, 구성, ⭕<strong>참조 관계</strong> 등으로 구분</li>
<li>두 엔티티 간 관계를 <strong>양방향</strong>으로 정의: 관계수, 선택성, 식별자 상속</li>
<li>관계가 명확하지 않으면 <strong>관계명</strong>(명사, 동사)을 추가 📝 (<strong>보통은 안 적음</strong>)</li>
</ul>
<p><strong>예시: 부서 ─ 사원</strong> (두 관계가 동시에 있는 병렬 관계)
- <code>소속부서</code>: 부서 1 ─ N 사원 (사원.부서번호 FK)
- <code>부서장</code>: 부서 1 ─ 1 사원 (부서.부서장사원번호 FK)</p>
<h2 id="d-27">3-10. 속성 도출 및 정의</h2>
<ul>
<li>속성의 정의, 이름, 설명, 필수 여부, 데이터 타입, 데이터 범위 등을 정의</li>
<li>속성이 만족해야 하는 조건, 참조, 필수/선택 여부를 정의</li>
<li>이름은 <strong>이해하기 쉽게 자세히</strong>, 주제영역 안에서 <strong>같은 의미</strong>를 가져야</li>
<li>이름만으로 설명이 어려우면 별도 설명으로 상세히 기술</li>
</ul>
<hr />
<h2 id="d-28">3-11. 식별자 지정</h2>
<ul>
<li>식별자의 특성(<strong>유일성, 존재성, 불변성, 최소성</strong>)에 맞는 속성을 선택</li>
<li>⭕<strong>존재성(Not Null)</strong>과 ⭕<strong>유일성(Unique)</strong> 제약 조건을 추가</li>
</ul>
<h3>본질 식별자 vs 인조 식별자: <strong>인조 식별자를 쓰는 경우</strong></h3>
<ol>
<li><strong>엔티티를 통합할 때 공통 식별자가 없을 때</strong></li>
<li><strong>복합키를 단순하게 할 때</strong></li>
<li>개인정보 암호화 대상일 때</li>
<li>업무상 편의를 위해</li>
</ol>
<p><strong>예시 ①: 공통 식별자가 없을 때</strong></p>
<div class="tw"><table>
<thead>
<tr>
<th>거래처번호 (인조키)</th>
<th>거래처명</th>
<th>사업자등록번호</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>비투엔</td>
<td>2208612345</td>
</tr>
<tr>
<td>2</td>
<td>서울데이터</td>
<td>NULL → 나중에 입력</td>
</tr>
</tbody>
</table>
</div>
<p>📝 사업자등록번호를 <strong>key</strong>로 쓰고 싶지만, 사업자번호를 모르면 등록(접근)할 수 없어요. ⇒ <strong>Key로 못 쓰고 인조키 활용</strong></p>
<p><strong>예시 ②: 복합키 단순화</strong>
- <code>입찰</code>(입찰번호) → <code>입찰업체</code>(입찰번호 + 입찰업체번호) → <code>입찰내역</code>(입찰번호 + 입찰업체번호 + 입찰상품번호)
- 아래로 갈수록 PK가 계속 길어짐 → 📝 <strong>이 경우 키는 시퀀스 활용</strong></p>
<p><strong>예시 ③: 암호화 대상</strong>
- 카드번호는 암호화해서 저장하므로(<code>카드번호암호화</code>) PK로 쓰기 어려움 → <code>카드관리번호</code>(1, 2, ...)를 인조키로</p>
<p>📝 <strong>"키로 써야 하는데 안 될 때 인조 식별자로 활용"</strong></p>
<hr />
<h2 id="d-29">3-12. 도메인 및 데이터 타입 지정</h2>
<blockquote>
<p><strong>속성 값의 타입과 범위, 조건을 지정</strong></p>
</blockquote>
<ul>
<li>선택성(필수 여부: not null / null) 지정</li>
<li>속성에 맞는 타입과 길이를 <strong>일관되게</strong> 지정. 문자열은 넉넉히 (예: <code>varchar(200)</code>)</li>
<li>입력값이 없을 때 쓸 <strong>default 값</strong> 지정</li>
<li>⚠️ <code>default 0</code> 때문에 <strong>평균값이 달라질 수 있음</strong>에 주의</li>
<li>💡 NULL은 AVG 계산에서 빠지지만 0은 포함돼요. 값이 "없음"인지 "0"인지 구분해야 해요.</li>
</ul>
<h2 id="d-30">3-13. 데이터 모델 검토</h2>
<blockquote>
<p><strong>요구사항이 모두 반영되었는지, 오류는 없는지 검토</strong></p>
</blockquote>
<div class="tw"><table>
<thead>
<tr>
<th>검토 방법</th>
<th>내용</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>자체 검토</strong></td>
<td>체크리스트 작성 및 확인</td>
</tr>
<tr>
<td><strong>동료 검토</strong></td>
<td>다른 사람과 질문·답변으로 제3자 확인</td>
</tr>
<tr>
<td><strong>이해관계자 리뷰</strong></td>
<td>현업, 현업 운영자 등에게 설명하고 의견 반영</td>
</tr>
<tr>
<td><strong>산출물을 통한 검토</strong></td>
<td>요구사항 추적표 등 산출물로 검토</td>
</tr>
</tbody>
</table>
</div>
<hr />
<h2 id="d-31">3-14. 데이터 표준화</h2>
<blockquote>
<p><strong>속성의 명칭, 의미, 데이터 형식, 범위 등에 대한 규정</strong>
표준을 지키면 명칭과 타입에 일관성이 생겨서 의사소통과 개발 생산성이 올라가요.</p>
</blockquote>
<p><strong>표준의 구성</strong></p>
<pre><code>[표준단어]  유사어(금칙어) / 기본단어 / 분류단어
     ↓
[표준용어] = 주제어 + 수식어 + 분류어
             &quot;배송&quot; + &quot;고객&quot; + &quot;전화번호&quot;  →  배송고객전화번호 / VARCHAR(20)
     ↑
[표준도메인] 도메인(그룹/도메인명) + 인포타입(데이터타입/길이)
</code></pre>
<h3>① 단어 표준화</h3>
<ul>
<li>엔티티·속성 이름에 <strong>표준화된 단어</strong>를 써서 의사소통 향상</li>
<li>단어를 표준화해서 <strong>단어사전</strong> 작성</li>
</ul>
<div class="tw"><table>
<thead>
<tr>
<th>단어</th>
<th>정의</th>
<th>영문단어</th>
<th>영문약어</th>
<th>동의어</th>
<th>단어유형</th>
</tr>
</thead>
<tbody>
<tr>
<td>고객</td>
<td>상점, 식당, 은행 따위에서 물건을 사거나 서비스를 받는 사람</td>
<td>customer</td>
<td>CUST</td>
<td></td>
<td>기본단어</td>
</tr>
<tr>
<td>전화번호</td>
<td>가입된 전화마다 매겨져 있는 고유 번호</td>
<td>phone number</td>
<td>TELNO</td>
<td></td>
<td>분류단어</td>
</tr>
<tr>
<td>협력업체</td>
<td>...</td>
<td></td>
<td></td>
<td></td>
<td>기본단어</td>
</tr>
<tr>
<td>하청업체</td>
<td>...</td>
<td></td>
<td></td>
<td>협력업체</td>
<td><strong>금칙어</strong></td>
</tr>
</tbody>
</table>
</div>
<h3>② 표준단어 관리 기준</h3>
<p>표준화할 때 <strong>관리 기준과 명명 규칙을 먼저</strong> 정해야 해요.</p>
<div class="tw"><table>
<thead>
<tr>
<th>구분</th>
<th>기준</th>
<th>예시</th>
</tr>
</thead>
<tbody>
<tr>
<td>명명규칙</td>
<td>한글·영문·숫자만 사용, 영문은 대문자. 특수문자·띄어쓰기 X</td>
<td>협력 업체 → 협력업체, Url → URL</td>
</tr>
<tr>
<td></td>
<td>명사 원칙. 동사·형용사 X (예외는 표준 담당자와 협의)</td>
<td>고객의 → 고객, 사용할 → 사용+예정</td>
</tr>
<tr>
<td>외래어 표기</td>
<td>같은 뜻의 한글 단어가 있으면 한글 우선</td>
<td>패스워드 → 비밀번호, Service → 서비스</td>
</tr>
<tr>
<td>동음이의어</td>
<td>허용 X. 덜 쓰는 쪽을 다른 단어나 복합어로 대체</td>
<td>통화(Call) → 통화, 통화(Currency) → 통화량</td>
</tr>
<tr>
<td>이음동의어</td>
<td>허용 X. 많이 쓰거나 순화된 단어로 대체</td>
<td>에러/오류 → 오류, 최종/마지막 → 최종, 구좌/계좌 → 계좌</td>
</tr>
</tbody>
</table>
</div>
<h3>③ 영문 약어 명명 기준</h3>
<p>속성을 컬럼 이름으로 <strong>일관성 있게</strong> 바꾸는 기준이에요.</p>
<div class="tw"><table>
<thead>
<tr>
<th>기준</th>
<th>예시</th>
</tr>
</thead>
<tbody>
<tr>
<td>대문자 사용, 언더바(_) 외 특수문자 X</td>
<td>전화번호: TELNO, TEL_NO</td>
</tr>
<tr>
<td>가급적 4자리 이하, 최대 6자리</td>
<td>고객: CUST, 서비스: SVC</td>
</tr>
<tr>
<td>국내외 표준·통상 약어는 그대로</td>
<td>수요일: WED, 수량: QTY, URL, SQL</td>
</tr>
<tr>
<td>영문 앞자리로 축약하거나 자음 기준 축약</td>
<td>Customer: CUST, Count: CNT</td>
</tr>
<tr>
<td>한글 발음대로 영문 표기 X (단, 시·군·구·읍·면·동은 예외)</td>
<td>INSA → HR, GOGAEG → CUST, 동: DONG</td>
</tr>
</tbody>
</table>
</div>
<h3>④ 도메인 표준화</h3>
<p>자주 쓰는 도메인은 <strong>미리 정해놓고 일관되게</strong> 사용해요.</p>
<div class="tw"><table>
<thead>
<tr>
<th>도메인 그룹</th>
<th>도메인명</th>
<th>설명</th>
<th>인포타입명</th>
<th>데이터타입</th>
</tr>
</thead>
<tbody>
<tr>
<td>식별자</td>
<td>고객번호</td>
<td>고객 식별자, 시스템에서 8자리 부여</td>
<td>고객번호VC8</td>
<td>VARCHAR(8)</td>
</tr>
<tr>
<td>식별자</td>
<td>번호</td>
<td>고유번호, 문서번호 등</td>
<td>번호VC6 / 번호VC8</td>
<td>VARCHAR(6) / (8)</td>
</tr>
<tr>
<td>코드</td>
<td>코드</td>
<td>공통코드 및 목록코드</td>
<td>결재상태코드C2 / 성별코드C1</td>
<td>CHAR(2) / CHAR(1)</td>
</tr>
<tr>
<td>코드</td>
<td>여부</td>
<td>예/아니오</td>
<td>여부C1</td>
<td>CHAR(1) 'Y'/'N'</td>
</tr>
<tr>
<td>명칭</td>
<td>명</td>
<td>이름, 제목 등</td>
<td>명VC20</td>
<td>VARCHAR(20)</td>
</tr>
<tr>
<td>내용</td>
<td>내용</td>
<td>내용, 비고, 적요 등</td>
<td>내용VC200</td>
<td>VARCHAR(200)</td>
</tr>
<tr>
<td>날짜</td>
<td>일자</td>
<td>일자, 일시, 분, 초 등</td>
<td>일자D</td>
<td>DATE ('YYYYMMDD')</td>
</tr>
<tr>
<td>수량</td>
<td>수</td>
<td>수, 건수, 량, 값 등</td>
<td>수N6</td>
<td>NUMBER(6)</td>
</tr>
<tr>
<td>금액</td>
<td>금액</td>
<td>금액, 단가, 수수료 등</td>
<td>금액N15</td>
<td>NUMBER(15)</td>
</tr>
<tr>
<td>비율</td>
<td>율</td>
<td>율, 비율, 점유율 등</td>
<td>율N5,2</td>
<td>NUMBER(5,2)</td>
</tr>
</tbody>
</table>
</div>
<h3>⑤ ⭐ 코드 표준화</h3>
<blockquote>
<p><strong>값을 코드로 목록화하여 관리</strong></p>
</blockquote>
<ul>
<li>값을 코드로 관리하면 <strong>잘못된 값 입력을 막고</strong>, <strong>통계 작업에도 유리</strong>해요.</li>
<li>가능하면 여러 코드 테이블을 <strong>하나로 묶어서 코드 사전</strong>으로 관리해요.</li>
</ul>
<p><strong>코드 사전 예시</strong></p>
<div class="tw"><table>
<thead>
<tr>
<th>코드유형ID</th>
<th>코드유형명</th>
<th>코드</th>
<th>코드명</th>
<th>정렬순서</th>
<th>사용여부</th>
</tr>
</thead>
<tbody>
<tr>
<td>C001</td>
<td>결재상태</td>
<td>01</td>
<td>기안</td>
<td>1</td>
<td>Y</td>
</tr>
<tr>
<td>C001</td>
<td>결재상태</td>
<td>02</td>
<td>승인</td>
<td>2</td>
<td>Y</td>
</tr>
<tr>
<td>D001</td>
<td>결재수단</td>
<td>01</td>
<td>신용카드</td>
<td>1</td>
<td>Y</td>
</tr>
<tr>
<td>D001</td>
<td>결재수단</td>
<td>02</td>
<td>계좌이체</td>
<td>2</td>
<td>N</td>
</tr>
</tbody>
</table>
</div>
<p>💡 <code>코드유형ID + 코드</code>가 PK예요. 결재상태 테이블, 결재수단 테이블을 따로 만들지 않고 하나로 관리하는 방식이에요. <code>사용여부</code>로 더 이상 쓰지 않는 코드를 삭제하지 않고 비활성화할 수 있어요.</p>
<h3>⑥ 코드 체계의 종류</h3>
<div class="tw"><table>
<thead>
<tr>
<th>코드 체계</th>
<th>설명</th>
<th>예시</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>분류형</strong></td>
<td>대/중/소 계층 구조, 자릿수에 의미 부여</td>
<td>한국표준산업분류: 01 농업, 011 작물 재배업, 0111 곡물 재배업, 012 축산업</td>
</tr>
<tr>
<td><strong>일련번호형</strong></td>
<td>의미 없는 번호를 순서대로 부여. 길이만큼 앞에 '0'을 채움</td>
<td>고객유형: 01 개인, 02 법인, 99 기타</td>
</tr>
<tr>
<td><strong>약어형</strong></td>
<td>의미 있는 영문 약어로 부여</td>
<td>성별: M 남자, F 여자</td>
</tr>
<tr>
<td><strong>차용형</strong></td>
<td>일반적으로 통용되는 코드를 그대로 사용</td>
<td>은행코드: 001 한국은행, 002 산업은행, 003 기업은행</td>
</tr>
</tbody>
</table>
</div>
<h3>⑦ 용어 표준화</h3>
<p>명칭(한글, 영문), 용어 정의, 도메인을 <strong>미리 정의</strong>해서 사용해요.</p>
<div class="tw"><table>
<thead>
<tr>
<th>용어</th>
<th>영문약어</th>
<th>용어 정의</th>
<th>도메인</th>
<th>인포타입</th>
</tr>
</thead>
<tbody>
<tr>
<td>고객전화번호</td>
<td>CUST_TELNO</td>
<td>집전화번호 또는 휴대전화번호</td>
<td>전화번호</td>
<td>전화번호VC20</td>
</tr>
<tr>
<td>제품모델명</td>
<td>PROD_MDL_NM</td>
<td>제품에 표시된 제조사 모델명</td>
<td>명</td>
<td>명VC100</td>
</tr>
<tr>
<td>보증보험금액</td>
<td>GUAR_INSUR_AMT</td>
<td>보증보험에 가입한 금액</td>
<td>금액</td>
<td>금액N15</td>
</tr>
<tr>
<td>최초등록일시</td>
<td>FST_REG_DTM</td>
<td>시스템에 데이터가 입력된 일시</td>
<td>일시</td>
<td>일시D</td>
</tr>
</tbody>
</table>
</div>
<p>💡 <strong>단어 → 용어 → 컬럼명</strong>으로 이어져요. "고객" + "전화번호" 단어를 조합해 "고객전화번호" 용어를 만들고, 영문약어 CUST + TELNO로 컬럼명 <code>CUST_TELNO</code>가 나오는 거예요.</p>
<hr />
<h2 id="d-32">✅ 1~3장 흐름 한 장 요약</h2>
<ol>
<li><strong>1장 이론</strong>: 업무 자료를 <strong>그룹화(네모)</strong>하고 <strong>줄긋기(관계)</strong>하면 ER 모델이 된다. 구성요소는 엔티티·관계·속성·식별자. 중복은 <strong>정규화(쪼개기)</strong>로 없애고, 성능이 필요하면 <strong>역정규화(다시 붙이기)</strong>한다.</li>
<li><strong>2장 개념 모델링 (대충)</strong>: 현행을 분석(AS-IS → TO-BE)하고, 데이터를 <strong>주제영역</strong>으로 크게 나눈 뒤(주어·목적어·동사), 영역마다 <strong>핵심 엔티티</strong>와 식별자·주요 속성만 잡는다.</li>
<li><strong>3장 논리 모델링 (구체적)</strong>: 핵심 엔티티에서 <strong>파생 엔티티(상세·상태·이력·교차)</strong>로 확장하고, 엔티티·관계·속성·식별자·도메인을 모두 정의한 뒤 검토한다. 모든 이름과 타입은 <strong>데이터 표준(단어·용어·도메인·코드)</strong>을 따른다.</li>
<li><strong>4장 물리 모델링 (다음 시간)</strong>: 논리 모델을 실제 DB 테이블로 바꾸고, 성능을 위해 역정규화 등을 한다.</li>
</ol>
`;
