#!/usr/bin/env bash
# Formate avec Prettier le fichier qui vient d'être édité (no-op si rien n'est dispo).
#
# Hook PostToolUse appelé après Edit/Write/MultiEdit. Il est volontairement
# DÉFENSIF : à chaque étape, si une condition n'est pas remplie (pas de fichier,
# extension non gérée, pas de package.json, pas de pnpm, échec Prettier), il sort
# proprement avec le code 0 sans bloquer ni polluer la sortie de Claude Code.
#
# Contrat d'I/O : Claude Code transmet le payload du hook sur STDIN au format JSON.
# On en extrait `tool_input.file_path`. Aucune écriture sur STDOUT en cas normal
# (les éventuels messages de Prettier sont redirigés vers /dev/null).
set -euo pipefail

# 1) Récupérer le chemin du fichier édité depuis le JSON reçu sur STDIN.
#    `|| true` garantit qu'une absence de python3 / un JSON malformé n'avorte pas le hook.
file="$(python3 -c 'import sys,json; d=json.load(sys.stdin); print(d.get("tool_input",{}).get("file_path",""))' 2>/dev/null || true)"

# 2) Pas de fichier détecté -> rien à faire.
[ -z "${file:-}" ] && exit 0

# 3) Ne formater que les extensions prises en charge par Prettier dans ce projet.
case "$file" in
  *.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs|*.json|*.css|*.md) ;;
  *) exit 0 ;;
esac

# 4) Pas de projet Node à la racine -> on n'a pas de Prettier à invoquer.
[ -f package.json ] || exit 0

# 5) pnpm absent -> no-op (le projet utilise pnpm comme gestionnaire).
command -v pnpm >/dev/null 2>&1 || exit 0

# 6) Formater. `|| true` : un échec de Prettier (config absente, fichier non parseable)
#    ne doit jamais faire échouer le hook ni l'édition en cours.
pnpm exec prettier --write "$file" >/dev/null 2>&1 || true
exit 0