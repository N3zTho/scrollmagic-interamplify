document.addEventListener("DOMContentLoaded", function () {
    alert('ad')
    var controller = new ScrollMagic.Controller();

    var tween = TweenMax.fromTo(
        "#block-rank",
        0.5,
        { opacity: 0 },
        { opacity: 1 }
    );

    new ScrollMagic.Scene({
        triggerElement: "#trigger-rank",
        duration: 2000,
        triggerHook: 0.9,
    })
        .setTween(tween)
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#trigger-rank",
        duration: 2000,
        triggerHook: 0,
    })
        .setPin("#bg-rank")
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#trigger-rank",
        duration: 2000,
        triggerHook: 0,
    })
        .setPin("#backgrdop-rank")
        .addTo(controller);

    var $text = document.querySelector("#text-rank p");
    var myText = $text.innerText;
    var myTextLength = myText.length;
    $text.innerHTML = "";

    function typing(displayedLength) {
        if (displayedLength <= myTextLength) {
            $text.innerHTML = myText.substring(0, displayedLength);
        }
    }

    var typewritingOnScroll = new TimelineMax();

    var typewritingScene = new ScrollMagic.Scene({
        triggerElement: "#trigger-rank",
        duration: 2000,
        triggerHook: 0.2,
    })
        .on("progress", function () {
            let scrollProgress = Math.ceil(
                typewritingScene.progress() * myTextLength
            );
            typing(scrollProgress);
        })
        .setPin("#grid-rank", { pushFollowers: true })
        .setTween(typewritingOnScroll)
        .addTo(controller);

    var $weRankBig = document.querySelector("#we-rank-big");
    var timeScroll = new TimelineMax().add([
        TweenMax.to("#grid-rank .we-rank", 1, {
            left: "66%",
            ease: Linear.easeNone,
        }),
        TweenMax.to("#grid-rank .we-rank", 1, {
            top: "50%",
            ease: Linear.easeNone,
        }),
        TweenMax.to("#grid-rank .we-rank", 1, { scale: 1.6 }),
    ]);

    new ScrollMagic.Scene({
        triggerElement: "#trigger-scaling",
        duration: 600,
        triggerHook: 1,
    })
        .setPin("#grid-rank", { pushFollowers: false })
        .setTween(timeScroll)
        .addTo(controller);

    var timeBig = new TimelineMax().add([
        TweenMax.to("#grid-rank", 0.1, { opacity: 0 }),
        TweenMax.to("#we-rank-big", 0.1, { opacity: 1 }),
    ]);

    new ScrollMagic.Scene({
        triggerElement: "#block-scaling",
        duration: 50,
        triggerHook: 0.4,
    })
        .setTween(timeBig)
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#block-scaling",
        triggerHook: 0.05,
    }).setClassToggle("#scaling-col-business", "hidden");

    let $ray = document.querySelector("#scaling-ray");
    let $scalingTopics = document.querySelectorAll(".scaling-topic");
    let $light = document.querySelector("#scaling-light");

    let blockScalingScene = new ScrollMagic.Scene({
        triggerElement: "#block-scaling",
        duration: 3000,
        triggerHook: 0.05,
    })
        .setPin("#block-scaling")
        .on("progress", function () {
            let progress = blockScalingScene.progress();
            let percent = progress * 100;

            let index = Math.floor(Math.floor((progress - 0.05) * 10) / 3);
            index =
                index >= $scalingTopics.length
                    ? $scalingTopics.length - 1
                    : index;
            $scalingTopics.forEach(($item) => $item.classList.remove("active"));
            $scalingTopics.item(index)?.classList?.add("active");

            $ray.style.height = `${percent}%`;
            $light.style.top = `calc(${percent}% - 20px)`;
        })
        .addTo(controller);
});
