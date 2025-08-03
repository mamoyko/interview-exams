async function getCount() {
  const res = await fetch('/count');
  const data = await res.json();
  return data.count;
}

async function setCount(value) {
  const res = await fetch('/increment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value })
  });

  if (!res.ok) {
    const err = await res.json();
    alert(err.error);
    return null;
  }

  const data = await res.json();
  return data.count;
}

async function refreshDisplay() {
  const count = await getCount();
  document.getElementById('count-display').textContent = `Count: ${count}`;
}

async function increment() {
  const newCount = await setCount(1);
  if (newCount !== null) {
    document.getElementById('count-display').textContent = `Count: ${newCount}`;
  }
}

async function multiply() {
  const currentCount = await getCount();
  const multiplier = parseInt(document.getElementById('multiplier').value, 10);

  if (isNaN(multiplier)) {
    alert('Multiplier must be a number');
    return;
  }

  const incrementBy = currentCount * (multiplier - 1);
  const newCount = await setCount(incrementBy);

  if (newCount !== null) {
    document.getElementById('count-display').textContent = `Count: ${newCount}`;
  }
}

refreshDisplay();
