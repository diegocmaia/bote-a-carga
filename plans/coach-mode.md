# Plano: Modo Coach / Telão

## Problema

Coaches de CrossFit frequentemente escrevem cargas no quadro branco ou gritam os percentuais
durante o treino. Uma tela grande exibindo todas as cargas de uma só vez seria mais prático
para o box inteiro.

## Solução

Um modo de exibição otimizado para TV ou tablet, mostrando uma tabela completa de percentuais
para uma carga base específica — projetável no telão do box.

---

## Comportamento esperado

1. Botão "Modo Coach" na tela principal
2. Abre em fullscreen (ou nova aba)
3. Input de carga base no topo
4. Tabela com todos os percentuais de 50% a 100% (de 5 em 5)
5. Cada linha: `% | exato | arredondado`
6. Fonte grande, alto contraste, sem distrações

---

## UI sugerida

```
┌─────────────────────────────────────┐
│  Carga base: 100 kg                 │
├──────┬──────────┬────────────────── │
│  50% │  50.0 kg │  50.0 kg          │
│  55% │  55.0 kg │  55.0 kg          │
│  60% │  60.0 kg │  60.0 kg          │
│  ...                                │
└─────────────────────────────────────┘
```

- Linha destacada para o percentual do WOD (selecionável)
- Botão para imprimir / salvar como PDF
- URL compartilhável: `/coach?base=100&unit=kg`

---

## Esforço estimado

- Nova rota `/coach` (React Router ou página separada no Vite)
- Componente `CoachTable`
- Parâmetros via query string para compartilhar
- ~1 dia de desenvolvimento

## Dependências

- Nenhuma — pode ser feito independentemente
