import { useCallback, useEffect, useState } from 'react';
import { Species } from '@/types/species';
import { Palette, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

interface FormSelectorProps {
  species: Species[];
  selected: Species;
  onSelect: (species: Species) => void;
  onOpenBoneKey: () => void;
}

export function FormSelector({ species, selected, onSelect, onOpenBoneKey }: FormSelectorProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: false,
    loop: true,
  });
  
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelectSlide = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelectSlide();
    emblaApi.on('select', onSelectSlide);
    emblaApi.on('reInit', onSelectSlide);
    
    return () => {
      emblaApi.off('select', onSelectSlide);
      emblaApi.off('reInit', onSelectSlide);
    };
  }, [emblaApi, onSelectSlide]);

  // Sync carousel to selected species only on mount
  useEffect(() => {
    if (!emblaApi) return;
    const index = species.findIndex(s => s.id === selected.id);
    if (index !== -1) {
      emblaApi.scrollTo(index, true); // instant scroll on mount
    }
  }, [emblaApi]); // Only run when emblaApi initializes

  const handleCardClick = (s: Species) => {
    // Tapping any card confirms selection (loads model)
    onSelect(s);
  };

  const isSelected = (s: Species) => s.id === selected.id;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      <div className="bg-gradient-to-t from-background via-background/95 to-transparent pt-12 pb-6 px-4">
        {/* Title */}
        <p className="text-center text-sm text-muted-foreground tracking-widest uppercase mb-4">
          See your hand as a…
        </p>
        
        {/* Carousel */}
        <div className="relative">
          {/* Prev Button */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-secondary/80 backdrop-blur-sm flex items-center justify-center border border-border/50 hover:bg-secondary transition-colors"
            aria-label="Previous animal"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          
          {/* Carousel Container */}
          <div className="overflow-hidden mx-10" ref={emblaRef}>
            <div className="flex">
              {species.map((s, index) => (
                <div
                  key={s.id}
                  className="flex-[0_0_70%] min-w-0 px-2"
                >
                  <button
                    onClick={() => handleCardClick(s)}
                    className={`w-full px-5 py-4 rounded-xl text-center transition-all duration-300 relative ${
                      index === selectedIndex
                        ? 'bg-primary text-primary-foreground box-glow scale-100'
                        : 'bg-secondary/60 text-secondary-foreground border border-border/50 scale-95 opacity-70'
                    } ${isSelected(s) ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
                  >
                    {isSelected(s) && (
                      <span className="absolute top-2 right-2 text-xs bg-primary-foreground/20 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                    <p className="text-lg font-semibold">{s.commonName}</p>
                    <p className={`text-xs italic ${
                      index === selectedIndex ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>
                      {s.scientificName}
                    </p>
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Next Button */}
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-secondary/80 backdrop-blur-sm flex items-center justify-center border border-border/50 hover:bg-secondary transition-colors"
            aria-label="Next animal"
          >
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>
        
        {/* Dot Indicators */}
        <div className="flex justify-center gap-1.5 mt-4">
          {species.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'bg-primary w-4'
                  : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
              }`}
              aria-label={`Go to ${species[index].commonName}`}
            />
          ))}
        </div>
        
        {/* Bone Key Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={onOpenBoneKey}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/80 border border-border/50 hover:bg-secondary transition-colors"
          >
            <Palette className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">Bone Key</span>
          </button>
        </div>
      </div>
    </div>
  );
}
