document.getElementById('btn').onclick = function showMenu() {
    this.classList.toggle('active');
    document.querySelector('.sidebar').classList.toggle('showSidebar');
}