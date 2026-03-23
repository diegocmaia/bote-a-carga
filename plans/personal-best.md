# Plano: Personal Best (1RM por movimento)

## Problema

Hoje o usuário precisa redigitar a carga base toda vez que abre o app.
Para quem treina com múltiplos movimentos (agachamento, terra, supino, clean…),
isso é fricção desnecessária.

## Solução

Permitir salvar o 1RM (ou carga de referência) por movimento.
Ao abrir o app, o usuário escolhe o movimento e a carga base é preenchida automaticamente.

---

## Comportamento esperado

1. Botão "Salvar como 1RM" aparece abaixo do input de carga base
2. Ao tocar, abre um modal simples: nome do movimento (texto livre ou lista) + confirma
3. O valor fica salvo com a data
4. Na próxima vez, uma lista de movimentos salvos aparece acima do input
5. Tocar num movimento preenche a carga base instantaneamente

---

## UI sugerida

- Lista horizontal de chips com os movimentos salvos (ex: `Back Squat 120kg`, `Deadlift 140kg`)
- Chip ativo fica destacado em amarelo
- Botão "+" para adicionar novo
- Pressão longa num chip abre opção de editar ou deletar

---

## Dados (localStorage)

```ts
interface PersonalBest {
  id: string          // uuid
  movement: string    // "Back Squat"
  weight: number      // em kg, sempre
  unit: 'kg' | 'lb'  // unidade original do input
  updatedAt: string   // ISO date
}
```

Chave: `bac_pbs` → array de `PersonalBest`

---

## Movimentos sugeridos para lista rápida

- Back Squat
- Front Squat
- Deadlift
- Clean
- Clean & Jerk
- Snatch
- Overhead Squat
- Strict Press
- Push Press
- Bench Press
- Thruster

O usuário pode sempre digitar livremente — a lista é só atalho.

---

## Esforço estimado

- 1 novo componente (`MovementPicker`)
- Extensão do `storage.ts`
- Sem backend, sem auth
- ~1 dia de desenvolvimento
