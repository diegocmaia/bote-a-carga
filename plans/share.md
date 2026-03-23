# Plano: Compartilhar Treino via Link

## Problema

Coaches mandam o WOD no WhatsApp do grupo. Seria útil poder compartilhar
um link que já abre o app com a carga e o percentual pré-preenchidos.

## Solução

Codificar o estado da calculadora na URL. Sem backend.

---

## Comportamento esperado

1. Botão "Compartilhar" aparece quando há resultado calculado
2. Gera uma URL do tipo: `https://boteacarga.app/?b=100&u=kg&p=75`
3. Abre o share sheet nativo do celular (Web Share API)
4. Fallback: copia a URL para o clipboard
5. Quem abre o link vê o app já preenchido com aqueles valores

---

## Parâmetros de URL

| Param | Significado | Exemplo |
|---|---|---|
| `b` | base weight | `100` |
| `u` | unit | `kg` ou `lb` |
| `p` | percentage | `75` |

---

## Implementação

```ts
// Gerar link
const params = new URLSearchParams({ b: base, u: unit, p: pct.toString() })
const url = `${location.origin}/?${params}`
navigator.share({ url }) // ou navigator.clipboard.writeText(url)

// Ler link ao carregar
const params = new URLSearchParams(location.search)
const base = params.get('b')
const pct = params.get('p')
```

---

## Esforço estimado

- ~2 horas
- Sem dependências externas
- Web Share API tem boa cobertura em mobile

## Dependências

- Nenhuma — pode ser feito agora
