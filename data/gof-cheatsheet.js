// 디자인 패턴 핵심 정리 탭 (HTML) · Part 5 Singleton · Part 6 Prototype · Part 20 Flyweight
var WGF = window.WGF = window.WGF || {};
WGF.cheat = String.raw`
<h1 id="gc-0">디자인 패턴 핵심 정리</h1>
<p>스터디 직전에 훑어보는 용어·코드 모음이에요. 위 검색창에 낱말(예: private, clone, intrinsic, pool, synchronized, 마커)을 넣으면 맞는 줄만 남아요. 자세한 설명은 <a href="#gof" data-goto="gof">개념 정리</a> 탭을 보세요.</p>
<h1 id="gc-ch-1">Singleton</h1>
<h2 id="gc-1">Singleton 핵심</h2>
<div class="tw"><table>
<thead>
<tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>목적</td><td>인스턴스가 <strong>반드시 1개만</strong> 존재함을 보장하고 프로그램으로 표현</td><td>p.102</td></tr>
<tr><td>이름 뜻</td><td>singleton = 요소가 하나뿐인 집합</td><td></td></tr>
<tr><td>유일한 인스턴스 필드</td><td><code>private static Singleton singleton = new Singleton();</code></td><td>클래스 초기화 때 한 번</td></tr>
<tr><td>생성자</td><td><code>private Singleton() { }</code> → 외부 new 금지(컴파일 에러)</td><td>비어 있어도 꼭 써야 함</td></tr>
<tr><td>생성자를 안 쓰면?</td><td>자바가 <strong>public 기본 생성자</strong>를 자동 생성 → new 가능 → 싱글톤 깨짐</td><td>📝 수업 필기</td></tr>
<tr><td>new의 두 단계</td><td>① 메모리에 객체 공간 생성 ② 생성자 호출 → 생성자 못 부르면 new 불가</td><td>📝 수업 필기</td></tr>
<tr><td>인스턴스 얻기</td><td><code>public static Singleton getInstance() { return singleton; }</code></td><td>static Factory Method의 일종</td></tr>
<tr><td>getInstance 이름</td><td>꼭 이 이름일 필요는 없지만 유일한 인스턴스를 얻을 방법은 필요</td><td></td></tr>
<tr><td>사용</td><td><code>Singleton obj = Singleton.getInstance();</code> (new 안 함)</td><td></td></tr>
<tr><td>같은지 확인</td><td><code>obj1 == obj2</code> → true (참조 비교)</td><td></td></tr>
<tr><td>UML 기호</td><td><code>-</code> private · <code>+</code> public · 밑줄 static</td><td>p.103</td></tr>
<tr><td>언제 생성?</td><td>처음 <code>getInstance</code>를 호출할 때 클래스 초기화 → static 필드 초기화 → 생성</td><td>Start. 다음에 출력</td></tr>
<tr><td>등장인물</td><td>Singleton 역만. 항상 같은 인스턴스를 반환하는 static 메서드를 가짐</td><td>p.105</td></tr>
<tr><td>제한하는 이유</td><td>전제 조건을 늘림. 여러 개면 서로 영향 → 버그</td><td>p.105</td></tr>
<tr><td>enum Singleton</td><td><code>enum Singleton { INSTANCE; … }</code> · 사용 <code>Singleton.INSTANCE.hello();</code></td><td>enum 요소는 유일성 보장 (Month.APRIL)</td></tr>
<tr><td>관련 패턴</td><td>Abstract Factory · Builder · Facade · Flyweight · Prototype · State</td><td>p.106</td></tr>
</tbody>
</table></div>

<h2 id="gc-2">멀티스레드와 Singleton</h2>
<div class="tw"><table>
<thead>
<tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>lazy 초기화의 문제</td><td><code>if (singleton == null) singleton = new Singleton();</code> → 두 스레드가 동시에 null을 보면 인스턴스 2개</td><td>문제 5-3</td></tr>
<tr><td>해결 1: eager</td><td>필드 선언에서 바로 new (교안 리스트 5-1)</td><td>가장 간단</td></tr>
<tr><td>해결 2: synchronized</td><td><code>public static synchronized Singleton getInstance()</code></td><td>호출마다 잠금</td></tr>
<tr><td>해결 3: 이중 검사 잠금</td><td>필드에 <code>volatile</code> + synchronized 블록 안팎에서 null 검사</td><td>volatile 필수</td></tr>
<tr><td>해결 4: 홀더 클래스</td><td><code>private static class Lazy { static final Singleton INSTANCE = new Singleton(); }</code></td><td>lazy + 안전</td></tr>
<tr><td>해결 5: enum</td><td><code>enum Singleton { INSTANCE }</code></td><td>언어가 보장</td></tr>
<tr><td>TicketMaker</td><td>Singleton + <code>synchronized int getNextTicketNumber() { return ticket++; }</code> → 1000, 1001, 1002…</td><td>문제 5-1</td></tr>
<tr><td>Triple</td><td>private 생성자 + 클래스 안에서 ALPHA·BETA·GAMMA 3개 생성·보관 + <code>getInstance(String name)</code></td><td>문제 5-2</td></tr>
</tbody>
</table></div>

<h1 id="gc-ch-2">Prototype</h1>
<h2 id="gc-3">Prototype 핵심</h2>
<div class="tw"><table>
<thead>
<tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>목적</td><td>클래스에서가 아니라 <strong>인스턴스를 복사해서</strong> 새 인스턴스를 만든다</td><td>p.112</td></tr>
<tr><td>이름 뜻</td><td>prototype = 원형, 모범</td><td></td></tr>
<tr><td>쓰는 경우 (1)</td><td>종류가 너무 많아 클래스로 정리할 수 없을 때</td><td></td></tr>
<tr><td>쓰는 경우 (2)</td><td>클래스로부터 인스턴스 생성이 어려울 때 (마우스로 그린 도형)</td><td></td></tr>
<tr><td>쓰는 경우 (3)</td><td>프레임워크와 생성하는 인스턴스를 분리하고 싶을 때</td><td></td></tr>
<tr><td>비유</td><td>복사기로 문서 복사: 원본을 어떻게 만들었는지 몰라도 복사 가능</td><td></td></tr>
<tr><td>Product</td><td><code>public interface Product extends Cloneable { void use(String s); Product createCopy(); }</code></td><td>framework 패키지</td></tr>
<tr><td>Manager.showcase</td><td><code>Map&lt;String,Product&gt;</code> 이름 → 원형</td><td>진열장</td></tr>
<tr><td>Manager.register</td><td><code>showcase.put(name, prototype)</code></td><td></td></tr>
<tr><td>Manager.create</td><td><code>showcase.get(name).createCopy()</code> → 매번 새 복사본</td><td>p1 == p2는 false</td></tr>
<tr><td>클래스 이름이 없다</td><td>Manager·Product 소스에 MessageBox·UnderlinePen 이름이 없음 → 독립적으로 수정 가능</td><td>인터페이스가 다리</td></tr>
<tr><td>createCopy 구현</td><td><code>try { p = (Product)clone(); } catch (CloneNotSupportedException e) { … }</code></td><td></td></tr>
<tr><td>MessageBox</td><td>decochar로 테두리. decolen = 1 + s.length() + 1</td><td>'*' + Hello → *Hello*</td></tr>
<tr><td>UnderlinePen</td><td>문자열 출력 후 길이만큼 ulchar로 밑줄</td><td>'-' + Hello → -----</td></tr>
<tr><td>Main 등록</td><td>"strong message"=UnderlinePen('-') · "warning box"=MessageBox('*') · "slash box"=MessageBox('/')</td><td>표 6-2</td></tr>
<tr><td>Prototype 역</td><td>복사 메서드를 결정 → <code>Product</code></td><td>p.120</td></tr>
<tr><td>ConcretePrototype 역</td><td>복사 메서드를 구현 → <code>MessageBox</code>, <code>UnderlinePen</code></td><td></td></tr>
<tr><td>Client 역</td><td>복사 메서드로 새 인스턴스 생성 → <code>Manager</code></td><td></td></tr>
<tr><td>클래스 이름은 속박</td><td>소스에 클래스 이름이 있으면 분리해 재사용 불가. <strong>.java 없이 .class만으로</strong> 재사용 가능한가가 포인트</td><td>p.122</td></tr>
</tbody>
</table></div>

<h2 id="gc-4">clone과 Cloneable</h2>
<div class="tw"><table>
<thead>
<tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>clone 정의 위치</td><td><code>java.lang.Object</code> (모든 클래스가 상속)</td><td>p.123</td></tr>
<tr><td>Cloneable 필수</td><td>복사 대상 클래스는 Cloneable을 구현해야 함(직접·상위 클래스·상위 인터페이스 모두 OK)</td><td></td></tr>
<tr><td>구현 안 하면</td><td><code>CloneNotSupportedException</code> 발생</td><td></td></tr>
<tr><td>Cloneable의 메서드</td><td><strong>없음</strong> → 마커 인터페이스(marker interface)</td><td></td></tr>
<tr><td>import</td><td>java.lang은 자동 import → <code>Cloneable</code>만 써도 됨</td><td></td></tr>
<tr><td>얕은 복사</td><td>필드 대 필드 복사(shallow copy). 배열 필드는 <strong>참조만</strong> 복사</td><td>p.124</td></tr>
<tr><td>깊은 복사</td><td>clone 오버라이드: <code>super.clone()</code> 후 참조형 필드를 따로 복사 (예: <code>copy.items = items.clone();</code>)</td><td></td></tr>
<tr><td>super.clone()</td><td>clone을 오버라이드할 때 상위 clone 호출을 잊지 말 것</td><td></td></tr>
<tr><td>생성자</td><td>clone은 <strong>생성자를 호출하지 않음</strong></td><td>특수 초기화는 clone 안에</td></tr>
<tr><td>protected</td><td>Object.clone은 protected → 다른 클래스 요청으로 복제하려면 createCopy 같은 메서드로 감싸야 함</td><td></td></tr>
<tr><td>clone은 어렵다</td><td>실무에선 <strong>복사 생성자</strong>나 <strong>복사 팩토리</strong> 권장</td><td></td></tr>
<tr><td>복사 생성자</td><td><code>public MessageBox(MessageBox prototype) { this.decochar = prototype.decochar; }</code> · <code>return new MessageBox(this);</code></td><td>문제 6-2</td></tr>
<tr><td>createCopy 공유</td><td>Product를 구현한 추상 클래스에 createCopy를 한 번만 구현하고 상속</td><td>문제 6-1</td></tr>
<tr><td>관련 패턴</td><td>Flyweight(공유 vs 별도) · Memento(스냅샷·undo) · Composite·Decorator · Command</td><td>p.122</td></tr>
</tbody>
</table></div>

<h1 id="gc-ch-3">Flyweight</h1>
<h2 id="gc-5">Flyweight 핵심</h2>
<div class="tw"><table>
<thead>
<tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>목적</td><td>인스턴스를 최대한 <strong>공유</strong>하고 쓸데없이 <strong>new하지 않는다</strong></td><td>p.364</td></tr>
<tr><td>이름 뜻</td><td>flyweight = 복싱의 가장 가벼운 체급(플라이급). 무게 = <strong>메모리 사용량</strong></td><td></td></tr>
<tr><td>BigChar</td><td>큰 문자. 생성자에서 "big" + charname + ".txt" 파일을 읽어 fontdata에 저장</td><td>없으면 charname + "?"</td></tr>
<tr><td>BigCharFactory</td><td>BigChar를 공유하면서 생성. Singleton으로 구현</td><td></td></tr>
<tr><td>pool</td><td><code>private Map&lt;String,BigChar&gt; pool = new HashMap&lt;&gt;();</code></td><td>수영장 풀</td></tr>
<tr><td>키</td><td><code>String.valueOf(charname)</code> → "3"</td><td></td></tr>
<tr><td>getBigChar</td><td><code>pool.get</code> → null이면 new + <code>pool.put</code> → 반환</td><td>공유의 중심</td></tr>
<tr><td>synchronized getBigChar</td><td>동시 호출 시 같은 문자의 BigChar가 2개 생기는 것 방지</td><td>문제 20-3</td></tr>
<tr><td>BigString</td><td><code>bigchars[i] = factory.getBigChar(string.charAt(i));</code> ◀ 공유됨</td><td></td></tr>
<tr><td>공유 안 되는 코드</td><td><code>bigchars[i] = new BigChar(string.charAt(i));</code></td><td></td></tr>
<tr><td>"1212123"</td><td>글자 7개, BigChar 인스턴스는 3개(1, 2, 3)</td><td>그림 20-2</td></tr>
<tr><td>Flyweight 역</td><td>공유하는 편이 나은 것 → <code>BigChar</code></td><td>p.373</td></tr>
<tr><td>FlyweightFactory 역</td><td>Flyweight를 만드는 공장, 만들면 공유됨 → <code>BigCharFactory</code></td><td></td></tr>
<tr><td>Client 역</td><td>공장으로 Flyweight를 만들어 이용 → <code>BigString</code></td><td></td></tr>
<tr><td>GoF와의 차이</td><td>GoF의 ConcreteFlyweight = 이 장의 Flyweight. UnsharedConcreteFlyweight는 예제에 없음</td><td></td></tr>
</tbody>
</table></div>

<h2 id="gc-6">공유할 때 주의할 점</h2>
<div class="tw"><table>
<thead>
<tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>여러 곳에 영향</td><td>공유하는 것을 바꾸면 그것을 쓰는 모든 곳이 바뀜 → 정말 공유할 정보만 Flyweight에</td><td>p.374</td></tr>
<tr><td>색 정보</td><td>BigChar에 두면 같은 문자는 같은 색 · BigString에 두면 위치마다 다른 색. 정답은 사용 목적에 따라</td><td></td></tr>
<tr><td>intrinsic</td><td>본래 갖춰진·본질적인. 장소·상황에 의존하지 않음 → <strong>공유 가능</strong> (폰트 데이터)</td><td>p.375</td></tr>
<tr><td>extrinsic</td><td>외부에서 온·비본질적인. 장소·상황에 의존 → <strong>공유 불가능</strong> (몇 번째 문자인가)</td><td></td></tr>
<tr><td>가비지 컬렉션</td><td>사용되지 않는(참조 없는) 인스턴스를 해제해 힙의 빈 영역을 늘리는 처리</td><td></td></tr>
<tr><td>관리되는 인스턴스</td><td>pool이 참조하므로 <strong>GC되지 않음</strong> → 한 번 만든 BigChar는 계속 메모리에</td><td></td></tr>
<tr><td>참조 없애기</td><td>명시적 삭제는 불가. HashMap에서 엔트리를 삭제(<code>pool.remove</code>)하면 참조가 사라짐</td><td></td></tr>
<tr><td>메모리 이외의 리소스</td><td>시간(생성 횟수↓ → 속도↑), 파일 핸들(파일 디스크립터), 윈도 핸들</td><td>p.376</td></tr>
<tr><td>static Factory Method</td><td><code>getInstance</code>(Singleton), <code>String.valueOf</code></td><td>p.377</td></tr>
<tr><td>자바 속 Flyweight</td><td><code>Integer.valueOf</code>는 -128~127 캐시 공유, 문자열 리터럴은 상수 풀 공유</td><td>127 == true, 128 == false</td></tr>
<tr><td>메모리 측정</td><td><code>Runtime.getRuntime().gc();</code> 후 <code>totalMemory() - freeMemory()</code></td><td>문제 20-2</td></tr>
<tr><td>shared 생성자</td><td><code>BigString(String string, boolean shared)</code> → true면 getBigChar, false면 new</td><td>문제 20-1</td></tr>
<tr><td>관련 패턴</td><td>Proxy(대리인으로 속도↑) · Composite(Leaf 공유) · Singleton(공장, intrinsic만)</td><td>p.377</td></tr>
</tbody>
</table></div>

<h1 id="gc-ch-4">세 패턴 비교</h1>
<h2 id="gc-7">한 줄 비교</h2>
<div class="tw"><table>
<thead>
<tr><th>찾는 것</th><th>Singleton</th><th>Prototype / Flyweight</th></tr>
</thead>
<tbody>
<tr><td>핵심 동작</td><td>하나만 만들고 그것만 돌려줌</td><td>Prototype: 복사본을 새로 / Flyweight: 같은 것을 공유</td></tr>
<tr><td>인스턴스 수</td><td>클래스당 1개</td><td>Prototype: 요청마다 새로 / Flyweight: 키마다 1개</td></tr>
<tr><td>== 비교</td><td><code>getInstance() == getInstance()</code> → true</td><td>Prototype: <code>create() == create()</code> → false / Flyweight: 같은 문자 → true</td></tr>
<tr><td>핵심 코드</td><td><code>private</code> 생성자 + <code>static getInstance</code></td><td>Prototype: <code>clone()</code>, <code>createCopy</code> / Flyweight: <code>pool.get</code>, <code>pool.put</code></td></tr>
<tr><td>GoF 분류</td><td>생성 패턴</td><td>Prototype: 생성 / Flyweight: 구조</td></tr>
<tr><td>멀티스레드 함정</td><td>lazy 초기화의 null 검사 (문제 5-3)</td><td>Flyweight: getBigChar의 null 검사 (문제 20-3)</td></tr>
<tr><td>비유</td><td>회사 대표 전화번호</td><td>Prototype: 복사기 / Flyweight: 도서관 책</td></tr>
</tbody>
</table></div>
`;
