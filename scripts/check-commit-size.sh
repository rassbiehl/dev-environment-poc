
WARNING_LINES=300
MAX_LINES=500

CHANGED_LINES=$(git diff --cached --numstat -- . ':!package-lock.json' ':!**/package-lock.json' | awk '
  $1 ~ /^[0-9]+$/ && $2 ~ /^[0-9]+$/ {
    total += $1 + $2
  }
  END { print total + 0 }
')

if [ "$CHANGED_LINES" -gt "$MAX_LINES" ]; then
  echo "WARNING: Large commit ($CHANGED_LINES changed lines). Consider splitting it."
elif [ "$CHANGED_LINES" -ge "$WARNING_LINES" ]; then
  echo "WARNING: Commit approaching recommended size ($CHANGED_LINES changed lines)."
fi

exit 0