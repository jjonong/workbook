// 디자인 패턴 핵심 정리 탭 (HTML) · Part 5 Singleton · Part 6 Prototype · Part 17 Observer · Part 18 Memento · Part 20 Flyweight
var WGF = window.WGF = window.WGF || {};
WGF.cheat = String.raw`
<h1 id="gc-0">디자인 패턴 핵심 정리</h1>
<p>스터디 직전에 훑어보는 용어·코드 모음이에요. 위 검색창에 낱말(예: private, clone, update, wide, intrinsic, pool, synchronized)을 넣으면 맞는 줄만 남아요. 자세한 설명은 <a href="#gof" data-goto="gof">개념 정리</a> 탭을 보세요.</p>
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

<h1 id="gc-ch-3">Observer</h1>
<h2 id="gc-o1">Observer 핵심</h2>
<div class="tw"><table>
<thead>
<tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>목적</td><td>관찰 대상의 상태가 변하면 <strong>관찰자에게 알려 준다</strong>. 상태 변화에 따른 처리를 기술할 때 효과적</td><td>p.308</td></tr>
<tr><td>이름 뜻</td><td>observer = 관찰(observe)하는 사람, 관찰자</td><td></td></tr>
<tr><td>Observer 인터페이스</td><td><code>public abstract void update(NumberGenerator generator);</code></td><td>리스트 17-1</td></tr>
<tr><td>java.util.Observer</td><td>교안의 Observer와 다름. <strong>비추천(deprecated)</strong>이라 새 프로그램에 쓰지 않음</td><td>📝</td></tr>
<tr><td>NumberGenerator</td><td>수를 생성하는 <strong>추상 클래스</strong>. 관찰자 관리 + 추상 메서드 getNumber·execute</td><td>subclass responsibility</td></tr>
<tr><td>observers</td><td><code>private List&lt;Observer&gt; observers = new ArrayList&lt;&gt;();</code></td><td>형은 List, 구현체는 ArrayList</td></tr>
<tr><td>addObserver / deleteObserver</td><td><code>observers.add(observer)</code> / <code>observers.remove(observer)</code></td><td></td></tr>
<tr><td>notifyObservers</td><td><code>for (Observer o: observers) { o.update(this); }</code></td><td>모든 관찰자에게 통지</td></tr>
<tr><td>RandomNumberGenerator</td><td><code>execute</code>: <code>number = random.nextInt(50);</code> 후 <code>notifyObservers();</code>를 20번</td><td>0~49</td></tr>
<tr><td>nextInt(n)</td><td>0 이상 n <strong>미만</strong>의 정수</td><td></td></tr>
<tr><td>DigitObserver</td><td><code>"DigitObserver:" + generator.getNumber()</code> 숫자로 표시</td><td>implements Observer</td></tr>
<tr><td>GraphObserver</td><td>getNumber 개수만큼 <code>*</code>를 찍어 간이 그래프</td><td>3 → GraphObserver:***</td></tr>
<tr><td>Thread.sleep(100)</td><td>표시되는 모습을 잘 보려고 속도를 늦춤</td><td></td></tr>
<tr><td>Main</td><td>Generator 1개 + Observer 2개, addObserver로 등록 후 execute</td><td>리스트 17-6</td></tr>
<tr><td>Subject 역</td><td>관찰되는 대상. Observer 등록·삭제 + 현재 상태를 가져오는 메서드 → <code>NumberGenerator</code></td><td>p.314</td></tr>
<tr><td>ConcreteSubject 역</td><td>상태가 변경되면 등록된 Observer에 알림 → <code>RandomNumberGenerator</code></td><td></td></tr>
<tr><td>Observer 역</td><td>Subject로부터 ‘상태가 변화했어요’를 전달받음(update) → <code>Observer</code></td><td></td></tr>
<tr><td>ConcreteObserver 역</td><td>update 안에서 Subject의 현재 상태를 취득 → <code>DigitObserver</code>, <code>GraphObserver</code></td><td></td></tr>
</tbody>
</table></div>

<h2 id="gc-o2">Observer 설계 힌트</h2>
<div class="tw"><table>
<thead>
<tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>교환 가능성</td><td>Subject는 관찰자가 Observer를 구현했다는 것만, Observer는 대상이 NumberGenerator 하위 클래스라는 것만 앎</td><td>p.315</td></tr>
<tr><td>★ 추상으로 분리</td><td>추상 클래스·인터페이스로 구상 클래스에서 추상 메서드를 분리</td><td>📝 ★</td></tr>
<tr><td>★ 인수·필드의 형</td><td>인수·필드는 구상 클래스형이 아니라 추상 클래스·인터페이스형으로</td><td>📝 ★</td></tr>
<tr><td>Observer의 순서</td><td>먼저 등록한 Observer의 update가 먼저 호출. 그래도 순서가 바뀌어도 문제없게 설계</td><td></td></tr>
<tr><td>무한 통지</td><td>Observer가 update에서 Subject 상태를 바꾸면 통지가 영원히 반복될 수 있음</td><td>p.316</td></tr>
<tr><td>무한 통지 대책</td><td>통지 처리 중인지 Observer가 판단 / 통지 타이밍을 Subject가 고려</td><td></td></tr>
<tr><td>update (1)</td><td><code>update(NumberGenerator generator)</code> Subject만 넘김</td><td>p.317</td></tr>
<tr><td>update (2)</td><td><code>update(NumberGenerator generator, int number)</code> 힌트 정보도 넘김 → Subject가 Observer 처리를 의식</td><td></td></tr>
<tr><td>update (3)</td><td><code>update(int number)</code> → 여러 Subject를 관찰하면 부적절</td><td></td></tr>
<tr><td>Publish-Subscribe</td><td>Observer는 능동적 관찰이 아니라 ‘전달’받기를 수동적으로 기다림. publish(발행)·subscribe(구독)</td><td></td></tr>
<tr><td>MVC</td><td>Model–View 관계 = Subject–Observer 관계. 보통 Model 하나에 View 여럿</td><td></td></tr>
<tr><td>IncrementalNumberGenerator</td><td><code>while (number &lt; end) { notifyObservers(); number += inc; }</code> (10, 50, 5) → 10~45</td><td>문제 17-1</td></tr>
<tr><td>새 ConcreteObserver</td><td>Observer 구현 + update에서 getNumber + Main에서 addObserver</td><td>문제 17-2</td></tr>
<tr><td>관련 패턴</td><td>Mediator(Colleague 통신에 Observer 사용. Observer는 통지·동기화가 주안점)</td><td>p.318</td></tr>
</tbody>
</table></div>

<h1 id="gc-ch-4">Memento</h1>
<h2 id="gc-m1">Memento 핵심</h2>
<div class="tw"><table>
<thead>
<tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>목적</td><td><strong>캡슐화의 파괴에 빠지지 않고</strong> 인스턴스의 상태를 저장·복원</td><td>p.322</td></tr>
<tr><td>이름 뜻</td><td>memento = 기념품, 유품, 추억거리</td><td></td></tr>
<tr><td>캡슐화의 파괴</td><td>내부 정보에 부주의하게 접근을 허락 → 내부 구조에 의존하는 코드가 곳곳에 흩어져 수정이 곤란</td><td></td></tr>
<tr><td>할 수 있는 일</td><td>실행 취소(undo) · 다시 실행(redo) · 작업 이력(history) · 현재 상태 저장(snapshot)</td><td></td></tr>
<tr><td>게임 규칙</td><td>1의 눈 +100 · 2의 눈 절반 · 6의 눈 과일 · 그 밖 변동 없음 · 돈이 없어지면 종료</td><td>bet</td></tr>
<tr><td>패키지</td><td>Memento·Gamer는 <code>game</code> 패키지, Main은 이름 없는 패키지</td><td>표 18-1</td></tr>
<tr><td>Memento 필드</td><td><code>private int money;</code> <code>private List&lt;String&gt; fruits;</code></td><td></td></tr>
<tr><td>getMoney</td><td><code>public</code> → narrow interface</td><td></td></tr>
<tr><td>생성자 Memento(int)</td><td>접근 제한자 없음(default) → wide interface. game 밖에서 new 불가</td><td>컴파일 에러</td></tr>
<tr><td>addFruit / getFruits</td><td>default → wide interface. getFruits는 <code>new ArrayList&lt;&gt;(fruits)</code> 복사본 반환</td><td></td></tr>
<tr><td>createMemento</td><td>현재 상태 저장(스냅샷). <code>new Memento(money)</code> + ‘맛있는 ’ 과일만 addFruit</td><td>Gamer</td></tr>
<tr><td>restoreMemento</td><td><code>this.money = memento.getMoney(); this.fruits = memento.getFruits();</code> undo, ‘부활의 주문’</td><td>Gamer</td></tr>
<tr><td>Main 저장 조건</td><td><code>gamer.getMoney() &gt; memento.getMoney()</code> → createMemento</td><td>많이 늘면</td></tr>
<tr><td>Main 복원 조건</td><td><code>gamer.getMoney() &lt; memento.getMoney() / 2</code> → restoreMemento</td><td>많이 줄면</td></tr>
<tr><td>Originator 역</td><td>Memento를 만들고, 넘겨받은 Memento로 그 시점 상태로 되돌림 → <code>Gamer</code></td><td>p.331</td></tr>
<tr><td>Memento 역</td><td>Originator의 내부 정보를 정리하지만 누구에게나 공개하지 않음 → <code>Memento</code></td><td></td></tr>
<tr><td>Caretaker 역</td><td>언제 저장·복원할지 정하고 Memento를 <strong>블랙박스로 통째로 보관</strong> → <code>Main</code></td><td>p.332</td></tr>
<tr><td>wide interface</td><td>복원에 필요한 정보를 모두 얻는 메서드 집합. <strong>Originator만</strong> 사용</td><td></td></tr>
<tr><td>narrow interface</td><td>Caretaker에 보여 주는 것. 내부 상태 공개를 방지</td><td></td></tr>
<tr><td>연결</td><td>Originator–Memento: 넓은 인터페이스(친밀) · Caretaker–Memento: 좁은 인터페이스</td><td>그림 18-4</td></tr>
</tbody>
</table></div>

<h2 id="gc-m2">접근 제어와 설계 힌트</h2>
<div class="tw"><table>
<thead>
<tr><th>찾는 것</th><th>내용</th><th>메모</th></tr>
</thead>
<tbody>
<tr><td>public</td><td>모든 클래스에서 접근</td><td>표 18-2</td></tr>
<tr><td>protected</td><td>그 패키지 및 하위 클래스에서 접근</td><td></td></tr>
<tr><td>default(없음)</td><td>그 패키지에서만 접근</td><td></td></tr>
<tr><td>private</td><td>그 클래스에서만 접근</td><td></td></tr>
<tr><td>‘좁다’의 뜻</td><td>내부 상태를 조작할 수 있는 정도가 적다(getMoney로 소지금만 얻음)</td><td>p.334</td></tr>
<tr><td>Main이 할 수 있는 일</td><td>getMoney로 소지금 얻기 + Memento를 변수에 저장해 두기뿐</td><td></td></tr>
<tr><td>Memento 여러 개</td><td>배열 등으로 여러 개 가지면 여러 시점의 상태 저장 가능</td><td></td></tr>
<tr><td>유효기한</td><td>파일로 영속 저장하면 프로그램 버전 업 후 맞지 않을 수 있음</td><td>문제 18-4</td></tr>
<tr><td>역할을 나누는 이유</td><td>Caretaker = 언제 저장·undo / Originator = 만들고 되돌림 → 여러 단계 undo·파일 저장으로 바꿔도 Originator는 그대로</td><td>p.335</td></tr>
<tr><td>Caretaker가 자유 조작하면</td><td>캡슐화 파괴, 저장 상태 훼손, Originator 수정 시 Caretaker도 수정</td><td>문제 18-1</td></tr>
<tr><td>정보가 많을 때</td><td>달라진 부분(증분)만 저장</td><td>문제 18-2</td></tr>
<tr><td>number 접근 제어</td><td>필드 private + 읽기 메서드 default + 쓰기 메서드 없음</td><td>문제 18-3</td></tr>
<tr><td>파일 저장</td><td>Memento의 static <code>saveToFile</code>·<code>loadFromFile</code>. 실패하면 false / null</td><td>문제 18-4</td></tr>
<tr><td>직렬화 주의</td><td>신뢰할 수 없는 데이터 복원은 보안 문제. 해답은 줄 바꿈 구분 문자열로 저장</td><td>Serializable</td></tr>
<tr><td>관련 패턴</td><td>Command(undo·redo) · Prototype(전부 복사 vs 필요한 정보만) · State(클래스가 상태 vs 인스턴스가 상태)</td><td>p.335</td></tr>
</tbody>
</table></div>

<h1 id="gc-ch-5">Flyweight</h1>
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

<h1 id="gc-ch-6">패턴 비교</h1>
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

<h2 id="gc-8">Observer · Memento 비교</h2>
<div class="tw"><table>
<thead>
<tr><th>찾는 것</th><th>Observer</th><th>Memento</th></tr>
</thead>
<tbody>
<tr><td>핵심 동작</td><td>상태가 바뀌면 관찰자 모두에게 통지</td><td>상태를 저장해 두었다가 그 시점으로 복원</td></tr>
<tr><td>핵심 코드</td><td><code>notifyObservers()</code> → <code>o.update(this)</code></td><td><code>createMemento()</code> / <code>restoreMemento(memento)</code></td></tr>
<tr><td>등장인물</td><td>Subject · ConcreteSubject · Observer · ConcreteObserver</td><td>Originator · Memento · Caretaker</td></tr>
<tr><td>인터페이스의 역할</td><td>Subject와 Observer를 이어 구상 클래스를 교환 가능하게</td><td>wide(Originator용) / narrow(Caretaker용)로 캡슐화 보호</td></tr>
<tr><td>주의할 점</td><td>update 호출 순서에 의존 금지, 무한 통지</td><td>Memento 유효기한(파일 저장), 직렬화 보안</td></tr>
<tr><td>관련 패턴</td><td>Mediator</td><td>Command · Prototype · State</td></tr>
<tr><td>비유</td><td>유튜브 구독 알림</td><td>게임 세이브 파일</td></tr>
</tbody>
</table></div>
`;
