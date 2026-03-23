# Plano: Biblioteca de Movimentos

## Problema

Depende do plano de Personal Best para ter valor real.
Sem uma lista consistente de movimentos, o usuário cria entradas duplicadas
("back squat", "Back Squat", "Agachamento") e perde o histórico.

## Solução

Uma lista curada de movimentos com nomes canônicos em PT-BR e EN.
Usada como autocomplete no input de movimento — não como navegação obrigatória.

---

## Comportamento esperado

1. Ao digitar o nome de um movimento, sugestões aparecem abaixo do campo
2. Selecionar uma sugestão preenche o nome canônico
3. O usuário ainda pode salvar um nome completamente livre

---

## Estrutura de dados

```ts
interface Movement {
  id: string
  namePt: string      // "Agachamento Costas"
  nameEn: string      // "Back Squat"
  aliases: string[]   // ["squat", "back squat", "agachamento"]
  category: 'squat' | 'hinge' | 'press' | 'pull' | 'olympic' | 'other'
}
```

A busca funciona sobre `namePt + nameEn + aliases` case-insensitive.

---

## Categorias

| Categoria | Exemplos |
|---|---|
| Squat | Back Squat, Front Squat, Overhead Squat |
| Hinge | Deadlift, Romanian Deadlift, Good Morning |
| Press | Strict Press, Push Press, Bench Press, Jerk |
| Pull | Pull-up (weighted), Pendlay Row |
| Olympic | Clean, Snatch, Clean & Jerk, Power Clean |
| Other | Thruster, Farmer Carry, Atlas Stone |

---

## Esforço estimado

- Arquivo estático `src/data/movements.ts`
- Componente `MovementAutocomplete`
- Nenhuma dependência externa necessária
- ~0.5 dia (a maior parte é montar a lista de movimentos)

## Dependências

- Implementar junto com ou após Personal Best
