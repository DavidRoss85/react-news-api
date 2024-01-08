import React, { useState } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption, } from 'reactstrap';

//prop.items is an array. Each object contains src, altText, caption

const SlideShow = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const { items, interval, fade, className, slide, pause, dark, showControls, showIndicator, showCaption } = props;

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = items.map((item, idx) => {
        let { src, altText, caption, title, url } = item;
        if (!caption) caption = "";
        return (
            <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={idx} >
                <a href={url}>
                    <img src={src} alt={altText} />
                    {showCaption && (<CarouselCaption captionText={caption} captionHeader={title} />)}
                </a>
            </CarouselItem>
        );
    });

    return (
        <>
            <Carousel activeIndex={activeIndex} next={next} previous={previous} interval={interval} fade={fade} className={className} slide={slide} pause={pause} dark={dark} >

                {showIndicator && (<CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />)}
                {slides}

                {showControls && (
                    <div>
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                    </div>
                )}
            </Carousel>
        </>
    );
}

export default SlideShow;