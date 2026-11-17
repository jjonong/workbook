// 디자인 패턴 실습 문제 (89문제) · Java 언어로 배우는 디자인 패턴 입문 Part 5 Singleton · Part 6 Prototype · Part 20 Flyweight
// n: 번호(기록 저장에 쓰여요. 바꾸지 마세요), ch: 장(1 Singleton · 2 Prototype · 3 Flyweight · 4 종합), lv: 1 기초 · 2 응용 · 3 심화
// t: 'mc' 객관식(ans = 정답 보기 번호, 0부터) · 'self' 서술·코드(answer = 모범 답안, kw = 핵심 키워드)
var WGF = window.WGF = window.WGF || {};
WGF.chapters = [
 {
  "no": 1,
  "title": "Part 5 Singleton: 인스턴스를 단 하나만 만든다",
  "short": "Singleton",
  "part": "P5"
 },
 {
  "no": 2,
  "title": "Part 6 Prototype: 복사해서 인스턴스를 만든다",
  "short": "Prototype",
  "part": "P6"
 },
 {
  "no": 3,
  "title": "Part 20 Flyweight: 같은 것은 공유해서 낭비를 없앤다",
  "short": "Flyweight",
  "part": "P20"
 },
 {
  "no": 4,
  "title": "종합: 세 패턴 비교하기",
  "short": "세 패턴 비교",
  "part": "종합"
 }
];
WGF.problems = [
 {
  "n": 1,
  "ch": 1,
  "lv": 1,
  "t": "mc",
  "q": "Singleton 패턴이 보장하려는 것으로 가장 알맞은 것은?",
  "choices": [
   "어떤 클래스의 인스턴스를 복사해서 새 인스턴스를 만드는 것",
   "인스턴스를 만들 때마다 서로 다른 클래스를 고를 수 있게 하는 것",
   "같은 내용의 인스턴스를 여러 곳에서 공유해 메모리를 아끼는 것",
   "어떤 클래스의 인스턴스가 <b>반드시 1개만</b> 존재하는 것"
  ],
  "ans": 3,
  "exp": "Singleton은 '지정한 클래스의 인스턴스가 반드시 1개만 존재한다'는 것을 보장하고, 그 사실을 프로그램 상에서 표현하는 패턴이에요. ②는 Prototype, ③은 Flyweight 이야기예요."
 },
 {
  "n": 2,
  "ch": 1,
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
  "ch": 1,
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
  "ch": 1,
  "lv": 1,
  "t": "mc",
  "q": "Singleton 클래스에서 생성자를 <code>private</code>으로 만드는 이유는?",
  "choices": [
   "클래스 <b>외부에서 <code>new</code>로 인스턴스를 만들지 못하게</b> 하려고",
   "생성자를 더 빨리 실행하려고",
   "하위 클래스에서 생성자를 오버라이드하게 하려고",
   "가비지 컬렉션이 인스턴스를 지우지 못하게 하려고"
  ],
  "ans": 0,
  "exp": "생성자가 private이면 클래스 밖에서 <code>new Singleton()</code>을 쓸 때 컴파일 에러가 나요. 프로그래머가 실수하더라도 인스턴스가 하나만 생성되도록 <b>보장</b>하려는 장치예요."
 },
 {
  "n": 5,
  "ch": 1,
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
  "ch": 1,
  "lv": 1,
  "t": "mc",
  "q": "<code>getInstance()</code> 메서드가 <code>static</code>이어야 하는 이유로 알맞은 것은?",
  "choices": [
   "static이 아니면 다른 스레드에서 호출할 수 없기 때문에",
   "static 메서드만 private 생성자를 호출할 수 있기 때문에",
   "인스턴스를 아직 얻지 못한 상태에서도 <b>클래스 이름으로</b> 호출해야 하기 때문에",
   "static 메서드가 아니면 반환형을 Singleton으로 쓸 수 없기 때문에"
  ],
  "ans": 2,
  "exp": "바깥에서는 <code>new</code>를 못 하니 인스턴스가 없어요. 인스턴스 없이 부를 수 있는 건 static 메서드뿐이라 <code>Singleton.getInstance()</code>처럼 클래스 이름으로 불러요. (④ private 생성자는 같은 클래스 안이면 static이든 아니든 부를 수 있어요.)"
 },
 {
  "n": 7,
  "ch": 1,
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
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "Singleton 클래스에서 생성자를 <b>아예 쓰지 않고</b> 필드와 <code>getInstance()</code>만 두면 어떻게 되나요?",
  "choices": [
   "컴파일 에러가 나서 클래스를 쓸 수 없다",
   "생성자가 없으니 아무도 인스턴스를 만들 수 없다",
   "자동으로 private 생성자가 만들어져서 Singleton이 유지된다",
   "컴파일러가 <b>public 기본 생성자</b>를 자동으로 만들어서 바깥에서도 <code>new</code>가 가능해진다"
  ],
  "ans": 3,
  "exp": "자바는 생성자가 하나도 없으면 매개변수 없는 기본 생성자를 자동으로 넣어 줘요. 그래서 내용이 비어 있어도 <code>private Singleton() { }</code>을 <b>직접 써 두는 것 자체가 목적</b>이에요. (수업 필기: ‘왜 비어 있을까? 목적은 private을 붙이는 것 자체’)"
 },
 {
  "n": 9,
  "ch": 1,
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
  "ch": 1,
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
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "Main에서 <code>obj1 == obj2</code>로 비교하는 이유는?",
  "choices": [
   "두 인스턴스의 클래스 이름이 같은지 확인하려고",
   "두 인스턴스의 필드 값이 같은지 확인하려고",
   "equals를 오버라이드하지 않았기 때문에 어쩔 수 없이",
   "두 변수가 <b>같은 인스턴스를 가리키는지</b>(참조가 같은지) 확인하려고"
  ],
  "ans": 3,
  "exp": "<code>==</code>는 참조 비교라서 true면 <b>정말 같은 객체 하나</b>라는 뜻이에요. Singleton이 제대로 동작하는지 확인하는 가장 직접적인 방법이에요."
 },
 {
  "n": 12,
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "<code>getInstance</code>라는 메서드 이름에 대한 설명으로 옳은 것은?",
  "choices": [
   "getInstance를 부를 때마다 새 인스턴스를 만들어야 한다",
   "자바 언어 규칙상 Singleton은 반드시 getInstance라는 이름을 써야 한다",
   "getInstance는 java.lang.Object에 정의된 메서드를 오버라이드한 것이다",
   "반드시 이 이름이어야 하는 것은 아니지만, <b>유일한 인스턴스를 얻을 방법</b>은 꼭 필요하다"
  ],
  "ans": 3,
  "exp": "교안에서 getInstance는 <b>static Factory Method</b>의 일종이라고 설명해요. 이름은 자유지만 유일한 인스턴스를 얻을 통로가 있어야 해요."
 },
 {
  "n": 13,
  "ch": 1,
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
  "ch": 1,
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
  "ch": 1,
  "lv": 1,
  "t": "mc",
  "q": "Singleton 패턴의 등장인물(역할)에 대한 설명으로 옳은 것은?",
  "choices": [
   "Prototype 역과 ConcretePrototype 역이 등장한다",
   "Singleton 역과 Client 역, Factory 역이 함께 등장한다",
   "Flyweight 역과 FlyweightFactory 역이 등장한다",
   "<b>Singleton 역만</b> 등장하며, 유일한 인스턴스를 얻기 위한 static 메서드를 가진다"
  ],
  "ans": 3,
  "exp": "Singleton 패턴에는 Singleton 역만 등장해요. 이 역은 유일한 인스턴스를 얻는 static 메서드를 갖고, 이 메서드는 <b>항상 같은 인스턴스</b>를 반환해요."
 },
 {
  "n": 16,
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "교안 ‘어째서 제한할 필요가 있을까?’에서 말하는 인스턴스 수 제한의 의미로 알맞은 것은?",
  "choices": [
   "제한은 메모리를 아끼기 위한 것일 뿐 버그와는 관계없다",
   "인스턴스 수를 제한하면 무조건 실행 속도가 빨라진다",
   "제한을 둔다는 것은 <b>전제 조건을 늘린다</b>는 뜻이고, 인스턴스가 하나뿐이라는 보장이 있으면 그 전제 아래서 프로그래밍할 수 있다",
   "인스턴스가 여러 개 있으면 컴파일 에러가 나기 때문에 제한한다"
  ],
  "ans": 2,
  "exp": "인스턴스가 여러 개 존재하면 서로 영향을 미쳐 뜻밖의 버그를 만들 수 있어요. ‘하나뿐’이라는 보장이 있으면 그 전제 조건 하에서 안심하고 프로그래밍할 수 있어요."
 },
 {
  "n": 17,
  "ch": 1,
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
  "ch": 1,
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
  "ch": 1,
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
  "ch": 1,
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
  "ch": 1,
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
  "ch": 1,
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
  "ch": 1,
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
  "ch": 1,
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
  "ch": 1,
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
  "ch": 1,
  "lv": 2,
  "t": "mc",
  "q": "enum으로 Singleton을 만드는 방식의 특징으로 옳은 것은?",
  "choices": [
   "enum Singleton은 반드시 getInstance 메서드를 직접 만들어야 한다",
   "enum 상수는 JVM이 하나만 만들어 주므로 <b>유일성이 언어 차원에서 보장</b>된다",
   "enum Singleton은 메서드를 가질 수 없다",
   "enum은 new로 원하는 만큼 인스턴스를 더 만들 수 있다"
  ],
  "ans": 1,
  "exp": "교안처럼 enum의 요소는 상수로서 유일성이 보장돼요(예: <code>java.time.Month.APRIL</code>). enum은 new로 만들 수 없고, 메서드도 가질 수 있어요. 접근은 <code>Singleton.INSTANCE</code>로 해요."
 },
 {
  "n": 27,
  "ch": 2,
  "lv": 1,
  "t": "mc",
  "q": "Prototype 패턴의 핵심으로 알맞은 것은?",
  "choices": [
   "클래스에서 인스턴스를 만드는 대신 <b>인스턴스를 복사해서</b> 새 인스턴스를 만든다",
   "인스턴스를 만드는 일을 하위 클래스에 맡긴다",
   "클래스의 인스턴스를 하나만 만든다",
   "같은 인스턴스를 여러 곳에서 공유한다"
  ],
  "ans": 0,
  "exp": "prototype은 ‘원형’, ‘모범’이라는 뜻이에요. 원형이 되는 인스턴스를 바탕으로 복사해서 새 인스턴스를 만들어요. 복사기로 서류를 복사하는 것과 비슷해요."
 },
 {
  "n": 28,
  "ch": 2,
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
  "ch": 2,
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
  "ch": 2,
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
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "<code>Cloneable</code> 인터페이스가 요구하는(선언한) 메서드는?",
  "choices": [
   "<code>clone()</code> 하나",
   "<code>createCopy()</code>",
   "<code>clone()</code>과 <code>equals()</code>",
   "하나도 없다. ‘clone으로 복제를 허용한다’는 표시로만 쓰는 <b>마커 인터페이스</b>다"
  ],
  "ans": 3,
  "exp": "Cloneable 안에는 메서드가 하나도 없어요. 이렇게 표시만 하는 인터페이스를 <b>마커 인터페이스(marker interface)</b>라고 해요. 이름 때문에 clone이 들어 있을 거라 착각하기 쉬워요."
 },
 {
  "n": 32,
  "ch": 2,
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
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "교안의 <code>Product</code> 인터페이스가 <code>extends Cloneable</code>로 선언된 이유는?",
  "choices": [
   "Product를 구현한 클래스(MessageBox 등)가 <b>자동으로 Cloneable을 구현</b>하게 되어 clone으로 복제할 수 있게 하려고",
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
  "ch": 2,
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
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "<code>Manager</code> 클래스 소스에 <code>MessageBox</code>나 <code>UnderlinePen</code>이라는 클래스 이름이 전혀 나오지 않는다는 점이 중요한 이유는?",
  "choices": [
   "클래스 이름을 쓰면 clone이 동작하지 않기 때문에",
   "Manager가 framework 패키지라서 다른 패키지의 클래스를 쓸 수 없기 때문에",
   "Product·Manager가 그 클래스들과 <b>독립적으로 수정·재사용</b>될 수 있기 때문에",
   "클래스 이름을 쓰면 컴파일 속도가 느려지기 때문에"
  ],
  "ans": 2,
  "exp": "소스 코드 안에 클래스 이름을 쓰면 그 클래스와 밀접한 관계가 생겨 버려요. Manager는 <b>Product라는 인터페이스 이름만</b> 쓰기 때문에, 이 인터페이스가 Manager와 다른 클래스를 잇는 다리가 돼요."
 },
 {
  "n": 36,
  "ch": 2,
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
  "ch": 2,
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
  "ch": 2,
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
  "ch": 2,
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
  "ch": 2,
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
  "ch": 2,
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
  "ch": 2,
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
  "ch": 2,
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
  "ch": 2,
  "lv": 3,
  "t": "mc",
  "q": "교안 예제에서 <code>clone()</code>을 바로 쓰지 않고 <code>createCopy()</code>라는 메서드로 감싼 이유로 가장 알맞은 것은?",
  "choices": [
   "clone은 private이라서 아무도 호출할 수 없기 때문에",
   "Object의 clone은 <b>protected</b>라서 다른 클래스(Manager)의 요청으로 복제하려면 public 메서드로 감싸야 하기 때문에",
   "createCopy가 clone보다 깊은 복사를 해 주기 때문에",
   "clone은 Cloneable을 구현한 클래스에서만 호출할 수 있기 때문에"
  ],
  "ans": 1,
  "exp": "clone은 자신의 클래스(및 하위 클래스)에서만 호출할 수 있어요(protected). 그래서 다른 클래스가 복사를 요청하려면 createCopy 같은 별도 메서드로 clone을 감싸 줘야 해요. 이 때문에 ‘clone은 사용하기 어렵다’는 말이 나와요."
 },
 {
  "n": 45,
  "ch": 2,
  "lv": 3,
  "t": "mc",
  "q": "교안 보강 ‘clone은 사용하기 어렵다’에서 실제 Java 프로그램으로 복제 클래스를 설계할 때 권하는 방법은?",
  "choices": [
   "clone 메커니즘에 의존하지 않고 <b>복사 생성자</b>나 <b>복사 팩토리</b>를 사용한다",
   "복제가 필요하면 직렬화(Serializable)만 사용한다",
   "모든 클래스에 Cloneable을 붙이고 clone을 public으로 만든다",
   "복제 대신 Singleton으로 인스턴스를 하나만 쓴다"
  ],
  "ans": 0,
  "exp": "여러 종류의 필드를 가진 클래스를 clone으로 복제하는 건 쉽지 않아요(Object.clone이 protected 등). 그래서 복사 생성자(예: <code>MessageBox(MessageBox prototype)</code>)나 복사 팩토리를 쓰는 편이 좋다고 해요. 연습 문제 6-2가 바로 이 방식이에요."
 },
 {
  "n": 46,
  "ch": 2,
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
  "ch": 2,
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
  "ch": 2,
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
  "ch": 2,
  "lv": 2,
  "t": "mc",
  "q": "Prototype 패턴과 Flyweight 패턴을 비교한 설명으로 옳은 것은?",
  "choices": [
   "Prototype은 공유하고, Flyweight는 복사한다",
   "Prototype은 현재 인스턴스와 같은 상태의 <b>별도 인스턴스</b>를 만들고, Flyweight는 <b>하나의 인스턴스를 여러 곳에서 공유</b>한다",
   "둘 다 인스턴스를 복사해서 새로 만든다",
   "둘 다 인스턴스를 하나만 만든다"
  ],
  "ans": 1,
  "exp": "교안 Prototype 관련 패턴에 나오는 비교예요. 같은 ‘원본을 이용한다’는 점은 비슷하지만 Prototype은 <b>복사본을 따로</b> 만들고, Flyweight는 <b>같은 것을 함께 써요</b>."
 },
 {
  "n": 50,
  "ch": 2,
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
  "ch": 2,
  "lv": 3,
  "t": "mc",
  "q": "교안 ‘클래스 이름은 속박인가’의 요점으로 알맞은 것은?",
  "choices": [
   "클래스 이름은 길수록 재사용하기 좋다",
   "소스 안에 이용할 클래스 이름이 쓰여 있으면 그 클래스와 분리해 재사용할 수 없고, <b>소스(.java) 없이 .class만으로 재사용할 수 있는지</b>가 포인트다",
   "소스 코드에 클래스 이름을 쓰는 것은 항상 나쁘므로 절대 쓰면 안 된다",
   "소스를 수정해서 클래스 이름을 바꿀 수 있으면 재사용에는 아무 문제가 없다"
  ],
  "ans": 1,
  "exp": "클래스 이름을 쓰는 게 항상 나쁜 건 아니에요. 밀접하게 결합해야 하는 클래스라면 괜찮지만, <b>부품으로 독립시켜야 하는</b> 클래스의 이름이 소스에 박혀 있으면 문제예요. ‘부품으로서의 재사용’에서는 소스 수정을 고려하지 않아요."
 },
 {
  "n": 52,
  "ch": 2,
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
  "ch": 2,
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
  "ch": 3,
  "lv": 1,
  "t": "mc",
  "q": "flyweight라는 이름의 뜻과 이 패턴이 말하는 ‘무게’를 바르게 짝지은 것은?",
  "choices": [
   "가벼운 클래스 · 소스 코드 줄 수",
   "가벼운 날개 · 실행 속도",
   "파리 무게 · 파일 크기",
   "복싱에서 가장 가벼운 체급 · <b>메모리 사용량</b>"
  ],
  "ans": 3,
  "exp": "flyweight는 복싱에서 가장 체중이 가벼운 체급(플라이급)이에요. 객체를 ‘가볍게’ 만드는 패턴이고, 여기서 무게는 <b>메모리 사용량</b>이에요. 메모리를 많이 쓰면 ‘무겁다’, 적게 쓰면 ‘가볍다’고 해요."
 },
 {
  "n": 55,
  "ch": 3,
  "lv": 1,
  "t": "mc",
  "q": "Flyweight 패턴에서 사용하는 기법을 한 줄로 요약한 것은?",
  "choices": [
   "인스턴스를 만들 때마다 파일을 새로 읽는다",
   "인스턴스를 복사해서 만든다",
   "인스턴스를 최대한 <b>공유</b>하고 쓸데없이 <b>new하지 않는다</b>",
   "인스턴스를 하나만 만든다"
  ],
  "ans": 2,
  "exp": "인스턴스가 필요할 때 항상 new하는 것이 아니라, 이미 만들어진 인스턴스를 이용할 수 있다면 <b>그것을 공유해서 사용</b>하는 것이 Flyweight의 핵심이에요."
 },
 {
  "n": 56,
  "ch": 3,
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
  "ch": 3,
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
  "ch": 3,
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
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "다음 <code>getBigChar</code>의 동작 설명으로 옳은 것은?",
  "choices": [
   "pool에 있으면 복사본을 만들어 돌려준다",
   "pool에 그 문자의 BigChar가 <b>없을 때만</b> new로 만들어 등록하고, 있으면 기존 것을 돌려준다",
   "부를 때마다 새 BigChar를 만들어 pool에 덮어쓴다",
   "pool에 없으면 null을 돌려준다"
  ],
  "ans": 1,
  "exp": "<code>pool.get</code>의 반환값이 null이면 지금까지 만든 적이 없다는 뜻이라 new 후 <code>pool.put</code>으로 등록해요. null이 아니면 이미 만든 인스턴스를 그대로 반환해서 <b>공유</b>해요.",
  "code": "public synchronized BigChar getBigChar(char charname) {\n    BigChar bc = pool.get(String.valueOf(charname));\n    if (bc == null) {\n        bc = new BigChar(charname);\n        pool.put(String.valueOf(charname), bc);\n    }\n    return bc;\n}"
 },
 {
  "n": 60,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "BigCharFactory 자체를 Singleton 패턴으로 구현한 이유는?",
  "choices": [
   "getBigChar를 static으로 만들기 위해서",
   "BigCharFactory의 인스턴스(즉 pool)는 <b>하나만 존재하면 되기</b> 때문에",
   "BigChar를 하나만 만들기 위해서",
   "BigString이 BigCharFactory를 상속하기 위해서"
  ],
  "ans": 1,
  "exp": "공장이 여러 개면 pool도 여러 개라서 같은 문자의 BigChar가 공장마다 따로 생겨 공유가 깨져요. 그래서 공장은 하나면 되고, <code>getInstance()</code>는 BigCharFactory의 인스턴스(BigChar 인스턴스가 아니에요)를 얻는 메서드예요."
 },
 {
  "n": 61,
  "ch": 3,
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
  "ch": 3,
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
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "BigString 생성자의 for문을 다음처럼 바꾸면 어떻게 되나요?",
  "choices": [
   "BigChar가 <b>공유되지 않아</b> 같은 문자라도 매번 새 인스턴스가 생긴다",
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
  "ch": 3,
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
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "intrinsic한 정보와 extrinsic한 정보에 대한 설명으로 옳은 것은?",
  "choices": [
   "intrinsic = 공유 불가능, extrinsic = 공유 가능",
   "intrinsic = 외부에서 온 정보, extrinsic = 본래 갖춰진 정보",
   "둘 다 Flyweight 역이 반드시 가져야 하는 정보다",
   "intrinsic = 장소나 상황에 <b>의존하지 않아 공유 가능</b>, extrinsic = 장소나 상황에 <b>의존해서 공유 불가능</b>"
  ],
  "ans": 3,
  "exp": "intrinsic은 ‘본래 갖춰진, 본질적인’이라는 뜻으로 어디에 가져가도 변하지 않는 정보예요(공유 가능). extrinsic은 ‘외부에서 온, 비본질적인’이라는 뜻으로 배치 장소·상황에 따라 바뀌는 정보예요(공유 불가능). 표 20-2를 기억하세요."
 },
 {
  "n": 66,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "교안 예제에서 <b>extrinsic</b>한 정보에 해당하는 것은?",
  "choices": [
   "BigChar의 폰트 데이터(fontdata)",
   "그 BigChar가 BigString의 <b>몇 번째 문자인가</b>",
   "'3'이라는 문자의 # 모양",
   "BigChar가 나타내는 문자(charname)"
  ],
  "ans": 1,
  "exp": "폰트 데이터는 BigString 어디에 나와도 같으니 intrinsic이에요. 반면 ‘몇 번째 문자인가’는 BigChar의 위치에 따라 달라지므로 BigChar가 가질 수 없는 extrinsic 정보예요."
 },
 {
  "n": 67,
  "ch": 3,
  "lv": 3,
  "t": "mc",
  "q": "공유하고 있는 BigChar('3')의 fontdata를 프로그램 실행 중에 바꾸면 어떻게 되나요?",
  "choices": [
   "새 BigChar가 자동으로 복사되어 원래 것은 그대로다",
   "바꾼 BigString 하나의 '3'만 바뀐다",
   "pool에서 자동으로 지워진다",
   "그 BigChar를 쓰는 모든 BigString의 '3' 글꼴이 <b>한꺼번에</b> 바뀐다"
  ],
  "ans": 3,
  "exp": "공유에는 ‘하나를 변경한 것만으로 그것을 사용하는 모든 곳에 영향을 미친다’는 특성이 있어요. 이게 항상 나쁜 건 아니고 문제에 따라 좋을 수도 있어요. 그래서 Flyweight 역이 가질 정보는 <b>정말 여러 곳에서 공유해야 할 것만</b> 고르세요."
 },
 {
  "n": 68,
  "ch": 3,
  "lv": 3,
  "t": "mc",
  "q": "‘색이 있는 큰 문자열’을 만들려고 해요. ‘색’ 정보를 둘 곳에 대한 설명으로 옳은 것은?",
  "choices": [
   "색은 무조건 BigString에 둬야 한다",
   "색은 무조건 BigChar에 둬야 한다",
   "색 정보를 넣으면 Flyweight 패턴을 쓸 수 없다",
   "BigChar에 두면 같은 문자는 반드시 같은 색이 되고, BigString에 두면 같은 BigChar라도 위치마다 다른 색을 줄 수 있다. 어느 쪽이 옳은지는 <b>사용 목적에 달려 있다</b>"
  ],
  "ans": 3,
  "exp": "BigChar에 두면 색도 intrinsic(공유)이 되고, BigString에 두면 extrinsic(위치별)이 돼요. 이 두 방식 중 어느 쪽이 옳다고 단언할 수 없고, 무엇을 공유할지는 설계자가 잘 생각해야 해요."
 },
 {
  "n": 69,
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "‘관리되는 인스턴스는 가비지 컬렉션되지 않는다’는 말이 나오는 이유는?",
  "choices": [
   "pool(HashMap)이 BigChar를 계속 <b>참조</b>하고 있어서 BigString에서 안 쓰더라도 ‘사용 중’으로 간주되기 때문에",
   "synchronized 메서드로 만든 객체는 GC 대상이 아니기 때문에",
   "HashMap에 넣은 객체는 자바가 영원히 지우지 않도록 특별 취급하기 때문에",
   "BigChar가 static 클래스이기 때문에"
  ],
  "ans": 0,
  "exp": "가비지 컬렉터는 다른 곳에서 참조되고 있는 인스턴스를 쓰레기로 판정하지 않아요. pool이 참조를 쥐고 있으니 한 번 만든 BigChar는 계속 메모리에 남아요. 장시간 동작하거나 메모리가 적은 프로그램이라면 이 점을 기억해야 해요."
 },
 {
  "n": 70,
  "ch": 3,
  "lv": 3,
  "t": "mc",
  "q": "pool로 관리되는 BigChar를 가비지 컬렉션 대상으로 만들려면 어떻게 해야 하나요?",
  "choices": [
   "<code>delete bc;</code>로 명시적으로 지운다",
   "<code>bc.finalize()</code>를 직접 부른다",
   "HashMap에서 그 인스턴스를 포함한 <b>엔트리를 삭제</b>해 참조를 없앤다",
   "<code>System.gc()</code>만 부르면 pool에 있어도 지워진다"
  ],
  "ans": 2,
  "exp": "Java에는 new로 만든 인스턴스를 명시적으로 삭제하는 방법이 없어요. 대신 <b>참조를 없앨 수는</b> 있어요. 예를 들어 <code>pool.remove(key)</code>로 엔트리를 지우면 다른 곳에서 안 쓰는 BigChar는 쓰레기가 돼요."
 },
 {
  "n": 71,
  "ch": 3,
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
  "ch": 3,
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
  "ch": 3,
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
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "Flyweight의 관련 패턴 설명으로 옳은 것은?",
  "choices": [
   "Singleton 역의 인스턴스는 모든 곳에서 공유되므로 <b>intrinsic한 정보만</b> 가진다",
   "Composite 패턴의 Composite 역만 공유할 수 있고 Leaf 역은 공유할 수 없다",
   "FlyweightFactory 역은 절대 Singleton이 되면 안 된다",
   "Proxy 패턴은 인스턴스를 복사해서 처리 속도를 높인다"
  ],
  "ans": 0,
  "exp": "교안: Proxy는 대리인을 두어 처리 속도를 높이고, Flyweight로 Composite의 <b>Leaf 역</b>을 공유할 수 있어요. FlyweightFactory 역은 Singleton이 되는 경우가 있고, Singleton 역은 사용되는 모든 곳에서 공유되므로 intrinsic 정보만 있어요."
 },
 {
  "n": 75,
  "ch": 3,
  "lv": 1,
  "t": "mc",
  "q": "교안 ‘주의’에서 설명한 GoF 책의 역할과의 관계로 옳은 것은?",
  "choices": [
   "이 장의 Flyweight 역은 GoF 책의 <b>ConcreteFlyweight</b>에 해당하고, UnsharedConcreteFlyweight는 예제에 등장하지 않는다",
   "이 장의 Flyweight 역은 GoF 책의 UnsharedConcreteFlyweight에 해당한다",
   "이 장의 Client 역은 GoF 책의 ConcreteFlyweight다",
   "GoF 책에는 Flyweight 패턴이 없다"
  ],
  "ans": 0,
  "exp": "교안은 GoF 책과 조금 다르게 분류했어요. GoF에는 ConcreteFlyweight와 UnsharedConcreteFlyweight가 나오는데, ConcreteFlyweight가 이 장의 Flyweight예요."
 },
 {
  "n": 76,
  "ch": 3,
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
  "ch": 3,
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
  "ch": 3,
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
  "ch": 3,
  "lv": 2,
  "t": "mc",
  "q": "Flyweight를 적용하면 좋은 경우로 가장 알맞은 것은?",
  "choices": [
   "객체마다 상태가 모두 다르고 자주 바뀔 때",
   "내용이 같은 <b>무거운 객체</b>가 아주 많이 필요하고, 그 내용이 장소에 따라 변하지 않을 때",
   "원형을 복사해서 조금씩 다른 객체를 만들 때",
   "객체를 딱 하나만 만들어야 할 때"
  ],
  "ans": 1,
  "exp": "같은 것을 여러 번 new하면 메모리가 낭비돼요. 공유할 수 있는(intrinsic) 정보가 크고, 그런 객체가 많이 반복될 때 효과가 커요. 상태가 자주 바뀌는 객체를 공유하면 여러 곳에 영향을 미치니 조심해야 해요."
 },
 {
  "n": 80,
  "ch": 4,
  "lv": 1,
  "t": "mc",
  "q": "GoF 분류에서 세 패턴을 바르게 나눈 것은?",
  "choices": [
   "세 패턴 모두 생성 패턴",
   "Singleton·Prototype = <b>생성</b> 패턴, Flyweight = <b>구조</b> 패턴",
   "세 패턴 모두 행위 패턴",
   "Singleton = 구조 패턴, Prototype·Flyweight = 생성 패턴"
  ],
  "ans": 1,
  "exp": "GoF는 패턴을 생성·구조·행위로 나눠요. Singleton과 Prototype은 인스턴스를 <b>어떻게 만들지</b>를 다루는 생성 패턴이고, Flyweight는 객체를 <b>어떻게 나누고 묶어 공유할지</b>를 다루는 구조 패턴이에요."
 },
 {
  "n": 81,
  "ch": 4,
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
  "ch": 4,
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
  "ch": 4,
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
  "ch": 4,
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
  "ch": 4,
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
  "ch": 4,
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
  "ch": 4,
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
  "ch": 4,
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
  "ch": 4,
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
 }
];
