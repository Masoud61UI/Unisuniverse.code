document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineHeaders = document.querySelectorAll('.timeline-header');
    
    timelineHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // فقط آیتم جاری را toggle کنید (بدون بستن سایر آیتم‌ها)
            const item = header.closest('.timeline-item');
            item.classList.toggle('active');
        });
    });
    
    // باز کردن اولین آیتم به صورت پیش‌فرض (اختیاری)
    if (timelineItems.length > 0) {
        timelineItems[0].classList.add('active');
    }
});