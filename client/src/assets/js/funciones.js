 
 function myFunction(){
// Obtener referencia al botón
const backToTopBtn = document.getElementById('backToTopBtn');

// Mostrar u ocultar el botón según el desplazamiento de la página
window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// Agregar evento clic para desplazar hacia arriba al hacer clic en el botón
backToTopBtn.addEventListener('click', () => {
    document.body.scrollTop = 0; // Para navegadores Safari
    document.documentElement.scrollTop = 0; // Para otros navegadores
});
 }
 