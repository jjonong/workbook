// DB 모델링 핵심 정리 탭 (HTML)
var WDB = window.WDB = window.WDB || {};
WDB.cheat = String.raw`
<h1 id="dc-0">DB 모델링 핵심 정리</h1>
<p>시험 직전에 훑어보는 용어·규칙 모음이에요. 위 검색창에 낱말(예: 식별자, 정규형, 이력, 주제영역, 코드)을 넣으면 맞는 줄만 남아요. 자세한 설명은 <a href="#db" data-goto="db">개념 정리</a> 탭을 보세요.</p>
<h1 id="dc-ch-0">전체 흐름</h1>
<h2 id="dc-1">모델링 단계</h2>
<div class="tw"><table><thead><tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>모델링 순서</td><td>현행 분석 → 방향성 수립 → <b>개념</b> → <b>논리</b> → 물리</td><td>분석(현재·미래) / 설계(개념·논리·물리), 바닥에 데이터 표준</td></tr>
<tr><td>개념 모델링</td><td><b>개략적</b>(대충) 설계: 주제영역 정의, 핵심 엔티티 정의</td><td>추상적</td></tr>
<tr><td>논리 모델링</td><td><b>구체적</b>(명확) 설계: 엔티티·관계·속성 정의</td><td>DBMS 물리 특성은 고려 X</td></tr>
<tr><td>물리 모델링</td><td>DB에 맞게 구현: 테이블, 무결성, 인덱스 설계</td><td>성능 저하 확인 시 역정규화</td></tr>
<tr><td>데이터 표준</td><td>표준단어, 표준용어, 표준도메인, 표준코드 → Repository</td><td>모든 단계에 적용</td></tr>
</tbody>
</table>
</div>
<h1 id="dc-ch-1">1장 데이터 모델링 이론</h1>
<h2 id="dc-2">데이터 모델링 기본</h2>
<div class="tw"><table><thead><tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>데이터 모델링</td><td>실제 업무를 분석하여 데이터 모델로 만드는 것</td><td></td></tr>
<tr><td>데이터 모델</td><td>데이터를 그룹화하고 그룹 간 관계를 표현한 것(ER Model)</td><td></td></tr>
<tr><td>작업 순서</td><td>현행 업무 파악 → 개념 정리·분류 → 엔티티·속성·관계로 형상화</td><td>현업 인터뷰, 업무 지침서, 용어집, 산출물</td></tr>
<tr><td>모델링 방법(필기)</td><td>① 화면 캡처 → ② 컬럼 수집 → ③ 컬럼 그룹화</td><td>그룹화(네모) - 줄긋기(관계)</td></tr>
<tr><td>반복 컬럼</td><td>상품명1, 상품명2… → 별도 엔티티(주문상품)로 분리</td><td>정규화의 출발점</td></tr>
<tr><td>쪼개기 / 다시 붙이기</td><td>정규화 → 조회 시 JOIN 필요 / 역정규화 → 성능↑</td><td></td></tr>
</tbody>
</table>
</div>
<h2 id="dc-3">ER 모델 질적 특성</h2>
<div class="tw"><table><thead><tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>완전성</td><td>모든 업무 요구사항을 표현</td><td></td></tr>
<tr><td>정확성</td><td>규칙에 맞게 정확히 작성</td><td></td></tr>
<tr><td>최소성</td><td>불필요한 중복이 없어야</td><td></td></tr>
<tr><td>자명성</td><td>누구나 이해하기 쉽게 의미를 명확히</td><td></td></tr>
<tr><td>확장성</td><td>업무 확대·변경이 어렵지 않게</td><td></td></tr>
<tr><td>표현성</td><td>요구사항을 자연스럽게, 표준 용어 사용</td><td></td></tr>
<tr><td>가독성</td><td>읽기 쉽게 표현</td><td></td></tr>
</tbody>
</table>
</div>
<h2 id="dc-4">ER 구성요소</h2>
<div class="tw"><table><thead><tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>엔티티(Entity)</td><td>실존(고객, 상품) 또는 개념적인 것(주문, 결제)</td><td>≒ class, 네모. 인스턴스 2개↑, 속성 2개↑</td></tr>
<tr><td>관계(Relationship)</td><td>엔티티 간 연결</td><td>줄긋기</td></tr>
<tr><td>속성(Attribute)</td><td>데이터를 표현하는 가장 작은 단위</td><td>≒ 인스턴스 변수</td></tr>
<tr><td>식별자(Identifier)</td><td>행을 개별적으로 식별하는 속성</td><td>PK</td></tr>
</tbody>
</table>
</div>
<h2 id="dc-5">엔티티 분류 (형태·생성 관점을 주로 사용)</h2>
<div class="tw"><table><thead><tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>엔티티 관계</td><td>강한(Strong) / 약한(Weak)</td><td>약한: 다른 엔티티가 있어야 존재</td></tr>
<tr><td>엔티티 형태</td><td>독립(Kernel, Master) / 업무중심(Transaction) / 종속(Dependent) / 교차(Associative)</td><td>독립 ↔ 종속</td></tr>
<tr><td>엔티티 생성 관점</td><td>핵심(Key) / 중요(Main) / 행위(Action)</td><td></td></tr>
<tr><td>엔티티 유무형</td><td>실체(Tangible) / 비실체: 개념(Conceptual), 사건(Event)</td><td></td></tr>
<tr><td>예시: 고객·상품</td><td>강한, 독립, 핵심, 실체</td><td></td></tr>
<tr><td>예시: 주문</td><td>강한, 업무중심, 중요, 사건</td><td></td></tr>
<tr><td>예시: 주문상품</td><td>약한, 종속·교차, 행위, 사건</td><td></td></tr>
</tbody>
</table>
</div>
<h2 id="dc-6">관계 표기 (Barker vs IE)</h2>
<div class="tw"><table><thead><tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>관계수</td><td>Barker: 표시 없으면 1, 까마귀발 M / IE: Bar 1, 까마귀발 M</td><td>1:1, 1:M, M:N</td></tr>
<tr><td>선택성(필수/선택)</td><td>Barker: 상대쪽 점선 Optional, 실선 Mandatory / IE: Bar Mandatory, ○ Optional(자기 편)</td><td></td></tr>
<tr><td>식별자 상속</td><td>Barker: Bar 있으면 식별 / IE: 실선 식별, 점선 비식별</td><td></td></tr>
<tr><td>관계 읽는 순서</td><td>① 관계수 ② 선택성 ③ 식별자 상속 ④ 관계 동사</td><td></td></tr>
<tr><td>M:N 해소</td><td>중간에 교차 엔티티(수강, 주문상품)를 두어 1:M 두 개로</td><td></td></tr>
<tr><td>필수-선택</td><td>고객-주문: 주문에는 고객이 반드시, 고객은 주문 없어도 됨</td><td></td></tr>
<tr><td>선택-선택</td><td>사원-계좌(소개사원): 양쪽 다 없어도 됨</td><td></td></tr>
</tbody>
</table>
</div>
<h2 id="dc-7">식별/비식별 관계와 관계 유형</h2>
<div class="tw"><table><thead><tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>식별 관계</td><td>부모 PK가 자식에서 PK이면서 FK</td><td>고객 → 고객주소(고객번호+연락처일련번호)</td></tr>
<tr><td>비식별 관계</td><td>부모 PK가 자식에서 일반 속성(FK)으로만</td><td>고객 → 주문(주문번호 PK, 고객번호 FK)</td></tr>
<tr><td>인조 식별자 + 비식별</td><td>식별 관계를 인조 PK로 끊음</td><td>고객주소번호 PK, 고객번호 FK</td></tr>
<tr><td>기본 관계</td><td>엔티티 ─ 엔티티</td><td></td></tr>
<tr><td>재귀적 관계</td><td>자기 자신을 참조(부서.상위부서번호)</td><td>계층(위아래), 상사 찾기 → self join</td></tr>
<tr><td>병렬 관계</td><td>두 엔티티 사이 관계가 여러 개(계약자, 피보험자, 수익자)</td><td>역할이 늘면 계약당사자 엔티티 추가</td></tr>
<tr><td>슈퍼타입/서브타입</td><td>공통은 슈퍼, 개별은 서브(고객 → 개인고객, 법인고객)</td><td>고객유형코드로 구분</td></tr>
</tbody>
</table>
</div>
<h2 id="dc-8">속성</h2>
<div class="tw"><table><thead><tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>속성명</td><td>의미를 정확히 표현하는 명사, 표준 단어 조합</td><td></td></tr>
<tr><td>옵셔널리티</td><td>NOT NULL = 필수, NULL = 선택</td><td>한글이름 필수, 영문이름 선택</td></tr>
<tr><td>도메인</td><td>속성의 타입과 범위</td><td>학년: 숫자, 1~4</td></tr>
<tr><td>단순 vs 복합</td><td>주소 = 기본주소 + 상세주소</td><td>column 합치기/나누기 문제</td></tr>
<tr><td>저장 vs 파생</td><td>주문금액 = 단가 × 수량</td><td>저장: I/O, 조회 빠름, update 필요 / 파생: CPU 계산</td></tr>
<tr><td>단일 vs 다중 값</td><td>취미 = 수영, 독서</td><td>row로 분리 → 1정규형</td></tr>
</tbody>
</table>
</div>
<h2 id="dc-9">식별자</h2>
<div class="tw"><table><thead><tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>PK</td><td>NN(Not Null) + UQ(Unique)</td><td>바꾸지 않는 게 좋을 뿐 바꿀 수는 있음</td></tr>
<tr><td>유일성</td><td>엔티티 안에서 구별 가능</td><td></td></tr>
<tr><td>최소성</td><td>최소한의 속성으로</td><td>고객구분+고객번호에서 고객번호만으로 유일 → 위반</td></tr>
<tr><td>불변성</td><td>값이 바뀌지 않아야</td><td>PK에 유효종료일자 → 위반</td></tr>
<tr><td>존재성</td><td>값이 반드시 있어야</td><td></td></tr>
<tr><td>본질 식별자</td><td>데이터 의미가 있는 식별</td><td>주문내역: 주문번호+상품코드</td></tr>
<tr><td>인조 식별자</td><td>임의로 숫자 매긴 것</td><td>주문번호+주문일련번호, 같은 상품 중복 가능 → UNIQUE 추가</td></tr>
<tr><td>주 / 대체 식별자</td><td>사원번호 / 주민등록번호</td><td></td></tr>
</tbody>
</table>
</div>
<h2 id="dc-10">관계형 모델·키·제약</h2>
<div class="tw"><table><thead><tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>릴레이션</td><td>테이블. 스키마(릴레이션명+어트리뷰트), 인스턴스(튜플=row)</td><td></td></tr>
<tr><td>슈퍼키</td><td>키로 쓸 수 있는 모든 조합(최소성 X)</td><td>사원번호+사원명</td></tr>
<tr><td>후보키</td><td>기본키가 될 수 있는 키</td><td>사원번호, 주민등록번호</td></tr>
<tr><td>기본키 / 대체키</td><td>후보키 중 선택한 것 / 나머지</td><td>슈퍼키 ⊃ 후보키 = 기본키 + 대체키</td></tr>
<tr><td>키 제약(PK)</td><td>PK 중복 확인</td><td></td></tr>
<tr><td>실체 무결성</td><td>NOT NULL 확인</td><td></td></tr>
<tr><td>영역 무결성</td><td>값의 타입·범위 확인</td><td></td></tr>
<tr><td>참조 무결성(FK)</td><td>참조하는 값이 실제 존재하는지</td><td></td></tr>
</tbody>
</table>
</div>
<h2 id="dc-11">함수 종속과 정규화</h2>
<div class="tw"><table><thead><tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>완전 함수종속</td><td>X → Y</td><td>고객번호 → 고객명, 주소</td></tr>
<tr><td>부분 함수종속</td><td>(X,Y) → Z 인데 Y → Z</td><td>(주문번호, 상품코드) → 상품명</td></tr>
<tr><td>이행 함수종속</td><td>X → Y, Y → Z ⇒ X → Z</td><td>주문번호 → 고객번호 → 고객명</td></tr>
<tr><td>정규화</td><td>테이블 쪼개기, why? 중복 제거</td><td>더 이상 못 쪼갤 때까지(1~6정규형)</td></tr>
<tr><td>정규화 효과</td><td>이상 현상↓, 유연성·재사용성↑, 변경 작업↓, 저장 공간↓</td><td>조회 성능 저하 시 역정규화</td></tr>
<tr><td>제1정규형</td><td>속성 값은 단일 값(원자성)</td><td>전화번호1·2 컬럼, 한 칸에 여러 번호 X</td></tr>
<tr><td>제2정규형</td><td>부분 종속 해소</td><td>주문내역의 상품명·단가 → 상품으로</td></tr>
<tr><td>제3정규형</td><td>이행 종속 해소</td><td>주문의 고객전화번호 → 고객으로</td></tr>
</tbody>
</table>
</div>
<h1 id="dc-ch-2">2장 개념 모델링</h1>
<h2 id="dc-12">현행 분석</h2>
<div class="tw"><table><thead><tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>현행 분석 순서(필기)</td><td>① 사용자 매뉴얼 등 문서 → ② 리버스 모델링 → 현업 협업</td><td>기존 시스템을 빨리 파악</td></tr>
<tr><td>리버스 모델링</td><td>물리 모델(기존 DB) → 논리 모델 변환</td><td>ERwin, Claude 활용</td></tr>
<tr><td>ERD·FK가 없을 때</td><td>애플리케이션 코드(SQL JOIN) 분석으로 관계 파악</td><td></td></tr>
<tr><td>AS-IS / TO-BE</td><td>현재 문제점 / 개선 방향</td><td>업무 흐름형 테이블 → 데이터 중심 모델</td></tr>
</tbody>
</table>
</div>
<h2 id="dc-13">개념 모델링</h2>
<div class="tw"><table><thead><tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>정의</td><td>전체 관점에서 개략적인 데이터 모델 제시</td><td>대충 설계</td></tr>
<tr><td>3단계</td><td>① 주제영역 도출 ② 주제영역 분류·정의 ③ 핵심 엔티티·관계 정의</td><td>주제영역 도출 = 설계 범위</td></tr>
<tr><td>속성 정의 수준</td><td>식별자와 주요 속성만 먼저</td><td>의사소통에 문제없을 정도</td></tr>
<tr><td>핵심 엔티티 식별</td><td>최하위 주제영역마다 1개 이상</td><td>너무 세분화되면 통합</td></tr>
</tbody>
</table>
</div>
<h2 id="dc-14">주제영역</h2>
<div class="tw"><table><thead><tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>주제영역</td><td>데이터를 최상위 단계에서 분류한 데이터 집합</td><td>영역 안은 밀접, 영역끼리는 명확히 구분</td></tr>
<tr><td>오너십</td><td>누가 데이터에 책임이 있는지</td><td>주제영역 단위로 부여</td></tr>
<tr><td>업무 관점 효과</td><td>데이터 연결·활용, 중복 없는 관리로 불일치↓</td><td></td></tr>
<tr><td>시스템 관점 효과</td><td>IT 자원 파악 → 중복 투자 방지</td><td></td></tr>
<tr><td>데이터 관리 효과</td><td>통합·연계·중복 방안의 기초, 분산 전략 기준</td><td></td></tr>
<tr><td>데이터 설계 효과</td><td>전사 영역 조망, 논리·물리로 구체화하는 방향 제공</td><td></td></tr>
<tr><td>도출</td><td>업무 자료, 현행 시스템, 웹사이트 메뉴 참고</td><td>인터넷뱅킹 메뉴</td></tr>
<tr><td>프레임워크 Who</td><td>주체 (주어)</td><td>개인, 기업</td></tr>
<tr><td>프레임워크 What(How)</td><td>대상/자원 (목적어)</td><td>상품</td></tr>
<tr><td>프레임워크 Where</td><td>장소</td><td>본점, 지점, 출장소</td></tr>
<tr><td>프레임워크 Biz. Event</td><td>약정/계약 (동사)</td><td>예금, 대출, 펀드 계약</td></tr>
<tr><td>Additional Event, Status</td><td>행위/이벤트/상태</td><td>입출금, 이체</td></tr>
<tr><td>핵심(Key) 주제영역</td><td>주체·대상·자원·장소, 기능에 종속 X</td><td></td></tr>
<tr><td>중요(Main) 주제영역</td><td>핵심 영역이 관계한 사실(상태·방법·행위)</td><td></td></tr>
<tr><td>상세화 기준</td><td>데이터 측면(응집도) / 관리적 측면(업무)</td><td>상품 → 상품기본 → 금리이율</td></tr>
<tr><td>정의서 항목</td><td>주제영역, 정의, 정보유형, 주요 정보항목</td><td>나누는 기준을 명확히</td></tr>
</tbody>
</table>
</div>
<h1 id="dc-ch-3">3장 논리 모델링</h1>
<h2 id="dc-15">논리 모델링</h2>
<div class="tw"><table><thead><tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>정의</td><td>데이터를 명확하고 구체적으로 정의</td><td></td></tr>
<tr><td>진행 단위</td><td>주제영역 단위</td><td>모든 업무 특성 반영</td></tr>
<tr><td>확장 방향</td><td>핵심 엔티티 → 하위 엔티티로 상세화</td><td></td></tr>
<tr><td>물리 특성</td><td>고려하지 않음</td><td>물리 단계에서 성능 확인</td></tr>
</tbody>
</table>
</div>
<h2 id="dc-16">핵심·파생 엔티티</h2>
<div class="tw"><table><thead><tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>핵심 엔티티</td><td>단독으로 존재하는 기준정보(고객, 부서, 직원, 상품)</td><td>업무 행위의 주체·대상</td></tr>
<tr><td>유형 및 분류</td><td>type & category</td><td>고객 유형 코드, 상품 분류(대/중/소)</td></tr>
<tr><td>업무규칙 및 지식</td><td>rule & knowledge</td><td>보험료 조건, 직급별 연봉, 환불 정책</td></tr>
<tr><td>업무주체 및 대상</td><td>subject & object</td><td>고객, 상품, 사원, 예금</td></tr>
<tr><td>장소</td><td>where</td><td>물류창고, 공장, 강의장</td></tr>
<tr><td>핵심 엔티티 정의 질문</td><td>고객은 누구? 비회원도? 외국인도? 최소 정보는?</td><td>식별자·필수 속성이 달라짐</td></tr>
<tr><td>파생 엔티티</td><td>핵심 엔티티와 관련된 엔티티: 상세, 상태, 이력, 교차</td><td>부모 키를 PK에 포함</td></tr>
<tr><td>상세</td><td>품의 → 품의내역, 품의첨부파일</td><td>부모키 + 항목코드/일련번호</td></tr>
<tr><td>상태</td><td>품의 → 품의진행상태</td><td>부모키 + 상태코드</td></tr>
<tr><td>이력</td><td>품의 → 품의이력</td><td>부모키 + 이력일련번호</td></tr>
<tr><td>교차</td><td>품의 ↔ 거래처 → 품의거래처(계약금액)</td><td>두 부모 키 조합</td></tr>
</tbody>
</table>
</div>
<h2 id="dc-17">이력 관리</h2>
<div class="tw"><table><thead><tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>속성 전체 이력</td><td>하나라도 바뀌면 행 전체 복사</td><td>시점 복원 쉬움, 중복 많음</td></tr>
<tr><td>속성 일부 이력</td><td>이력이 필요한 속성만 따로</td><td>가격, 직급</td></tr>
<tr><td>점 이력</td><td>변경일자만 저장</td><td>조회: MAX(변경일자) ≤ 기준일 서브쿼리</td></tr>
<tr><td>선분 이력</td><td>시작일자 ~ 종료일자 저장</td><td>조회: 시작일자 ≤ 기준일 AND 종료일자 ≥ 기준일</td></tr>
<tr><td>선분 이력 입력</td><td>새 행 + 직전 행 종료일자 수정</td><td></td></tr>
<tr><td>현재 행 종료일자</td><td>'99991231' (문자열)</td><td>NULL이면 범위 비교가 안 됨</td></tr>
<tr><td>최종 데이터 포함</td><td>이력에 현재 값까지</td><td>이력 하나로 전체 기간 조회, 원본과 중복</td></tr>
<tr><td>최종 데이터 미포함</td><td>이력에는 과거 값만</td><td>중복 X, 전체는 UNION 필요</td></tr>
</tbody>
</table>
</div>
<h2 id="dc-18">엔티티·관계·속성 정의</h2>
<div class="tw"><table><thead><tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>엔티티 도출</td><td>현업 요구사항으로 도출(리버스 모델링), 불필요한 것 삭제</td><td>현업 = 최종 승인</td></tr>
<tr><td>이름 통일</td><td>STAT, STATECD, STATUS → 예산진행상태코드, 입찰상태코드</td><td>이름은 최대한 자세히</td></tr>
<tr><td>독립 엔티티 정의</td><td>식별자 중심(주민번호, 상품번호)</td><td></td></tr>
<tr><td>종속 엔티티 정의</td><td>관계로 집합 단위·발생 기준 정의</td><td></td></tr>
<tr><td>엔티티 정의 방법</td><td>① 자체만으로 ② 속성 중심 ③ 다른 엔티티와의 관계</td><td></td></tr>
<tr><td>일반화</td><td>공통 속성을 상위로 통합</td><td>추상화</td></tr>
<tr><td>특수화</td><td>하위에 개별 속성만</td><td>구체화</td></tr>
<tr><td>데이터 통합</td><td>분류체계·식별체계·속성체계 일원화</td><td></td></tr>
<tr><td>관계 구분</td><td>주체, 대상, 상세, 인과, 역할/자격, 구성, 참조</td><td></td></tr>
<tr><td>관계 정의</td><td>양방향으로 관계수·선택성·식별자 상속</td><td>관계명은 불명확할 때만(보통 안 적음)</td></tr>
<tr><td>속성 정의</td><td>정의, 이름, 설명, 필수 여부, 타입, 범위</td><td>주제영역 안에서 같은 의미</td></tr>
</tbody>
</table>
</div>
<h2 id="dc-19">식별자·도메인·검토</h2>
<div class="tw"><table><thead><tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>식별자 지정</td><td>유일성·존재성·불변성·최소성 + NN·UQ 제약</td><td></td></tr>
<tr><td>인조 식별자 ①</td><td>엔티티 통합 시 공통 식별자가 없을 때</td><td>사업자번호 모르는 거래처 → 거래처번호</td></tr>
<tr><td>인조 식별자 ②</td><td>복합키를 단순화할 때</td><td>입찰 → 입찰업체 → 입찰내역, 시퀀스 활용</td></tr>
<tr><td>인조 식별자 ③</td><td>개인정보 암호화 대상일 때</td><td>카드번호암호화 → 카드관리번호</td></tr>
<tr><td>인조 식별자 ④</td><td>업무상 편의</td><td></td></tr>
<tr><td>타입·길이</td><td>일관되게, 문자열은 넉넉히</td><td>varchar(200)</td></tr>
<tr><td>default 값</td><td>입력값 없을 때 사용</td><td>default 0 → 평균값 왜곡 주의</td></tr>
<tr><td>모델 검토</td><td>자체 검토, 동료 검토, 이해관계자 리뷰, 산출물 검토</td><td>요구사항 추적표</td></tr>
</tbody>
</table>
</div>
<h2 id="dc-20">데이터 표준화</h2>
<div class="tw"><table><thead><tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>표준용어</td><td>주제어 + 수식어 + 분류어</td><td>배송 + 고객 + 전화번호</td></tr>
<tr><td>단어사전</td><td>단어, 정의, 영문단어, 영문약어, 동의어, 단어유형</td><td>고객 CUST, 전화번호 TELNO</td></tr>
<tr><td>금칙어</td><td>쓰지 않는 유사어</td><td>하청업체 → 협력업체</td></tr>
<tr><td>명명규칙</td><td>한글·영문·숫자, 영문 대문자, 특수문자·띄어쓰기 X, 명사 원칙</td><td>협력 업체 → 협력업체</td></tr>
<tr><td>외래어</td><td>같은 뜻 한글이 있으면 한글</td><td>패스워드 → 비밀번호</td></tr>
<tr><td>동음이의어</td><td>허용 X, 다른 단어로</td><td>통화(Currency) → 통화량</td></tr>
<tr><td>이음동의어</td><td>허용 X, 많이 쓰는 말로</td><td>에러/오류 → 오류, 구좌 → 계좌</td></tr>
<tr><td>영문 약어</td><td>대문자, _만, 4자리 이하(최대 6), 한글 발음 표기 X</td><td>INSA → HR, GOGAEG → CUST</td></tr>
<tr><td>도메인 표준화</td><td>자주 쓰는 도메인을 미리 정의</td><td>여부C1 CHAR(1) Y/N, 금액N15</td></tr>
<tr><td>코드 표준화</td><td>값을 코드로 목록화, 코드 사전 하나로</td><td>오입력 방지, 통계 유리</td></tr>
<tr><td>코드 사전</td><td>코드유형ID + 코드 (PK), 코드명, 정렬순서, 사용여부</td><td>C001 결재상태 01 기안</td></tr>
<tr><td>분류형 코드</td><td>대/중/소 계층, 자릿수에 의미</td><td>한국표준산업분류</td></tr>
<tr><td>일련번호형 코드</td><td>의미 없는 순번, 앞에 0</td><td>01 개인, 02 법인, 99 기타</td></tr>
<tr><td>약어형 코드</td><td>의미 있는 영문 약어</td><td>M 남자, F 여자</td></tr>
<tr><td>차용형 코드</td><td>통용 코드 그대로</td><td>은행코드 001, 002</td></tr>
<tr><td>용어 사전</td><td>용어, 영문약어, 정의, 도메인, 인포타입</td><td>고객전화번호 CUST_TELNO</td></tr>
</tbody>
</table>
</div>
`;
