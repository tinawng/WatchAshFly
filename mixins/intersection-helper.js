export default {
    methods: {
        intersectionTrigger(target, callback = () => { }, callback_threshold = 0.8, once = true) {
            var options = {
                threshold: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0]
            };
            var observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    const threshold = entry.intersectionRatio;

                    if (threshold >= callback_threshold) {
                        callback();
                        if (once) observer.disconnect(target)
                    }
                });
            }, options);

            observer.observe(target);
        }
    }
}