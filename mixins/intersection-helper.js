export default {
    methods: {
        intersectionTrigger(target, callback = () => { }, callback_threshold = 0.8) {
            var options = {
                threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
            };
            var observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    const threshold = entry.intersectionRatio;

                    if (threshold >= callback_threshold) callback();
                });
            }, options);

            observer.observe(target);
        }
    }
}