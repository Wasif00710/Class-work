const nameInput = document.getElementById ('name');
const nameCount = document.getElementById ('nameCount');

const courseInput = document.getElementById ('course');
const batchInput = document.getElementById ('batch');
const emailInput = document.getElementById ('email');
const details = document.getElementById ('details');

const emailStatus = document.getElementById ('emailStatus');

const batchWarning = document.getElementById ('batchWarning');

const successMsg = document.getElementById ('successMsg');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

nameInput.addEventListener ('input', () => {
  nameCount.textContent = `${nameInput.value.length}/20 characters used`;
});

emailInput.addEventListener ('input', () => {
  const email = emailInput.value.trim ();
  if (email.length === 0) {
    emailStatus.textContent = '';
    return;
  }
  const valid = emailRegex.test (email);
  emailStatus.textContent = valid ? '📄✅' : '✖';
  emailStatus.style.color = valid ? 'green' : 'red';
});

batchInput.addEventListener ('input', () => {
  if (batchInput.value.trim ().length === 0) {
    batchWarning.textContent = '';
    return;
  }
  if (/^\d+$/.test (batchInput.value.trim ())) {
    batchWarning.textContent = '';
  } else {
    batchWarning.textContent = 'Batch must be a number!';
  }
});

setInterval (() => {
  document.getElementById (
    'dateTime'
  ).textContent = new Date ().toLocaleString ();
}, 1000);

document.getElementById ('studentForm').addEventListener ('submit', e => {
  e.preventDefault ();

  const name = nameInput.value.trim ();
  const course = courseInput.value.trim ();
  const batch = batchInput.value.trim ();
  const email = emailInput.value.trim ();

  if (!name || !course || !batch || !email) {
    alert ('Please fill all fields!');
    return;
  }

  if (!/^\d+$/.test (batch)) {
    alert ('Batch must be numeric!');
    batchInput.focus ();
    return;
  }

  if (!emailRegex.test (email)) {
    alert ('Invalid email format!');
    emailInput.focus ();
    return;
  }

  details.innerHTML = `
        <p><strong>Name:</strong> ${escapeHtml (name)}</p>
        <p><strong>Course:</strong> ${escapeHtml (course)}</p>
        <p><strong>Batch:</strong> ${escapeHtml (batch)}</p>
        <p><strong>Email:</strong> ${escapeHtml (email)}</p>
    `;

  details.classList.add ('show');

  successMsg.textContent = 'Information Submitted Successfully!';
  setTimeout (() => (successMsg.textContent = ''), 3000);

  [nameInput, courseInput, batchInput, emailInput].forEach (i => i.blur ());
});

document.getElementById ('clearBtn').addEventListener ('click', () => {
  document.getElementById ('studentForm').reset ();

  details.innerHTML = '';
  details.classList.remove ('show');

  nameCount.textContent = '0/20 characters used';
  emailStatus.textContent = '';
  batchWarning.textContent = '';
  successMsg.textContent = '';
});

function escapeHtml (str) {
  return str.replace (
    /[&<>"']/g,
    m =>
      ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[m])
  );
}
