import { Species } from '@/types/species';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { Badge } from '@/components/ui/badge';

interface AnimalDetailDrawerProps {
  species: Species | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AnimalDetailDrawer({ species, isOpen, onClose }: AnimalDetailDrawerProps) {
  if (!species) return null;

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="text-left pb-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DrawerTitle className="text-2xl font-bold text-foreground">
                {species.commonName}
              </DrawerTitle>
              <DrawerDescription className="text-base italic text-muted-foreground">
                {species.scientificName}
              </DrawerDescription>
            </div>
            <Badge variant="secondary" className="shrink-0 mt-1">
              {species.group}
            </Badge>
          </div>
          
          {species.timePeriod && (
            <p className="text-sm text-muted-foreground mt-2">
              {species.timePeriod}
            </p>
          )}
        </DrawerHeader>
        
        <div className="px-4 pb-8 space-y-6">
          {/* Why it matters */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
              Why it matters
            </h3>
            <p className="text-foreground leading-relaxed">
              {species.whyItMatters}
            </p>
          </div>
          
          {/* Key idea - highlighted */}
          <div className="relative pl-4 border-l-2 border-primary">
            <p className="text-lg font-medium text-foreground italic">
              "{species.keyIdea}"
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
