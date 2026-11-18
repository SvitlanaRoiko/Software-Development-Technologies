// Практична робота №8 — JavaScript для сторінки рецепта
const tips = [
  'Не кришіть буряк занадто дрібно — він довше зберігає колір і смак.',
  'Додайте лимонний сік до буряка, щоб борщ залишився яскраво-червоним.',
  'Дайте борщу настоятися 20 хвилин під кришкою — смак стане насиченішим.',
  'Капусту кладіть після картоплі, щоб вона залишилась трохи хрусткою.',
  'Подавайте зі сметаною, свіжою зеленню та часниковими пампушками.'
];
let servings = 6;           // змінна: кількість порцій
const baseServings = 6;     // рецепт розрахований на 6 порцій

const showBtn = document.getElementById('showBtn');
const tipBtn = document.getElementById('tipBtn');
const plusBtn = document.getElementById('plusBtn');
const minusBtn = document.getElementById('minusBtn');
const servingsEl = document.getElementById('servings');
const recipe = document.getElementById('recipe');
const messages = document.getElementById('messages');

// Динамічне створення повідомлення
function showMessage(text, extraClass) {
  messages.innerHTML = '';                       // лишаємо одне повідомлення
  const box = document.createElement('div');
  box.className = 'message ' + (extraClass || '');
  box.textContent = text;
  const close = document.createElement('button');
  close.textContent = '✕';
  close.addEventListener('click', () => box.remove());
  box.prepend(close);
  messages.append(box);
}

// 1. Кнопка «Переглянути рецепт» + вікно підтвердження
showBtn.addEventListener('click', () => {
  console.log('Натиснуто кнопку «Переглянути рецепт»');
  const ok = confirm('Бажаєте переглянути рецепт борщу?');
  console.log('Відповідь користувача:', ok);
  if (ok) {
    recipe.classList.remove('hidden');
    recipe.scrollIntoView({ behavior: 'smooth' });
    showMessage('Рецепт відкрито. Смачного!');
  } else {
    showMessage('Гаразд, рецепт залишається прихованим.');
  }
});

// 2. Кнопка «Порада» — випадкова порада
tipBtn.addEventListener('click', () => {
  const tip = tips[Math.floor(Math.random() * tips.length)];
  console.log('Порада:', tip);
  showMessage('💡 ' + tip, 'message--tip');
});

// 3. Зміна кількості порцій і перерахунок інгредієнтів
function updateServings() {
  servingsEl.textContent = servings;
  document.querySelectorAll('.amt').forEach(el => {
    const value = Number(el.dataset.base) * servings / baseServings;
    el.textContent = value >= 100 ? Math.round(value) : Math.round(value * 10) / 10;
  });
  const cards = document.querySelectorAll('.info__card strong');
  cards[1].textContent = servings;               // картка «Порцій»
}
plusBtn.addEventListener('click', () => { if (servings < 12) { servings++; updateServings(); } });
minusBtn.addEventListener('click', () => { if (servings > 1) { servings--; updateServings(); } });

// 4. Клік по інгредієнту — позначити як «куплено»
document.querySelectorAll('.ingredients li').forEach(li => {
  li.addEventListener('click', () => li.classList.toggle('done'));
});
