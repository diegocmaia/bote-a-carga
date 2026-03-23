# Plano: Migração para React Native / Expo

## Quando considerar

Quando a PWA atingir limitações reais de experiência:
- Notificações push (ex: lembrete de treino)
- Widgets na home screen
- Integração com HealthKit / Google Fit
- Distribuição via App Store / Play Store para maior alcance

A PWA é suficiente para o V1 e provavelmente para o V2.
Migrar cedo demais é desperdício.

---

## Estratégia de migração

### O que migra direto

A lógica de negócio (`src/lib/calculator.ts`, `src/lib/storage.ts`) é TypeScript puro —
sem dependências de DOM. Migra sem mudança.

### O que precisa ser reescrito

| Parte | PWA | React Native |
|---|---|---|
| UI | React + CSS | React Native components |
| Storage | `localStorage` | `@react-native-async-storage/async-storage` |
| PWA install | manifest + service worker | App Store / Play Store |
| Share | Web Share API | `expo-sharing` |
| Offline | Workbox | Funciona nativo |

### Stack sugerida

- **Expo** (managed workflow) — zero config, OTA updates, fácil deploy
- **NativeWind** para estilos (Tailwind-like, mantém a familiaridade)
- **Expo Router** para navegação (file-based, parecido com Next.js)

---

## Estrutura pós-migração sugerida

```
apps/
  web/          # PWA atual (Vite)
  native/       # Expo app
packages/
  core/         # calculator.ts, storage interface, types
  ui/           # componentes compartilháveis onde possível
```

Monorepo com Turborepo ou pnpm workspaces.

---

## Esforço estimado

- 1–2 semanas para feature parity com o V1
- Mais tempo se adicionar features nativas (notificações, widgets)

## Dependências

- Ter uma base de usuários que justifique o investimento
- Personal Best e histórico implementados (mais valor para app nativo)
