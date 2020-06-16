document.querySelectorAll('.toggleForm').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelector('.teacher-login').classList.toggle('hidden');
    document.querySelector('.teacher-register').classList.toggle('hidden');
  });
});
