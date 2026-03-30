// Simple startup connect application
document.addEventListener('DOMContentLoaded', function() {
    // Demo functionality
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.textContent.trim();
            
            if (action.includes('Explore') || action.includes('Build') || action.includes('View')) {
                alert('Demo Mode: This feature is under development. The full application includes React frontend with Node.js backend.');
            } else if (action.includes('Get Started')) {
                alert('Demo Mode: Registration system coming soon. Full version includes JWT authentication and user management.');
            } else if (action.includes('Learn More')) {
                alert('Demo Mode: Detailed information coming soon. Check the GitHub repository for complete implementation.');
            }
        });
    });

    // Add hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Count up animation for stats
    const stats = document.querySelectorAll('.stat-item h3');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace('+', ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (target >= 1000 ? '+' : '');
        }, 20);
    });
});