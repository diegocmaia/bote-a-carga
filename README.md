# Bote a Carga

Calculadora de percentuais para treino — CrossFit e musculação.

PWA mobile-first. Sem login. Sem onboarding. Funciona offline.

---

## O que faz

- Digite sua carga base (1RM ou carga de referência)
- Escolha um percentual (botões rápidos ou valor livre)
- Vê na hora:
  - Carga exata
  - Carga arredondada (pronta pra montar no rack)
  - Distribuição de anilhas por lado

---

## Stack

- React 19 + Vite 8 + TypeScript
- PWA via `vite-plugin-pwa` (Workbox)
- Zero backend — tudo em localStorage
- Deploy: Vercel

---

## Rodando localmente

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build de produção → dist/
npm run preview    # preview do build
```

---

## Estrutura

```
src/
  App.tsx           # componente principal + UI
  App.css           # estilos
  lib/
    calculator.ts   # lógica de cálculo (percentual, arredondamento, anilhas)
    storage.ts      # leitura/escrita em localStorage
plans/              # roadmap de funcionalidades futuras
```

---

## Configurações

Acessíveis pelo ícone de engrenagem:

| Configuração | Opções |
|---|---|
| Peso da barra | 20 kg, 15 kg, 45 lb, 35 lb, personalizado |
| Arredondamento | 1 / 2.5 / 5 (na unidade ativa) |
| Modo de arredondamento | Mais próximo / Para cima / Para baixo |

A seleção da barra (feminina 15 kg / masculina 20 kg) também aparece diretamente na seção de anilhas.

---

## Deploy

O projeto está configurado para deploy automático via Vercel. Basta conectar o repositório — o Vercel detecta o Vite automaticamente.

Variáveis de ambiente necessárias: nenhuma.
