# JavaScript — Funcionamento Interno e Fundamentos

JavaScript é uma linguagem de programação **multiparadigma**, **dinamicamente tipada**, baseada em **protótipos** e executada por engines como **V8**, **SpiderMonkey** e **JavaScriptCore**.

Embora seja frequentemente descrito como *single-threaded*, o JavaScript possui um modelo de execução que permite lidar com operações assíncronas por meio da integração entre a **JavaScript Engine**, o ambiente de execução, APIs assíncronas e o **Event Loop**.

---

## Sumário

* [1. JavaScript Engine](#1-javascript-engine)
* [2. Processo de execução](#2-processo-de-execução)
* [3. AST](#3-ast)
* [4. Compilação JIT](#4-compilação-jit)
* [5. Call Stack](#5-call-stack)
* [6. Memory Heap](#6-memory-heap)
* [7. Garbage Collector](#7-garbage-collector)
* [8. Single-Threaded](#8-single-threaded)
* [9. Event Loop](#9-event-loop)
* [10. Tasks e Microtasks](#10-tasks-e-microtasks)
* [11. Promises e async/await](#11-promises-e-asyncawait)
* [12. Concorrência e Paralelismo](#12-concorrência-e-paralelismo)
* [13. Sistema de Protótipos](#13-sistema-de-protótipos)
* [14. Prototype Chain](#14-prototype-chain)
* [15. prototype vs **proto**](#15-prototype-vs-__proto__)
* [16. Classes](#16-classes)
* [17. Escopo](#17-escopo)
* [18. Escopo Léxico](#18-escopo-léxico)
* [19. Closures](#19-closures)
* [20. Hoisting](#20-hoisting)
* [21. Temporal Dead Zone](#21-temporal-dead-zone)
* [22. Tipagem Dinâmica](#22-tipagem-dinâmica)
* [23. Tipos Primitivos](#23-tipos-primitivos)
* [24. Objetos e Referências](#24-objetos-e-referências)
* [25. Coerção de Tipos](#25-coerção-de-tipos)
* [26. == vs ===](#26--vs-)
* [27. Visão Geral da Execução](#27-visão-geral-da-execução)
* [28. Modelo Mental](#28-modelo-mental)

---

# 1. JavaScript Engine

O código JavaScript não é executado diretamente pelo processador.

Ele é processado por uma **JavaScript Engine**, responsável por analisar, executar e otimizar o código.

Algumas engines conhecidas:

| Engine         | Utilizada principalmente em |
| -------------- | --------------------------- |
| V8             | Chrome, Chromium, Node.js   |
| SpiderMonkey   | Firefox                     |
| JavaScriptCore | Safari                      |

A engine transforma o código JavaScript em uma representação que pode ser executada pelo computador.

Uma visão simplificada:

```text
Código JavaScript
       ↓
Análise léxica
       ↓
Parser
       ↓
AST
       ↓
Bytecode / representação intermediária
       ↓
Execução
       ↓
Otimizações JIT
       ↓
Código de máquina
```

> Essa representação é simplificada. Engines modernas possuem pipelines muito mais complexos e diferentes estratégias de execução e otimização.

---

# 2. Processo de execução

Quando escrevemos:

```js
const resultado = 10 + 20;

console.log(resultado);
```

a engine precisa primeiro entender a estrutura do código.

De forma simplificada:

```text
Código-fonte
     ↓
Tokenização / análise léxica
     ↓
Parser
     ↓
AST
     ↓
Bytecode / representação intermediária
     ↓
Interpretador / execução
     ↓
Otimizações JIT
```

---

# 3. AST

AST significa:

**Abstract Syntax Tree**

Em português:

**Árvore Sintática Abstrata**

O parser transforma o código em uma estrutura que representa sua organização.

Por exemplo:

```js
const x = 10 + 20;
```

pode ser representado conceitualmente como:

```text
VariableDeclaration
       │
       └── x
           │
           └── +
              ├── 10
              └── 20
```

A AST não é o código sendo executado.

Ela é uma representação estruturada daquilo que o código significa sintaticamente.

---

# 4. Compilação JIT

JIT significa:

**Just-In-Time Compilation**

Ou:

**Compilação durante a execução.**

Engines modernas de JavaScript utilizam técnicas de interpretação e compilação para executar o código de maneira eficiente.

Uma visão simplificada:

```text
JavaScript
    ↓
Parser
    ↓
Bytecode
    ↓
Interpretador
    ↓
Código frequentemente executado
    ↓
JIT Compiler
    ↓
Código de máquina otimizado
```

Imagine:

```js
function somar(a, b) {
    return a + b;
}

for (let i = 0; i < 1000000; i++) {
    somar(i, 10);
}
```

A engine pode perceber que `somar()` está sendo executada muitas vezes e que determinados padrões de tipos e operações se repetem.

A partir dessas informações, ela pode otimizar o código.

## Deoptimization

As otimizações são baseadas em informações observadas durante a execução.

Por exemplo:

```js
function multiplicar(a, b) {
    return a * b;
}
```

Durante determinado período:

```js
multiplicar(10, 20);
multiplicar(30, 40);
multiplicar(50, 60);
```

Os valores são números.

A engine pode otimizar o caminho de execução com base nesse padrão.

Porém:

```js
multiplicar("10", 20);
```

introduz um comportamento diferente.

Quando uma otimização deixa de ser válida, a engine pode realizar uma **deoptimization**, retornando para uma forma de execução apropriada.

Portanto:

> O JIT observa o comportamento do programa e pode otimizar caminhos de execução que apresentam padrões estáveis.

---

# 5. Call Stack

A **Call Stack** é a pilha utilizada para controlar a execução das funções.

Ela segue o princípio:

**LIFO — Last In, First Out**

Ou seja:

> O último elemento colocado na pilha é o primeiro a sair.

Exemplo:

```js
function terceira() {
    console.log("3");
}

function segunda() {
    terceira();
}

function primeira() {
    segunda();
}

primeira();
```

A execução ocorre:

```text
primeira()
    ↓
segunda()
    ↓
terceira()
```

A Call Stack pode ser representada assim:

```text
┌─────────────┐
│ terceira()  │ ← executando
├─────────────┤
│ segunda()   │
├─────────────┤
│ primeira()  │
└─────────────┘
```

Quando `terceira()` termina:

```text
┌─────────────┐
│ segunda()   │ ← executando
├─────────────┤
│ primeira()  │
└─────────────┘
```

Depois:

```text
┌─────────────┐
│ primeira()  │
└─────────────┘
```

Finalmente:

```text
Call Stack vazia
```

---

# 6. Stack Overflow

A Call Stack possui um limite.

Uma função que chama a si mesma indefinidamente pode fazer a pilha crescer até atingir esse limite.

```js
function executar() {
    executar();
}

executar();
```

Conceitualmente:

```text
executar()
executar()
executar()
executar()
executar()
...
```

Até ocorrer um erro semelhante a:

```text
RangeError: Maximum call stack size exceeded
```

Esse problema é conhecido como **Stack Overflow**.

---

# 7. Memory Heap

O **Memory Heap** é uma região conceitual de memória utilizada para armazenar dados alocados dinamicamente, principalmente estruturas como objetos.

Exemplo:

```js
const usuario = {
    nome: "João",
    idade: 20
};
```

Podemos representar de forma simplificada:

```text
Call Stack

usuario ───────────────┐
                       ↓
                 Memory Heap
              ┌─────────────────┐
              │ Object          │
              │ nome: "João"    │
              │ idade: 20       │
              └─────────────────┘
```

> A organização física real da memória depende da implementação da engine. Esse diagrama é um modelo didático.

---

# 8. Garbage Collector

JavaScript possui **gerenciamento automático de memória**.

O desenvolvedor normalmente não precisa liberar manualmente os objetos.

Exemplo:

```js
let usuario = {
    nome: "Carlos"
};
```

Enquanto existir uma referência acessível:

```text
usuario
   ↓
Objeto
```

o objeto continua alcançável.

Agora:

```js
usuario = null;
```

Se não existir nenhuma outra referência ao objeto:

```text
usuario → null

Objeto
   ↑
   sem referências
```

o objeto pode ser considerado não alcançável e posteriormente coletado pelo **Garbage Collector**.

## Reachability

Um conceito importante é:

**Reachability = alcançabilidade**

Simplificando:

```text
Raízes
  ↓
Objetos alcançáveis
  ↓
Outros objetos alcançáveis
```

Se um objeto não pode mais ser alcançado a partir das raízes, ele pode ser candidato à coleta.

Implementações modernas utilizam estratégias sofisticadas, incluindo técnicas de marcação, coleta geracional e outras otimizações.

---

# 9. Single-Threaded

É comum dizer:

> JavaScript é single-threaded.

Essa frase precisa de contexto.

O código JavaScript tradicional executado na thread principal possui um modelo de execução single-threaded.

Isso significa que, em determinado contexto de execução, existe uma única sequência principal de execução do JavaScript.

Porém, o ambiente completo pode possuir várias threads.

Por exemplo:

```text
                 Navegador
                     │
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
 JavaScript       Web APIs     Renderização
   Thread
```

O navegador pode realizar outras atividades fora da thread principal.

Por isso:

> Single-threaded não significa que o computador inteiro possui apenas uma thread.

---

# 10. Event Loop

O **Event Loop** é uma parte fundamental do modelo assíncrono do JavaScript.

Ele permite coordenar:

* execução síncrona;
* callbacks;
* Promises;
* eventos;
* timers;
* operações de I/O;
* outras tarefas assíncronas fornecidas pelo ambiente.

Uma visão simplificada:

```text
             ┌──────────────┐
             │  Call Stack  │
             └──────┬───────┘
                    │
                    ↓
             ┌──────────────┐
             │  Event Loop  │
             └──────┬───────┘
                    │
          ┌─────────┴─────────┐
          ↓                   ↓
   Microtask Queue          Tasks
```

O Event Loop participa da coordenação entre a execução atual e tarefas que estão prontas para continuar.

---

# 11. Tasks e Microtasks

Existe uma diferença importante entre **microtasks** e **tasks**.

## Microtasks

São utilizadas, entre outras coisas, para continuações de Promises:

```js
Promise.resolve().then(() => {
    console.log("Microtask");
});
```

Também existe:

```js
queueMicrotask(() => {
    console.log("Microtask");
});
```

## Tasks

Timers e eventos são exemplos de tarefas que o ambiente pode colocar em suas filas de execução.

Por exemplo:

```js
setTimeout(() => {
    console.log("Task");
}, 0);
```

---

## Exemplo

```js
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

Promise.resolve().then(() => {
    console.log("C");
});

console.log("D");
```

Resultado:

```text
A
D
C
B
```

Primeiro são executadas as operações síncronas:

```text
A
D
```

Depois, as microtasks pendentes:

```text
C
```

E então uma task como o callback do timer pode ser executada:

```text
B
```

Uma visão simplificada:

```text
Código síncrono
      ↓
Microtasks
      ↓
Próxima task
      ↓
Microtasks
      ↓
Próxima task
```

> A especificação do ambiente possui detalhes adicionais sobre renderização, filas e diferentes tipos de tarefas. O modelo acima é uma simplificação para estudo.

---

# 12. Promises e async/await

`async/await` não cria automaticamente uma nova thread.

Exemplo:

```js
async function buscarDados() {
    const resposta = await fetch("/dados");

    return resposta.json();
}
```

Quando a execução chega ao:

```js
await
```

a função pode ser suspensa enquanto aguarda a resolução da Promise.

Conceitualmente:

```text
async function
      ↓
executa
      ↓
await
      ↓
função é suspensa
      ↓
operação assíncrona continua no ambiente
      ↓
Promise resolve
      ↓
continuação é agendada
      ↓
função continua
```

Por isso, `await` não significa:

> "crie uma nova thread".

Ele faz parte do mecanismo de programação assíncrona baseado em Promises.

---

# 13. Concorrência e Paralelismo

Esses dois conceitos não são iguais.

## Concorrência

Significa que diferentes tarefas podem progredir de maneira intercalada.

```text
Tarefa A → pausa → Tarefa B → pausa → Tarefa A
```

## Paralelismo

Significa execução simultânea em diferentes unidades de processamento.

```text
CPU 1 → Tarefa A

CPU 2 → Tarefa B
```

O Event Loop permite lidar com concorrência sem que vários trechos de JavaScript sejam executados simultaneamente na mesma thread principal.

Para paralelismo real, ambientes JavaScript oferecem mecanismos como:

* Web Workers;
* Worker Threads no Node.js.

---

# 14. Sistema de Protótipos

JavaScript possui um modelo de objetos baseado em **protótipos**.

Cada objeto possui uma ligação interna com outro objeto, seu protótipo.

Exemplo:

```js
const pessoa = {
    falar() {
        console.log("Olá");
    }
};

const joao = Object.create(pessoa);

joao.falar();
```

`joao` não possui diretamente o método `falar`.

O mecanismo de busca encontra o método através do protótipo.

Conceitualmente:

```text
joao
 ↓
pessoa
 ↓
Object.prototype
 ↓
null
```

---

# 15. Prototype Chain

Quando acessamos:

```js
joao.falar();
```

o JavaScript procura a propriedade `falar`.

A busca pode ser representada como:

```text
joao
  │
  ├── possui "falar"? NÃO
  ↓
pessoa
  │
  ├── possui "falar"? SIM
  ↓
executa método
```

Se não encontrar:

```text
joao
 ↓
pessoa
 ↓
Object.prototype
 ↓
null
```

Se chegar a `null` sem encontrar a propriedade, o resultado da busca é `undefined` para uma leitura de propriedade.

Essa estrutura é chamada de:

**Prototype Chain**

ou:

**Cadeia de Protótipos.**

---

# 16. prototype vs **proto**

Esses dois conceitos são frequentemente confundidos.

## `__proto__`

Está relacionado ao protótipo de um objeto.

Exemplo:

```js
const pessoa = {};

pessoa.__proto__;
```

`__proto__` é uma forma historicamente conhecida de acessar o protótipo, mas APIs como `Object.getPrototypeOf()` e `Object.setPrototypeOf()` são preferíveis para operações explícitas com protótipos.

## `prototype`

Funções construtoras possuem uma propriedade chamada `prototype`.

Exemplo:

```js
function Pessoa(nome) {
    this.nome = nome;
}

Pessoa.prototype.falar = function () {
    console.log("Olá");
};
```

Quando fazemos:

```js
const joao = new Pessoa("João");
```

o objeto criado possui uma ligação prototípica com:

```js
Pessoa.prototype
```

Conceitualmente:

```text
joao
 ↓
Pessoa.prototype
 ↓
Object.prototype
 ↓
null
```

---

# 17. Classes

JavaScript possui a palavra-chave:

```js
class
```

Exemplo:

```js
class Pessoa {
    falar() {
        console.log("Olá");
    }
}
```

Podemos criar uma instância:

```js
const pessoa = new Pessoa();

pessoa.falar();
```

Apesar da sintaxe lembrar linguagens como Java e C++, o modelo de objetos do JavaScript continua baseado em protótipos.

Os métodos definidos na classe são associados ao protótipo.

Conceitualmente:

```text
pessoa
   ↓
Pessoa.prototype
   ↓
Object.prototype
   ↓
null
```

Portanto:

> `class` fornece uma sintaxe de alto nível para trabalhar com objetos e herança, mas o mecanismo fundamental de herança de objetos do JavaScript continua sendo prototípico.

---

# 18. Escopo

**Escopo** determina onde uma variável pode ser acessada.

JavaScript possui diferentes tipos de escopo.

Entre os principais:

* escopo global;
* escopo de função;
* escopo de bloco.

## `let` e `const`

Possuem escopo de bloco:

```js
if (true) {
    let nome = "João";
}

console.log(nome);
```

A variável `nome` não está disponível fora do bloco.

Conceitualmente:

```text
Global
  │
  └── if
       └── nome
```

## `var`

Possui escopo de função:

```js
function teste() {
    if (true) {
        var nome = "João";
    }

    console.log(nome);
}
```

Nesse caso funciona porque `var` não é limitado ao bloco `if`.

---

# 19. Escopo Léxico

JavaScript utiliza **lexical scoping**.

Isso significa que o acesso às variáveis é determinado principalmente pela estrutura léxica em que o código foi escrito.

Exemplo:

```js
const nome = "Global";

function externa() {
    const nome = "Externa";

    function interna() {
        console.log(nome);
    }

    interna();
}

externa();
```

Resultado:

```text
Externa
```

A função `interna()` consegue acessar `nome` do escopo onde foi criada.

---

# 20. Closures

Uma **closure** ocorre quando uma função mantém acesso ao ambiente léxico onde foi criada, mesmo quando executada fora daquele contexto original.

Exemplo:

```js
function criarContador() {
    let contador = 0;

    return function () {
        contador++;

        return contador;
    };
}

const contador = criarContador();

console.log(contador());
console.log(contador());
console.log(contador());
```

Resultado:

```text
1
2
3
```

A função retornada continua tendo acesso a:

```js
contador
```

mesmo depois que `criarContador()` terminou.

Conceitualmente:

```text
criarContador()
      │
      ├── contador = 0
      │
      └── função retornada
                │
                └── mantém acesso a contador
```

Closures são muito utilizadas em:

* encapsulamento;
* callbacks;
* funções de fábrica;
* módulos;
* programação funcional;
* gerenciamento de estado.

---

# 21. Hoisting

**Hoisting** é um termo utilizado para descrever comportamentos relacionados à criação das declarações antes da execução normal das instruções.

Exemplo:

```js
console.log(nome);

var nome = "João";
```

Podemos entender aproximadamente como:

```js
var nome;

console.log(nome);

nome = "João";
```

Resultado:

```text
undefined
```

É importante entender que isso é uma explicação conceitual, e não significa literalmente que o código foi fisicamente movido para o topo.

---

# 22. Temporal Dead Zone

`let` e `const` possuem um comportamento diferente de `var`.

Exemplo:

```js
console.log(nome);

let nome = "João";
```

Resultado:

```text
ReferenceError
```

Isso ocorre devido à chamada:

**Temporal Dead Zone (TDZ)**

Durante determinado período do escopo, o binding existe, mas não pode ser acessado antes de sua inicialização.

Conceitualmente:

```text
Início do escopo
      ↓
Temporal Dead Zone
      ↓
let nome = "João"
      ↓
nome pode ser utilizado
```

Por isso, dizer simplesmente:

> "`let` e `const` não sofrem hoisting"

é uma simplificação.

É mais preciso dizer que suas declarações são processadas de maneira diferente de `var` e permanecem inacessíveis durante a TDZ até a inicialização.

---

# 23. Tipagem Dinâmica

JavaScript possui **tipagem dinâmica**.

Uma variável pode receber valores de diferentes tipos ao longo da execução:

```js
let valor = 10;

valor = "dez";

valor = true;

valor = {
    ativo: true
};
```

A variável não fica permanentemente presa ao primeiro tipo que recebeu.

É o valor que possui um tipo.

---

# 24. Tipos Primitivos

JavaScript possui sete tipos primitivos:

```text
String
Number
BigInt
Boolean
Undefined
Null
Symbol
```

Exemplos:

```js
"Olá"        // String
42           // Number
42n          // BigInt
true         // Boolean
undefined    // Undefined
null         // Null
Symbol("id") // Symbol
```

## Uma peculiaridade do `null`

```js
typeof null;
```

retorna:

```text
"object"
```

Isso é uma peculiaridade histórica da linguagem.

O valor `null` é um valor primitivo, apesar do resultado de `typeof`.

---

# 25. Objetos e Referências

Objetos possuem comportamento diferente dos valores primitivos.

Exemplo:

```js
const pessoa1 = {
    nome: "João"
};

const pessoa2 = pessoa1;
```

Agora:

```js
pessoa2.nome = "Maria";
```

Se fizermos:

```js
console.log(pessoa1.nome);
```

teremos:

```text
Maria
```

Isso ocorre porque ambas as variáveis referenciam o mesmo objeto.

Conceitualmente:

```text
pessoa1 ─────┐
             ↓
        ┌──────────────┐
        │ nome: Maria  │
        └──────────────┘
             ↑
pessoa2 ─────┘
```

---

# 26. Coerção de Tipos

JavaScript pode converter valores automaticamente durante determinadas operações.

Isso é chamado de:

**Type Coercion**

Exemplo:

```js
"5" + 2;
```

Resultado:

```text
"52"
```

Já:

```js
"5" - 2;
```

Resultado:

```text
3
```

Outro exemplo:

```js
"10" * 2;
```

Resultado:

```text
20
```

Isso acontece porque os operadores possuem regras específicas para conversão e operação.

O operador `+`, por exemplo, pode representar tanto adição numérica quanto concatenação de strings.

---

# 27. == vs ===

Existem dois operadores de igualdade muito importantes.

## Igualdade abstrata: `==`

Pode realizar coerção de tipos.

```js
5 == "5";
```

Resultado:

```text
true
```

## Igualdade estrita: `===`

Não realiza a mesma coerção de tipos da igualdade abstrata.

```js
5 === "5";
```

Resultado:

```text
false
```

Podemos resumir:

```text
==   → igualdade com regras de coerção
===  → igualdade estrita
```

Em código moderno, `===` é frequentemente utilizado para deixar a intenção mais explícita e evitar conversões implícitas inesperadas.

---

# 28. Visão Geral da Execução

Agora podemos juntar os principais conceitos.

Considere:

```js
async function buscar() {
    const resposta = await fetch("/dados");

    return resposta.json();
}

buscar();
```

Uma representação simplificada seria:

```text
                  JavaScript
                      │
                      ↓
               JavaScript Engine
                      │
                      ↓
                 Parser / AST
                      │
                      ↓
              Bytecode / execução
                      │
                      ↓
                  Call Stack
                      │
                      ↓
                  buscar()
                      │
                      ↓
                    await
                      │
                      ↓
             Operação assíncrona
                      │
                      ↓
              Ambiente externo
                      │
                      ↓
               Promise resolvida
                      │
                      ↓
               Microtask Queue
                      │
                      ↓
                 Event Loop
                      │
                      ↓
                  Call Stack
                      │
                      ↓
             Continuação de buscar()
```

Enquanto isso, a engine também gerencia memória:

```text
Call Stack
    │
    ↓
Execução

Memory Heap
    │
    ↓
Objetos / estruturas

Garbage Collector
    │
    ↓
Objetos não alcançáveis
```

E os objetos utilizam a cadeia de protótipos:

```text
Objeto
  ↓
Prototype
  ↓
Prototype
  ↓
Object.prototype
  ↓
null
```

As funções, por sua vez, podem manter ambientes através de closures:

```text
Função
  ↓
Escopo Léxico
  ↓
Variáveis externas
  ↓
Closure
```

---

# 29. Modelo Mental

Uma forma útil de memorizar tudo é dividir o JavaScript em camadas.

```text
┌──────────────────────────────────────────────┐
│              CÓDIGO JAVASCRIPT               │
└───────────────────────┬──────────────────────┘
                        ↓
                JAVASCRIPT ENGINE
                        │
          ┌─────────────┼─────────────┐
          ↓             ↓             ↓
       Parser         Memory       Execution
          │             │             │
          ↓             ↓             ↓
         AST           Heap       Call Stack
                        │
                        ↓
                 Garbage Collector

                        ↓
                AMBIENTE RUNTIME
              ┌─────────┴─────────┐
              ↓                   ↓
           Browser              Node.js
              │                   │
           Web APIs            Node APIs
              │                   │
              └─────────┬─────────┘
                        ↓
                   Event Loop
                        │
              ┌─────────┴─────────┐
              ↓                   ↓
         Microtasks             Tasks
              │                   │
              └─────────┬─────────┘
                        ↓
                   Call Stack
```

## Os principais conceitos

```text
JavaScript
│
├── Engine
│   ├── Parser
│   ├── AST
│   ├── Bytecode
│   ├── JIT
│   └── Garbage Collector
│
├── Execução
│   └── Call Stack
│
├── Memória
│   └── Memo
```
