document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get values
            const name = document.getElementById('name').value;
            const whatsapp = document.getElementById('whatsapp').value;
            const profile = document.querySelector('input[name="perfil"]:checked').value;
            
            let message = `*Novo Contato via Site Just Go Market*\n\n`;
            message += `*Nome:* ${name}\n`;
            message += `*WhatsApp:* ${whatsapp}\n`;
            message += `*Perfil:* ${profile === 'sindico' ? 'Síndico' : 'Morador'}\n`;

            if (profile === 'sindico') {
                const condoName = document.getElementById('condoName').value;
                const unitCount = document.getElementById('unitCount').value;
                message += `*Condomínio:* ${condoName}\n`;
                message += `*Unidades:* ${unitCount}\n`;
            } else {
                const referral = document.getElementById('referral').value;
                message += `*Indicação:* ${referral}\n`;
            }

            // Encode and open WhatsApp
            const encodedMessage = encodeURIComponent(message);
            const phoneNumber = '5561999918007'; // Target number
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');
        });
    }
});
