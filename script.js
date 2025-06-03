document.addEventListener('DOMContentLoaded', () => {
    const initialLove = document.getElementById('initialLove');
    const congratsMessage = document.getElementById('congratsMessage');
    const introSection = document.getElementById('introSection');
    const contentSection = document.getElementById('contentSection');
    const scrollIndicator = document.getElementById('scrollIndicator');
    const backgroundMusic = document.getElementById('backgroundMusic');

    // Fungsi untuk membuat partikel Bunga yang bertebaran terus menerus
    function createFloatingFlower() {
        const flower = document.createElement('div');
        flower.classList.add('floating-flower');

        const size = Math.random() * 30 + 20; // *** Diperbesar: Ukuran bunga 20px - 50px ***
        flower.style.width = `${size}px`;
        flower.style.height = `${size}px`;
        flower.style.left = `${Math.random() * 100}vw`;
        flower.style.animationDuration = `${Math.random() * 10 + 8}s`;
        flower.style.animationDelay = `${Math.random() * -10}s`;

        introSection.appendChild(flower);

        flower.addEventListener('animationend', () => {
            flower.remove();
        });
    }

    // Buat partikel Bunga yang bertebaran secara berkala
    setInterval(createFloatingFlower, 150); // *** Dipercepat: Buat setiap 150ms (sebelumnya 300ms) ***

    // Fungsi untuk membuat partikel ledakan (saat klik hati besar)
    function createExplosionParticle(x, y, type) {
        const particle = document.createElement('div');
        particle.classList.add('explosion-particle');

        if (type === 'love') {
            particle.classList.add('explosion-love');
            particle.textContent = '❤️';
            const size = Math.random() * 20 + 10;
            particle.style.fontSize = `${size}px`;
        } else { // type === 'flower'
            particle.classList.add('explosion-flower');
            const size = Math.random() * 20 + 10;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
        }

        // Posisi awal partikel
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        // Atur variabel CSS untuk pergerakan acak
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 200 + 100;
        particle.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);

        particle.style.animationDuration = `${Math.random() * 1.5 + 0.8}s`;
        particle.style.animationDelay = '0s';

        // Partikel ledakan ditempatkan di introSection
        introSection.appendChild(particle);

        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }

    // Event listener saat hati besar diklik
    initialLove.addEventListener('click', (e) => {
        // Sembunyikan hati besar
        initialLove.style.display = 'none';

        // Tampilkan container ucapan selamat
        congratsMessage.classList.remove('hidden');

        // Mainkan musik
        backgroundMusic.play().catch(error => {
            console.log("Autoplay prevented:", error);
        });

        // Buat efek ledakan partikel (campuran bunga dan love)
        const explosionCount = 50;
        const rect = initialLove.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < explosionCount; i++) {
            const type = Math.random() < 0.5 ? 'flower' : 'love';
            createExplosionParticle(centerX, centerY, type);
        }

        // Setelah animasi teks muncul, tampilkan scroll indicator dan aktifkan bagian konten.
        setTimeout(() => {
            scrollIndicator.classList.remove('hidden');
            contentSection.classList.remove('hidden');
        }, 1800);
    });

    // Opsional: Untuk mobile, tambahkan juga event listener untuk `touchstart`
    initialLove.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;

        initialLove.style.display = 'none';
        congratsMessage.classList.remove('hidden');

        backgroundMusic.play().catch(error => {
            console.log("Autoplay prevented:", error);
        });

        const explosionCount = 50;
        const rect = initialLove.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < explosionCount; i++) {
            const type = Math.random() < 0.5 ? 'flower' : 'love';
            createExplosionParticle(centerX, centerY, type);
        }

        setTimeout(() => {
            scrollIndicator.classList.remove('hidden');
            contentSection.classList.remove('hidden');
        }, 1800);
    });
});