// 디자인 패턴 개념 정리 탭 (HTML) · Part 5 Singleton · Part 6 Prototype · Part 20 Flyweight
var WGF = window.WGF = window.WGF || {};
WGF.concepts = String.raw`
<h1 id="g-0">디자인 패턴 개념 정리: Singleton · Prototype · Flyweight</h1>
<p>『Java 언어로 배우는 디자인 패턴 입문』의 <strong>Part 5 Singleton</strong>, <strong>Part 6 Prototype</strong>, <strong>Part 20 Flyweight</strong> 교안을 장·절 순서대로 정리했어요. 교안 문장을 옮긴 것이 아니라 핵심을 이해하기 쉽게 풀어 쓴 요약이고, 교안에 손으로 적힌 수업 필기도 함께 넣었어요. 항목 옆 <strong>p.숫자</strong>는 교안 쪽 번호예요.</p>
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
<h2 id="g-1">0. 세 패턴 한눈에 보기 ⭐</h2>
<p>세 패턴은 모두 <strong>“인스턴스를 어떻게 만들고 몇 개를 둘까”</strong>라는 질문에 대한 서로 다른 답이에요. 그래서 셋을 같이 공부하면 차이가 선명해져요.</p>
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

<h1 id="g-ch-3">Part 20. Flyweight: 같은 것은 공유해서 낭비를 없앤다</h1>
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

<h1 id="g-ch-4">종합: 세 패턴 비교하기</h1>
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
</tbody>
</table></div>

<h2 id="g-c2">세 패턴의 공통점과 차이점</h2>
<ul>
<li><strong>공통점</strong>: 사용하는 쪽이 <code>new 구체클래스()</code>를 직접 쓰지 않아요. static 메서드(<code>getInstance</code>), 관리자(<code>Manager.create</code>), 공장(<code>getBigChar</code>)을 거쳐 인스턴스를 얻어요.</li>
<li><strong>Singleton vs Flyweight</strong>: 둘 다 ‘이미 있는 인스턴스를 다시 돌려줘요’. Singleton은 클래스 전체에 1개, Flyweight는 키(문자 등)마다 1개예요. Flyweight 공장 자체가 Singleton인 경우가 많아요.</li>
<li><strong>Prototype vs Flyweight</strong>: Prototype은 같은 상태의 <strong>별도 인스턴스</strong>(<code>p1 != p2</code>), Flyweight는 <strong>같은 인스턴스를 공유</strong>(<code>arr[0] == arr[2]</code>).</li>
<li><strong>멀티스레드 함정</strong>: lazy Singleton(문제 5-3)과 Flyweight 공장(문제 20-3)은 모두 ‘null 확인 → new’ 사이에 다른 스레드가 끼어드는 문제가 있어요. 해결은 <code>synchronized</code> 등.</li>
</ul>
`;
