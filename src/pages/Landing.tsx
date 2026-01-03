import { useNavigate } from "react-router-dom";
import { Hand, Move3D, Bone, ArrowRight } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-y-auto">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Your Inner Forms</h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-6">
          Explore how evolution <span className="text-primary font-medium">reshapes</span> the same structures.
        </p>

        <p className="text-base text-muted-foreground/80 max-w-xl mb-8">
          By overlaying scientific 3D models onto your <strong className="text-foreground">right hand</strong> using the
          camera, you can see how evolution reshapes the same structures for swimming, walking, flying, and grasping.
        </p>

        <p className="text-xl font-semibold text-primary">Different animals. Same bones.</p>
      </section>

      {/* Mode Selection */}
      <section className="px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Choose How to Explore</h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Hand Overlay Mode Card */}
          <button
            onClick={() => navigate("/explore?mode=hand")}
            className="group relative bg-card border border-border rounded-2xl p-6 text-left hover:border-primary/50 hover:bg-card/80 transition-all duration-300"
          >
            <div className="absolute top-4 right-4 bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
              Default
            </div>

            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Hand className="w-7 h-7 text-primary" />
            </div>

            <h3 className="text-xl font-semibold mb-2">Hand Overlay Mode</h3>

            <p className="text-muted-foreground text-sm mb-4">
              Uses your camera to overlay skeletal models onto your right hand in real-time.
            </p>

            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                Hold up your right hand in view
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                Swipe to change animals
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                Move your hand to explore bones in space
              </li>
            </ul>

            <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
              <span>Start with Hand</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          {/* Free Explore Mode Card */}
          <button
            onClick={() => navigate("/explore?mode=free")}
            className="group relative bg-card border border-border rounded-2xl p-6 text-left hover:border-primary/50 hover:bg-card/80 transition-all duration-300"
          >
            <div className="absolute top-4 right-4 bg-secondary text-muted-foreground text-xs px-2 py-1 rounded-full">
              Accessible
            </div>

            <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-4">
              <Move3D className="w-7 h-7 text-muted-foreground" />
            </div>

            <h3 className="text-xl font-semibold mb-2">Free Explore Mode</h3>

            <p className="text-muted-foreground text-sm mb-4">
              Explore without hand tracking. The model appears centered for touch-based viewing.
            </p>

            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground mt-0.5">•</span>
                Touch and drag to rotate
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground mt-0.5">•</span>
                Pinch to zoom
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground mt-0.5">•</span>
                Swipe to change animals
              </li>
            </ul>

            <div className="flex items-center gap-2 text-muted-foreground font-medium group-hover:gap-3 group-hover:text-foreground transition-all">
              <span>Explore Freely</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6 max-w-md mx-auto">
          Free Explore works for everyone — no camera or specific gestures required.
        </p>
      </section>

      {/* What You're Seeing */}
      <section className="px-6 py-12 bg-secondary/30">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Bone className="w-6 h-6 text-primary" />
          </div>

          <h2 className="text-2xl font-bold mb-4">What You're Seeing</h2>

          <p className="text-muted-foreground mb-4">
            The colored bones you see are <strong className="text-foreground">homologous structures</strong> — bones
            shared by many vertebrates and inherited from a common ancestor.
          </p>

          <p className="text-muted-foreground">
            They haven't been replaced over time.
            <br />
            They've been <span className="text-primary font-medium">reshaped</span>.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          3D models from the{" "}
          <a href="/references" className="text-primary hover:underline">
            Forelimb Homology Project
          </a>
        </p>
      </footer>
    </div>
  );
}
