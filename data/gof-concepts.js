// 디자인 패턴 개념 정리 탭 (HTML) · Part 5 Singleton · Part 6 Prototype · Part 17 Observer · Part 18 Memento · Part 20 Flyweight
var WGF = window.WGF = window.WGF || {};
WGF.concepts = String.raw`
<h1 id="g-0">디자인 패턴 개념 정리: Singleton · Prototype · Observer · Memento · Flyweight</h1>
<p>『Java 언어로 배우는 디자인 패턴 입문』의 <strong>Part 5 Singleton</strong>, <strong>Part 6 Prototype</strong>, <strong>Part 17 Observer</strong>, <strong>Part 18 Memento</strong>, <strong>Part 20 Flyweight</strong> 교안을 장·절 순서대로 정리했어요. 교안 문장을 옮긴 것이 아니라 핵심을 이해하기 쉽게 풀어 쓴 요약이고, 교안에 손으로 적힌 수업 필기도 함께 넣었어요. 항목 옆 <strong>p.숫자</strong>는 교안 쪽 번호예요.</p>
<blockquote>
<p>📌 <strong>표시 안내</strong></p>
<ul>
<li>⭐ = 스터디·시험에서 특히 중요한 핵심</li>
<li>💡 = 이해를 돕는 보충 설명·비유</li>
<li>⚠️ = 자주 하는 실수, 헷갈리는 부분</li>
<li>📝 = 교안에 적힌 수업 필기</li>
</ul>
</blockquote>
<hr />
<h2 id="g-1">0. 패턴 한눈에 보기 ⭐</h2>
<p>Singleton·Prototype·Flyweight는 <strong>“인스턴스를 어떻게 만들고 몇 개를 둘까”</strong>라는 질문에 대한 서로 다른 답이에요. 그래서 셋을 같이 공부하면 차이가 선명해져요.</p>
<div class="tw"><table>
<thead>
<tr><th></th><th>Singleton (Part 5)</th><th>Prototype (Part 6)</th><th>Flyweight (Part 20)</th></tr>
</thead>
<tbody>
<tr><td>부제</td><td>인스턴스를 단 하나만 만든다</td><td>복사해서 인스턴스를 만든다</td><td>같은 것은 공유해서 낭비를 없앤다</td></tr>
<tr><td>핵심 동작</td><td>생성자를 <code>private</code>으로 막고 <code>static getInstance()</code>로 유일한 인스턴스를 돌려줌</td><td>원형을 등록해 두고 <code>clone()</code>으로 <strong>복사본</strong>을 만들어 줌</td><td>pool(<code>HashMap</code>)에 만든 것을 두고 같은 것이 필요하면 <strong>그대로 공유</strong></td></tr>
<tr><td>인스턴스 수</td><td>클래스당 1개</td><td>요청할 때마다 새 복사본</td><td>공유 단위(예: 문자 종류)당 1개</td></tr>
<tr><td>new를 피하는 이유</td><td>두 번째 인스턴스가 생기는 걸 막으려고</td><td>클래스 이름에 묶이지 않으려고·생성이 어려워서</td><td>메모리(리소스) 낭비를 줄이려고</td></tr>
<tr><td>등장인물</td><td>Singleton</td><td>Prototype · ConcretePrototype · Client</td><td>Flyweight · FlyweightFactory · Client</td></tr>
<tr><td>교안 예제</td><td>Singleton, Main</td><td>Product, Manager, MessageBox, UnderlinePen, Main</td><td>BigChar, BigCharFactory, BigString, Main</td></tr>
<tr><td>GoF 분류</td><td>생성 패턴</td><td>생성 패턴</td><td>구조 패턴</td></tr>
</tbody>
</table></div>
<p>💡 한 줄 비유: Singleton은 <strong>회사의 대표 전화번호</strong>(하나뿐), Prototype은 <strong>복사기</strong>(원본을 넣으면 똑같은 서류가 몇 장이든), Flyweight는 <strong>도서관 책</strong>(같은 책을 사람마다 사지 않고 돌려 봄)이에요.</p>
<p>Observer·Memento는 <strong>“인스턴스의 상태를 어떻게 알리고, 어떻게 저장할까”</strong>를 다뤄요.</p>
<div class="tw"><table>
<thead>
<tr><th></th><th>Observer (Part 17)</th><th>Memento (Part 18)</th></tr>
</thead>
<tbody>
<tr><td>부제</td><td>상태 변화를 알려 준다</td><td>상태를 저장한다</td></tr>
<tr><td>핵심 동작</td><td>Subject가 관찰자 목록(<code>observers</code>)을 갖고, 상태가 바뀌면 <code>notifyObservers()</code>로 모두의 <code>update</code>를 호출</td><td>Originator가 <code>createMemento()</code>로 상태를 담은 Memento를 만들고, <code>restoreMemento()</code>로 그 시점으로 되돌림</td></tr>
<tr><td>핵심 아이디어</td><td>관찰자는 인터페이스로만 연결 → 관찰자를 자유롭게 추가·교환</td><td>넓은/좁은 인터페이스(접근 제한자)로 <strong>캡슐화를 지키며</strong> 저장</td></tr>
<tr><td>등장인물</td><td>Subject · ConcreteSubject · Observer · ConcreteObserver</td><td>Originator · Memento · Caretaker</td></tr>
<tr><td>교안 예제</td><td>Observer, NumberGenerator, RandomNumberGenerator, DigitObserver, GraphObserver, Main</td><td>Memento, Gamer(game 패키지), Main</td></tr>
<tr><td>GoF 분류</td><td>행위 패턴</td><td>행위 패턴</td></tr>
</tbody>
</table></div>
<p>💡 한 줄 비유: Observer는 <strong>유튜브 구독 알림</strong>(새 영상이 올라오면 구독자 모두에게), Memento는 <strong>게임 세이브 파일</strong>(지금 상태를 저장해 두었다가 불러오기)이에요.</p>
<hr />

<h1 id="g-ch-1">Part 5. Singleton: 인스턴스를 단 하나만 만든다</h1>
<h2 id="g-s1">5.1 Singleton 패턴이란 ⭐ <small>p.102</small></h2>
<p>프로그램을 실행하면 보통은 인스턴스가 아주 많이 생겨요. 예를 들어 <code>java.lang.String</code>은 문자열 하나에 인스턴스 하나가 생기니, 문자열이 1,000개 등장하면 인스턴스도 1,000개예요.</p>
<p>그런데 <strong>클래스의 인스턴스를 딱 하나만 만들고 싶을 때</strong>도 있어요. 시스템 안에 1개만 존재한다는 것을 프로그램으로 표현하고 싶을 때예요.</p>
<ul>
<li>컴퓨터 시스템 전체를 표현한 클래스</li>
<li>현재 시스템 설정을 표현한 클래스</li>
<li>각종 상수(설정 값 모음)</li>
</ul>
<p>물론 조심해서 <code>new MyClass()</code>를 한 번만 실행하면 인스턴스는 하나만 생겨요. 하지만 이건 ‘프로그래머가 주의를 기울여서’ 하나만 만든 것이지 <strong>보장</strong>은 아니에요. Singleton은 다음을 원할 때 쓰는 패턴이에요.</p>
<blockquote>
<p>⭐ 지정한 클래스의 인스턴스가 <strong>반드시 1개만 존재한다는 것을 보장</strong>하고 싶을 때<br>⭐ 인스턴스가 하나만 존재한다는 것을 <strong>프로그램 상에서 표현</strong>하고 싶을 때</p>
</blockquote>
<p>singleton이란 <strong>요소가 하나뿐인 집합</strong>을 말해요. 인스턴스가 하나뿐이라서 이런 이름이 붙었어요.</p>

<h2 id="g-s2">5.2 예제 프로그램 <small>p.102~105</small></h2>
<div class="tw"><table>
<thead>
<tr><th>이름</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code>Singleton</code></td><td>인스턴스가 하나만 존재하는 클래스</td></tr>
<tr><td><code>Main</code></td><td>동작 테스트용 클래스</td></tr>
</tbody>
</table></div>

<h3>클래스 다이어그램 읽기</h3>
<pre><code>┌──────────────────┐
│    Singleton     │
├──────────────────┤
│ -singleton       │  ← 필드: '-' = private, 밑줄 = static
├──────────────────┤
│ -Singleton       │  ← 생성자: private
│ +getInstance     │  ← 메서드: '+' = public, 밑줄 = static
└──────────────────┘</code></pre>
<p>UML 약속: 앞의 <code>-</code>는 <strong>private</strong>, <code>+</code>는 <strong>public</strong>, <strong>밑줄</strong>은 <strong>static</strong>(클래스 필드·클래스 메서드)이에요. 박스는 위에서부터 클래스명 / 필드(멤버 변수: CV·IV) / 메서드 칸이에요. 📝</p>

<h3>Singleton 클래스 (리스트 5-1)</h3>
<pre><code><span class="hl-kw">public</span> <span class="hl-kw">class</span> Singleton {
    <span class="hl-kw">private</span> <span class="hl-kw">static</span> Singleton singleton = <span class="hl-kw">new</span> Singleton();

    <span class="hl-kw">private</span> Singleton() {
        System.out.println(<span class="hl-str">"인스턴스를 생성했습니다."</span>);
    }

    <span class="hl-kw">public</span> <span class="hl-kw">static</span> Singleton getInstance() {
        <span class="hl-kw">return</span> singleton;
    }
}</code></pre>
<div class="tw"><table>
<thead>
<tr><th>줄</th><th>무엇을 하나</th><th>왜</th></tr>
</thead>
<tbody>
<tr><td><code>private static Singleton singleton = new Singleton();</code></td><td>유일한 인스턴스를 static 필드(클래스 변수)로 만들어 둠</td><td>static이라 클래스에 하나뿐이고, 초기화는 Singleton 클래스를 로드할 때 <strong>한 번만</strong> 실행돼요</td></tr>
<tr><td><code>private Singleton() { … }</code></td><td>생성자를 private으로</td><td>클래스 <strong>외부에서 생성자 호출(new)을 금지</strong>하려고</td></tr>
<tr><td><code>public static Singleton getInstance()</code></td><td>유일한 인스턴스를 돌려줌</td><td>바깥에서는 new를 못 하니 <strong>인스턴스를 얻는 통로</strong>가 필요해요</td></tr>
</tbody>
</table></div>

<p>클래스 밖에 다음 코드가 있으면 <strong>컴파일할 때 에러</strong>가 나요.</p>
<pre><code><span class="hl-kw">new</span> Singleton()   <span class="hl-com">// ✗ 컴파일 에러: Singleton() has private access</span></code></pre>
<p>처음부터 프로그래머가 주의해서 new하지 않으면 private으로 할 필요는 없어요. 하지만 Singleton은 <strong>프로그래머가 어떤 실수를 하더라도</strong> 인스턴스가 하나만 생성되는 것을 보장하는 패턴이고, 이 보장을 위해 생성자를 private으로 해 두는 거예요.</p>
<blockquote>
<p>📝 <strong>수업 필기: new Singleton()을 실행하면</strong></p>
<ol>
<li>메모리에 객체 공간을 만들고</li>
<li>생성자를 호출한다</li>
</ol>
<p>→ <strong>생성자를 호출할 수 없다면 new도 할 수 없다!</strong> → private을 붙이면 외부에서 접근 불가 → new 불가!!</p>
</blockquote>
<blockquote>
<p>📝 <strong>수업 필기: 왜 생성자 몸통(5~6행)이 비어 있어도 될까?</strong></p>
<p>목적은 <strong>private을 붙이는 것 자체</strong>예요. 생성자를 아예 안 쓰면 자바가 자동으로 <strong>public 기본 생성자</strong>를 만들어 버려서 바깥에서 new가 가능해져요. ⚠️ 그래서 비어 있더라도 <code>private Singleton() { }</code>은 꼭 써야 해요.</p>
</blockquote>

<h3>getInstance와 static Factory Method</h3>
<p><code>getInstance</code>는 Singleton 클래스의 유일한 인스턴스를 얻는 메서드예요. 인스턴스를 얻는 static 메서드라서 <strong>static Factory Method</strong>의 일종이에요(p.96). 이름이 꼭 getInstance일 필요는 없지만, <strong>유일한 인스턴스를 얻을 방법은 반드시 필요</strong>해요.</p>

<h3>Main 클래스 (리스트 5-2)와 실행 결과</h3>
<pre><code><span class="hl-kw">public</span> <span class="hl-kw">class</span> Main {
    <span class="hl-kw">public</span> <span class="hl-kw">static</span> <span class="hl-kw">void</span> main(String[] args) {
        System.out.println(<span class="hl-str">"Start."</span>);
        Singleton obj1 = Singleton.getInstance();   <span class="hl-com">// new 안 하고 getInstance()</span>
        Singleton obj2 = Singleton.getInstance();
        <span class="hl-kw">if</span> (obj1 == obj2) {
            System.out.println(<span class="hl-str">"obj1과 obj2는 같은 인스턴스입니다."</span>);
        } <span class="hl-kw">else</span> {
            System.out.println(<span class="hl-str">"obj1과 obj2는 같은 인스턴스가 아닙니다."</span>);
        }
        System.out.println(<span class="hl-str">"End."</span>);
    }
}</code></pre><pre><code>Start.
인스턴스를 생성했습니다.
obj1과 obj2는 같은 인스턴스입니다.
End.</code></pre>
<p><code>getInstance</code>는 두 번 호출되지만 반환값은 같은 인스턴스예요. <code>obj1 == obj2</code>는 <strong>참조가 같은지</strong>(정말 같은 객체인지) 확인하는 비교예요.</p>

<h2 id="g-s3">5.3 Singleton 패턴의 등장인물 <small>p.105</small></h2>
<div class="tw"><table>
<thead>
<tr><th>역할</th><th>하는 일</th><th>교안 예제</th></tr>
</thead>
<tbody>
<tr><td><strong>Singleton</strong></td><td>유일한 인스턴스를 얻기 위한 <strong>static 메서드</strong>를 가짐. 이 메서드는 항상 <strong>같은</strong> 인스턴스를 반환</td><td><code>Singleton</code></td></tr>
</tbody>
</table></div>

<p>Singleton 패턴에는 <strong>Singleton 역만</strong> 등장해요.</p>

<h2 id="g-s4">5.4 독자의 사고를 넓혀 주는 힌트 <small>p.105~106</small></h2>
<h3>어째서 제한할 필요가 있을까?</h3>
<p>제한을 둔다는 것은 <strong>전제 조건을 늘린다</strong>는 뜻이에요. 인스턴스가 여러 개 존재하면 서로 영향을 미쳐 뜻밖의 <strong>버그</strong>를 만들 수 있어요. 하지만 ‘인스턴스가 하나뿐’이라는 보장이 있으면 그 전제 조건 하에서 프로그래밍할 수 있어요.</p>
<h3>유일한 인스턴스는 언제 생성되는가? ⭐</h3>
<p>실행 결과를 보면 <code>Start.</code>가 표시된 <strong>다음</strong>에 ‘인스턴스를 생성했습니다.’가 나와요. 프로그램 실행 후 <strong>처음 getInstance 메서드를 호출할 때 Singleton 클래스가 초기화</strong>되고, 이때 static 필드가 초기화되며 유일한 인스턴스가 만들어져요.</p>
<h3>enum을 이용한 Singleton</h3>
<p>enum의 요소는 상수로서 <strong>인스턴스의 유일성을 보장</strong>받아요. 예를 들어 <code>java.time.Month.APRIL</code>은 4월을 나타내는, 시스템에서 유일한 인스턴스예요. 그래서 요소가 하나뿐인 enum으로 Singleton을 만들 수 있어요.</p>
<pre><code><span class="hl-kw">enum</span> Singleton {
    INSTANCE;
    <span class="hl-kw">public</span> <span class="hl-kw">void</span> hello() {
        System.out.println(<span class="hl-str">"hello is called."</span>);
    }
}

<span class="hl-com">// 사용</span>
Singleton.INSTANCE.hello();</code></pre>
<p>💡 enum은 <code>new</code>로 만들 수 없고, JVM이 상수를 하나만 만들어 줘요. 그래서 private 생성자나 getInstance를 따로 쓰지 않아도 돼요.</p>

<h2 id="g-s5">5.5 멀티스레드와 Singleton (연습 문제 5-3) ⚠️ <small>p.108~109</small></h2>
<p>인스턴스를 <strong>필요할 때 처음 만들도록(lazy)</strong> 바꾼 다음 코드는 여러 스레드에서 호출되면 Singleton이 되지 않아요.</p>
<pre><code><span class="hl-kw">public</span> <span class="hl-kw">class</span> Singleton {
    <span class="hl-kw">private</span> <span class="hl-kw">static</span> Singleton singleton = <span class="hl-kw">null</span>;

    <span class="hl-kw">private</span> Singleton() {
        System.out.println(<span class="hl-str">"인스턴스를 생성했습니다."</span>);
    }

    <span class="hl-kw">public</span> <span class="hl-kw">static</span> Singleton getInstance() {
        <span class="hl-kw">if</span> (singleton == <span class="hl-kw">null</span>) {          <span class="hl-com">// ① 스레드 A, B가 동시에 null을 봄</span>
            singleton = <span class="hl-kw">new</span> Singleton();  <span class="hl-com">// ② 둘 다 new → 인스턴스 2개!</span>
        }
        <span class="hl-kw">return</span> singleton;
    }
}</code></pre>
<p>검사(<code>== null</code>)와 생성(<code>new</code>) 사이에 다른 스레드가 끼어들 수 있기 때문이에요(경쟁 상태). 고치는 방법은 다음과 같아요.</p>
<div class="tw"><table>
<thead>
<tr><th>방법</th><th>코드 핵심</th><th>특징</th></tr>
</thead>
<tbody>
<tr><td>처음부터 생성(eager)</td><td><code>private static Singleton singleton = new Singleton();</code></td><td>교안 리스트 5-1 방식. 클래스 초기화는 JVM이 한 번만 해 줘서 안전하고 가장 간단해요</td></tr>
<tr><td>메서드 동기화</td><td><code>public static synchronized Singleton getInstance()</code></td><td>간단하고 안전. 다만 부를 때마다 잠금 비용</td></tr>
<tr><td>이중 검사 잠금</td><td><code>private static <strong>volatile</strong> Singleton singleton;</code> + 안팎 두 번 null 검사</td><td>잠금은 처음 생성 때만. <strong>volatile 필수</strong></td></tr>
<tr><td>홀더 클래스</td><td><code>private static class Lazy { static final Singleton INSTANCE = new Singleton(); }</code></td><td>getInstance를 처음 부를 때 Lazy가 초기화 → lazy + 스레드 안전</td></tr>
<tr><td>enum</td><td><code>enum Singleton { INSTANCE; }</code></td><td>유일성을 언어가 보장</td></tr>
</tbody>
</table></div>


<h2 id="g-s6">5.6 연습 문제 정리 <small>p.108</small></h2>
<ul>
<li><strong>문제 5-1</strong> TicketMaker(1000, 1001, 1002, … 번호 발급)를 Singleton으로 바꾸기 → private static 필드 + private 생성자 + static getInstance. 번호 증가는 <code>synchronized</code>로 보호하면 더 안전해요.</li>
<li><strong>문제 5-2</strong> 인스턴스가 3개("ALPHA", "BETA", "GAMMA")로 제한되는 Triple → Singleton을 N개로 넓힌 형태. 생성자는 private, 클래스 안에서 3개를 만들어 보관하고 <code>getInstance(String name)</code>으로 꺼내 줘요.</li>
<li><strong>문제 5-3</strong> lazy 초기화 Singleton이 멀티스레드에서 깨지는 이유 → 위 5.5 참고.</li>
</ul>

<h2 id="g-s7">5.7 관련 패턴과 학습 정리 <small>p.106~107</small></h2>
<p>다음 패턴에서는 ‘하나면 충분한’ 역할을 Singleton으로 만들 수 있어요: <strong>Abstract Factory</strong>(part 8), <strong>Builder</strong>(part 7), <strong>Facade</strong>(part 15), <strong>Flyweight</strong>(part 20, FlyweightFactory), <strong>Prototype</strong>(part 6), <strong>State</strong>(part 19).</p>
<blockquote><p>⭐ 정리: 인스턴스를 얻기 위한 <strong>static 메서드</strong>를 준비하고, 실수로 클래스 외부에서 <code>new</code> 되지 않도록 <strong>생성자를 private</strong>으로 만든다.</p></blockquote>
<hr />

<h1 id="g-ch-2">Part 6. Prototype: 복사해서 인스턴스를 만든다</h1>
<h2 id="g-p1">6.1 Prototype 패턴이란 ⭐ <small>p.112~113</small></h2>
<p>보통은 <code>new Something()</code>처럼 <strong>클래스 이름을 지정해서</strong> 인스턴스를 만들어요. 하지만 클래스 이름을 지정하지 않고 인스턴스를 만들고 싶을 때가 있어요. 이럴 때는 클래스로부터 만드는 대신 <strong>인스턴스를 복사해서</strong> 새 인스턴스를 만들어요.</p>
<div class="tw"><table>
<thead>
<tr><th>경우</th><th>설명</th><th>교안 예제에서는</th></tr>
</thead>
<tbody>
<tr><td>(1) 종류가 너무 많아 클래스로 정리할 수 없는 경우</td><td>다룰 오브젝트 종류가 너무 많아 하나하나 클래스로 만들면 소스 파일이 너무 많아짐</td><td>'-' 밑줄, '*' 테두리, '/' 테두리 세 원형. 마음먹으면 얼마든지 늘릴 수 있지만 모두 클래스로 만들면 관리가 어려워요</td></tr>
<tr><td>(2) 클래스로부터 인스턴스 생성이 어려운 경우</td><td>복잡한 과정(예: 사용자가 마우스로 그린 도형)으로 만들어진 인스턴스는 프로그래밍으로 다시 만들기 어려움</td><td>지금 만든 인스턴스를 저장해 두고 필요할 때 복사</td></tr>
<tr><td>(3) 프레임워크와 생성하는 인스턴스를 분리하고 싶은 경우</td><td>인스턴스를 만드는 프레임워크가 특정 클래스에 의존하지 않게</td><td>복제하는 부분을 <code>framework</code> 패키지에 두고, 클래스 이름 대신 "strong message" 같은 <strong>문자열 이름</strong>으로 생성</td></tr>
</tbody>
</table></div>

<p>💡 인스턴스로부터 다른 인스턴스를 만드는 것은 <strong>복사기로 문서를 복사하는 것</strong>과 비슷해요. 원본을 어떻게 만들었는지 몰라도 복사기에 넣으면 같은 서류를 몇 장이든 만들 수 있어요. prototype은 <strong>‘원형’, ‘모범’</strong>이라는 뜻이에요.</p>
<p>Java에서는 복제하는 조작을 <strong>clone</strong>이라고 하고, <code>clone</code> 메서드와 <code>Cloneable</code> 인터페이스를 써요.</p>

<h2 id="g-p2">6.2 예제 프로그램 <small>p.113~119</small></h2>
<p>문자열을 테두리로 감싸서 표시하거나 밑줄을 그어 표시하는 프로그램이에요.</p>
<div class="tw"><table>
<thead>
<tr><th>패키지</th><th>이름</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td>framework</td><td><code>Product</code></td><td>추상 메서드 <code>use</code>와 <code>createCopy</code>가 선언된 인터페이스</td></tr>
<tr><td>framework</td><td><code>Manager</code></td><td><code>createCopy</code>로 인스턴스를 복제하는 클래스</td></tr>
<tr><td>이름 없음</td><td><code>MessageBox</code></td><td>문자열을 테두리로 감싸 표시. use와 createCopy 구현</td></tr>
<tr><td>이름 없음</td><td><code>UnderlinePen</code></td><td>문자열에 밑줄을 그어 표시. use와 createCopy 구현</td></tr>
<tr><td>이름 없음</td><td><code>Main</code></td><td>동작 테스트용 클래스</td></tr>
</tbody>
</table></div>
<pre><code>┌───────────┐   Uses ▶   ┌──────────────────┐
│  Manager  │──────────▶│ &lt;&lt;interface&gt;&gt;    │
├───────────┤            │    Product       │
│ showcase  │            ├──────────────────┤
├───────────┤            │ use              │
│ register  │            │ createCopy       │
│ create    │            └────────△─────────┘
└───────────┘                     ┆ (구현)
                     ┌────────────┴────────────┐
             ┌───────┴──────┐          ┌───────┴──────┐
             │ UnderlinePen │          │  MessageBox  │
             ├──────────────┤          ├──────────────┤
             │ ulchar       │          │ decochar     │
             │ use          │          │ use          │
             │ createCopy   │          │ createCopy   │
             └──────────────┘          └──────────────┘</code></pre>
<h3>Product 인터페이스 (리스트 6-1)</h3>
<pre><code><span class="hl-kw">package</span> framework;

<span class="hl-kw">public</span> <span class="hl-kw">interface</span> Product <span class="hl-kw">extends</span> Cloneable {
    <span class="hl-kw">public</span> <span class="hl-kw">abstract</span> <span class="hl-kw">void</span> use(String s);
    <span class="hl-kw">public</span> <span class="hl-kw">abstract</span> Product createCopy();
}</code></pre>
<p><code>java.lang.Cloneable</code>을 상속했기 때문에 이 인터페이스를 구현한 클래스의 인스턴스는 <code>clone</code>으로 자동 복제할 수 있어요. <code>use</code>는 ‘사용’하기 위한 메서드인데 무엇을 할지는 하위 클래스에 맡기고, <code>createCopy</code>는 인스턴스를 복제하는 메서드예요.</p>

<h3>Manager 클래스 (리스트 6-2) ⭐</h3>
<pre><code><span class="hl-kw">package</span> framework;

<span class="hl-kw">import</span> java.util.HashMap;
<span class="hl-kw">import</span> java.util.Map;

<span class="hl-kw">public</span> <span class="hl-kw">class</span> Manager {
    <span class="hl-kw">private</span> Map&lt;String,Product&gt; showcase = <span class="hl-kw">new</span> HashMap&lt;&gt;();

    <span class="hl-kw">public</span> <span class="hl-kw">void</span> register(String name, Product prototype) {
        showcase.put(name, prototype);
    }

    <span class="hl-kw">public</span> Product create(String prototypeName) {
        Product p = showcase.get(prototypeName);
        <span class="hl-kw">return</span> p.createCopy();
    }
}</code></pre>
<ul>
<li><code>showcase</code>: ‘이름’과 ‘원형 인스턴스’의 대응을 <code>Map&lt;String,Product&gt;</code>로 보관해요. 진열장이라고 생각하면 돼요.</li>
<li><code>register</code>: 이름과 원형을 등록해요. 넘어오는 prototype의 실제 클래스는 몰라도, Product를 구현했으니 use와 createCopy를 부를 수 있어요.</li>
<li><code>create</code>: 이름으로 원형을 꺼내 <code>createCopy()</code>로 복제해 돌려줘요.</li>
</ul>
<blockquote><p>⭐ Product와 Manager 소스에는 <code>MessageBox</code>, <code>UnderlinePen</code>이라는 클래스 이름이 <strong>전혀 나오지 않아요</strong>. 그래서 그 클래스들과 <strong>독립적으로 수정</strong>할 수 있어요. <strong>소스 코드 안에 클래스 이름을 기술하면 그 클래스와 밀접한 관계가 생겨 버려요.</strong> Manager는 오직 Product라는 인터페이스 이름만 쓰고, 이 인터페이스가 Manager와 다른 클래스를 잇는 다리가 돼요.</p></blockquote>

<h3>MessageBox 클래스 (리스트 6-3)</h3>
<pre><code><span class="hl-kw">import</span> framework.Product;

<span class="hl-kw">public</span> <span class="hl-kw">class</span> MessageBox <span class="hl-kw">implements</span> Product {
    <span class="hl-kw">private</span> <span class="hl-kw">char</span> decochar;

    <span class="hl-kw">public</span> MessageBox(<span class="hl-kw">char</span> decochar) {
        <span class="hl-kw">this</span>.decochar = decochar;
    }

    <span class="hl-com">@Override</span>
    <span class="hl-kw">public</span> <span class="hl-kw">void</span> use(String s) {
        <span class="hl-kw">int</span> decolen = <span class="hl-num">1</span> + s.length() + <span class="hl-num">1</span>;
        <span class="hl-kw">for</span> (<span class="hl-kw">int</span> i = <span class="hl-num">0</span>; i &lt; decolen; i++) {
            System.out.print(decochar);
        }
        System.out.println();
        System.out.println(decochar + s + decochar);
        <span class="hl-kw">for</span> (<span class="hl-kw">int</span> i = <span class="hl-num">0</span>; i &lt; decolen; i++) {
            System.out.print(decochar);
        }
        System.out.println();
    }

    <span class="hl-com">@Override</span>
    <span class="hl-kw">public</span> Product createCopy() {
        Product p = <span class="hl-kw">null</span>;
        <span class="hl-kw">try</span> {
            p = (Product)clone();
        } <span class="hl-kw">catch</span> (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        <span class="hl-kw">return</span> p;
    }
}</code></pre>
<p><code>decochar</code>는 문자열을 장식처럼 감싸는 문자예요. decochar가 <code>'*'</code>이고 <code>use("Hello")</code>면 다음처럼 표시돼요.</p>
<pre><code>*******
*Hello*
*******</code></pre>
<p><code>createCopy</code>는 자기 자신을 복제하는 메서드예요. <code>clone</code>은 Java 언어 사양으로 규정된, 자기 자신의 복제를 만드는 메서드이고 필드 값도 그대로 새 인스턴스에 복사돼요. clone으로 복사할 수 있는 건 <code>java.lang.Cloneable</code>을 구현한 클래스뿐이라, 구현하지 않으면 <code>CloneNotSupportedException</code>이 날 수 있어 try…catch로 처리해요. MessageBox는 Product만 구현했지만 Product가 Cloneable을 확장했으므로 예외가 나지 않아요.</p>
<p>⚠️ <code>clone</code>은 자신의 클래스(와 하위 클래스)에서만 호출할 수 있어요(protected). 그래서 다른 클래스의 요청으로 복제하려면 <code>createCopy</code> 같은 별도 메서드로 clone을 <strong>감싸 줘야</strong> 해요.</p>

<h3>UnderlinePen 클래스 (리스트 6-4)</h3>
<pre><code><span class="hl-com">@Override</span>
<span class="hl-kw">public</span> <span class="hl-kw">void</span> use(String s) {
    <span class="hl-kw">int</span> ulen = s.length();
    System.out.println(s);
    <span class="hl-kw">for</span> (<span class="hl-kw">int</span> i = <span class="hl-num">0</span>; i &lt; ulen; i++) {
        System.out.print(ulchar);
    }
    System.out.println();
}</code></pre>
<p>MessageBox와 거의 같은데 <code>ulchar</code>가 ‘밑줄’로 쓰여요. ulchar가 <code>'-'</code>이고 <code>use("Hello")</code>면 <code>Hello</code> 아래에 <code>-----</code>를 그어요. createCopy는 MessageBox와 똑같아요.</p>

<h3>Main 클래스 (리스트 6-5)와 실행 결과</h3>
<div class="tw"><table>
<thead>
<tr><th>이름</th><th>클래스 및 인스턴스의 내용</th></tr>
</thead>
<tbody>
<tr><td>"strong message"</td><td>UnderlinePen에서 ulchar가 '-'</td></tr>
<tr><td>"warning box"</td><td>MessageBox에서 decochar가 '*'</td></tr>
<tr><td>"slash box"</td><td>MessageBox에서 decochar가 '/'</td></tr>
</tbody>
</table></div>
<pre><code>Manager manager = <span class="hl-kw">new</span> Manager();
UnderlinePen upen = <span class="hl-kw">new</span> UnderlinePen(<span class="hl-str">'-'</span>);
MessageBox mbox = <span class="hl-kw">new</span> MessageBox(<span class="hl-str">'*'</span>);
MessageBox sbox = <span class="hl-kw">new</span> MessageBox(<span class="hl-str">'/'</span>);

manager.register(<span class="hl-str">"strong message"</span>, upen);   <span class="hl-com">// 등록</span>
manager.register(<span class="hl-str">"warning box"</span>, mbox);
manager.register(<span class="hl-str">"slash box"</span>, sbox);

Product p1 = manager.create(<span class="hl-str">"strong message"</span>);   <span class="hl-com">// 생성과 사용</span>
p1.use(<span class="hl-str">"Hello, world."</span>);
Product p2 = manager.create(<span class="hl-str">"warning box"</span>);
p2.use(<span class="hl-str">"Hello, world."</span>);
Product p3 = manager.create(<span class="hl-str">"slash box"</span>);
p3.use(<span class="hl-str">"Hello, world."</span>);</code></pre><pre><code>Hello, world.          ← p1.use의 출력
-------------
***************        ← p2.use의 출력
*Hello, world.*
***************
///////////////        ← p3.use의 출력
/Hello, world./
///////////////</code></pre>

<h2 id="g-p3">6.3 Prototype 패턴의 등장인물 ⭐ <small>p.120</small></h2>
<div class="tw"><table>
<thead>
<tr><th>역할</th><th>하는 일</th><th>교안 예제</th></tr>
</thead>
<tbody>
<tr><td><strong>Prototype</strong>(원형)</td><td>인스턴스를 복사해 새 인스턴스를 만들기 위한 메서드를 <strong>결정</strong></td><td><code>Product</code> 인터페이스</td></tr>
<tr><td><strong>ConcretePrototype</strong>(구체적인 원형)</td><td>인스턴스를 복사해 새 인스턴스를 만드는 메서드를 <strong>구현</strong></td><td><code>MessageBox</code>, <code>UnderlinePen</code></td></tr>
<tr><td><strong>Client</strong>(이용자)</td><td>복사하는 메서드를 이용해 새 인스턴스를 만듦</td><td><code>Manager</code></td></tr>
</tbody>
</table></div>
<pre><code>┌────────┐  Uses ▶  ┌─────────────┐
│ Client │────────▶│ Prototype   │
└────────┘          │ createCopy  │
                    └──────△──────┘
                           │
                 ┌─────────┴─────────┐
                 │ ConcretePrototype │
                 │ createCopy        │
                 └───────────────────┘</code></pre>

<h2 id="g-p4">6.4 독자의 사고를 넓혀 주는 힌트 <small>p.121~122</small></h2>
<h3>클래스에서 인스턴스를 만들면 안 되는 것일까?</h3>
<p>그냥 <code>new Something()</code>이면 되는데 왜 Prototype이 필요할까요? 답은 6.1의 세 가지 경우예요. 특히 (3)에서 Manager의 <code>create</code>는 클래스 이름 대신 "strong message" 같은 문자열을 인스턴스 생성용 이름으로 받아요. 이는 Java의 <code>new Something()</code> 형식을 더 일반화해서 <strong>클래스 이름의 속박으로부터 프레임워크를 분리</strong>했다고 할 수 있어요.</p>
<h3>클래스 이름은 속박인가</h3>
<p>객체지향 프로그래밍의 목표 중 하나는 <strong>‘부품으로서의 재사용’</strong>이에요. 소스 안에 클래스 이름을 쓰는 게 항상 나쁜 건 아니지만, <strong>소스 코드 안에 이용할 클래스 이름이 쓰여 있으면 그 클래스와 분리해서 재사용할 수 없어요.</strong></p>
<p>물론 소스를 수정하면 클래스 이름을 바꿀 수 있지만, ‘부품으로서의 재사용’에서는 소스 수정을 고려하지 않아요. Java로 말하면 <strong>클래스 파일(.class)만 있어도 재사용할 수 있느냐</strong>, 즉 소스 파일(.java)이 없어도 재사용할 수 있느냐가 포인트예요. 밀접하게 결합해야 하는 클래스 이름은 써도 되지만, 부품으로 독립시켜야 하는 클래스 이름이 소스에 쓰이면 문제가 돼요.</p>

<h2 id="g-p5">6.5 보강: clone 메서드와 java.lang.Cloneable ⭐ <small>p.123~124</small></h2>
<div class="tw"><table>
<thead>
<tr><th>주제</th><th>핵심</th></tr>
</thead>
<tbody>
<tr><td>Java 언어의 clone</td><td>clone을 실행할 때 복사 대상 클래스는 <code>java.lang.Cloneable</code>을 <strong>구현해야만</strong> 해요. 직접 구현해도, 상위 클래스·상위 인터페이스를 통해 구현해도 돼요. 반환값은 복사로 만들어진 인스턴스예요(원본과 같은 크기의 메모리를 확보하고 필드 내용을 복사)</td></tr>
<tr><td>구현 여부에 따른 결과</td><td>Cloneable 구현 → 복사됨 / 구현 안 함 → <code>CloneNotSupportedException</code> 발생</td></tr>
<tr><td>import</td><td><code>java.lang</code>은 자동으로 import되므로 그냥 <code>Cloneable</code>이라고 써도 돼요</td></tr>
<tr><td>clone은 어디에 정의?</td><td><code>java.lang.Object</code>. 최상위 클래스라 모든 클래스가 clone을 상속해요</td></tr>
<tr><td>Cloneable이 요구하는 메서드</td><td><strong>없어요.</strong> ‘clone으로 복제를 허용한다’는 의도적인 표시로만 쓰는 <strong>마커 인터페이스</strong>(marker interface)예요. 원래는 Cloneable 안에 clone을 선언했어야 했고, 그랬다면 CloneNotSupportedException도 필요 없었을 거예요</td></tr>
<tr><td>clone은 얕은 복사</td><td>필드 내용을 그대로 복사할 뿐, 필드가 가리키는 인스턴스 내용까지는 신경 쓰지 않아요. 필드에 배열이 있으면 <strong>배열 참조만</strong> 복사되고 요소는 복사되지 않아요. 이런 필드 대 필드 복사(field-for-field copy)를 <strong>얕은 복사(shallow copy)</strong>라고 해요</td></tr>
<tr><td>clone 오버라이드</td><td>얕은 복사로 부족하면 clone을 오버라이드해 필요한 ‘복사’를 정의할 수 있어요. 이때 <code>super.clone()</code>으로 상위 클래스의 clone을 호출하는 걸 잊지 마세요</td></tr>
<tr><td>생성자는 안 불림</td><td>clone은 단지 복사만 하고 <strong>생성자를 호출하지 않아요</strong>. 특수한 초기화가 필요한 클래스는 clone 안에 처리를 써야 해요</td></tr>
<tr><td>clone은 사용하기 어렵다</td><td>Object의 clone이 <strong>protected</strong>라 상속 관계가 없는 클래스의 clone을 호출하기 어려워요. 실제 설계에서는 clone에 의존하지 말고 <strong>복사 생성자</strong>나 <strong>복사 팩토리</strong>를 쓰는 편이 좋아요(문제 6-2)</td></tr>
</tbody>
</table></div>

<h3>얕은 복사 vs 깊은 복사 💡</h3>
<pre><code><span class="hl-kw">class</span> Box <span class="hl-kw">implements</span> Cloneable {
    <span class="hl-kw">int</span> size;
    <span class="hl-kw">int</span>[] items = {<span class="hl-num">1</span>, <span class="hl-num">2</span>, <span class="hl-num">3</span>};

    <span class="hl-com">@Override</span>
    <span class="hl-kw">public</span> Box clone() {
        <span class="hl-kw">try</span> {
            Box copy = (Box) <span class="hl-kw">super</span>.clone();   <span class="hl-com">// 얕은 복사: items는 같은 배열을 가리킴</span>
            copy.items = items.clone();       <span class="hl-com">// 깊은 복사: 배열도 새로 복사</span>
            <span class="hl-kw">return</span> copy;
        } <span class="hl-kw">catch</span> (CloneNotSupportedException e) {
            <span class="hl-kw">throw</span> <span class="hl-kw">new</span> AssertionError(e);
        }
    }
}</code></pre>
<p>⚠️ <code>copy.items = items.clone();</code> 줄이 없으면 복사본의 배열을 바꿀 때 원본 배열도 같이 바뀌어요.</p>

<h2 id="g-p6">6.6 연습 문제 정리 <small>p.126</small></h2>
<ul>
<li><strong>문제 6-1</strong> MessageBox와 UnderlinePen에 똑같은 createCopy가 있어요 → Product를 구현하는 <strong>추상 클래스</strong>(예: AbstractProduct)에 createCopy를 한 번만 구현하고 두 클래스가 그것을 상속하게 해요.</li>
<li><strong>문제 6-2</strong> 복사 생성자로 다시 쓰기 → <code>public MessageBox(MessageBox prototype) { this.decochar = prototype.decochar; }</code>를 만들고 <code>createCopy()</code>에서 <code>return new MessageBox(this);</code>. Cloneable과 try-catch가 필요 없어져요.</li>
</ul>

<h2 id="g-p7">6.7 관련 패턴과 학습 정리 <small>p.122, 125</small></h2>
<div class="tw"><table>
<thead>
<tr><th>패턴</th><th>관계</th></tr>
</thead>
<tbody>
<tr><td>Flyweight (part 20)</td><td>Prototype은 현재 인스턴스와 동일한 상태의 <strong>별도 인스턴스</strong>를 만들어 이용. Flyweight는 <strong>하나의 인스턴스를 여러 장소에서 공유</strong></td></tr>
<tr><td>Memento (part 18)</td><td>Prototype은 같은 상태의 별도 인스턴스를 만듦. Memento는 스냅샷과 undo를 위해 현재 인스턴스 상태를 저장</td></tr>
<tr><td>Composite (part 11), Decorator (part 12)</td><td>이 패턴들을 많이 쓰면 복잡한 구조의 인스턴스가 동적으로 만들어지는데, 이때 Prototype이 편리</td></tr>
<tr><td>Command (part 22)</td><td>Command 패턴의 명령을 복제하고 싶을 때 Prototype 사용</td></tr>
</tbody>
</table></div>

<blockquote><p>⭐ 정리: 클래스에서 인스턴스를 만드는 것이 아니라 <strong>인스턴스에서 새로운 인스턴스를 만드는</strong> Prototype 패턴을 배웠어요. 또한 clone 메서드와 Cloneable 인터페이스 사용법도 배웠어요.</p></blockquote>
<hr />

<h1 id="g-ch-3">Part 17. Observer: 상태 변화를 알려 준다</h1>
<h2 id="g-o1">17.1 Observer 패턴이란 ⭐ <small>p.308</small></h2>
<p>observer란 관찰(observe)하는 사람, 즉 <strong>‘관찰자’</strong>라는 뜻이에요. Observer 패턴에서는 <strong>관찰 대상의 상태가 변화하면 관찰자에게 알려요</strong>. 그래서 상태 변화에 따른 처리를 기술할 때 효과적이에요.</p>
<p>💡 유튜브 채널 ‘구독’을 떠올려 보세요. 구독자(Observer)는 채널(Subject)을 계속 들여다보지 않아요. 새 영상이 올라오면 채널이 구독자 모두에게 알림을 보내 줘요.</p>

<h2 id="g-o2">17.2 예제 프로그램 <small>p.308~313</small></h2>
<p>수를 많이 생성하는 객체를 관찰자가 관찰하고 그 값을 표시하는 단순한 프로그램이에요. 표시 방법은 관찰자마다 달라요. DigitObserver는 값을 <strong>숫자</strong>로, GraphObserver는 <strong>간단한 그래프</strong>(<code>*****</code>)로 표시해요.</p>
<div class="tw"><table>
<thead>
<tr><th>이름</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code>Observer</code></td><td>관찰자를 나타내는 <strong>인터페이스</strong></td></tr>
<tr><td><code>NumberGenerator</code></td><td>수를 생성하는 객체를 나타내는 <strong>추상 클래스</strong></td></tr>
<tr><td><code>RandomNumberGenerator</code></td><td>랜덤하게 수를 생성하는 클래스</td></tr>
<tr><td><code>DigitObserver</code></td><td>숫자로 수를 표시하는 클래스</td></tr>
<tr><td><code>GraphObserver</code></td><td>간이 그래프로 수를 표시하는 클래스</td></tr>
<tr><td><code>Main</code></td><td>동작 테스트용 클래스</td></tr>
</tbody>
</table></div>
<pre><code>┌──────────────────┐   Notifies ▶   ┌───────────────┐
│ NumberGenerator  │◇──────────────▶│ &lt;&lt;interface&gt;&gt; │
├──────────────────┤                 │   Observer    │
│ observers        │                 ├───────────────┤
├──────────────────┤                 │ update        │
│ addObserver      │                 └───────△───────┘
│ deleteObserver   │                         ┆ (구현)
│ notifyObservers  │              ┌──────────┴──────────┐
│ getNumber (추상)  │     ┌────────┴──────┐     ┌────────┴──────┐
│ execute   (추상)  │     │ DigitObserver │     │ GraphObserver │
└────────△─────────┘     │ update        │     │ update        │
         │                └───────────────┘     └───────────────┘
┌────────┴──────────────┐
│ RandomNumberGenerator │
│ random, number        │
│ getNumber, execute    │
└───────────────────────┘</code></pre>
<h3>Observer 인터페이스 (리스트 17-1)</h3>
<pre><code><span class="hl-kw">public</span> <span class="hl-kw">interface</span> Observer {
    <span class="hl-kw">public</span> <span class="hl-kw">abstract</span> <span class="hl-kw">void</span> update(NumberGenerator generator);
}</code></pre>
<p>‘관찰자’를 나타내는 인터페이스예요. 구체적인 관찰자가 이 인터페이스를 구현해요. <code>update</code>를 호출하는 쪽은 수를 생성하는 NumberGenerator예요(generator = ‘생성하는 것’). update는 NumberGenerator가 <strong>‘내용이 갱신되었어요. 표시하는 쪽도 갱신해 주세요’</strong>라고 Observer에 전달하기 위한 메서드예요.</p>
<p>⚠️ 이 Observer는 예제용으로 만든 것이고, Java 라이브러리의 <code>java.util.Observer</code>와는 달라요. <code>java.util.Observer</code>는 <strong>비추천(deprecated)</strong> 인터페이스라 새 프로그램에는 쓰지 않아요. 📝</p>

<h3>NumberGenerator 클래스 (리스트 17-2) ⭐</h3>
<pre><code><span class="hl-kw">import</span> java.util.ArrayList;
<span class="hl-kw">import</span> java.util.List;

<span class="hl-kw">public</span> <span class="hl-kw">abstract</span> <span class="hl-kw">class</span> NumberGenerator {
    <span class="hl-com">// Observer를 저장한다</span>
    <span class="hl-kw">private</span> List&lt;Observer&gt; observers = <span class="hl-kw">new</span> ArrayList&lt;&gt;();

    <span class="hl-com">// Observer를 추가한다</span>
    <span class="hl-kw">public</span> <span class="hl-kw">void</span> addObserver(Observer observer) {
        observers.add(observer);
    }

    <span class="hl-com">// Observer를 제거한다</span>
    <span class="hl-kw">public</span> <span class="hl-kw">void</span> deleteObserver(Observer observer) {
        observers.remove(observer);
    }

    <span class="hl-com">// Observer에 통지한다</span>
    <span class="hl-kw">public</span> <span class="hl-kw">void</span> notifyObservers() {
        <span class="hl-kw">for</span> (Observer o: observers) {
            o.update(<span class="hl-kw">this</span>);
        }
    }

    <span class="hl-com">// 수를 취득한다</span>
    <span class="hl-kw">public</span> <span class="hl-kw">abstract</span> <span class="hl-kw">int</span> getNumber();

    <span class="hl-com">// 수를 생성한다</span>
    <span class="hl-kw">public</span> <span class="hl-kw">abstract</span> <span class="hl-kw">void</span> execute();
}</code></pre><div class="tw"><table>
<thead>
<tr><th>요소</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code>abstract class</code></td><td>수를 생성하는 추상 클래스(📝 ‘추상’). 실제로 수를 생성하는 부분(execute)과 수를 얻는 부분(getNumber)은 하위 클래스에서 구현해야 하는 <strong>추상 메서드</strong>예요(subclass responsibility)</td></tr>
<tr><td><code>observers</code></td><td>NumberGenerator를 관찰하는 Observer들을 저장하는 필드. 형은 <code>List</code>, 실제 객체는 <code>ArrayList</code>예요(📝 ‘구현체 저장, List’)</td></tr>
<tr><td><code>addObserver</code> / <code>deleteObserver</code></td><td>Observer를 추가·제거</td></tr>
<tr><td><code>notifyObservers</code></td><td>모든 Observer에 ‘내용이 바뀌었으니 표시를 갱신하라’고 알려요. 저장된 Observer <strong>하나하나의 update</strong>를 호출하고, 인수로 <code>this</code>(관찰 대상 자신)를 넘겨요</td></tr>
</tbody>
</table></div>

<h3>RandomNumberGenerator 클래스 (리스트 17-3)</h3>
<pre><code><span class="hl-kw">import</span> java.util.Random;

<span class="hl-kw">public</span> <span class="hl-kw">class</span> RandomNumberGenerator <span class="hl-kw">extends</span> NumberGenerator {
    <span class="hl-kw">private</span> Random random = <span class="hl-kw">new</span> Random();   <span class="hl-com">// 난수 생성기</span>
    <span class="hl-kw">private</span> <span class="hl-kw">int</span> number;                     <span class="hl-com">// 현재 수</span>

    <span class="hl-com">// 수를 취득한다</span>
    <span class="hl-com">@Override</span>
    <span class="hl-kw">public</span> <span class="hl-kw">int</span> getNumber() {
        <span class="hl-kw">return</span> number;
    }

    <span class="hl-com">// 수를 생성한다</span>
    <span class="hl-com">@Override</span>
    <span class="hl-kw">public</span> <span class="hl-kw">void</span> execute() {
        <span class="hl-kw">for</span> (<span class="hl-kw">int</span> i = <span class="hl-num">0</span>; i &lt; <span class="hl-num">20</span>; i++) {
            number = random.nextInt(<span class="hl-num">50</span>);
            notifyObservers();
        }
    }
}</code></pre>
<p>NumberGenerator의 하위 클래스로 난수를 생성해요. <code>random</code>에는 <code>java.util.Random</code> 인스턴스(난수 생성기), <code>number</code>에는 현재 난수 값이 저장돼요. <code>execute</code>는 난수(0~49)를 20개 만들고, <strong>만들 때마다 notifyObservers로 관찰자에게 통지</strong>해요. <code>nextInt(50)</code>은 0 이상, 인수로 지정한 수 미만의 정수를 반환해요.</p>

<h3>DigitObserver · GraphObserver 클래스 (리스트 17-4, 17-5)</h3>
<pre><code><span class="hl-kw">public</span> <span class="hl-kw">class</span> DigitObserver <span class="hl-kw">implements</span> Observer {
    <span class="hl-com">@Override</span>
    <span class="hl-kw">public</span> <span class="hl-kw">void</span> update(NumberGenerator generator) {
        System.out.println(<span class="hl-str">"DigitObserver:"</span> + generator.getNumber());
        <span class="hl-kw">try</span> {
            Thread.sleep(<span class="hl-num">100</span>);
        } <span class="hl-kw">catch</span> (InterruptedException e) {
        }
    }
}

<span class="hl-kw">public</span> <span class="hl-kw">class</span> GraphObserver <span class="hl-kw">implements</span> Observer {
    <span class="hl-com">@Override</span>
    <span class="hl-kw">public</span> <span class="hl-kw">void</span> update(NumberGenerator generator) {
        System.out.print(<span class="hl-str">"GraphObserver:"</span>);
        <span class="hl-kw">int</span> count = generator.getNumber();
        <span class="hl-kw">for</span> (<span class="hl-kw">int</span> i = <span class="hl-num">0</span>; i &lt; count; i++) {
            System.out.print(<span class="hl-str">"*"</span>);
        }
        System.out.println(<span class="hl-str">""</span>);
        <span class="hl-kw">try</span> {
            Thread.sleep(<span class="hl-num">100</span>);
        } <span class="hl-kw">catch</span> (InterruptedException e) {
        }
    }
}</code></pre>
<p>둘 다 Observer 인터페이스를 <strong>구현(implements)</strong>해요. update 안에서 인수로 받은 NumberGenerator의 <code>getNumber</code>로 수를 얻어 표시해요. 표시되는 모습을 잘 볼 수 있도록 <code>Thread.sleep</code>으로 속도를 늦췄어요.</p>

<h3>Main 클래스 (리스트 17-6)와 실행 결과</h3>
<pre><code><span class="hl-kw">public</span> <span class="hl-kw">class</span> Main {
    <span class="hl-kw">public</span> <span class="hl-kw">static</span> <span class="hl-kw">void</span> main(String[] args) {
        NumberGenerator generator = <span class="hl-kw">new</span> RandomNumberGenerator();
        Observer observer1 = <span class="hl-kw">new</span> DigitObserver();
        Observer observer2 = <span class="hl-kw">new</span> GraphObserver();
        generator.addObserver(observer1);
        generator.addObserver(observer2);
        generator.execute();
    }
}</code></pre><pre><code>DigitObserver:24
GraphObserver:************************
DigitObserver:23
GraphObserver:***********************
DigitObserver:39
GraphObserver:***************************************
(이하 생략)</code></pre>
<p>RandomNumberGenerator 인스턴스를 1개, 관찰자를 2개 만들어요. addObserver로 관찰자를 등록한 뒤 execute로 수를 생성해요. 수 하나마다 <strong>먼저 등록한 DigitObserver → GraphObserver</strong> 순서로 출력돼요.</p>

<h2 id="g-o3">17.3 Observer 패턴의 등장인물 ⭐ <small>p.314</small></h2>
<div class="tw"><table>
<thead>
<tr><th>역할</th><th>하는 일</th><th>교안 예제</th></tr>
</thead>
<tbody>
<tr><td><strong>Subject</strong>(관찰 대상)</td><td>‘관찰되는 대상’. Observer를 <strong>등록·삭제</strong>하는 메서드와 ‘현재 상태를 가져오는’ 메서드를 가짐</td><td><code>NumberGenerator</code></td></tr>
<tr><td><strong>ConcreteSubject</strong>(구체적인 관찰 대상)</td><td>구체적인 관찰 대상. 상태가 변경되면 <strong>등록된 Observer에 알림</strong></td><td><code>RandomNumberGenerator</code></td></tr>
<tr><td><strong>Observer</strong>(관찰자)</td><td>Subject로부터 ‘상태가 변화했어요’라고 전달받음. 전달받는 메서드가 <code>update</code></td><td><code>Observer</code> 인터페이스</td></tr>
<tr><td><strong>ConcreteObserver</strong>(구체적인 관찰자)</td><td>update가 호출되면 그 안에서 <strong>Subject의 현재 상태를 취득</strong></td><td><code>DigitObserver</code>, <code>GraphObserver</code></td></tr>
</tbody>
</table></div>
<pre><code>┌─────────────────┐   Notifies ▶   ┌──────────┐
│     Subject     │◇──────────────▶│ Observer │
│ observers       │                 │ update   │
│ addObserver     │                 └────△─────┘
│ deleteObserver  │                      │
│ notifyObservers │              ┌───────┴────────┐
│ getSubjectStatus│              │ConcreteObserver│
└───────△─────────┘              │ update         │
        │                         └────────────────┘
┌───────┴─────────┐
│ ConcreteSubject │
│ getSubjectStatus│
└─────────────────┘</code></pre>

<h2 id="g-o4">17.4 독자의 사고를 넓혀 주는 힌트 <small>p.315~318</small></h2>
<h3>여기에도 교환 가능성이 등장한다 ⭐</h3>
<p>디자인 패턴의 목적 중 하나는 클래스를 <strong>재사용 가능한 부품</strong>으로 만드는 거예요. Observer 패턴에는 상태를 가진 ConcreteSubject와 상태 변화를 통보받는 ConcreteObserver가 등장하고, 둘을 연결하는 것이 인터페이스(API)로서의 <strong>Subject와 Observer</strong>예요.</p>
<ul>
<li>RandomNumberGenerator는 지금 관찰하는 것이 DigitObserver인지 GraphObserver인지 모르고 신경 쓰지도 않아요. 다만 observers에 저장된 인스턴스가 <strong>Observer 인터페이스를 구현</strong>한다는 것, 즉 update를 호출할 수 있다는 것만 알아요.</li>
<li>DigitObserver도 관찰 대상이 RandomNumberGenerator인지 다른 XXXXNumberGenerator인지 신경 쓰지 않아요. NumberGenerator의 하위 클래스이고 getNumber를 가진다는 것만 알아요.</li>
</ul>
<blockquote><p>📝 ★ <strong>추상 클래스나 인터페이스를 사용하여 구상 클래스로부터 추상 메서드를 분리한다.</strong><br>★ <strong>인수로 인스턴스를 전달할 때나 필드로 인스턴스를 저장할 때는 구상 클래스형으로 하지 않고 추상 클래스나 인터페이스형으로 해 둔다.</strong><br>→ 이렇게 하면 구상 클래스 부분을 쉽게 교환할 수 있어요.</p></blockquote>

<h3>Observer의 순서 ⚠️</h3>
<p>예제의 notifyObservers는 <strong>먼저 등록한 Observer의 update가 먼저</strong> 호출돼요. 하지만 일반적으로 ConcreteObserver는 update가 호출되는 순서가 바뀌어도 문제가 없도록 설계해야 해요. ‘DigitObserver의 update 다음이 아니면 GraphObserver가 제대로 동작하지 않는다’ 같은 일은 없어야 해요. 각 클래스의 독립성이 유지되면 의존성의 혼란은 일어나지 않아요.</p>

<h3>Observer의 행위가 Subject에 영향을 미칠 때 ⚠️</h3>
<p>예제에서는 RandomNumberGenerator가 내부에서 데이터를 만들고 notifyObservers를 거쳐 update를 불렀어요. 일반적으로는 update를 부르는 계기가 다른 클래스에서 오기도 해요(예: GUI에서 사용자가 버튼을 누르는 이벤트). 그런데 그 계기가 <strong>해당 Observer 자신</strong>이면 조심해서 설계하지 않을 경우 메서드 호출이 영원히 계속될 수 있어요.</p>
<pre><code>Subject 상태 변화
  ↓
Observer로 통지
  ↓
Observer가 Subject의 메서드 호출
  ↓
그에 따라 Subject 상태 변화
  ↓
Observer로 통지
  ↓
…</code></pre>
<p>대책: 현재 통지 처리 중인지 아닌지를 <strong>Observer가 판단</strong>하거나, 통지하는 <strong>타이밍을 Subject가 고려</strong>해요.</p>

<h3>갱신을 위한 힌트 정보 다루기</h3>
<pre><code><span class="hl-kw">void</span> update(NumberGenerator generator);               <span class="hl-com">// (1)</span>
<span class="hl-kw">void</span> update(NumberGenerator generator, <span class="hl-kw">int</span> number);   <span class="hl-com">// (2)</span>
<span class="hl-kw">void</span> update(<span class="hl-kw">int</span> number);                              <span class="hl-com">// (3)</span></code></pre><div class="tw"><table>
<thead>
<tr><th>형태</th><th>넘겨주는 것</th><th>특징</th></tr>
</thead>
<tbody>
<tr><td>(1)</td><td>Subject만</td><td>Observer가 필요에 따라 Subject에서 정보를 얻음(예제 방식)</td></tr>
<tr><td>(2)</td><td>Subject + <strong>힌트 정보</strong>(갱신 정보 전체)</td><td>Observer가 정보를 얻어 오는 수고를 줄임. 다만 Subject가 Observer의 처리 내용을 <strong>의식</strong>하게 됨. 복잡한 프로그램에서는 어느 정도의 힌트를 줄지 잘 판단해야 함</td></tr>
<tr><td>(3)</td><td>힌트 정보만</td><td>예제에서는 동작하지만, 하나의 Observer가 <strong>여러 Subject를 관찰</strong>하면 부적절. 넘어온 수가 어느 Subject의 정보인지 모름</td></tr>
</tbody>
</table></div>

<h3>‘관찰’하기보다 ‘전달’받기를 기다린다</h3>
<p>observer의 본래 의미는 ‘관찰자’지만, 실제로 Observer 역은 능동적으로 관찰하지 않고 Subject 역에서 ‘알려 주는 것’을 <strong>수동적으로 기다려요</strong>. 그래서 <strong>Publish-Subscribe</strong> 패턴으로도 불려요. publish(발행)와 subscribe(구독)라는 표현이 더 실체에 맞을지도 몰라요.</p>

<h3>Model / View / Controller (MVC)</h3>
<p>MVC 구조에서 Model과 View의 관계는 Observer 패턴의 <strong>Subject와 Observer 관계</strong>에 대응해요. Model은 ‘표시 형식에 의존하지 않는 내부 모델’을 조작하는 부분, View는 Model을 ‘어떻게 보여 줄지’ 관리하는 부분이에요. 일반적으로 <strong>하나의 Model에 여러 View</strong>가 대응해요.</p>

<h2 id="g-o5">17.5 연습 문제 정리 <small>p.319~320</small></h2>
<ul>
<li><strong>문제 17-1</strong> 수가 점점 증가하는 <code>IncrementalNumberGenerator</code>(시작하는 수, 종료하는 수(포함 안 함), 증갓값) 만들기 → NumberGenerator를 상속해 getNumber와 execute만 구현. execute에서 <code>while (number &lt; end) { notifyObservers(); number += inc; }</code>. <code>new IncrementalNumberGenerator(10, 50, 5)</code>면 10, 15, …, 45가 표시돼요(그림 17-4).</li>
<li><strong>문제 17-2</strong> 새로운 ConcreteObserver를 자유롭게 만들어 Main에서 활용 → Observer를 구현하고 update에서 getNumber로 값을 얻어 원하는 방식으로 표시. NumberGenerator는 고칠 필요 없이 addObserver만 추가해요.</li>
</ul>

<h2 id="g-o6">17.6 관련 패턴과 학습 정리 <small>p.318</small></h2>
<div class="tw"><table>
<thead>
<tr><th>패턴</th><th>관계</th></tr>
</thead>
<tbody>
<tr><td>Mediator (part 16)</td><td>Mediator 역과 Colleague 역의 통신에 Observer 패턴을 쓰기도 해요. 둘 다 ‘상태 변화를 알린다’는 점은 비슷하지만 목적과 관점이 달라요. Mediator의 통지는 Colleague를 조정하려는 목적의 일부이고, Observer는 Subject의 상태 변화를 (여러) Observer에 <strong>통지하고 동기화</strong>하는 것에 주안점이 있어요</td></tr>
</tbody>
</table></div>

<blockquote><p>⭐ 정리: 객체의 상태 변화를 다른 객체에 알려 주는 Observer 패턴을 배웠어요.</p></blockquote>
<hr />

<h1 id="g-ch-4">Part 18. Memento: 상태를 저장한다</h1>
<h2 id="g-m1">18.1 Memento 패턴이란 ⭐ <small>p.322</small></h2>
<p>텍스트 에디터에서 실수로 필요한 텍스트를 지워도 <strong>실행 취소(undo)</strong>를 쓰면 지우기 전 상태로 되돌릴 수 있어요. 반복하면 얼마든지 과거로 되돌릴 수 있어요.</p>
<p>객체지향 프로그램으로 실행 취소를 만들려면 인스턴스가 가진 정보를 저장해 두어야 해요. 저장만으로는 안 되고, <strong>저장해 둔 정보로 인스턴스를 원래 상태로 복원</strong>할 수 있어야 해요.</p>
<p>그런데 복원하려면 인스턴스 내부 정보에 자유롭게 접근할 수 있어야 해요. 부주의하게 접근을 허락하면 그 클래스의 내부 구조에 의존하는 코드가 프로그램 곳곳에 흩어져 클래스를 수정하기 곤란해져요. 이것을 <strong>캡슐화의 파괴</strong>라고 해요.</p>
<blockquote><p>⭐ 인스턴스의 상태를 나타내는 역할을 도입해, <strong>캡슐화의 파괴에 빠지지 않고 저장과 복원</strong>을 하는 것이 Memento 패턴이에요.</p></blockquote>
<p>Memento 패턴으로 할 수 있는 일: <strong>실행 취소(undo) · 다시 실행(redo) · 작업 이력 작성(history) · 현재 상태 저장(snapshot)</strong></p>
<p>memento는 <strong>‘기념품’, ‘유품’, ‘추억거리’</strong>라는 뜻이에요. 서랍에서 추억의 사진을 찾으면 그 시절로 돌아간 기분이 들죠. Memento 패턴도 어느 시점의 인스턴스 상태를 확실하게 기록해 두고, 나중에 그 시점의 상태로 되돌려 줘요.</p>

<h2 id="g-m2">18.2 예제 프로그램: 과일 모으기 주사위 게임 <small>p.322~331</small></h2>
<ul>
<li>게임은 자동으로 진행되고, 주인공이 던진 주사위 수가 다음 상태를 결정해요.</li>
<li>좋은 수 → 돈이 늘어남 · 나쁜 수 → 돈이 줄어듦 · 특히 좋은 수 → 과일을 받음 · 돈이 없어지면 종료</li>
</ul>
<p>돈이 모였을 때 미래를 위해 Memento 인스턴스를 만들어 ‘현재 상태’를 <strong>저장(save)</strong>해요. 저장할 것은 현재 가진 <strong>돈과 과일</strong>이에요. 돈이 계속 줄어들면 종료되지 않도록 저장해 둔 Memento로 이전 상태를 <strong>복원(restore)</strong>해요.</p>
<div class="tw"><table>
<thead>
<tr><th>패키지</th><th>이름</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td>game</td><td><code>Memento</code></td><td>Gamer의 상태를 나타내는 클래스</td></tr>
<tr><td>game</td><td><code>Gamer</code></td><td>게임을 하는 주인공. Memento의 인스턴스를 생성</td></tr>
<tr><td>이름 없음</td><td><code>Main</code></td><td>게임을 진행. Memento의 인스턴스를 저장해 두고, 필요에 따라 Gamer의 상태를 복원</td></tr>
</tbody>
</table></div>
<pre><code>                          ┌──────────── game ─────────────┐
┌──────┐   Requests ▶      │  ┌──────────────────┐         │
│ Main │──────────────────▶│  │      Gamer       │         │
└──◇───┘                   │  │ -money -fruits   │         │
   │                       │  │ -random          │         │
   │                       │  │ -fruitsName(static)│       │
   │                       │  │ +getMoney +bet   │         │
   │                       │  │ +createMemento   │         │
   │                       │  │ +restoreMemento  │         │
   │                       │  │ +toString -getFruit│       │
   │                       │  └────────┬─────────┘         │
   │                       │           │ Creates ▼         │
   │                       │  ┌────────▼─────────┐         │
   └──────────────────────▶│  │     Memento      │         │
                           │  │ -money -fruits   │         │
                           │  │ +getMoney        │         │
                           │  │ ~Memento ~addFruit│        │
                           │  └──────────────────┘         │
                           └───────────────────────────────┘
  (+ public, - private, ~ 접근 제한자 없음(default))</code></pre>
<h3>Memento 클래스 (리스트 18-1) ⭐</h3>
<pre><code><span class="hl-kw">package</span> game;

<span class="hl-kw">import</span> java.util.ArrayList;
<span class="hl-kw">import</span> java.util.List;

<span class="hl-kw">public</span> <span class="hl-kw">class</span> Memento {
    <span class="hl-kw">private</span> <span class="hl-kw">int</span> money;               <span class="hl-com">// 소지금</span>
    <span class="hl-kw">private</span> List&lt;String&gt; fruits;     <span class="hl-com">// 과일</span>

    <span class="hl-com">// 소지금을 얻는다(narrow interface)</span>
    <span class="hl-kw">public</span> <span class="hl-kw">int</span> getMoney() {
        <span class="hl-kw">return</span> money;
    }

    <span class="hl-com">// 생성자(wide interface)</span>
    Memento(<span class="hl-kw">int</span> money) {
        <span class="hl-kw">this</span>.money = money;
        <span class="hl-kw">this</span>.fruits = <span class="hl-kw">new</span> ArrayList&lt;&gt;();
    }

    <span class="hl-com">// 과일을 추가한다(wide interface)</span>
    <span class="hl-kw">void</span> addFruit(String fruit) {
        fruits.add(fruit);
    }

    <span class="hl-com">// 과일을 얻는다(wide interface)</span>
    List&lt;String&gt; getFruits() {
        <span class="hl-kw">return</span> <span class="hl-kw">new</span> ArrayList&lt;&gt;(fruits);
    }
}</code></pre>
<ul>
<li>주인공(Gamer)의 상태를 나타내는 클래스예요. Memento와 Gamer는 공통 패키지 <code>game</code>에 넣어요.</li>
<li>필드는 <code>money</code>(현재 소지금)와 <code>fruits</code>(현재 가진 과일). <code>getMoney</code>는 현재 소지금을 얻는 메서드예요.</li>
<li>⭐ <strong>Memento의 생성자에는 public이 없어요.</strong> 그래서 아무나 인스턴스를 만들 수 없고, 같은 패키지(game)의 클래스에서만 쓸 수 있어요. 구체적으로 Memento 인스턴스는 game 패키지의 Gamer가 만들어요.</li>
<li><code>addFruit</code>도 public이 아니에요. 과일을 추가할 수 있는 건 같은 패키지의 클래스뿐이라 <strong>game 패키지 외부에서 Memento 내부를 변경할 수 없어요</strong>.</li>
<li>💡 <code>getFruits</code>는 <code>new ArrayList&lt;&gt;(fruits)</code>로 <strong>복사본</strong>을 돌려줘요. 받은 쪽이 리스트를 바꿔도 저장된 스냅샷은 그대로예요.</li>
</ul>

<h3>Gamer 클래스 (리스트 18-2)</h3>
<pre><code><span class="hl-kw">package</span> game;

<span class="hl-kw">import</span> java.util.ArrayList;
<span class="hl-kw">import</span> java.util.List;
<span class="hl-kw">import</span> java.util.Random;

<span class="hl-kw">public</span> <span class="hl-kw">class</span> Gamer {
    <span class="hl-kw">private</span> <span class="hl-kw">int</span> money;                                  <span class="hl-com">// 소지금</span>
    <span class="hl-kw">private</span> List&lt;String&gt; fruits = <span class="hl-kw">new</span> ArrayList&lt;&gt;();    <span class="hl-com">// 과일</span>
    <span class="hl-kw">private</span> Random random = <span class="hl-kw">new</span> Random();               <span class="hl-com">// 난수 생성기</span>
    <span class="hl-kw">private</span> <span class="hl-kw">static</span> String[] fruitsName = {              <span class="hl-com">// 과일 이름 표</span>
        <span class="hl-str">"사과"</span>, <span class="hl-str">"포도"</span>, <span class="hl-str">"바나나"</span>, <span class="hl-str">"오렌지"</span>,
    };

    <span class="hl-kw">public</span> Gamer(<span class="hl-kw">int</span> money) {
        <span class="hl-kw">this</span>.money = money;
    }

    <span class="hl-kw">public</span> <span class="hl-kw">int</span> getMoney() {
        <span class="hl-kw">return</span> money;
    }

    <span class="hl-com">// 내기한다 … 게임 진행</span>
    <span class="hl-kw">public</span> <span class="hl-kw">void</span> bet() {
        <span class="hl-kw">int</span> dice = random.nextInt(<span class="hl-num">6</span>) + <span class="hl-num">1</span>;   <span class="hl-com">// 주사위를 던진다</span>
        <span class="hl-kw">if</span> (dice == <span class="hl-num">1</span>) {
            money += <span class="hl-num">100</span>;                   <span class="hl-com">// 1의 눈 … 소지금이 증가한다</span>
            System.out.println(<span class="hl-str">"소지금이 증가했습니다."</span>);
        } <span class="hl-kw">else</span> <span class="hl-kw">if</span> (dice == <span class="hl-num">2</span>) {
            money /= <span class="hl-num">2</span>;                     <span class="hl-com">// 2의 눈 … 소지금이 절반이 된다</span>
            System.out.println(<span class="hl-str">"소지금이 절반으로 줄었습니다."</span>);
        } <span class="hl-kw">else</span> <span class="hl-kw">if</span> (dice == <span class="hl-num">6</span>) {
            String f = getFruit();          <span class="hl-com">// 6의 눈 … 과일을 받는다</span>
            System.out.println(<span class="hl-str">"과일("</span> + f + <span class="hl-str">")를 받았습니다."</span>);
            fruits.add(f);
        } <span class="hl-kw">else</span> {
            System.out.println(<span class="hl-str">"변동 사항이 없습니다."</span>);   <span class="hl-com">// 그 밖의 눈</span>
        }
    }

    <span class="hl-com">// 스냅샷을 찍는다</span>
    <span class="hl-kw">public</span> Memento createMemento() {
        Memento m = <span class="hl-kw">new</span> Memento(money);
        <span class="hl-kw">for</span> (String f: fruits) {
            <span class="hl-kw">if</span> (f.startsWith(<span class="hl-str">"맛있는 "</span>)) {   <span class="hl-com">// 과일은 맛있는 것만 저장한다</span>
                m.addFruit(f);
            }
        }
        <span class="hl-kw">return</span> m;
    }

    <span class="hl-com">// 복원한다</span>
    <span class="hl-kw">public</span> <span class="hl-kw">void</span> restoreMemento(Memento memento) {
        <span class="hl-kw">this</span>.money = memento.getMoney();
        <span class="hl-kw">this</span>.fruits = memento.getFruits();
    }

    <span class="hl-com">@Override</span>
    <span class="hl-kw">public</span> String toString() {
        <span class="hl-kw">return</span> <span class="hl-str">"[money = "</span> + money + <span class="hl-str">", fruits = "</span> + fruits + <span class="hl-str">"]"</span>;
    }

    <span class="hl-com">// 과일을 하나 얻는다</span>
    <span class="hl-kw">private</span> String getFruit() {
        String f = fruitsName[random.nextInt(fruitsName.length)];
        <span class="hl-kw">if</span> (random.nextBoolean()) {
            <span class="hl-kw">return</span> <span class="hl-str">"맛있는 "</span> + f;
        } <span class="hl-kw">else</span> {
            <span class="hl-kw">return</span> f;
        }
    }
}</code></pre><div class="tw"><table>
<thead>
<tr><th>메서드</th><th>하는 일</th></tr>
</thead>
<tbody>
<tr><td><code>bet</code>(내기하다)</td><td>게임의 중심. 파산하지 않았다면 주사위를 던지고 그 눈에 따라 소지금과 과일 개수를 바꿔요. 1 → +100, 2 → 절반, 6 → 과일, 그 밖 → 변동 없음</td></tr>
<tr><td><code>createMemento</code></td><td>현재 상태를 저장(<strong>스냅샷을 찍는</strong>) 메서드. 현 시점의 소지금과 과일로 Memento를 하나 만들어 반환해요. 사진을 찍듯 현재 상태를 Memento에 넣어 둔 것. 과일은 <strong>‘맛있는’ 것만</strong> 저장해요</td></tr>
<tr><td><code>restoreMemento</code></td><td>createMemento와 반대로 실행을 취소(undo)해요. 주어진 Memento로 자신의 상태를 복원해요. 게임에서 ‘부활의 주문’을 외우는 것과 같아요</td></tr>
</tbody>
</table></div>

<h3>Main 클래스 (리스트 18-3)</h3>
<pre><code><span class="hl-kw">import</span> game.Memento;
<span class="hl-kw">import</span> game.Gamer;

<span class="hl-kw">public</span> <span class="hl-kw">class</span> Main {
    <span class="hl-kw">public</span> <span class="hl-kw">static</span> <span class="hl-kw">void</span> main(String[] args) {
        Gamer gamer = <span class="hl-kw">new</span> Gamer(<span class="hl-num">100</span>);                 <span class="hl-com">// 최초 소지금은 100</span>
        Memento memento = gamer.createMemento();      <span class="hl-com">// 최초 상태를 저장해 둔다</span>

        <span class="hl-kw">for</span> (<span class="hl-kw">int</span> i = <span class="hl-num">0</span>; i &lt; <span class="hl-num">100</span>; i++) {
            System.out.println(<span class="hl-str">"==== "</span> + i);
            System.out.println(<span class="hl-str">"상태:"</span> + gamer);

            gamer.bet();                               <span class="hl-com">// 게임을 진행한다</span>

            System.out.println(<span class="hl-str">"소지금은 "</span> + gamer.getMoney() + <span class="hl-str">"원이 되었습니다."</span>);

            <span class="hl-com">// Memento 취급 방법 결정</span>
            <span class="hl-kw">if</span> (gamer.getMoney() &gt; memento.getMoney()) {
                System.out.println(<span class="hl-str">"※많이 늘었으니 현재 상태를 저장하자!"</span>);
                memento = gamer.createMemento();
            } <span class="hl-kw">else</span> <span class="hl-kw">if</span> (gamer.getMoney() &lt; memento.getMoney() / <span class="hl-num">2</span>) {
                System.out.println(<span class="hl-str">"※많이 줄었으니 이전 상태를 복원하자!"</span>);
                gamer.restoreMemento(memento);
            }

            <span class="hl-kw">try</span> {                                      <span class="hl-com">// 잠시 대기</span>
                Thread.sleep(<span class="hl-num">1000</span>);
            } <span class="hl-kw">catch</span> (InterruptedException e) {
            }
            System.out.println();
        }
    }
}</code></pre>
<p>변수 <code>memento</code>에는 ‘어떤 시점의 Gamer 상태’가 저장돼요. 운 좋게 소지금이 늘어나면 createMemento로 현재 상태를 저장하고, 소지금이 (저장된 돈의 절반 미만으로) 부족해지면 restoreMemento에 memento를 넘겨 소지금을 원래대로 되돌려요.</p>
<pre><code>==== 10
상태:[money = 300, fruits = []]
소지금이 증가했습니다.
소지금은 400원이 되었습니다.
※많이 늘었으니 현재 상태를 저장하자!          ← Memento 작성
(중략)
==== 27
상태:[money = 400, fruits = [맛있는 사과, 맛있는 사과, 맛있는 오렌지, 맛있는 사과]]
소지금이 절반으로 줄었습니다.
소지금은 200원이 되었습니다.
※많이 줄었으니 이전 상태를 복원하자!          ← Memento에 의한 상태 복원

==== 28
상태:[money = 400, fruits = [맛있는 사과, 맛있는 사과, 맛있는 오렌지]]</code></pre>
<p>💡 시퀀스 다이어그램(그림 18-2): Main → Gamer.createMemento → (Gamer가) new Memento, addFruit → Main에 반환. 나중에 Main → Gamer.restoreMemento(memento).</p>

<h2 id="g-m3">18.3 Memento 패턴의 등장인물 ⭐ <small>p.331~332</small></h2>
<div class="tw"><table>
<thead>
<tr><th>역할</th><th>하는 일</th><th>교안 예제</th></tr>
</thead>
<tbody>
<tr><td><strong>Originator</strong>(작성자)</td><td>현재 상태를 저장하고 싶을 때 Memento를 만들고, 이전 Memento를 넘겨받으면 그 Memento를 만든 시점의 상태로 되돌림</td><td><code>Gamer</code></td></tr>
<tr><td><strong>Memento</strong>(기념품)</td><td>Originator의 내부 정보를 정리. 내부 정보를 가지고 있지만 누구에게나 공개하지는 않음</td><td><code>Memento</code></td></tr>
<tr><td><strong>Caretaker</strong>(관리인)</td><td>현재 상태를 저장하고 싶을 때 Originator에 요청. 받은 Memento를 미래에 대비해 저장해 둠. 좁은 인터페이스만 쓸 수 있어 Memento를 <strong>한 덩어리의 블랙박스로 통째로 보관</strong>만 함</td><td><code>Main</code></td></tr>
</tbody>
</table></div>

<h3>두 종류의 인터페이스(API) ⭐</h3>
<div class="tw"><table>
<thead>
<tr><th>구분</th><th>뜻</th><th>누가 쓰나</th><th>예제</th></tr>
</thead>
<tbody>
<tr><td><strong>wide interface</strong>(넓은)</td><td>오브젝트의 상태를 되돌리는 데 필요한 정보를 모두 얻을 수 있는 메서드 집합. 내부 상태를 드러냄</td><td><strong>Originator</strong>뿐</td><td>생성자 <code>Memento</code>, <code>addFruit</code>, <code>getFruits</code> (default)</td></tr>
<tr><td><strong>narrow interface</strong>(좁은)</td><td>외부 Caretaker에 보여 주는 것. 할 수 있는 일에 한계가 있어 내부 상태가 외부에 공개되는 것을 방지</td><td>Caretaker</td><td><code>getMoney</code> (public)</td></tr>
</tbody>
</table></div>

<p>이 두 인터페이스를 구별해 사용함으로써 객체의 <strong>캡슐화 파괴를 막을 수 있어요</strong>. Originator와 Memento는 넓은 인터페이스로(매우 친밀한 관계), Caretaker와 Memento는 좁은 인터페이스로 연결돼요. Memento는 Caretaker에 대해 정보를 은폐해요.</p>
<pre><code>┌───────────┐   Requests ▶    ┌────────── package ──────────┐
│ Caretaker │────────────────▶│  ┌────────────────┐         │
└─────◇─────┘                 │  │   Originator   │         │
      │                       │  │ createMemento  │         │
      │                       │  │ restoreMemento │         │
      │                       │  └───────┬────────┘         │
      │                       │          │ Creates ▼        │
      │                       │  ┌───────▼────────────────┐ │
      └──────────────────────▶│  │        Memento         │ │
                              │  │ &lt;&lt;wide interface&gt;&gt;     │ │
                              │  │ ~getProtectedInfo      │ │
                              │  │ &lt;&lt;narrow interface&gt;&gt;   │ │
                              │  │ +getPublicInfo         │ │
                              │  └────────────────────────┘ │
                              └─────────────────────────────┘</code></pre>

<h2 id="g-m4">18.4 독자의 사고를 넓혀 주는 힌트 <small>p.333~336</small></h2>
<h3>두 개의 인터페이스(API)와 액세스 제어 ⭐</h3>
<p>두 인터페이스를 실현하려고 예제는 Java의 <strong>접근 제한자</strong>를 썼어요.</p>
<div class="tw"><table>
<thead>
<tr><th>접근 제한자</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code>public</code></td><td>모든 클래스에서 접근할 수 있다</td></tr>
<tr><td><code>protected</code></td><td>그 패키지 및 하위 클래스에서 접근할 수 있다</td></tr>
<tr><td>default(없음)</td><td>그 패키지에서만 접근할 수 있다</td></tr>
<tr><td><code>private</code></td><td>그 클래스에서만 접근할 수 있다</td></tr>
</tbody>
</table></div>
<div class="tw"><table>
<thead>
<tr><th>Memento의 요소</th><th>접근 제한자</th><th>누구에게 보이나?</th></tr>
</thead>
<tbody>
<tr><td><code>money</code></td><td>private</td><td>Memento 클래스</td></tr>
<tr><td><code>fruits</code></td><td>private</td><td>Memento 클래스</td></tr>
<tr><td><code>getMoney</code></td><td>public</td><td>Memento, Gamer, <strong>Main</strong></td></tr>
<tr><td>생성자 <code>Memento</code></td><td>default(없음)</td><td>Memento, Gamer</td></tr>
<tr><td><code>addFruit</code></td><td>default(없음)</td><td>Memento, Gamer</td></tr>
</tbody>
</table></div>

<p>public이 붙어 있는데 ‘좁다’는 게 이상하게 들릴 수 있어요. 여기서 ‘좁다’는 <strong>내부 상태를 조작할 수 있는 정도가 적다</strong>는 뜻이에요. Memento에서 public은 getMoney 하나뿐이고, 할 수 있는 일은 소지금을 얻는 것뿐이에요.</p>
<p>Caretaker인 Main은 game 패키지에 속하지 않으므로 getMoney밖에 쓸 수 없어요. Main은 Memento의 내용을 마음대로 바꿀 수 없고, 할 수 있는 일은 소지금을 얻는 것과 Memento 인스턴스를 변수 등에 저장해 두는 것뿐이에요. 생성자도 보이지 않으니 다음 코드는 <strong>컴파일 에러</strong>예요.</p>
<pre><code><span class="hl-kw">new</span> Memento(<span class="hl-num">100</span>)   <span class="hl-com">// ✗ Main에서는 컴파일 에러: Memento(int) is not public in Memento</span></code></pre>
<p>Main은 Memento가 필요하면 createMemento를 불러 ‘현재 상태를 저장하고 싶으니 Memento를 만들어 주세요’라고 Gamer에 부탁하는 수밖에 없어요. 이렇게 접근 제한을 이용하면 ‘이 클래스에는 이 메서드를 보여 주지만 저 클래스에는 보여 주지 않는다’를 프로그램으로 표현할 수 있어요. (대규모 프로그램에서는 Java 모듈과 조합해 더 세밀하게 제한하기도 해요.)</p>

<h3>Memento를 몇 개 가질까?</h3>
<p>예제의 Main은 Memento를 하나만 가졌어요. 배열 등으로 <strong>여러 개</strong> 가지면 다양한 시점의 상태를 저장해 둘 수 있어요(여러 단계 undo).</p>
<h3>Memento의 유효기한은?</h3>
<p>메모리에서만 보관하면 큰 문제가 없지만, 연습 문제 18-4처럼 <strong>파일로 영속 저장</strong>하면 ‘유효기한’이 문제가 돼요. 저장 후 프로그램 버전이 올라가면 예전 Memento와 맞지 않을 우려가 있어요.</p>
<h3>Caretaker 역할과 Originator 역할을 나누는 이유</h3>
<p>‘undo가 필요하면 Originator에 그 기능을 넣으면 되지 않을까?’ 싶을 수 있어요. 하지만 Caretaker는 <strong>언제</strong> 스냅샷을 찍을지·undo할지 결정하고 Memento를 저장해요. Originator는 Memento를 <strong>만들고</strong> 주어진 Memento로 자신을 되돌려요. 이렇게 역할을 분담해 두면 다음처럼 바꾸고 싶을 때도 <strong>Originator를 변경할 필요가 전혀 없어요</strong>.</p>
<ul>
<li>여러 단계의 실행 취소를 할 수 있게 바꾸고 싶다</li>
<li>실행 취소뿐 아니라 현재 상태를 파일에 저장하고 싶다</li>
</ul>

<h2 id="g-m5">18.5 연습 문제 정리 <small>p.337~338</small></h2>
<ul>
<li><strong>문제 18-1</strong> Caretaker가 Memento를 자유롭게 조작할 수 있다면? → 저장된 상태가 망가질 수 있고, Caretaker가 내부 구조에 의존하게 돼(캡슐화의 파괴) Originator·Memento를 고칠 때 Caretaker도 고쳐야 해요.</li>
<li><strong>문제 18-2</strong> 저장할 정보가 많아 메모리·디스크가 부족하다면? → 전체가 아니라 <strong>달라진 부분(증분)만</strong> 저장하는 Memento를 생각해요(GoF 책 참고).</li>
<li><strong>문제 18-3</strong> <code>int number</code>를 Memento는 읽고 쓰고, Gamer는 읽기만, Main은 둘 다 못 하게 → 필드는 <code>private</code>, 읽기 메서드는 접근 제한자 없음(default), 쓰기 메서드는 두지 않기.</li>
<li><strong>문제 18-4</strong> <code>saveToFile(String filename, Memento memento)</code>와 <code>loadFromFile(String filename)</code>을 Memento의 클래스 메서드로 만들고, 시작할 때 game.dat이 없으면 100원부터, 있으면 그 상태부터. 소지금이 ‘상당히’ 늘면 game.dat에 저장.</li>
</ul>
<p>⚠️ Java 인스턴스를 파일에 보존할 때 <strong>직렬화(serialization)</strong>가 자주 쓰이지만, 신뢰할 수 없는 데이터를 복원할 때 보안상 큰 문제를 일으킬 수 있어요(<code>java.io.Serializable</code> 문서, Secure Coding Guidelines for Java SE 참고). 『Effective Java』에는 ‘새로운 시스템에서 Java 직렬화를 사용할 이유는 없다’라고까지 적혀 있어요. 문제 18-4 해답은 직렬화 대신 Memento 정보를 <strong>줄 바꿈으로 구분한 문자열</strong>로 저장해요.</p>

<h2 id="g-m6">18.6 관련 패턴과 학습 정리 <small>p.335~336</small></h2>
<div class="tw"><table>
<thead>
<tr><th>패턴</th><th>관계</th></tr>
</thead>
<tbody>
<tr><td>Command (part 22)</td><td>Command 패턴으로 명령을 처리할 때 Memento로 실행 취소(undo)나 다시 실행(redo)을 할 수 있어요</td></tr>
<tr><td>Prototype (part 6)</td><td>Memento는 스냅샷과 undo를 위해 현재 상태를 저장하며 <strong>복원에 필요한 정보만</strong> 저장해요. Prototype은 현재 인스턴스와 같은 상태의 다른 인스턴스를 만들고, <strong>내용이 모두 복사</strong>돼요</td></tr>
<tr><td>State (part 19)</td><td>Memento에서는 <strong>인스턴스</strong>가 ‘상태’를 나타내요. State에서는 <strong>클래스</strong>가 ‘상태’를 나타내요</td></tr>
</tbody>
</table></div>

<blockquote><p>⭐ 정리: 현재 객체의 상태를 기록하고 저장하기 위한 Memento 패턴을 배웠어요. 객체 내부 상태를 최대한 공개하지 않고 상태를 저장하는 방법도 생각했어요. Caretaker는 Originator에 부탁해 ‘현재 상태’를 나타내는 Memento를 만들고(기념 사진을 찰칵), 내부는 모른 채 소중히 보관했다가 필요할 때 Originator에 넘겨 확실하게 복원해요. 정보를 보이게/보이지 않게 하려고 <code>public</code>, <code>protected</code>, <code>private</code> 등으로 접근을 제한하는 방법도 확인했어요.</p></blockquote>
<hr />

<h1 id="g-ch-5">Part 20. Flyweight: 같은 것은 공유해서 낭비를 없앤다</h1>
<h2 id="g-f1">20.1 Flyweight 패턴이란 ⭐ <small>p.364</small></h2>
<p>flyweight는 복싱에서 가장 체중이 가벼운 체급인 <strong>‘플라이급’</strong>이에요. 이 패턴은 객체를 <strong>‘가볍게’</strong> 만들기 위한 거예요.</p>
<p>오브젝트는 컴퓨터 안에 가상으로 존재하니 실제 무게가 있는 건 아니에요. 여기서 말하는 무게는 <strong>‘메모리 사용량’</strong>이에요. 메모리를 많이 쓰는 객체는 ‘무겁다’, 적게 쓰는 객체는 ‘가볍다’고 표현해요.</p>
<p><code>new Something()</code>을 하면 그 인스턴스를 유지하기 위해 메모리가 확보돼요. 인스턴스가 많이 필요해서 new를 잔뜩 쓰면 메모리 사용량이 커져요.</p>
<blockquote><p>⭐ Flyweight를 한 줄로: <strong>‘인스턴스를 최대한 공유하고 쓸데없이 new하지 않는다’</strong>. 필요할 때 항상 new하는 게 아니라, 이미 만든 인스턴스를 쓸 수 있다면 그걸 공유해서 사용해요.</p></blockquote>
<p>💡 표지 그림처럼 <code>Mississippi</code>의 11글자는 실제로는 <strong>M, i, s, p 네 개</strong>의 글자 객체를 돌려 쓰면 충분해요.</p>

<h2 id="g-f2">20.2 예제 프로그램 <small>p.364~372</small></h2>
<p>무거운 인스턴스를 만드는 클래스로 ‘큰 문자’를 표현하는 클래스를 생각해요. 숫자 '0'~'9'와 '-'의 큰 문자 모양을 <code>.</code>, <code>#</code>으로 그린 텍스트 파일(big0.txt ~ big9.txt, big-.txt)로 준비했어요.</p>
<pre><code>big3.txt
....######......
..##......##....
..........##....
......####......
..........##....
..##......##....
....######......
................</code></pre><div class="tw"><table>
<thead>
<tr><th>이름</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code>BigChar</code></td><td>‘큰 문자’를 나타내는 클래스</td></tr>
<tr><td><code>BigCharFactory</code></td><td>BigChar의 인스턴스를 <strong>공유하면서 생성</strong>하는 클래스</td></tr>
<tr><td><code>BigString</code></td><td>BigChar를 모아서 만든 ‘큰 문자열’을 나타내는 클래스</td></tr>
<tr><td><code>Main</code></td><td>동작 테스트용 클래스</td></tr>
</tbody>
</table></div>
<pre><code>           Uses ▶ ┌─────────────┐
       ┌────────▶│   BigChar   │
       │          │ -charname   │
       │          │ -fontdata   │
       │          │ print       │
       │          └──────△──────┘
       │                 │ Creates ▲
       │          ┌──────◇─────────────┐
       │          │  BigCharFactory    │
       │          │ -pool              │
       │          │ -singleton (static)│
       │          │ -BigCharFactory    │
       │          │ getInstance (static)│
       │          │ getBigChar         │
       │          └──────△─────────────┘
       │                 │ Uses ▲
       │          ┌──────┴──────┐  ◀ Uses  ┌──────┐
       └─────────◇│  BigString  │◀─────────│ Main │
                  │ -bigchars   │          └──────┘
                  │ print       │
                  └─────────────┘</code></pre>
<h3>BigChar 클래스 (리스트 20-12)</h3>
<pre><code><span class="hl-kw">import</span> java.io.IOException;
<span class="hl-kw">import</span> java.nio.file.Files;
<span class="hl-kw">import</span> java.nio.file.Path;

<span class="hl-kw">public</span> <span class="hl-kw">class</span> BigChar {
    <span class="hl-com">// 문자의 이름</span>
    <span class="hl-kw">private</span> <span class="hl-kw">char</span> charname;
    <span class="hl-com">// 큰 문자를 표현하는 문자열('#' '.' '\n'으로 이루어진 열)</span>
    <span class="hl-kw">private</span> String fontdata;

    <span class="hl-com">// 생성자</span>
    <span class="hl-kw">public</span> BigChar(<span class="hl-kw">char</span> charname) {
        <span class="hl-kw">this</span>.charname = charname;
        <span class="hl-kw">try</span> {
            String filename = <span class="hl-str">"big"</span> + charname + <span class="hl-str">".txt"</span>;
            StringBuilder sb = <span class="hl-kw">new</span> StringBuilder();
            <span class="hl-kw">for</span> (String line: Files.readAllLines(Path.of(filename))) {
                sb.append(line);
                sb.append(<span class="hl-str">"\n"</span>);
            }
            <span class="hl-kw">this</span>.fontdata = sb.toString();
        } <span class="hl-kw">catch</span> (IOException e) {
            <span class="hl-kw">this</span>.fontdata = charname + <span class="hl-str">"?"</span>;
        }
    }

    <span class="hl-com">// 큰 문자를 표시한다</span>
    <span class="hl-kw">public</span> <span class="hl-kw">void</span> print() {
        System.out.print(fontdata);
    }
}</code></pre>
<ul>
<li>생성자에서 인수로 받은 문자의 큰 문자 버전을 만들어 <code>fontdata</code>에 저장해요. 파일 이름은 문자 앞에 "big", 뒤에 ".txt"를 붙여 만들어요('3' → "big3.txt").</li>
<li>파일이 없으면 문자 뒤에 "?"를 붙인 것(예: "3?")을 폰트 데이터로 써요.</li>
<li>이 클래스에는 ‘공유’와 관련된 코드가 아직 없어요. 공유를 제어하는 건 BigCharFactory예요.</li>
</ul>

<h3>BigCharFactory 클래스 (리스트 20-13) ⭐</h3>
<pre><code><span class="hl-kw">import</span> java.util.HashMap;
<span class="hl-kw">import</span> java.util.Map;

<span class="hl-kw">public</span> <span class="hl-kw">class</span> BigCharFactory {
    <span class="hl-com">// 이미 만든 BigChar 인스턴스를 관리</span>
    <span class="hl-kw">private</span> Map&lt;String,BigChar&gt; pool = <span class="hl-kw">new</span> HashMap&lt;&gt;();
    <span class="hl-com">// Singleton 패턴</span>
    <span class="hl-kw">private</span> <span class="hl-kw">static</span> BigCharFactory singleton = <span class="hl-kw">new</span> BigCharFactory();

    <span class="hl-com">// 생성자</span>
    <span class="hl-kw">private</span> BigCharFactory() {
    }

    <span class="hl-com">// 유일한 인스턴스를 얻는다</span>
    <span class="hl-kw">public</span> <span class="hl-kw">static</span> BigCharFactory getInstance() {
        <span class="hl-kw">return</span> singleton;
    }

    <span class="hl-com">// BigChar 인스턴스 생성(공유)</span>
    <span class="hl-kw">public</span> <span class="hl-kw">synchronized</span> BigChar getBigChar(<span class="hl-kw">char</span> charname) {
        BigChar bc = pool.get(String.valueOf(charname));
        <span class="hl-kw">if</span> (bc == <span class="hl-kw">null</span>) {
            <span class="hl-com">// 여기서 BigChar 인스턴스를 생성</span>
            bc = <span class="hl-kw">new</span> BigChar(charname);
            pool.put(String.valueOf(charname), bc);
        }
        <span class="hl-kw">return</span> bc;
    }
}</code></pre>
<div class="tw"><table>
<thead>
<tr><th>요소</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code>pool</code></td><td>기존에 만든 BigChar 인스턴스를 관리해요. pool은 수영장 풀처럼 무언가 모여 있는 장소예요. 형은 <code>Map&lt;String,BigChar&gt;</code>(String→BigChar 대응), 실제 객체는 <code>HashMap</code>이에요. <code>put</code>으로 키에 값을 대응시키고 <code>get</code>으로 키에 대응하는 값을 얻어요</td></tr>
<tr><td>키 만들기</td><td>문자 '3'의 BigChar를 얻고 싶으면 <code>String.valueOf('3')</code>으로 얻은 "3"이 키, big3.txt로 만든 BigChar가 값이에요</td></tr>
<tr><td>Singleton</td><td>BigCharFactory는 <strong>하나만 존재하면 되기 때문에</strong> Singleton 패턴(part 5)으로 구현했어요. <code>getInstance</code>는 BigCharFactory의 인스턴스(BigChar 인스턴스가 아니에요)를 얻어요</td></tr>
<tr><td><code>getBigChar</code></td><td>Flyweight의 중심. <code>pool.get</code>으로 확인 → <strong>null이면</strong> 지금까지 만든 적이 없으니 <code>new</code> 후 <code>pool.put</code>으로 등록 → <strong>null이 아니면</strong> 이미 만든 인스턴스를 반환</td></tr>
<tr><td><code>synchronized</code></td><td>여러 스레드에서 동시에 불려도 같은 문자의 BigChar가 두 번 만들어지지 않게(연습 문제 20-3)</td></tr>
</tbody>
</table></div>


<h3>BigString 클래스 (리스트 20-14)</h3>
<pre><code><span class="hl-kw">public</span> <span class="hl-kw">class</span> BigString {
    <span class="hl-com">// '큰 문자'의 배열</span>
    <span class="hl-kw">private</span> BigChar[] bigchars;

    <span class="hl-com">// 생성자</span>
    <span class="hl-kw">public</span> BigString(String string) {
        BigCharFactory factory = BigCharFactory.getInstance();
        bigchars = <span class="hl-kw">new</span> BigChar[string.length()];
        <span class="hl-kw">for</span> (<span class="hl-kw">int</span> i = <span class="hl-num">0</span>; i &lt; bigchars.length; i++) {
            bigchars[i] = factory.getBigChar(string.charAt(i));   <span class="hl-com">// ◀ 공유됨</span>
        }
    }

    <span class="hl-com">// 표시</span>
    <span class="hl-kw">public</span> <span class="hl-kw">void</span> print() {
        <span class="hl-kw">for</span> (BigChar bc: bigchars) {
            bc.print();
        }
    }
}</code></pre>
<p>⚠️ 다음처럼 <code>new</code>를 쓰면 <strong>공유되지 않아요</strong>.</p>
<pre><code>bigchars[i] = <span class="hl-kw">new</span> BigChar(string.charAt(i));   <span class="hl-com">// ◀ 공유되지 않음</span></code></pre>
<p>BigCharFactory를 쓰므로 같은 문자에서 생성되는 BigChar는 제대로 공유돼요. 예를 들어 "1212123"으로 BigString을 만들면 bigchars 필드는 다음과 같아요.</p>
<pre><code>bigchars:  [1] [2] [1] [2] [1] [2] [3]
             \   \  /   /   /   /   |
              ↓    ↓        ↓        ↓
            BigChar('1')  BigChar('2')  BigChar('3')
           → 글자는 7개지만 BigChar 인스턴스는 3개</code></pre>
<h3>Main 클래스 (리스트 20-15)</h3>
<pre><code><span class="hl-kw">public</span> <span class="hl-kw">class</span> Main {
    <span class="hl-kw">public</span> <span class="hl-kw">static</span> <span class="hl-kw">void</span> main(String[] args) {
        <span class="hl-kw">if</span> (args.length == <span class="hl-num">0</span>) {
            System.out.println(<span class="hl-str">"Usage: java Main digits"</span>);
            System.out.println(<span class="hl-str">"Example: java Main 1212123"</span>);
            System.exit(<span class="hl-num">0</span>);
        }
        BigString bs = <span class="hl-kw">new</span> BigString(args[<span class="hl-num">0</span>]);
        bs.print();
    }
}</code></pre>
<p>인수로 받은 문자열로 BigString을 만들어 표시할 뿐이에요.</p>

<h2 id="g-f3">20.3 Flyweight 패턴의 등장인물 ⭐ <small>p.373</small></h2>
<div class="tw"><table>
<thead>
<tr><th>역할</th><th>하는 일</th><th>교안 예제</th></tr>
</thead>
<tbody>
<tr><td><strong>Flyweight</strong>(플라이급)</td><td>평소처럼 다루면 프로그램이 무거워지기 때문에 <strong>공유하는 편이 나은 것</strong></td><td><code>BigChar</code></td></tr>
<tr><td><strong>FlyweightFactory</strong>(플라이급 공장)</td><td>Flyweight를 만드는 공장. 이 공장으로 만들면 인스턴스가 <strong>공유</strong>됨</td><td><code>BigCharFactory</code></td></tr>
<tr><td><strong>Client</strong>(의뢰자)</td><td>FlyweightFactory로 Flyweight를 만들어 내고 이용</td><td><code>BigString</code></td></tr>
</tbody>
</table></div>
<pre><code>          Uses ▶ ┌────────────┐
      ┌─────────▶│ Flyweight  │
      │          │ methodA    │
      │          │ methodB    │
      │          └─────△──────┘
      │                │ Creates ▲
      │          ┌─────◇───────────┐
      │          │ FlyweightFactory│
      │          │ pool            │
      │          │ getFlyweight    │
      │          └─────△───────────┘
      │                │ Uses ▲
      │          ┌─────┴──┐
      └──────────│ Client │
                 └────────┘</code></pre>
<p>⚠️ <strong>주의</strong>: 교안은 GoF 책과 조금 다르게 분류했어요. GoF 책에는 <strong>ConcreteFlyweight</strong>와 <strong>UnsharedConcreteFlyweight</strong>가 나와요. GoF의 ConcreteFlyweight가 이 장의 Flyweight에 해당하고, UnsharedConcreteFlyweight는 이번 예제에 등장하지 않아요.</p>

<h2 id="g-f4">20.4 독자의 사고를 넓혀 주는 힌트 <small>p.374~376</small></h2>
<h3>여러 장소에 영향을 미친다 ⚠️</h3>
<p>‘공유하고 있는 것을 변경하면 <strong>여러 곳에 영향을 미친다</strong>’는 점에 주의해야 해요. 예를 들어 BigChar에서 '3'의 fontdata를 바꾸면 BigString에서 쓰이는 '3'의 글꼴이 모두 바뀌어요. 이게 항상 나쁜 건 아니고 문제에 따라 좋을 수도 있어요. 그래서 <strong>Flyweight 역이 가질 정보는 정말 여러 곳에서 공유해야 할 것만</strong> 골라야 해요.</p>
<p>예) ‘색이 있는 큰 문자열’을 만들 때 색 정보를 어디에 둘까?</p>
<ul>
<li><strong>BigChar에 둔다</strong> → BigChar는 공유되므로 색도 공유돼요. 같은 BigChar는 반드시 같은 색.</li>
<li><strong>BigString에 둔다</strong> → ‘세 번째 글자는 빨간색’처럼 BigString이 관리. 같은 BigChar라도 다른 색 가능.</li>
</ul>
<p>둘 중 어느 쪽이 옳다고 단언할 수 없어요. 어떤 정보를 공유할지는 클래스 사용 목적에 달려 있으니 설계자가 잘 생각해야 해요.</p>

<h3>intrinsic과 extrinsic ⭐</h3>
<div class="tw"><table>
<thead>
<tr><th>구분</th><th>뜻</th><th>공유</th><th>예제에서</th></tr>
</thead>
<tbody>
<tr><td><strong>intrinsic</strong>한 정보</td><td>‘본래 갖춰진’, ‘본질적인’. 인스턴스를 어디에 가지고 가도 어떤 상황에서도 변하지 않는 정보, 상태에 의존하지 않는 정보</td><td>장소나 상황에 의존하지 않으므로 <strong>공유 가능</strong></td><td>BigChar의 폰트 데이터(BigString 어디에 나와도 같음)</td></tr>
<tr><td><strong>extrinsic</strong>한 정보</td><td>‘외부에서 온’, ‘비본질적인’. 배치 장소에 따라 변하는 정보, 상황에 따라 변하는 정보, 상태에 의존하는 정보</td><td>장소나 상황에 의존하므로 <strong>공유 불가능</strong></td><td>BigChar가 BigString의 <strong>몇 번째 문자인가</strong></td></tr>
</tbody>
</table></div>

<p>앞의 ‘색’ 이야기는 ‘색을 intrinsic한 정보로 다룰 것인가, extrinsic한 정보로 다룰 것인가’로 바꿔 말할 수 있어요.</p>

<h3>관리되는 인스턴스는 가비지 컬렉션되지 않는다 (Java)</h3>
<p>Java 프로그램은 new로 메모리를 확보해요. 메모리가 부족해지면 JVM은 <strong>가비지 컬렉션</strong>을 시작해요. 힙 영역을 조사해 사용되지 않는 인스턴스를 해제하고 빈 영역을 늘리는 처리예요(garbage = 쓰레기, collection = 수집). 덕분에 Java에서는 new한 인스턴스를 내버려 둘 수 있어요. Java에는 new로 만든 인스턴스를 삭제할 방법이 없고 할 필요도 없어요.</p>
<p>핵심은 가비지 컬렉션이 <strong>‘사용되지 않는 인스턴스’를 해제</strong>한다는 점이에요. 다른 곳에서 참조되고 있으면 ‘사용 중’으로 간주해 쓰레기로 판정하지 않아요.</p>
<p>⚠️ 예제에서는 pool 필드가 BigChar를 관리해요. BigString에서 BigChar를 참조하지 않더라도 <strong>pool이 참조하고 있으므로 쓰레기로 간주되지 않아요</strong>. 한 번 만든 BigChar는 계속 메모리에 남아요. 장시간 동작하는 프로그램이나 적은 메모리로 동작하는 프로그램이라면 기억해야 해요.</p>
<p>인스턴스를 명시적으로 삭제할 수는 없지만 <strong>참조를 없앨 수는</strong> 있어요. 예를 들어 HashMap에서 그 인스턴스를 포함한 엔트리를 삭제하면 참조가 사라져요.</p>

<h3>메모리 이외의 리소스</h3>
<p>인스턴스를 공유하면 인스턴스 생성에 필요한 <strong>리소스</strong>를 줄일 수 있어요. 메모리는 리소스의 일종이에요.</p>
<ul>
<li><strong>시간</strong>: new에 시간이 걸린다면 공유로 생성 횟수를 줄여 프로그램 속도를 높일 수 있어요.</li>
<li><strong>파일 핸들(파일 디스크립터)·윈도 핸들</strong>: OS에 따라 동시에 쓸 수 있는 수에 제한이 있어요. 공유하지 않으면 이 제한에 걸려 프로그램이 동작하지 않을 위험이 있어요.</li>
</ul>

<h3>static Factory Method</h3>
<p>BigCharFactory에는 인스턴스를 얻기 위한 클래스 메서드(static 메서드)가 몇 개 나와요. <code>getInstance</code>는 유일한 인스턴스를 얻고(Singleton), <code>String.valueOf</code>는 특정 문자(char)에 대응하는 문자열 표현(String)을 얻어요. 이들을 <strong>static Factory Method</strong>라고 할 수 있어요.</p>
<p>💡 자바 표준 라이브러리에도 Flyweight가 있어요. <code>Integer.valueOf</code>는 -128~127의 Integer를 캐시해 공유하고(<code>Integer.valueOf(127) == Integer.valueOf(127)</code>은 true, 128은 false), 문자열 리터럴은 상수 풀에서 공유돼요(<code>"hi" == "hi"</code>는 true, <code>new String("hi")</code>는 새 인스턴스).</p>

<h2 id="g-f5">20.5 연습 문제 정리 <small>p.378</small></h2>
<ul>
<li><strong>문제 20-1</strong> BigString에 <code>BigString(String string, boolean shared)</code> 생성자 추가 → shared가 true면 <code>factory.getBigChar(…)</code>, false면 <code>new BigChar(…)</code>.</li>
<li><strong>문제 20-2</strong> 공유할 때와 안 할 때 메모리 비교 → BigString을 많이(예: 1000개) 만들어 배열에 붙잡아 둔 뒤 측정. 측정 코드:</li>
</ul>
<pre><code>Runtime.getRuntime().gc();
<span class="hl-kw">long</span> used = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
System.out.println(<span class="hl-str">"사용 메모리 = "</span> + used);</code></pre>
<ul>
<li><strong>문제 20-3</strong> getBigChar가 synchronized인 이유 → 여러 스레드가 동시에 같은 문자를 요청하면 둘 다 <code>pool.get</code>에서 null을 보고 각자 new해서 같은 문자의 BigChar가 2개 생길 수 있어요(공유가 깨짐). synchronized면 ‘찾기 → 없으면 만들어 등록’이 한 스레드씩 실행돼요. (Singleton 문제 5-3과 같은 구조!)</li>
</ul>

<h2 id="g-f6">20.6 관련 패턴과 학습 정리 <small>p.377</small></h2>
<div class="tw"><table>
<thead>
<tr><th>패턴</th><th>관계</th></tr>
</thead>
<tbody>
<tr><td>Proxy (part 21)</td><td>Flyweight는 인스턴스 생성에 시간이 오래 걸릴 때 <strong>인스턴스 공유</strong>로 처리 속도를 높여요. Proxy는 <strong>대리인</strong>을 설정해 처리 속도를 높여요</td></tr>
<tr><td>Composite (part 11)</td><td>Flyweight를 사용해 Composite 패턴의 <strong>Leaf 역</strong>을 공유할 수 있어요</td></tr>
<tr><td>Singleton (part 5)</td><td>FlyweightFactory 역은 Singleton이 되는 경우가 있어요. 또 Singleton 역은 인스턴스를 하나만 만들어 모든 곳에서 공유되므로 Singleton 역의 인스턴스에는 <strong>intrinsic한 정보만</strong> 있어요</td></tr>
</tbody>
</table></div>

<blockquote><p>⭐ 정리: 메모리 소비를 줄이고자 인스턴스를 공유(share)하는 Flyweight 패턴을 배웠어요. 공유하는 인스턴스를 변경하면 여러 곳에 영향을 미치므로, 공유해야 할 <strong>intrinsic</strong>한 정보와 공유하면 안 되는 <strong>extrinsic</strong>한 정보를 의식해서 구별해야 해요.</p></blockquote>
<hr />

<h1 id="g-ch-6">종합: 패턴 비교하기</h1>
<h2 id="g-c1">어떤 상황에 어떤 패턴? ⭐</h2>
<div class="tw"><table>
<thead>
<tr><th>이런 상황이면</th><th>패턴</th><th>이유</th></tr>
</thead>
<tbody>
<tr><td>시스템 설정·전체 시스템처럼 둘 이상 생기면 안 되는 객체</td><td>Singleton</td><td>유일성을 <strong>보장</strong>하고 표현</td></tr>
<tr><td>사용자가 마우스로 그린 도형을 하나 더 만들고 싶다</td><td>Prototype</td><td>클래스로부터 만들기 어려운 인스턴스를 <strong>복사</strong></td></tr>
<tr><td>원형 종류가 너무 많아 클래스로 다 만들 수 없다</td><td>Prototype</td><td>인스턴스를 원형으로 등록해 두고 복사</td></tr>
<tr><td>프레임워크가 구체 클래스 이름을 몰라도 인스턴스를 만들게 하고 싶다</td><td>Prototype</td><td>문자열 이름 + createCopy로 클래스 이름의 속박에서 분리</td></tr>
<tr><td>같은 내용의 무거운 객체(글꼴, 이미지 등)가 아주 많이 반복된다</td><td>Flyweight</td><td>intrinsic 정보를 <strong>공유</strong>해 메모리 절약</td></tr>
<tr><td>공유 객체를 만드는 공장은 하나면 된다</td><td>Flyweight + Singleton</td><td>FlyweightFactory를 Singleton으로</td></tr>
<tr><td>데이터가 바뀌면 표·그래프·알림 창이 함께 갱신돼야 한다</td><td>Observer</td><td>Subject가 상태 변화를 등록된 Observer 모두에게 <strong>통지</strong></td></tr>
<tr><td>표시 방법(관찰자)을 앞으로 계속 늘리고 싶다</td><td>Observer</td><td>Observer 인터페이스만 구현해 addObserver하면 Subject는 그대로</td></tr>
<tr><td>실수했을 때 이전 상태로 되돌리고(undo) 싶은데, 내부 필드는 공개하기 싫다</td><td>Memento</td><td>넓은/좁은 인터페이스로 캡슐화를 지키며 <strong>저장·복원</strong></td></tr>
<tr><td>여러 시점으로 돌아가거나 상태를 파일에 저장하고 싶다</td><td>Memento</td><td>Caretaker가 Memento를 여러 개 보관하거나 파일로 저장. Originator는 그대로</td></tr>
</tbody>
</table></div>

<h2 id="g-c2">세 패턴의 공통점과 차이점</h2>
<ul>
<li><strong>공통점</strong>: 사용하는 쪽이 <code>new 구체클래스()</code>를 직접 쓰지 않아요. static 메서드(<code>getInstance</code>), 관리자(<code>Manager.create</code>), 공장(<code>getBigChar</code>)을 거쳐 인스턴스를 얻어요.</li>
<li><strong>Singleton vs Flyweight</strong>: 둘 다 ‘이미 있는 인스턴스를 다시 돌려줘요’. Singleton은 클래스 전체에 1개, Flyweight는 키(문자 등)마다 1개예요. Flyweight 공장 자체가 Singleton인 경우가 많아요.</li>
<li><strong>Prototype vs Flyweight</strong>: Prototype은 같은 상태의 <strong>별도 인스턴스</strong>(<code>p1 != p2</code>), Flyweight는 <strong>같은 인스턴스를 공유</strong>(<code>arr[0] == arr[2]</code>).</li>
<li><strong>멀티스레드 함정</strong>: lazy Singleton(문제 5-3)과 Flyweight 공장(문제 20-3)은 모두 ‘null 확인 → new’ 사이에 다른 스레드가 끼어드는 문제가 있어요. 해결은 <code>synchronized</code> 등.</li>
</ul>
<h2 id="g-c3">Observer · Memento와 다른 패턴</h2>
<ul>
<li><strong>Memento vs Prototype</strong>: Memento는 <strong>복원에 필요한 정보만</strong> 저장하고(예: ‘맛있는’ 과일만), Prototype은 현재 인스턴스와 같은 상태의 다른 인스턴스를 만들며 <strong>내용이 모두 복사</strong>돼요.</li>
<li><strong>‘상태’를 다루는 방식</strong>: Observer는 상태가 <strong>바뀐 사실을 알리고</strong>, Memento는 상태를 <strong>기록했다가 되돌려요</strong>. Flyweight는 장소에 의존하지 않는 intrinsic한 상태만 <strong>공유</strong>해요.</li>
<li><strong>인터페이스로 연결</strong>: Observer는 Subject–Observer를 인터페이스로 이어 구상 클래스를 교환할 수 있게 하고, Memento는 접근 제한자로 Originator와 Caretaker에게 <strong>서로 다른 인터페이스</strong>를 보여 줘요. Prototype의 Manager도 Product 인터페이스 이름만 써요. 모두 ‘구상 클래스에 묶이지 않기’라는 같은 생각이에요.</li>
<li><strong>Observer는 ‘관찰’하지 않는다</strong>: Observer는 Subject가 알려 주기를 수동적으로 기다려요(Publish-Subscribe).</li>
</ul>
`;
