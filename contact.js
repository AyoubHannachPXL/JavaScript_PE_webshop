const form = document.getElementById('contact-form');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.querySelectorAll('input').forEach(input => input.value = '');
    form.querySelectorAll('textarea').forEach(input => input.value = '');
    alert("Je bericht is succesvol verzonden! We contacteren je zo snel mogelijk.");
});