// 디자인 패턴 실습 문제 (207문제) · Java 언어로 배우는 디자인 패턴 입문 Part 4 Factory Method · Part 5 Singleton · Part 6 Prototype · Part 7 Builder · Part 17 Observer · Part 18 Memento · Part 20 Flyweight
// n: 번호(기록 저장에 쓰여요. 바꾸지 마세요), ch: 장(1 Factory Method · 2 Singleton · 3 Prototype · 4 Builder · 5 Observer · 6 Memento · 7 Flyweight · 8 종합), lv: 1 기초 · 2 응용 · 3 심화
// t: 'mc' 객관식(ans = 정답 보기 번호, 0부터) · 'self' 서술·코드(answer = 모범 답안, kw = 핵심 키워드)
var WGF = window.WGF = window.WGF || {};
WGF.chapters = [
 {
  "no": 1,
  "title": "Part 4 Factory Method: 하위 클래스에서 인스턴스를 만든다",
  "short": "Factory Method",
  "part": "P4"
 },
 {
  "no": 2,
  "title": "Part 5 Singleton: 인스턴스를 단 하나만 만든다",
  "short": "Singleton",
  "part": "P5"
 },
 {
  "no": 3,
  "title": "Part 6 Prototype: 복사해서 인스턴스를 만든다",
  "short": "Prototype",
  "part": "P6"
 },
 {
  "no": 4,
  "title": "Part 7 Builder: 복잡한 인스턴스를 조립한다",
  "short": "Builder",
  "part": "P7"
 },
 {
  "no": 5,
  "title": "Part 17 Observer: 상태 변화를 알려 준다",
  "short": "Observer",
  "part": "P17"
 },
 {
  "no": 6,
  "title": "Part 18 Memento: 상태를 저장한다",
  "short": "Memento",
  "part": "P18"
 },
 {
  "no": 7,
  "title": "Part 20 Flyweight: 같은 것은 공유해서 낭비를 없앤다",
  "short": "Flyweight",
  "part": "P20"
 },
 {
  "no": 8,
  "title": "종합: 패턴 비교하기",
  "short": "패턴 비교",
  "part": "종합"
 }
];
WGF.problems = [
 {
  "n": 1,
  "ch": 2,
  "lv": 1,
  "t": "mc",
  "q": "Singleton 패턴이 보장하려는 것으로 가장 알맞은 것은?",
  "choices": [
   "어떤 클래스의 인스턴스를 복사해서 새 인스턴스를 만드는 것",
   "인스턴스를 만들 때마다 서로 다른 클래스를 고를 수 있게 하는 것",
   "같은 내용의 인스턴스를 여러 곳에서 공유해 메모리를 아끼는 것",
   "어떤 클래스의 인스턴스가 반드시 1개만 존재하는 것"
  ],
  "ans": 3,
  "exp": "Singleton은 '지정한 클래스의 인스턴스가 반드시 1개만 존재한다'는 것을 보장하고, 그 사실을 프로그램 상에서 표현하는 패턴이에요. ②는 Prototype, ③은 Flyweight 이야기예요."
 },
 {
  "n": 2,
  "ch": 2,
  "lv": 1,
  "t": "mc",
  "q": "singleton이라는 낱말의 원래 뜻으로 알맞은 것은?",
  "choices": [
   "가장 가벼운 체급",
   "원형·모범",
   "공장",
   "요소가 하나뿐인 집합"
  ],
  "ans": 3,
  "exp": "singleton은 <b>요소가 하나뿐인 집합</b>을 말해요. 인스턴스가 하나뿐이라서 이런 이름이 붙었어요. ‘원형’은 prototype, ‘가장 가벼운 체급’은 flyweight예요."
 },
 {
  "n": 3,
  "ch": 2,
  "lv": 1,
  "t": "mc",
  "q": "교안의 클래스 다이어그램에서 <code>-Singleton</code>, <code>+getInstance</code>처럼 앞에 붙은 기호와 밑줄의 뜻을 바르게 짝지은 것은?",
  "choices": [
   "<code>-</code> = 삭제 예정, <code>+</code> = 추가 예정, 밑줄 = 중요",
   "<code>-</code> = private, <code>+</code> = public, 밑줄 = static",
   "<code>-</code> = private, <code>+</code> = static, 밑줄 = public",
   "<code>-</code> = protected, <code>+</code> = public, 밑줄 = final"
  ],
  "ans": 1,
  "exp": "UML 약속이에요. <code>-</code>는 private, <code>+</code>는 public, <b>밑줄</b>은 static(클래스 필드·클래스 메서드)을 뜻해요. 그래서 <code>-singleton</code>에 밑줄이 있으면 ‘private static 필드’예요."
 },
 {
  "n": 4,
  "ch": 2,
  "lv": 1,
  "t": "mc",
  "q": "Singleton 클래스에서 생성자를 <code>private</code>으로 만드는 이유는?",
  "choices": [
   "클래스 외부에서 <code>new</code>로 인스턴스를 만들지 못하게 하려고",
   "생성자를 더 빨리 실행하려고",
   "하위 클래스에서 생성자를 오버라이드하게 하려고",
   "가비지 컬렉션이 인스턴스를 지우지 못하게 하려고"
  ],
  "ans": 0,
  "exp": "생성자가 private이면 클래스 밖에서 <code>new Singleton()</code>을 쓸 때 컴파일 에러가 나요. 프로그래머가 실수하더라도 인스턴스가 하나만 생성되도록 <b>보장</b>하려는 장치예요."
 },
 {
  "n": 5,
  "ch": 2,
  "lv": 1,
  "t": "mc",
  "q": "교안의 Singleton 클래스에서 유일한 인스턴스를 담는 필드 선언으로 알맞은 것은?",
  "choices": [
   "<code>private Singleton singleton = new Singleton();</code>",
   "<code>public Singleton singleton = new Singleton();</code>",
   "<code>private static Singleton singleton = new Singleton();</code>",
   "<code>public static Singleton singleton;</code>"
  ],
  "ans": 2,
  "exp": "<b>static</b>이어야 클래스에 하나만 존재하고, <b>private</b>이어야 바깥에서 마음대로 바꾸지 못해요. static이 없으면 인스턴스마다 필드가 생기고, 그 필드를 만들려고 또 생성자를 불러 끝없이 생성(StackOverflowError)하게 돼요."
 },
 {
  "n": 6,
  "ch": 2,
  "lv": 1,
  "t": "mc",
  "q": "<code>getInstance()</code> 메서드가 <code>static</code>이어야 하는 이유로 알맞은 것은?",
  "choices": [
   "static이 아니면 다른 스레드에서 호출할 수 없기 때문에",
   "static 메서드만 private 생성자를 호출할 수 있기 때문에",
   "인스턴스를 아직 얻지 못한 상태에서도 클래스 이름으로 호출해야 하기 때문에",
   "static 메서드가 아니면 반환형을 Singleton으로 쓸 수 없기 때문에"
  ],
  "ans": 2,
  "exp": "바깥에서는 <code>new</code>를 못 하니 인스턴스가 없어요. 인스턴스 없이 부를 수 있는 건 static 메서드뿐이라 <code>Singleton.getInstance()</code>처럼 클래스 이름으로 불러요. (④ private 생성자는 같은 클래스 안이면 static이든 아니든 부를 수 있어요.)"
 },
 {
  "n": 7,
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "다음 코드를 Singleton 클래스 <b>바깥</b>(예: Main 클래스)에 쓰면 어떻게 되나요?",
  "choices": [
   "두 번째 인스턴스가 만들어진다",
   "기존 인스턴스가 반환된다",
   "컴파일 에러가 난다",
   "실행 중에 예외가 발생한다"
  ],
  "ans": 2,
  "exp": "생성자가 private이라서 클래스 밖에서는 보이지 않아요. 그래서 <b>컴파일 단계</b>에서 에러가 나요. 실행해 보기도 전에 실수를 막아 주는 게 Singleton의 장점이에요.",
  "code": "Singleton s = new Singleton();"
 },
 {
  "n": 8,
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "Singleton 클래스에서 생성자를 <b>아예 쓰지 않고</b> 필드와 <code>getInstance()</code>만 두면 어떻게 되나요?",
  "choices": [
   "컴파일 에러가 나서 클래스를 쓸 수 없다",
   "생성자가 없으니 아무도 인스턴스를 만들 수 없다",
   "자동으로 private 생성자가 만들어져서 Singleton이 유지된다",
   "컴파일러가 public 기본 생성자를 자동으로 만들어서 바깥에서도 <code>new</code>가 가능해진다"
  ],
  "ans": 3,
  "exp": "자바는 생성자가 하나도 없으면 매개변수 없는 기본 생성자를 자동으로 넣어 줘요. 그래서 내용이 비어 있어도 <code>private Singleton() { }</code>을 <b>직접 써 두는 것 자체가 목적</b>이에요. (수업 필기: ‘왜 비어 있을까? 목적은 private을 붙이는 것 자체’)"
 },
 {
  "n": 9,
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "<code>new Singleton()</code>이 실행될 때 일어나는 일을 순서대로 바르게 적은 것은? (수업 필기)",
  "choices": [
   "① getInstance를 호출한다 → ② 생성자를 호출한다",
   "① static 필드를 초기화한다 → ② 메모리를 해제한다",
   "① 메모리에 객체 공간을 만든다 → ② 생성자를 호출한다",
   "① 생성자를 호출한다 → ② 메모리에 객체 공간을 만든다"
  ],
  "ans": 2,
  "exp": "<code>new</code>는 먼저 객체 공간을 만들고 이어서 생성자를 불러요. 그래서 <b>생성자를 호출할 수 없으면 new도 할 수 없어요</b>. 생성자를 private으로 막는 게 곧 바깥의 new를 막는 방법이 되는 이유예요."
 },
 {
  "n": 10,
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "다음 프로그램을 실행했을 때 출력 순서로 알맞은 것은? (Singleton은 교안 리스트 5-1과 같고, 생성자에서 \"인스턴스를 생성했습니다.\"를 출력해요.)",
  "choices": [
   "인스턴스를 생성했습니다. → Start. → obj1과 obj2는 같은 인스턴스입니다. → End.",
   "Start. → 인스턴스를 생성했습니다. → obj1과 obj2는 같은 인스턴스입니다. → End.",
   "Start. → 인스턴스를 생성했습니다. → obj1과 obj2는 같은 인스턴스가 아닙니다. → End.",
   "Start. → 인스턴스를 생성했습니다. → 인스턴스를 생성했습니다. → obj1과 obj2는 같은 인스턴스입니다. → End."
  ],
  "ans": 1,
  "exp": "Singleton 클래스는 <b>처음 사용될 때</b>(첫 <code>getInstance()</code> 호출 때) 초기화되고, 이때 static 필드가 초기화되며 생성자가 <b>딱 한 번</b> 실행돼요. 그래서 ‘Start.’ 다음에 한 번만 나오고, 두 참조는 같아요(Java 21로 실행해 확인).",
  "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Start.\");\n        Singleton obj1 = Singleton.getInstance();\n        Singleton obj2 = Singleton.getInstance();\n        if (obj1 == obj2) {\n            System.out.println(\"obj1과 obj2는 같은 인스턴스입니다.\");\n        } else {\n            System.out.println(\"obj1과 obj2는 같은 인스턴스가 아닙니다.\");\n        }\n        System.out.println(\"End.\");\n    }\n}"
 },
 {
  "n": 11,
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "Main에서 <code>obj1 == obj2</code>로 비교하는 이유는?",
  "choices": [
   "두 인스턴스의 클래스 이름이 같은지 확인하려고",
   "두 인스턴스의 필드 값이 같은지 확인하려고",
   "equals를 오버라이드하지 않았기 때문에 어쩔 수 없이",
   "두 변수가 같은 인스턴스를 가리키는지(참조가 같은지) 확인하려고"
  ],
  "ans": 3,
  "exp": "<code>==</code>는 참조 비교라서 true면 <b>정말 같은 객체 하나</b>라는 뜻이에요. Singleton이 제대로 동작하는지 확인하는 가장 직접적인 방법이에요."
 },
 {
  "n": 12,
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "<code>getInstance</code>라는 메서드 이름에 대한 설명으로 옳은 것은?",
  "choices": [
   "getInstance를 부를 때마다 새 인스턴스를 만들어야 한다",
   "자바 언어 규칙상 Singleton은 반드시 getInstance라는 이름을 써야 한다",
   "getInstance는 java.lang.Object에 정의된 메서드를 오버라이드한 것이다",
   "반드시 이 이름이어야 하는 것은 아니지만, 유일한 인스턴스를 얻을 방법은 꼭 필요하다"
  ],
  "ans": 3,
  "exp": "교안에서 getInstance는 <b>static Factory Method</b>의 일종이라고 설명해요. 이름은 자유지만 유일한 인스턴스를 얻을 통로가 있어야 해요."
 },
 {
  "n": 13,
  "ch": 2,
  "lv": 1,
  "t": "mc",
  "q": "다음 enum으로 만든 Singleton에서 hello 메서드를 호출하는 구문으로 알맞은 것은?",
  "choices": [
   "<code>Singleton.hello();</code>",
   "<code>new Singleton().hello();</code>",
   "<code>Singleton.INSTANCE.hello();</code>",
   "<code>Singleton.getInstance().hello();</code>"
  ],
  "ans": 2,
  "exp": "enum의 요소는 상수로서 인스턴스의 유일성을 보장받아요. 유일한 인스턴스에는 <code>Singleton.INSTANCE</code>로 접근해요. enum은 <code>new</code>로 만들 수 없고, hello는 static이 아니라 ④도 안 돼요.",
  "code": "enum Singleton {\n    INSTANCE;\n    public void hello() {\n        System.out.println(\"hello is called.\");\n    }\n}"
 },
 {
  "n": 14,
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "다음 프로그램의 출력으로 알맞은 것은? (줄바꿈은 / 로 표시)",
  "choices": [
   "A / 생성 / 1 / 2 / true",
   "A / 생성 / 생성 / 1 / 1 / false",
   "A / 생성 / 1 / 1 / true",
   "생성 / A / 1 / 2 / true"
  ],
  "ans": 0,
  "exp": "enum 상수는 Counter가 처음 쓰일 때 한 번만 만들어져요. a와 b는 같은 INSTANCE라 count를 함께 써서 1, 2가 나오고 <code>a == b</code>는 true예요(Java 21로 실행해 확인).",
  "code": "enum Counter {\n    INSTANCE;\n    private int count = 0;\n    Counter() { System.out.println(\"생성\"); }\n    public int next() { return ++count; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"A\");\n        Counter a = Counter.INSTANCE;\n        Counter b = Counter.INSTANCE;\n        System.out.println(a.next());\n        System.out.println(b.next());\n        System.out.println(a == b);\n    }\n}"
 },
 {
  "n": 15,
  "ch": 2,
  "lv": 1,
  "t": "mc",
  "q": "Singleton 패턴의 등장인물(역할)에 대한 설명으로 옳은 것은?",
  "choices": [
   "Prototype 역과 ConcretePrototype 역이 등장한다",
   "Singleton 역과 Client 역, Factory 역이 함께 등장한다",
   "Flyweight 역과 FlyweightFactory 역이 등장한다",
   "Singleton 역만 등장하며, 유일한 인스턴스를 얻기 위한 static 메서드를 가진다"
  ],
  "ans": 3,
  "exp": "Singleton 패턴에는 Singleton 역만 등장해요. 이 역은 유일한 인스턴스를 얻는 static 메서드를 갖고, 이 메서드는 <b>항상 같은 인스턴스</b>를 반환해요."
 },
 {
  "n": 16,
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "교안 ‘어째서 제한할 필요가 있을까?’에서 말하는 인스턴스 수 제한의 의미로 알맞은 것은?",
  "choices": [
   "제한은 메모리를 아끼기 위한 것일 뿐 버그와는 관계없다",
   "인스턴스 수를 제한하면 무조건 실행 속도가 빨라진다",
   "제한을 둔다는 것은 전제 조건을 늘린다는 뜻이고, 인스턴스가 하나뿐이라는 보장이 있으면 그 전제 아래서 프로그래밍할 수 있다",
   "인스턴스가 여러 개 있으면 컴파일 에러가 나기 때문에 제한한다"
  ],
  "ans": 2,
  "exp": "인스턴스가 여러 개 존재하면 서로 영향을 미쳐 뜻밖의 버그를 만들 수 있어요. ‘하나뿐’이라는 보장이 있으면 그 전제 조건 하에서 안심하고 프로그래밍할 수 있어요."
 },
 {
  "n": 17,
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "교안에서 Singleton 패턴이 <b>사용될 수 있는 관련 패턴</b>으로 소개하지 <b>않은</b> 것은?",
  "choices": [
   "Abstract Factory 패턴",
   "Flyweight 패턴",
   "Facade 패턴",
   "Observer 패턴"
  ],
  "ans": 3,
  "exp": "교안의 관련 패턴 목록은 Abstract Factory(8), Builder(7), Facade(15), Flyweight(20), Prototype(6), State(19)예요. 이런 패턴에서는 ‘하나면 충분한’ 역할을 Singleton으로 만들 수 있어요."
 },
 {
  "n": 18,
  "ch": 2,
  "lv": 1,
  "t": "self",
  "q": "프로그램 설정을 담는 <code>Config</code> 클래스를 Singleton 패턴으로 작성하세요. 조건: 인스턴스를 처음부터(클래스 초기화 때) 만들어 두고, <code>getInstance()</code>로 얻으며, 바깥에서 <code>new</code>를 할 수 없어야 해요.",
  "answer": "public class Config {\n    private static Config config = new Config();   // 유일한 인스턴스\n\n    private Config() {                               // 바깥에서 new 금지\n    }\n\n    public static Config getInstance() {             // 유일한 인스턴스를 얻는 통로\n        return config;\n    }\n}",
  "kw": [
   "private static",
   "private Config()",
   "public static Config getInstance",
   "return"
  ],
  "exp": "세 가지가 핵심이에요. ① 유일한 인스턴스를 담는 <b>private static</b> 필드 ② <b>private 생성자</b> ③ 인스턴스를 돌려주는 <b>public static</b> 메서드.",
  "ph": "public class Config { ... } 전체를 써 보세요."
 },
 {
  "n": 19,
  "ch": 2,
  "lv": 2,
  "t": "self",
  "q": "[교안 문제 5-1] 다음 <code>TicketMaker</code>는 지금 상태라면 인스턴스를 몇 개라도 만들 수 있어요. Singleton 패턴을 적용해 인스턴스가 하나만 만들어지도록 바꾸세요. <code>getNextTicketNumber()</code>는 호출할 때마다 1000, 1001, 1002, …를 돌려줘야 해요.",
  "answer": "public class TicketMaker {\n    private int ticket = 1000;\n    private static TicketMaker singleton = new TicketMaker();\n\n    private TicketMaker() {\n    }\n\n    public static TicketMaker getInstance() {\n        return singleton;\n    }\n\n    public synchronized int getNextTicketNumber() {\n        return ticket++;\n    }\n}",
  "kw": [
   "private static TicketMaker",
   "private TicketMaker()",
   "getInstance",
   "synchronized"
  ],
  "exp": "Singleton의 세 요소(private static 필드, private 생성자, static getInstance)를 넣으면 돼요. 여러 스레드가 동시에 번호를 받으면 <code>ticket++</code>이 겹쳐 같은 번호가 나올 수 있으니 <code>getNextTicketNumber</code>에 <b>synchronized</b>를 붙이는 게 안전해요.",
  "code": "public class TicketMaker {\n    private int ticket = 1000;\n\n    public int getNextTicketNumber() {\n        return ticket++;\n    }\n}"
 },
 {
  "n": 20,
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "Singleton으로 바꾼 TicketMaker를 다음처럼 사용했을 때 출력으로 알맞은 것은? (줄바꿈은 / 로 표시)",
  "choices": [
   "1000 / 1000 / 1001",
   "1000 / 1001 / 1002",
   "1001 / 1002 / 1003",
   "1000 / 1000 / 1000"
  ],
  "ans": 1,
  "exp": "t1과 t2는 <b>같은 인스턴스</b>라서 ticket 필드도 하나예요. 누가 부르든 번호가 이어서 1000, 1001, 1002가 나와요. 후위 증가(<code>ticket++</code>)라 먼저 1000을 돌려준 뒤 증가해요(Java 21로 실행해 확인).",
  "code": "TicketMaker t1 = TicketMaker.getInstance();\nTicketMaker t2 = TicketMaker.getInstance();\nSystem.out.println(t1.getNextTicketNumber());\nSystem.out.println(t2.getNextTicketNumber());\nSystem.out.println(t1.getNextTicketNumber());"
 },
 {
  "n": 21,
  "ch": 2,
  "lv": 3,
  "t": "self",
  "q": "[교안 문제 5-2] 인스턴스 수가 <b>3개로 제한</b>되는 클래스 <code>Triple</code>을 만드세요. 인스턴스에는 \"ALPHA\", \"BETA\", \"GAMMA\"라는 이름이 붙어 있고, <code>getInstance(String name)</code>으로 그 이름의 인스턴스를 얻을 수 있어요.",
  "answer": "import java.util.HashMap;\nimport java.util.Map;\n\npublic class Triple {\n    private static Map<String, Triple> map = new HashMap<>();\n    static {\n        String[] names = { \"ALPHA\", \"BETA\", \"GAMMA\" };\n        for (String name : names) {\n            map.put(name, new Triple(name));\n        }\n    }\n\n    private String name;\n\n    private Triple(String name) {\n        System.out.println(\"인스턴스 \" + name + \"을(를) 생성했습니다.\");\n        this.name = name;\n    }\n\n    public static Triple getInstance(String name) {\n        return map.get(name);\n    }\n\n    @Override\n    public String toString() {\n        return \"[Triple:\" + name + \"]\";\n    }\n}",
  "kw": [
   "private Triple",
   "static",
   "ALPHA",
   "BETA",
   "GAMMA",
   "getInstance(String name)"
  ],
  "exp": "Singleton을 ‘N개’로 넓힌 형태예요. 생성자는 그대로 <b>private</b>으로 막고, 클래스 안에서만 3개를 만들어 static 필드(Map이나 배열)에 보관해요. <code>getInstance(name)</code>은 새로 만들지 않고 보관된 것을 돌려줘요. enum <code>Triple { ALPHA, BETA, GAMMA }</code>으로 만들어도 정답이에요.",
  "ph": "public class Triple { ... } 전체를 써 보세요. Map, 배열, enum 무엇을 써도 좋아요."
 },
 {
  "n": 22,
  "ch": 2,
  "lv": 3,
  "t": "self",
  "q": "[교안 문제 5-3] 다음 Singleton은 <code>getInstance</code>가 여러 스레드에서 호출되면 Singleton 패턴이 되지 않아요. 그 이유를 설명하고, 고치는 방법을 한 가지 이상 쓰세요.",
  "answer": "[이유]\n두 스레드가 거의 동시에 getInstance()를 부르면,\n둘 다 if (singleton == null)을 검사하는 시점에 아직 null이라서\n둘 다 new Singleton()을 실행할 수 있다.\n→ 인스턴스가 2개 이상 만들어지고 \"인스턴스를 생성했습니다.\"가 여러 번 출력된다.\n(검사와 생성 사이에 다른 스레드가 끼어드는 경쟁 상태, race condition)\n\n[고치는 방법]\n① getInstance에 synchronized를 붙인다\n   public static synchronized Singleton getInstance() { ... }\n② 처음부터 만들어 둔다(교안 리스트 5-1 방식)\n   private static Singleton singleton = new Singleton();\n③ (참고) 홀더 클래스나 enum을 쓴다",
  "kw": [
   "여러 스레드",
   "null",
   "동시에",
   "인스턴스가 여러 개",
   "synchronized"
  ],
  "exp": "<code>if (singleton == null)</code> 검사와 <code>new</code> 사이에 다른 스레드가 끼어들 수 있는 게 문제예요. 생성 시점을 늦추는(lazy) 방식은 동기화가 필요하고, 교안의 기본 예제처럼 static 필드에서 바로 만들면 클래스 초기화를 JVM이 한 번만 해 줘서 안전해요.",
  "code": "public class Singleton {\n    private static Singleton singleton = null;\n\n    private Singleton() {\n        System.out.println(\"인스턴스를 생성했습니다.\");\n    }\n\n    public static Singleton getInstance() {\n        if (singleton == null) {\n            singleton = new Singleton();\n        }\n        return singleton;\n    }\n}"
 },
 {
  "n": 23,
  "ch": 2,
  "lv": 3,
  "t": "mc",
  "q": "문제 5-3의 lazy 초기화 Singleton을 여러 스레드에서도 안전하게 만드는 방법으로 <b>알맞지 않은</b> 것은?",
  "choices": [
   "<code>getInstance()</code>에 <code>synchronized</code>를 붙인다",
   "<code>singleton</code> 필드를 <code>public</code>으로 바꾼다",
   "enum으로 Singleton을 만든다",
   "필드 선언에서 바로 <code>new Singleton()</code>으로 초기화한다"
  ],
  "ans": 1,
  "exp": "필드를 public으로 바꾸면 바깥에서 값을 바꿀 수 있게 될 뿐, 동시에 두 번 생성되는 문제는 그대로예요. 나머지는 모두 인스턴스가 하나만 만들어지도록 보장해 줘요."
 },
 {
  "n": 24,
  "ch": 2,
  "lv": 3,
  "t": "mc",
  "q": "다음 ‘홀더(holder)’ 방식 Singleton의 출력으로 알맞은 것은? (줄바꿈은 / 로 표시)",
  "choices": [
   "Holder 생성 / hello / --- / 끝",
   "hello / --- / Holder 생성 / Holder 생성 / 끝",
   "hello / Holder 생성 / --- / 끝",
   "hello / --- / Holder 생성 / 끝"
  ],
  "ans": 3,
  "exp": "<code>Holder.hello()</code>만 부를 때는 안쪽 클래스 <code>Lazy</code>가 아직 쓰이지 않아서 인스턴스가 안 만들어져요. 첫 <code>getInstance()</code>에서 Lazy가 초기화되며 한 번만 생성돼요. 스레드 안전하면서도 필요할 때 만드는 방법이에요(Java 21로 실행해 확인).",
  "code": "class Holder {\n    private Holder() { System.out.println(\"Holder 생성\"); }\n    private static class Lazy {\n        static final Holder INSTANCE = new Holder();\n    }\n    public static Holder getInstance() { return Lazy.INSTANCE; }\n    public static void hello() { System.out.println(\"hello\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Holder.hello();\n        System.out.println(\"---\");\n        Holder.getInstance();\n        Holder.getInstance();\n        System.out.println(\"끝\");\n    }\n}"
 },
 {
  "n": 25,
  "ch": 2,
  "lv": 3,
  "t": "mc",
  "q": "lazy 초기화에서 <code>synchronized</code> 비용을 줄이려고 ‘이중 검사 잠금(double-checked locking)’을 쓸 때, <code>singleton</code> 필드에 꼭 붙여야 하는 키워드는?",
  "choices": [
   "<code>volatile</code>",
   "<code>transient</code>",
   "<code>final</code>",
   "<code>native</code>"
  ],
  "ans": 0,
  "exp": "<code>private static volatile Singleton singleton;</code>처럼 <b>volatile</b>을 붙여야 다른 스레드가 ‘생성 중이라 아직 덜 초기화된 객체’를 보는 일을 막을 수 있어요. final은 나중에 대입할 수 없어 lazy 방식에 못 써요.",
  "code": "public static Singleton getInstance() {\n    if (singleton == null) {\n        synchronized (Singleton.class) {\n            if (singleton == null) {\n                singleton = new Singleton();\n            }\n        }\n    }\n    return singleton;\n}"
 },
 {
  "n": 26,
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "enum으로 Singleton을 만드는 방식의 특징으로 옳은 것은?",
  "choices": [
   "enum Singleton은 반드시 getInstance 메서드를 직접 만들어야 한다",
   "enum 상수는 JVM이 하나만 만들어 주므로 유일성이 언어 차원에서 보장된다",
   "enum Singleton은 메서드를 가질 수 없다",
   "enum은 new로 원하는 만큼 인스턴스를 더 만들 수 있다"
  ],
  "ans": 1,
  "exp": "교안처럼 enum의 요소는 상수로서 유일성이 보장돼요(예: <code>java.time.Month.APRIL</code>). enum은 new로 만들 수 없고, 메서드도 가질 수 있어요. 접근은 <code>Singleton.INSTANCE</code>로 해요."
 },
 {
  "n": 27,
  "ch": 3,
  "lv": 1,
  "t": "mc",
  "q": "Prototype 패턴의 핵심으로 알맞은 것은?",
  "choices": [
   "클래스에서 인스턴스를 만드는 대신 인스턴스를 복사해서 새 인스턴스를 만든다",
   "인스턴스를 만드는 일을 하위 클래스에 맡긴다",
   "클래스의 인스턴스를 하나만 만든다",
   "같은 인스턴스를 여러 곳에서 공유한다"
  ],
  "ans": 0,
  "exp": "prototype은 ‘원형’, ‘모범’이라는 뜻이에요. 원형이 되는 인스턴스를 바탕으로 복사해서 새 인스턴스를 만들어요. 복사기로 서류를 복사하는 것과 비슷해요."
 },
 {
  "n": 28,
  "ch": 3,
  "lv": 1,
  "t": "mc",
  "q": "Java에서 인스턴스를 복제하는 조작을 무엇이라고 부르나요?",
  "choices": [
   "clone",
   "duplicate",
   "new",
   "copyOf"
  ],
  "ans": 0,
  "exp": "Java에서는 복제하는 조작을 <b>clone</b>이라고 하고, <code>clone</code> 메서드와 <code>Cloneable</code> 인터페이스를 사용해요."
 },
 {
  "n": 29,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "교안에서 ‘클래스로부터 인스턴스를 만드는 대신 인스턴스를 복사해서 만드는’ 경우로 든 세 가지에 해당하지 <b>않는</b> 것은?",
  "choices": [
   "클래스로부터 인스턴스 생성이 어려운 경우(예: 마우스로 그린 도형)",
   "인스턴스가 시스템 안에 1개만 존재해야 하는 경우",
   "프레임워크와 생성하는 인스턴스를 분리하고 싶은 경우",
   "종류가 너무 많아 클래스로 정리할 수 없는 경우"
  ],
  "ans": 1,
  "exp": "①은 Singleton의 동기예요. Prototype의 세 경우는 (1) 종류가 너무 많아 클래스로 정리할 수 없을 때 (2) 클래스로부터 생성이 어려울 때 (3) 프레임워크와 생성할 인스턴스를 분리하고 싶을 때예요."
 },
 {
  "n": 30,
  "ch": 3,
  "lv": 1,
  "t": "mc",
  "q": "<code>clone</code> 메서드는 어디에 정의되어 있나요?",
  "choices": [
   "각 클래스가 반드시 직접 정의해야 한다",
   "<code>java.lang.Cloneable</code> 인터페이스",
   "<code>java.util.Arrays</code> 클래스",
   "<code>java.lang.Object</code> 클래스"
  ],
  "ans": 3,
  "exp": "clone은 <code>java.lang.Object</code>에 정의되어 있어요. Object는 모든 클래스의 최상위 클래스라서 모든 클래스가 clone을 상속해요. Cloneable에는 clone이 선언되어 있지 않다는 점이 자주 헷갈려요."
 },
 {
  "n": 31,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "<code>Cloneable</code> 인터페이스가 요구하는(선언한) 메서드는?",
  "choices": [
   "<code>clone()</code> 하나",
   "<code>createCopy()</code>",
   "<code>clone()</code>과 <code>equals()</code>",
   "하나도 없다. ‘clone으로 복제를 허용한다’는 표시로만 쓰는 마커 인터페이스다"
  ],
  "ans": 3,
  "exp": "Cloneable 안에는 메서드가 하나도 없어요. 이렇게 표시만 하는 인터페이스를 <b>마커 인터페이스(marker interface)</b>라고 해요. 이름 때문에 clone이 들어 있을 거라 착각하기 쉬워요."
 },
 {
  "n": 32,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "다음 코드를 실행하면 출력은?",
  "choices": [
   "컴파일 에러",
   "복사 성공",
   "예외: NullPointerException",
   "예외: CloneNotSupportedException"
  ],
  "ans": 3,
  "exp": "<code>Cloneable</code>을 구현하지 않은 클래스의 인스턴스가 clone을 호출하면 <b>CloneNotSupportedException</b>이 발생해요. 정리: Cloneable 구현 → 복사됨, 구현 안 함 → 예외(Java 21로 실행해 확인).",
  "code": "class NoClone {\n    public Object copy() throws CloneNotSupportedException {\n        return clone();\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        try {\n            new NoClone().copy();\n            System.out.println(\"복사 성공\");\n        } catch (CloneNotSupportedException e) {\n            System.out.println(\"예외: \" + e.getClass().getSimpleName());\n        }\n    }\n}"
 },
 {
  "n": 33,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "교안의 <code>Product</code> 인터페이스가 <code>extends Cloneable</code>로 선언된 이유는?",
  "choices": [
   "Product를 구현한 클래스(MessageBox 등)가 자동으로 Cloneable을 구현하게 되어 clone으로 복제할 수 있게 하려고",
   "Cloneable에 선언된 clone 메서드를 Product에서 다시 쓰려고",
   "Product를 추상 클래스로 만들려고",
   "Manager가 Cloneable 타입만 받도록 하려고"
  ],
  "ans": 0,
  "exp": "복사 대상 클래스는 Cloneable을 <b>직접 구현해도 되고, 상위 클래스나 상위 인터페이스를 통해 구현해도 돼요</b>. Product가 Cloneable을 확장하므로 MessageBox, UnderlinePen에서 clone을 불러도 예외가 나지 않아요.",
  "code": "package framework;\n\npublic interface Product extends Cloneable {\n    public abstract void use(String s);\n    public abstract Product createCopy();\n}"
 },
 {
  "n": 34,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "Prototype 패턴의 역할과 교안 예제 클래스를 바르게 짝지은 것은?",
  "choices": [
   "Prototype = MessageBox, ConcretePrototype = UnderlinePen, Client = Product",
   "Prototype = Product, ConcretePrototype = Manager, Client = MessageBox",
   "Prototype = Manager, ConcretePrototype = Product, Client = Main",
   "Prototype = Product, ConcretePrototype = MessageBox·UnderlinePen, Client = Manager"
  ],
  "ans": 3,
  "exp": "<b>Prototype(원형)</b>은 복사 메서드를 결정하고(Product), <b>ConcretePrototype</b>은 실제로 복사를 구현하며(MessageBox, UnderlinePen), <b>Client</b>는 복사 메서드로 새 인스턴스를 만들어요(Manager)."
 },
 {
  "n": 35,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "<code>Manager</code> 클래스 소스에 <code>MessageBox</code>나 <code>UnderlinePen</code>이라는 클래스 이름이 전혀 나오지 않는다는 점이 중요한 이유는?",
  "choices": [
   "클래스 이름을 쓰면 clone이 동작하지 않기 때문에",
   "Manager가 framework 패키지라서 다른 패키지의 클래스를 쓸 수 없기 때문에",
   "Product·Manager가 그 클래스들과 독립적으로 수정·재사용될 수 있기 때문에",
   "클래스 이름을 쓰면 컴파일 속도가 느려지기 때문에"
  ],
  "ans": 2,
  "exp": "소스 코드 안에 클래스 이름을 쓰면 그 클래스와 밀접한 관계가 생겨 버려요. Manager는 <b>Product라는 인터페이스 이름만</b> 쓰기 때문에, 이 인터페이스가 Manager와 다른 클래스를 잇는 다리가 돼요."
 },
 {
  "n": 36,
  "ch": 3,
  "lv": 1,
  "t": "mc",
  "q": "교안의 <code>Manager</code> 클래스에서 <code>showcase</code> 필드의 역할은?",
  "choices": [
   "‘이름 → 원형 인스턴스’를 <code>Map&lt;String,Product&gt;</code>로 등록해 두는 진열장",
   "복사한 인스턴스를 모두 모아 두는 쓰레기통",
   "출력할 문자열을 모아 두는 버퍼",
   "인스턴스를 하나만 만들도록 보관하는 static 필드"
  ],
  "ans": 0,
  "exp": "<code>register(name, prototype)</code>로 이름과 원형을 등록하고, <code>create(name)</code>에서 꺼내 <code>createCopy()</code>로 복제해 돌려줘요.",
  "code": "public class Manager {\n    private Map<String,Product> showcase = new HashMap<>();\n\n    public void register(String name, Product prototype) {\n        showcase.put(name, prototype);\n    }\n\n    public Product create(String prototypeName) {\n        Product p = showcase.get(prototypeName);\n        return p.createCopy();\n    }\n}"
 },
 {
  "n": 37,
  "ch": 3,
  "lv": 1,
  "t": "mc",
  "q": "<code>new MessageBox('#')</code>로 만든 인스턴스에 <code>use(\"Hi\")</code>를 호출했을 때 출력은? (교안 리스트 6-3의 use와 같아요)",
  "choices": [
   "###<br>#Hi#<br>###",
   "####<br>#Hi#<br>####",
   "#Hi#",
   "Hi<br>##"
  ],
  "ans": 1,
  "exp": "decolen = 1 + 문자열 길이(2) + 1 = <b>4</b>예요. 위아래로 decochar 4개, 가운데는 decochar + s + decochar라서 <code>#Hi#</code>가 나와요(Java 21로 실행해 확인).",
  "code": "public void use(String s) {\n    int decolen = 1 + s.length() + 1;\n    for (int i = 0; i < decolen; i++) System.out.print(decochar);\n    System.out.println();\n    System.out.println(decochar + s + decochar);\n    for (int i = 0; i < decolen; i++) System.out.print(decochar);\n    System.out.println();\n}"
 },
 {
  "n": 38,
  "ch": 3,
  "lv": 1,
  "t": "mc",
  "q": "<code>new UnderlinePen('~')</code>로 만든 인스턴스에 <code>use(\"Java\")</code>를 호출했을 때 출력은?",
  "choices": [
   "Java<br>~~~~",
   "~~~~<br>Java",
   "Java<br>~~~~~~",
   "~Java~"
  ],
  "ans": 0,
  "exp": "UnderlinePen은 문자열을 출력한 다음 줄에 <b>문자열 길이만큼</b> ulchar를 찍어 밑줄을 그어요. \"Java\"는 4글자라 <code>~~~~</code>예요."
 },
 {
  "n": 39,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "교안 Main처럼 <code>\"warning box\"</code>를 등록한 뒤, 다음 코드의 출력은?",
  "choices": [
   "컴파일 에러",
   "CloneNotSupportedException",
   "true",
   "false"
  ],
  "ans": 3,
  "exp": "<code>create</code>는 부를 때마다 원형을 <b>복제한 새 인스턴스</b>를 돌려줘요. 그래서 두 참조는 다른 객체라 false예요. 하나를 공유하는 Flyweight와 대비돼요.",
  "code": "Product p1 = manager.create(\"warning box\");\nProduct p2 = manager.create(\"warning box\");\nSystem.out.println(p1 == p2);"
 },
 {
  "n": 40,
  "ch": 3,
  "lv": 3,
  "t": "mc",
  "q": "다음 프로그램의 출력으로 알맞은 것은? (줄바꿈은 / 로 표시)",
  "choices": [
   "10 99 / 20 99 / false true / 1",
   "10 1 / 20 99 / false true / 1",
   "10 1 / 20 99 / false false / 2",
   "20 99 / 20 99 / true true / 1"
  ],
  "ans": 0,
  "exp": "clone은 <b>얕은 복사</b>라서 필드 값을 그대로 복사해요. int size는 값이 복사되어 따로 놀지만, 배열 items는 <b>참조만</b> 복사되어 a와 b가 같은 배열을 써요. 그래서 b.items[0]을 바꾸면 a에도 보여요. 또 clone은 생성자를 부르지 않아 made는 1이에요(Java 21로 실행해 확인).",
  "code": "class Box implements Cloneable {\n    int size;\n    int[] items;\n    static int made = 0;\n    Box(int size) { this.size = size; this.items = new int[]{1, 2, 3}; made++; }\n    public Box copy() {\n        try { return (Box) clone(); }\n        catch (CloneNotSupportedException e) { throw new RuntimeException(e); }\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Box a = new Box(10);\n        Box b = a.copy();\n        b.size = 20;\n        b.items[0] = 99;\n        System.out.println(a.size + \" \" + a.items[0]);\n        System.out.println(b.size + \" \" + b.items[0]);\n        System.out.println((a == b) + \" \" + (a.items == b.items));\n        System.out.println(Box.made);\n    }\n}"
 },
 {
  "n": 41,
  "ch": 3,
  "lv": 3,
  "t": "mc",
  "q": "다음 프로그램의 출력으로 알맞은 것은? (줄바꿈은 / 로 표시)",
  "choices": [
   "생성자: red / 생성자: red / 생성자: red / 3 / red red blue",
   "생성자: red / 1 / blue blue blue",
   "생성자: red / 1 / red red blue",
   "생성자: red / 3 / red red blue"
  ],
  "ans": 2,
  "exp": "clone은 단지 복사만 하고 <b>생성자를 호출하지 않아요</b>. 그래서 ‘생성자:’는 한 번, ctor는 1이에요. String 필드는 참조가 복사되지만, c.color에 새 문자열을 대입하는 건 c의 필드만 바꾸므로 a, b는 그대로 red예요(Java 21로 실행해 확인).",
  "code": "class Shape implements Cloneable {\n    static int ctor = 0;\n    String color;\n    Shape(String c) { color = c; ctor++; System.out.println(\"생성자: \" + c); }\n    @Override\n    protected Shape clone() throws CloneNotSupportedException {\n        return (Shape) super.clone();\n    }\n}\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        Shape a = new Shape(\"red\");\n        Shape b = a.clone();\n        Shape c = b.clone();\n        c.color = \"blue\";\n        System.out.println(Shape.ctor);\n        System.out.println(a.color + \" \" + b.color + \" \" + c.color);\n    }\n}"
 },
 {
  "n": 42,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "‘clone 메서드는 얕은 복사를 한다’는 말의 뜻으로 옳은 것은?",
  "choices": [
   "필드 중 절반만 복사한다",
   "필드 내용을 그대로 복사할 뿐, 필드가 가리키는 인스턴스(예: 배열)의 내용까지 복사하지는 않는다",
   "복사한 인스턴스는 원본과 같은 메모리 주소를 가진다",
   "private 필드는 복사하지 않는다"
  ],
  "ans": 1,
  "exp": "필드 대 필드의 복사(field-for-field copy)를 <b>얕은 복사(shallow copy)</b>라고 해요. 필드에 배열이 있으면 배열에 대한 <b>참조만</b> 복사되고 요소는 하나하나 복사되지 않아요. ④처럼 복사본 자체가 원본과 같은 객체가 되지는 않아요."
 },
 {
  "n": 43,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "clone의 얕은 복사로 부족해 <code>clone</code>을 오버라이드할 때 잊지 말아야 할 것은?",
  "choices": [
   "<code>super.clone()</code>으로 상위 클래스의 clone을 호출하는 것",
   "Cloneable 구현을 빼는 것",
   "생성자를 반드시 호출하는 것",
   "clone을 static으로 바꾸는 것"
  ],
  "ans": 0,
  "exp": "clone을 오버라이드할 때는 <code>super.clone()</code>으로 기본 복사를 받은 뒤, 필요한 필드(배열 등)를 추가로 복사해요. 또 clone은 생성자를 부르지 않으니 특수한 초기화가 필요하면 clone 안에 직접 써야 해요."
 },
 {
  "n": 44,
  "ch": 3,
  "lv": 3,
  "t": "mc",
  "q": "교안 예제에서 <code>clone()</code>을 바로 쓰지 않고 <code>createCopy()</code>라는 메서드로 감싼 이유로 가장 알맞은 것은?",
  "choices": [
   "clone은 private이라서 아무도 호출할 수 없기 때문에",
   "Object의 clone은 protected라서 다른 클래스(Manager)의 요청으로 복제하려면 public 메서드로 감싸야 하기 때문에",
   "createCopy가 clone보다 깊은 복사를 해 주기 때문에",
   "clone은 Cloneable을 구현한 클래스에서만 호출할 수 있기 때문에"
  ],
  "ans": 1,
  "exp": "clone은 자신의 클래스(및 하위 클래스)에서만 호출할 수 있어요(protected). 그래서 다른 클래스가 복사를 요청하려면 createCopy 같은 별도 메서드로 clone을 감싸 줘야 해요. 이 때문에 ‘clone은 사용하기 어렵다’는 말이 나와요."
 },
 {
  "n": 45,
  "ch": 3,
  "lv": 3,
  "t": "mc",
  "q": "교안 보강 ‘clone은 사용하기 어렵다’에서 실제 Java 프로그램으로 복제 클래스를 설계할 때 권하는 방법은?",
  "choices": [
   "clone 메커니즘에 의존하지 않고 복사 생성자나 복사 팩토리를 사용한다",
   "복제가 필요하면 직렬화(Serializable)만 사용한다",
   "모든 클래스에 Cloneable을 붙이고 clone을 public으로 만든다",
   "복제 대신 Singleton으로 인스턴스를 하나만 쓴다"
  ],
  "ans": 0,
  "exp": "여러 종류의 필드를 가진 클래스를 clone으로 복제하는 건 쉽지 않아요(Object.clone이 protected 등). 그래서 복사 생성자(예: <code>MessageBox(MessageBox prototype)</code>)나 복사 팩토리를 쓰는 편이 좋다고 해요. 연습 문제 6-2가 바로 이 방식이에요."
 },
 {
  "n": 46,
  "ch": 3,
  "lv": 2,
  "t": "self",
  "q": "[교안 문제 6-1] MessageBox와 UnderlinePen에는 같은 동작을 하는 <code>createCopy</code> 메서드가 두 번 정의되어 있어요. 같은 코드가 여러 곳에 있는 건 관리상 좋지 않으니 이 메서드를 공유하고 싶어요. 어떻게 하면 될까요? 코드로 보여 주세요.",
  "answer": "// Product와 구체 클래스 사이에 추상 클래스를 하나 둔다\npackage framework;\n\npublic abstract class AbstractProduct implements Product {\n    @Override\n    public Product createCopy() {\n        Product p = null;\n        try {\n            p = (Product) clone();\n        } catch (CloneNotSupportedException e) {\n            e.printStackTrace();\n        }\n        return p;\n    }\n}\n\n// 구체 클래스는 상속만 하고 createCopy는 지운다\npublic class MessageBox extends AbstractProduct {\n    private char decochar;\n    public MessageBox(char decochar) { this.decochar = decochar; }\n    @Override\n    public void use(String s) { ... }   // 그대로\n}\n\npublic class UnderlinePen extends AbstractProduct {\n    private char ulchar;\n    public UnderlinePen(char ulchar) { this.ulchar = ulchar; }\n    @Override\n    public void use(String s) { ... }   // 그대로\n}",
  "kw": [
   "abstract class",
   "implements Product",
   "createCopy",
   "extends",
   "clone()"
  ],
  "exp": "공통 동작을 상위 클래스로 올리는 방법이에요. Product를 구현하는 <b>추상 클래스</b>에 createCopy를 한 번만 구현하고, MessageBox·UnderlinePen은 그 추상 클래스를 <b>상속</b>해요. <code>clone()</code>은 실제 인스턴스의 클래스를 그대로 복사하므로 하위 클래스마다 올바른 타입의 복사본이 나와요. (Java 8 이상이라면 Product 인터페이스의 default 메서드로도 만들 수 있지만, clone이 protected라 인터페이스에서는 바로 부를 수 없어 추상 클래스 방식이 자연스러워요.)"
 },
 {
  "n": 47,
  "ch": 3,
  "lv": 2,
  "t": "self",
  "q": "[교안 문제 6-2] 예제는 clone으로 복사했지만, <b>복사 생성자</b>로 인스턴스를 복사하는 방법도 있어요. 복사 생성자란 ‘같은 클래스의 인스턴스를 인수로 받아 필드를 복사하는 생성자’예요. MessageBox를 복사 생성자로 복사하도록 고쳐 쓰세요(UnderlinePen도 같은 방식이면 돼요).",
  "answer": "// Product는 더 이상 Cloneable이 필요 없다\npublic interface Product {\n    void use(String s);\n    Product createCopy();\n}\n\npublic class MessageBox implements Product {\n    private char decochar;\n\n    public MessageBox(char decochar) {\n        this.decochar = decochar;\n    }\n\n    // 복사 생성자\n    public MessageBox(MessageBox prototype) {\n        this.decochar = prototype.decochar;\n    }\n\n    @Override\n    public void use(String s) { ... }   // 그대로\n\n    @Override\n    public Product createCopy() {\n        return new MessageBox(this);    // clone 대신 복사 생성자\n    }\n}",
  "kw": [
   "MessageBox(MessageBox prototype)",
   "prototype.decochar",
   "new MessageBox(this)",
   "createCopy"
  ],
  "exp": "복사 생성자를 쓰면 <b>try-catch와 CloneNotSupportedException이 필요 없고</b>, Cloneable 구현도 필요 없어요. 복사 과정이 생성자라서 어떤 필드를 어떻게 복사할지(깊은 복사 등)도 코드로 분명하게 드러나요.",
  "code": "// 복사 생성자\npublic MessageBox(MessageBox prototype) {\n    this.decochar = prototype.decochar;\n}"
 },
 {
  "n": 48,
  "ch": 3,
  "lv": 3,
  "t": "self",
  "q": "다음 Box의 clone은 얕은 복사라서 복사본의 배열을 바꾸면 원본도 바뀌어요. <b>깊은 복사</b>가 되도록 clone을 오버라이드하세요.",
  "answer": "class Box implements Cloneable {\n    int size;\n    int[] items;\n\n    @Override\n    public Box clone() {\n        try {\n            Box copy = (Box) super.clone();   // 기본(얕은) 복사\n            copy.items = items.clone();       // 배열은 따로 복사\n            return copy;\n        } catch (CloneNotSupportedException e) {\n            throw new AssertionError(e);      // Cloneable이라 일어나지 않음\n        }\n    }\n}",
  "kw": [
   "super.clone()",
   "items.clone()",
   "Cloneable",
   "public"
  ],
  "exp": "<code>super.clone()</code>으로 필드를 통째로 복사한 다음, 참조형 필드(배열)는 <b>새로 복사해서 바꿔 끼워야</b> 해요. 배열의 <code>clone()</code>은 public이라 바로 쓸 수 있어요. 반환형을 Box로, 접근 제어자를 public으로 넓혀 바깥에서 쓰기 편하게 했어요.",
  "code": "class Box implements Cloneable {\n    int size;\n    int[] items;\n    // 여기에 clone 오버라이드\n}"
 },
 {
  "n": 49,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "Prototype 패턴과 Flyweight 패턴을 비교한 설명으로 옳은 것은?",
  "choices": [
   "Prototype은 공유하고, Flyweight는 복사한다",
   "Prototype은 현재 인스턴스와 같은 상태의 별도 인스턴스를 만들고, Flyweight는 하나의 인스턴스를 여러 곳에서 공유한다",
   "둘 다 인스턴스를 복사해서 새로 만든다",
   "둘 다 인스턴스를 하나만 만든다"
  ],
  "ans": 1,
  "exp": "교안 Prototype 관련 패턴에 나오는 비교예요. 같은 ‘원본을 이용한다’는 점은 비슷하지만 Prototype은 <b>복사본을 따로</b> 만들고, Flyweight는 <b>같은 것을 함께 써요</b>."
 },
 {
  "n": 50,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "Prototype의 관련 패턴 설명으로 <b>틀린</b> 것은?",
  "choices": [
   "Memento 패턴은 스냅샷과 undo를 위해 현재 인스턴스의 상태를 저장한다",
   "Memento 패턴은 인스턴스를 공유해 메모리를 줄이기 위해 Prototype을 쓴다",
   "Composite·Decorator 패턴을 많이 쓰면 복잡한 구조의 인스턴스가 동적으로 만들어질 때 Prototype이 편리하다",
   "Command 패턴의 명령을 복제하고 싶을 때 Prototype을 쓸 수 있다"
  ],
  "ans": 1,
  "exp": "①은 Flyweight에 대한 설명을 섞어 놓은 틀린 말이에요. Memento는 스냅샷·undo를 위해 현재 상태를 저장하는 패턴이에요."
 },
 {
  "n": 51,
  "ch": 3,
  "lv": 3,
  "t": "mc",
  "q": "교안 ‘클래스 이름은 속박인가’의 요점으로 알맞은 것은?",
  "choices": [
   "클래스 이름은 길수록 재사용하기 좋다",
   "소스 안에 이용할 클래스 이름이 쓰여 있으면 그 클래스와 분리해 재사용할 수 없고, 소스(.java) 없이 .class만으로 재사용할 수 있는지가 포인트다",
   "소스 코드에 클래스 이름을 쓰는 것은 항상 나쁘므로 절대 쓰면 안 된다",
   "소스를 수정해서 클래스 이름을 바꿀 수 있으면 재사용에는 아무 문제가 없다"
  ],
  "ans": 1,
  "exp": "클래스 이름을 쓰는 게 항상 나쁜 건 아니에요. 밀접하게 결합해야 하는 클래스라면 괜찮지만, <b>부품으로 독립시켜야 하는</b> 클래스의 이름이 소스에 박혀 있으면 문제예요. ‘부품으로서의 재사용’에서는 소스 수정을 고려하지 않아요."
 },
 {
  "n": 52,
  "ch": 3,
  "lv": 1,
  "t": "mc",
  "q": "소스 코드에서 <code>java.lang.Cloneable</code>을 <code>import</code> 없이 <code>Cloneable</code>로만 써도 되는 이유는?",
  "choices": [
   "Cloneable은 framework 패키지에 있기 때문에",
   "인터페이스는 import가 필요 없기 때문에",
   "java.lang 패키지는 암묵적으로 import되기 때문에",
   "Cloneable은 예약어이기 때문에"
  ],
  "ans": 2,
  "exp": "<code>java.lang</code> 패키지(String, Object, Cloneable 등)는 자동으로 import돼요."
 },
 {
  "n": 53,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "교안 Main에서 Manager에 등록한 내용과 결과를 바르게 짝지은 것은?",
  "choices": [
   "\"strong message\" → MessageBox('/'), \"warning box\" → MessageBox('*'), \"slash box\" → UnderlinePen('-')",
   "\"strong message\" → UnderlinePen('-'), \"warning box\" → MessageBox('*'), \"slash box\" → MessageBox('/')",
   "\"strong message\" → MessageBox('*'), \"warning box\" → UnderlinePen('-'), \"slash box\" → MessageBox('/')",
   "세 이름 모두 MessageBox로 등록한다"
  ],
  "ans": 1,
  "exp": "표 6-2 그대로예요. 그래서 p1.use는 밑줄(-----), p2.use는 * 테두리, p3.use는 / 테두리로 \"Hello, world.\"를 출력해요. Main은 <code>new Something()</code> 대신 <b>문자열 이름</b>으로 인스턴스를 만들어요."
 },
 {
  "n": 54,
  "ch": 7,
  "lv": 1,
  "t": "mc",
  "q": "flyweight라는 이름의 뜻과 이 패턴이 말하는 ‘무게’를 바르게 짝지은 것은?",
  "choices": [
   "가벼운 클래스 · 소스 코드 줄 수",
   "가벼운 날개 · 실행 속도",
   "파리 무게 · 파일 크기",
   "복싱에서 가장 가벼운 체급 · 메모리 사용량"
  ],
  "ans": 3,
  "exp": "flyweight는 복싱에서 가장 체중이 가벼운 체급(플라이급)이에요. 객체를 ‘가볍게’ 만드는 패턴이고, 여기서 무게는 <b>메모리 사용량</b>이에요. 메모리를 많이 쓰면 ‘무겁다’, 적게 쓰면 ‘가볍다’고 해요."
 },
 {
  "n": 55,
  "ch": 7,
  "lv": 1,
  "t": "mc",
  "q": "Flyweight 패턴에서 사용하는 기법을 한 줄로 요약한 것은?",
  "choices": [
   "인스턴스를 만들 때마다 파일을 새로 읽는다",
   "인스턴스를 복사해서 만든다",
   "인스턴스를 최대한 공유하고 쓸데없이 new하지 않는다",
   "인스턴스를 하나만 만든다"
  ],
  "ans": 2,
  "exp": "인스턴스가 필요할 때 항상 new하는 것이 아니라, 이미 만들어진 인스턴스를 이용할 수 있다면 <b>그것을 공유해서 사용</b>하는 것이 Flyweight의 핵심이에요."
 },
 {
  "n": 56,
  "ch": 7,
  "lv": 1,
  "t": "mc",
  "q": "교안 예제의 네 클래스와 설명을 바르게 짝지은 것은?",
  "choices": [
   "BigChar: 큰 문자 · BigCharFactory: 큰 문자열 · BigString: 공장 · Main: 테스트",
   "BigChar: 큰 문자 · BigCharFactory: BigChar를 공유하면서 생성 · BigString: BigChar를 모은 큰 문자열 · Main: 테스트",
   "BigChar: 공장 · BigCharFactory: 큰 문자 · BigString: 테스트 · Main: 큰 문자열",
   "BigChar: 큰 문자열 · BigCharFactory: 큰 문자 · BigString: 공장 · Main: 테스트"
  ],
  "ans": 1,
  "exp": "표 20-1 그대로예요. 큰 문자(BigChar)는 메모리를 많이 쓰므로 BigCharFactory가 공유하면서 만들어 주고, BigString은 그걸 모아 큰 문자열을 만들어요."
 },
 {
  "n": 57,
  "ch": 7,
  "lv": 1,
  "t": "mc",
  "q": "Flyweight 패턴의 역할과 교안 예제 클래스를 바르게 짝지은 것은?",
  "choices": [
   "Flyweight = BigString, FlyweightFactory = BigCharFactory, Client = BigChar",
   "Flyweight = BigChar, FlyweightFactory = BigCharFactory, Client = BigString",
   "Flyweight = BigChar, FlyweightFactory = BigString, Client = BigCharFactory",
   "Flyweight = BigCharFactory, FlyweightFactory = BigChar, Client = Main"
  ],
  "ans": 1,
  "exp": "<b>Flyweight</b>는 공유하는 편이 나은 것(BigChar), <b>FlyweightFactory</b>는 Flyweight를 만드는 공장(BigCharFactory, 이걸로 만들면 공유돼요), <b>Client</b>는 공장으로 Flyweight를 만들어 이용하는 쪽(BigString)이에요."
 },
 {
  "n": 58,
  "ch": 7,
  "lv": 1,
  "t": "mc",
  "q": "BigCharFactory에서 이미 만든 BigChar를 관리하는 <code>pool</code> 필드의 선언으로 알맞은 것은?",
  "choices": [
   "<code>private Map&lt;String,BigChar&gt; pool = new HashMap&lt;&gt;();</code>",
   "<code>private List&lt;BigChar&gt; pool = new ArrayList&lt;&gt;();</code>",
   "<code>private static BigChar pool = new BigChar('0');</code>",
   "<code>private BigChar[] pool = new BigChar[10];</code>"
  ],
  "ans": 0,
  "exp": "pool은 ‘문자열(키) → BigChar(값)’ 대응을 관리해요. 원하는 문자의 인스턴스가 이미 있는지 <b>빠르게 판단</b>하려고 <code>java.util.HashMap</code>을 써요. pool이란 수영장 풀처럼 무언가 모여 있는 장소를 말해요."
 },
 {
  "n": 59,
  "ch": 7,
  "lv": 2,
  "t": "mc",
  "q": "다음 <code>getBigChar</code>의 동작 설명으로 옳은 것은?",
  "choices": [
   "pool에 있으면 복사본을 만들어 돌려준다",
   "pool에 그 문자의 BigChar가 없을 때만 new로 만들어 등록하고, 있으면 기존 것을 돌려준다",
   "부를 때마다 새 BigChar를 만들어 pool에 덮어쓴다",
   "pool에 없으면 null을 돌려준다"
  ],
  "ans": 1,
  "exp": "<code>pool.get</code>의 반환값이 null이면 지금까지 만든 적이 없다는 뜻이라 new 후 <code>pool.put</code>으로 등록해요. null이 아니면 이미 만든 인스턴스를 그대로 반환해서 <b>공유</b>해요.",
  "code": "public synchronized BigChar getBigChar(char charname) {\n    BigChar bc = pool.get(String.valueOf(charname));\n    if (bc == null) {\n        bc = new BigChar(charname);\n        pool.put(String.valueOf(charname), bc);\n    }\n    return bc;\n}"
 },
 {
  "n": 60,
  "ch": 7,
  "lv": 2,
  "t": "mc",
  "q": "BigCharFactory 자체를 Singleton 패턴으로 구현한 이유는?",
  "choices": [
   "getBigChar를 static으로 만들기 위해서",
   "BigCharFactory의 인스턴스(즉 pool)는 하나만 존재하면 되기 때문에",
   "BigChar를 하나만 만들기 위해서",
   "BigString이 BigCharFactory를 상속하기 위해서"
  ],
  "ans": 1,
  "exp": "공장이 여러 개면 pool도 여러 개라서 같은 문자의 BigChar가 공장마다 따로 생겨 공유가 깨져요. 그래서 공장은 하나면 되고, <code>getInstance()</code>는 BigCharFactory의 인스턴스(BigChar 인스턴스가 아니에요)를 얻는 메서드예요."
 },
 {
  "n": 61,
  "ch": 7,
  "lv": 2,
  "t": "mc",
  "q": "교안 Flyweight 예제를 바탕으로 다음 코드를 실행했을 때 출력은? (BigChar는 생성자에서 created를 1 늘려요. 줄바꿈은 / 로 표시)",
  "choices": [
   "3 / false / true",
   "7 / false / false",
   "7 / true / false",
   "3 / true / false"
  ],
  "ans": 3,
  "exp": "\"1212123\"에서 서로 다른 문자는 1, 2, 3의 <b>세 개</b>뿐이라 BigChar는 3개만 만들어져요. arr[0]과 arr[2]는 둘 다 '1'이라 같은 인스턴스(true), arr[0]('1')과 arr[1]('2')은 다른 인스턴스(false)예요(Java 21로 실행해 확인). 그림 20-2와 같은 모습이에요.",
  "code": "BigCharFactory f = BigCharFactory.getInstance();\nString s = \"1212123\";\nBigChar[] arr = new BigChar[s.length()];\nfor (int i = 0; i < s.length(); i++) {\n    arr[i] = f.getBigChar(s.charAt(i));\n}\nSystem.out.println(BigChar.created);\nSystem.out.println(arr[0] == arr[2]);\nSystem.out.println(arr[0] == arr[1]);"
 },
 {
  "n": 62,
  "ch": 7,
  "lv": 3,
  "t": "mc",
  "q": "앞 문제의 코드 뒤에 다음을 이어서 실행하면 마지막에 출력되는 <code>BigChar.created</code> 값은?",
  "choices": [
   "7",
   "11",
   "3",
   "5"
  ],
  "ans": 3,
  "exp": "\"1212123\"을 다시 처리해도 pool에 이미 있어서 새로 만들지 않아요. \"4040\"에서는 아직 없던 '4'와 '0' 두 개만 새로 만들어져 3 + 2 = <b>5</b>예요(Java 21로 실행해 확인).",
  "code": "for (int i = 0; i < s.length(); i++) {\n    arr[i] = f.getBigChar(s.charAt(i));\n}\n\"4040\".chars().forEach(ch -> f.getBigChar((char) ch));\nSystem.out.println(BigChar.created);"
 },
 {
  "n": 63,
  "ch": 7,
  "lv": 2,
  "t": "mc",
  "q": "BigString 생성자의 for문을 다음처럼 바꾸면 어떻게 되나요?",
  "choices": [
   "BigChar가 공유되지 않아 같은 문자라도 매번 새 인스턴스가 생긴다",
   "컴파일 에러가 난다",
   "같은 문자를 출력하지 못한다",
   "결과도 메모리 사용량도 전혀 달라지지 않는다"
  ],
  "ans": 0,
  "exp": "<code>new BigChar(...)</code>를 직접 쓰면 공장을 거치지 않아 공유되지 않아요. 화면 결과는 같지만 \"1212123\"이면 BigChar가 7개 생겨 메모리를 더 써요. 공유되게 하려면 <code>factory.getBigChar(...)</code>를 써야 해요.",
  "code": "bigchars = new BigChar[string.length()];\nfor (int i = 0; i < bigchars.length; i++) {\n    bigchars[i] = new BigChar(string.charAt(i));\n}"
 },
 {
  "n": 64,
  "ch": 7,
  "lv": 2,
  "t": "mc",
  "q": "BigChar 생성자가 인수로 <code>'3'</code>을 받았을 때 읽는 파일 이름과, 파일이 없을 때 fontdata에 들어가는 값은?",
  "choices": [
   "\"3.txt\" · \"?\"",
   "\"big3.txt\" · \"3?\"",
   "\"big3.txt\" · null",
   "\"big-3.txt\" · \"3\""
  ],
  "ans": 1,
  "exp": "문자 앞에 \"big\", 뒤에 \".txt\"를 붙여 파일 이름을 만들어요(<code>\"big\" + charname + \".txt\"</code>). 파일이 없어 IOException이 나면 문자 뒤에 \"?\"를 붙인 것을 폰트 데이터로 써요."
 },
 {
  "n": 65,
  "ch": 7,
  "lv": 2,
  "t": "mc",
  "q": "intrinsic한 정보와 extrinsic한 정보에 대한 설명으로 옳은 것은?",
  "choices": [
   "intrinsic = 공유 불가능, extrinsic = 공유 가능",
   "intrinsic = 외부에서 온 정보, extrinsic = 본래 갖춰진 정보",
   "둘 다 Flyweight 역이 반드시 가져야 하는 정보다",
   "intrinsic = 장소나 상황에 의존하지 않아 공유 가능, extrinsic = 장소나 상황에 의존해서 공유 불가능"
  ],
  "ans": 3,
  "exp": "intrinsic은 ‘본래 갖춰진, 본질적인’이라는 뜻으로 어디에 가져가도 변하지 않는 정보예요(공유 가능). extrinsic은 ‘외부에서 온, 비본질적인’이라는 뜻으로 배치 장소·상황에 따라 바뀌는 정보예요(공유 불가능). 표 20-2를 기억하세요."
 },
 {
  "n": 66,
  "ch": 7,
  "lv": 2,
  "t": "mc",
  "q": "교안 예제에서 <b>extrinsic</b>한 정보에 해당하는 것은?",
  "choices": [
   "BigChar의 폰트 데이터(fontdata)",
   "그 BigChar가 BigString의 몇 번째 문자인가",
   "'3'이라는 문자의 # 모양",
   "BigChar가 나타내는 문자(charname)"
  ],
  "ans": 1,
  "exp": "폰트 데이터는 BigString 어디에 나와도 같으니 intrinsic이에요. 반면 ‘몇 번째 문자인가’는 BigChar의 위치에 따라 달라지므로 BigChar가 가질 수 없는 extrinsic 정보예요."
 },
 {
  "n": 67,
  "ch": 7,
  "lv": 3,
  "t": "mc",
  "q": "공유하고 있는 BigChar('3')의 fontdata를 프로그램 실행 중에 바꾸면 어떻게 되나요?",
  "choices": [
   "새 BigChar가 자동으로 복사되어 원래 것은 그대로다",
   "바꾼 BigString 하나의 '3'만 바뀐다",
   "pool에서 자동으로 지워진다",
   "그 BigChar를 쓰는 모든 BigString의 '3' 글꼴이 한꺼번에 바뀐다"
  ],
  "ans": 3,
  "exp": "공유에는 ‘하나를 변경한 것만으로 그것을 사용하는 모든 곳에 영향을 미친다’는 특성이 있어요. 이게 항상 나쁜 건 아니고 문제에 따라 좋을 수도 있어요. 그래서 Flyweight 역이 가질 정보는 <b>정말 여러 곳에서 공유해야 할 것만</b> 고르세요."
 },
 {
  "n": 68,
  "ch": 7,
  "lv": 3,
  "t": "mc",
  "q": "‘색이 있는 큰 문자열’을 만들려고 해요. ‘색’ 정보를 둘 곳에 대한 설명으로 옳은 것은?",
  "choices": [
   "색은 무조건 BigString에 둬야 한다",
   "색은 무조건 BigChar에 둬야 한다",
   "색 정보를 넣으면 Flyweight 패턴을 쓸 수 없다",
   "BigChar에 두면 같은 문자는 반드시 같은 색이 되고, BigString에 두면 같은 BigChar라도 위치마다 다른 색을 줄 수 있다. 어느 쪽이 옳은지는 사용 목적에 달려 있다"
  ],
  "ans": 3,
  "exp": "BigChar에 두면 색도 intrinsic(공유)이 되고, BigString에 두면 extrinsic(위치별)이 돼요. 이 두 방식 중 어느 쪽이 옳다고 단언할 수 없고, 무엇을 공유할지는 설계자가 잘 생각해야 해요."
 },
 {
  "n": 69,
  "ch": 7,
  "lv": 2,
  "t": "mc",
  "q": "‘관리되는 인스턴스는 가비지 컬렉션되지 않는다’는 말이 나오는 이유는?",
  "choices": [
   "pool(HashMap)이 BigChar를 계속 참조하고 있어서 BigString에서 안 쓰더라도 ‘사용 중’으로 간주되기 때문에",
   "synchronized 메서드로 만든 객체는 GC 대상이 아니기 때문에",
   "HashMap에 넣은 객체는 자바가 영원히 지우지 않도록 특별 취급하기 때문에",
   "BigChar가 static 클래스이기 때문에"
  ],
  "ans": 0,
  "exp": "가비지 컬렉터는 다른 곳에서 참조되고 있는 인스턴스를 쓰레기로 판정하지 않아요. pool이 참조를 쥐고 있으니 한 번 만든 BigChar는 계속 메모리에 남아요. 장시간 동작하거나 메모리가 적은 프로그램이라면 이 점을 기억해야 해요."
 },
 {
  "n": 70,
  "ch": 7,
  "lv": 3,
  "t": "mc",
  "q": "pool로 관리되는 BigChar를 가비지 컬렉션 대상으로 만들려면 어떻게 해야 하나요?",
  "choices": [
   "<code>delete bc;</code>로 명시적으로 지운다",
   "<code>bc.finalize()</code>를 직접 부른다",
   "HashMap에서 그 인스턴스를 포함한 엔트리를 삭제해 참조를 없앤다",
   "<code>System.gc()</code>만 부르면 pool에 있어도 지워진다"
  ],
  "ans": 2,
  "exp": "Java에는 new로 만든 인스턴스를 명시적으로 삭제하는 방법이 없어요. 대신 <b>참조를 없앨 수는</b> 있어요. 예를 들어 <code>pool.remove(key)</code>로 엔트리를 지우면 다른 곳에서 안 쓰는 BigChar는 쓰레기가 돼요."
 },
 {
  "n": 71,
  "ch": 7,
  "lv": 2,
  "t": "mc",
  "q": "교안 ‘메모리 이외의 리소스’에서 인스턴스 공유로 줄일 수 있다고 든 리소스가 <b>아닌</b> 것은?",
  "choices": [
   "파일 핸들(파일 디스크립터)",
   "인스턴스를 new로 생성하는 데 걸리는 시간",
   "윈도 핸들",
   "소스 코드의 줄 수"
  ],
  "ans": 3,
  "exp": "인스턴스를 공유하면 생성에 필요한 <b>리소스</b>를 줄일 수 있어요. 메모리뿐 아니라 시간(생성 횟수가 줄어 속도↑), 그리고 OS에 따라 동시에 쓸 수 있는 수가 제한된 파일 핸들·윈도 핸들도 리소스예요."
 },
 {
  "n": 72,
  "ch": 7,
  "lv": 2,
  "t": "mc",
  "q": "교안에서 <b>static Factory Method</b>의 예로 든 메서드를 모두 고른 것은?",
  "choices": [
   "<code>getBigChar</code>, <code>print</code>",
   "<code>BigCharFactory.getInstance</code>, <code>String.valueOf</code>",
   "<code>HashMap.put</code>, <code>HashMap.get</code>",
   "<code>BigString</code> 생성자, <code>BigChar</code> 생성자"
  ],
  "ans": 1,
  "exp": "인스턴스를 얻기 위한 클래스 메서드(static 메서드)예요. getInstance는 유일한 인스턴스를(Singleton), String.valueOf는 특정 문자에 대응하는 문자열 표현을 얻어요."
 },
 {
  "n": 73,
  "ch": 7,
  "lv": 3,
  "t": "mc",
  "q": "다음 코드의 출력으로 알맞은 것은? (줄바꿈은 / 로 표시) 자바 표준 라이브러리 안의 Flyweight를 떠올려 보세요.",
  "choices": [
   "true / false / true / false",
   "true / false / true / true",
   "false / false / true / false",
   "true / true / true / true"
  ],
  "ans": 0,
  "exp": "<code>Integer.valueOf</code>는 -128~127 범위의 Integer를 <b>캐시해 두고 공유</b>해요. 그래서 127은 같은 인스턴스(true), 128은 매번 새로 만들어 false예요. 문자열 리터럴도 상수 풀에서 공유돼 true, <code>new String</code>은 새 인스턴스라 false예요(Java 21로 실행해 확인).",
  "code": "Integer a = Integer.valueOf(127), b = Integer.valueOf(127);\nInteger c = Integer.valueOf(128), d = Integer.valueOf(128);\nSystem.out.println(a == b);\nSystem.out.println(c == d);\nString s1 = \"hi\", s2 = \"hi\", s3 = new String(\"hi\");\nSystem.out.println(s1 == s2);\nSystem.out.println(s1 == s3);"
 },
 {
  "n": 74,
  "ch": 7,
  "lv": 2,
  "t": "mc",
  "q": "Flyweight의 관련 패턴 설명으로 옳은 것은?",
  "choices": [
   "Singleton 역의 인스턴스는 모든 곳에서 공유되므로 intrinsic한 정보만 가진다",
   "Composite 패턴의 Composite 역만 공유할 수 있고 Leaf 역은 공유할 수 없다",
   "FlyweightFactory 역은 절대 Singleton이 되면 안 된다",
   "Proxy 패턴은 인스턴스를 복사해서 처리 속도를 높인다"
  ],
  "ans": 0,
  "exp": "교안: Proxy는 대리인을 두어 처리 속도를 높이고, Flyweight로 Composite의 <b>Leaf 역</b>을 공유할 수 있어요. FlyweightFactory 역은 Singleton이 되는 경우가 있고, Singleton 역은 사용되는 모든 곳에서 공유되므로 intrinsic 정보만 있어요."
 },
 {
  "n": 75,
  "ch": 7,
  "lv": 1,
  "t": "mc",
  "q": "교안 ‘주의’에서 설명한 GoF 책의 역할과의 관계로 옳은 것은?",
  "choices": [
   "이 장의 Flyweight 역은 GoF 책의 ConcreteFlyweight에 해당하고, UnsharedConcreteFlyweight는 예제에 등장하지 않는다",
   "이 장의 Flyweight 역은 GoF 책의 UnsharedConcreteFlyweight에 해당한다",
   "이 장의 Client 역은 GoF 책의 ConcreteFlyweight다",
   "GoF 책에는 Flyweight 패턴이 없다"
  ],
  "ans": 0,
  "exp": "교안은 GoF 책과 조금 다르게 분류했어요. GoF에는 ConcreteFlyweight와 UnsharedConcreteFlyweight가 나오는데, ConcreteFlyweight가 이 장의 Flyweight예요."
 },
 {
  "n": 76,
  "ch": 7,
  "lv": 2,
  "t": "self",
  "q": "[교안 문제 20-1] BigString 클래스에 다음 생성자를 추가하세요. <code>shared</code>가 true면 BigChar를 공유하고, false면 공유하지 않아요.",
  "answer": "public class BigString {\n    private BigChar[] bigchars;\n\n    // 기존 생성자: 공유한다\n    public BigString(String string) {\n        this(string, true);\n    }\n\n    // 추가한 생성자\n    public BigString(String string, boolean shared) {\n        bigchars = new BigChar[string.length()];\n        if (shared) {\n            BigCharFactory factory = BigCharFactory.getInstance();\n            for (int i = 0; i < bigchars.length; i++) {\n                bigchars[i] = factory.getBigChar(string.charAt(i));   // 공유\n            }\n        } else {\n            for (int i = 0; i < bigchars.length; i++) {\n                bigchars[i] = new BigChar(string.charAt(i));          // 공유 안 함\n            }\n        }\n    }\n\n    public void print() {\n        for (BigChar bc : bigchars) {\n            bc.print();\n        }\n    }\n}",
  "kw": [
   "boolean shared",
   "factory.getBigChar",
   "new BigChar",
   "if (shared)"
  ],
  "exp": "공유할 때는 공장(<code>getBigChar</code>)을 거치고, 공유하지 않을 때는 <code>new BigChar</code>로 직접 만들어요. 기존 생성자는 <code>this(string, true)</code>로 새 생성자에 맡기면 중복을 줄일 수 있어요.",
  "code": "BigString(String string, boolean shared)"
 },
 {
  "n": 77,
  "ch": 7,
  "lv": 2,
  "t": "self",
  "q": "[교안 문제 20-2] 문제 20-1의 BigString으로 BigChar를 공유할 때와 공유하지 않을 때의 <b>메모리 소비량</b>을 비교하는 Main을 작성하세요. 참고: <code>Runtime.getRuntime().gc()</code>로 가비지 컬렉션을 요청한 뒤 <code>totalMemory() - freeMemory()</code>를 재요.",
  "answer": "public class Main {\n    private static BigString[] bsarray = new BigString[1000];\n\n    public static void main(String[] args) {\n        if (args.length == 0) {\n            System.out.println(\"Usage: java Main digits\");\n            System.out.println(\"Example: java Main 1212123\");\n            System.exit(0);\n        }\n        System.out.println(\"공유한 경우:\");\n        testAllocation(args[0], true);\n        System.out.println(\"공유하지 않은 경우:\");\n        testAllocation(args[0], false);\n    }\n\n    public static void testAllocation(String string, boolean shared) {\n        for (int i = 0; i < bsarray.length; i++) {\n            bsarray[i] = new BigString(string, shared);   // 많이 만들어 차이를 키운다\n        }\n        showMemory();\n    }\n\n    public static void showMemory() {\n        Runtime.getRuntime().gc();\n        long used = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();\n        System.out.println(\"사용 메모리 = \" + used);\n    }\n}\n// 결과: 공유한 경우의 사용 메모리가 훨씬 작다\n// (정확한 숫자는 JVM·환경마다 다르다)",
  "kw": [
   "Runtime.getRuntime().gc()",
   "totalMemory",
   "freeMemory",
   "true",
   "false",
   "배열"
  ],
  "exp": "BigString을 <b>여러 개(예: 1000개)</b> 만들어 배열에 붙잡아 둬야(참조를 유지해야) gc 후에도 남아 있어 차이가 드러나요. 공유하면 BigChar는 문자 종류만큼만 생기고, 공유하지 않으면 ‘글자 수 × BigString 개수’만큼 생겨요."
 },
 {
  "n": 78,
  "ch": 7,
  "lv": 3,
  "t": "self",
  "q": "[교안 문제 20-3] BigCharFactory의 <code>getBigChar</code>는 <code>synchronized</code> 메서드예요. synchronized로 만든 경우와 그렇지 않은 경우의 차이는 무엇일까요?",
  "answer": "synchronized가 없으면 여러 스레드가 동시에 getBigChar를 부를 때 문제가 생긴다.\n\n예) 스레드 A, B가 동시에 getBigChar('3')을 호출\n  A: pool.get(\"3\") → null\n  B: pool.get(\"3\") → null   (A가 put하기 전에 끼어듦)\n  A: new BigChar('3') 후 put\n  B: new BigChar('3') 후 put (덮어씀)\n→ 같은 문자의 BigChar가 2개 만들어져 '공유'가 깨지고,\n  A와 B가 서로 다른 인스턴스를 쓰게 된다.\n  게다가 HashMap은 스레드 안전하지 않아서 동시에 put하면 내부 구조가 망가질 수도 있다.\n\nsynchronized를 붙이면 한 번에 한 스레드만 메서드를 실행하므로\n'pool에서 찾기 → 없으면 만들어 등록'이 한 덩어리로 실행되어\n같은 문자의 BigChar는 반드시 하나만 만들어진다.\n(단점: 동시에 부르는 스레드는 기다려야 해서 조금 느려질 수 있다)",
  "kw": [
   "멀티스레드",
   "동시에",
   "null",
   "2개",
   "공유가 깨",
   "한 번에 한 스레드"
  ],
  "exp": "Singleton 문제 5-3과 같은 구조의 문제예요. ‘확인(get) → 없으면 생성(new·put)’ 사이에 다른 스레드가 끼어들 수 있는 게 핵심이에요. 싱글 스레드 프로그램이라면 결과 차이는 없어요."
 },
 {
  "n": 79,
  "ch": 7,
  "lv": 2,
  "t": "mc",
  "q": "Flyweight를 적용하면 좋은 경우로 가장 알맞은 것은?",
  "choices": [
   "객체마다 상태가 모두 다르고 자주 바뀔 때",
   "내용이 같은 무거운 객체가 아주 많이 필요하고, 그 내용이 장소에 따라 변하지 않을 때",
   "원형을 복사해서 조금씩 다른 객체를 만들 때",
   "객체를 딱 하나만 만들어야 할 때"
  ],
  "ans": 1,
  "exp": "같은 것을 여러 번 new하면 메모리가 낭비돼요. 공유할 수 있는(intrinsic) 정보가 크고, 그런 객체가 많이 반복될 때 효과가 커요. 상태가 자주 바뀌는 객체를 공유하면 여러 곳에 영향을 미치니 조심해야 해요."
 },
 {
  "n": 80,
  "ch": 8,
  "lv": 1,
  "t": "mc",
  "q": "GoF 분류에서 세 패턴을 바르게 나눈 것은?",
  "choices": [
   "세 패턴 모두 생성 패턴",
   "Singleton·Prototype = 생성 패턴, Flyweight = 구조 패턴",
   "세 패턴 모두 행위 패턴",
   "Singleton = 구조 패턴, Prototype·Flyweight = 생성 패턴"
  ],
  "ans": 1,
  "exp": "GoF는 패턴을 생성·구조·행위로 나눠요. Singleton과 Prototype은 인스턴스를 <b>어떻게 만들지</b>를 다루는 생성 패턴이고, Flyweight는 객체를 <b>어떻게 나누고 묶어 공유할지</b>를 다루는 구조 패턴이에요."
 },
 {
  "n": 81,
  "ch": 8,
  "lv": 2,
  "t": "mc",
  "q": "다음 상황에 가장 알맞은 패턴은?<br>“프로그램 전체에서 쓰는 <b>현재 시스템 설정</b> 객체가 둘 이상 생기면 설정 값이 어긋나는 버그가 생긴다.”",
  "choices": [
   "Prototype",
   "Flyweight",
   "어떤 패턴도 필요 없다",
   "Singleton"
  ],
  "ans": 3,
  "exp": "‘시스템 안에 1개만 존재한다’는 것을 표현하고 보장해야 하는 경우예요. 교안도 컴퓨터 시스템 전체나 현재 시스템 설정을 표현한 클래스를 예로 들어요."
 },
 {
  "n": 82,
  "ch": 8,
  "lv": 2,
  "t": "mc",
  "q": "다음 상황에 가장 알맞은 패턴은?<br>“그래픽 편집기에서 사용자가 마우스로 그린 도형과 <b>똑같은 도형</b>을 하나 더 만들고 싶다.”",
  "choices": [
   "Singleton",
   "Flyweight",
   "Prototype",
   "Facade"
  ],
  "ans": 2,
  "exp": "사용자 조작으로 만들어진 인스턴스는 프로그래밍해서 다시 만들기 어려워요. 지금 만든 인스턴스를 저장해 두고 <b>복사</b>하는 Prototype이 알맞아요."
 },
 {
  "n": 83,
  "ch": 8,
  "lv": 2,
  "t": "mc",
  "q": "다음 상황에 가장 알맞은 패턴은?<br>“문서 편집기에서 수십만 개의 글자를 화면에 그리는데, 같은 글자의 글꼴 모양 데이터를 글자마다 따로 들고 있어 메모리가 부족하다.”",
  "choices": [
   "Flyweight",
   "Prototype",
   "어떤 패턴도 필요 없다",
   "Singleton"
  ],
  "ans": 0,
  "exp": "글꼴 모양(intrinsic)은 공유하고, 위치나 색 같은 extrinsic 정보는 바깥(문서 쪽)에서 관리하면 돼요. 교안의 BigChar·BigString 예제와 같은 구조예요."
 },
 {
  "n": 84,
  "ch": 8,
  "lv": 2,
  "t": "mc",
  "q": "세 패턴에서 ‘인스턴스가 몇 개 생기는가’를 바르게 정리한 것은?",
  "choices": [
   "Singleton: 1개 · Flyweight: 요청마다 새로 · Prototype: 1개",
   "세 패턴 모두 클래스당 1개",
   "Singleton: 클래스당 1개 · Flyweight: 공유 단위(예: 문자 종류)당 1개 · Prototype: 요청할 때마다 새 복사본",
   "Singleton: 요청마다 1개 · Flyweight: 1개 · Prototype: 0개"
  ],
  "ans": 2,
  "exp": "Singleton은 딱 하나, Flyweight는 같은 것끼리 하나를 공유(\"1212123\" → 3개), Prototype은 create를 부를 때마다 새 인스턴스를 복사해 줘요."
 },
 {
  "n": 85,
  "ch": 8,
  "lv": 3,
  "t": "mc",
  "q": "세 패턴에 대한 설명으로 <b>틀린</b> 것은?",
  "choices": [
   "Flyweight의 FlyweightFactory는 Singleton으로 만드는 경우가 많다",
   "Singleton과 Flyweight는 모두 ‘이미 있는 인스턴스를 다시 돌려주는’ 방식이다",
   "Prototype은 복사본이 원본과 같은 인스턴스이므로 복사본을 바꾸면 원본도 반드시 바뀐다",
   "세 패턴 모두 사용하는 쪽이 <code>new 클래스이름()</code>을 직접 쓰지 않고 static 메서드나 공장·관리자를 통해 인스턴스를 얻는다"
  ],
  "ans": 2,
  "exp": "Prototype의 복사본은 <b>별도 인스턴스</b>라서 <code>p1 == p2</code>가 false예요. 다만 clone은 얕은 복사라 배열 같은 참조형 필드를 바꾸면 원본에 영향을 줄 수 있다는 점은 조심해야 해요(‘반드시’가 틀린 부분이에요)."
 },
 {
  "n": 86,
  "ch": 8,
  "lv": 2,
  "t": "mc",
  "q": "교안 Flyweight 예제 하나 안에 함께 쓰인 패턴을 모두 고른 것은?",
  "choices": [
   "Flyweight와 Singleton",
   "Flyweight, Singleton, Prototype 모두",
   "Flyweight와 Prototype",
   "Flyweight만"
  ],
  "ans": 0,
  "exp": "BigCharFactory 클래스 다이어그램에 <code>-singleton</code>, <code>getInstance</code>(밑줄=static)가 있어요. 공장은 Singleton으로 하나만 두고, 그 공장이 BigChar를 Flyweight로 공유해요."
 },
 {
  "n": 87,
  "ch": 8,
  "lv": 2,
  "t": "self",
  "q": "스터디 발표용으로 세 패턴을 각각 <b>한 문장</b>으로 설명하고, 교안 예제에서 그 패턴의 핵심이 되는 코드 한 줄을 쓰세요.",
  "answer": "Singleton: 생성자를 private으로 막고 static 메서드로 유일한 인스턴스만 돌려줘서,\n           인스턴스가 하나만 존재함을 보장한다.\n           → private Singleton() { ... }  /  return singleton;\n\nPrototype: 원형 인스턴스를 등록해 두고 복사(clone)해서 새 인스턴스를 만들어,\n           클래스 이름에 묶이지 않고 인스턴스를 생성한다.\n           → p = (Product) clone();  /  return p.createCopy();\n\nFlyweight: 이미 만든 인스턴스를 pool에 두고 같은 것이 필요하면 공유해서,\n           쓸데없는 new를 줄이고 메모리를 아낀다.\n           → if (bc == null) { bc = new BigChar(charname); pool.put(...); }",
  "kw": [
   "하나",
   "private",
   "복사",
   "clone",
   "공유",
   "pool"
  ],
  "exp": "핵심 키워드만 들어가면 표현은 자유예요. ‘하나만(보장) / 복사해서 / 공유해서’의 차이를 말할 수 있으면 돼요."
 },
 {
  "n": 88,
  "ch": 8,
  "lv": 3,
  "t": "self",
  "q": "도형 편집기를 만들어요. <code>Shape</code>(Cloneable, <code>Shape copy()</code> 메서드 보유)를 원형으로 등록·복제하는 <code>ShapeRegistry</code>를 만드세요. 조건: ① ShapeRegistry는 프로그램에 <b>하나만</b> 존재(Singleton) ② <code>register(String name, Shape s)</code>로 원형 등록 ③ <code>create(String name)</code>은 등록된 원형의 <b>복사본</b>을 반환(Prototype).",
  "answer": "import java.util.HashMap;\nimport java.util.Map;\n\npublic class ShapeRegistry {\n    private static ShapeRegistry registry = new ShapeRegistry();   // Singleton\n    private Map<String, Shape> prototypes = new HashMap<>();\n\n    private ShapeRegistry() {\n    }\n\n    public static ShapeRegistry getInstance() {\n        return registry;\n    }\n\n    public void register(String name, Shape shape) {\n        prototypes.put(name, shape);\n    }\n\n    public Shape create(String name) {\n        Shape p = prototypes.get(name);\n        if (p == null) {\n            throw new IllegalArgumentException(\"등록되지 않은 이름: \" + name);\n        }\n        return p.copy();                                            // Prototype\n    }\n}\n\n// 사용 예\n// ShapeRegistry r = ShapeRegistry.getInstance();\n// r.register(\"red circle\", new Circle(\"red\", 10));\n// Shape a = r.create(\"red circle\");\n// Shape b = r.create(\"red circle\");   // a != b (별도 복사본)",
  "kw": [
   "private static ShapeRegistry",
   "private ShapeRegistry()",
   "getInstance",
   "Map<String, Shape>",
   "copy()"
  ],
  "exp": "교안의 Manager(Prototype의 Client)를 Singleton으로 만든 형태예요. 관리자는 하나로 <b>공유</b>하되, 만들어 주는 도형은 매번 <b>복사본</b>이라는 점이 포인트예요. Flyweight처럼 같은 인스턴스를 돌려주면 안 돼요.",
  "code": "public abstract class Shape implements Cloneable {\n    public Shape copy() {\n        try { return (Shape) clone(); }\n        catch (CloneNotSupportedException e) { throw new AssertionError(e); }\n    }\n}"
 },
 {
  "n": 89,
  "ch": 8,
  "lv": 3,
  "t": "mc",
  "q": "다음 중 Flyweight로 공유하면 <b>위험한</b> 정보는?",
  "choices": [
   "체스 말 종류별 이미지",
   "사용자별 장바구니에 담긴 상품 목록",
   "숫자 0~9의 큰 문자 데이터",
   "글자 'A'의 글꼴 모양 데이터"
  ],
  "ans": 1,
  "exp": "장바구니는 사용자(상황)마다 다른 <b>extrinsic</b> 정보라서 공유하면 한 사람의 변경이 다른 사람에게 퍼져요. 나머지는 어디에 쓰여도 변하지 않는 intrinsic 정보라 공유하기 좋아요."
 },
 {
  "n": 90,
  "ch": 5,
  "lv": 1,
  "t": "mc",
  "q": "Observer 패턴에 대한 설명으로 가장 알맞은 것은?",
  "choices": [
   "원형 인스턴스를 복사해서 새 인스턴스를 만든다",
   "같은 인스턴스를 여러 곳에서 공유해 메모리를 아낀다",
   "인스턴스의 상태를 저장해 두었다가 나중에 되돌린다",
   "관찰 대상의 상태가 변하면 관찰자에게 알려 준다"
  ],
  "ans": 3,
  "exp": "observer는 ‘관찰자’라는 뜻이에요. 관찰 대상의 상태가 변화하면 관찰자에게 알리므로, <b>상태 변화에 따른 처리</b>를 기술할 때 효과적이에요. ②는 Memento, ③은 Flyweight, ④는 Prototype이에요."
 },
 {
  "n": 91,
  "ch": 5,
  "lv": 1,
  "t": "mc",
  "q": "교안 예제 프로그램(표 17-1)의 클래스와 설명을 바르게 짝지은 것은?",
  "choices": [
   "Observer: 수를 생성하는 추상 클래스 · NumberGenerator: 관찰자 인터페이스 · DigitObserver: 그래프로 표시",
   "Observer: 동작 테스트용 · NumberGenerator: 랜덤하게 수 생성 · RandomNumberGenerator: 관찰자 인터페이스",
   "Observer: 관찰자 인터페이스 · NumberGenerator: 수를 생성하는 추상 클래스 · RandomNumberGenerator: 랜덤하게 수 생성",
   "Observer: 관찰자 추상 클래스 · NumberGenerator: 관찰자 인터페이스 · GraphObserver: 숫자로 표시"
  ],
  "ans": 2,
  "exp": "Observer는 관찰자를 나타내는 <b>인터페이스</b>, NumberGenerator는 수를 생성하는 객체를 나타내는 <b>추상 클래스</b>, RandomNumberGenerator는 랜덤하게 수를 생성하는 클래스예요. DigitObserver는 숫자로, GraphObserver는 간이 그래프로 수를 표시해요."
 },
 {
  "n": 92,
  "ch": 5,
  "lv": 1,
  "t": "mc",
  "q": "교안의 <code>Observer</code> 인터페이스가 선언하는 메서드는?",
  "choices": [
   "<code>void notify(Observer observer)</code>",
   "<code>void update(NumberGenerator generator)</code>",
   "<code>void update(int number, Observer o)</code>",
   "<code>void addObserver(Observer o)</code>"
  ],
  "ans": 1,
  "exp": "Observer 인터페이스에는 <code>public abstract void update(NumberGenerator generator);</code> 하나만 있어요. update는 NumberGenerator가 ‘내용이 갱신되었어요. 표시하는 쪽도 갱신해 주세요’라고 Observer에 전달하기 위한 메서드예요.",
  "code": "public interface Observer {\n    public abstract void update(NumberGenerator generator);\n}"
 },
 {
  "n": 93,
  "ch": 5,
  "lv": 2,
  "t": "mc",
  "q": "교안의 Observer 인터페이스와 <code>java.util.Observer</code>의 관계로 옳은 것은?",
  "choices": [
   "둘은 같은 인터페이스라 어느 쪽을 써도 결과가 완전히 똑같다",
   "교안의 Observer는 java.util.Observer를 import해서 그대로 쓴 것이다",
   "java.util.Observer는 최신 Java에 새로 추가된 권장 인터페이스다",
   "서로 다르며, java.util.Observer는 비추천(deprecated)이다"
  ],
  "ans": 3,
  "exp": "교안의 Observer 인터페이스는 예제용으로 직접 만든 것으로, Java 클래스 라이브러리의 <code>java.util.Observer</code>와는 달라요. java.util.Observer는 <b>비추천(deprecated)</b> 인터페이스라서 새 프로그램에는 사용하지 않아요. 📝 수업 필기에도 ‘deprecated’에 표시가 되어 있어요."
 },
 {
  "n": 94,
  "ch": 5,
  "lv": 1,
  "t": "mc",
  "q": "NumberGenerator의 <code>observers</code> 필드 선언으로 알맞은 것은?",
  "choices": [
   "<code>private List&lt;Observer&gt; observers = new ArrayList&lt;&gt;();</code>",
   "<code>public static Observer[] observers;</code>",
   "<code>private Observer observers = new Observer();</code>",
   "<code>private Map&lt;String,Observer&gt; observers = new HashMap&lt;&gt;();</code>"
  ],
  "ans": 0,
  "exp": "observers는 NumberGenerator를 관찰하는 Observer들을 저장하는 필드예요. 형은 <code>List&lt;Observer&gt;</code>(인터페이스), 실제 객체는 <code>ArrayList</code>(구현 클래스)예요. 📝 수업 필기: ‘구현체(ArrayList) 저장, List’. Observer는 인터페이스라 ②처럼 new할 수 없어요."
 },
 {
  "n": 95,
  "ch": 5,
  "lv": 2,
  "t": "mc",
  "q": "NumberGenerator의 <code>notifyObservers</code>가 하는 일로 알맞은 것은?",
  "choices": [
   "새 Observer를 observers 리스트에 추가하고, 추가된 순서대로 번호를 붙인다",
   "난수를 하나 생성해 number 필드에 저장하고, 그 값을 반환한다",
   "observers에 저장된 Observer 하나하나의 update를 호출해 알린다",
   "등록된 Observer를 모두 지우고 리스트를 비워 처음 상태로 되돌린다"
  ],
  "ans": 2,
  "exp": "<code>for (Observer o: observers) { o.update(this); }</code>처럼 저장된 Observer 모두에게 update를 호출해요. 인수로 <code>this</code>(자기 자신, 즉 관찰 대상)를 넘겨서 Observer가 필요한 정보를 꺼내 가게 해요.",
  "code": "public void notifyObservers() {\n    for (Observer o: observers) {\n        o.update(this);\n    }\n}"
 },
 {
  "n": 96,
  "ch": 5,
  "lv": 2,
  "t": "mc",
  "q": "NumberGenerator에서 <code>getNumber</code>와 <code>execute</code>가 추상 메서드인 이유는?",
  "choices": [
   "추상 메서드로 두어야 Observer에게 자동으로 통지가 가기 때문에",
   "추상 메서드만 다른 패키지에서 static으로 호출할 수 있어서",
   "수를 만들고 얻는 방법은 하위 클래스가 정해야 하기 때문에",
   "Observer 인터페이스가 두 메서드를 반드시 구현하라고 요구해서"
  ],
  "ans": 2,
  "exp": "NumberGenerator는 관찰자 관리(add·delete·notify)만 맡고, 실제로 <b>수를 생성하는 부분(execute)</b>과 <b>수를 얻는 부분(getNumber)</b>은 하위 클래스에서 구현해야 하는 추상 메서드로 되어 있어요(하위 클래스의 책임)."
 },
 {
  "n": 97,
  "ch": 5,
  "lv": 1,
  "t": "mc",
  "q": "RandomNumberGenerator의 <code>execute</code>가 하는 일로 알맞은 것은?",
  "choices": [
   "0~50 범위의 난수를 하나 생성하고, 생성이 모두 끝난 뒤에 한 번만 통지한다",
   "난수를 20개 생성해 리스트에 모두 저장한 뒤, 그 리스트를 반환한다",
   "1~20 범위의 수를 차례로 생성하고, 관찰자를 하나씩 리스트에 추가한다",
   "0~49 범위의 난수를 20개 만들고, 만들 때마다 관찰자에게 통지한다"
  ],
  "ans": 3,
  "exp": "for문을 20번 돌며 <code>number = random.nextInt(50);</code>로 0 이상 50 미만의 정수를 만들고 바로 <code>notifyObservers();</code>를 호출해요. <code>nextInt(50)</code>은 0 이상, 인수로 지정한 수 <b>미만</b>의 정수를 반환해요.",
  "code": "@Override\npublic void execute() {\n    for (int i = 0; i < 20; i++) {\n        number = random.nextInt(50);\n        notifyObservers();\n    }\n}"
 },
 {
  "n": 98,
  "ch": 5,
  "lv": 1,
  "t": "mc",
  "q": "GraphObserver의 update에 <code>getNumber()</code>가 3인 NumberGenerator가 넘어오면 출력은?",
  "choices": [
   "GraphObserver:333",
   "***",
   "GraphObserver:***",
   "GraphObserver:3"
  ],
  "ans": 2,
  "exp": "GraphObserver는 관찰한 수만큼 <code>*</code>를 찍어 ‘간이 그래프’로 표시해요. 3이면 <code>GraphObserver:***</code>예요. 숫자로 표시하는 건 DigitObserver(<code>DigitObserver:3</code>)예요.",
  "code": "@Override\npublic void update(NumberGenerator generator) {\n    System.out.print(\"GraphObserver:\");\n    int count = generator.getNumber();\n    for (int i = 0; i < count; i++) {\n        System.out.print(\"*\");\n    }\n    System.out.println(\"\");\n}"
 },
 {
  "n": 99,
  "ch": 5,
  "lv": 2,
  "t": "mc",
  "q": "DigitObserver와 GraphObserver의 update 안에 있는 <code>Thread.sleep(100)</code>의 역할은?",
  "choices": [
   "InterruptedException이 반드시 발생하도록 한다",
   "NumberGenerator가 다음 수를 만들지 못하게 막는다",
   "표시되는 모습을 잘 알 수 있도록 속도를 느리게 한다",
   "다른 Observer가 먼저 실행되도록 순서를 바꾼다"
  ],
  "ans": 2,
  "exp": "교안: 표시되는 모습을 잘 알 수 있도록 <code>Thread.sleep</code>으로 속도를 느리게 했어요. sleep은 InterruptedException을 던질 수 있어서 try-catch로 감싸요."
 },
 {
  "n": 100,
  "ch": 5,
  "lv": 1,
  "t": "mc",
  "q": "Observer 패턴의 역할과 교안 예제 클래스를 바르게 짝지은 것은?",
  "choices": [
   "Subject = RandomNumberGenerator · ConcreteSubject = NumberGenerator · Observer = GraphObserver · ConcreteObserver = Main",
   "Subject = Observer · ConcreteSubject = DigitObserver · Observer = NumberGenerator · ConcreteObserver = RandomNumberGenerator",
   "Subject = NumberGenerator · ConcreteSubject = RandomNumberGenerator · Observer = Observer · ConcreteObserver = DigitObserver, GraphObserver",
   "Subject = Main · ConcreteSubject = NumberGenerator · Observer = DigitObserver · ConcreteObserver = Observer"
  ],
  "ans": 2,
  "exp": "<b>Subject(관찰 대상)</b>는 Observer를 등록·삭제하는 메서드와 ‘현재 상태를 가져오는’ 메서드를 가져요(NumberGenerator). <b>ConcreteSubject</b>는 상태가 바뀌면 등록된 Observer에 알려요(RandomNumberGenerator). <b>Observer(관찰자)</b>는 update로 전달받고(Observer 인터페이스), <b>ConcreteObserver</b>는 update에서 Subject의 현재 상태를 얻어요(DigitObserver, GraphObserver)."
 },
 {
  "n": 101,
  "ch": 5,
  "lv": 2,
  "t": "mc",
  "q": "Observer 패턴의 클래스 다이어그램(그림 17-3)에서 Subject 역이 가진 메서드로 <b>알맞지 않은</b> 것은?",
  "choices": [
   "getSubjectStatus",
   "update",
   "notifyObservers",
   "addObserver"
  ],
  "ans": 1,
  "exp": "Subject는 observers 필드와 addObserver, deleteObserver, notifyObservers, getSubjectStatus를 가져요. <code>update</code>는 Observer 역의 메서드예요(Subject → Observer 방향으로 Notifies)."
 },
 {
  "n": 102,
  "ch": 5,
  "lv": 2,
  "t": "mc",
  "q": "다음 프로그램의 출력으로 알맞은 것은? (줄바꿈은 / 로 표시. FixedGenerator는 execute에서 3, 1을 차례로 number에 넣고 그때마다 notifyObservers를 불러요.)",
  "choices": [
   "GraphObserver:*** / GraphObserver:* / DigitObserver:3 / DigitObserver:1",
   "DigitObserver:3 / GraphObserver:*** / DigitObserver:1 / GraphObserver:*",
   "GraphObserver:*** / DigitObserver:3 / GraphObserver:* / DigitObserver:1",
   "DigitObserver:3 / DigitObserver:1 / GraphObserver:*** / GraphObserver:*"
  ],
  "ans": 2,
  "exp": "notifyObservers는 observers 리스트에 <b>먼저 등록한 Observer의 update를 먼저</b> 호출해요. graph를 먼저 add했으니 수가 하나 만들어질 때마다 Graph → Digit 순서로 출력돼요(Java 21로 실행해 확인).",
  "code": "NumberGenerator generator = new FixedGenerator(3, 1);\nObserver digit = new DigitObserver();\nObserver graph = new GraphObserver();\ngenerator.addObserver(graph);\ngenerator.addObserver(digit);\ngenerator.execute();"
 },
 {
  "n": 103,
  "ch": 5,
  "lv": 3,
  "t": "mc",
  "q": "앞 문제에 이어 다음 코드를 실행하면 출력은? (줄바꿈은 / 로 표시)",
  "choices": [
   "DigitObserver:3 / DigitObserver:3 / DigitObserver:1 / DigitObserver:1",
   "GraphObserver:*** / DigitObserver:3 / GraphObserver:* / DigitObserver:1",
   "컴파일 에러가 난다",
   "DigitObserver:3 / DigitObserver:1"
  ],
  "ans": 0,
  "exp": "graph는 지워지고, digit은 <b>이미 등록된 상태에서 한 번 더</b> add돼요. observers는 ArrayList라 같은 객체도 중복으로 들어가므로, 수 하나마다 DigitObserver의 update가 두 번 불려요(Java 21로 실행해 확인).",
  "code": "generator.deleteObserver(graph);\ngenerator.addObserver(digit);\ngenerator.execute();"
 },
 {
  "n": 104,
  "ch": 5,
  "lv": 2,
  "t": "mc",
  "q": "교안 ‘Observer의 순서’에서 말하는, ConcreteObserver를 설계할 때 지켜야 할 것은?",
  "choices": [
   "Observer는 반드시 하나만 등록해서 순서 문제가 아예 생기지 않게 한다",
   "DigitObserver의 update가 끝난 뒤에만 GraphObserver가 동작하도록 서로 의존하게 만든다",
   "update가 호출되는 순서가 바뀌어도 문제가 생기지 않도록 각 클래스의 독립성을 유지한다",
   "notifyObservers가 Observer를 무작위 순서로 부르도록 바꾼다"
  ],
  "ans": 2,
  "exp": "예제에서는 먼저 등록한 Observer의 update가 먼저 호출되지만, 일반적으로 ConcreteObserver는 <b>호출 순서가 바뀌어도 문제가 없도록</b> 설계해야 해요. 각 클래스의 독립성이 유지되면 의존성의 혼란은 일어나지 않아요."
 },
 {
  "n": 105,
  "ch": 5,
  "lv": 3,
  "t": "mc",
  "q": "교안 ‘Observer의 행위가 Subject에 영향을 미칠 때’에서 경고하는 상황은?",
  "choices": [
   "update 안에서 Subject의 상태를 바꾸면 통지가 끝없이 반복될 수 있다",
   "update 안에서 getNumber를 부르면 NumberGenerator 인스턴스가 지워진다",
   "Subject가 update를 부르면 Observer의 필드가 모두 자동으로 초기화된다",
   "GUI에서 사용자가 버튼을 누르면 update가 절대 호출되지 않게 된다"
  ],
  "ans": 0,
  "exp": "Subject가 update를 호출하는 계기가 해당 Observer인 경우도 있어요. 조심해서 설계하지 않으면 메서드 호출이 영원히 계속될 수 있어요. 대책: 현재 통지 처리 중인지를 Observer가 판단하거나, 통지 타이밍을 Subject가 고려해요."
 },
 {
  "n": 106,
  "ch": 5,
  "lv": 2,
  "t": "mc",
  "q": "update 메서드의 인수 형태 (1)~(3)에 대한 설명으로 옳은 것은?",
  "choices": [
   "(1)~(3)은 어떤 프로그램에서든 항상 똑같이 동작하므로 고를 이유가 없다",
   "(2)처럼 힌트 정보를 넘기면 Subject는 Observer의 처리를 의식할 필요가 없다",
   "(1)처럼 Subject만 넘기면 Observer가 Subject에서 정보를 얻을 방법이 없다",
   "(3)은 한 Observer가 여러 Subject를 관찰하면 어느 쪽 수인지 알 수 없다"
  ],
  "ans": 3,
  "exp": "(1)은 Subject만 넘기고 Observer가 필요할 때 정보를 얻어요. (2)는 <b>힌트 정보</b>를 함께 넘겨 수고를 줄이지만, 그만큼 Subject가 Observer의 처리 내용을 의식하게 돼요. (3)은 Subject까지 생략해서, 하나의 Observer가 여러 Subject를 관찰하면 부적절해요.",
  "code": "void update(NumberGenerator generator);               // (1)\nvoid update(NumberGenerator generator, int number);   // (2)\nvoid update(int number);                              // (3)"
 },
 {
  "n": 107,
  "ch": 5,
  "lv": 2,
  "t": "mc",
  "q": "‘관찰’하기보다 ‘전달’받기를 기다린다는 말과 관계있는 Observer 패턴의 다른 이름은?",
  "choices": [
   "Publish-Subscribe 패턴",
   "Model-View 패턴",
   "Chain of Responsibility 패턴",
   "Template Method 패턴"
  ],
  "ans": 0,
  "exp": "Observer 역은 능동적으로 관찰하는 게 아니라 Subject가 ‘알려 주는 것’을 수동적으로 기다려요. 그래서 publish(발행)와 subscribe(구독)라는 표현이 더 실체에 맞을지도 몰라 <b>Publish-Subscribe</b> 패턴으로도 불려요."
 },
 {
  "n": 108,
  "ch": 5,
  "lv": 2,
  "t": "mc",
  "q": "MVC 구조와 Observer 패턴의 관계로 옳은 것은?",
  "choices": [
   "Model이 Subject, View가 Observer이고, 보통 Model 하나에 View가 여럿이다",
   "MVC의 세 부분은 서로 독립적이라 Observer 패턴과는 아무 관계가 없다",
   "View가 Subject, Model이 Observer이고, 보통 View 하나에 Model이 여럿이다",
   "Controller가 Subject이고, View는 상태를 저장하는 Memento 역을 맡는다"
  ],
  "ans": 0,
  "exp": "Model은 ‘표시 형식에 의존하지 않는 내부 모델’을 조작하는 부분, View는 Model을 ‘어떻게 보여 줄지’ 관리하는 부분이에요. Model(Subject)이 바뀌면 여러 View(Observer)가 갱신돼요."
 },
 {
  "n": 109,
  "ch": 5,
  "lv": 3,
  "t": "mc",
  "q": "교안 ‘여기에도 교환 가능성이 등장한다’의 요점으로 알맞은 것은?",
  "choices": [
   "구상 클래스를 쉽게 교환하려면 추상 클래스와 인터페이스를 먼저 모두 없애야 한다",
   "Subject는 관찰자가 Observer를 구현했다는 것만 알면 되어, 구상 클래스를 쉽게 바꿀 수 있다",
   "RandomNumberGenerator는 DigitObserver와 GraphObserver의 소스를 모두 알아야 통지할 수 있다",
   "DigitObserver는 자신이 관찰하는 대상이 RandomNumberGenerator라는 것을 꼭 알아야 한다"
  ],
  "ans": 1,
  "exp": "추상 클래스나 인터페이스로 구상 클래스에서 추상 메서드를 분리하고, 인수나 필드는 구상 클래스형이 아니라 추상 클래스·인터페이스형으로 두면 구상 클래스 부분을 쉽게 교환할 수 있어요. 📝 교안에 별표(★)로 표시된 부분이에요."
 },
 {
  "n": 110,
  "ch": 5,
  "lv": 2,
  "t": "mc",
  "q": "Observer 패턴과 Mediator 패턴을 비교한 설명으로 옳은 것은?",
  "choices": [
   "Mediator 패턴 안에서는 Observer 패턴을 함께 사용할 수 없다",
   "Observer는 상태 변화를 여러 관찰자에게 통지하고 동기화하는 것이 주안점이다",
   "Mediator는 상태 변화를 전혀 알리지 않으므로 Observer와 공통점이 하나도 없다",
   "Observer 패턴의 목적은 여러 Colleague 역의 동작을 조정하는 것이다"
  ],
  "ans": 1,
  "exp": "Mediator에서는 Mediator와 Colleague의 통신에 Observer 패턴을 쓰기도 해요. 둘 다 ‘상태 변화를 알린다’는 점은 비슷하지만, Mediator의 통지는 Colleague를 조정하려는 목적의 일부이고, Observer는 <b>통지하고 동기화하는 것</b> 자체가 주안점이에요."
 },
 {
  "n": 111,
  "ch": 5,
  "lv": 3,
  "t": "mc",
  "q": "IncrementalNumberGenerator(문제 17-1 방식)를 다음처럼 쓰면 출력은? (줄바꿈은 / 로 표시. 종료하는 수는 포함하지 않아요.)",
  "choices": [
   "D:10 / D:25 / D:40 / D:55 / end=55",
   "D:25 / D:40 / end=55",
   "D:10 / D:25 / D:40 / end=55",
   "D:10 / D:25 / D:40 / end=40"
  ],
  "ans": 2,
  "exp": "10에서 시작해 15씩 늘리며 50 <b>미만</b>일 동안 통지해요: 10, 25, 40. 40 다음 55가 되어 반복이 끝나므로 마지막 getNumber는 55예요(Java 21로 실행해 확인). 람다 <code>x -&gt; …</code>는 메서드가 하나뿐인 Observer 인터페이스를 짧게 구현한 거예요.",
  "code": "class IncrementalNumberGenerator extends NumberGenerator {\n    private int number, end, inc;\n    public IncrementalNumberGenerator(int start, int end, int inc) {\n        this.number = start; this.end = end; this.inc = inc;\n    }\n    public int getNumber() { return number; }\n    public void execute() {\n        while (number < end) {\n            notifyObservers();\n            number += inc;\n        }\n    }\n}\n// Main\nNumberGenerator g = new IncrementalNumberGenerator(10, 50, 15);\ng.addObserver(x -> System.out.println(\"D:\" + x.getNumber()));\ng.execute();\nSystem.out.println(\"end=\" + g.getNumber());"
 },
 {
  "n": 112,
  "ch": 5,
  "lv": 2,
  "t": "self",
  "q": "[교안 문제 17-1] NumberGenerator를 확장해 수가 점점 증가하는 <code>IncrementalNumberGenerator</code>를 만드세요. 생성자 인수는 ① 시작하는 수 ② 종료하는 수(포함하지 않음) ③ 증갓값이에요. <code>new IncrementalNumberGenerator(10, 50, 5)</code>면 10, 15, …, 45가 차례로 관찰자에게 통지돼야 해요.",
  "answer": "public class IncrementalNumberGenerator extends NumberGenerator {\n    private int number;     // 현재 수\n    private int end;        // 종료하는 수(이 수를 포함하지 않음)\n    private int inc;        // 증갓값\n\n    public IncrementalNumberGenerator(int start, int end, int inc) {\n        this.number = start;\n        this.end = end;\n        this.inc = inc;\n    }\n\n    @Override\n    public int getNumber() {\n        return number;\n    }\n\n    @Override\n    public void execute() {\n        while (number < end) {\n            notifyObservers();\n            number += inc;\n        }\n    }\n}",
  "kw": [
   "extends NumberGenerator",
   "getNumber",
   "execute",
   "notifyObservers",
   "< end",
   "+= inc"
  ],
  "exp": "NumberGenerator의 추상 메서드 getNumber와 execute를 구현하면 돼요. 관찰자 관리(add·notify)는 상위 클래스가 이미 해 주니, execute에서는 수를 바꿀 때마다 <code>notifyObservers()</code>만 부르면 돼요. 종료하는 수를 포함하지 않으니 조건은 <code>&lt;</code>예요. Main은 생성 부분만 <code>new IncrementalNumberGenerator(10, 50, 5)</code>로 바꾸면 그대로 동작해요(교환 가능성).",
  "code": "// 리스트 17-7 Main\nNumberGenerator generator = new IncrementalNumberGenerator(10, 50, 5);\nObserver observer1 = new DigitObserver();\nObserver observer2 = new GraphObserver();\ngenerator.addObserver(observer1);\ngenerator.addObserver(observer2);\ngenerator.execute();"
 },
 {
  "n": 113,
  "ch": 5,
  "lv": 2,
  "t": "self",
  "q": "[교안 문제 17-2] 예제 프로그램에 추가하는 형태로 새로운 ConcreteObserver 역을 자유롭게 만들고, Main을 바꿔 활용하세요. (예: 수가 짝수인지 홀수인지 표시하는 Observer)",
  "answer": "public class EvenOddObserver implements Observer {\n    @Override\n    public void update(NumberGenerator generator) {\n        int n = generator.getNumber();\n        System.out.println(\"EvenOddObserver:\" + n + (n % 2 == 0 ? \" 짝수\" : \" 홀수\"));\n    }\n}\n\n// Main\nNumberGenerator generator = new RandomNumberGenerator();\ngenerator.addObserver(new DigitObserver());\ngenerator.addObserver(new GraphObserver());\ngenerator.addObserver(new EvenOddObserver());   // 새 ConcreteObserver 추가\ngenerator.execute();",
  "kw": [
   "implements Observer",
   "update(NumberGenerator generator)",
   "getNumber",
   "addObserver"
  ],
  "exp": "Observer 인터페이스를 구현하고 update 안에서 <code>generator.getNumber()</code>로 현재 상태를 얻으면 돼요. NumberGenerator 쪽 코드는 하나도 고치지 않고 <code>addObserver</code>만 추가했다는 게 핵심이에요. 다른 아이디어(최댓값 기록, 합계 표시 등)도 정답이에요."
 },
 {
  "n": 114,
  "ch": 5,
  "lv": 3,
  "t": "self",
  "q": "교안 ‘Observer의 행위가 Subject에 영향을 미칠 때’처럼, Observer가 update 안에서 Subject의 상태를 바꾸는 바람에 통지가 끝없이 반복되는 문제를 막는 방법을 한 가지 이상 쓰세요.",
  "answer": "[문제]\nSubject 상태 변화 → Observer로 통지 → Observer가 Subject의 메서드 호출\n→ 그에 따라 Subject 상태 변화 → Observer로 통지 → … (무한 반복)\n\n[대책 예]\n① Subject가 '지금 통지 중' 플래그를 두고, 통지 중에 생긴 변경은 바로 다시 통지하지 않는다\n   private boolean notifying = false;\n   public void notifyObservers() {\n       if (notifying) return;\n       notifying = true;\n       try { for (Observer o : observers) o.update(this); }\n       finally { notifying = false; }\n   }\n② Observer가 현재 통지 처리 중인지 스스로 판단해, 처리 중이면 Subject를 다시 바꾸지 않는다\n③ 값이 실제로 바뀌었을 때만 통지한다(같은 값이면 notifyObservers를 부르지 않음)",
  "kw": [
   "무한",
   "통지 중",
   "플래그",
   "판단",
   "타이밍"
  ],
  "exp": "교안의 대책은 ‘현재 통지 처리 중인지 아닌지를 Observer가 판단하거나, 통지하는 타이밍을 Subject가 고려하는 것’이에요. 핵심 키워드만 들어가면 표현은 자유예요."
 },
 {
  "n": 115,
  "ch": 5,
  "lv": 1,
  "t": "mc",
  "q": "교안 Main(리스트 17-6)에서 관찰자를 등록하는 메서드와 수 생성을 시작하는 메서드를 차례로 고른 것은?",
  "choices": [
   "notifyObservers · update",
   "addObserver · execute",
   "register · create",
   "update · getNumber"
  ],
  "ans": 1,
  "exp": "<code>generator.addObserver(observer1); generator.addObserver(observer2);</code>로 관찰자 2개를 등록한 뒤 <code>generator.execute();</code>로 수를 생성해요. 관찰자는 DigitObserver와 GraphObserver의 인스턴스예요."
 },
 {
  "n": 116,
  "ch": 6,
  "lv": 1,
  "t": "mc",
  "q": "Memento 패턴에 대한 설명으로 가장 알맞은 것은?",
  "choices": [
   "캡슐화의 파괴에 빠지지 않고 인스턴스의 상태를 저장하고 복원한다",
   "같은 상태의 인스턴스를 복사해서 별도의 인스턴스를 만든다",
   "관찰 대상의 상태가 변하면 등록된 관찰자 모두에게 알린다",
   "인스턴스가 하나만 존재하도록 생성자를 private으로 막는다"
  ],
  "ans": 0,
  "exp": "인스턴스의 상태를 나타내는 역할을 도입해, <b>캡슐화의 파괴에 빠지지 않고</b> 저장과 복원을 하는 것이 Memento 패턴이에요. 어느 시점의 인스턴스 상태를 확실하게 기록해 두고, 나중에 그 시점의 상태로 되돌려 줘요."
 },
 {
  "n": 117,
  "ch": 6,
  "lv": 1,
  "t": "mc",
  "q": "memento라는 낱말의 뜻으로 알맞은 것은?",
  "choices": [
   "원형·모범·견본",
   "관찰자·감시자·구독자",
   "기념품·유품·추억거리",
   "가장 가벼운 체급"
  ],
  "ans": 2,
  "exp": "memento는 ‘기념품’, ‘유품’, ‘추억거리’라는 뜻이에요. 서랍 속에서 찾은 추억의 사진을 보면 그 시절로 돌아간 것 같은 기분이 드는 것처럼, 저장해 둔 시점으로 인스턴스를 되돌려요."
 },
 {
  "n": 118,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "교안이 말하는 ‘캡슐화의 파괴’란?",
  "choices": [
   "내부 정보에 함부로 접근을 허락해, 내부 구조에 의존하는 코드가 흩어지는 것",
   "Memento 인스턴스를 너무 많이 만들어 메모리와 디스크가 부족해지는 것",
   "클래스를 여러 패키지로 나누는 바람에 import 문이 복잡해지는 것",
   "필드를 모두 private으로 막아서 아무도 상태를 저장하지 못하게 되는 것"
  ],
  "ans": 0,
  "exp": "인스턴스를 복원하려면 내부 정보에 자유롭게 접근할 수 있어야 해요. 그런데 부주의하게 접근을 허락하면 그 클래스의 내부 구조에 의존하는 코드가 프로그램 곳곳에 흩어져 <b>클래스를 수정하기가 곤란</b>해져요. 이것을 캡슐화의 파괴라고 해요."
 },
 {
  "n": 119,
  "ch": 6,
  "lv": 1,
  "t": "mc",
  "q": "교안에서 Memento 패턴으로 할 수 있는 일로 든 것이 <b>아닌</b> 것은?",
  "choices": [
   "인스턴스 공유(share)",
   "실행 취소(undo)",
   "작업 이력 작성(history)",
   "다시 실행(redo)"
  ],
  "ans": 0,
  "exp": "교안은 실행 취소(undo), 다시 실행(redo), 작업 이력 작성(history), 현재 상태 저장(snapshot)을 들어요. 인스턴스 공유는 Flyweight 이야기예요."
 },
 {
  "n": 120,
  "ch": 6,
  "lv": 1,
  "t": "mc",
  "q": "교안 예제 ‘과일 모으기 주사위 게임’의 규칙으로 옳지 <b>않은</b> 것은?",
  "choices": [
   "나쁜 수가 나오면 돈이 줄어든다",
   "좋은 수가 나오면 주인공의 돈이 늘어난다",
   "돈이 없어져도 과일이 남아 있으면 게임을 계속한다",
   "특히 좋은 수가 나오면 주인공은 과일을 받는다"
  ],
  "ans": 2,
  "exp": "게임은 자동으로 진행되고, 주사위 수가 다음 상태를 결정해요. 좋은 수 → 돈 증가, 나쁜 수 → 돈 감소, 특히 좋은 수 → 과일, 그리고 <b>돈이 없어지면 종료</b>해요."
 },
 {
  "n": 121,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "Gamer의 bet에서 주사위 눈에 따른 변화로 옳은 것은?",
  "choices": [
   "6의 눈 → 소지금 +100 · 1의 눈 → 과일을 받음 · 2의 눈 → 소지금 0 · 그 밖 → 변동 없음",
   "모든 눈에서 소지금이 눈의 수 × 100만큼 늘어난다",
   "1의 눈 → 소지금 절반 · 2의 눈 → 소지금 +100 · 6의 눈 → 과일을 잃음 · 그 밖 → 과일을 받음",
   "1의 눈 → 소지금 +100 · 2의 눈 → 소지금 절반 · 6의 눈 → 과일을 받음 · 그 밖 → 변동 없음"
  ],
  "ans": 3,
  "exp": "<code>int dice = random.nextInt(6) + 1;</code>로 1~6을 만들어요. 1이면 <code>money += 100</code>, 2면 <code>money /= 2</code>, 6이면 <code>getFruit()</code>으로 과일을 받아요. 나머지는 ‘변동 사항이 없습니다.’예요."
 },
 {
  "n": 122,
  "ch": 6,
  "lv": 1,
  "t": "mc",
  "q": "교안 예제의 클래스 배치로 옳은 것은?",
  "choices": [
   "세 클래스 모두 game 패키지에 있다",
   "Main이 game 패키지에 있고, Memento와 Gamer는 이름 없는 패키지에 있다",
   "Memento와 Gamer는 game 패키지, Main은 이름 없는 패키지에 있다",
   "Memento만 game 패키지에 있고, Gamer와 Main은 이름 없는 패키지에 있다"
  ],
  "ans": 2,
  "exp": "Memento 클래스와 Gamer 클래스는 공통 패키지 <code>game</code>에 넣었어요. Main은 이름 없는 패키지에 있어서 game 패키지 밖이에요. 이 배치가 접근 제어의 핵심이에요."
 },
 {
  "n": 123,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "Memento 클래스의 필드와 메서드 중 <code>public</code>이 붙은 것은?",
  "choices": [
   "getMoney 하나뿐이다",
   "생성자 Memento와 getMoney",
   "addFruit와 getFruits",
   "money, fruits 필드와 모든 메서드"
  ],
  "ans": 0,
  "exp": "money, fruits는 private, 생성자 Memento·addFruit·getFruits는 접근 제한자가 없는 default, <b>getMoney만 public</b>이에요. 그래서 game 패키지 밖의 Main은 getMoney만 쓸 수 있어요(표 18-3)."
 },
 {
  "n": 124,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "game 패키지 밖에 있는 Main에서 다음 코드를 쓰면 어떻게 되나요?",
  "choices": [
   "컴파일 에러가 난다",
   "소지금이 100인 Memento가 정상적으로 만들어진다",
   "실행 중에 IllegalAccessException이 발생한다",
   "Gamer 인스턴스의 소지금이 100원으로 바뀐다"
  ],
  "ans": 0,
  "exp": "Memento의 생성자에는 public이 없어서 같은 패키지(game) 안에서만 쓸 수 있어요. Main에서 쓰면 ‘Memento(int) is not public in Memento; cannot be accessed from outside package’ 에러가 나요(Java 21로 컴파일해 확인). Main은 Memento가 필요하면 Gamer의 createMemento에 부탁해야 해요.",
  "code": "import game.Memento;\n\npublic class Main {\n    public static void main(String[] args) {\n        Memento m = new Memento(100);\n    }\n}"
 },
 {
  "n": 125,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "자바의 네 가지 접근 제한자(표 18-2)를 바르게 설명한 것은?",
  "choices": [
   "public: 모든 클래스 · protected: 그 패키지 및 하위 클래스 · default(없음): 그 패키지에서만 · private: 그 클래스에서만",
   "public: 모든 클래스 · protected: 그 클래스에서만 · default(없음): 모든 클래스 · private: 그 패키지에서만",
   "public: 하위 클래스에서만 · protected: 그 패키지에서만 · default(없음): 그 클래스에서만 · private: 모든 클래스",
   "public: 그 패키지에서만 · protected: 모든 클래스 · default(없음): 그 클래스에서만 · private: 하위 클래스에서만"
  ],
  "ans": 0,
  "exp": "public은 어디서나, protected는 같은 패키지와 하위 클래스, 아무것도 안 붙인 default는 <b>같은 패키지에서만</b>, private은 그 클래스 안에서만 접근할 수 있어요."
 },
 {
  "n": 126,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "Memento의 <code>getFruits()</code>가 <code>return new ArrayList&lt;&gt;(fruits);</code>처럼 새 리스트를 만들어 반환하는 이유로 가장 알맞은 것은?",
  "choices": [
   "ArrayList는 return문 뒤에 변수 이름을 직접 쓸 수 없어서",
   "받은 쪽이 리스트를 바꿔도 저장된 목록이 그대로이게 하려고",
   "fruits 필드가 private이라 그대로는 반환할 수 없기 때문에",
   "새 리스트를 만들어야 과일이 가나다순으로 정렬되기 때문에"
  ],
  "ans": 1,
  "exp": "fruits 자체를 돌려주면 받은 쪽(Gamer)이 그 리스트에 과일을 추가할 때 Memento 안의 기록까지 바뀌어요. 복사본을 돌려주면 저장해 둔 스냅샷이 보호돼서 몇 번이고 같은 상태로 복원할 수 있어요. (③ private 필드도 같은 클래스의 메서드에서는 그대로 반환할 수 있어요.)"
 },
 {
  "n": 127,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "Gamer의 createMemento에서 과일에 대해 하는 일은?",
  "choices": [
   "과일은 하나도 저장하지 않고 소지금만 저장한다",
   "‘맛있는 ’으로 시작하는 과일만 Memento에 저장한다",
   "과일을 저장한 뒤 Gamer의 과일 목록을 비운다",
   "가진 과일을 모두 저장한다"
  ],
  "ans": 1,
  "exp": "<code>if (f.startsWith(\"맛있는 \")) { m.addFruit(f); }</code>처럼 ‘맛있는’ 것만 저장해요. 그래서 복원하면 맛있지 않은 과일은 사라져요.",
  "code": "public Memento createMemento() {\n    Memento m = new Memento(money);\n    for (String f: fruits) {\n        if (f.startsWith(\"맛있는 \")) {\n            m.addFruit(f);\n        }\n    }\n    return m;\n}"
 },
 {
  "n": 128,
  "ch": 6,
  "lv": 3,
  "t": "mc",
  "q": "다음 프로그램의 출력으로 알맞은 것은? (줄바꿈은 / 로 표시. 테스트를 위해 bet에 주사위 눈과 받을 과일을 직접 넣도록 바꾼 Gamer예요.)",
  "choices": [
   "[money = 200, fruits = [맛있는 사과, 바나나, 맛있는 포도]] / [money = 100, fruits = [맛있는 사과]] / [money = 100, fruits = [맛있는 사과, 맛있는 오렌지]]",
   "[money = 200, fruits = [맛있는 사과, 바나나, 맛있는 포도]] / [money = 100, fruits = [맛있는 사과, 바나나]] / [money = 100, fruits = [맛있는 사과, 바나나]]",
   "[money = 200, fruits = [맛있는 사과, 맛있는 포도]] / [money = 200, fruits = [맛있는 사과]] / [money = 100, fruits = [맛있는 사과]]",
   "[money = 200, fruits = [맛있는 사과, 바나나, 맛있는 포도]] / [money = 100, fruits = [맛있는 사과]] / [money = 100, fruits = [맛있는 사과]]"
  ],
  "ans": 3,
  "exp": "스냅샷을 찍을 때 ‘맛있는’ 과일만 저장되므로 바나나는 빠져요. 복원하면 돈 100, [맛있는 사과]. getFruits가 <b>복사본</b>을 돌려주므로, 복원 뒤 오렌지를 받아도 Memento 속 목록은 그대로라 다시 복원하면 또 [맛있는 사과]예요(Java 21로 실행해 확인).",
  "code": "Gamer gamer = new Gamer(100);\ngamer.bet(6, \"맛있는 사과\");      // 6의 눈: 과일을 받는다\ngamer.bet(6, \"바나나\");\nMemento m = gamer.createMemento();\ngamer.bet(1, null);               // 1의 눈: 소지금 +100\ngamer.bet(6, \"맛있는 포도\");\nSystem.out.println(gamer);\ngamer.restoreMemento(m);\nSystem.out.println(gamer);\ngamer.bet(6, \"맛있는 오렌지\");\ngamer.restoreMemento(m);\nSystem.out.println(gamer);"
 },
 {
  "n": 129,
  "ch": 6,
  "lv": 3,
  "t": "mc",
  "q": "교안 Main의 Memento 취급 규칙을 따르는 다음 코드의 출력은? (줄바꿈은 / 로 표시. 주사위 눈 1은 +100, 2는 절반이에요.)",
  "choices": [
   "200 저장 / 300 저장 / 150 / 75 복원 / 175 / 최종 175",
   "200 저장 / 300 저장 / 150 / 75 복원 / 400 저장 / 최종 400",
   "200 / 300 / 150 / 75 / 175 / 최종 175",
   "200 저장 / 300 저장 / 150 복원 / 400 저장 / 500 저장 / 최종 500"
  ],
  "ans": 1,
  "exp": "많이 늘면(현재 &gt; 저장된 돈) 저장, 저장된 돈의 절반 <b>미만</b>으로 줄면 복원해요. 100→200(저장)→300(저장)→150(150 &lt; 150이 아니라 그대로)→75(복원해서 300)→400(저장)이에요(Java 21로 실행해 확인).",
  "code": "Gamer gamer = new Gamer(100);\nMemento memento = gamer.createMemento();\nint[] dice = {1, 1, 2, 2, 1};\nfor (int d : dice) {\n    gamer.bet(d, null);\n    if (gamer.getMoney() > memento.getMoney()) {\n        System.out.println(gamer.getMoney() + \" 저장\");\n        memento = gamer.createMemento();\n    } else if (gamer.getMoney() < memento.getMoney() / 2) {\n        System.out.println(gamer.getMoney() + \" 복원\");\n        gamer.restoreMemento(memento);\n    } else {\n        System.out.println(gamer.getMoney());\n    }\n}\nSystem.out.println(\"최종 \" + gamer.getMoney());"
 },
 {
  "n": 130,
  "ch": 6,
  "lv": 1,
  "t": "mc",
  "q": "Memento 패턴의 역할과 교안 예제 클래스를 바르게 짝지은 것은?",
  "choices": [
   "Originator = Memento · Memento = Main · Caretaker = Gamer",
   "Originator = Gamer · Memento = Main · Caretaker = Memento",
   "Originator = Main · Memento = Gamer · Caretaker = Memento",
   "Originator = Gamer · Memento = Memento · Caretaker = Main"
  ],
  "ans": 3,
  "exp": "<b>Originator(작성자)</b>는 Memento를 만들고 Memento로 상태를 되돌려요(Gamer). <b>Memento(기념품)</b>는 Originator의 내부 정보를 정리해요(Memento). <b>Caretaker(관리인)</b>는 언제 저장·복원할지 정하고 Memento를 보관해요(Main)."
 },
 {
  "n": 131,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "Memento 역이 가진 두 종류의 인터페이스(API)에 대한 설명으로 옳은 것은?",
  "choices": [
   "narrow interface만 있으면 Caretaker가 Memento의 내부 상태를 모두 바꿀 수 있다",
   "wide interface와 narrow interface는 이름만 다를 뿐, 공개되는 범위는 똑같다",
   "wide는 복원에 필요한 정보를 모두 얻는 API로 Originator만 쓰고, narrow는 Caretaker에 보여 준다",
   "wide는 Caretaker만 쓰는 API이고, narrow는 Originator만 쓰는 API라서 서로 바꿔 쓸 수 없다"
  ],
  "ans": 2,
  "exp": "넓은 인터페이스(wide)는 내부 상태를 드러내므로 Originator만 써요. 좁은 인터페이스(narrow)는 할 수 있는 일에 한계가 있어 내부 상태가 외부에 공개되는 걸 막아요. 이 둘을 구별해 <b>캡슐화의 파괴를 막아요</b>."
 },
 {
  "n": 132,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "교안 예제의 Memento 메서드를 wide와 narrow로 바르게 나눈 것은?",
  "choices": [
   "narrow: getMoney · wide: 생성자 Memento, addFruit, getFruits",
   "narrow: 생성자 Memento · wide: getMoney, addFruit, getFruits",
   "narrow: addFruit · wide: getMoney, getFruits, 생성자 Memento",
   "narrow: getMoney, getFruits · wide: 생성자 Memento, addFruit"
  ],
  "ans": 0,
  "exp": "리스트 18-1의 주석 그대로예요. 소지금을 얻는 getMoney만 narrow interface(public), 생성자·addFruit·getFruits는 wide interface(default)예요."
 },
 {
  "n": 133,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "public이 붙은 getMoney를 ‘좁은’ 인터페이스라고 부르는 까닭은?",
  "choices": [
   "getMoney가 같은 game 패키지 안에서만 보이는 메서드이기 때문에",
   "getMoney는 다른 메서드보다 이름과 몸통 코드가 짧기 때문에",
   "할 수 있는 일이 소지금을 얻는 것뿐이라 조작 범위가 적기 때문에",
   "getMoney의 반환형이 int라서 담을 수 있는 값의 범위가 작기 때문에"
  ],
  "ans": 2,
  "exp": "public이 붙어 있는데 ‘좁다’고 하니 이상하게 들리지만, 여기서 ‘좁다’는 <b>할 수 있는 일이 적다</b>는 뜻이에요. Memento에서 public인 것은 getMoney 하나뿐이고, 할 수 있는 일은 소지금을 얻는 것뿐이에요."
 },
 {
  "n": 134,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "Caretaker 역(Main)이 Memento에 대해 할 수 있는 일로 옳은 것은?",
  "choices": [
   "addFruit로 과일을 추가해 Gamer의 상태를 미리 바꿔 둘 수 있다",
   "getMoney로 소지금을 얻고, Memento 인스턴스를 변수 등에 저장해 두는 것뿐이다",
   "getFruits로 과일 목록을 얻어 마음대로 고칠 수 있다",
   "new Memento(100)으로 원하는 상태의 Memento를 직접 만들 수 있다"
  ],
  "ans": 1,
  "exp": "Main은 game 패키지 밖이라 public인 getMoney밖에 못 써요. 만들어 준 Memento를 <b>한 덩어리의 블랙박스로 통째로 보관</b>해 두기만 해요. Memento는 Caretaker에 대해 정보를 은폐하고 있어요."
 },
 {
  "n": 135,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "Memento 패턴의 클래스 다이어그램(그림 18-4)에 대한 설명으로 옳은 것은?",
  "choices": [
   "Caretaker가 Memento를 Creates하고, Originator는 Memento를 보관만 한다",
   "Originator–Memento는 같은 package에서 넓게, Caretaker–Memento는 좁게 연결된다",
   "Caretaker–Memento가 같은 package에 있고, 넓은 인터페이스로 연결된다",
   "Memento는 Caretaker와만 연결되고, Originator와는 아무 관계도 없다"
  ],
  "ans": 1,
  "exp": "Caretaker → Originator로 Requests, Originator → Memento로 Creates예요. Originator와 Memento는 매우 친밀한 관계(같은 package, wide), Caretaker는 Memento를 보관만 해요(narrow)."
 },
 {
  "n": 136,
  "ch": 6,
  "lv": 3,
  "t": "mc",
  "q": "교안 ‘Caretaker 역할과 Originator 역할을 나누는 이유’로 가장 알맞은 것은?",
  "choices": [
   "여러 단계 undo나 파일 저장으로 바꿔도 Originator는 고치지 않아도 된다",
   "두 역할을 한 클래스에 합치면 언어 규칙상 컴파일 에러가 나기 때문이다",
   "Originator 혼자서는 자기 상태를 담은 Memento를 만들 수 없기 때문이다",
   "Caretaker가 Memento의 내부 정보를 직접 읽고 고쳐야 하기 때문이다"
  ],
  "ans": 0,
  "exp": "Caretaker는 <b>언제</b> 스냅샷을 찍을지·undo할지 정하고 Memento를 저장해요. Originator는 Memento를 <b>만들고</b> 주어진 Memento로 자신을 되돌려요. 이렇게 나누면 ‘여러 단계 실행 취소’나 ‘현재 상태를 파일에 저장’처럼 바꿀 때 Originator는 그대로 둘 수 있어요."
 },
 {
  "n": 137,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "교안 ‘Memento를 몇 개 가질까?’와 ‘Memento의 유효기한은?’에 대한 설명으로 옳은 것은?",
  "choices": [
   "Memento는 언어 규칙상 한 프로그램에 하나만 가질 수 있고 배열에 넣을 수 없다",
   "파일로 저장한 Memento는 프로그램 버전이 바뀌어도 언제나 그대로 쓸 수 있다",
   "메모리에만 보관하는 Memento는 일정 시간이 지나면 JVM이 자동으로 지운다",
   "여러 개 가지면 여러 시점을 저장할 수 있고, 파일 저장은 버전 업 뒤 안 맞을 수 있다"
  ],
  "ans": 3,
  "exp": "예제의 Main은 Memento를 하나만 가졌지만, 여러 개 가지면 여러 시점으로 돌아갈 수 있어요. 메모리에서만 보관하면 큰 문제가 없지만, 파일로 영속 저장하면 버전 업 후 예전 Memento와 맞지 않을 우려가 있어요(유효기한)."
 },
 {
  "n": 138,
  "ch": 6,
  "lv": 2,
  "t": "mc",
  "q": "Memento의 관련 패턴 설명으로 옳은 것은?",
  "choices": [
   "Command 패턴으로 명령을 처리할 때는 Memento 패턴을 함께 쓸 수 없다",
   "Memento는 인스턴스의 내용을 모두 복사하고, Prototype은 필요한 정보만 저장한다",
   "Memento에서는 클래스가 ‘상태’를 나타내고, State에서는 인스턴스가 나타낸다",
   "Memento는 복원에 필요한 정보만, Prototype은 인스턴스의 내용을 모두 복사한다"
  ],
  "ans": 3,
  "exp": "Prototype과의 차이가 핵심이에요. 또 Memento에서는 <b>인스턴스</b>가 ‘상태’를 나타내고, State 패턴에서는 <b>클래스</b>가 ‘상태’를 나타내요. Command 패턴으로 명령을 처리할 때 Memento로 undo·redo를 할 수 있어요."
 },
 {
  "n": 139,
  "ch": 6,
  "lv": 3,
  "t": "mc",
  "q": "<code>java.io.Serializable</code> 직렬화로 Memento를 파일에 저장하는 것에 대한 교안의 주의로 옳은 것은?",
  "choices": [
   "직렬화를 쓰면 프로그램 버전이 바뀌어도 유효기한 문제가 없다",
   "신뢰할 수 없는 데이터를 복원하면 보안상 큰 문제가 될 수 있다",
   "직렬화한 파일은 사람이 읽을 수 없으므로 보안 문제가 전혀 없다",
   "직렬화는 Memento를 파일에 저장하는 유일한 방법이라 꼭 써야 한다"
  ],
  "ans": 1,
  "exp": "Java의 인스턴스를 파일에 보존하는 방법으로 직렬화가 자주 쓰이지만, 신뢰할 수 없는 데이터를 복원할 때 보안상 큰 문제가 될 수 있어요. 『Effective Java』에는 ‘새로운 시스템에서 Java 직렬화를 사용할 이유는 없다’라고까지 적혀 있어요."
 },
 {
  "n": 140,
  "ch": 6,
  "lv": 2,
  "t": "self",
  "q": "[교안 문제 18-1] Caretaker 역은 좁은 인터페이스(API)를 통해서만 Memento 역을 조작할 수 있어요. Caretaker 역이 Memento 역을 자유롭게 조작할 수 있다면 어떤 단점이 있을까요?",
  "answer": "- Caretaker가 Memento의 내부 정보(소지금, 과일 등)를 마음대로 바꿀 수 있게 되어,\n  Originator가 만든 '그 시점의 상태'가 망가질 수 있다. 엉뚱한 상태로 복원될 위험이 생긴다.\n- Caretaker의 코드가 Memento(=Originator)의 내부 구조에 의존하게 된다(캡슐화의 파괴).\n  그러면 Originator나 Memento의 내부 구조(필드 등)를 바꿀 때 Caretaker까지 고쳐야 한다.\n- 결국 Caretaker와 Originator의 역할 분담이 무너져, 각자 독립적으로 수정·재사용하기 어려워진다.",
  "kw": [
   "캡슐화",
   "내부",
   "의존",
   "수정",
   "역할 분담"
  ],
  "exp": "핵심은 ‘캡슐화의 파괴’예요. 내부를 아는 코드가 흩어지면 Originator를 바꿀 때 Caretaker도 바꿔야 해요. 좁은 인터페이스는 이걸 막기 위한 장치예요."
 },
 {
  "n": 141,
  "ch": 6,
  "lv": 3,
  "t": "self",
  "q": "[교안 문제 18-2] 예제에서는 소지금과 과일만이 상태를 결정하는 정보였어요. 그러나 저장해야 할 정보가 많으면 Memento 인스턴스를 저장하려고 큰 메모리 공간과 디스크 공간이 필요해요. 이 문제를 해결할 방법을 생각해 보세요.",
  "answer": "[아이디어] 전체 상태를 매번 통째로 저장하지 않고, '직전 상태와 달라진 부분(차분, 증분)'만 Memento에 저장한다.\n- 예) 처음 한 번만 전체 상태를 저장하고, 이후에는 바뀐 필드·추가된 과일만 기록한다.\n- 복원할 때는 기준 상태에 차분을 차례로 적용(또는 거꾸로 되돌림)한다.\n- 실행 취소처럼 '바로 전으로 되돌리기'가 목적이라면, 바꾸기 전 값만 기록해도 된다.\n\n[그 밖의 방법]\n- 꼭 필요한 정보만 저장하고 다시 계산할 수 있는 값은 저장하지 않는다.\n- 오래된 Memento는 버리거나 개수에 상한을 둔다.\n- 압축해서 저장한다.",
  "kw": [
   "차분",
   "증분",
   "달라진 부분",
   "필요한 정보만"
  ],
  "exp": "GoF 책에서도 소개하는 방법이에요. 상태가 크면 <b>변화한 부분(증분)만</b> 저장하는 Memento를 생각할 수 있어요. 대신 복원 순서가 중요해지고 복원 처리가 조금 복잡해져요."
 },
 {
  "n": 142,
  "ch": 6,
  "lv": 3,
  "t": "self",
  "q": "[교안 문제 18-3] Memento 클래스에 <code>int number;</code> 필드를 추가해요. 다음 제어를 하려면 어떻게 구현하면 될까요?<br>· Memento 클래스는 number의 값을 얻거나 변경할 수 있다<br>· Gamer 클래스는 number의 값을 얻을 수 있지만 변경할 수는 없다<br>· Main 클래스는 number의 값을 얻을 수도 변경할 수도 없다",
  "answer": "package game;\n\npublic class Memento {\n    private int number;          // ① private → Memento 클래스만 직접 읽고 쓸 수 있다\n\n    // ② 접근 제한자 없음(default) → 같은 game 패키지의 Gamer만 얻을 수 있다\n    int getNumber() {\n        return number;\n    }\n\n    // 값을 바꾸는 setter는 만들지 않는다(만들더라도 private으로)\n    // → Gamer는 변경할 수 없고, Main(game 패키지 밖)은 getNumber도 보이지 않는다\n}",
  "kw": [
   "private int number",
   "default",
   "getNumber",
   "setter",
   "game 패키지"
  ],
  "exp": "필드는 <b>private</b>(Memento만 읽고 씀), 읽기 메서드는 <b>default</b>(같은 패키지의 Gamer만 읽음), 쓰기 메서드는 두지 않거나 private으로 해요. Main은 game 패키지 밖이라 default 메서드가 보이지 않아요. 접근 제한자로 ‘누구에게 보여 줄지’를 표현하는 연습이에요."
 },
 {
  "n": 143,
  "ch": 6,
  "lv": 3,
  "t": "self",
  "q": "[교안 문제 18-4] Memento를 파일에 저장해 봅시다. Memento의 클래스 메서드로 다음 두 가지를 구현하세요. 직렬화(Serializable)는 쓰지 말고, Memento가 가진 정보를 줄 바꿈으로 구분한 문자열로 저장해요.<br>· <code>boolean saveToFile(String filename, Memento memento)</code>: 성공하면 true, 실패하면 false<br>· <code>Memento loadFromFile(String filename)</code>: 읽기에 실패하면 null",
  "answer": "package game;\n\nimport java.io.IOException;\nimport java.nio.file.Files;\nimport java.nio.file.Path;\nimport java.util.ArrayList;\nimport java.util.List;\n\npublic class Memento {\n    // ... 기존 필드·메서드 ...\n\n    // 1행: 소지금, 2행부터: 과일 하나씩\n    public static boolean saveToFile(String filename, Memento memento) {\n        List<String> lines = new ArrayList<>();\n        lines.add(String.valueOf(memento.money));\n        lines.addAll(memento.fruits);\n        try {\n            Files.write(Path.of(filename), lines);\n            return true;\n        } catch (IOException e) {\n            return false;\n        }\n    }\n\n    public static Memento loadFromFile(String filename) {\n        try {\n            List<String> lines = Files.readAllLines(Path.of(filename));\n            Memento memento = new Memento(Integer.parseInt(lines.get(0)));\n            for (int i = 1; i < lines.size(); i++) {\n                memento.addFruit(lines.get(i));\n            }\n            return memento;\n        } catch (IOException | NumberFormatException | IndexOutOfBoundsException e) {\n            return null;\n        }\n    }\n}\n\n// Main: 시작할 때 game.dat이 있으면 불러오고, 없으면 100원부터\nMemento memento = Memento.loadFromFile(\"game.dat\");\nGamer gamer = new Gamer(100);\nif (memento != null) gamer.restoreMemento(memento);\nelse memento = gamer.createMemento();\n// ... 소지금이 '상당히' 늘었을 때\nmemento = gamer.createMemento();\nMemento.saveToFile(\"game.dat\", memento);",
  "kw": [
   "static",
   "saveToFile",
   "loadFromFile",
   "Files",
   "null",
   "줄 바꿈"
  ],
  "exp": "Memento의 static 메서드라서 private 필드(money, fruits)와 default 생성자를 직접 쓸 수 있어요. Main은 파일 이름만 넘기므로 내부 형식을 몰라도 돼요. 읽기에 실패하면 null을 돌려주고 Main은 100원부터 시작해요. Gamer에 restoreMemento가 public이라 Main에서 바로 복원할 수 있어요."
 },
 {
  "n": 144,
  "ch": 6,
  "lv": 1,
  "t": "mc",
  "q": "Main(Caretaker)에서 Memento 인스턴스가 필요할 때 하는 방법으로 옳은 것은?",
  "choices": [
   "Gamer의 createMemento를 호출해 만들어 달라고 부탁한다",
   "Gamer의 restoreMemento를 호출하면 새 Memento가 반환된다",
   "Memento의 addFruit로 빈 Memento에 과일을 직접 채운다",
   "new Memento(gamer.getMoney())로 Main에서 직접 만든다"
  ],
  "ans": 0,
  "exp": "Main에는 Memento의 생성자가 보이지 않아요. 그래서 <code>gamer.createMemento()</code>로 Originator에게 부탁하는 수밖에 없어요. restoreMemento는 반대로 Memento로 상태를 되돌리는 메서드예요."
 },
 {
  "n": 145,
  "ch": 8,
  "lv": 2,
  "t": "mc",
  "q": "다음 상황에 가장 알맞은 패턴은?<br>“그림판에서 사용자가 실수하면 Ctrl+Z로 몇 단계든 이전 상태로 되돌리고 싶다. 단, 그림 객체의 내부 필드를 바깥에 공개하고 싶지는 않다.”",
  "choices": [
   "Observer",
   "Singleton",
   "Prototype",
   "Memento"
  ],
  "ans": 3,
  "exp": "실행 취소(undo)를 위해 상태를 저장·복원하되 캡슐화를 지키는 게 Memento예요. Caretaker가 Memento를 여러 개(스택 등) 가지면 여러 단계 undo가 돼요. Prototype도 복사는 하지만 ‘내용을 모두 복사한 별도 인스턴스’를 만드는 것이 목적이에요."
 },
 {
  "n": 146,
  "ch": 8,
  "lv": 2,
  "t": "mc",
  "q": "다음 상황에 가장 알맞은 패턴은?<br>“주가 데이터가 바뀔 때마다 표, 꺾은선 그래프, 알림 창이 모두 함께 갱신되어야 한다. 앞으로 표시 방법은 더 늘어날 수 있다.”",
  "choices": [
   "Observer",
   "Prototype",
   "Memento",
   "Flyweight"
  ],
  "ans": 0,
  "exp": "하나의 Subject(주가 데이터)에 여러 Observer(표, 그래프, 알림)가 등록되어 상태 변화를 통지받는 구조예요. 새 표시 방법은 Observer를 구현해 addObserver만 하면 되므로 Subject는 고칠 필요가 없어요. MVC의 Model–View 관계와 같아요."
 },
 {
  "n": 147,
  "ch": 8,
  "lv": 3,
  "t": "mc",
  "q": "‘상태’를 다루는 방식에 대한 비교로 <b>틀린</b> 것은?",
  "choices": [
   "Prototype은 현재 인스턴스와 같은 상태의 별도 인스턴스를 만든다",
   "Observer는 Subject를 능동적으로 계속 살펴보며 변화를 찾아낸다",
   "Memento는 어느 시점의 상태를 기록했다가 나중에 그 상태로 되돌린다",
   "Flyweight는 장소·상황에 의존하지 않는 intrinsic한 상태만 공유한다"
  ],
  "ans": 1,
  "exp": "Observer는 이름과 달리 능동적으로 ‘관찰’하지 않고, Subject가 알려 주기를 <b>수동적으로 기다려요</b>. 그래서 Publish-Subscribe 패턴이라고도 불러요."
 },
 {
  "n": 148,
  "ch": 8,
  "lv": 2,
  "t": "mc",
  "q": "교안 다섯 패턴의 등장인물을 바르게 짝지은 것은?",
  "choices": [
   "Observer: Singleton 하나뿐 / Memento: Subject·ConcreteSubject",
   "Observer: Originator·Memento·Caretaker / Memento: Subject·Observer",
   "Memento: Prototype·ConcretePrototype·Client / Observer: Flyweight·FlyweightFactory·Client",
   "Observer: Subject·ConcreteSubject·Observer·ConcreteObserver / Memento: Originator·Memento·Caretaker"
  ],
  "ans": 3,
  "exp": "Singleton(Singleton), Prototype(Prototype·ConcretePrototype·Client), Observer(Subject·ConcreteSubject·Observer·ConcreteObserver), Memento(Originator·Memento·Caretaker), Flyweight(Flyweight·FlyweightFactory·Client)예요."
 },
 {
  "n": 149,
  "ch": 1,
  "lv": 1,
  "t": "mc",
  "q": "Factory Method 패턴을 가장 잘 설명한 것은?",
  "choices": [
   "생성자를 private으로 막아 인스턴스를 하나만 만든 것",
   "인스턴스 생성 공장을 Template Method로 구성한 것",
   "만든 인스턴스를 pool에 두고 같은 것을 공유하는 것",
   "원형 인스턴스를 복사해서 새 인스턴스를 만드는 것"
  ],
  "ans": 1,
  "exp": "factory는 ‘공장’이라는 뜻이에요. <b>인스턴스를 생성하는 공장을 Template Method 패턴으로 구성한 것</b>이 Factory Method 패턴이에요. Template Method(Part 3)를 인스턴스 생성 장면에 적용한 거예요."
 },
 {
  "n": 150,
  "ch": 1,
  "lv": 1,
  "t": "mc",
  "q": "Factory Method 패턴에서 상위 클래스와 하위 클래스가 맡는 일로 옳은 것은?",
  "choices": [
   "상위와 하위가 각자 독립적으로 인스턴스를 만들고 결과를 합친다",
   "상위가 구체적인 클래스 이름까지 정하고, 하위는 그대로 물려받기만 한다",
   "상위는 생성 방법(뼈대)만 정하고, 구체적인 클래스 이름은 하위가 정한다",
   "하위가 생성 순서를 정하고, 상위는 만들어진 인스턴스를 보관만 한다"
  ],
  "ans": 2,
  "exp": "인스턴스 생성 방법은 상위 클래스에서 결정하되, <b>구체적인 클래스 이름까지는 결정하지 않아요</b>. 구체적인 살은 모두 하위 클래스에서 붙여요. 그래서 인스턴스 생성을 위한 뼈대(프레임워크)와 실제 인스턴스를 만드는 클래스를 나누어 생각할 수 있어요."
 },
 {
  "n": 151,
  "ch": 1,
  "lv": 1,
  "t": "mc",
  "q": "교안 예제의 패키지와 클래스를 바르게 짝지은 것은?",
  "choices": [
   "framework: Product, IDCard · idcard: Factory, IDCardFactory · 이름 없음: Main",
   "framework: Product, Factory · idcard: IDCard, IDCardFactory · 이름 없음: Main",
   "framework: IDCard, IDCardFactory · idcard: Product, Factory · 이름 없음: Main",
   "framework: Factory, Main · idcard: Product, IDCard, IDCardFactory"
  ],
  "ans": 1,
  "exp": "<b>인스턴스를 생성하는 프레임워크 쪽</b>(framework 패키지)은 Product, Factory이고, <b>구체적인 내용을 구현하는 쪽</b>(idcard 패키지)은 IDCard, IDCardFactory예요. Main은 동작 테스트용이에요. 📝 교안에도 이렇게 적혀 있어요."
 },
 {
  "n": 152,
  "ch": 1,
  "lv": 1,
  "t": "mc",
  "q": "framework 패키지의 <code>Product</code> 클래스에 대한 설명으로 옳은 것은?",
  "choices": [
   "IDCard의 owner 필드와 getOwner를 미리 갖춘 구체 클래스다",
   "추상 메서드 use만 선언된 추상 클래스로, ‘use할 수 있는 것’을 제품으로 규정한다",
   "인스턴스를 하나만 만들 수 있도록 private 생성자를 가진 클래스다",
   "create, createProduct, registerProduct를 모두 구현한 클래스다"
  ],
  "ans": 1,
  "exp": "<code>public abstract class Product { public abstract void use(); }</code>예요. 구체적인 use의 구현은 모두 하위 클래스에 맡기고, 이 프레임워크에서는 ‘무엇이든 use할 수 있는(사용할 수 있는) 것’을 제품으로 규정해요."
 },
 {
  "n": 153,
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "다음 Factory 클래스에서 <b>템플릿 메서드</b> 역할을 하는 것은?",
  "choices": [
   "createProduct",
   "registerProduct",
   "use",
   "create"
  ],
  "ans": 3,
  "exp": "<code>create</code>가 ‘createProduct로 제품을 만들고 registerProduct로 등록한다’는 <b>절차(뼈대)</b>를 정해 둔 템플릿 메서드예요. createProduct와 registerProduct는 하위 클래스가 구현하는 추상 메서드예요. 교안 관련 패턴: 예제의 create 메서드가 템플릿 메서드로 되어 있어요.",
  "code": "public abstract class Factory {\n    public final Product create(String owner) {\n        Product p = createProduct(owner);\n        registerProduct(p);\n        return p;\n    }\n    protected abstract Product createProduct(String owner);\n    protected abstract void registerProduct(Product product);\n}"
 },
 {
  "n": 154,
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "Factory의 <code>create</code>에 <code>final</code>이 붙어 있어요. IDCardFactory에서 create를 오버라이드하면 어떻게 되나요?",
  "choices": [
   "IDCardFactory의 create가 대신 호출된다",
   "실행할 때 예외가 발생한다",
   "상위와 하위의 create가 차례로 둘 다 호출된다",
   "컴파일 에러가 난다"
  ],
  "ans": 3,
  "exp": "final 메서드는 하위 클래스에서 오버라이드할 수 없어요(‘create(String) in … cannot override create(String) in Factory’, Java 21로 컴파일해 확인). 덕분에 ‘만들고 → 등록한다’는 <b>생성 절차가 하위 클래스 때문에 바뀌지 않도록</b> 보장돼요."
 },
 {
  "n": 155,
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "Factory의 createProduct와 registerProduct가 <code>protected</code>인 이유로 가장 알맞은 것은?",
  "choices": [
   "protected여야 abstract로 선언할 수 있기 때문에",
   "같은 패키지에서만 하위 클래스를 만들게 하려고",
   "protected 메서드는 자동으로 final이 되기 때문에",
   "하위에서 구현하되, 바깥은 create만 쓰게 하려고"
  ],
  "ans": 3,
  "exp": "protected는 하위 클래스(다른 패키지의 IDCardFactory 포함)에서 구현·호출할 수 있지만, 상속 관계가 없는 다른 패키지의 Main에서는 부를 수 없어요(‘createProduct(String) has protected access in Factory’, Java 21로 확인). 그래서 바깥은 정해진 절차인 <code>create</code>만 쓰게 돼요."
 },
 {
  "n": 156,
  "ch": 1,
  "lv": 1,
  "t": "mc",
  "q": "IDCard 클래스의 <code>use</code>를 호출하면 출력되는 것은? (owner는 \"Kane\")",
  "choices": [
   "[IDCard:Kane]을 등록했습니다.",
   "[IDCard:Kane]을 사용합니다.",
   "Kane의 카드를 만듭니다.",
   "Kane을 사용합니다."
  ],
  "ans": 1,
  "exp": "use는 <code>System.out.println(this + \"을 사용합니다.\");</code>예요. <code>this</code>를 문자열과 더하면 toString()이 불려서 <code>[IDCard:Kane]</code>이 돼요. ②는 생성자, ③은 IDCardFactory의 registerProduct가 출력하는 문장이에요."
 },
 {
  "n": 157,
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "IDCardFactory의 두 메서드가 하는 일을 바르게 짝지은 것은?",
  "choices": [
   "createProduct: 만든 제품을 등록한다 · registerProduct: IDCard를 new로 만든다",
   "createProduct: IDCard를 new로 만든다 · registerProduct: 만든 제품을 등록한다",
   "createProduct: 제품을 사용(use)한다 · registerProduct: 제품의 소유자를 바꾼다",
   "createProduct: 공장 인스턴스를 만든다 · registerProduct: 공장을 등록해 둔다"
  ],
  "ans": 1,
  "exp": "createProduct는 IDCard 인스턴스를 생성해 실제로 ‘제품을 만들고’, registerProduct는 만들어진 제품을 등록해요. 원래라면 데이터베이스나 웹서비스에 등록하겠지만 예제에서는 ‘~을 등록했습니다.’라는 메시지만 출력해요."
 },
 {
  "n": 158,
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "다음 코드의 출력 순서로 알맞은 것은? (줄바꿈은 / 로 표시)",
  "choices": [
   "Youngjin Kim의 카드를 만듭니다. / Heungmin Son의 카드를 만듭니다. / [IDCard:Youngjin Kim]을 등록했습니다. / [IDCard:Heungmin Son]을 등록했습니다. / [IDCard:Youngjin Kim]을 사용합니다. / [IDCard:Heungmin Son]을 사용합니다.",
   "Youngjin Kim의 카드를 만듭니다. / [IDCard:Youngjin Kim]을 등록했습니다. / Heungmin Son의 카드를 만듭니다. / [IDCard:Heungmin Son]을 등록했습니다. / [IDCard:Youngjin Kim]을 사용합니다. / [IDCard:Heungmin Son]을 사용합니다.",
   "[IDCard:Youngjin Kim]을 등록했습니다. / Youngjin Kim의 카드를 만듭니다. / [IDCard:Heungmin Son]을 등록했습니다. / Heungmin Son의 카드를 만듭니다. / [IDCard:Youngjin Kim]을 사용합니다. / [IDCard:Heungmin Son]을 사용합니다.",
   "Youngjin Kim의 카드를 만듭니다. / [IDCard:Youngjin Kim]을 사용합니다. / [IDCard:Youngjin Kim]을 등록했습니다. / Heungmin Son의 카드를 만듭니다. / [IDCard:Heungmin Son]을 사용합니다. / [IDCard:Heungmin Son]을 등록했습니다."
  ],
  "ans": 1,
  "exp": "create 한 번에 ‘만든다(생성자 출력) → 등록한다’가 차례로 일어나고, use는 create가 모두 끝난 뒤에 불려요(Java 21로 실행해 확인).",
  "code": "Factory factory = new IDCardFactory();\nProduct card1 = factory.create(\"Youngjin Kim\");\nProduct card2 = factory.create(\"Heungmin Son\");\ncard1.use();\ncard2.use();"
 },
 {
  "n": 159,
  "ch": 1,
  "lv": 1,
  "t": "mc",
  "q": "Factory Method 패턴의 역할과 교안 예제 클래스를 바르게 짝지은 것은?",
  "choices": [
   "Product = Main · Creator = Factory · ConcreteProduct = IDCard · ConcreteCreator = Product",
   "Product = Factory · Creator = Product · ConcreteProduct = IDCardFactory · ConcreteCreator = IDCard",
   "Product = IDCard · Creator = IDCardFactory · ConcreteProduct = Product · ConcreteCreator = Factory",
   "Product = Product · Creator = Factory · ConcreteProduct = IDCard · ConcreteCreator = IDCardFactory"
  ],
  "ans": 3,
  "exp": "프레임워크 쪽의 <b>Product</b>(제품)·<b>Creator</b>(작성자)와, 구체적인 내용 쪽의 <b>ConcreteProduct</b>(구체적인 제품)·<b>ConcreteCreator</b>(구체적인 작성자)예요. 상위의 Creator–Product 관계가 하위의 ConcreteCreator–ConcreteProduct 관계와 <b>병행</b>해요."
 },
 {
  "n": 160,
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "Creator 역(Factory)이 알고 있는 것으로 옳은 것은?",
  "choices": [
   "실제로 생성될 ConcreteProduct가 IDCard라는 것까지",
   "IDCardFactory의 소스 코드와 내부 필드 전부",
   "Product와, 생성 메서드를 부르면 Product가 생긴다는 것",
   "Main이 어떤 이름으로 카드를 만들지 미리 전부"
  ],
  "ans": 2,
  "exp": "Creator는 실제로 생성할 ConcreteProduct에 대해서는 <b>아는 바가 없어요</b>. new로 실제 인스턴스를 만드는 대신 인스턴스 생성 메서드를 호출함으로써 <b>구체적인 클래스 이름에 의한 속박에서 상위 클래스를 자유롭게</b> 해요."
 },
 {
  "n": 161,
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "TV(Television)와 TV 공장(TelevisionFactory)을 같은 프레임워크로 새로 만들 때 필요한 일로 옳은 것은?",
  "choices": [
   "idcard 패키지를 지우고 그 자리에 TV 클래스를 넣는다",
   "framework의 Factory에 Television용 if문을 추가한다",
   "framework의 Product에 TV 전용 메서드를 추가한다",
   "framework를 import한 새 패키지에 하위 클래스를 만든다"
  ],
  "ans": 3,
  "exp": "framework 패키지 안에서는 idcard 패키지를 import하지 않았고, IDCard·IDCardFactory라는 이름도 쓰지 않아요. 그래서 새 제품과 공장을 만들어도 <b>framework 패키지를 수정할 필요가 전혀 없어요</b>. 이것을 ‘framework 패키지는 idcard 패키지에 <b>의존하지 않는다</b>’고 표현해요."
 },
 {
  "n": 162,
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "createProduct를 <b>추상 메서드</b>로 기술했을 때의 특징은?",
  "choices": [
   "하위가 꼭 구현해야 하고, 빠뜨리면 컴파일 때 검출된다",
   "Product 클래스를 더 이상 추상 클래스로 둘 수 없게 된다",
   "하위가 구현하지 않으면 상위의 기본 구현이 대신 쓰인다",
   "실행 중에 구현이 없으면 예외 대신 null이 반환된다"
  ],
  "ans": 0,
  "exp": "추상 메서드로 기술하면 하위 클래스에서는 반드시 이 메서드를 구현해야 하고, 구현하지 않으면 컴파일할 때 검출돼요. 예제는 이 방법을 썼어요."
 },
 {
  "n": 163,
  "ch": 1,
  "lv": 3,
  "t": "mc",
  "q": "createProduct에 <b>디폴트 구현</b>을 준비해 두는 방법의 제약으로 옳은 것은?",
  "choices": [
   "하위 클래스에서 createProduct를 오버라이드할 수 없다",
   "Product를 직접 new하므로 추상 클래스로 둘 수 없다",
   "디폴트 구현은 반드시 static 메서드로 만들어야 한다",
   "디폴트 구현을 두면 Factory 클래스를 상속할 수 없다"
  ],
  "ans": 1,
  "exp": "하위 클래스에서 구현하지 않으면 디폴트 구현이 쓰여요. 단, 이 경우 Product 클래스에 대해 <b>직접 new를 실행</b>하므로 Product를 추상 클래스로 둘 수 없어요(추상 클래스는 new할 수 없으니까요).",
  "code": "class Factory {\n    public Product createProduct(String name) {\n        return new Product(name);\n    }\n    ...\n}"
 },
 {
  "n": 164,
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "교안 ‘패턴 이용과 개발자 간의 의사소통’에서 권하는 것은?",
  "choices": [
   "패턴을 쓴 클래스는 하나의 파일에 모두 모아 둔다",
   "쓴 패턴의 이름과 의도를 주석·문서로 전달한다",
   "패턴은 코드를 복잡하게 하니 실무에서는 피한다",
   "추상 메서드 없이 모든 처리를 상위 클래스에 적는다"
  ],
  "ans": 1,
  "exp": "Template Method·Factory Method는 하나의 클래스만 읽어서는 동작을 이해하기 어려워요(상위의 뼈대 → 추상 메서드 → 하위의 구현을 차례로 봐야 해요). 그래서 설계자가 의도한 패턴을 잘 전달하지 않으면 처음 의도에서 벗어난 수정이 가해질 수 있어요."
 },
 {
  "n": 165,
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "GoF의 Factory Method 패턴과 <b>static Factory Method</b>의 관계로 옳은 것은?",
  "choices": [
   "static Factory Method는 하위 클래스가 꼭 오버라이드한다",
   "static Factory Method가 GoF 패턴의 공식 이름이다",
   "static Factory Method는 Java API에서 거의 쓰지 않는 기법이다",
   "서로 다르지만, 생성용 static 메서드도 흔히 그렇게 부른다"
  ],
  "ans": 3,
  "exp": "인스턴스 생성을 위한 클래스 메서드(static 메서드) 전반을 Factory Method라고 부르는 경우가 있어요. GoF의 Factory Method 패턴과는 다르지만 Java에서 아주 자주 쓰이는 기법이고, Java API 레퍼런스에서도 <b>static Factory Method</b>라고 표현해요."
 },
 {
  "n": 166,
  "ch": 1,
  "lv": 1,
  "t": "mc",
  "q": "교안에서 static Factory Method의 예로 든 것이 <b>아닌</b> 것은?",
  "choices": [
   "<code>new ArrayList&lt;&gt;()</code>",
   "<code>String.valueOf('A')</code>",
   "<code>List.of(\"Alice\", \"Bob\")</code>",
   "<code>Instant.now()</code>"
  ],
  "ans": 0,
  "exp": "<code>new</code>로 생성자를 직접 부르는 건 static Factory Method가 아니에요. 교안의 예: <code>SecureRandom.getInstance</code>, <code>List.of</code>, <code>Arrays.asList</code>, <code>String.valueOf</code>, <code>Instant.now</code>. 이름은 create, newInstance, getInstance 등이 자주 쓰이지만 다른 이름도 있어요."
 },
 {
  "n": 167,
  "ch": 1,
  "lv": 3,
  "t": "mc",
  "q": "다음 코드의 출력으로 알맞은 것은? (줄바꿈은 / 로 표시)",
  "choices": [
   "[Z, B] / [Z, B, C] / of set: UnsupportedOperationException",
   "[Z, B] / asList add: UnsupportedOperationException / of set: UnsupportedOperationException",
   "[Z, B] / asList add: UnsupportedOperationException / [Z, B]",
   "[A, B] / asList add: UnsupportedOperationException / [Z, B]"
  ],
  "ans": 1,
  "exp": "<code>Arrays.asList</code>가 만든 리스트는 크기가 고정이라 set은 되지만 add는 안 돼요. <code>List.of</code>가 만든 리스트는 아예 <b>변경 불가</b>라서 set도 안 돼요. 같은 static Factory Method라도 만들어 주는 인스턴스의 성질이 달라서, API 레퍼런스를 꼭 읽어야 해요(Java 21로 실행해 확인).",
  "code": "List<String> a = Arrays.asList(\"A\", \"B\");\na.set(0, \"Z\");\nSystem.out.println(a);\ntry { a.add(\"C\"); }\ncatch (UnsupportedOperationException e) { System.out.println(\"asList add: \" + e.getClass().getSimpleName()); }\nList<String> b = List.of(\"A\", \"B\");\ntry { b.set(0, \"Z\"); }\ncatch (UnsupportedOperationException e) { System.out.println(\"of set: \" + e.getClass().getSimpleName()); }"
 },
 {
  "n": 168,
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "Factory Method의 관련 패턴 설명으로 옳은 것은?",
  "choices": [
   "Iterator의 iterator 메서드와는 관계가 없다",
   "Creator 역은 대부분 Singleton으로 만들 수 있다",
   "Product 역에는 Composite를 적용할 수 없다",
   "Template Method와는 관계없는 독립된 패턴이다"
  ],
  "ans": 1,
  "exp": "프로그램 안에서 Creator 인스턴스가 여러 개 존재할 필요가 별로 없기 때문이에요. 또 Factory Method는 Template Method의 전형적인 응용이고, Product 역에 Composite를 적용할 수 있으며, Iterator 패턴의 iterator 메서드가 Iterator 인스턴스를 만들 때 Factory Method를 쓸 수 있어요."
 },
 {
  "n": 169,
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "교안 ‘이 장에서 학습한 내용’의 ‘백설공주’ 비유가 말하려는 것은?",
  "choices": [
   "디자인 패턴은 대부분 클래스 하나로 완성되는 일인극이다",
   "클래스 이름은 동화 속 등장인물처럼 짓는 것이 좋다",
   "클래스 하나가 아니라 클래스들의 상호 관계를 봐야 한다",
   "상위 클래스 하나만 읽으면 전체 동작을 알 수 있다"
  ],
  "ans": 2,
  "exp": "하나의 패턴 안에서 여러 클래스와 인터페이스가 각자 역할을 맡아 관련되어 동작해요. 백설공주 혼자 무대에 서 있는 것만으로는 백설공주 연극이 되지 않는 것과 같아요. (다음 장의 Singleton은 ‘일인극’에 가까운 패턴이에요.)"
 },
 {
  "n": 170,
  "ch": 1,
  "lv": 1,
  "t": "mc",
  "q": "교안 주의에서 공개용 패키지 이름을 지을 때 추천하는 규칙은?",
  "choices": [
   "패키지 이름은 모두 대문자로 짓는다",
   "짧을수록 좋으니 한 글자로 짓는다",
   "도메인 이름을 뒤집어 앞에 붙인다",
   "패키지 이름에 클래스 이름을 붙인다"
  ],
  "ans": 2,
  "exp": "예를 들어 example.com이라는 도메인이면 <code>com.example</code>로 시작하는 패키지 이름을 만들어요. 예제는 설명을 간단히 하려고 이 규칙을 따르지 않았어요(framework, idcard). 📝 수업 필기에 ‘ex?’라고 물음표가 있던 부분이에요."
 },
 {
  "n": 171,
  "ch": 1,
  "lv": 2,
  "t": "self",
  "q": "[교안 문제 4-1] 예제 프로그램에서 IDCard 클래스의 생성자는 <code>public</code>으로 되어 있지 않아요. 이는 무엇을 나타내는 것일까요?",
  "answer": "IDCard의 생성자는 접근 제한자가 없으므로(default) 같은 idcard 패키지 안에서만 호출할 수 있다.\n즉 idcard 패키지 밖(Main 등)에서는 new IDCard(\"…\")로 직접 만들 수 없다.\n(Main에서 쓰면 컴파일 에러: IDCard(String) is not public in IDCard; cannot be accessed from outside package)\n\n→ IDCard 인스턴스는 같은 패키지의 IDCardFactory를 통해서만, 즉\n  factory.create(\"…\")로만 만들어야 한다는 뜻이다.\n  이렇게 하면 '만들면 반드시 등록된다(createProduct → registerProduct)'는\n  Factory의 절차를 거치지 않고 카드를 만드는 일을 막을 수 있다.",
  "kw": [
   "default",
   "같은 패키지",
   "idcard",
   "IDCardFactory",
   "create",
   "new"
  ],
  "exp": "‘IDCard는 IDCardFactory로만 만들라’는 설계 의도를 접근 제한자로 표현한 거예요. Memento의 생성자를 public으로 두지 않은 것과 같은 생각이에요.",
  "code": "public class IDCard extends Product {\n    ...\n    IDCard(String owner) {\n        ...\n    }\n    ...\n}"
 },
 {
  "n": 172,
  "ch": 1,
  "lv": 2,
  "t": "self",
  "q": "[교안 문제 4-2] 예제 프로그램의 IDCard 클래스에 카드 일련번호를 매기고, IDCardFactory 클래스가 일련번호와 소지자의 대응표를 갖도록 수정하세요.",
  "answer": "// IDCard: 일련번호 필드 추가\npublic class IDCard extends Product {\n    private String owner;\n    private int serial;\n\n    IDCard(String owner, int serial) {\n        System.out.println(owner + \"(\" + serial + \")의 카드를 만듭니다.\");\n        this.owner = owner;\n        this.serial = serial;\n    }\n\n    @Override\n    public void use() {\n        System.out.println(this + \"을 사용합니다.\");\n    }\n\n    @Override\n    public String toString() {\n        return \"[IDCard:\" + owner + \"(\" + serial + \")]\";\n    }\n\n    public String getOwner() { return owner; }\n    public int getSerial() { return serial; }\n}\n\n// IDCardFactory: 번호를 매기고 대응표를 가진다\npublic class IDCardFactory extends Factory {\n    private Map<Integer, String> owners = new HashMap<>();\n    private int serial = 100;\n\n    @Override\n    protected synchronized Product createProduct(String owner) {\n        return new IDCard(owner, serial++);\n    }\n\n    @Override\n    protected void registerProduct(Product product) {\n        IDCard card = (IDCard) product;\n        owners.put(card.getSerial(), card.getOwner());\n    }\n\n    public Map<Integer, String> getOwners() {\n        return owners;\n    }\n}\n// 실행 예: Kim(100), Son(101) → getOwners() = {100=Kim, 101=Son}",
  "kw": [
   "serial",
   "createProduct",
   "registerProduct",
   "Map",
   "put"
  ],
  "exp": "번호를 매기는 일은 <b>createProduct</b>, 대응표에 넣는 일은 <b>registerProduct</b>에 두면 Factory의 절차(만들고 → 등록)와 딱 맞아요. framework 패키지는 하나도 고치지 않았다는 점이 핵심이에요(Java 21로 실행해 확인). 여러 스레드가 동시에 만들 수 있으니 번호를 늘리는 곳에 synchronized를 붙이면 더 안전해요."
 },
 {
  "n": 173,
  "ch": 1,
  "lv": 3,
  "t": "mc",
  "q": "[교안 문제 4-3] 하위 클래스가 생성자에 반드시 ‘제품명’을 인수로 받도록 강제하려고 다음처럼 Product를 정의했더니 컴파일 에러가 났어요. 이유는?",
  "choices": [
   "생성자의 인수는 String이 아니라 Object여야 하기 때문이다",
   "추상 클래스에는 생성자를 아예 정의할 수 없기 때문이다",
   "use 메서드가 abstract라서 생성자와 함께 쓸 수 없기 때문이다",
   "생성자는 상속·오버라이드되지 않아 abstract를 붙일 수 없다"
  ],
  "ans": 3,
  "exp": "abstract는 ‘하위 클래스가 오버라이드해서 구현하라’는 뜻인데, 생성자는 상속·오버라이드되지 않아요. 그래서 ‘modifier abstract not allowed here’ 에러가 나요(Java 21로 확인). 추상 클래스도 일반 생성자는 가질 수 있어요. 제품명을 강제하려면 <code>public Product(String name)</code>처럼 <b>인수 있는 일반 생성자만</b> 두면, 하위 클래스가 <code>super(name)</code>을 부를 수밖에 없어요.",
  "code": "public abstract class Product {\n    public abstract Product(String name);\n    public abstract void use();\n}"
 },
 {
  "n": 174,
  "ch": 1,
  "lv": 3,
  "t": "self",
  "q": "Factory Method 프레임워크(framework 패키지의 Product, Factory)를 그대로 써서, 쿠폰을 만드는 <code>Coupon</code>과 <code>CouponFactory</code>를 coupon 패키지에 만드세요. 조건: ① Coupon은 쿠폰 코드(String)를 가지고, use하면 \"쿠폰 코드를 사용합니다.\"를 출력 ② CouponFactory는 만든 쿠폰의 수를 세어 <code>getCount()</code>로 알려 줌 ③ framework 패키지는 고치지 않음",
  "answer": "package coupon;\n\nimport framework.Product;\n\npublic class Coupon extends Product {\n    private String code;\n\n    Coupon(String code) {          // 같은 패키지(CouponFactory)에서만 생성\n        this.code = code;\n    }\n\n    @Override\n    public void use() {\n        System.out.println(code + \" 쿠폰을 사용합니다.\");\n    }\n}\n\npackage coupon;\n\nimport framework.Factory;\nimport framework.Product;\n\npublic class CouponFactory extends Factory {\n    private int count = 0;\n\n    @Override\n    protected Product createProduct(String code) {\n        return new Coupon(code);\n    }\n\n    @Override\n    protected void registerProduct(Product product) {\n        count++;\n    }\n\n    public int getCount() {\n        return count;\n    }\n}\n\n// Main\nFactory factory = new CouponFactory();\nProduct c = factory.create(\"WELCOME10\");\nc.use();",
  "kw": [
   "extends Product",
   "extends Factory",
   "createProduct",
   "registerProduct",
   "use"
  ],
  "exp": "IDCard 예제와 똑같은 모양이에요. 새 패키지에서 framework를 import해 Product·Factory를 상속하고, 추상 메서드만 구현하면 돼요. Main은 <code>factory.create(...)</code>만 쓰니 생성 절차도 그대로예요."
 },
 {
  "n": 175,
  "ch": 4,
  "lv": 1,
  "t": "mc",
  "q": "Builder 패턴을 가장 잘 설명한 것은?",
  "choices": [
   "같은 인스턴스를 여러 곳에서 공유해 메모리 사용량을 줄인다",
   "구조를 가진 복잡한 인스턴스를 부분부터 단계를 밟아 조립해 간다",
   "어느 시점의 인스턴스 상태를 저장해 두었다가 나중에 되돌린다",
   "인스턴스를 만드는 공장을 Template Method 패턴으로 구성한다"
  ],
  "ans": 1,
  "exp": "빌딩을 지을 때 지반을 다지고, 뼈대를 만들고, 아래에서 위로 조금씩 만들어 가듯이, 복잡한 구조물은 단숨에 완성하기 어려워요. 전체를 구성하는 각 부분을 만들고 <b>단계를 밟아 가며</b> 만드는 것이 Builder 패턴이에요."
 },
 {
  "n": 176,
  "ch": 4,
  "lv": 1,
  "t": "mc",
  "q": "교안 예제에서 Builder 패턴으로 만드는 ‘문서’의 구조로 옳은 것은?",
  "choices": [
   "문자열 한 개와 그림 몇 개를 포함한다",
   "제목 없이 항목만 몇 개 포함한다",
   "타이틀 몇 개, 문자열 한 개, 표 몇 개를 포함한다",
   "타이틀 한 개, 문자열 몇 개, 항목 몇 개를 포함한다"
  ],
  "ans": 3,
  "exp": "예제의 문서는 <b>타이틀을 한 개</b>, <b>문자열을 몇 개</b>, <b>항목을 몇 개</b> 포함해요. Director의 construct가 이 순서로 Builder의 메서드를 불러 문서를 만들어요."
 },
 {
  "n": 177,
  "ch": 4,
  "lv": 1,
  "t": "mc",
  "q": "교안 예제(표 7-1)의 클래스와 설명을 바르게 짝지은 것은?",
  "choices": [
   "Builder: 하나의 문서를 만드는 클래스 · Director: 문서를 구성하는 메서드를 규정한 추상 클래스",
   "Builder: 동작 테스트용 클래스 · Director: 문서를 파일에 저장하는 클래스",
   "Builder: 문서를 구성하는 메서드를 규정한 추상 클래스 · Director: 하나의 문서를 만드는 클래스",
   "Builder: HTML 파일로 문서를 만드는 클래스 · Director: 텍스트로 문서를 만드는 클래스"
  ],
  "ans": 2,
  "exp": "Builder는 문서를 구성하기 위한 메서드를 규정한 <b>추상 클래스</b>, Director는 그 메서드로 <b>하나의 문서를 만드는</b> 클래스예요. TextBuilder는 텍스트(일반 문자열), HTMLBuilder는 HTML 파일로 문서를 만들고, Main은 동작 테스트용이에요."
 },
 {
  "n": 178,
  "ch": 4,
  "lv": 1,
  "t": "mc",
  "q": "Builder 추상 클래스(리스트 7-1)에 선언된 메서드가 <b>아닌</b> 것은?",
  "choices": [
   "close",
   "makeTitle",
   "makeItems",
   "construct"
  ],
  "ans": 3,
  "exp": "Builder에는 makeTitle, makeString, makeItems, close가 있어요. 각각 제목, 문자열, 항목을 문서 안에 구축하고, close는 문서를 완성해요. <code>construct</code>는 Director의 메서드예요(construct = ‘구축하다’).",
  "code": "public abstract class Builder {\n    public abstract void makeTitle(String title);\n    public abstract void makeString(String str);\n    public abstract void makeItems(String[] items);\n    public abstract void close();\n}"
 },
 {
  "n": 179,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "Director 생성자의 인수는 Builder형이에요. 실제로 전달되는 것은?",
  "choices": [
   "TextBuilder 등 Builder 하위 클래스의 인스턴스",
   "Builder 클래스가 저장된 소스 파일의 이름",
   "new Builder()로 만든 Builder 자체의 인스턴스",
   "construct 메서드가 미리 만든 문서 문자열"
  ],
  "ans": 0,
  "exp": "Builder는 추상 클래스라서 인스턴스를 만들 수 없어요. 그래서 실제로는 하위 클래스의 인스턴스가 전달되고, <b>어떤 하위 클래스를 주느냐에 따라</b> Director가 만들 구체적인 문서 형식이 정해져요."
 },
 {
  "n": 180,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "Director의 construct 메서드가 사용하는 것은?",
  "choices": [
   "TextBuilder의 getTextResult와 HTMLBuilder의 getHTMLResult",
   "Builder에서 선언된 메서드뿐이다",
   "Main 클래스의 usage 메서드",
   "StringBuilder의 append를 직접 호출한다"
  ],
  "ans": 1,
  "exp": "construct는 builder.makeTitle → makeString → makeItems → … → close를 차례로 불러요. 쓰는 건 <b>Builder에서 선언된 메서드뿐</b>이에요. 그래서 Director는 실제로 동작하는 것이 TextBuilder인지 HTMLBuilder인지 의식하지 않아요."
 },
 {
  "n": 181,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "Builder의 메서드 호출을 출력하는 LogBuilder를 Director에 넘겼어요. 다음 construct를 실행하면 출력은? (줄바꿈은 / 로 표시)",
  "choices": [
   "T:Menu / S:Drink / I:2 / C",
   "T:Menu / S:Drink / C",
   "T:Menu / I:2 / S:Drink / C",
   "C / I:2 / S:Drink / T:Menu"
  ],
  "ans": 0,
  "exp": "Director가 정한 순서 그대로 Builder의 메서드가 불려요. 문서를 <b>어떤 순서로</b> 조립할지는 Director가, 각 부분을 <b>어떻게</b> 표현할지는 ConcreteBuilder가 정해요(Java 21로 실행해 확인).",
  "code": "class LogBuilder extends Builder {\n    public void makeTitle(String t) { System.out.println(\"T:\" + t); }\n    public void makeString(String s) { System.out.println(\"S:\" + s); }\n    public void makeItems(String[] items) { System.out.println(\"I:\" + items.length); }\n    public void close() { System.out.println(\"C\"); }\n}\n// Director의 construct\nbuilder.makeTitle(\"Menu\");\nbuilder.makeString(\"Drink\");\nbuilder.makeItems(new String[]{\"Tea\", \"Coffee\"});\nbuilder.close();"
 },
 {
  "n": 182,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "앞 문제와 같은 construct에 <b>TextBuilder</b>를 넘기고 getTextResult()를 출력하면 결과는? (빈 줄은 ∅, 줄바꿈은 / 로 표시)",
  "choices": [
   "==… / Menu / ∅ / Drink / ∅ / - Tea / - Coffee / ∅ / ==…",
   "<h1>Menu</h1> / <p>Drink</p> / <li>Tea</li> / <li>Coffee</li>",
   "==… / [Menu] / ■Drink /  ·Tea /  ·Coffee / ==… / ∅ / ∅ / ∅",
   "==… / [Menu] / ∅ / ■Drink / ∅ /  ·Tea /  ·Coffee / ∅ / ==…"
  ],
  "ans": 3,
  "exp": "makeTitle은 ‘=’ 줄 다음에 <code>[제목]</code>과 빈 줄, makeString은 <code>■문자열</code>과 빈 줄, makeItems는 항목마다 <code> ·항목</code>을 쓰고 마지막에 빈 줄, close는 ‘=’ 줄을 덧붙여요(Java 21로 실행해 확인). ④는 HTMLBuilder 쪽 모양이에요."
 },
 {
  "n": 183,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "HTMLBuilder에서 <code>getHTMLResult()</code>가 돌려주는 것과, Director로 예제 문서를 만든 뒤의 값은?",
  "choices": [
   "HTML 문서 전체 문자열 · \"<!DOCTYPE html>…\"",
   "만든 HTML 파일의 파일 이름 · \"Greeting.html\"",
   "문서의 제목 · \"Greeting\"",
   "만든 HTML 파일의 파일 이름 · \"untitled.html\""
  ],
  "ans": 1,
  "exp": "HTMLBuilder는 makeTitle에서 <code>filename = title + \".html\";</code>로 파일 이름을 정하고(초깃값은 \"untitled.html\"), close에서 FileWriter로 파일을 써요. 작성한 결과는 HTML 파일의 <b>파일 이름</b>으로 돌려줘요. 그래서 Main은 ‘HTML파일 Greeting.html이 작성되었습니다.’를 출력해요(Java 21로 확인)."
 },
 {
  "n": 184,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "TextBuilder와 HTMLBuilder가 결과를 돌려주는 메서드에 대한 설명으로 옳은 것은?",
  "choices": [
   "둘 다 Builder에 선언된 getResult()를 오버라이드했다",
   "둘 다 close()의 반환값으로 결과를 돌려준다",
   "각자 다른 메서드이며, Builder에는 선언되어 있지 않다",
   "Director의 construct가 결과를 직접 반환해 준다"
  ],
  "ans": 2,
  "exp": "결과의 형태가 ConcreteBuilder마다 달라서(텍스트 문자열, 파일 이름) 각자 고유한 메서드를 가져요. 그래서 Main은 Director에 넘긴 <b>그 ConcreteBuilder 변수</b>(textbuilder, htmlbuilder)로 결과를 받아요. 이것이 Builder 역과 ConcreteBuilder 역의 getResult 차이예요."
 },
 {
  "n": 185,
  "ch": 4,
  "lv": 1,
  "t": "mc",
  "q": "Main(리스트 7-5)에서 <code>java Main text</code>로 실행했을 때 일어나는 일로 옳은 것은?",
  "choices": [
   "TextBuilder를 Director에 넘겨 construct한다",
   "HTMLBuilder를 Director에 넘겨 HTML 파일을 만든다",
   "usage()로 사용 방법만 화면에 출력하고 끝낸다",
   "Main이 TextBuilder의 메서드를 하나씩 직접 부른다"
  ],
  "ans": 0,
  "exp": "커맨드 라인에서 text를 지정하면 TextBuilder를, html을 지정하면 HTMLBuilder를 Director 생성자에 전달해요. 인수 개수가 1이 아니거나 다른 값이면 usage()를 출력하고 종료해요."
 },
 {
  "n": 186,
  "ch": 4,
  "lv": 1,
  "t": "mc",
  "q": "Builder 패턴의 역할과 교안 예제 클래스를 바르게 짝지은 것은?",
  "choices": [
   "Builder = Director · ConcreteBuilder = Builder · Director = Main · Client = TextBuilder",
   "Builder = Main · ConcreteBuilder = Director · Director = Builder · Client = HTMLBuilder",
   "Builder = TextBuilder · ConcreteBuilder = HTMLBuilder · Director = Main · Client = Director",
   "Builder = Builder · ConcreteBuilder = TextBuilder, HTMLBuilder · Director = Director · Client = Main"
  ],
  "ans": 3,
  "exp": "<b>Builder</b>(건축가)는 인스턴스의 각 부분을 만드는 인터페이스(API)를 정하고, <b>ConcreteBuilder</b>(구체적인 건축가)는 그것을 구현하며 최종 결과를 얻는 메서드를 가져요. <b>Director</b>(감독관)는 Builder의 API로 인스턴스를 만들고, <b>Client</b>(의뢰인)는 Builder 패턴을 이용해요."
 },
 {
  "n": 187,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "Director 역에 대한 설명으로 옳은 것은?",
  "choices": [
   "ConcreteBuilder에 의존하지 않고 Builder의 메서드만 쓴다",
   "Builder의 하위 클래스로서 문서의 각 부분을 직접 만들어 낸다",
   "ConcreteBuilder마다 다른 if문을 두어 처리 방식을 바꿔 준다",
   "최종 결과를 얻는 getResult 메서드를 자기가 직접 구현한다"
  ],
  "ans": 0,
  "exp": "Director는 ConcreteBuilder가 무엇이든 잘 작동하도록 <b>Builder의 메서드만</b> 사용해요. 그래서 TextBuilder를 주든 HTMLBuilder를 주든 그대로 동작해요."
 },
 {
  "n": 188,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "GoF 책과 교안의 Client 역에 대한 설명으로 옳은 것은?",
  "choices": [
   "GoF 책에는 포함되지 않지만, 교안에서는 Main이 맡는다",
   "GoF 책에서는 Client 역이 Director 역을 대신 맡는다",
   "교안 예제에는 Client 역을 맡는 클래스가 하나도 없다",
   "Client 역은 반드시 Builder 역을 상속해서 만든다"
  ],
  "ans": 0,
  "exp": "교안: Client(의뢰인) 역은 Builder 패턴을 이용해요(GoF 책에서는 Client 역이 Builder 패턴 안에 포함되지 않아요). 예제에서는 Main 클래스가 이 역할을 맡았어요."
 },
 {
  "n": 189,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "Builder 패턴의 시퀀스 다이어그램(그림 7-7)의 흐름으로 옳은 것은?",
  "choices": [
   "Director: new → Client: buildPart → Director: getResult로 출력",
   "ConcreteBuilder: new Director → Director: Client 호출 → 반환",
   "Client: new·construct → Director: buildPart → Client: getResult",
   "Client: buildPart 직접 호출 → construct로 마무리 → 출력"
  ],
  "ans": 2,
  "exp": "Client는 ConcreteBuilder를 만들어 Director에게 주고 construct만 불러요. 부분 조립(buildPart)은 Director가 하고, 다 만들어진 결과는 Client가 ConcreteBuilder의 getResult로 받아요."
 },
 {
  "n": 190,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "Builder 패턴과 Template Method 패턴의 차이로 옳은 것은?",
  "choices": [
   "Builder는 하위가 상위를, TM은 Director가 Builder를 제어한다",
   "Builder는 인스턴스를 만들지 않고 TM만 인스턴스를 만든다",
   "Builder는 Director가 Builder를, TM은 상위가 하위를 제어한다",
   "두 패턴 모두 상위 클래스가 하위 클래스를 제어하므로 같다"
  ],
  "ans": 2,
  "exp": "둘 다 ‘처리 순서(뼈대)’와 ‘구체적인 처리’를 나누지만, Template Method는 <b>상속</b>(상위 → 하위)으로, Builder는 <b>위임</b>(Director가 가진 builder 필드에게 맡김)으로 제어해요."
 },
 {
  "n": 191,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "Builder의 관련 패턴 설명으로 <b>틀린</b> 것은?",
  "choices": [
   "Facade 패턴의 Facade 역은 Builder 역을 상속해서 만들어야 한다",
   "Builder 패턴으로 만들어진 생성물은 Composite 패턴이 되는 경우가 있다",
   "Director 역은 Builder의 복잡한 메서드를 조합해 간단한 API(construct)를 외부에 제공한다",
   "Builder와 Abstract Factory는 모두 복잡한 인스턴스를 생성한다"
  ],
  "ans": 0,
  "exp": "Facade와의 관계는 ‘비슷한 역할’이지 상속이 아니에요. Director가 Builder의 복잡한 메서드를 조합해 construct라는 간단한 API를 주는 것처럼, Facade 역은 내부 모듈을 조합해 간단한 API를 외부에 제공해요."
 },
 {
  "n": 192,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "교안 ‘누가 무엇을 알고 있는가?’의 내용으로 옳은 것은?",
  "choices": [
   "Main은 Builder 메서드를, Director는 실제 Builder 하위 클래스를 모른다",
   "Director는 Main이 어떤 커맨드 라인 인수를 받았는지 알고 있다",
   "Main은 Builder 메서드를 직접 부르고, Director는 TextBuilder만 안다",
   "Builder는 자신을 쓰는 Director의 construct 호출 순서를 알고 있다"
  ],
  "ans": 0,
  "exp": "Main은 Director의 construct만 호출해요. Director는 Builder의 메서드로 문서를 만들지만 그게 TextBuilder인지 HTMLBuilder인지 몰라요. ‘<b>모르기에 교체할 수 있기 때문</b>’에 이게 좋은 일이에요. 모르기 때문에 교체가 가능하고, 교체되기 때문에 부품으로서의 가치가 높아요(교체 가능성)."
 },
 {
  "n": 193,
  "ch": 4,
  "lv": 3,
  "t": "mc",
  "q": "교안이 설명한 의존성 주입(Dependency Injection)에 해당하는 것은?",
  "choices": [
   "TextBuilder가 Director를 상속해 construct를 물려받는다",
   "Director 안에서 new TextBuilder()로 직접 만들어 쓴다",
   "Builder형 생성자 인수로 TextBuilder 인스턴스를 건넨다",
   "Main이 Director 없이 Builder의 메서드를 직접 부른다"
  ],
  "ans": 2,
  "exp": "‘소스 코드에는 쓰여 있지 않지만, 실제로는 이 인스턴스를 이용해(의존해) 동작해 주세요’라는 의미를 담아 인스턴스를 건네는 방법이 의존성 주입(DI)이에요. 글 쓰는 사람에게 ‘자, 이걸 써서 써 줘’라고 필기구(연필인지 볼펜인지는 건네는 시점에 결정)를 건네는 것과 비슷해요. 클래스 간 결합도를 낮추고 재사용성을 높여요."
 },
 {
  "n": 194,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "교안 ‘설계 시 결정할 수 있는 것과 결정할 수 없는 것’에서 Builder 클래스에 요구하는 것은?",
  "choices": [
   "구축에 필요·충분한 메서드만, 형식 고유의 메서드는 빼고 선언한다",
   "TextBuilder와 HTMLBuilder에만 필요한 메서드도 모두 Builder에 넣는다",
   "앞으로 생길 모든 문서 형식을 예상해 메서드를 미리 수백 개 선언한다",
   "메서드를 최소로 줄이려고 close 하나만 선언하고 나머지는 하위에 둔다"
  ],
  "ans": 0,
  "exp": "Director에게 주어지는 도구는 Builder가 제공하므로 무엇을 준비하는지가 중요해요. 앞으로 늘어날지도 모르는 하위 클래스(XXXXBuilder)의 요구에도 대응해야 하지만, 설계자는 신이 아니라서 모든 미래를 예상할 수는 없어요. 가까운 미래에 예상되는 변화에 견딜 수 있도록 설계해요."
 },
 {
  "n": 195,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "교안 ‘소스를 읽고 수정하는 방법’에서 Builder 패턴 코드를 읽는 순서로 권하는 것은?",
  "choices": [
   "Main만 읽고 바로 HTMLBuilder의 파일 쓰기 부분만 고친다",
   "Builder 추상 클래스 하나만 읽으면 전체를 충분히 이해한다",
   "가장 긴 클래스부터 읽고 짧은 클래스는 모두 건너뛴다",
   "Director로 사용법을 익힌 뒤 ConcreteBuilder를 읽는다"
  ],
  "ans": 3,
  "exp": "추상 클래스만 살펴봐서는 정보가 많지 않아요(메서드 이름 등으로 단서는 얻지만요). Director의 소스로 Builder의 사용법(호출 방법)을 이해하고, 그다음 ConcreteBuilder를 읽어 추상 메서드에 어떤 동작이 기대되는지 알 수 있어요. @Override도 단서가 돼요."
 },
 {
  "n": 196,
  "ch": 4,
  "lv": 3,
  "t": "mc",
  "q": "Director가 실수로 TextBuilder 고유의 메서드를 직접 호출하도록 고치면 생기는 문제로 가장 알맞은 것은?",
  "choices": [
   "HTMLBuilder로 바꿨을 때 제대로 동작하지 않을 수 있다",
   "TextBuilder의 출력 결과가 HTML 형식으로 바뀌어 버린다",
   "Builder 추상 클래스를 더 이상 상속할 수 없게 된다",
   "Main에서 Director의 construct를 호출할 수 없게 된다"
  ],
  "ans": 0,
  "exp": "클래스의 역할을 이해하지 못하면 어느 클래스를 고칠지 판단을 잘못해요. Builder를 고치는 건 Director가 호출하는 메서드와 모든 하위 클래스에 영향을 미치는 일이고, Director가 TextBuilder에 의존하면 교체 가능성이 깨져요."
 },
 {
  "n": 197,
  "ch": 4,
  "lv": 2,
  "t": "self",
  "q": "[교안 문제 7-1] 예제 프로그램의 Builder 클래스(리스트 7-1)를 <b>인터페이스</b>로 변경하고, 그에 맞춰 다른 클래스를 수정하세요.",
  "answer": "// Builder: 인터페이스로\npublic interface Builder {\n    void makeTitle(String title);       // 인터페이스 메서드는 자동으로 public abstract\n    void makeString(String str);\n    void makeItems(String[] items);\n    void close();\n}\n\n// TextBuilder: extends → implements\npublic class TextBuilder implements Builder {\n    private StringBuilder sb = new StringBuilder();\n\n    @Override\n    public void makeTitle(String title) { ... }   // public 그대로 유지\n    ...\n}\n\n// HTMLBuilder도 같은 방식으로 implements Builder\npublic class HTMLBuilder implements Builder { ... }\n\n// Director와 Main은 그대로(Builder형 변수·인수는 인터페이스형으로도 동작)",
  "kw": [
   "interface Builder",
   "implements Builder",
   "public",
   "Director"
  ],
  "exp": "바꿀 곳은 Builder 선언과 하위 클래스의 <code>extends</code> → <code>implements</code>뿐이에요. 인터페이스의 메서드는 자동으로 public abstract라서, 구현 쪽 메서드에서 public을 빼면 ‘cannot implement … attempting to assign weaker access privileges’ 컴파일 에러가 나요(Java 21로 확인). Director·Main은 Builder라는 타입 이름만 쓰므로 고칠 필요가 없어요."
 },
 {
  "n": 198,
  "ch": 4,
  "lv": 2,
  "t": "self",
  "q": "[교안 문제 7-2] 예제 프로그램의 Director 클래스(리스트 7-2)의 construct 메서드를 자유롭게 수정하여 다른 문서를 만들어 보세요. 이때 TextBuilder나 HTMLBuilder를 수정할 필요가 전혀 없음을 확인해 보세요.",
  "answer": "public void construct() {\n    builder.makeTitle(\"Menu\");\n    builder.makeString(\"음료\");\n    builder.makeItems(new String[]{\n        \"Tea\",\n        \"Coffee\",\n    });\n    builder.makeString(\"디저트\");\n    builder.makeItems(new String[]{\n        \"Cake\",\n        \"Cookie\",\n    });\n    builder.close();\n}\n// → java Main text 로 텍스트 메뉴판, java Main html 로 Menu.html이 만들어진다.\n//   TextBuilder, HTMLBuilder는 한 줄도 고치지 않았다.",
  "kw": [
   "construct",
   "makeTitle",
   "makeString",
   "makeItems",
   "close",
   "수정하지 않"
  ],
  "exp": "문서의 <b>내용·순서</b>는 Director가, 각 부분의 <b>표현 형식</b>은 ConcreteBuilder가 맡기 때문이에요. 같은 construct로 텍스트와 HTML 두 형식이 동시에 바뀌는 것도 확인해 보세요."
 },
 {
  "n": 199,
  "ch": 4,
  "lv": 3,
  "t": "self",
  "q": "[교안 문제 7-3] Builder 클래스(리스트 7-1)의 하위 클래스로서 ConcreteBuilder 역할을 할 수 있는 클래스를 작성하세요. 텍스트, HTML 파일 이외에 소재는 자유예요. (예: 마크다운 문서를 만드는 MarkdownBuilder)",
  "answer": "public class MarkdownBuilder extends Builder {\n    private StringBuilder sb = new StringBuilder();\n\n    @Override\n    public void makeTitle(String title) {\n        sb.append(\"# \").append(title).append(\"\\n\\n\");\n    }\n\n    @Override\n    public void makeString(String str) {\n        sb.append(\"## \").append(str).append(\"\\n\\n\");\n    }\n\n    @Override\n    public void makeItems(String[] items) {\n        for (String s : items) {\n            sb.append(\"- \").append(s).append(\"\\n\");\n        }\n        sb.append(\"\\n\");\n    }\n\n    @Override\n    public void close() {\n    }\n\n    public String getMarkdownResult() {\n        return sb.toString();\n    }\n}\n\n// Main\nMarkdownBuilder mb = new MarkdownBuilder();\nDirector director = new Director(mb);\ndirector.construct();\nSystem.out.println(mb.getMarkdownResult());",
  "kw": [
   "extends Builder",
   "makeTitle",
   "makeString",
   "makeItems",
   "close",
   "getResult"
  ],
  "exp": "Builder의 네 추상 메서드를 모두 구현하고, 결과를 얻는 메서드를 하나 더 두면 돼요. Director·Builder는 고치지 않아요. 마크다운, CSV, JSON, 콘솔 표 등 무엇이든 좋아요(마크다운 예는 Java 21로 실행해 확인)."
 },
 {
  "n": 200,
  "ch": 4,
  "lv": 2,
  "t": "self",
  "q": "[교안 문제 7-4] TextBuilder 클래스(리스트 7-3)에서 문서를 구축해 가는 필드 sb가 String 클래스가 아니라 StringBuilder 클래스로 되어 있는 이유는 무엇일까요? 혹시 String을 사용하면 뭔가 곤란한 점이 있을까요?",
  "answer": "String은 불변(immutable) 객체라 한 번 만들면 내용을 바꿀 수 없다.\n그래서 s = s + \"...\"; (또는 s += \"...\")를 할 때마다\n기존 문자열 + 덧붙일 문자열을 복사한 '새 String 인스턴스'가 만들어지고, 예전 것은 버려진다.\n\nTextBuilder는 makeTitle, makeString, makeItems, close에서 문자열을 계속 덧붙이므로\nString을 쓰면 덧붙일 때마다 새 인스턴스 생성·복사가 일어나\n문서가 길어질수록 시간과 메모리가 낭비된다.\n\nStringBuilder는 내부 버퍼를 직접 늘려 가며 append하므로(같은 인스턴스를 계속 수정)\n문자열을 조금씩 쌓아 가는 '구축' 작업에 적합하다. 결과는 마지막에 toString()으로 얻는다.\n(String으로 써도 결과는 같지만 효율이 나쁘다.)",
  "kw": [
   "불변",
   "새",
   "인스턴스",
   "append",
   "효율"
  ],
  "exp": "<code>s += \"a\"</code> 전후의 s는 서로 다른 인스턴스지만, <code>sb.append(\"a\")</code> 전후의 sb는 같은 인스턴스예요(Java 21로 실행해 확인). 이름부터 ‘StringBuilder’, 문자열판 Builder예요."
 },
 {
  "n": 201,
  "ch": 4,
  "lv": 2,
  "t": "mc",
  "q": "다음 코드의 출력으로 알맞은 것은?",
  "choices": [
   "false true 0 a",
   "false false 1 a",
   "true true 0 a",
   "true false 0 a"
  ],
  "ans": 0,
  "exp": "String은 불변이라 <code>s += \"a\"</code>를 하면 <b>새 인스턴스</b>가 만들어지고 before는 여전히 빈 문자열(길이 0)을 가리켜요. StringBuilder의 append는 <b>같은 인스턴스</b>를 고쳐요(Java 21로 실행해 확인). 문제 7-4의 답이 여기 있어요.",
  "code": "String s = \"\";\nStringBuilder sb = new StringBuilder();\nString before = s;\ns += \"a\";\nStringBuilder sbBefore = sb;\nsb.append(\"a\");\nSystem.out.println((before == s) + \" \" + (sbBefore == sb) + \" \" + before.length() + \" \" + sb);"
 },
 {
  "n": 202,
  "ch": 4,
  "lv": 3,
  "t": "mc",
  "q": "(교안 밖) 실무 자바에서 자주 보는 다음 코드도 ‘Builder’라고 불러요. 교안 Builder 패턴과 비교한 설명으로 옳은 것은?",
  "choices": [
   "Director 없이 Client가 메서드를 이어 불러 직접 조립한다",
   "생성자 인수가 적을 때만 쓰며 Builder와는 관계가 없다",
   "build()를 부르기 전에 Pizza 인스턴스가 이미 완성돼 있다",
   "교안 Builder처럼 Director가 반드시 있어야 동작한다"
  ],
  "ans": 0,
  "exp": "『Effective Java』에서 소개하는 방식으로, 생성자 인수가 많을 때 ‘무엇을 어떤 값으로 넣는지’ 읽기 쉽게 조립해요. ‘복잡한 인스턴스를 단계적으로 조립한다’는 생각은 같지만, GoF의 Director·여러 ConcreteBuilder 구조와는 달리 <b>Client가 직접 조립 순서를 정해요</b>.",
  "code": "Pizza pizza = new Pizza.Builder(\"L\")\n        .cheese(true)\n        .topping(\"bacon\")\n        .build();"
 },
 {
  "n": 203,
  "ch": 8,
  "lv": 2,
  "t": "mc",
  "q": "다음 상황에 가장 알맞은 패턴은?<br>“주문서를 화면용 HTML, 이메일용 텍스트, 인쇄용 PDF로 만들어야 한다. 주문서에 들어갈 내용과 순서는 같고 표현 형식만 다르다.”",
  "choices": [
   "Factory Method",
   "Singleton",
   "Flyweight",
   "Builder"
  ],
  "ans": 3,
  "exp": "내용·순서(Director의 construct)는 하나로 두고, 표현 형식마다 ConcreteBuilder(HtmlBuilder, TextBuilder, PdfBuilder)를 바꿔 끼우면 돼요. 교안 예제의 TextBuilder·HTMLBuilder와 같은 구조예요."
 },
 {
  "n": 204,
  "ch": 8,
  "lv": 2,
  "t": "mc",
  "q": "다음 상황에 가장 알맞은 패턴은?<br>“결제 프레임워크는 ‘결제 수단을 만들고 → 검증·등록한다’는 절차를 고정하고, 카드·계좌이체 등 실제 결제 수단 클래스는 앞으로 계속 늘어난다. 프레임워크 코드는 고치고 싶지 않다.”",
  "choices": [
   "Abstract Factory",
   "Factory Method",
   "Prototype",
   "Memento"
  ],
  "ans": 1,
  "exp": "생성 절차(create = createProduct → registerProduct)는 상위 클래스가 정하고, 실제로 어떤 클래스를 new할지는 하위 클래스(CardFactory 등)가 정해요. framework 패키지는 구체 클래스에 의존하지 않아요."
 },
 {
  "n": 205,
  "ch": 8,
  "lv": 3,
  "t": "mc",
  "q": "Factory Method와 Builder의 비교로 옳은 것은?",
  "choices": [
   "FM은 상속으로 하위에 맡기고, Builder는 Director에 위임한다",
   "Builder는 생성 패턴이고, Factory Method는 행위 패턴이다",
   "두 패턴 모두 인스턴스가 하나만 존재하도록 보장해 준다",
   "FM은 Director가 Builder를, Builder는 상위가 하위를 제어한다"
  ],
  "ans": 0,
  "exp": "Factory Method는 Template Method를 생성에 응용한 것이라 <b>상위 클래스가 하위 클래스를 제어</b>해요. Builder는 Director가 builder 필드에 일을 시키는 <b>위임</b> 구조예요. 둘 다 GoF의 생성 패턴이에요."
 },
 {
  "n": 206,
  "ch": 8,
  "lv": 2,
  "t": "mc",
  "q": "교안 일곱 패턴 중 GoF 분류가 <b>생성 패턴</b>인 것을 모두 고른 것은?",
  "choices": [
   "Builder, Flyweight, Observer, Factory Method",
   "Factory Method, Builder, Observer, Memento",
   "Factory Method, Singleton, Prototype, Builder",
   "Singleton, Prototype, Flyweight, Memento"
  ],
  "ans": 2,
  "exp": "생성 패턴: Factory Method, Singleton, Prototype, Builder(+Abstract Factory). 구조 패턴: Flyweight. 행위 패턴: Observer, Memento(+Template Method 등)."
 },
 {
  "n": 207,
  "ch": 8,
  "lv": 3,
  "t": "mc",
  "q": "‘교체 가능성’이 드러난 장면으로 짝이 <b>맞지 않는</b> 것은?",
  "choices": [
   "Builder: Director는 TextBuilder 대신 HTMLBuilder를 받아도 그대로다",
   "Observer: NumberGenerator는 새 ConcreteObserver를 추가해도 그대로다",
   "Factory Method: framework는 IDCardFactory 대신 TelevisionFactory를 써도 그대로다",
   "Singleton: getInstance가 부를 때마다 다른 하위 클래스 인스턴스를 돌려준다"
  ],
  "ans": 3,
  "exp": "Singleton의 getInstance는 <b>항상 같은 인스턴스</b>를 돌려줘요. 나머지는 모두 ‘구체 클래스가 아니라 추상 클래스·인터페이스에 의존하므로 구체 클래스를 갈아 끼워도 그대로 동작한다’는 같은 원리예요."
 }
];
